import { Sqlite3Datasource } from './datasources/connectors/sqlite3datasource'
import path from 'path'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import { readFilePromise, writeInstanceFile } from './file'
import { simplifyObject } from './utils/functions'
// import { Tree } from './utils/function2'

type Data = Array<{
  conta: '111110100'
  ic1: '10131'
  tipo1: 'PO'
  ic2: '1'
  tipo2: 'FP'
  ic3: '1500'
  tipo3: 'FR'
  ic4: ''
  tipo4: ''
  ic5: ''
  tipo5: ''
  ic6: ''
  tipo6: ''
  valor: number
  tipo_valor: 'beginning_balance'
  natureza_valor: 'C'
}>

function castIfNecessary(value: string | number) {
  try {
    if (typeof value === 'number') return value
    return Number(value)
  } catch (error) {
    return value
  }
}

const main = async () => {
  const datasource = new Sqlite3Datasource('msc.db')
  const sql = 'SELECT * FROM msc limit 2'

  const data = (await datasource.getData(sql)) as Data
  console.log(data)
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
        const maybeSubId = item[`ic${index}` as keyof Data[number]]
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

  xbrlSimplified['xbrli:xbrl']['gl-cor:accountingEntries']['gl-cor:entryHeader']['gl-cor:entryDetail'] = entryDetail

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

// type Source = Record<string, string | number>

// function teste(source: Source, xbrl: Tree, inputs: string[]) {
//   const state = new Map()
//   for (const [key, value] of Object.entries(xbrl)) {
//     if (isLeaf(value)) {
//       if (key.startsWith('#text')) {
//         const input = inputs.shift()
//         if (!input) {
//           throw Error('Wrong input' + input)
//         }
//         if (typeof input !== typeof value) {
//           throw Error(
//             `Typeof input ${input} is diferente from ${value} in ${key}`,
//           )
//         }
//         const sourceValue = source[input]
//         state.set(key, sourceValue)
//       }
//     } else {
//       teste(source, value, inputs)
//     }
//   }
//   return Object.fromEntries(state.entries())
// }
