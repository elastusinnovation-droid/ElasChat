import React from "react";
import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Video, formatCount } from "@/data/mockData";

interface VideoThumbnailProps {
  video: Video;
  onPress?: () => void;
  size?: "small" | "medium" | "large";
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export function VideoThumbnail({ video, onPress, size = "medium" }: VideoThumbnailProps) {
  const { theme } = useTheme();

  const getSize = () => {
    switch (size) {
      case "small":
        return { width: (SCREEN_WIDTH - Spacing.xl * 2 - Spacing.sm * 2) / 3, height: 140 };
      case "medium":
        return { width: (SCREEN_WIDTH - Spacing.xl * 2 - Spacing.sm) / 2, height: 200 };
      case "large":
        return { width: SCREEN_WIDTH - Spacing.xl * 2, height: 280 };
    }
  };

  const dimensions = getSize();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          width: dimensions.width,
          height: dimensions.height,
          backgroundColor: theme.backgroundSecondary,
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View style={styles.playIcon}>
        <Feather name="play" size={24} color="rgba(255,255,255,0.9)" />
      </View>

      <View style={styles.overlay}>
        <View style={styles.statsRow}>
          <Feather name="heart" size={12} color="#FFFFFF" />
          <ThemedText style={styles.statsText}>{formatCount(video.likesCount)}</ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 4,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: Spacing.sm,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  statsText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
