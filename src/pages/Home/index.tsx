import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet, Platform, SectionList, SectionListRenderItemInfo } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { ModalStackNavigation, RootStackNavigation } from "@/navigator/index";
import { RootState } from "@/models/index";
import CarouselBlurBackground from "@/pages/views/CarouselBlurBackground";
import { hp } from "@/utils/index";
import { Color } from "@/utils/const";
import TopBarWrapper from "@/pages/views/TopBarWrapper";
import { IBook } from "@/models/home";
import More from "@/components/More";
import End from "@/components/End";
import BookCover from "@/components/BookCover";
import Carousel from "@/pages/Home/Carousel";
import HomePlaceholder from "@/components/Placeholder/HomePlaceholder";
import SplashScreen from "react-native-splash-screen";
import { useHeaderHeight } from "@react-navigation/stack";
import codePush from "react-native-code-push";


const mapStateToProps = ({ home, loading }: RootState) => {
    return {
        commendList: home.commendList,
        refreshing: home.refreshing,
        hasMore: home.hasMore,
        loading: loading.effects["home/fetchCommendList"]
    };
};

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
    navigation: RootStackNavigation & ModalStackNavigation;
}

const sideHeight = hp(30);
const maxScroll = sideHeight + 10;


function Home({ dispatch, commendList, refreshing, navigation, loading, hasMore }: IProps) {

    const headerHeight = useHeaderHeight();
    const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;
    const [endReached, setEndReached] = useState<boolean>(false);

    useEffect(() => {
        SplashScreen.hide();//关闭启动屏
        dispatch({
            type: "home/setState",
            payload: {
                headerHeight
            }
        });
        syncImmediate();
        loadCarouselList();
        loadCommendList(true);
    }, []);

    const syncImmediate = () => {
        if (Platform.OS === "android") {
            codePush.checkForUpdate().then((update) => {
                if (update) {
                    navigation.navigate("AppUpdate");
                }
            });
        }
    };

    const loadCarouselList = () => {
        dispatch({
            type: "home/fetchCarouselList"
        });
    };

    const loadCommendList = (refreshing: boolean, callback?: () => void) => {
        dispatch({
            type: "home/fetchCommendList",
            payload: {
                refreshing
            },
            callback
        });
    };

    const renderSectionHeader = ({ section: { title } }: any) => {
        return (
            <View style={styles.sectionHeader}>
                <View style={styles.cell} />
                <Text style={styles.classifyName}>{title}</Text>
            </View>
        );
    };

    const onRefresh = () => {
        loadCarouselList();
        loadCommendList(true);
    };

    const onEndReached = () => {
        if (!hasMore || loading) {
            return;
        }
        setEndReached(true);
        loadCommendList(false, () => {
            setEndReached(false);
        });
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

    const goBrief = useCallback((data: IBook) => {
        navigation.navigate("Brief", {
            id: data.id
        });
    }, []);

    const renderItem = ({ item }: SectionListRenderItemInfo<IBook[]>) => {
        return (
            <View style={styles.contentContainer}>
                {item.map(data => {
                    return (
                        <BookCover data={data} goBrief={goBrief} key={data.id} />
                    );
                })}
            </View>
        );
    };

    const getTopBarColor = useCallback(() => {
        return scrollY.interpolate({
            inputRange: [0, maxScroll],
            outputRange: [0, 1],
            extrapolate: "clamp"
        });
    }, []);

    const TopBarColor = getTopBarColor();

    return (
        (loading && refreshing) ? <HomePlaceholder /> :
            <View style={{ flex: 1 }}>
                <CarouselBlurBackground />
                <TopBarWrapper navigation={navigation} topBarColor={TopBarColor} />
                <SectionList
                    keyExtractor={(item, index) => `item-${item["id"]}-key-${index}`}
                    ListHeaderComponent={() => <Carousel />}
                    renderSectionHeader={renderSectionHeader}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    sections={commendList}
                    stickySectionHeadersEnabled={true}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: { contentOffset: { y: scrollY } }
                        }],
                        {
                            useNativeDriver: false
                        }
                    )}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.1}
                    renderItem={renderItem}
                    extraData={endReached}
                    ListFooterComponent={renderFooter}
                />
            </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: Color.page_bg
    },
    sectionHeader: {
        height: 35,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 8,
        backgroundColor: Color.page_bg
    },
    cell: {
        width: 6,
        height: 15,
        backgroundColor: Color.yellow_title
    },
    classifyName: {
        marginLeft: 15,
        fontSize: 15,
        color: Color.black
    },
    contentContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: Color.page_bg
    }
});

export default connector(Home);
