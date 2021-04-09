import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
    MaterialTopTabBar,
    MaterialTopTabBarProps
} from "@react-navigation/material-top-tabs";
import Touchable from "@/components/Touchable";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { Color } from "@/utils/const";
import Item from "./Item";
import { IStatus } from "@/models/categorySetting";

const mapStateToProps = (state: RootState) => {
    const { category, categorySetting } = state;
    return {
        activeStatus: category.activeStatus,
        activeCategory: category.activeCategory,
        statusList: categorySetting.statusList
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;

function TopBar({
                    dispatch, activeCategory, statusList,
                    indicatorStyle, activeTintColor, activeStatus,
                    ...restProps
                }: IProps) {

    const onPress = useCallback((item: IStatus) => {
        dispatch({
            type: "category/setState",
            payload: {
                activeStatus: item.id
            }
        });
        dispatch({
            type: `tab-category-${activeCategory}-status-${item.id}/fetchBookList`,
            payload: {
                refreshing: true,
                category_id: activeCategory,
                status: item.id
            }
        });
    }, [activeCategory]);

    return (
        <View style={styles.container}>
            <View style={styles.topTabBarView}>
                <MaterialTopTabBar
                    {...restProps}
                    indicatorStyle={indicatorStyle}
                    activeTintColor={activeTintColor}
                    style={styles.tabBar}
                />
                <Touchable
                    style={styles.categoryBtn}
                    onPress={() => restProps.navigation.navigate("CategorySetting")}>
                    <Text style={styles.text}>···</Text>
                </Touchable>
            </View>
            <View style={styles.bottomTabBarView}>
                {
                    statusList.map((item) => {
                        const active = item.id == activeStatus;
                        return (
                            <View key={item.id}>
                                <Item data={item} active={active} onClickEdit={onPress} />
                            </View>
                        );
                    })
                }
            </View>
            <View style={styles.line} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.white
    },
    topTabBarView: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: Color.light,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    tabBar: {
        flex: 1,
        elevation: 0,
        overflow: "hidden",
        backgroundColor: "transparent"
    },
    categoryBtn: {
        paddingHorizontal: 10,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: Color.light
    },
    text: {
        color: Color.black,
        fontSize: 15
    },
    whiteBackgroundColor: {
        backgroundColor: Color.page_bg
    },
    bottomTabBarView: {
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 0,
        margin: 0
    },
    bottomView: {
        width: 50,
        height: 35,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomText: {
        fontSize: 12
    },
    activeText: {
        fontSize: 12,
        color: Color.theme
    },
    line: {
        width: "100%",
        height: 7,
        backgroundColor: Color.split_line,
        marginBottom: 3
    }
});

export default connector(TopBar);
