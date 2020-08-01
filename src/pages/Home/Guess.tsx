import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import Touchable from '@/components/Touchable';
import { IGuess } from '@/models/home';
import Icon from '@/assets/iconfont/index';

const mapStateToProps = ({ home }: RootState) => {
  return {
    guess: home.guess,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class Guess extends React.Component<ModelState> {
  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchGuess',
    });
  };

  renderItem = ({ item }: { item: IGuess }) => {
    return (
      <Touchable onPress={() => {
      }} style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };

  render() {
    const { guess } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Icon name="icon-electronics" />
            <Text style={styles.headerTitle}>猜你喜欢</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.moreTitle}>更多</Text>
            <Icon name="icon-arrow-right" />
          </View>
        </View>
        <FlatList
          style={styles.list}
          data={guess}
          numColumns={3}
          renderItem={this.renderItem}
        />
        <Touchable
          style={styles.changeGuess}
          onPress={() => {
            this.fetch;
          }}>
          <Icon name="icon-refresh" color="red" />
          <Text style={styles.changeGuessText}>换一批</Text>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 5,
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreTitle: {
    color: '#6f6f6f',
  },
  item: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 5,
  },
  list: {
    padding: 2,
  },
  image: {
    width: '100%',
    height: 165,
    borderRadius: 5,
  },
  changeGuess: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  changeGuessText: {
    marginLeft: 5,
  },
});

export default connector(Guess);
