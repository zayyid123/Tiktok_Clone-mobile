import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SparklesIcon } from "react-native-heroicons/solid";
import NavigationBottom from './components/NavigationBottom';
import NavbarTop from './components/NavbarTop';

export default function App() {
  return (
    <View className="flex-1 bg-red-600">
      <StatusBar style="light" backgroundColor='#000' translucent={false} />
      <NavbarTop/>

      {/* navigation bottom */}
      <NavigationBottom/>
    </View>
  );
}
