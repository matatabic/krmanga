import React from "react";
import {View, Text, StyleSheet } from "react-native";
import { Color } from "@/utils/const";
import Icon from "@/assets/iconfont";
import Config from "react-native-config";


function Version() {

    return (
        <View style={styles.container}>
            <Text>版本号{Config.VERSIONNAME}</Text>
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
