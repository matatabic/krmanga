import axios from "axios";
import { CATEGORY_TREE_URL, CATEGORY_URL, STATUS_URL } from "@/config/api";


async function getList() {
    return axios.get(CATEGORY_URL);
}

async function getStatus() {
    return axios.get(STATUS_URL);
}

async function getTreeList() {
    return axios.get(CATEGORY_TREE_URL);
}

export default {
    getList,
    getStatus,
    getTreeList
};
