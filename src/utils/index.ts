import React from "react";
import { Dimensions, StatusBar } from "react-native";
import { ModalStackParamList, ModalStackNavigation } from "../navigator";
import { NavigationState } from "@react-navigation/native";


const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

const statusBarHeight = StatusBar.currentHeight;

//百分比获取宽度
function wp(percentage: number) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

//百分比获取高度
function hp(percentage: number) {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
}

//根据图片宽度百分比计算高度
function ip(width: number) {
    return width / 0.675;
}

function getActiveRouteName(state: NavigationState) {
    let route;
    route = state.routes[state.index];
    while (route.state && route.state.index) {
        route = route.state.routes[route.state.index];
    }
    return route.name;
}

function getCurrentDate() {
    let date = new Date();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let min = minute >= 10 ? minute : `0${minute}`;

    return `${hour}:${min}`;
}


export {
    wp,
    hp,
    ip,
    getActiveRouteName,
    getCurrentDate,
    viewportWidth,
    viewportHeight,
    statusBarHeight
};
