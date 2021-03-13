import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Fade, Placeholder, PlaceholderLine} from "rn-placeholder";
import {hp} from "@/utils/index";
import BookPlaceholder from "./BookPlaceholder";
import {getStatusBarHeight} from "react-native-iphone-x-helper";


const HomePlaceholder = () => {
    return (
        <View style={styles.container}>
            <Placeholder
                Animation={Fade}
            >
                <PlaceholderLine style={styles.line}/>
                <PlaceholderLine style={styles.carousel}/>
                <PlaceholderLine style={styles.line}/>
            </Placeholder>
            <BookPlaceholder/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight()
    },
    carousel: {
        height: hp(30)
    },
    line: {
        height: 45,
    }
})

export default HomePlaceholder;
