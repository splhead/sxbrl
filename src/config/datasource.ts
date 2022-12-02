import { DatasourceConfig } from "@/datasources/connectors/datasourcesutils";

export const datasourceConfig: DatasourceConfig = {
  connector: 'sqlite',
  databaseFileName: 'msc.db',
  sql: 'SELECT * FROM msc'
}