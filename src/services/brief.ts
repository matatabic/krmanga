import axios from "axios";
import {ADD_COLLECTION_URL, BRIEF_URL, DEL_COLLECTION_URL} from "@/config/api";


export async function getList(params: any) {
    return axios.get(BRIEF_URL, {params});
}

export async function addUserCollection(params: any) {
    return axios.post(ADD_COLLECTION_URL, params);
}

export async function delUserCollection(params: any) {
    console.log(params)
    return axios.post(DEL_COLLECTION_URL, params);
}

export default {
    getList,
    addUserCollection,
    delUserCollection,
};
