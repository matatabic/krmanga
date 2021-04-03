import React, { useState } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { Color } from "@/utils/const";
import { ip, wp } from "@/utils/index";
import ErrorImage from "@/assets/image/error.png";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { useHeaderHeight } from "@react-navigation/stack";

const mapStateToProps = ({ brief }: RootState) => {
    return {
        bookInfo: brief.bookInfo
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    opacity: Animated.AnimatedInterpolation;
}

const imageWidth = wp(30);
const imageHeight = ip(imageWidth);

function Information({ bookInfo, opacity }: IProps) {

    const [errorLoad, setErrorLoad] = useState<boolean>(false);

    const showError = () => {
        setErrorLoad(true);
    };

    return (
        bookInfo.image.length > 0 ?
            <Animated.View style={[styles.container, {
                paddingTop: useHeaderHeight(),
                opacity: opacity
            }]}>
                <View style={styles.leftView}>
                    <FastImage
                        source={errorLoad ? ErrorImage : { uri: bookInfo.image, cache: FastImage.cacheControl.immutable }}
                        onError={showError}
                        style={styles.image}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
                <View style={styles.rightView}>
                    <Text style={styles.title}>{bookInfo.title}</Text>
                    <Text style={styles.bulletin}>{bookInfo.status}</Text>
                    <Text style={styles.bulletin}>{bookInfo.author}</Text>
                    <Text style={styles.bulletin}>{bookInfo.category}</Text>
                </View>
            </Animated.View> : null
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        bottom: -50,
        zIndex: 200,
        flexDirection: "row"
    },
    leftView: {
        marginLeft: 20
    },
    rightView: {
        marginLeft: 20
    },
    title: {
        color: Color.grey_title,
        fontSize: 18,
        marginTop: 5,
        marginBottom: 12
    },
    bulletin: {
        color: Color.grey_title,
        fontSize: 15,
        marginBottom: 12
    },
    image: {
        width: imageWidth,
        height: imageHeight
    }
});

export default connector(Information);
