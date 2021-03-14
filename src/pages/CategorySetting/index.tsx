import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet} from "react-native";
import {viewportWidth} from "@/utils/index";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation} from "@/navigator/index";
import {ICategory} from "@/models/categorySetting";
import {ScrollView} from "react-native-gesture-handler";
import {DragSortableView} from "react-native-drag-sort";
import Touchable from "@/components/Touchable";
import {Color} from "@/utils/const";
import HeaderRightBtn from "@/pages/CategorySetting/HeaderRightBtn";
import Item from "@/pages/CategorySetting/Item";

const fixedItems = [0];
const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;
const itemHeight = 48;
const margin = 5;

const mapStateToProps = ({categorySetting}: RootState) => {
    return {
        myCategoryList: categorySetting.myCategoryList,
        categoryList: categorySetting.categoryList,
        isEdit: categorySetting.isEdit,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

const CategorySetting = ({navigation, dispatch, categoryList, myCategoryList, isEdit}: IProps) => {

    const [myCategories, setMyCategories] = useState<ICategory[]>(myCategoryList);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRightBtn onSubmit={onSubmit}/>,
        });
    },[myCategories])

    useEffect(() => {
        return () => {
            dispatch({
                type: 'categorySetting/setState',
                payload: {
                    isEdit: false,
                },
            });
        }
    },[])

    const onSubmit = () => {
        dispatch({
            type: 'categorySetting/toggle',
            payload: {
                myCategoryList: myCategories,
            },
        });
    };

    const onLongPress = () => {
        dispatch({
            type: 'categorySetting/setState',
            payload: {
                isEdit: true,
            },
        });
    };

    const onPress = (item: ICategory, index: number, selected: boolean) => {
        const disabled = fixedItems.indexOf(index) > -1;

        if (selected && disabled) {
            return false;
        }
        if (isEdit) {
            if (selected) {
                setMyCategories(myCategories.filter(
                    (selectedItem) => selectedItem.id !== item.id,
                ))
            } else {
                setMyCategories(myCategories.concat([item]))
            }
        }
    };

    const onClickItem = (data: ICategory[], item: ICategory) => {
        onPress(item, data.indexOf(item), true);
    };

    const renderItem = (item: ICategory, index: number) => {
        const disabled = fixedItems.indexOf(index) > -1;
        return (
            <Item
                data={item}
                isEdit={isEdit}
                disabled={disabled}
                selected
            />
        );
    };

    const renderUnSelectedItem = (item: ICategory, index: number) => {
        return (
            <Touchable
                key={item.id}
                onPress={() => onPress(item, index, false)}
                onLongPress={onLongPress}>
                <Item
                    data={item}
                    isEdit={isEdit}
                    selected={false}
                />
            </Touchable>
        );
    };

    const onDataChange = (data: ICategory[]) => {
        setMyCategories(data)
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.classifyName}>我的分类</Text>
            <View style={styles.classifyView}>
                <DragSortableView
                    dataSource={myCategories}
                    fixedItems={fixedItems}
                    renderItem={renderItem}
                    sortable={isEdit}
                    keyExtractor={(item) => item.id}
                    onDataChange={onDataChange}
                    parentWidth={parentWidth}
                    childrenWidth={itemWidth}
                    childrenHeight={itemHeight}
                    marginChildrenTop={margin}
                    onClickItem={onClickItem}
                />
            </View>
            <View>
                {Object.keys(categoryList).map((typeName) => {
                    return (
                        <View key={`typeName-${typeName}`}>
                            <View>
                                <Text style={styles.classifyName}>{typeName}</Text>
                            </View>
                            <View style={styles.classifyView}>
                                {categoryList[typeName].map(
                                    (item: ICategory, index: number) => {
                                        if (
                                            myCategories.find(
                                                (selectedItem) => selectedItem.id === item.id,
                                            )
                                        ) {
                                            return null;
                                        }
                                        return renderUnSelectedItem(item, index);
                                    },
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
    classifyName: {
        fontSize: 16,
        marginTop: 14,
        marginBottom: 8,
        marginLeft: 10,
    },
    classifyView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
    },

});

export default connector(CategorySetting);
