import React, { memo } from "react";
import { Text, StyleSheet, Platform, Linking, NativeModules, PermissionsAndroid } from "react-native";
import { Color } from "@/utils/const";
import Icon from "@/assets/iconfont";
import Touchable from "@/components/Touchable";
import { init, Geolocation } from "react-native-amap-geolocation";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigation } from "@/navigator/index";


function Location() {
    const navigation = useNavigation<RootStackNavigation>();

    init({
        ios: "d8c6029fccf6818ffe8c3a1e0eb002c1",
        android: "9342ef64dc09a825776e2940b2fd68f9"
    });

    const onPress = async () => {
        if (Platform.OS === "android") {
            const res = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
            ]).then(res => {
                return !(res["android.permission.ACCESS_COARSE_LOCATION"] !== "granted"
                    || res["android.permission.ACCESS_FINE_LOCATION"] !== "granted");

            });
            if (!res) {
                return false;
            }

            await Geolocation.getCurrentPosition(({ coords }) => {
                    navigation.navigate("AMap", {
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
                }, (err) => {
                    if (err.code === 12) {
                        NativeModules.OpenSettings.openLocationSettings((data: any) => {
                            console.log("call back data", data);
                        });
                    }
                }
            );
        } else {
            await Geolocation.getCurrentPosition(({ coords }) => {
                    navigation.navigate("AMap", {
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
                }, (err) => {
                    if (err.code === 1) {
                        Linking.openURL("app-settings:")
                            .catch((err) => console.log("error", err));
                    }
                }
            );
        }
    };

    return (
        <Touchable onPress={onPress} style={styles.container}>
            <Text>定位</Text>
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

export default memo(Location);
