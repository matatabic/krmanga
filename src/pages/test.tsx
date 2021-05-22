import React, { Component } from "react";
import {
    View,
    Text, NativeModules
} from "react-native";
import Touchable from "@/components/Touchable";

export default class Test extends Component {

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>native跳转到rn的界面</Text>
                <Touchable style={{ width: 200, height: 200, backgroundColor: "orange" }} onPress={() => {
                   NativeModules.Bridge.goBack()
                }}>
                    <Text>返回native</Text>
                </Touchable>
            </View>
        );
    }
}
