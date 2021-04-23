import axios from "axios";
import { CHAPTER_URL } from "@/config/api";


export async function getList(params: any) {
    return axios.get(CHAPTER_URL, {
        params
    });
}

export default {
    getList
};
