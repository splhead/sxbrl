import { Sqlite3Datasource } from './datasources/connectors/sqlite3datasource'
import path from 'path'
import { XMLParser } from 'fast-xml-parser'
import { readFilePromise } from './file'
import { isLeaf, Leaf, simplifyObject, Tree } from './utils/functions'

const main = async () => {
  const datasource = new Sqlite3Datasource('msc.db')
  const sql = 'SELECT * FROM msc LIMIT 2'

  const data = await datasource.getData(sql)
  console.log(data)
  datasource.close()

  const templatePath = path.resolve(__dirname, 'template', 'default.xml')
  const templateFile = await readFilePromise(templatePath)

  const parser = new XMLParser({
    ignoreAttributes: false,
    ignoreDeclaration: true,
  })

  const xmlObject = parser.parse(templateFile)
  const xbrlSimplified = simplifyObject(xmlObject, 'gl-cor:entryDetail')

  // TODO: ask which element is repeatable

  // eslint-disable-next-line
  // console.log(
  //   JSON.stringify(
  //     xbrlSimplified['xbrli:xbrl']['gl-cor:accountingEntries'][
  //       'gl-cor:entryHeader'
  //     ]['gl-cor:entryDetail'][0],
  //   ),
  // )

  // TODO: generate each element for each data row

  function addChild(parent: Tree, name: string): Record<string, unknown> {
    return Object.assign(parent, { [name]: {} })
  }

  function addAttribute(element: Tree, name: string, value: string | number) {
    return Object.assign(element, { [name]: value })
  }

  const newElement = {}
  addChild(newElement, 'gl-cor:lineNumberCounter')
  addAttribute(newElement['gl-cor:lineNumberCounter'], '#text', 1)
  console.log(newElement)
  // data.forEach((row) => {
  //   console.log(
  //     teste(
  //       row as Source,
  //       [
  //         {
  //           'gl-cor:lineNumberCounter': {
  //             '#text': 1,
  //             '@_contextRef': 'C1',
  //             '@_decimals': '0',
  //             '@_unitRef': 'u',
  //           },
  //           'gl-cor:account': {
  //             'gl-cor:accountMainID': {
  //               '#text': 111110100,
  //               '@_contextRef': 'C1',
  //             },
  //             'gl-cor:accountSub': [
  //               {
  //                 'gl-cor:accountSubID': {
  //                   '#text': 10131,
  //                   '@_contextRef': 'C1',
  //                 },
  //                 'gl-cor:accountSubType': {
  //                   '#text': 'PO',
  //                   '@_contextRef': 'C1',
  //                 },
  //               },
  //             ],
  //           },
  //           'gl-cor:amount': {
  //             '#text': 1388187.15,
  //             '@_contextRef': 'C1',
  //             '@_decimals': '2',
  //             '@_unitRef': 'BRL',
  //           },
  //           'gl-cor:debitCreditCode': { '#text': 'C', '@_contextRef': 'C1' },
  //           'gl-cor:xbrlInfo': {
  //             'gl-cor:xbrlInclude': {
  //               '#text': 'beginning_balance',
  //               '@_contextRef': 'C1',
  //             },
  //           },
  //         },
  //       ],
  //       ['conta', 'tipo_valor'],
  //     ),
  //   )
  // })
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
