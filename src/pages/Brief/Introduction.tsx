import React from 'react';
import {View, Text} from 'react-native';
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
            <View>
                <Text>{description}</Text>
            </View>
        );
    }
}

export default connector(Introduction);
