import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { viewportWidth } from "@/utils/index";
import { IEpisode } from "@/models/mangaView";
import FastImage, { OnProgressEvent } from "react-native-fast-image";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Color } from "@/utils/const";


interface IProps {
    data: IEpisode;
}

function Item({ data }: IProps) {
    
    const [loadNum, setLoadNum] = useState<number>(0);
    const [loadEnd, setLoadEnd] = useState<boolean>(true);

    const onError = () => {
        console.log("onError");
    };

    const onLoadEnd = () => {
        setLoadEnd(false);
    };

    const onProgress = (event: OnProgressEvent) => {
        const loading = Math.round(event.nativeEvent.loaded / event.nativeEvent.total * 100);
        if (loading > 0) {
            setLoadNum(loading);
        }
    };

    return (
        <View style={styles.container}>
            <FastImage source={{ uri: data.image }}
                       onError={onError}
                       onLoadEnd={onLoadEnd}
                       onProgress={onProgress}
                       style={{
                           width: viewportWidth,
                           height: viewportWidth * data.multiple
                       }}
            />
            {
                loadEnd &&
                <View style={[styles.CircularLoad, {
                    width: viewportWidth,
                    height: viewportWidth * data.multiple
                }]}>
                  <AnimatedCircularProgress
                    size={150}
                    width={15}
                    backgroundWidth={15}
                    fill={loadNum}
                    tintColor={Color.theme}
                    backgroundColor={Color.white}
                  >
                      {fill => <Text style={styles.points}>{Math.round(fill)}</Text>}
                  </AnimatedCircularProgress>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    CircularLoad: {
        position: "absolute",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.black
    },
    points: {
        textAlign: "center",
        color: Color.theme,
        fontSize: 50,
        fontWeight: "500"
    }
});

export default Item;
