import mysql from 'mysql2'
import { Datasource } from "./datasource"
import { datasourceConfig } from '../config/datasource'
import { DatasourceConfig } from './datasourcesutils'

/**
 * Area destinada as implementações gerais da fonte de dados MYSQL. 
 */

class MysqlDatasource implements Datasource {
  private connection: mysql.Connection
  private config: DatasourceConfig

  constructor() {
    if (datasourceConfig.connector !== 'mysql') {
      throw new Error('Configuração do conector diferente de mysql')
    }
    this.config = datasourceConfig
  }



  private connect() {
    if (datasourceConfig.connector !== 'mysql') {
      throw new Error('Configuração do conector diferente de mysql')
    }
    this.connection = mysql.createConnection({
      host: datasourceConfig.host,
      user: datasourceConfig.user,
      password: datasourceConfig.password,
      database: datasourceConfig.database,
    })
  }

  async getData<T>(sql?: string): Promise<T[]> {

    const query = sql ?? datasourceConfig.sql
    throw new Error("Method not implemented.");
  }

  close() {

  }

}

export { MysqlDatasource }