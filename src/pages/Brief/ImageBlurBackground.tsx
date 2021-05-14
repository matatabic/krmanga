import React, { useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { hp, ip, viewportWidth } from "@/utils/index";
import { IBookInfo } from "@/models/brief";
import ErrorImage from "@/assets/image/error.png";


interface IProps {
    bookInfo: IBookInfo;
    imageSize: Animated.AnimatedInterpolation;
}

function ImageBlurBackground({ bookInfo, imageSize }: IProps) {

    const [errorLoad, setErrorLoad] = useState<boolean>(false);

    const onError = () => {
        setErrorLoad(true);
    };

    return (
        bookInfo.image.length > 0 ?
            <View style={styles.container}>
                <Animated.Image
                    source={errorLoad ? ErrorImage : { uri: bookInfo.image }}
                    onError={onError}
                    blurRadius={10}
                    style={[styles.image, {
                        transform: [{ scale: imageSize }]
                    }]}
                    resizeMode={"stretch"}
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
