import { Image, Text, View } from "react-native";
import { CommonLayout } from "../components/Layout/CommonLayout";
import { CommonButton } from "../components/ui/CommonButton";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";

export const OrderSuccessScreen = () => {
  const navigation = useNavigation();
  return (
    <CommonLayout title="">
      <View className="items-center w-max mt-28 ">
        <Image source={require("../assets/images/orderSuccessImage.png")} />
        <Text className="text-2xl my-8" style={{ color: themeColors.bgDark }}>
          Order Success
        </Text>
        <View className="items-center mb-24">
          <Text className="text-stone-300">
            Your order has been placed successfully.
          </Text>
          <Text className="text-stone-300">
            For more details, go to my orders.
          </Text>
        </View>
        <CommonButton
          title="Track My Order"
          onPress={() => navigation.navigate("MyOrders")}
          style={{ width: "100%" }}
        ></CommonButton>
      </View>
    </CommonLayout>
  );
};
