import axios from "axios";
import { EPISODE_URL, ADD_HISTORY } from "@/config/api";


export async function getList(params: any) {
    return axios.get(EPISODE_URL, {
        params
    });
}

export async function saveMark(params: any) {
    return axios.post(ADD_HISTORY,
        params
    );
}

export default {
    getList,
    saveMark
};
