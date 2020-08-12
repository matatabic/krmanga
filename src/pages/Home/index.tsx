import React from 'react';
import {
  View,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import Carousel, {sideHeight} from './Carousel';
import Guess from './Guess';
import {FlatList} from 'react-native-gesture-handler';
import CommendItem from '@/pages/Home/CommendItem';
import {ICommends, ICommend, IGuess} from '@/models/home';
import {HomeParamList} from '@/navigator/HomeTabs';
import {RouteProp} from '@react-navigation/native';

const mapStateToProps = (
  state: RootState,
  {route}: {route: RouteProp<HomeParamList, string>},
) => {
  const {namespace} = route.params;
  const modelState = state[namespace];
  return {
    namespace,
    carousels: modelState.carousels,
    commends: modelState.commends,
    gradientVisible: modelState.gradientVisible,
    loading: state.loading.effects[namespace + '/asyncAdd'],
  };
};

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
  navigation: RootStackNavigation;
}

class Home extends React.Component<IProps> {
  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/fetchCommends',
    });
  };

  goBrief = (data: ICommend | IGuess) => {
    const {navigation} = this.props;
    navigation.navigate('Brief', {
      item: data,
    });
  };

  get header() {
    const {namespace} = this.props;
    return (
      <View>
        <Carousel namespace={namespace} />
        <View style={{backgroundColor: '#fff'}}>
          <Guess goBrief={this.goBrief} namespace={namespace} />
        </View>
      </View>
    );
  }

  keyExtractor = (item: ICommends, index: Number) => {
    return index.toString();
  };

  onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    let newGradientVisible = offsetY < sideHeight;
    const {dispatch, gradientVisible, namespace} = this.props;
    if (gradientVisible !== newGradientVisible) {
      dispatch({
        type: namespace + '/setState',
        payload: {
          gradientVisible: newGradientVisible,
        },
      });
    }
  };

  renderItem = ({item}: ListRenderItemInfo<ICommends>) => {
    return <CommendItem data={item} goBrief={this.goBrief} />;
  };

  render() {
    const {commends} = this.props;
    return (
      <FlatList
        ListHeaderComponent={this.header}
        keyExtractor={this.keyExtractor}
        data={commends}
        renderItem={this.renderItem}
        onScroll={this.onScroll}
      />
    );
  }
}

export default connector(Home);
