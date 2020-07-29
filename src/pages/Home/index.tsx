import React from 'react';
import { View, Text, Button } from 'react-native';
import { RoottStackNavigation } from '@/navigator/index';

interface IProps{
    navigation:RoottStackNavigation;
}

class Home extends React.Component<IProps> {

    onPress = () => {
        const {navigation} = this.props;
        navigation.navigate('Detail');
    }

    render() {
        return (
        <View>
            <Text>Home</Text>
            <Button title='goCategory' onPress={this.onPress} />
        </View>
        )
    }
}

export default Home;