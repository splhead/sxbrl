import { DatasourceConfig } from "@/datasources/connectors/datasourcesutils";

export const datasourceConfig: DatasourceConfig = {
  connector: 'mongodb',
  connection_string: "mongodb+srv://datatoxbrl:.super.@cluster0.6h2rjzc.mongodb.net/?retryWrites=true&w=majority",
  database: 'msc',
  collection: 'msc'
}