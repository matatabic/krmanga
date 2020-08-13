import React from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useHeaderHeight} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackParamList} from '@/navigator/index';
import Tab from './Tab';

const mapStateToProps = ({brief}: RootState) => {
  return {
    description: brief.description,
    collected: brief.collected,
    serial: brief.serial,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  headerHeight: number;
  route: RouteProp<RootStackParamList, 'Brief'>;
}

class Brief extends React.Component<IProps> {
  translateY = new Animated.Value(0);
  componentDidMount() {
    const {dispatch, route} = this.props;
    const {id} = route.params.item;
    dispatch({
      type: 'brief/fetchBrief',
      payload: {
        book_id: id,
      },
    });
    Animated.timing(this.translateY, {
      useNativeDriver: true,
      toValue: -170,
      duration: 3000,
    }).start();
  }

  renderHeader = () => {
    const {headerHeight, route, collected, serial, description} = this.props;
    const {title, image, id, category} = route.params.item;
    return (
        <View style={[styles.header, {paddingTop: headerHeight}]}>
          <Image source={{uri: image}} style={styles.background} />
          <BlurView
              blurType="light"
              blurAmount={10}
              style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.leftView}>
            <Image source={{uri: image}} style={styles.thumbnail} />
          </View>
          <View>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.bookInfoText}>
              {serial ? '已完结' : '连载中'}
            </Text>
            <Text style={styles.bookInfoText}>{category}</Text>
          </View>
        </View>
    );
  };

  render() {
    return (
        <Animated.View
            style={[
              styles.container,
              {transform: [{translateY: this.translateY}]},
            ]}>
          {this.renderHeader()}
          <Tab />
        </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 500,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eee',
  },
  leftView: {
    marginRight: 26,
  },
  thumbnail: {
    width: 98,
    height: 125,
    borderColor: '#000',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  rightView: {
    flex: 1,
  },
  titleText: {
    fontSize: 23,
    fontWeight: '900',
    color: '#000',
  },
  bookInfoText: {
    fontSize: 15,
    marginVertical: 10,
    color: '#000',
  },
});

const Wrapper = function (props: IProps) {
  const headerHeight = useHeaderHeight();
  return <Brief {...props} headerHeight={headerHeight} />;
};

export default connector(Wrapper);
