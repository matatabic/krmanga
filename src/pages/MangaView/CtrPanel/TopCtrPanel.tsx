import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Color } from "@/utils/const";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Icon from "@/assets/iconfont";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import Touchable from "@/components/Touchable";
import { RootStackNavigation } from "@/navigator/index";
import Toast from "react-native-root-toast";


const mapStateToProps = ({ brief, mangaView }: RootState) => {
    return {
        headerHeight: brief.headerHeight,
        currentTitle: mangaView.currentTitle
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    book_id: number;
    topPanelValue: Animated.Value;
    navigation: RootStackNavigation;
}

function TopCtrPanel({ book_id, headerHeight, topPanelValue, currentTitle, navigation }: IProps) {

    return (
        <Animated.View style={[styles.wrapper, {
            height: headerHeight + getStatusBarHeight(),
            transform: [{ translateY: topPanelValue }]
        }]}>
            <View style={styles.container}>
                <View style={styles.leftView}>
                    <Touchable onPress={() => navigation.goBack()} style={styles.backWrapper}>
                        <Icon name="icon-zuofang" color={Color.white} style={styles.leftIcon} size={22} />
                    </Touchable>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.title}>第{currentTitle}话</Text>
                </View>
                <View style={styles.rightView}>
                    <Touchable onPress={() => {
                        navigation.navigate("Download", {
                            book_id
                        });
                    }}>
                        <Icon name="icon-xiabian" color={Color.white} style={styles.rightIcon} size={22} />
                    </Touchable>
                    <Touchable onPress={() => {
                        Toast.show("未做", {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.CENTER,
                            shadow: true,
                            animation: true
                        });
                    }}>
                        <Icon name="icon-elipsis" color={Color.white} style={styles.rightIcon} size={22} />
                    </Touchable>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: getStatusBarHeight(),
        backgroundColor: Color.black,
        zIndex: 10
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    leftView: {
        width: 80
    },
    backWrapper: {
        justifyContent: "center"
    },
    leftIcon: {
        marginLeft: 10
    },
    titleView: {
        flex: 1,
        alignItems: "center"
    },
    title: {
        color: Color.white,
        fontSize: 18,
        fontWeight: "bold"
    },
    rightView: {
        width: 80,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    rightIcon: {
        marginRight: 15
    }
});

export default connector(TopCtrPanel);
