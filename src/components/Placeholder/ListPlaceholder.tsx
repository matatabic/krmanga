import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Fade, Placeholder, PlaceholderLine, PlaceholderMedia} from "rn-placeholder";
import {ip, wp} from "@/utils/index";
import {Color} from "@/utils/const";

const imageWidth = wp(25);
const imageHeight = ip(imageWidth);
const itemHeight = imageHeight + 10;


const ListPlaceholder = () => {
    return (
        <>
            <Placeholder
                Animation={Fade}
            >
                <View style={styles.item}>
                    <PlaceholderMedia style={styles.image}/>
                    <View style={styles.mainView}>
                        <PlaceholderLine width={45}/>
                        <PlaceholderLine width={45}/>
                        <PlaceholderLine width={45}/>
                    </View>
                    <View style={styles.rightView}>
                        <PlaceholderLine width={45}/>
                    </View>
                </View>
            </Placeholder>
            <Placeholder
                Animation={Fade}
            >
                <View style={styles.item}>
                    <PlaceholderMedia style={styles.image}/>
                    <View style={styles.mainView}>
                        <PlaceholderLine width={45}/>
                        <PlaceholderLine width={45}/>
                        <PlaceholderLine width={45}/>
                    </View>
                    <View style={styles.rightView}>
                        <PlaceholderLine width={45}/>
                    </View>
                </View>
            </Placeholder>
            <Placeholder
                Animation={Fade}
            >
                <View style={styles.item}>
                    <PlaceholderMedia style={styles.image}/>
                    <View style={styles.mainView}>
                        <PlaceholderLine width={45}/>
                        <PlaceholderLine width={45}/>
                        <PlaceholderLine width={45}/>
                    </View>
                    <View style={styles.rightView}>
                        <PlaceholderLine width={45}/>
                    </View>
                </View>
            </Placeholder>
            <Placeholder
                Animation={Fade}
            >
                <View style={styles.item}>
                    <PlaceholderMedia style={styles.image}/>
                    <View style={styles.mainView}>
                        <PlaceholderLine width={45}/>
                        <PlaceholderLine width={45}/>
                        <PlaceholderLine width={45}/>
                    </View>
                    <View style={styles.rightView}>
                        <PlaceholderLine width={45}/>
                    </View>
                </View>
            </Placeholder>
            <Placeholder
                Animation={Fade}
            >
                <View style={styles.item}>
                    <PlaceholderMedia style={styles.image}/>
                    <View style={styles.mainView}>
                        <PlaceholderLine width={45}/>
                        <PlaceholderLine width={45}/>
                        <PlaceholderLine width={45}/>
                    </View>
                    <View style={styles.rightView}>
                        <PlaceholderLine width={45}/>
                    </View>
                </View>
            </Placeholder>
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        height: itemHeight,
        paddingTop: 5,
        flexDirection: 'row',
        backgroundColor: Color.white,
        paddingHorizontal: 20,
    },
    image: {
        borderRadius: 10,
        width: imageWidth,
        height: imageHeight,
    },
    mainView: {
        flex: 1,
        justifyContent: "space-between",
        padding: 10,
    },
    titleText: {
        fontSize: 15,
    },
    infoTitle: {
        paddingVertical: 5,
        color: Color.dark_title,
    },
    rightView: {
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ListPlaceholder;
