import { sendData, Result } from "@/lib/types"
import { api } from "./client"

export const getData = async (data: sendData): Promise<Result> => {
  const response = await api.post<Result>("/", data)
  return response.data
}