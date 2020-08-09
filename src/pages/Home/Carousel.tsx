import React from 'react';
import SnapCarousel, {
  ParallaxImage,
  Pagination,
  AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import {viewportWidth, wp, hp} from '@/utils/index';
import {StyleSheet, View} from 'react-native';
import {ICarousel} from '@/models/home';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

const sliderWidth = viewportWidth;
const sideWidth = wp(90);
export const sideHeight = hp(26);
const itemWidth = sideWidth + wp(2) * 2;

const mapStateToProps = ({home}: RootState) => {
  return {
    carousels: home.carousels,
    activeCarouselIndex: home.activeCarouselIndex,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  namespace: string;
}

class Carousel extends React.Component<IProps> {
  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/fetchCarousels',
    });
  };

  onSnapToItem = (index: number) => {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/setState',
      payload: {
        activeCarouselIndex: index,
      },
    });
  };

  renderItem = (
    {item}: {item: ICarousel},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <ParallaxImage
        source={{uri: item.image}}
        style={styles.image}
        containerStyle={styles.containerStyle}
        parallaxFactor={0.8}
        showSpinner
        spinnerColor="rgba(0,0,0,0.25)"
        {...parallaxProps}
      />
    );
  };

  get pagination() {
    const {carousels, activeCarouselIndex} = this.props;
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          containerStyle={styles.paginationContainer}
          activeDotIndex={activeCarouselIndex}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          dotsLength={carousels.length}
          inactiveDotScale={0.7}
          inactiveDotOpacity={0.4}
        />
      </View>
    );
  }

  render() {
    const {carousels} = this.props;
    return (
      <View>
        <SnapCarousel
          data={carousels}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages
          onSnapToItem={this.onSnapToItem}
          loop
          autoplay
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    width: itemWidth,
    height: sideHeight,
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -20,
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
});

export default connector(Carousel);
