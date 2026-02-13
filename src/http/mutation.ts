import { sendData, Result } from "@/lib/types";
import { getData } from "./api";

export const sendProject = async (data: sendData): Promise<Result> => {
  //server call logic
  const response = await getData(data)
  return response
};
  