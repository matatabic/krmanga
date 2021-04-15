import React from "react";
import { StyleSheet, View } from "react-native";
import { Fade, Placeholder, PlaceholderLine } from "rn-placeholder";
import { hp, viewportWidth } from "@/utils/index";
import BookPlaceholder from "./BookPlaceholder";
import { getStatusBarHeight } from "react-native-iphone-x-helper";


const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;
const itemHeight = 48;
const padding = 5;

const HomePlaceholder = () => {
    return (
        <View style={styles.container}>
            <Placeholder
                Animation={Fade}
            >
                <View style={styles.rectangleView}>
                    <PlaceholderLine style={styles.rectangle} />
                    <PlaceholderLine style={styles.rectangle} />
                    <PlaceholderLine style={styles.rectangle} />
                    <PlaceholderLine style={styles.rectangle} />
                </View>
                <PlaceholderLine style={styles.carousel} />
                <PlaceholderLine style={styles.line} />
            </Placeholder>
            <BookPlaceholder />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight()
    },
    rectangleView: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 5
    },
    rectangle: {
        width: itemWidth,
        height: itemHeight,
        padding: padding
    },
    carousel: {
        height: hp(30)
    },
    line: {
        height: 45
    }
});

export default HomePlaceholder;
