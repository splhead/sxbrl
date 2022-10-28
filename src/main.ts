import { Sqlite3Datasource } from './datasources/connectors/sqlite3datasource'

const main = async () => {
  const datasource = new Sqlite3Datasource('msc.db')
  const sql = 'SELECT * FROM msc LIMIT 1'

  const result = await datasource.getData(sql)
  console.log(result)
  datasource.close()
}

main()
