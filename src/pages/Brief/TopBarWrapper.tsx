import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RootStackNavigation } from "@/navigator/index";
import Touchable from "@/components/Touchable";
import Icon from "@/assets/iconfont";
import { Color } from "@/utils/const";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/stack";


interface IProps {
    opacity: Animated.AnimatedInterpolation;
}

function TopBarWrapper({ opacity }: IProps) {

    const navigation = useNavigation<RootStackNavigation>();
    const headerHeight = useHeaderHeight();

    return (
        <View style={[styles.wrapper, {
            height: headerHeight
        }]}>
            <View style={styles.container}>
                <Touchable onPress={() => navigation.goBack()}>
                    <View style={styles.leftView}>
                        <Icon name="icon-zuofang" color={Color.white} size={22} />
                    </View>
                </Touchable>
                <Animated.View style={[styles.rightView, {
                    opacity: opacity
                }]}>
                    <Touchable onPress={() => {
                        console.log("shangbian");
                    }}>
                        <Icon style={styles.rightIcon} name="icon-shangbian" color={Color.white} size={22} />
                    </Touchable>
                    <Touchable onPress={() => {
                        console.log("xiabian");
                    }}>
                        <Icon style={styles.rightIcon} name="icon-xiabian" color={Color.white} size={22} />
                    </Touchable>
                    <Touchable onPress={() => {
                        console.log("more");
                    }}>
                        <Icon style={styles.rightIcon} name="icon-more" color={Color.white} size={22} />
                    </Touchable>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 20
    },
    container: {
        flex: 1,
        paddingTop: getStatusBarHeight(),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginHorizontal: 10
    },
    leftView: {},
    rightView: {
        flexDirection: "row"
    },
    rightIcon: {
        marginHorizontal: 10
    }
});

export default TopBarWrapper;
