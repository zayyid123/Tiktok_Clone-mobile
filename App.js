import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, PixelRatio } from 'react-native';
import { SparklesIcon } from "react-native-heroicons/solid";
import VerticalViewPager from "react-native-vertical-view-pager";
import NavigationBottom from './components/NavigationBottom';
import NavbarTop from './components/NavbarTop';
import { Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';

const pixelRatio = PixelRatio.get();

let { width, height } = Dimensions.get("window");
height = height - (10 * pixelRatio)

const feed =[
  {
    id: 0,
    video: require('./assets/feed/status1.mp4'),
  },
  {
    id: 1,
    video: require('./assets/feed/status2.mp4'),
  },
  {
    id: 2,
    video: require('./assets/feed/status3.mp4'),
  }
]

const play = async (ref) => {
  if (ref == null) {
      return;
  }

  // if video is already playing return
  const status = await ref.getStatusAsync();
  if (status?.isPlaying) {
      return;
  }
  try {
      await ref.playAsync();
  } catch (e) {
      console.log(e)
  }
}

const stop = async (ref) => {
  if (ref == null) {
      return;
  }

  // if video is already stopped return
  const status = await ref.getStatusAsync();
  if (!status?.isPlaying) {
      return;
  }
  try {
      await ref.stopAsync();
  } catch (e) {
      console.log(e)
  }
}

export default function App() {
  const [status, setstatus] = useState()
  const mediaRefs = []

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach(element => {
      const cell = mediaRefs[element.key]
      if (cell) {
        console.log(element)
        if (element.isViewable) {
          play(cell)
        } else {
          stop(cell)
        }
      }
    });
  })

  return (
    <View className="flex-1 bg-red-600">
      <StatusBar style="light" backgroundColor='#000' translucent={false} />
      {/* navbar */}
      <NavbarTop/>

      {/* content */}
      <View
        className='bg-black flex-1'
      >
        {/* feed */}
        <View
          style={{
            height,
          }}
          className='w-full bg-black items-stretch'
        >
          <FlatList
            data={feed}
            windowSize={4}
            maxToRenderPerBatch={0}
            removeClippedSubviews
            viewabilityConfig={{
              itemVisiblePercentThreshold: 1
            }}
            renderItem={({item}) => {
              return(
                <View 
                  style={{
                    flex: 1,
                    width,
                    height,
                  }}
                  className='flex-1 justify-center w-full items-center relative bottom-8'
                >
                  <View 
                    style={{
                      width: "100%",
                      flex: 1,
                      zIndex: 2
                    }}
                  >
                    <Video
                      ref={singleRef => mediaRefs.push(singleRef)}
                      source={item.video}
                      rate={1.0}
                      volume={1.0}
                      isMuted={false}
                      resizeMode="contain"
                      bounce={false}
                      isLooping
                      style={{
                        width: "100%",
                        zIndex: 2,
                        flex: 1
                      }}
                      useNativeControls={false}
                    />
                  </View>
                </View>
              )
            }}
            keyExtractor={item => item.id}
            pagingEnabled
            decelerationRate={'normal'}
            onViewableItemsChanged={onViewableItemsChanged.current}
          />
        </View>

        {/* navigation bottom */}
        <NavigationBottom/>
      </View>
    </View>
  );
}