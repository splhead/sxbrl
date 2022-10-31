import { Sqlite3Datasource } from './datasources/connectors/sqlite3datasource'
import path from 'path'
import { XMLParser } from 'fast-xml-parser'
import { readFilePromise } from './file'
import { simplifyObject } from './utils/functions'

const main = async () => {
  const datasource = new Sqlite3Datasource('msc.db')
  const sql = 'SELECT * FROM msc LIMIT 1'

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
  const xbrlSimplified = simplifyObject(xmlObject)

  // eslint-disable-next-line
  console.log(
    JSON.stringify(
      xbrlSimplified['xbrli:xbrl']['gl-cor:accountingEntries'][
        'gl-cor:entryHeader'
      ]['gl-cor:entryDetail'][0],
    ),
  )
}

main()
type Source = Record<string, string | number>
function teste(
  source: Source,
  xbrl: Record<string, string | number>,
  inputs: string[],
) {
  const state = new Map()
  for (const [key, value] of Object.entries(xbrl)) {
    const input = inputs.shift()
    if (!input) {
      throw Error('Wrong input' + input)
    }
    if (typeof input !== typeof value) {
      throw Error(`Typeof input ${input} is diferente from ${value} in ${key}`)
    }
    const sourceValue = source[input]
    state.set(key, sourceValue)
  }
  return Object.fromEntries(state.entries())
}

console.log(
  teste(
    {
      conta: '111110100',
      ic1: '10131',
      tipo1: 'PO',
      ic2: '1',
      tipo2: 'FP',
      ic3: '1500',
      tipo3: 'FR',
      ic4: '',
      tipo4: '',
      ic5: '',
      tipo5: '',
      ic6: '',
      tipo6: '',
      valor: 1388187.15,
      tipo_valor: 'beginning_balance',
      natureza_valor: 'C',
    },
    { conta: 'b', valor: 'aaa' },
    ['conta', 'tipo_valor'],
  ),
)
