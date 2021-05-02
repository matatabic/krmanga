import React from "react";
import {View, Text, StyleSheet } from "react-native";
import { Color } from "@/utils/const";
import Icon from "@/assets/iconfont";


function Version() {
    return (
        <View style={styles.container}>
            <Text>版本号1.0.0</Text>
            <Icon name="icon-arrow-right" color={Color.dark_title} size={16} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        height: 45,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: Color.page_bg
    }
});

export default Version;
