import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({brief}: RootState) => {
    return {
        description: brief.description,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class Introduction extends React.Component<ModelState> {
    render() {
        const {description} = this.props;
        return (
            <View style={styles.container}>
                <Text>{description}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        flex:1
    }
})

export default connector(Introduction);
