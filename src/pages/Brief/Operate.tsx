import React from "react";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { Animated, StyleSheet, View } from "react-native";
import { viewportWidth, wp } from "@/utils/index";
import { Color } from "@/utils/const";
import ImageTopBar from "@/pages/Brief/ImageTopBar";
import Touchable from "@/components/Touchable";
import Icon from "@/assets/iconfont/index";


const mapStateToProps = ({ user, brief }: RootState) => {
    return {
        isLogin: user.isLogin,
        bookInfo: brief.bookInfo,
        markChapterNum: brief.markChapterNum,
        markRoast: brief.markRoast,
        chapterList: brief.chapterList,
        collection_id: brief.collection_id
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    compHeight: number;
    opacity: Animated.AnimatedInterpolation;
    blurOpacity: Animated.AnimatedInterpolation;
    leftViewX: Animated.AnimatedInterpolation;
    rightViewX: Animated.AnimatedInterpolation;
    rightViewScale: Animated.AnimatedInterpolation;
    rightFontSize: Animated.AnimatedInterpolation;
    onClickRead: () => void;
    onClickCollection: () => void;
}

const imageWidth = wp(30);

function Operate({
                     compHeight, markChapterNum, opacity, blurOpacity, leftViewX,
                     rightViewX, rightViewScale, rightFontSize, collection_id,
                     onClickRead, onClickCollection
                 }: IProps) {

    const headerHeight = 80;

    const readHandle = () => {
        if (typeof onClickRead === "function") {
            onClickRead();
        }
    };

    const collectionHandle = () => {
        if (typeof onClickCollection === "function") {
            onClickCollection();
        }
    };

    return (
        <>
            <ImageTopBar compHeight={compHeight} opacity={blurOpacity} />
            <View style={{ height: headerHeight + 50 }}>
                <Animated.View style={[styles.shadow, {
                    height: headerHeight + 50,
                    opacity: opacity
                }]} />
                <View style={[styles.container, {
                    height: headerHeight + 50
                }]}>
                    <Animated.View style={[styles.leftView, {
                        transform: [{ translateX: leftViewX }]
                    }]}>
                        <Touchable style={{ flexDirection: "row", alignItems: "center" }}
                                   onPress={collectionHandle}>
                            <Icon name="icon-xin"
                                  color={collection_id > 0 ? Color.theme : Color.red}
                                  size={30}
                            />
                            <View>
                                <Animated.Text style={[styles.collectionTitle, {
                                    ...StyleSheet.absoluteFillObject,
                                    color: Color.white
                                }]}>
                                    {collection_id > 0 ? "已收藏" : "收藏"}
                                </Animated.Text>
                                <Animated.Text style={[styles.collectionTitle, {
                                    opacity: opacity
                                }]}>
                                    {collection_id > 0 ? "已收藏" : "收藏"}
                                </Animated.Text>
                            </View>
                        </Touchable>
                    </Animated.View>
                    <View style={styles.rightView}>
                        <Animated.View style={[styles.read, {
                            transform: [{ scale: rightViewScale }, { translateX: rightViewX }]
                        }]}>
                            <Touchable style={styles.read} onPress={readHandle}>
                                <View>
                                    <Animated.Text style={{
                                        ...StyleSheet.absoluteFillObject,
                                        color: Color.white,
                                        transform: [{ scale: rightFontSize }]
                                    }}>
                                        {markChapterNum > 0 ? `续看第${markChapterNum}话` : "开始阅读"}
                                    </Animated.Text>
                                    <Animated.Text style={{
                                        transform: [{ scale: rightFontSize }],
                                        opacity: opacity
                                    }}>
                                        {markChapterNum > 0 ? `续看第${markChapterNum}话` : "开始阅读"}
                                    </Animated.Text>
                                </View>
                            </Touchable>
                        </Animated.View>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: viewportWidth,
        paddingTop: 50,
        flexDirection: "row",
        paddingHorizontal: 20,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100
    },
    shadow: {
        backgroundColor: Color.page_bg,
        zIndex: 10
    },
    leftView: {
        width: imageWidth,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100
    },
    collectionTitle: {
        marginLeft: 10,
        fontSize: 15
    },
    rightView: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    read: {
        width: "100%",
        height: "100%",
        borderRadius: 30,
        backgroundColor: Color.red,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default connector(Operate);
