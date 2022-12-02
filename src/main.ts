import path from 'path'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'

import { readFilePromise, writeInstanceFile } from './file'
import { simplifyObject, Tree } from './utils/functions'
import { datasourceConfig } from './config/datasource'
import { datasourcesAvailable } from './datasources/connectors/datasourcesutils'
import { DataModelMSC } from './datasources/connectors/datasource'

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
  //console.log(data)
  datasource.close()

  const templatePath = path.resolve(__dirname, 'template', 'default.xml')
  const templateFile = await readFilePromise(templatePath)

  const parser = new XMLParser({
    ignoreAttributes: false,
    ignoreDeclaration: false,
    alwaysCreateTextNode: true
  })

  const xmlObject = parser.parse(templateFile)

  const xbrlSimplified = simplifyObject(xmlObject, 'gl-cor:entryDetail')


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

  xbrlSimplified['xbrli:xbrl'] as Tree['gl-cor:accountingEntries'] as Tree['gl-cor:entryHeader'] as Tree['gl-cor:entryDetail'] = entryDetail

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
