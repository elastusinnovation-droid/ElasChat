import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { SearchBar } from "@/components/SearchBar";
import { Chip } from "@/components/Chip";
import { VideoThumbnail } from "@/components/VideoThumbnail";
import { Avatar } from "@/components/Avatar";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { mockVideos, mockUsers, trendingHashtags } from "@/data/mockData";
import type { DiscoverStackParamList } from "@/navigation/DiscoverStackNavigator";

type NavigationProp = NativeStackNavigationProp<DiscoverStackParamList>;

export default function DiscoverScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = searchQuery
    ? mockVideos.filter(
        (v) =>
          v.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.hashtags.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : mockVideos;

  const filteredUsers = searchQuery
    ? mockUsers.filter(
        (u) =>
          u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <View style={[styles.searchContainer, { paddingTop: insets.top + Spacing.md }]}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search users, hashtags, sounds"
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!searchQuery && (
          <>
            <ThemedText type="label" style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              Trending
            </ThemedText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsContainer}
            >
              {trendingHashtags.map((hashtag) => (
                <Chip
                  key={hashtag.tag}
                  label={`#${hashtag.tag}`}
                  onPress={() => setSearchQuery(hashtag.tag)}
                />
              ))}
            </ScrollView>
          </>
        )}

        {searchQuery && filteredUsers.length > 0 && (
          <>
            <ThemedText type="label" style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              Users
            </ThemedText>
            <View style={styles.usersContainer}>
              {filteredUsers.map((user) => (
                <Pressable
                  key={user.id}
                  onPress={() => navigation.navigate("UserProfile", { userId: user.id })}
                  style={({ pressed }) => [
                    styles.userItem,
                    {
                      backgroundColor: pressed ? theme.backgroundSecondary : "transparent",
                    },
                  ]}
                >
                  <Avatar name={user.displayName} size={44} />
                  <View style={styles.userInfo}>
                    <ThemedText style={styles.userName}>{user.displayName}</ThemedText>
                    <ThemedText style={[styles.userHandle, { color: theme.textSecondary }]}>
                      @{user.username}
                    </ThemedText>
                  </View>
                </Pressable>
              ))}
            </View>
          </>
        )}

        <ThemedText type="label" style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          {searchQuery ? "Videos" : "Explore"}
        </ThemedText>
        <View style={styles.gridContainer}>
          {filteredVideos.map((video) => (
            <VideoThumbnail key={video.id} video={video} size="medium" />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
  },
  sectionTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  chipsContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  usersContainer: {
    marginBottom: Spacing.md,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    marginHorizontal: -Spacing.xl,
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: "600",
    fontSize: 15,
  },
  userHandle: {
    fontSize: 13,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
});
