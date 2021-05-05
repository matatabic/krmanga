import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { RootStackNavigation, RootStackParamList } from "@/navigator/index";
import { RouteProp } from "@react-navigation/native";
import More from "@/components/More";
import End from "@/components/End";
import Item from "@/pages/Shelf/ChapterManage/Item";
import HeaderRightBtn from "@/pages/Shelf/ChapterManage/HeaderRightBtn";
import EditView from "@/pages/Shelf/ChapterManage/EditView";
import { IChapter } from "@/config/realm";


const mapStateToProps = ({ user, chapterManage, loading }: RootState, { route }: { route: RouteProp<RootStackParamList, "ChapterManage"> }) => {
    return {
        book_id: route.params.book_id,
        book_image: route.params.book_image,
        headerTitle: route.params.headerTitle,
        chapterList: chapterManage.chapterList,
        ids: chapterManage.ids,
        isEdit: chapterManage.isEdit,
        refreshing: chapterManage.refreshing,
        hasMore: chapterManage.hasMore,
        pages: chapterManage.pagination,
        loading: loading.effects["chapterManage/fetchChapterList"]
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

function ChapterManage({
                           navigation, dispatch, book_id, book_image, headerTitle, hasMore, loading,
                           ids, isEdit, refreshing, chapterList
                       }: IProps) {

    const [endReached, setEndReached] = useState<boolean>(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle
        });
        loadData(true);
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRightBtn isEdit={isEdit} onSubmit={onSubmit} />
        });
    }, [isEdit]);

    const onSubmit = useCallback(() => {
        dispatch({
            type: "chapterManage/setState",
            payload: {
                isEdit: !isEdit,
                ids: []
            }
        });
    }, [isEdit]);

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
        const selected = ids.indexOf(item.chapter_num) > -1;
        return (
            <Item
                data={item}
                book_image={book_image}
                isEdit={isEdit}
                selected={selected}
                onClickItem={onClickItem}
            />
        );
    };

    const onClickItem = useCallback((item: IChapter) => {
        if (isEdit) {
            const i = ids.indexOf(item.chapter_num);
            if (i > -1) {
                ids.splice(i, 1);
                dispatch({
                    type: "chapterManage/setState",
                    payload: {
                        ids: [...ids]
                    }
                });
            } else {
                dispatch({
                    type: "chapterManage/setState",
                    payload: {
                        ids: [...ids, item.chapter_num]
                    }
                });
            }
        } else {
            navigation.navigate("Brief", {
                id: book_id
            });
            navigation.navigate("MangaView", {
                book_id,
                chapter_num: item.chapter_num
            });
        }
    }, [isEdit, ids]);

    const destroy = () => {
        dispatch({
            type: "chapterManage/delChapter",
            payload: {
                book_id,
                ids
            }
        });
        dispatch({
            type: "downloadManage/setScreenReload"
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
        <View style={{ flex: 1 }}>
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
            <EditView
                ids={ids}
                isEdit={isEdit}
                destroy={destroy}
            />
        </View>
    );
}


export default connector(ChapterManage);
