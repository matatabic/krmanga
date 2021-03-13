import axios from "axios";
import {EPISODE_URL, ADD_HISTORY} from "@/config/api";


export interface IParams {
    book_id: number,
    roast?: number,
    chapter_num?: number,
}

export async function getList(params: IParams) {
    return axios.get(EPISODE_URL, {
        params
    });
}

export async function saveMark(params: any) {
    return axios.post(ADD_HISTORY, params);
}

export default {
    getList,
    saveMark
};
