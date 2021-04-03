import React from "react";
import { Animated, StyleSheet } from "react-native";
import { ip, viewportWidth } from "@/utils/index";
import FastImage from "react-native-fast-image";
import { BlurView } from "@react-native-community/blur";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";


const mapStateToProps = ({ brief }: RootState) => {
    return {
        bookInfo: brief.bookInfo
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState{
    opacity: Animated.AnimatedInterpolation;
}

function ImageTopBar({ bookInfo, opacity }: IProps) {
    return (
        bookInfo.image.length > 0 ?
            <Animated.View style={[styles.container, {
                height: 130,
                opacity: opacity
            }]}>
                <FastImage
                    source={{ uri: bookInfo.image }}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <BlurView
                    blurType="dark"
                    blurAmount={25}
                    style={StyleSheet.absoluteFillObject}
                />
            </Animated.View> : null
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: "hidden"
    },
    image: {
        width: viewportWidth,
        height: ip(viewportWidth)
    }
});

export default connector(ImageTopBar);
