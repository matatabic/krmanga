import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "@/assets/iconfont";
import { Color } from "@/utils/const";


function BuyList() {
    return (
        <View style={styles.container}>
            <View style={styles.iconView}>
                <Icon name="icon-quan" color={Color.dark_title} size={24} />
                <Text style={styles.title}>阅读券</Text>
            </View>
            <View style={styles.iconView}>
                <Icon name="icon-gouwuche" color={Color.dark_title} size={24} />
                <Text style={styles.title}>已购项目</Text>
            </View>
            <View style={styles.iconView}>
                <Icon name="icon-lianluojilu" color={Color.dark_title} size={24} />
                <Text style={styles.title}>交易记录</Text>
            </View>
            <View style={styles.iconView}>
                <Icon name="icon-tubiaozhizuomoEban" color={Color.dark_title} size={24} />
                <Text style={styles.title}>自动购买</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height:60,
        flexDirection: "row",
        backgroundColor: Color.page_bg
    },
    iconView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        marginTop: 8,
        fontSize: 14
    }
});

export default BuyList;
