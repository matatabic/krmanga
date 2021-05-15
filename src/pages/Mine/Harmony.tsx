import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { Color } from "@/utils/const";
import FingerprintScanner from "react-native-fingerprint-scanner";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import Touchable from "@/components/Touchable";
import { wp } from "@/utils/index";
import Toast from "react-native-root-toast";


const mapStateToProps = ({ mine }: RootState) => {
    return {
        harmony: mine.harmony
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

function Harmony({ dispatch, harmony }: ModelState) {

    const [auth, setAuth] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            FingerprintScanner.release();
        };
    }, []);

    const onPress = () => {
        if (auth) {
            dispatch({
                type: "mine/changeHarmony",
                payload: {
                    harmony: !harmony
                }
            });
        } else {
            FingerprintScanner
                .authenticate({ description: "请通过身份认证" })
                .then(() => {
                    setAuth(true);
                    dispatch({
                        type: "mine/changeHarmony",
                        payload: {
                            harmony: !harmony
                        }
                    });
                })
                .catch(() => {
                    Toast.show("身份验证失败", {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true
                    });
                });
        }
    };


    return (
        <View style={styles.container}>
            <Text>切换模式</Text>
            <Touchable
                onPress={onPress}
                style={styles.switchWrapper}
            />
            <Switch value={harmony} />
        </View>
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
    },
    switchWrapper: {
        position: "absolute",
        right: 0,
        zIndex: 1,
        width: wp(20),
        height: "100%"
    }
});

export default connector(Harmony);
