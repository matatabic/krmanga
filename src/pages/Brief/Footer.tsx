import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Color } from "@/utils/const";


function Footer() {
    return (
        <View style={style.container}>
            <Text>评论区</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: 1000,
        backgroundColor: Color.page_bg
    }
});

export default Footer;
