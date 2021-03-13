import React, {useState} from 'react';
import {View, StyleSheet, FlatList, ListRenderItemInfo} from 'react-native';
import {IBook} from "@/models/search";
import More from "@/components/More";
import End from "@/components/End";
import Item from "./Item";


interface IProps {
    data: any;
    loading: boolean | undefined;
    refreshing: boolean;
    hasMore: boolean;
    loadData: (refreshing: boolean, callback?: () => void) => void;
    goBrief: (data: IBook) => void;
}


function BookList({data, loading, refreshing, hasMore, loadData, goBrief}: IProps) {

    const [endReached, setEndReached] = useState<boolean>(false)

    const renderHeader = () => {
        return <View style={styles.header}/>
    }

    const onRefresh = () => {
        if (typeof loadData === "function") {
            loadData(true);
        }
    }

    const onEndReached = () => {
        if (!hasMore || loading) {
            return;
        }
        setEndReached(true)

        if (typeof loadData === "function") {
            loadData(false, () => {
                setEndReached(false)
            });
        }
    }

    const renderFooter = () => {
        if (endReached) {
            return <More/>;
        }
        if (!hasMore) {
            return <End/>;
        }

        return null;
    };

    const renderItem = ({item}: ListRenderItemInfo<IBook>) => {
        return (
            <Item data={item} goBrief={goBrief}/>
        )
    }

    return (
        <FlatList
            data={data}
            extraData={endReached}
            keyExtractor={(item, key) => `item-${key}-key-${key}`}
            ListHeaderComponent={renderHeader}
            onRefresh={onRefresh}
            refreshing={refreshing}
            numColumns={1}
            scrollEventThrottle={1}
            renderItem={renderItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={1}
            ListFooterComponent={renderFooter}
        />
    )
}

const styles = StyleSheet.create({
    header: {
        height: 10,
    },
})

export default BookList;
