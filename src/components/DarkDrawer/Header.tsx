import React from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import { Color } from "@/utils/const";
import Touchable from "@/components/Touchable";
import Icon from "@/assets/iconfont/index";
import { IBookInfo } from "@/models/brief";


interface IProps {
    bookInfo: IBookInfo;
    spin: Animated.AnimatedInterpolation;
    reverse: () => void;
}

function Header({ bookInfo, spin, reverse }: IProps) {

    const onPress = () => {
        if (typeof reverse === "function") {
            reverse();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>{bookInfo.title}</Text>
                <Text style={styles.status}>{bookInfo.status}</Text>
            </View>
            <View style={styles.changeView}>
                <View style={styles.huaView}>
                    <Text style={styles.hua}>话</Text>
                </View>
                <Touchable onPress={onPress}>
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                        <Icon name="icon-qiehuan" size={24} />
                    </Animated.View>
                </Touchable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100
    },
    titleView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: Color.white
    },
    status: {
        color: Color.theme
    },
    changeView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: Color.dark,
        borderBottomColor: Color.dark_title,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    huaView: {
        width: 45,
        height: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    hua: {
        color: Color.white,
        fontSize: 16
    }
});

export default Header;
