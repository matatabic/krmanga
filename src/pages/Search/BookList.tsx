import React from 'react'
import List from '@/components/BookList'
import {IBook} from "@/models/search";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import ListPlaceholder from "@/components/Placeholder/ListPlaceholder";

const mapStateToProps = ({search, loading}: RootState) => {
    return {
        bookList: search.bookList,
        searchTitle: search.searchTitle,
        refreshing: search.refreshing,
        hasMore: search.hasMore,
        loading: loading.effects['search/fetchBookList']
    }
}

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    goBrief: (data: IBook) => void;
}

function BookList({dispatch, bookList, loading, refreshing, hasMore, searchTitle, goBrief}: IProps) {

    const loadData = (refreshing: boolean, callback?: () => void) => {
        dispatch({
            type: 'search/fetchBookList',
            payload: {
                title: searchTitle,
                refreshing: refreshing,
            },
            callback
        });
    }

    return (
        (loading && refreshing) ? <ListPlaceholder/> :
            <List
                data={bookList}
                loading={loading}
                refreshing={refreshing}
                hasMore={hasMore}
                loadData={loadData}
                goBrief={goBrief}
            />
    )
}

export default connector(BookList);
