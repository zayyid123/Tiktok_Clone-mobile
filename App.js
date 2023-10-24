import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, PixelRatio } from 'react-native';
import { SparklesIcon } from "react-native-heroicons/solid";
import VerticalViewPager from "react-native-vertical-view-pager";
import NavigationBottom from './components/NavigationBottom';
import NavbarTop from './components/NavbarTop';
import { Video } from 'expo-av';

const pixelRatio = PixelRatio.get();

let { width, height } = Dimensions.get("window");
height = height - (22 * pixelRatio)

export default function App() {
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
          <VerticalViewPager showsVerticalScrollIndicator={false}>
            {
              [1,2,3,4,5].map((res, index) => {
                return(
                  <View 
                    key={'vide'+index}
                    style={{
                      flex: 1,
                      width,
                      height,
                    }}
                    className='flex-1 justify-center w-full items-center relative bottom-8'
                  >
                    <View style={styles.video}>
                      <Video
                        source={{
                          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                        }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={true}
                        resizeMode="contain"
                        shouldPlay
                        bounce={false}
                        isLooping
                        style={styles.videoPlayer}
                        useNativeControls={false}
                      />
                    </View>
                  </View>
                )
              })
            }
          </VerticalViewPager>
        </View>

        {/* navigation bottom */}
        <NavigationBottom/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height - 90,
    backgroundColor: "black",
    zIndex: 1,
    alignSelf: "stretch"
  },
  post: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
    zIndex: 2,
    alignSelf: "stretch",
    position: "relative",
    bottom: 30
  },
  page_container: {
    flex: 1,
    width,
    height: height - 90
  },
  video: {
    width: "100%",
    flex: 1,
    zIndex: 2
  },
  videoPlayer: {
    width: "100%",
    zIndex: 2,
    flex: 1
  },
  header: {
    flexDirection: "row",
    position: "absolute",
    top: 40,
    left: 75,
    alignItems: "center"
  },
  spanCenterHeader: { color: "white", fontSize: 10 },
  textLeftHeader: {
    color: "grey",
    paddingHorizontal: 10,
    fontSize: 20
  },

  textRightHeader: {
    color: "white",
    paddingHorizontal: 10,
    fontSize: 23,
    fontWeight: "bold"
  },
  content: {
    width: "75%",
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: 3
  },
  InnerContent: {
    width: "100%",
    position: "relative",
    bottom: 0,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    flexDirection: "column"
  },

  name: { color: "white", marginVertical: 3, fontSize: 15, fontWeight: "bold" },
  description: { color: "white", marginTop: 2, fontSize: 15 },
  hashtags: { color: "white", fontWeight: "bold" },
  componentMusic: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: 190
  },
  imageIconMusic: {
    marginRight: 15
  },
  iMusic: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  nameMusic: {
    color: "white",
    fontSize: 15
  },
  translate: {
    fontWeight: "bold",
    color: "white",
    marginVertical: 5
  },
  contentIcon: {
    width: "20%",
    position: "absolute",
    bottom: 11,
    right: 0,
    alignItems: "center",
    zIndex: 3
  },
  contentIconProfile: {
    alignItems: "center",
    marginBottom: 2
  },

  iconProfile: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 1
  },
  iconPlusProfile: {
    height: 35,
    width: 25,
    position: "relative",
    bottom: 20,
    zIndex: 5,
    resizeMode: "contain"
  },
  iconsAction: {
    alignItems: "center",
    marginBottom: 20
  },
  contentIconAction: {
    alignItems: "center",
    marginBottom: 13
  },
  iconAction: {
    height: 40,
    width: 40
  },
  iconWhatsapp: {
    height: 40,
    width: 40,
    resizeMode: "cover",
    borderRadius: 20
  },
  textActions: { color: "white", textAlign: "center", width: 54 },
  iconMusic: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 30
  }
});
