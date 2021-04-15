import React from "react";
import { StyleSheet, View } from "react-native";
import { Fade, Placeholder, PlaceholderLine } from "rn-placeholder";
import { getStatusBarHeight } from "react-native-iphone-x-helper";


const DownloadPlaceholder = () => {
    return (
        <View style={styles.container}>
            <Placeholder
                Animation={Fade}
            >
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <PlaceholderLine width={20} style={{ height: 35, marginLeft: 15 }} />
                    <PlaceholderLine width={20} style={{ height: 35, marginLeft: 15 }} />
                    <PlaceholderLine width={20} style={{ height: 35, marginLeft: 15 }} />
                    <PlaceholderLine width={20} style={{ height: 35, marginLeft: 15 }} />
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight()
    },
});

export default DownloadPlaceholder;
