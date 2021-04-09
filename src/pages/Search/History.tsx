import React from 'react'
import {View} from 'react-native'
import HistoryItem from "@/pages/Search/Item/HistoryItem";

interface IProps {
    searchHistoryList: string[]
    clearHistory: (index: number) => void
    HistorySearch: (title: string) => void
}

function History({searchHistoryList, clearHistory, HistorySearch}: IProps) {
    if (searchHistoryList.length > 3) {
        searchHistoryList = searchHistoryList.filter((item, index) => index < 3);
    }
    return (
        searchHistoryList.length > 0 ?
            searchHistoryList.map((title, index) => {
                return (
                    <View key={index}>
                        <HistoryItem
                            index={index}
                            title={title}
                            clearHistory={clearHistory}
                            HistorySearch={HistorySearch}
                        />
                    </View>

                )
            }) : null
    )
}

export default History;
