import axios from "axios";
import { COLLECTION_URL, DEL_HISTORY_URL, HISTORY_URL, DOWNLOAD_URL } from "@/config/api";


export async function getCollection(params: any) {
    return axios.get(COLLECTION_URL, {
        params
    });
}

export async function getHistory(params: any) {
    return axios.get(HISTORY_URL, {
        params
    });
}

export async function delUserHistory(params: any) {
    return axios.post(DEL_HISTORY_URL,
        params
    );
}

export async function getDownload(params: any) {
    return axios.get(DOWNLOAD_URL, {
        params
    });
}

export default {
    getCollection,
    getHistory,
    delUserHistory,
    getDownload
};
