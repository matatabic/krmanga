import axios from "axios";
import { ICommend, IGuess } from "@/models/home";

const BRIEF_URL = '/brief/getBriefList';

export async function getBriefList(params: ICommend | IGuess) {
  return axios.get(BRIEF_URL, {
    params: {
      ...params
    }
  });
}
