import React, {useEffect} from 'react'
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation, RootStackParamList} from "@/navigator/index";
import {RouteProp} from "@react-navigation/native";
import ListPlaceholder from "@/components/Placeholder/ListPlaceholder";
import BookList from "@/components/BookList";
import {IBook} from "@/models/guess";

const mapStateToProps = ({guess, loading}: RootState, {route}: { route: RouteProp<RootStackParamList, 'Guess'> }) => {
    return {
        headerTitle: route.params.headerTitle,
        bookList: guess.bookList,
        refreshing: guess.refreshing,
        hasMore: guess.hasMore,
        loading: loading.effects['guess/fetchGuessList']
    }
}

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
    route: RouteProp<RootStackParamList, 'Guess'>;
}


function Guess({navigation, dispatch, headerTitle, bookList, refreshing, loading, hasMore}: IProps) {

    useEffect(() => {
        navigation.setOptions({
            headerTitle: headerTitle
        })
        loadData(true);
    }, [])

    const loadData = (refreshing: boolean, callback?: () => void) => {
        dispatch({
            type: 'guess/fetchGuessList',
            payload: {
                refreshing
            },
            callback
        });
    }

    const goBrief = (data: IBook) => {
        navigation.navigate('Brief', {
            id: data.id
        });
    };

    return (
        (loading && refreshing) ? <ListPlaceholder/> :
            <BookList
                data={bookList}
                loading={loading}
                refreshing={refreshing}
                hasMore={hasMore}
                loadData={loadData}
                goBrief={goBrief}
            />
    )
}

export default connector(Guess);
