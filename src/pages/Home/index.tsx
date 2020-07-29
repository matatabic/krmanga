import React from 'react';
import { View, Text, Button } from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import { RootStackNavigation } from '@/navigator/index';
import {RootState} from '@/models/index'

const mapStateToProps = ({home,loading}: RootState) =>({
    num: home.num,
    loading:loading.effects['home/asyncAdd'],
})

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState{
    navigation:RootStackNavigation;
}

class Home extends React.Component<IProps> {

    onPress = () => {
        const {navigation} = this.props;
        navigation.navigate('Detail');
    }

    handleAdd = ()=>{
        const {dispatch} =this.props;
        dispatch({
            type:'home/add',
            payload:{
                num:10
            }
        })
    }

    asyncAdd = ()=>{
        const {dispatch} =this.props;
        dispatch({
            type:'home/asyncAdd',
            payload:{
                num:10
            }
        })
    }

    render() {
        const {num,loading} = this.props;
        return (
        <View>
            <Text>Home{num}</Text>
        <Text>{loading?'正在加载':''}</Text>
            <Button title='+10' onPress={this.handleAdd} />
            <Button title='async+10' onPress={this.asyncAdd} />
            <Button title='goCategory' onPress={this.onPress} />
        </View>
        )
    }
}

export default connector(Home);