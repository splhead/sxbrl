import { DataModelMSC, Datasource } from "./datasource";
import { MongoClient } from 'mongodb'
import { datasourceConfig } from '../../config/datasource'

class MongoDbDatasource implements Datasource {
  private client: MongoClient | null = null

  private async connect() {
    if (datasourceConfig.connector !== 'mongodb') {
      throw new Error('Configuração do conector diferente de mongodb')
    }
    this.client = new MongoClient(datasourceConfig.connection_string)
    console.log('Conectado ao MongoDb')
  }

  async getData(sql: string): Promise<DataModelMSC[]> {
    try {
      if (datasourceConfig.connector !== 'mongodb') {
        throw new Error('Configuração do conector diferente de mongodb')
      }

      await this.connect()

      const database = this.client?.db(datasourceConfig.database)
      const collection = database?.collection(datasourceConfig.collection)

      const rows = (await collection?.find({}).toArray()) as unknown as DataModelMSC[]

      console.log('Lido os dados do Mongodb')

      return rows
    } catch (error) {

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