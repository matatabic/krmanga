import axios from "axios";
import { REGISTER_URL, LOGIN_URL, LOGOUT_URL } from "@/config/api";


export async function Register(params: any) {
    return axios.post(REGISTER_URL,
        params
    );
}

export async function Login(params: any) {
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
    logout
};
