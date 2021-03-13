import React from 'react';
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "@/models/index";
import {StyleSheet, View} from "react-native";
import {hp} from "@/utils/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {BlurView} from "@react-native-community/blur";
import FastImage from 'react-native-fast-image';

const mapStateToProps = ({home}: RootState) => {
    return {
        carouselList: home.carouselList,
        activeCarouselIndex: home.activeCarouselIndex,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

const sideHeight = hp(30);

function CarouselBlurBackground({carouselList, activeCarouselIndex}: ModelState) {
    return (
        (carouselList && carouselList.length > 0) ?
            <View style={styles.container}>
                <FastImage
                    source={{uri: carouselList[activeCarouselIndex].image_url}}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.image}
                />
                <BlurView
                    blurType="light"
                    blurAmount={10}
                    style={StyleSheet.absoluteFillObject}
                />
            </View> : null
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: hp(55),
    },
    image: {
        height: getStatusBarHeight() + sideHeight + 60,
    }
})

export default connector(CarouselBlurBackground);
