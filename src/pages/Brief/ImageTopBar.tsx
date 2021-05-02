import React, { useState } from "react";
import { Animated, Image, StyleSheet } from "react-native";
import { ip, viewportWidth } from "@/utils/index";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import ErrorImage from "@/assets/image/error.png";


const mapStateToProps = ({ brief }: RootState) => {
    return {
        bookInfo: brief.bookInfo
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    compHeight: number,
    opacity: Animated.AnimatedInterpolation;
}

function ImageTopBar({ compHeight, bookInfo, opacity }: IProps) {

    const [errorLoad, setErrorLoad] = useState<boolean>(false);

    const onError = () => {
        setErrorLoad(true);
    };

    return (
        bookInfo.image.length > 0 ?
            <Animated.View style={[styles.container, {
                height: 130,
                opacity: opacity
            }]}>
                <Image
                    source={errorLoad ? ErrorImage : { uri: bookInfo.image }}
                    blurRadius={5}
                    onError={onError}
                    style={[styles.image, {
                        top: compHeight
                    }]}
                    resizeMode={"stretch"}
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
