import axios from "axios"
import { Stat } from "../models"
import { statAdapter } from "../adapters"
import { ENDPOINT } from "src/const"

export async function getStats(): Promise<Stat> {
  return await axios.get(ENDPOINT.STATS).then(res => statAdapter(res.data))
}