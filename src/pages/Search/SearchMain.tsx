import React from 'react';
import {ScrollView} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import BookList from "@/pages/Search/BookList";
import Simple from "@/pages/Search/Simple";
import Intro from "@/pages/Search/Intro";
import SearchHistory from "@/pages/Search/SearchHistory";
import {IBook} from "@/models/search";

const mapStateToProps = ({search}: RootState) => {
    return {
        showSimpleView: search.showSimpleView,
        showBookView: search.showBookView,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    goBrief: (data: IBook) => void;
}

function SearchMain({goBrief, showBookView, showSimpleView}: IProps) {
    if (showBookView) {
        return (
            <BookList goBrief={goBrief}/>
        )
    } else if (showSimpleView) {
        return (
            <Simple goBrief={goBrief}/>
        )
    } else {
        return (
            <ScrollView>
                <Intro goBrief={goBrief}/>
                <SearchHistory/>
            </ScrollView>
        );
    }
}

export default connector(SearchMain);
