import { Sqlite3Datasource } from './sqlite3datasource'
import { MysqlDatasource } from './mysqldatasource'
import { MongoDbDatasource } from './mongodbdatasource'

/*
 *  Ao criar um novo conector a uma fonte de dados
 *  deve ser adicionado neste arquivo sua importação
 *  adicionar um nome para a propriedade connector em BaseConector
 *  criar um tipo extendendo o BaseConnector
 *  e suas outras propriedades ,
 *  adicionar um identificador em datasourcesAvailables
 */

type BaseConnector = {
  connector: 'sqlite' | 'mysql' | 'mongodb'
  sql?: string
}

export type SqliteConnector = {
  connector: 'sqlite'
  databaseFileName: string
} & BaseConnector

export type MysqlConnector = {
  connector: 'mysql'
  host: string
  user: string
  password: string
  database: string
} & BaseConnector

export type MongodbConnector = {
  connector: 'mongodb'
  connection_string: string
  database: string
  collection: string
} & BaseConnector

export const datasourcesAvailable = {
  sqlite: Sqlite3Datasource,
  mysql: MysqlDatasource,
  mongodb: MongoDbDatasource,
}

export type DatasourceConfig =
  | SqliteConnector
  | MysqlConnector
  | MongodbConnector

/*
 * Exemplo para uma possível implementação das configurações da classe conectora do Postgres.
 * adicionar a um nome na propriedade connector no BaseConnector
 * connector: 'sqlite' | 'mysql' | 'mongodb' | 'postgres'
 *
 * adicionar o tipo e suas propriedades
 *
 * export type PostgresConnector{
 *  connector: 'postgres'
 *  host: string
 *  user: string
 *  password: string
 *  schema: 'public' | string
 *  database: string
 * } & BaseConnector
 *
 * export const datasourcesAvailable = {
 * sqlite: Sqlite3Datasource,
 * mysql: MysqlDatasource,
 * mongodb: MongoDbDatasource,
 * postgres: PostgresDatasource
 * }
 *
 * export type DatasourceConfig =
 * | SqliteConnector
 * | MysqlConnector
 * | MongodbConnector
 * | PostgresConnector
 */
