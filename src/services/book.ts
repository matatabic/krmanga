import axios from "axios";
import { BOOK_URL, CAROUSEL_URL, COMMEND_URL, INTRO_URL, RANDOM_URL } from "@/config/api";


async function getList(params: any) {
    return axios.get(BOOK_URL, {
        params
    });
}

async function getCarousel() {
    return axios.get(CAROUSEL_URL);
}

async function getCommend(params: any) {
    return axios.get(COMMEND_URL, {
        params
    });
}

async function getIntro() {
    return axios.get(INTRO_URL);
}

async function getGuess() {
    return axios.get(RANDOM_URL);
}

export default {
    getList,
    getCarousel,
    getCommend,
    getIntro,
    getGuess
};
