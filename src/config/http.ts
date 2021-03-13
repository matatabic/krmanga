import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from "@react-native-community/async-storage";


axios.defaults.baseURL = Config.API_URL;
axios.defaults.withCredentials = false;
//添加请求拦截器
axios.interceptors.request.use(
    async function (config) {
        console.log('相应数据request', config)
        const jsonValue: string | null = await AsyncStorage.getItem('token');
        config.headers.ACCESS_TOKEN =  jsonValue != null ?
            JSON.parse(jsonValue).rawData !== undefined ? JSON.parse(jsonValue).rawData : null
            : null;
        return config;
    },
    function (error) {
        console.log(error)
        return Promise.reject(error);
    },
);

//添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        console.log('响应数据response', response);
        return response.data;
    },
    function (error) {
        console.log(error)
        return Promise.reject(error);
    },
);
