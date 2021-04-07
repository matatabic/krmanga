import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Dog from "@/assets/image/dog.gif";
import { Color } from "@/utils/const";
import Touchable from "@/components/Touchable";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { ModalStackNavigation } from "@/navigator/index";


const mapStateToProps = ({ user }: RootState) => {
    return {
        isLogin: user.isLogin,
        userInfo: user.userInfo
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: ModalStackNavigation;
}

function Information({ dispatch, navigation, isLogin, userInfo }: IProps) {

    const logout = () => {
        dispatch({
            type: "user/logout"
        });
    };

    const goLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftView}>
                <Image source={Dog} style={styles.dog} />
                <View style={styles.titleView}>
                    <View>
                        <Text style={styles.name}>
                            {isLogin ? userInfo.nickname ? userInfo.nickname : userInfo.username : "未登录"}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.tips}>
                            {isLogin ? "vip已经过期" : "登录更安全,云端同步记录"}
                        </Text>
                    </View>
                </View>
            </View>
            {
                isLogin ?
                    <Touchable onPress={logout} style={styles.rightView}>
                        <View style={styles.login}>
                            <Text style={styles.loginTitle}>退出登录</Text>
                        </View>
                    </Touchable> :
                    <Touchable onPress={goLogin} style={styles.rightView}>
                        <View style={styles.login}>
                            <Text style={styles.loginTitle}>登录/注册</Text>
                        </View>
                    </Touchable>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10
    },
    leftView: {
        flex: 7,
        height: 65,
        flexDirection: "row",
        alignItems: "center"
    },
    rightView: {
        flex: 3,
        height: 65,
        justifyContent: "center"
    },
    dog: {
        width: 65,
        height: 65
    },
    titleView: {
        marginLeft: 5
    },
    name: {
        fontSize: 17,
        paddingBottom: 5
    },
    tips: {
        fontSize: 13,
        color: Color.grey_title
    },
    login: {
        height: 46,
        borderRadius: 23,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: "center",
        alignItems: "center"
    },
    loginTitle: {
        fontSize: 15
    }
});


export default connector(Information);
