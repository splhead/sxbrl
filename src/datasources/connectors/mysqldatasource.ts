import mysql from 'mysql2'
import { DataModelMSC, Datasource } from './datasource'
import { datasourceConfig } from '../config/datasource'
import { MysqlConnector } from './datasourcesutils'
import { assertConnectorType } from '@/utils/functions'

/**
 * fonte de dados MYSQL.
 */
class MysqlDatasource implements Datasource {
  private connection: mysql.Connection | null = null

  private connect() {
    assertConnectorType<MysqlConnector>(datasourceConfig, 'mysql')

    this.connection = mysql.createConnection({
      host: datasourceConfig.host,
      port: datasourceConfig.port,
      user: datasourceConfig.user,
      password: datasourceConfig.password,
      database: datasourceConfig.database,
    })
    console.log('Conectado com mysql')
  }

  async getData(sql?: string): Promise<DataModelMSC[]> {
    return new Promise((resolve, reject) => {
      if (!sql) reject(new Error('SQL não definido'))
      else {
        this.connect()
        console.log('obtendo dados do mysql')
        this.connection?.query(sql, (error: Error, rows: DataModelMSC[]) => {
          if (error) {
            console.log('Erro ao obter dados no mysql')
            reject(error)
          }

          resolve(rows)
        })
      }
    })
  }

  close() {
    console.log('Encerrando a conexão com mysql')
    this.connection?.end()
  }
}

export { MysqlDatasource }
