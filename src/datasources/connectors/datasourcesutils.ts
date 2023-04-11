import { Sqlite3Datasource } from './sqlite3datasource'
import { MysqlDatasource } from './mysqldatasource'
import { MongoDbDatasource } from './mongodbdatasource'
import { PostgresDatasource } from './postgresdatasource'

/*
 *  Ao criar um novo conector a uma fonte de dados
 *  deve ser adicionado neste arquivo sua importação
 *  adicionar um nome para a propriedade connector em BaseConector
 *  criar um tipo extendendo o BaseConnector
 *  e suas outras propriedades ,
 *  adicionar um identificador em datasourcesAvailables
 */

type BaseConnector = {
  connector: 'sqlite' | 'mysql' | 'mongodb' | 'postgres'
  sql?: string
}

export type SqliteConnector = {
  connector: 'sqlite'
  databaseFileName: string
} & BaseConnector

export type MysqlConnector = {
  connector: 'mysql'
  host: string
  port?: number
  user: string
  password: string
  database: string
  sql?: string
} & BaseConnector

export type MongodbConnector = {
  connector: 'mongodb'
  connection_string: string
  database: string
  collection: string
} & BaseConnector

export type PostgresConnector = {
  connector: 'postgres'
  host: string
  port?: number
  user: string
  password: string
  database: string
} & BaseConnector

export const datasourcesAvailable = {
  sqlite: Sqlite3Datasource,
  mysql: MysqlDatasource,
  mongodb: MongoDbDatasource,
  postgres: PostgresDatasource
}

export type DatasourceConfig =
  | SqliteConnector
  | MysqlConnector
  | MongodbConnector
  | PostgresConnector
