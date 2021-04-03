import React from "react";
import { StyleSheet, View } from "react-native";
import { Color } from "@/utils/const";
import { IChapter } from "@/models/brief";
import Item from "@/pages/Brief/Item";


interface IProps {
    chapterList: IChapter[];
    goMangaView: (data: IChapter) => void;
}

function List({ chapterList, goMangaView }: IProps) {
    return (
        <View style={styles.itemContainer}>
            {
                chapterList.map(item => {
                    return (
                        <View key={item.id}>
                            <Item data={item} goMangaView={goMangaView} />
                        </View>
                    );
                })
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flex: 1,
        paddingHorizontal: 10,
        flexWrap: "wrap",
        flexDirection: "row",
        backgroundColor: Color.page_bg
    }
});

export default List;
