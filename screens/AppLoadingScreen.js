import { View } from "react-native";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import { ActivityIndicator } from "react-native";
export const AppLoadingScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/images/loginBackground.png")}
      className="flex-1"
    >
      <View className="justify-center items-center flex-1">
        <Image
          source={require("../assets/images/logo.png")}
          className="w-24 h-24 mb-8"
        ></Image>
        <ActivityIndicator size="large" />
      </View>
    </ImageBackground>
  );
};
