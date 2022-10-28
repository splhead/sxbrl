import { Sqlite3Datasource } from './datasources/connectors/sqlite3datasource'
import path from 'path'
import { XMLParser } from 'fast-xml-parser'
import { readFilePromise } from './file'
import { simplifyObject } from './utils/simplifyObject'

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
  console.log(
    xbrlSimplified['xbrli:xbrl']['gl-cor:accountingEntries'][
      'gl-cor:entryHeader'
    ]['gl-cor:entryDetail'],
  )
}

main()
