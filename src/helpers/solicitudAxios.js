import axios from 'axios'
import { endpointApi } from './variableApi'

export const solicitudAxios = async (metodo, endpoint, body) => {
  const { data } = await axios({
    method: metodo,
    url: endpointApi + endpoint,
    body
  })
  return data
}
