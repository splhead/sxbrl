import 'dotenv/config'
import { DatasourceConfig } from "@/datasources/connectors/datasourcesutils";

/**
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
 *   databaseFileName: process.env.DATABASE_FILE_NAME || '',
 *   sql: process.env.SQL || ''
 * }
*/

export const datasourceConfig: DatasourceConfig = {
  connector: 'mongodb',
  connection_string: process.env.CONNECTION_STRING || '',
  database: process.env.DATABASE || '',
  collection: process.env.COLLECTION || ''
}