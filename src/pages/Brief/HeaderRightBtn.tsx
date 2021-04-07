import React from "react";
import { Animated, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Touchable from "@/components/Touchable";
import Icon from "@/assets/iconfont";
import { Color } from "@/utils/const";

interface IProps {
    opacity: Animated.AnimatedInterpolation;
}

function HeaderRightBtn({ opacity }: IProps) {
    return (
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
        alignItems: "center",
        marginHorizontal: 10
    },
    backView: {
        paddingTop: getStatusBarHeight(),
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 5
    },
    leftView: {
        height: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    rightView: {
        height: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    rightIcon: {
        marginHorizontal: 10
    }
});

export default HeaderRightBtn;
