import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import Touchable from '@/components/Touchable';
import { IGuess } from '@/models/home';
import Icon from '@/assets/iconfont/index';
import BookCover from "@/components/BookCover";

const mapStateToProps = ({ home }: RootState) => {
  return {
    guess: home.guess,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  onPress: (data: IGuess) => void;
}

class Guess extends React.Component<IProps> {

  componentDidMount() {
    // this.fetch();
  }

  fetch = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchGuess',
    });
  };

  renderItem = ({ item }: { item: IGuess }) => {
    const { onPress } = this.props;
    return (
      <BookCover
        data={item}
        onPress={onPress}
        itemStyle={styles.item}
        imageStyle={styles.image}
        key={item.id}
      />
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
          onPress={
            this.fetch
          }>
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
