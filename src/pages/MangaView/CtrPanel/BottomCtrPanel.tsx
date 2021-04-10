import React from "react";
import { StyleSheet, Animated, View } from "react-native";
import { Color } from "@/utils/const";
import { viewportWidth } from "@/utils/index";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Current from "@/pages/MangaView/Panel/Current";
import Slider from "@/pages/MangaView/Panel/Slider";
import Bottom from "@/pages/MangaView/Panel/Bottom";


interface IProps {
    bottomPanelValue: Animated.Value;
    scrollToIndex: (index: number) => void;
    showDrawer: () => void;
    lastChapter: () => void;
    nextChapter: () => void;
}

function BottomCtrPanel({ bottomPanelValue, scrollToIndex, showDrawer, lastChapter, nextChapter }: IProps) {
    return (
        <Animated.View style={[styles.container, {
            transform: [{ translateY: bottomPanelValue }]
        }]}>
            <Current />
            <Slider
                scrollToIndex={scrollToIndex}
                lastChapter={lastChapter}
                nextChapter={nextChapter}
            />
            <Bottom showDrawer={showDrawer} />
            {/*<View style={{ height: getBottomSpace(), backgroundColor: Color.black }} />*/}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 0,
        width: viewportWidth,
        backgroundColor: Color.black,
        bottom: 0,
        zIndex: 10
    }
});

export default BottomCtrPanel;
