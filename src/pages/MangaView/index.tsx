import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StatusBar, FlatList, ListRenderItemInfo, Animated, Easing, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { RouteProp } from "@react-navigation/native";
import { RootStackNavigation, RootStackParamList } from "@/navigator/index";
import { IChapter } from "@/models/brief";
import { IEpisode, initialState } from "@/models/mangaView";
import Item from "@/pages/MangaView/Item";
import More from "@/components/More";
import End from "@/components/End";
import { hp, viewportWidth } from "@/utils/index";
import TopCtrPanel from "@/pages/MangaView/CtrPanel/TopCtrPanel";
import BottomCtrPanel from "@/pages/MangaView/CtrPanel/BottomCtrPanel";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import DarkDrawer from "@/components/DarkDrawer";
import BottomStatusBar from "@/pages/MangaView/BottomStatusBar";


const mapStateToProps = ({home, mangaView, brief, user, loading }: RootState, { route }: { route: RouteProp<RootStackParamList, "MangaView"> }) => {
    return {
        book_id: route.params.book_id,
        markRoast: route.params.markRoast,
        chapter_num: route.params.chapter_num,
        isLogin: user.isLogin,
        headerHeight: home.headerHeight,
        episodeList: mangaView.episodeList,
        hasMore: mangaView.hasMore,
        refreshing: mangaView.refreshing,
        pages: mangaView.pagination,
        currentChapterNum: mangaView.currentChapterNum,
        currentRoast: mangaView.currentRoast,
        chapterList: brief.chapterList,
        bookInfo: brief.bookInfo,
        loading: loading.effects["mangaView/fetchEpisodeList"]
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<RootStackParamList, "MangaView">;
    navigation: RootStackNavigation;
    data: IChapter[];
}


function MangaView({
                       navigation, dispatch, isLogin, chapterList, bookInfo,
                       book_id, headerHeight, markRoast, chapter_num, episodeList, hasMore, loading,
                       currentChapterNum, currentRoast, pages
                   }: IProps) {

    const [endReached, setEndReached] = useState<boolean>(false);
    let [time, setTime] = useState<NodeJS.Timeout | null>(null);

    let flatListRef: FlatList<IEpisode> | null = null;
    const topPanelValue = useRef(new Animated.Value(0)).current;
    const bottomPanelValue = useRef(new Animated.Value(0)).current;
    const drawerX = useRef(new Animated.Value(-viewportWidth)).current;
    let panelEnable: boolean = true;


    useEffect(() => {
        loadData(true);
        return () => {
            StatusBar.setHidden(false);
            if (isLogin) {
                dispatch({
                    type: "mangaView/addHistory",
                    payload: {
                        book_id
                    }
                });
                dispatch({
                    type: "history/setScreenReload"
                });
                dispatch({
                    type: "downloadManage/setScreenReload"
                });
            } else {
                dispatch({
                    type: "mangaView/setState",
                    payload: {
                        ...initialState
                    }
                });
            }
        };
    }, []);

    useEffect(() => {
        dispatch({
            type: "brief/setState",
            payload: {
                markChapterNum: currentChapterNum,
                markRoast: currentRoast
            }
        });
    }, [currentChapterNum, currentRoast]);

    const loadData = (refreshing: boolean, callback?: () => void) => {
        dispatch({
            type: "mangaView/fetchEpisodeList",
            payload: {
                refreshing,
                roast: markRoast,
                chapter_num,
                book_id
            },
            callback
        });
    };

    const onEndReached = () => {
        if (!hasMore || loading) {
            return;
        }

        setEndReached(true);

        dispatch({
            type: "mangaView/fetchEpisodeList",
            payload: {
                book_id,
                chapter_num: currentChapterNum + 1
            },
            callback: () => {
                setEndReached(false);
            }
        });
    };

    const renderItem = ({ item }: ListRenderItemInfo<IEpisode>) => {
        return (
            <Item panelHandle={panelHandle} data={item} />
        );
    };

    const renderFooter = () => {
        if (endReached) {
            return <More />;
        }
        if (!hasMore) {
            return <End />;
        }

        return null;
    };

    const getItemLayout = (data: any, index: number) => {
        if (data[index] === undefined) {
            return { length: 0, offset: 0, index };
        }

        let offset = 0;
        const length = viewportWidth * data[index].multiple;

        for (let i = 0; i < index; i++) {
            offset += viewportWidth * data[i].multiple;
        }

        return { length: length, offset, index };
    };

    const scrollToIndex = (index: number) => {
        flatListRef?.scrollToIndex({ viewPosition: 0, index: index });
    };

    const lastChapter = () => {
        if (!loading) {
            dispatch({
                type: "mangaView/fetchEpisodeList",
                payload: {
                    refreshing: true,
                    book_id,
                    chapter_num: currentChapterNum - 1
                }
            });
        }
    };

    const nextChapter = () => {
        if (!loading) {
            dispatch({
                type: "mangaView/fetchEpisodeList",
                payload: {
                    refreshing: true,
                    book_id,
                    chapter_num: currentChapterNum + 1
                }
            });
        }
    };

    const showDrawer = () => {
        Animated.timing(drawerX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    const hideDrawer = () => {
        Animated.timing(drawerX, {
            toValue: -viewportWidth,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    const hidePanel = () => {
        if (panelEnable) {
            Animated.parallel([
                Animated.timing(
                    topPanelValue,
                    {
                        toValue: -headerHeight - getStatusBarHeight(),
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    bottomPanelValue,
                    {
                        toValue: hp(25),
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }
                )
            ]).start(() => {
                StatusBar.setHidden(true);
                panelEnable = !panelEnable;
            });
        }
    };

    const showPanel = () => {
        if (!panelEnable) {
            Animated.parallel([
                Animated.timing(
                    topPanelValue,
                    {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    bottomPanelValue,
                    {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }
                )
            ]).start(() => {
                StatusBar.setHidden(false);
                panelEnable = !panelEnable;
            });
        }
    };

    const panelHandle = useCallback(() => {
        if (panelEnable) {
            hidePanel();
        } else {
            showPanel();
        }
    }, [panelEnable]);

    const debounce = (cb: any, wait = 350) => {
        if (time !== null) {
            clearTimeout(time);
        }

        let tempTime = setTimeout(() => {
            time = null;
            cb && cb();
        }, wait);

        setTime(tempTime);
    };

    const onScrollEndDrag = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        let offset_total = 0;
        let current_episode_total = episodeList[0].episode_total;
        let current_chapter_id = episodeList[0].chapter_id;
        let current_chapter_num = episodeList[0].chapter_num;
        let current_number = episodeList[0].number;
        let current_roast = episodeList[0].roast;
        let current_title = episodeList[0].title;
        for (let i = 0; i < episodeList.length; i++) {
            if (nativeEvent.contentOffset.y >= offset_total) {
                current_episode_total = episodeList[i].episode_total;
                current_chapter_id = episodeList[i].chapter_id;
                current_chapter_num = episodeList[i].chapter_num;
                current_number = episodeList[i].number;
                current_roast = episodeList[i].roast;
                current_title = episodeList[i].title;
            } else {
                break;
            }
            offset_total = offset_total + episodeList[i].multiple * viewportWidth;
        }

        debounce(() => {
            dispatch({
                type: "mangaView/setState",
                payload: {
                    currentEpisodeTotal: current_episode_total,
                    currentChapterId: current_chapter_id,
                    currentChapterNum: current_chapter_num,
                    currentNumber: current_number,
                    showCurrentNumber: current_number,
                    currentRoast: current_roast,
                    currentTitle: current_title
                }
            });
        });

        hidePanel();
    };

    const goMangaChapter = useCallback((item: IChapter) => {
        dispatch({
            type: "mangaView/fetchEpisodeList",
            payload: {
                refreshing: true,
                book_id,
                chapter_num: item.chapter_num,
                callback: hideDrawer()
            }
        });
    }, []);

    return (
        episodeList.length > 0 ?
            <View style={{ flex: 1 }}>
                {/*<StatusBar barStyle="light-content" />*/}
                <TopCtrPanel
                    book_id={book_id}
                    topPanelValue={topPanelValue}
                    navigation={navigation}
                />
                <BottomCtrPanel
                    bottomPanelValue={bottomPanelValue}
                    scrollToIndex={scrollToIndex}
                    showDrawer={showDrawer}
                    lastChapter={lastChapter}
                    nextChapter={nextChapter}
                />
                <FlatList
                    ref={ref => (flatListRef = ref)}
                    data={episodeList}
                    keyExtractor={(item, key) => `item-${item.id}-key-${key}`}
                    renderItem={renderItem}
                    ListFooterComponent={renderFooter}
                    getItemLayout={getItemLayout}
                    onScrollEndDrag={onScrollEndDrag}
                    initialScrollIndex={pages.episode_offset - 1}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.1}
                    extraData={endReached}
                />
                <DarkDrawer
                    chapterList={chapterList}
                    bookInfo={bookInfo}
                    headerHeight={headerHeight}
                    drawerX={drawerX}
                    hideDrawer={hideDrawer}
                    goMangaView={goMangaChapter}
                />
                <BottomStatusBar />
            </View> : null
    );
}


export default connector(MangaView);
