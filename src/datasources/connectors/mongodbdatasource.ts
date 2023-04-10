import { DataModelMSC, Datasource } from './datasource'
import { MongoClient } from 'mongodb'
import { datasourceConfig } from '../config/datasource'
import { assertConnectorType } from '@/utils/functions'
import { MongodbConnector } from './datasourcesutils'

/**
 * Area destinada as implementações gerais da fonte de dados MongoDB.
 */

class MongoDbDatasource implements Datasource {
  private client: MongoClient | null = null

  private async connect() {
    assertConnectorType<MongodbConnector>(datasourceConfig, 'mongodb')
    this.client = new MongoClient(datasourceConfig.connection_string)
    console.log('Conectado ao MongoDb')
  }

  async getData(): Promise<DataModelMSC[]> {
    try {
      assertConnectorType<MongodbConnector>(datasourceConfig, 'mongodb')

      await this.connect()

      const database = this.client?.db(datasourceConfig.database)
      const collection = database?.collection(datasourceConfig.collection)

      const rows = (await collection
        ?.find({})
        .toArray()) as unknown as DataModelMSC[]

      console.log('Lido os dados do Mongodb')

      return rows
    } catch (error) {
      console.error(`Erro ao ler dados no Mongodb ${error}`)
    }
    const data = {} as DataModelMSC
    return [data]
  }

  async close() {
    await this.client?.close()
    console.log('Conexão com Mongodb encerrada')
  }
}

export { MongoDbDatasource }
