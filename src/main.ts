import path from 'path'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'

import { readFilePromise, writeInstanceFile } from './file'
import { simplifyObject } from './utils/functions'
import { datasourceConfig } from './datasources/config/datasource'
import { datasourcesAvailable } from './datasources/connectors/datasourcesutils'
import { DataModelMSC } from './datasources/connectors/datasource'

/**
 * Função destinada a conversão de valores string em number.
 * @param value
 * @returns
 */
function castIfNecessary(value: string | number) {
  try {
    if (typeof value === 'number') return value
    return Number(value)
  } catch (error) {
    return value
  }
}

const main = async () => {
  const datasource = new datasourcesAvailable[datasourceConfig.connector]()
  const data = (await datasource.getData(datasourceConfig.sql)) as DataModelMSC
  datasource.close()

  const templatePath = path.resolve(__dirname, 'template', 'default.xml')
  const templateFile = await readFilePromise(templatePath)

  const parser = new XMLParser({
    ignoreAttributes: false,
    ignoreDeclaration: false,
    alwaysCreateTextNode: true,
  })

  const xmlObject = parser.parse(templateFile)

  /**
   * Devido a necessidade de adicionar elementos da taxonomia da Matriz de Saldos Contabeis
   * para o SICONFI no código, foi criada a função de simplificação do xbrl proveniente do template.
   */
  const xbrlSimplified = simplifyObject(xmlObject, 'gl-cor:entryDetail')

  /**
   * Percorre os dados oriundos da fonte de dados e verifica se os campos opcionais da Matriz de Saldos Contabeis
   * estão preenchidos.
   */
  const entryDetail = data.map((item, index) => {
    const state: { subTypeText: string | number; subId: string | number }[] = []
    for (const [key, value] of Object.entries(item)) {
      if (key.startsWith('tipo')) {
        const rest = key.slice('tipo'.length)
        if (rest.length > 1) {
          continue
        }
        const index = rest.charAt(0)
        const maybeSubId = item[`ic${index}` as keyof DataModelMSC[number]]
        if (maybeSubId === undefined) {
          throw Error(`Not found ${`ic${index}`}`)
        }
        if (value === '') {
          continue
        }
        state.push({
          subTypeText: value,
          subId: castIfNecessary(maybeSubId),
        })
      }
    }

    /**
     * Devido as definições da biblioteca fast-xml-parser foi necessário definir diretamente no código a estrutura
     * da taxonomia XBRL da Matriz de Saldos Contabeis para o SICONFI.
     * Em caso de novas definições da taxonomia, atulizações na estrutura abaixo serão necessárias.
     */
    const accountSubs = state.map(({ subTypeText, subId }) => {
      return {
        'gl-cor:accountSubID': {
          '#text': subId,
          '@_contextRef': 'C1',
        },
        'gl-cor:accountSubType': {
          '#text': subTypeText,
          '@_contextRef': 'C1',
        },
      }
    })
    const result = {
      'gl-cor:lineNumberCounter': {
        '#text': index + 1,
        '@_contextRef': 'C1',
        '@_decimals': '0',
        '@_unitRef': 'u',
      },
      'gl-cor:account': {
        'gl-cor:accountMainID': {
          '#text': item.conta,
          '@_contextRef': 'C1',
        },
        'gl-cor:accountSub': accountSubs,
      },
      'gl-cor:amount': {
        '#text': item.valor,
        '@_contextRef': 'C1',
        '@_decimals': '2',
        '@_unitRef': 'BRL',
      },
      'gl-cor:debitCreditCode': {
        '#text': item.natureza_valor,
        '@_contextRef': 'C1',
      },
      'gl-cor:xbrlInfo': {
        'gl-cor:xbrlInclude': {
          '#text': item.tipo_valor,
          '@_contextRef': 'C1',
        },
      },
    }
    return result
  })

  /**
   * Monta a instancia XBRL com os dados provenientes da fonte de dados com as estruturas e definições
   * especificadas.
   * Gera o arquivo instance.xml na pasta instances.
   */
  xbrlSimplified['xbrli:xbrl']['gl-cor:accountingEntries'][
    'gl-cor:entryHeader'
  ]['gl-cor:entryDetail'] = entryDetail
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    suppressEmptyNode: true,
  })
  const final = builder.build(xbrlSimplified)
  const writeFile = writeInstanceFile('instance.xml')
  await writeFile(final)
}
main()
