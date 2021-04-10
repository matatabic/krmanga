import React from "react";
import { Provider } from "react-redux";
import { RootSiblingParent } from "react-native-root-siblings";
import Navigator from "@/navigator/index";
import store from "@/config/dva";
import { StatusBar } from "react-native";
import "@/config/http";
import {enableScreens} from 'react-native-screens';

enableScreens();

export default class extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RootSiblingParent>
                    <Navigator />
                </RootSiblingParent>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="dark-content"
                    translucent
                />
            </Provider>
        );
    }
}
