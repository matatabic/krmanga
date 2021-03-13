import axios from "axios";
import {REGISTER_URL, LOGIN_URL, LOGOUT_URL} from "@/config/api";


export interface IParams {
    account: string;
    password: string;
}

export async function Register(params: IParams) {
    return axios.post(REGISTER_URL, {
        'username': params.account,
        'password': params.password,
    });
}

export async function Login(params: IParams) {
    return axios.post(LOGIN_URL,
        params
    );
}

export async function logout() {
    return axios.post(LOGOUT_URL);
}

export default {
    Register,
    Login,
    logout,
};
