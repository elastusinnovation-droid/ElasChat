import React, { useState, useRef, useCallback } from "react";
import { View, StyleSheet, FlatList, Dimensions, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { VideoCard } from "@/components/VideoCard";
import { FeedTabs } from "@/components/FeedTabs";
import { IconButton } from "@/components/IconButton";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { mockVideos } from "@/data/mockData";
import type { HomeStackParamList } from "@/navigation/HomeStackNavigator";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const TABS = ["Following", "For You", "Nearby"];

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export default function HomeScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState("For You");
  const flatListRef = useRef<FlatList>(null);

  const handleUserPress = useCallback((userId: string) => {
    navigation.navigate("UserProfile", { userId });
  }, [navigation]);

  const handleCommentPress = useCallback((videoId: string) => {
    navigation.navigate("Comments", { videoId });
  }, [navigation]);

  const renderVideo = useCallback(({ item }: { item: typeof mockVideos[0] }) => (
    <VideoCard
      video={item}
      onUserPress={() => handleUserPress(item.userId)}
      onCommentPress={() => handleCommentPress(item.id)}
    />
  ), [handleUserPress, handleCommentPress]);

  const keyExtractor = useCallback((item: typeof mockVideos[0]) => item.id, []);

  return (
    <View style={[styles.container, { backgroundColor: "#000" }]}>
      <FlatList
        ref={flatListRef}
        data={mockVideos}
        renderItem={renderVideo}
        keyExtractor={keyExtractor}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
        bounces={false}
      />

      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <View style={styles.headerLeft}>
          <IconButton name="tv" size={22} color="#FFFFFF" />
        </View>

        <FeedTabs
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <View style={styles.headerRight}>
          <IconButton
            name="bell"
            size={22}
            color="#FFFFFF"
            onPress={() => navigation.navigate("Notifications")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.sm,
    zIndex: 10,
  },
  headerLeft: {
    width: 50,
  },
  headerRight: {
    width: 50,
    alignItems: "flex-end",
  },
});
