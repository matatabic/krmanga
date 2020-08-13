import React from 'react';
import {View, Text, FlatList, ListRenderItemInfo} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {IChapter} from '@/models/brief';
import Item from './Item';

const mapStateToProps = ({brief}: RootState) => {
    return {
        chapters: brief.chapters,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}
class Index extends React.Component<IProps> {
    onPress = (data: IChapter) => {
        console.log(data);
    };

    renderItem = ({item, index}: ListRenderItemInfo<IChapter>) => {
        return (
            <Item data={item} index={index} key={item.id.toString()} onPress={this.onPress} />
        );
    };

    keyExtractor = (item: IChapter) => {
        return item.id.toString();
    };

    render() {
        const {chapters} = this.props;
        return (
            <FlatList
                data={chapters}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
            />
        );
    }
}

export default connector(Index);
