import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Fade, Placeholder, PlaceholderMedia, PlaceholderLine} from "rn-placeholder";
import {ip, viewportWidth, wp} from "@/utils/index";
import {Color} from "@/utils/const";

const itemWidth = wp(90) / 3;
const imageHeight = ip(itemWidth);
const itemMargin = (viewportWidth - wp(90)) / 4;


const BookPlaceholder = () => {
    return (
        <Placeholder
            Animation={Fade}
        >
            <View style={{flexDirection: "row"}}>
                <View style={styles.itemWrapper}>
                    <PlaceholderMedia style={styles.item}/>
                    <PlaceholderLine style={styles.line}/>
                </View>
                <View style={styles.itemWrapper}>
                    <PlaceholderMedia style={styles.item}/>
                    <PlaceholderLine style={styles.line}/>
                </View>
                <View style={styles.itemWrapper}>
                    <PlaceholderMedia style={styles.item}/>
                    <PlaceholderLine style={styles.line}/>
                </View>
            </View>
            <View style={{flexDirection: "row"}}>
                <View style={styles.itemWrapper}>
                    <PlaceholderMedia style={styles.item}/>
                    <PlaceholderLine style={styles.line}/>
                </View>
                <View style={styles.itemWrapper}>
                    <PlaceholderMedia style={styles.item}/>
                    <PlaceholderLine style={styles.line}/>
                </View>
                <View style={styles.itemWrapper}>
                    <PlaceholderMedia style={styles.item}/>
                    <PlaceholderLine style={styles.line}/>
                </View>
            </View>
            <View style={{flexDirection: "row"}}>
                <View style={styles.itemWrapper}>
                    <PlaceholderMedia style={styles.item}/>
                    <PlaceholderLine style={styles.line}/>
                </View>
                <View style={styles.itemWrapper}>
                    <PlaceholderMedia style={styles.item}/>
                    <PlaceholderLine style={styles.line}/>
                </View>
                <View style={styles.itemWrapper}>
                    <PlaceholderMedia style={styles.item}/>
                    <PlaceholderLine style={styles.line}/>
                </View>
            </View>
        </Placeholder>
    )
}

const styles = StyleSheet.create({
    itemWrapper: {
        marginLeft: itemMargin,
    },
    item: {
        width: itemWidth,
        height: imageHeight,
        marginTop: itemMargin,
        backgroundColor: Color.white,
    },
    line: {
        width: itemWidth,
        height: 15,
        marginTop: 5,
    }
})

export default BookPlaceholder;
