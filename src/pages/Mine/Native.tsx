import React, { useEffect } from "react";
import { Text, StyleSheet, NativeModules, DeviceEventEmitter } from "react-native";
import { Color } from "@/utils/const";
import Icon from "@/assets/iconfont";
import Touchable from "@/components/Touchable";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigation } from "@/navigator/index";

function Native() {

    const navigation = useNavigation<RootStackNavigation>();

    useEffect(() => {
        const eventListener = DeviceEventEmitter.addListener("goNavigation", (event) => {
            console.log(event)
            if (event.type === "1") {
                navigation.push("Search");
            }
        });
        return () => eventListener.remove();
    }, []);

    const onPress = () => {
        NativeModules.Bridge.startActivityFromJS("com.manga.HelloActivity", "1");
    };

    return (
        <Touchable onPress={onPress} style={styles.container}>
            <Text>跳转原生页面</Text>
            <Icon name="icon-arrow-right" color={Color.dark_title} size={16} />
        </Touchable>
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

export default Native;
