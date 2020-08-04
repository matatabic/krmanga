import React from 'react';
import { View, ListRenderItemInfo } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootStackNavigation } from '@/navigator/index';
import { RootState } from '@/models/index';
import Carousel from './Carousel';
import Guess from './Guess';
import { FlatList } from "react-native-gesture-handler";
import CommendItem from "@/pages/Home/CommendItem";
import { ICommends, ICommend, IGuess } from "@/models/home";

const mapStateToProps = ({ home, loading }: RootState) => ({
  carousels: home.carousels,
  commends: home.commends,
  loading: loading.effects['home/asyncAdd'],
});

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
  navigation: RootStackNavigation;
}

class Home extends React.Component<IProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchCommends',
    });
  }

  onPress = (item: ICommend | IGuess) => {
    console.log(item.id)
  }

  get header() {
    return (
      <View>
        <Carousel />
        <Guess onPress={this.onPress} />
      </View>
    )
  }

  keyExtractor = (item: ICommends, index: Number) => {
    return index.toString();
  }

  renderItem = ({ item }: ListRenderItemInfo<ICommends>) => {
    return (
      <CommendItem data={item} onPress={this.onPress} />
    )
  }

  render() {
    const { commends } = this.props;
    return (
      <FlatList ListHeaderComponent={this.header} keyExtractor={this.keyExtractor} data={commends}
                renderItem={this.renderItem} />
    );
  }


}

export default connector(Home);
