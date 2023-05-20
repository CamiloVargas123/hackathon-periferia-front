import axios from "axios"
import { ENDPOINT } from "./const"
import { Stat } from "./model"
import { statAdapter } from "./adapters"

export async function getStats(): Promise<Stat> {
  return await axios.get(ENDPOINT.STATS).then(res => statAdapter(res.data))
}