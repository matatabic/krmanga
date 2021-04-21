import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { RootStackNavigation, RootStackParamList } from "@/navigator/index";
import { RouteProp } from "@react-navigation/native";
import More from "@/components/More";
import End from "@/components/End";
import { IChapter } from "@/models/ChapterManage";
import Item from "@/pages/Shelf/ChapterManage/Item";


const mapStateToProps = ({ user, chapterManage, loading }: RootState, { route }: { route: RouteProp<RootStackParamList, "ChapterManage"> }) => {
    return {
        book_id: route.params.book_id,
        headerTitle: route.params.headerTitle,
        chapterList: chapterManage.chapterList,
        refreshing: chapterManage.refreshing,
        hasMore: chapterManage.hasMore,
        pages: chapterManage.pagination,
        loading: loading.effects["downloadManage/fetchChapterList"]
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

function ChapterManage({
                           navigation, dispatch, book_id, headerTitle, hasMore, loading,
                           refreshing, chapterList
                       }: IProps) {

    const [endReached, setEndReached] = useState<boolean>(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle
        });
        loadData(true);
    }, []);

    const loadData = (refreshing: boolean, callback?: () => void) => {
        dispatch({
            type: "chapterManage/fetchChapterList",
            payload: {
                book_id,
                refreshing: refreshing
            },
            callback
        });
    };

    const onRefresh = () => {
        loadData(true);
    };

    const renderItem = ({ item }: ListRenderItemInfo<IChapter>) => {
        return (
            <Item data={item} goMangaView={goMangaView} />
        );
    };

    const goMangaView = (item: IChapter) => {
        navigation.navigate("Brief", {
            id: book_id
        });
        navigation.navigate("MangaView", {
            book_id,
            chapter_num: item.chapter_num
        });
    };

    const onEndReached = () => {
        if (!hasMore || loading) {
            return;
        }
        setEndReached(true);
        loadData(false, () => {
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

    return (
        <View>
            <FlatList
                keyExtractor={(item, key) => `key-${key}`}
                numColumns={3}
                onRefresh={onRefresh}
                refreshing={refreshing}
                data={chapterList}
                renderItem={renderItem}
                extraData={endReached}
                ListFooterComponent={renderFooter}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
            />
        </View>
    );
}

export default connector(ChapterManage);
