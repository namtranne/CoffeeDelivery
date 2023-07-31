import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { themeColors } from "../theme";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { updateLoyalPoint } from "../util/http";
export const LoyaltyCard = ({ point }) => {
  const authCtx = useContext(AuthContext);
  const [loyalPoint, setLoyalPoint] = useState(point);
  const handlePress = () => {
    if (loyalPoint === 8) {
      const token = authCtx.token;
      const UID = authCtx.UID;
      updateLoyalPoint(token, UID, 0);
      setLoyalPoint(0);
    }
  };
  return (
    <Pressable
      className="rounded-lg h-30 p-4 justify-center"
      style={styles.LoyaltyCard}
      onPress={handlePress}
    >
      <View className="flex-row justify-between mb-2">
        <Text className="font-medium text-white text-lg">Loyalty Card</Text>
        <Text className="font-medium text-white text-lg">{loyalPoint}/8</Text>
      </View>
      <View className="flex-row justify-between p-3 bg-white rounded-lg">
        {Array.from(new Array(loyalPoint)).map((item, index) => {
          return (
            <Image
              key={index}
              source={require("../assets/images/loyalCupSolid.jpg")}
              className="h-8 w-8"
            />
          );
        })}
        {Array.from(new Array(8 - loyalPoint)).map((item, index) => {
          return (
            <Image
              key={index}
              source={require("../assets/images/loyalCupOutline.png")}
              className="h-8 w-8"
            />
          );
        })}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  LoyaltyCard: {
    backgroundColor: themeColors.bgDark,
    marginTop: 24,
    // height: 80,
    marginLeft: 10,
    marginRight: 10,
  },
});
