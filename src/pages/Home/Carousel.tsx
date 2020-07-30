import React from 'react';
import SnapCarousel, {
  ParallaxImage,
  Pagination,
  AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import {viewportWidth, wp, hp} from '@/utils/index';
import {StyleSheet, View} from 'react-native';

const sliderWidth = viewportWidth;
const sidewidth = wp(90);
const sideHeight = hp(26);
const itemWidth = sidewidth + wp(2) * 2;

const data = [
  'http://39.105.213.120/images/1.jpg',
  'http://39.105.213.120/images/3.jpg',
  'http://39.105.213.120/images/5.jpg',
  'http://39.105.213.120/images/7.jpg',
  'http://39.105.213.120/images/9.jpg',
];

class Carousel extends React.Component {

    state ={
        activeSlide:0,
    }

    onSnapToItem = (index:number)=>{
        this.setState({
            activeSlide:index,
        })
    }

  renderItem = (
    {item}: {item: string},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <ParallaxImage
        source={{uri: item}}
        style={styles.image}
        containerStyle={styles.containerStyle}
        parallaxFactor={0.8}
        showSpinner
        spinnerColor="rgba(0,0,0,0.25)"
        {...parallaxProps}
      />
    );
  };

  get pagination(){
      const {activeSlide} = this.state;
      return(
          <View style={styles.paginationWrapper}>
              <Pagination containerStyle={styles.paginationContainer}
              activeDotIndex={activeSlide}
              dotContainerStyle={styles.dotContainer}
              dotStyle={styles.dot}
                dotsLength = {data.length}
                inactiveDotScale={0.7}
                inactiveDotOpacity={0.4}
              />
          </View>
      )
  }

  render() {
    return (
        <View>
            <SnapCarousel
              data={data}
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
    borderRadius:8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationWrapper:{
    justifyContent:'center',
    alignItems:'center'
    },
  paginationContainer:{
      position:'absolute',
      top:-20,
      paddingHorizontal:3,
      paddingVertical:4,
      borderRadius:8,
  },
  dotContainer:{
    marginHorizontal:6,
  },
  dot:{
    width:6,
    height:6,
    borderRadius:3,
    backgroundColor:'rgba(255,255,255,0.92)',
  }
});

export default Carousel;
