import React, { memo, useState } from "react";
import { View, Text, StyleSheet, Animated, Platform } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Color } from "@/utils/const";
import Touchable from "@/components/Touchable";
import codePush from "react-native-code-push";
import { ModalStackNavigation } from "@/navigator/index";
import Toast from "react-native-root-toast";


interface IProps {
    navigation: ModalStackNavigation;
}

function AppUpdate({ navigation }: IProps) {

    const [status, setStatus] = useState<number | null>(null);
    const [progress, setProgress] = useState<number>(0);

    const onPress = () => {
        if (Platform.OS === "ios") {
            Toast.show("ios没添加版本更新", {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true
            });
            return false;
        }

        if (status == 0 || status == 1) {
            codePush.restartApp(true);
            navigation.goBack();
        }

        codePush.sync({},
            (status => {
                setStatus(status);
            }),
            ({ receivedBytes, totalBytes }) => {
                setProgress(Math.round(receivedBytes / totalBytes * 100));
            }
        );

    };

    return (
        <Animated.View style={styles.container}>
            <View style={styles.CircularLoad}>
                <Touchable onPress={onPress}>
                    <AnimatedCircularProgress
                        size={180}
                        width={10}
                        backgroundWidth={5}
                        fill={progress}
                        rotation={0}
                        tintColor={Color.theme}
                        backgroundColor={Color.dark_title}
                    >
                        {(fill) => {
                            switch (status) {
                                case 0:
                                    return (<Text style={{ fontSize: 18 }}>最新版</Text>);
                                case 1:
                                    return (<Text style={{ fontSize: 18, color: Color.black }}>更新完成</Text>);
                                case 4:
                                    return (<Text style={styles.title}>{Math.round(fill)}</Text>);
                                case 5:
                                    return (<Text style={{ fontSize: 18 }}>查询更新中</Text>);
                                case 7:
                                    return (<Text style={styles.title}>{Math.round(fill)}</Text>);
                                default:
                                    return (<Text style={{ fontSize: 18 }}>检测版本</Text>);
                            }
                        }}
                    </AnimatedCircularProgress>
                </Touchable>
            </View>
            <View style={styles.bottomView}>
                <Touchable onPress={() => {
                    codePush.restartApp(true);
                    navigation.goBack();
                }} style={styles.back}>
                    <Text style={{ color: Color.white }}>
                        {(status == 0 || status == 1) ? "返回" : "下次一定"}
                    </Text>
                </Touchable>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: Color.page_bg
    },
    CircularLoad: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: Color.theme,
        fontSize: 50
    },
    bottomView: {
        height: 200,
        alignItems: "center"
    },
    back: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        width: 90,
        height: 45,
        backgroundColor: Color.green
    }
});

export default memo(AppUpdate);
