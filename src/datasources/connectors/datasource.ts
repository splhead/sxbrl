/*
  espera - se que os registros resultantes
  da consulta SQL obedeção o tipo DataModelMSC
*/

export type DataModelMSC = Array<{
  conta: string
  ic1: string
  tipo1: string
  ic2: string
  tipo2: string
  ic3: string
  tipo3: string
  ic4: string
  tipo4: string
  ic5: string
  tipo5: string
  ic6: string
  tipo6: string
  valor: number
  tipo_valor: string
  natureza_valor: string
}>

export interface Datasource {
  getData(sql: string): Promise<DataModelMSC[]>
}
