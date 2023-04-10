import { Sqlite3Datasource } from './sqlite3datasource'
import { MysqlDatasource } from './mysqldatasource'
import { MongoDbDatasource } from './mongodbdatasource'

/**
*  Ao criar um novo conector a uma fonte de dados
*  deve ser adicionado neste arquivo sua importação
*  adicionado um identificador em datasourcesAvailables
*  e adicionado no tipo DatasourceConfig com suas
*  devidas propriedades.
*/

export const datasourcesAvailable = {
  sqlite: Sqlite3Datasource,
  mysql: MysqlDatasource,
  mongodb: MongoDbDatasource
}

export type DatasourceConfig =
  {
    connector: 'sqlite'
    databaseFileName: string
    sql: string
  }
  |
  {
    connector: 'mysql'
    host: string
    user: string
    password: string
    database: string
    sql: string
  }
  |
  {
    connector: 'mongodb'
    connection_string: string
    database: string
    collection: string
  }

/**
 * Exemplo para uma possível implementação das configurações da classe conectora do Postgres.
 * {
 *  connector: 'postgres'
 *  user: string
 *  password: string
 *  schema: 'public' | string
 *  database: string
 *  sql: string
 * }
 */

