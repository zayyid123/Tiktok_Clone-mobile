import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Image,
  TouchableOpacity,
} from "react-native";
import NavigationBottom from "./components/NavigationBottom";
import NavbarTop from "./components/NavbarTop";
import { Video } from "expo-av";
import { useRef, useState } from "react";
import { FlatList } from "react-native";
import TextTicker from "react-native-text-ticker";

// icon
import { MusicalNoteIcon, PlusIcon } from "react-native-heroicons/outline";

const pixelRatio = PixelRatio.get();

let { width, height } = Dimensions.get("window");
height = height - 10 * pixelRatio;

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
    console.log(e);
  }
};

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
    console.log(e);
  }
};

export default function App() {
  const [feed, setfeed] = useState([
    {
      id: 0,
      video: require("./assets/feed/status1.mp4"),
      desc: "Gus Bahaudin Nursalim",
      music: "Gus Baha - By Mochamad Muzayyid Al Hakim",
      isLiked: true,
      isSaved: true,
    },
    {
      id: 1,
      video: require("./assets/feed/status2.mp4"),
      desc: "Anak Kecil Palestina sedang menangisi ibunya",
      music: "Original Sound - By Mochamad Muzayyid Al Hakim",
      isLiked: false,
      isSaved: false,
    },
    {
      id: 2,
      video: require("./assets/feed/status3.mp4"),
      desc: "#SAVEPALESTINA",
      music: "Memory Boot - By Mochamad Muzayyid Al Hakim",
      isLiked: false,
      isSaved: false,
    },
  ]);
  const mediaRefs = [];

  const handleLike = (id) => {
    const updatedFeed = [...feed];

    const itemIndex = updatedFeed.findIndex((item) => item.id === id);

    updatedFeed[itemIndex].isLiked = !updatedFeed[itemIndex].isLiked;

    setfeed(updatedFeed);
  };

  const handleSave = (id) => {
    const updatedFeed = [...feed];

    const itemIndex = updatedFeed.findIndex((item) => item.id === id);

    updatedFeed[itemIndex].isSaved = !updatedFeed[itemIndex].isSaved;

    setfeed(updatedFeed);
  };

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs[element.key];
      if (cell) {
        if (element.isViewable) {
          play(cell);
        } else {
          stop(cell);
        }
      }
    });
  });

  return (
    <View className="flex-1 bg-red-600">
      <StatusBar style="light" backgroundColor="#000" translucent={false} />
      {/* navbar */}
      <NavbarTop />

      {/* content */}
      <View className="bg-black flex-1">
        {/* feed */}
        <View
          style={{
            height,
          }}
          className="w-full bg-black items-stretch"
        >
          <FlatList
            data={feed}
            windowSize={4}
            maxToRenderPerBatch={0}
            removeClippedSubviews
            viewabilityConfig={{
              itemVisiblePercentThreshold: 1,
            }}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    width,
                    height,
                  }}
                  className="flex-1 justify-center w-full items-center relative bottom-8 relative"
                >
                  <View
                    style={{
                      width: "100%",
                      flex: 1,
                      zIndex: 2,
                    }}
                  >
                    <Video
                      ref={(singleRef) => mediaRefs.push(singleRef)}
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
                        flex: 1,
                      }}
                      useNativeControls={false}
                    />
                  </View>

                  {/* information */}
                  <View className="absolute bottom-0 right-0 left-0 z-40 mb-3 mx-2">
                    <View className="flex-row items-end justify-between">
                      {/* kiri */}
                      <View>
                        {/* name */}
                        <View className="mb-3">
                          <Text className="text-white text-xl font-bold">
                            zay
                          </Text>
                        </View>

                        {/* description */}
                        <View className="mb-3">
                          <Text className="text-white text-lg w-[250px]">
                            {item.desc}
                          </Text>
                        </View>

                        {/* name song */}
                        <View className="flex-row items-center gap-2 w-[250px]">
                          <MusicalNoteIcon size={20} color={"#fff"} />
                          <TextTicker
                            className="text-white text-sm"
                            duration={4000}
                            loop
                            bounce={false}
                            repeatSpacer={70}
                            marqueeDelay={1000}
                            shouldAnimateTreshold={40}
                          >
                            {item.music}
                          </TextTicker>
                        </View>
                      </View>

                      {/* kanan */}
                      <View className="items-center">
                        {/* icon profile */}
                        <View className="items-center mb-3">
                          <View className="bg-white p-[2px] rounded-full items-center justify-center">
                            <Image
                              source={{
                                uri: "https://lh3.googleusercontent.com/ogw/AKPQZvwdDLyYvI05P8R39uRv2Q5P2fJuKSREVocASETn1FU",
                              }}
                              style={{
                                width: 35,
                                height: 35,
                                resizeMode: "contain",
                              }}
                              className="rounded-full"
                            />
                          </View>

                          <View className="bg-[#E14763] p-[2px] rounded-full mt-[-8px]">
                            <PlusIcon size={16} color={"#fff"} />
                          </View>
                        </View>

                        {/* icon love */}
                        <View className="items-center mb-3">
                          <TouchableOpacity
                            onPress={() => {
                              handleLike(index);
                            }}
                          >
                            {item.isLiked ? (
                              <Image
                                source={require("./assets/icon/loved.png")}
                                style={{
                                  width: 30,
                                  height: 30,
                                  resizeMode: "contain",
                                }}
                                className="mb-2"
                              />
                            ) : (
                              <Image
                                source={require("./assets/icon/love.png")}
                                style={{
                                  width: 30,
                                  height: 30,
                                  resizeMode: "contain",
                                }}
                                className="mb-2"
                              />
                            )}
                          </TouchableOpacity>
                          <Text className="text-white font-bold">20.2K</Text>
                        </View>

                        {/* icon comment */}
                        <View className="items-center mb-3">
                          <TouchableOpacity>
                            <Image
                              source={require("./assets/icon/comment.png")}
                              style={{
                                width: 30,
                                height: 30,
                                resizeMode: "contain",
                              }}
                              className="mb-2"
                            />
                          </TouchableOpacity>
                          <Text className="text-white font-bold">360</Text>
                        </View>

                        {/* icon save */}
                        <View className="items-center mb-3">
                          <TouchableOpacity
                            onPress={() => {
                              handleSave(index);
                            }}
                          >
                            {item.isSaved ? (
                              <Image
                                source={require("./assets/icon/ribbon_saved.png")}
                                style={{
                                  width: 30,
                                  height: 30,
                                  resizeMode: "contain",
                                }}
                                className="mb-2"
                              />
                            ) : (
                              <Image
                                source={require("./assets/icon/ribbon.png")}
                                style={{
                                  width: 30,
                                  height: 30,
                                  resizeMode: "contain",
                                }}
                                className="mb-2"
                              />
                            )}
                          </TouchableOpacity>
                          <Text className="text-white font-bold">360</Text>
                        </View>

                        {/* icon share */}
                        <View className="items-center mb-6">
                          <TouchableOpacity>
                            <Image
                              source={require("./assets/icon/share.png")}
                              style={{
                                width: 30,
                                height: 30,
                                resizeMode: "contain",
                              }}
                              className="mb-2"
                            />
                          </TouchableOpacity>
                          <Text className="text-white font-bold">300</Text>
                        </View>

                        {/* image sound */}
                        <View>
                          <Image
                            source={{
                              uri: "https://lh3.googleusercontent.com/ogw/AKPQZvwdDLyYvI05P8R39uRv2Q5P2fJuKSREVocASETn1FU",
                            }}
                            style={{
                              width: 30,
                              height: 30,
                              resizeMode: "contain",
                            }}
                            className="rounded-full"
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
            pagingEnabled
            decelerationRate={"normal"}
            onViewableItemsChanged={onViewableItemsChanged.current}
          />
        </View>

        {/* navigation bottom */}
        <NavigationBottom />
      </View>
    </View>
  );
}
