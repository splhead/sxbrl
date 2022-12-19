import 'dotenv/config'
import { DatasourceConfig } from "@/datasources/connectors/datasourcesutils";

/* Para trocar a fonte de dados basta configurar
   abaixo, trocando o tipo de connector
   
   onde está process.env.(algum nome) é a variavel 
   de ambiente lida no arquivo .env (environment)
   estratégia usada para não vazar informações sensíveis
   quando subir para algum controlador de versão
   */

// para usar o sqlite por exemplo descomente as
// próximas linhas e comente a proxima variavel datasource 
// export const datasourceConfig: DatasourceConfig = {
//   connector: 'sqlite',
//   databaseFileName: process.env.DATABASE_FILE_NAME || '',
//   sql: process.env.SQL || ''
// }

export const datasourceConfig: DatasourceConfig = {
  connector: 'mongodb',
  connection_string: process.env.CONNECTION_STRING || '',
  database: process.env.DATABASE || '',
  collection: process.env.COLLECTION || ''
}