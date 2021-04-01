import React, { useRef, useState } from "react";
import { View, StyleSheet, Animated, FlatList, ListRenderItemInfo } from "react-native";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { ModalStackNavigation, RootStackNavigation } from "@/navigator/index";
import { useFocusEffect } from "@react-navigation/native";
import BookPlaceholder from "@/components/Placeholder/BookPlaceholder";
import Touchable from "@/components/Touchable";
import More from "@/components/More";
import End from "@/components/End";
import EditView from "@/pages/Shelf/EditView";
import BookCover from "@/pages/Shelf/BookCover";
import { Color } from "@/utils/const";
import { ICollection } from "@/models/collection";


const mapStateToProps = ({ user, collection, loading }: RootState) => {
    return {
        isLogin: user.isLogin,
        isEdit: collection.isEdit,
        ids: collection.ids,
        collectionList: collection.collectionList,
        refreshing: collection.refreshing,
        hasMore: collection.hasMore,
        loading: loading.effects["collection/fetchCollectionList"]
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation & ModalStackNavigation;
}

function Shelf({
                   navigation, dispatch, isLogin, loading,
                   refreshing, hasMore, collectionList, ids, isEdit
               }: IProps) {

    const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;
    const [endReached, setEndReached] = useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            loadData(true);
            return () => {
                dispatch({
                    type: "collection/setState",
                    payload: {
                        isEdit: false,
                        ids: []
                    }
                });
            };
        }, [])
    );

    const loadData = (refreshing: boolean, callback?: () => void) => {
        if (isLogin) {
            dispatch({
                type: "collection/fetchCollectionList",
                payload: {
                    refreshing: refreshing
                },
                callback
            });
        }
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

    const onClickItem = (item: ICollection) => {
        if (isEdit) {
            const i = ids.indexOf(item.id);
            if (i > -1) {
                ids.splice(i, 1);
                dispatch({
                    type: "collection/setState",
                    payload: {
                        ids: [...ids]
                    }
                });
            } else {
                dispatch({
                    type: "collection/setState",
                    payload: {
                        ids: [...ids, item.id]
                    }
                });
            }
        } else {
            navigation.navigate("Brief", {
                id: item.book_id
            });
        }
    };

    const cancel = () => {
        const newData = collectionList.map(item => item.id);
        if (collectionList.length === ids.length) {
            dispatch({
                type: "collection/setState",
                payload: {
                    ids: []
                }
            });
        } else {
            dispatch({
                type: "collection/setState",
                payload: {
                    ids: newData
                }
            });
        }
    };

    const destroy = () => {
        dispatch({
            type: "collection/delUserCollection",
            payload: {
                ids
            }
        });
    };

    const renderItem = ({ item }: ListRenderItemInfo<ICollection>) => {
        const selected = ids.indexOf(item.id) > -1;
        return (
            <Touchable
                key={item.id}
                onPress={() => onClickItem(item)}
            >
                <BookCover
                    data={item}
                    isEdit={isEdit}
                    selected={selected}
                />
            </Touchable>
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

    const getHeaderOpacity = () => {
        return scrollY.interpolate({
            inputRange: [-50, 0],
            outputRange: [1, 0],
            extrapolate: "clamp"
        });
    };

    return (
        !isLogin ? null :
            (loading && refreshing) ? <BookPlaceholder /> :
                <View style={styles.container}>
                    <View style={styles.totalView}>
                        <Animated.Text style={[{
                            opacity: getHeaderOpacity()
                        }]}>总收藏{collectionList.length}本</Animated.Text>
                    </View>
                    <FlatList
                        keyExtractor={(item, key) => `item-${item.id}-key-${key}`}
                        scrollEventThrottle={1}
                        data={collectionList}
                        style={styles.container}
                        numColumns={3}
                        onScroll={Animated.event(
                            [{
                                nativeEvent: { contentOffset: { y: scrollY } }
                            }],
                            {
                                useNativeDriver: false
                            }
                        )}
                        renderItem={renderItem}
                        extraData={endReached}
                        ListFooterComponent={renderFooter}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.1}
                    />
                    <EditView
                        data={collectionList}
                        ids={ids}
                        isEdit={isEdit}
                        cancel={cancel}
                        destroy={destroy}
                    />
                </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.page_bg
    },
    totalView: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center"
    }
});

export default connector(Shelf);
