import React from 'react';
import {View, Text, Animated, ListRenderItemInfo, StyleSheet} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {IChapter} from '@/models/brief';
import Item from './Item';
import {NativeViewGestureHandler} from "react-native-gesture-handler";
import {ITabProps} from "@/pages/Brief/Tab";
import {getBottomSpace} from "react-native-iphone-x-helper";

const mapStateToProps = ({brief}: RootState) => {
    return {
        chapters: brief.chapters,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = ModelState & ITabProps;

class Index extends React.Component<IProps> {
    onPress = (data: IChapter) => {
        console.log(data);
    };

    renderItem = ({item, index}: ListRenderItemInfo<IChapter>) => {
        return (
            <Item data={item} index={index} key={item.id.toString()} onPress={this.onPress}/>
        );
    };

    keyExtractor = (item: IChapter) => {
        return item.id.toString();
    };

    render() {
        const {chapters, panRef, tapRef, nativeRef,onScrollDrag} = this.props;
        return (
            <NativeViewGestureHandler ref={nativeRef} simultaneousHandlers={panRef} waitFor={tapRef}>
                <View style={styles.bottomSpace}>
                <Animated.FlatList
                    style={styles.container}
                    data={chapters}
                    bounces={false}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    onScrollBeginDrag={onScrollDrag}
                    onScrollEndDrag={onScrollDrag}
                />
                </View>
            </NativeViewGestureHandler>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomSpace:{
        flex: 1,
        paddingBottom:getBottomSpace(),
    }
})

export default connector(Index);
