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

    const [start, setStart] = useState<boolean>(true);
    const [latest, setLatest] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);
    let [progress, setProgress] = useState<number>(0);

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
        if (update) {
            codePush.restartApp(true);
            return false;
        }
        setStart(false);
        codePush.sync({},
            (status => {
                if (status === 0) {
                    setLatest(true);
                }
                if (status === 1) {
                    setUpdate(true);
                }
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
                            return (
                                start ?
                                    <Text style={{ fontSize: 18 }}>检测更新</Text> :
                                    (latest ?
                                        <Touchable>
                                            <Text style={{ fontSize: 18 }}>最新版</Text>
                                        </Touchable>
                                        : (update ?
                                            <Text style={{ fontSize: 18 }}>点击重启</Text>
                                            : (progress > 0 ?
                                                    <Text style={styles.title}>{Math.round(fill)}</Text>
                                                    : <Text style={{ fontSize: 18 }}>检测中</Text>
                                            )))
                            );
                        }}
                    </AnimatedCircularProgress>
                </Touchable>
            </View>
            <View style={styles.bottomView}>
                <Touchable onPress={() => {
                    codePush.restartApp(true);
                    navigation.goBack();
                }} style={styles.back}>
                    <Text style={{ color: Color.white }}>下次一定</Text>
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
