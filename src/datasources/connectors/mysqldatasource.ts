import { Datasource } from "./datasource";

/**
 * Area destinada as implementações gerais da fonte de dados MYSQL. 
 */

class MysqlDatasource implements Datasource {

  async getData<T>(sql?: string): Promise<T[]> {

    throw new Error("Method not implemented.");
  }

  close() {

  }

}

export { MysqlDatasource }