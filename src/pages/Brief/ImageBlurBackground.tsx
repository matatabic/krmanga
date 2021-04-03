import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { hp, ip, viewportWidth } from "@/utils/index";
import { IBookInfo } from "@/models/brief";
import FastImage from "react-native-fast-image";
import { BlurView } from "@react-native-community/blur";


interface IProps {
    bookInfo: IBookInfo;
    imageSize: Animated.AnimatedInterpolation;
}

function ImageBlurBackground({ bookInfo, imageSize }: IProps) {
    return (
        bookInfo.image.length > 0 ?
            <View style={styles.container}>
                <Animated.Image
                    source={{ uri: bookInfo.image }}
                    style={[styles.image, {
                        transform: [{ scale: imageSize }]
                    }]}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <BlurView
                    blurType="dark"
                    blurAmount={25}
                    style={StyleSheet.absoluteFillObject}
                />
            </View> : null
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: hp(65),
        overflow: "hidden"
    },
    image: {
        width: viewportWidth,
        height: ip(viewportWidth)
    }
});

export default ImageBlurBackground;
