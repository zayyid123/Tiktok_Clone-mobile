import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SparklesIcon } from "react-native-heroicons/solid";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <StatusBar style="auto" />
      <SparklesIcon size={30} fill={'#000'}/>
      <Text>zay</Text>
    </View>
  );
}
