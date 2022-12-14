import sqlite3, { Database } from 'sqlite3'
import path from 'path'
import { DataModelMSC, Datasource } from './datasource'
import { datasourceConfig } from '../../config/datasource'

class Sqlite3Datasource implements Datasource {
  private database: Database | null = null

  private async connect() {
    return new Promise((resolve, reject) => {
      if (datasourceConfig.connector !== 'sqlite') {
        throw new Error('Configuração do conector diferente de sqlite')
      }
      const absolutePath = path.resolve(__dirname, '..', datasourceConfig.databaseFileName)
      this.database = new sqlite3.Database(
        absolutePath,
        sqlite3.OPEN_READWRITE,
        (err) => {
          if (err) reject(err)

          resolve(
            console.log(`Conectou com a fonte de dados sqlite ${absolutePath}`),
          )
        },
      )
    })
  }

  async getData(sql: string): Promise<DataModelMSC[]> {
    await this.connect()

    return new Promise((resolve, reject) => {
      this.database?.all(sql, [], (error, rows) => {
        if (error) reject(error)
        resolve(rows)
      })
    })
  }

  close() {
    console.log('Encerrou a conexão com a fonte de dados sqlite')
    this.database?.close()
  }
}

export { Sqlite3Datasource }
