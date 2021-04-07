import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { getCurrentDate, wp } from "@/utils/index";
import { Color } from "@/utils/const";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { useBatteryLevel } from "react-native-device-info";
import { useNetInfo } from "@react-native-community/netinfo";


const mapStateToProps = ({ mangaView }: RootState) => {
    return {
        currentEpisodeTotal: mangaView.currentEpisodeTotal,
        currentChapterNum: mangaView.currentChapterNum,
        currentNumber: mangaView.currentNumber
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;


function BottomStatusBar({ currentChapterNum, currentNumber, currentEpisodeTotal }: ModelState) {

    let batteryLevel: number | null = useBatteryLevel();
    batteryLevel = batteryLevel ? parseInt(String(batteryLevel * 100)) : null;
    const netInfo = useNetInfo();

    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const time: string = getCurrentDate();
        setCurrentTime(time);
        const intervalHandle = setInterval(() => {
            const currentTime: string = getCurrentDate();
            setCurrentTime(currentTime);
        }, 1000);
        return () => clearInterval(intervalHandle);
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>第{currentChapterNum}回</Text>
            </View>
            <View>
                <Text style={styles.title}>{`${currentNumber}/${currentEpisodeTotal}`}</Text>
            </View>
            <View>
                <Text style={styles.title}>{currentTime}</Text>
            </View>
            <View>
                <Text style={styles.title}>{netInfo.type}</Text>
            </View>
            <View>
                <Text style={styles.title}>电量:{batteryLevel}%</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 0,
        borderTopLeftRadius: 10,
        bottom: getBottomSpace(),
        width: wp(65),
        height: 30,
        backgroundColor: Color.translucent,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    title: {
        color: Color.white
    }
});

export default connector(BottomStatusBar);
