import 'dotenv/config'
import { DatasourceConfig } from '@/datasources/connectors/datasourcesutils'

/*
 * Arquivo principal de configuração das fontes de dados.
 *
 * Para efetuar a troca da fonte de dados, é necessário configurar
 * a constante descrita abaixo, trocando o tipo de connector.
 *
 * Onde está process.env.(algum nome) é a variavel
 * de ambiente lida no arquivo .env (environment)
 * estratégia usada para não divulgar informações sensíveis
 * quando armazenar o código em um controlador de versão e.g. github.
 *
 *
 * Para usar o sqlite descomente as próximas linhas
 * e comente a variavel datasource
 * e.g.
 *   export const datasourceConfig: DatasourceConfig = {
 *   connector: 'sqlite',
 *   databaseFileName: process.env.SQLITE_DATABASE_FILE_NAME || '',
 *   sql: process.env.SQLITE_SQL || ''
 * }
 */

/*
* para usar mysql descomente as linhas a seguir
*/
/* export const datasourceConfig: DatasourceConfig = {
  connector: 'mysql',
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: Number(process.env.POSTGRES_PORT) || 3306,
  database: process.env.MYSQL_DATABASE || 'db',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  sql: process.env.MYSQL_SQL || '',
} */

// para mongodb descomente as linhas a seguir
/* export const datasourceConfig: DatasourceConfig = {
  connector: 'mongodb',
  connection_string: process.env.MONGO_CONNECTION_STRING || '',
  database: process.env.MONGO_DATABASE || 'db',
  collection: process.env.MONGO_COLLECTION || 'msc'
} */

export const datasourceConfig: DatasourceConfig = {
  connector: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DATABASE || 'db',
  sql: process.env.POSTGRES_SQL || 'SELECT * FROM msc'
}