import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessagesScreen from "@/screens/MessagesScreen";
import ChatScreen from "@/screens/ChatScreen";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type MessagesStackParamList = {
  Messages: undefined;
  Chat: { chatId: string; userName: string };
};

const Stack = createNativeStackNavigator<MessagesStackParamList>();

export default function MessagesStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ headerTitle: "Messages" }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          headerTitle: route.params.userName,
        })}
      />
    </Stack.Navigator>
  );
}
