import { Pressable, Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { themeColors } from "../../theme";
import { useState } from "react";
import { updateUserInfo } from "../../util/http";
export const CommonInput = ({
  title,
  iconName,
  value,
  handleUpdateUserInfo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  function onUpdateValue(value) {
    setEditValue(value);
  }
  function handleOnPress() {
    setIsEditing((prev) => !prev);
  }
  function handleConfirm() {
    if (value === editValue) {
      return;
    }
    setIsEditing(false);
    handleUpdateUserInfo(title, editValue);
  }
  function handleCancel() {
    setIsEditing(false);
    setEditValue(value);
  }
  return (
    <View className="flex-row w-max justify-start mx-8 mb-8">
      <View className="mr-4 item-center justify-center h-max">
        <View className="w-12 h-12 rounded-full bg-sky-50 items-center justify-center">
          <AntDesign name={iconName} size={24} color="black" />
        </View>
      </View>
      <View style={{ flex: 8 }}>
        <Text className="text-stone-300">{title}</Text>
        {!isEditing ? (
          <Text
            className="font-semibold text-lg"
            style={{ color: themeColors.bgDark }}
          >
            {value}
          </Text>
        ) : (
          <TextInput
            keyboardType={title == "Phone number" ? "numeric" : "default"}
            autoCapitalize="none"
            onChangeText={onUpdateValue}
            placeholder={title}
            value={editValue}
            className="p-2 rounded-xl text-base bg-stone-50 text-black"
          ></TextInput>
        )}
      </View>
      {!isEditing ? (
        title !== "Email" && (
          <Pressable
            onPress={handleOnPress}
            className="items-end justify-center"
            style={{ flex: 2 }}
          >
            <FontAwesome5 name="edit" size={24} color="black" />
          </Pressable>
        )
      ) : (
        <View className="justify-center items-center h-max" style={{ flex: 2 }}>
          <Pressable
            onPress={handleConfirm}
            className="items-end justify-center"
            style={{ flex: 2 }}
          >
            <MaterialCommunityIcons
              name="checkbox-marked-circle-outline"
              size={24}
              color="black"
            />
          </Pressable>
          <Pressable
            onPress={handleCancel}
            className="items-end justify-center"
            style={{ flex: 2 }}
          >
            <Entypo name="circle-with-cross" size={24} color="black" />
          </Pressable>
        </View>
      )}
    </View>
  );
};
