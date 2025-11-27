import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import AuthScreen from "@/screens/AuthScreen";
import CreateScreen from "@/screens/CreateScreen";
import CommentsScreen from "@/screens/CommentsScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useTheme";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Create: undefined;
  Comments: { videoId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.backgroundRoot },
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen}
          options={{ animationTypeForReplace: "pop" }}
        />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen 
            name="Create" 
            component={CreateScreen}
            options={{
              presentation: "fullScreenModal",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen 
            name="Comments" 
            component={CommentsScreen}
            options={{
              presentation: "modal",
              headerShown: true,
              headerTitle: "Comments",
              headerTintColor: theme.text,
              headerStyle: { backgroundColor: theme.backgroundRoot },
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
