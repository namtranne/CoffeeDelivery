import { StatusBar } from "expo-status-bar";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export const CommonLayout = ({ children, title, goBackButton }) => {
  const ios = Platform.OS == "ios";
  const navigation = useNavigation();
  return (
    <View className="flex-1 relative bg-white">
      <StatusBar />
      <SafeAreaView className={ios ? "-mb-8" : "" + " p-4 bg-white flex-1"}>
        <View className="mx-4 flex-row justify-center items-center">
          {goBackButton && (
            <TouchableOpacity
              className=" rounded-full absolute left-0 top-0"
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          )}
          <View>
            <Text className="text-lg font-medium">{title}</Text>
          </View>
        </View>
        <View className="flex-1 mt-8">{children}</View>
      </SafeAreaView>
    </View>
  );
};
