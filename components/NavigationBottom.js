import { View, Text } from "react-native";
import React from "react";

// icon
import {
  HomeIcon,
  UsersIcon,
  PlusIcon,
  ChatBubbleBottomCenterTextIcon,
  UserIcon,
} from "react-native-heroicons/outline";

const NavigationBottom = () => {
  return (
    <View className="flex-row justify-between items-center p-2 z-40 border-t border-white absolute bottom-0 right-0 left-0 bg-black">
      {/* home button */}
      <View className="items-center">
        <HomeIcon size={26} color={"#ededed"} />
        <Text className="text-white text-xs">Home</Text>
      </View>

      {/* users button */}
      <View className="items-center">
        <UsersIcon size={26} color={"#ededed"} />
        <Text className="text-white text-xs">Friends</Text>
      </View>

      {/* plus button */}
      <View className="items-center flex-row relative">
        <View className="h-[34px] w-[40px] bg-[#DF3C6B] absolute right-[-5px] rounded-lg"></View>
        <View className="h-[34px] w-[40px] bg-[#1ED7EB] absolute left-[-5px] rounded-lg"></View>
        <View className="bg-white px-2 py-1 rounded-lg">
          <PlusIcon size={26} color={"#000"} />
        </View>
      </View>

      {/* chat button */}
      <View className="items-center">
        <ChatBubbleBottomCenterTextIcon size={26} color={"#ededed"} />
        <Text className="text-white text-xs">Inbox</Text>
      </View>

      {/* profile button */}
      <View className="items-center">
        <UserIcon size={26} color={"#ededed"} />
        <Text className="text-white text-xs">Profile</Text>
      </View>
    </View>
  );
};

export default NavigationBottom;
