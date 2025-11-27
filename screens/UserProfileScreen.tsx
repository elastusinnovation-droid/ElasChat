import React, { useState } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { VideoThumbnail } from "@/components/VideoThumbnail";
import { useTheme } from "@/hooks/useTheme";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { Spacing, Colors } from "@/constants/theme";
import { mockUsers, mockVideos, formatCount } from "@/data/mockData";
import type { HomeStackParamList } from "@/navigation/HomeStackNavigator";

type UserProfileRouteProp = RouteProp<HomeStackParamList, "UserProfile">;

export default function UserProfileScreen() {
  const { theme } = useTheme();
  const { paddingTop, paddingBottom } = useScreenInsets();
  const route = useRoute<UserProfileRouteProp>();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<"videos" | "liked">("videos");

  const user = mockUsers.find((u) => u.id === route.params.userId) || mockUsers[0];
  const userVideos = mockVideos.filter((v) => v.userId === user.id);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{ paddingTop, paddingBottom }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileSection}>
        <Avatar name={user.displayName} size={90} />

        <ThemedText type="h3" style={styles.displayName}>
          {user.displayName}
        </ThemedText>

        <ThemedText style={[styles.username, { color: theme.textSecondary }]}>
          @{user.username}
        </ThemedText>

        <View style={styles.statsRow}>
          <Pressable style={styles.statItem}>
            <ThemedText style={styles.statValue}>
              {formatCount(user.followingCount)}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>
              Following
            </ThemedText>
          </Pressable>

          <Pressable style={styles.statItem}>
            <ThemedText style={styles.statValue}>
              {formatCount(user.followersCount)}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>
              Followers
            </ThemedText>
          </Pressable>

          <Pressable style={styles.statItem}>
            <ThemedText style={styles.statValue}>
              {formatCount(user.postsCount)}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>
              Posts
            </ThemedText>
          </Pressable>
        </View>

        {user.bio ? (
          <ThemedText style={[styles.bio, { color: theme.textSecondary }]}>
            {user.bio}
          </ThemedText>
        ) : null}

        <View style={styles.actionButtons}>
          <Button
            onPress={() => setIsFollowing(!isFollowing)}
            style={[
              styles.followButton,
              {
                backgroundColor: isFollowing ? theme.backgroundSecondary : theme.primary,
              },
            ]}
          >
            <ThemedText style={{ color: isFollowing ? theme.text : "#FFFFFF", fontWeight: "600" }}>
              {isFollowing ? "Following" : "Follow"}
            </ThemedText>
          </Button>

          <Button
            style={[styles.messageButton, { backgroundColor: theme.backgroundSecondary }]}
          >
            <ThemedText style={{ color: theme.text, fontWeight: "600" }}>
              Message
            </ThemedText>
          </Button>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <Pressable
          onPress={() => setActiveTab("videos")}
          style={[
            styles.tab,
            {
              borderBottomColor: activeTab === "videos" ? theme.text : "transparent",
            },
          ]}
        >
          <Feather
            name="grid"
            size={20}
            color={activeTab === "videos" ? theme.text : theme.textSecondary}
          />
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("liked")}
          style={[
            styles.tab,
            {
              borderBottomColor: activeTab === "liked" ? theme.text : "transparent",
            },
          ]}
        >
          <Feather
            name="heart"
            size={20}
            color={activeTab === "liked" ? theme.text : theme.textSecondary}
          />
        </Pressable>
      </View>

      <View style={styles.videosGrid}>
        {userVideos.length > 0 ? (
          userVideos.map((video) => (
            <VideoThumbnail key={video.id} video={video} size="small" />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Feather name="video" size={48} color={theme.textSecondary} />
            <ThemedText style={[styles.emptyText, { color: theme.textSecondary }]}>
              No videos yet
            </ThemedText>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  displayName: {
    marginTop: Spacing.md,
  },
  username: {
    marginTop: Spacing.xs,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: Spacing.lg,
    gap: Spacing["3xl"],
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 13,
    marginTop: 2,
  },
  bio: {
    marginTop: Spacing.lg,
    textAlign: "center",
    paddingHorizontal: Spacing.xl,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
  followButton: {
    flex: 1,
    maxWidth: 140,
  },
  messageButton: {
    flex: 1,
    maxWidth: 140,
  },
  tabsContainer: {
    flexDirection: "row",
    marginTop: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(128,128,128,0.2)",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 2,
  },
  videosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  emptyState: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing["4xl"],
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: 14,
  },
});
