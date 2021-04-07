import React from "react";
import { StyleSheet, View } from "react-native";
import { Fade, Placeholder, PlaceholderLine } from "rn-placeholder";
import { hp, viewportWidth } from "@/utils/index";
import { getStatusBarHeight } from "react-native-iphone-x-helper";


function BriefPlaceholder() {
    return (
        <Placeholder
            Animation={Fade}
        >
            <PlaceholderLine style={styles.header} />
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <PlaceholderLine width={20} style={{ height: 45 }} />
                <PlaceholderLine width={30} style={{ height: 45 }} />
            </View>
            <PlaceholderLine style={{ height: 70 }} />
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <PlaceholderLine width={20} style={{ height: 35, marginLeft: 15 }} />
                <PlaceholderLine width={20} style={{ height: 35, marginLeft: 15 }} />
                <PlaceholderLine width={20} style={{ height: 35, marginLeft: 15 }} />
                <PlaceholderLine width={20} style={{ height: 35, marginLeft: 15 }} />
                <PlaceholderLine width={20} style={{ height: 35, marginLeft: 15 }} />
                <PlaceholderLine width={20} style={{ height: 35, marginLeft: 15 }} />
                <PlaceholderLine width={20} style={{ height: 35, marginLeft: 15 }} />
                <PlaceholderLine width={20} style={{ height: 35, marginLeft: 15 }} />
            </View>
        </Placeholder>
    );
}

const styles = StyleSheet.create({
    header: {
        width: viewportWidth,
        height: hp(35) + getStatusBarHeight()
    }
});

export default BriefPlaceholder;
