import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ModalStackNavigation } from "@/navigator/index";
import { Color } from "@/utils/const";
import Icon from "@/assets/iconfont";
import Touchable from "@/components/Touchable";
import { useNavigation } from "@react-navigation/native";


function LoginPending() {

    const navigation = useNavigation<ModalStackNavigation>();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.leftView}>
                    <View style={styles.star}>
                        <Icon name="icon-xingqiu" size={20} />
                    </View>
                    <View style={styles.titleView}>
                        <Text style={styles.title} numberOfLines={1}>为保护您的收藏阅读记录，请</Text>
                    </View>
                </View>
                <View style={styles.rightView}>
                    <Touchable style={styles.loginView} onPress={() => {
                        navigation.navigate("Login");
                    }}>
                        <View style={styles.login}>
                            <Text>登录</Text>
                            <Icon name="icon-hp-arrow-up" style={styles.arrow_up} size={12} />
                        </View>
                    </Touchable>
                    <View style={styles.registerView}>
                        <Touchable style={styles.register} onPress={() => {
                            navigation.navigate("Register");
                        }}>
                            <Text>快速注册</Text>
                            <Icon name="icon-hp-arrow-down" style={styles.arrow_down} size={12} />
                        </Touchable>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: Color.yellow
    },
    content: {
        flex: 1,
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: Color.page_bg
    },
    leftView: {
        flex: 3,
        flexDirection: "row"
    },
    star: {
        width: 20
    },
    titleView: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        fontSize: 13
    },
    rightView: {
        flex: 2.5,
        paddingHorizontal: 5,
        flexDirection: "row"
    },
    loginView: {
        flex: 1,
        justifyContent: "center"
    },
    login: {
        width: "100%",
        height: 30,
        borderWidth: 2,
        borderColor: Color.black,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.red
    },
    arrow_up: {
        position: "absolute",
        right: -7,
        bottom: -10
    },
    registerView: {
        flex: 1,
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    register: {
        width: "100%",
        height: 30,
        borderWidth: 2,
        borderColor: Color.black,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.red
    },
    arrow_down: {
        position: "absolute",
        right: -7,
        top: -10
    }
});

export default LoginPending;
