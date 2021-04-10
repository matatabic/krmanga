import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Slider from "react-native-slider";
import { wp } from "@/utils/index";
import { Color } from "@/utils/const";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import Icon from "@/assets/iconfont";
import Touchable from "@/components/Touchable";


const mapStateToProps = ({ mangaView }: RootState) => {
    return {
        currentEpisodeTotal: mangaView.currentEpisodeTotal,
        currentNumber: mangaView.currentNumber,
        currentChapterNum: mangaView.currentChapterNum,
        chapter_total: mangaView.pagination.chapter_total
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    scrollToIndex: (index: number) => void;
    lastChapter: () => void;
    nextChapter: () => void;
}


function SliderView({ dispatch, currentEpisodeTotal, currentNumber, currentChapterNum, chapter_total, scrollToIndex, lastChapter, nextChapter }: IProps) {

    let [time, setTime] = useState<NodeJS.Timeout | null>(null);

    const changeValue = (currentNumber: number) => {
        dispatch({
            type: "mangaView/setCurrentIndex",
            payload: {
                currentNumber
            },
            debounce,
            callback: scrollToIndex
        });
    };

    const debounce = (cb: any, wait = 500) => {
        if (time !== null) {
            clearTimeout(time);
        }

        let tempTime = setTimeout(() => {
            time = null;
            cb && cb();
        }, wait);

        setTime(tempTime);
    };

    const lastClick = () => {
        if (typeof lastChapter === "function") {
            lastChapter();
        }
    };

    const nextClick = () => {
        if (typeof nextChapter === "function") {
            nextChapter();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.view_layout}>
                {
                    currentChapterNum > 1 ?
                        <Touchable onPress={lastClick}>
                            <Icon name="icon-shangyige" color={Color.yellow} size={20} />
                        </Touchable> :
                        <Icon name="icon-shangyige" color={Color.night} size={20} />
                }
                <Slider
                    style={styles.slide}
                    maximumValue={currentEpisodeTotal}
                    minimumValue={1}
                    step={1}
                    value={currentNumber}
                    minimumTrackTintColor={Color.theme}
                    onValueChange={(value: number) => {
                        changeValue(value);
                    }}
                />
                {
                    currentChapterNum !== chapter_total ?
                        <Touchable onPress={nextClick}>
                            <Icon name="icon-xiayige-copy" color={Color.yellow} size={20} />
                        </Touchable> :
                        <Icon name="icon-xiayige-copy" color={Color.night} size={20} />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
        borderColor: Color.night,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    view_layout: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20
    },
    slide: {
        width: wp(70)
    }
});

export default connector(SliderView);
