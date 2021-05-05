import axios from "axios";
import { DOWNLOAD_MIX_URL, CHAPTER_URL } from "@/config/api";

export async function getList(params: any) {
    return axios.get(DOWNLOAD_MIX_URL, {
        params
    });
}


export async function getChapterList(params: any) {
    return axios.get(CHAPTER_URL, {
        params
    });
}

export default {
    getList,
    getChapterList
};
