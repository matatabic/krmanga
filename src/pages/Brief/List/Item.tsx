import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IChapter} from '@/models/brief';
import Touchable from '@/components/Touchable';

interface IProps {
    data: IChapter;
    index: number;
    onPress: (data: IChapter) => void;
}

class Item extends React.Component<IProps> {
    onPress = () => {
        const {onPress, data} = this.props;
        if (typeof onPress === 'function') {
            onPress(data);
        }
    };

    render() {
        const {data, index} = this.props;
        return (
            <Touchable onPress={this.onPress} style={styles.container}>
                <Text>{`第${index + 1}`}话</Text>
                <Text>{`第${index + 1}`}话</Text>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    }
})

export default Item;
