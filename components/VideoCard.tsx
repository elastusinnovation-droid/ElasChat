import React, { useState } from "react";
import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Avatar } from "@/components/Avatar";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Colors } from "@/constants/theme";
import { Video, formatCount } from "@/data/mockData";

interface VideoCardProps {
  video: Video;
  onUserPress?: () => void;
  onCommentPress?: () => void;
  onSharePress?: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

function ActionButton({
  icon,
  count,
  onPress,
  isActive = false,
  activeColor = Colors.dark.accent,
}: {
  icon: keyof typeof Feather.glyphMap;
  count?: number;
  onPress?: () => void;
  isActive?: boolean;
  activeColor?: string;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.2, { damping: 10 });
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 15 });
    }, 100);
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress} style={styles.actionButton}>
      <Animated.View style={animatedStyle}>
        <Feather
          name={icon}
          size={28}
          color={isActive ? activeColor : "#FFFFFF"}
        />
      </Animated.View>
      {count !== undefined && (
        <ThemedText style={styles.actionCount}>{formatCount(count)}</ThemedText>
      )}
    </Pressable>
  );
}

export function VideoCard({
  video,
  onUserPress,
  onCommentPress,
  onSharePress,
}: VideoCardProps) {
  const { theme } = useTheme();
  const [isLiked, setIsLiked] = useState(video.isLiked || false);
  const [likesCount, setLikesCount] = useState(video.likesCount);
  const [isFollowing, setIsFollowing] = useState(video.user.isFollowing || false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.videoBackground, { backgroundColor: theme.backgroundSecondary }]}>
        <View style={styles.placeholderContent}>
          <Feather name="play-circle" size={64} color="rgba(255,255,255,0.3)" />
        </View>
      </View>

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        style={styles.bottomGradient}
      />

      <View style={styles.rightActions}>
        <View style={styles.profileAction}>
          <Avatar name={video.user.displayName} size={48} onPress={onUserPress} />
          {!isFollowing && (
            <Pressable
              onPress={handleFollow}
              style={[styles.followBadge, { backgroundColor: theme.primary }]}
            >
              <Feather name="plus" size={12} color="#FFFFFF" />
            </Pressable>
          )}
        </View>

        <ActionButton
          icon={isLiked ? "heart" : "heart"}
          count={likesCount}
          onPress={handleLike}
          isActive={isLiked}
        />

        <ActionButton
          icon="message-circle"
          count={video.commentsCount}
          onPress={onCommentPress}
        />

        <ActionButton
          icon="share"
          count={video.sharesCount}
          onPress={onSharePress}
        />

        <ActionButton icon="more-horizontal" onPress={() => {}} />
      </View>

      <View style={styles.bottomInfo}>
        <Pressable onPress={onUserPress}>
          <ThemedText style={styles.username}>@{video.user.username}</ThemedText>
        </Pressable>

        <ThemedText style={styles.caption} numberOfLines={2}>
          {video.caption}
        </ThemedText>

        <View style={styles.soundRow}>
          <Feather name="music" size={12} color="#FFFFFF" />
          <ThemedText style={styles.soundTitle} numberOfLines={1}>
            {video.soundTitle}
          </ThemedText>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { backgroundColor: "#FFFFFF" }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#000",
  },
  videoBackground: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
  },
  rightActions: {
    position: "absolute",
    right: Spacing.md,
    bottom: 120,
    alignItems: "center",
    gap: Spacing.lg,
  },
  profileAction: {
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  followBadge: {
    position: "absolute",
    bottom: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
  },
  actionButton: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  actionCount: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  bottomInfo: {
    position: "absolute",
    left: Spacing.md,
    right: 80,
    bottom: 100,
    gap: Spacing.sm,
  },
  username: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  caption: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  soundRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  soundTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    flex: 1,
  },
  progressBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 80,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  progressFill: {
    height: "100%",
    width: "60%",
  },
});
