import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialTopTabBar, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import Touchable from "@/components/Touchable";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { Color } from "@/utils/const";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import LoginPending from "@/pages/Shelf/LoginPending";
import { ModalStackNavigation } from "@/navigator/index";
import { useNavigation } from "@react-navigation/native";

const mapStateToProps = ({ user, collection, history, downloadManage }: RootState) => {
    return {
        isLogin: user.isLogin,
        isCollectionEdit: collection.isEdit,
        isHistoryEdit: history.isEdit,
        isDownloadEdit: downloadManage.isEdit
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector> & MaterialTopTabBarProps;

function TopBar({
                    dispatch, isLogin, indicatorStyle, activeTintColor,
                    isCollectionEdit, isHistoryEdit, isDownloadEdit, ...rest
                }: ModelState) {

    const navigation = useNavigation<ModalStackNavigation>();
    let activeScreen = "collection";
    let isEdit = false;
    if (rest.state.index === 0) {
        isEdit = isCollectionEdit;
        activeScreen = "collection";
    } else if (rest.state.index === 1) {
        isEdit = isHistoryEdit;
        activeScreen = "history";
    } else if (rest.state.index === 2) {
        isEdit = isDownloadEdit;
        activeScreen = "downloadManage";
    }
    const onPress = () => {
        if (!isLogin) {
            navigation.navigate("Login");
        } else {
            dispatch({
                type: `${activeScreen}/setState`,
                payload: {
                    isEdit: !isEdit,
                    ids: []
                }
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topTabBarView}>
                <MaterialTopTabBar
                    {...rest}
                    indicatorStyle={indicatorStyle}
                    activeTintColor={activeTintColor}
                    style={styles.tabBar}
                />
                <Touchable
                    style={styles.editBtn}
                    onPress={onPress}>
                    <Text style={styles.text}>{isEdit ? "取消" : "编辑"}</Text>
                </Touchable>
            </View>
            {!isLogin && <LoginPending />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight(),
        backgroundColor: Color.theme
    },
    topTabBarView: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: Color.light,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    tabBar: {
        flex: 1,
        marginLeft: 25,
        elevation: 0,
        overflow: "hidden",
        backgroundColor: "transparent"
    },
    editBtn: {
        paddingHorizontal: 15,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: Color.light
    },
    text: {
        color: Color.white,
        fontSize: 15
    }
});

export default connector(TopBar);
