import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ICommends, ICommend} from '@/models/home';
import {viewportWidth} from '@/utils/index';
import BookCover from '@/components/BookCover';

interface IProps {
  data: ICommends;
  goBrief: (data: ICommend) => void;
}

const BookViewWidth = viewportWidth - 16 * 2;
const BookWidth = (BookViewWidth - 5 * 7) / 3;

class CommendItem extends React.PureComponent<IProps> {
  renderItem = (item: ICommend, index: Number) => {
    const {goBrief} = this.props;
    return (
      <BookCover
        data={item}
        goBrief={goBrief}
        itemStyle={styles.item}
        imageStyle={styles.image}
        key={item.id}
      />
    );
  };

  render() {
    const {data} = this.props;
    return (
      <View style={styles.container}>
        {Object.keys(data).map((classify) => {
          return (
            <View key={classify}>
              <View style={styles.header}>
                <Text style={styles.classifyName}>{classify}</Text>
              </View>
              <View style={styles.classifyView}>
                {data[classify].map(this.renderItem)}
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  header: {
    padding: 15,
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  classifyName: {
    fontSize: 16,
    color: '#DCBA01',
  },
  classifyView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: BookWidth,
    marginVertical: 6,
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: 165,
    borderRadius: 5,
  },
});

export default CommendItem;
