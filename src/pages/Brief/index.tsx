import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Animated, StyleSheet, Platform, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { getStatusBarHeight, isIphoneX } from "react-native-iphone-x-helper";
import { Color } from "@/utils/const";
import { RootState } from "@/models/index";
import { ModalStackNavigation, RootStackNavigation, RootStackParamList } from "@/navigator/index";
import { RouteProp } from "@react-navigation/native";
import { connect, ConnectedProps } from "react-redux";
import { ip, viewportWidth, wp } from "@/utils/index";
import { IChapter, initialState } from "@/models/brief";
import BriefPlaceholder from "@/components/Placeholder/BriefPlaceholder";
import ImageBlurBackground from "@/pages/Brief/ImageBlurBackground";
import TopBarWrapper from "@/pages/Brief/TopBarWrapper";
import Footer from "@/pages/Brief/Footer";
import Header from "@/pages/Brief/Header";
import { useHeaderHeight } from "@react-navigation/stack";
import List from "@/pages/Brief/List";
import LightDrawer from "@/components/LightDrawer";


const mapStateToProps = ({ user, brief, loading }: RootState, { route }: { route: RouteProp<RootStackParamList, "Brief"> }) => {
    return {
        isLogin: user.isLogin,
        book_id: route.params.id,
        headerHeight: brief.headerHeight,
        bookInfo: brief.bookInfo,
        markRoast: brief.markRoast,
        collection_id: brief.collection_id,
        refreshing: brief.refreshing,
        chapterList: brief.chapterList,
        loading: loading.effects["brief/fetchBrief"]
    };
};


const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<RootStackParamList, "Brief">
    navigation: RootStackNavigation & ModalStackNavigation;
}

const imageWidth = wp(30);
const imageHeight = ip(imageWidth);

function Brief({
                   navigation, dispatch, isLogin, headerHeight, loading, bookInfo, book_id, markRoast,
                   collection_id, refreshing, chapterList
               }: IProps) {
    const topHeight = useHeaderHeight();
    const [showTop, setShowTop] = useState<boolean>(true);
    const scrollY = useRef(new Animated.Value(0)).current;
    const EndShowHeight = headerHeight + imageHeight;
    let fixedHeight: number = 0;
    if (Platform.OS === "android") {
        fixedHeight = headerHeight + imageHeight + 30 - 11;
    } else {
        fixedHeight = isIphoneX() ?
            headerHeight + imageHeight + 30 - 22 :
            headerHeight + imageHeight + 30 - 11 + getStatusBarHeight();
    }

    const drawerX = new Animated.Value(viewportWidth);

    useEffect(() => {
        dispatch({
            type: "brief/setState",
            payload: {
                headerHeight: topHeight
            }
        });
        loadData(true);
        return () => {
            dispatch({
                type: "brief/setState",
                payload: {
                    ...initialState
                }
            });
        };
    }, []);

    const getOpacity = () => {
        return scrollY.interpolate({
            inputRange: [
                headerHeight,
                EndShowHeight
            ],
            outputRange: [1, 0],
            extrapolate: "clamp"
        });
    };

    const getBlurOpacity = () => {
        return scrollY.interpolate({
            inputRange: [
                fixedHeight - 1,
                fixedHeight
            ],
            outputRange: [0, 1],
            extrapolate: "clamp"
        });
    };

    const getLeftViewX = () => {
        return scrollY.interpolate({
            inputRange: [
                headerHeight,
                EndShowHeight
            ],
            outputRange: [0, wp(22)],
            extrapolate: "clamp"
        });
    };

    const getRightViewX = () => {
        return scrollY.interpolate({
            inputRange: [
                headerHeight,
                EndShowHeight
            ],
            outputRange: [0, wp(10)],
            extrapolate: "clamp"
        });
    };

    const getRightViewScale = () => {
        return scrollY.interpolate({
            inputRange: [
                headerHeight,
                EndShowHeight
            ],
            outputRange: [1, 0.65],
            extrapolate: "clamp"
        });
    };

    const getRightFontSize = () => {
        return scrollY.interpolate({
            inputRange: [
                headerHeight,
                EndShowHeight
            ],
            outputRange: [1, 1.5],
            extrapolate: "clamp"
        });
    };

    const getBgImageSize = () => {
        return scrollY.interpolate({
            inputRange: [-100, 0],
            outputRange: [1.2, 1],
            extrapolate: "clamp"
        });
    };

    const onClickCollection = useCallback(() => {
        if (!isLogin) {
            navigation.navigate("Login");
        } else {
            if (collection_id > 0) {
                dispatch({
                    type: "brief/delUserCollection",
                    payload: {
                        id: collection_id.toString()
                    }
                });
            } else {
                dispatch({
                    type: "brief/addUserCollection",
                    payload: {
                        book_id
                    }
                });
            }
            dispatch({
                type: "collection/screenReload"
            });
        }
    }, [isLogin, collection_id]);

    const onClickRead = useCallback(() => {
        if (markRoast > 0) {
            navigation.navigate("MangaView", {
                book_id,
                roast: markRoast
            });
        } else {
            navigation.navigate("MangaView", {
                book_id,
                roast: 1
            });
        }
    }, [markRoast]);

    const goMangaView = useCallback((item: IChapter) => {
        navigation.navigate("MangaView", {
            book_id: book_id,
            roast: item.roast
        });
    }, []);

    const showDrawer = () => {
        Animated.timing(drawerX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    const hideDrawer = () => {
        Animated.timing(drawerX, {
            toValue: viewportWidth,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (event.nativeEvent.contentOffset.y >= EndShowHeight) {
            setShowTop(false);
        } else {
            setShowTop(true);
        }
    };

    const loadData = (refreshing: boolean, callback?: () => void) => {
        dispatch({
            type: "brief/fetchBrief",
            payload: {
                refreshing,
                book_id
            },
            callback
        });
    };

    return (
        refreshing ? <BriefPlaceholder /> :
            <View style={styles.container}>
                <LightDrawer
                    chapterList={chapterList}
                    bookInfo={bookInfo}
                    headerHeight={headerHeight}
                    drawerX={drawerX}
                    goMangaView={goMangaView}
                    hideDrawer={hideDrawer}
                />
                <ImageBlurBackground
                    bookInfo={bookInfo}
                    imageSize={getBgImageSize()}
                />
                <TopBarWrapper
                    headerHeight={headerHeight}
                    showTop={showTop}
                    opacity={getOpacity()}
                />
                <Animated.ScrollView
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: { contentOffset: { y: scrollY } }
                            }
                        ],
                        {
                            useNativeDriver: true,
                            listener: onScroll
                        }
                    )}
                    overScrollMode="always"
                    scrollEventThrottle={1}
                >
                    <Header
                        fixedHeight={fixedHeight}
                        scrollY={scrollY}
                        opacity={getOpacity()}
                        blurOpacity={getBlurOpacity()}
                        leftViewX={getLeftViewX()}
                        rightViewX={getRightViewX()}
                        rightViewScale={getRightViewScale()}
                        rightFontSize={getRightFontSize()}
                        showDrawer={showDrawer}
                        onClickRead={onClickRead}
                        onClickCollection={onClickCollection}
                    />
                    <List
                        chapterList={chapterList}
                        goMangaView={goMangaView}
                    />
                    <Footer />
                </Animated.ScrollView>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flex: 1,
        paddingHorizontal: 10,
        flexWrap: "wrap",
        flexDirection: "row",
        backgroundColor: Color.page_bg
    }
});


export default connector(Brief);
