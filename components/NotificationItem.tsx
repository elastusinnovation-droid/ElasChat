import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Avatar } from "@/components/Avatar";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { Notification, formatTimeAgo } from "@/data/mockData";

interface NotificationItemProps {
  notification: Notification;
  onPress?: () => void;
}

function getNotificationIcon(type: Notification["type"]): keyof typeof Feather.glyphMap {
  switch (type) {
    case "like":
      return "heart";
    case "comment":
      return "message-circle";
    case "follow":
      return "user-plus";
    case "mention":
      return "at-sign";
    default:
      return "bell";
  }
}

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const { theme } = useTheme();
  const iconName = getNotificationIcon(notification.type);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: notification.isRead
            ? "transparent"
            : theme.backgroundSecondary,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View style={styles.avatarContainer}>
        <Avatar name={notification.user.displayName} size={44} />
        <View style={[styles.iconBadge, { backgroundColor: theme.primary }]}>
          <Feather name={iconName} size={12} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.content}>
        <ThemedText style={styles.text}>
          <ThemedText style={styles.username}>
            {notification.user.displayName}
          </ThemedText>{" "}
          {notification.message}
        </ThemedText>
        <ThemedText style={[styles.time, { color: theme.textSecondary }]}>
          {formatTimeAgo(notification.createdAt)}
        </ThemedText>
      </View>

      {notification.videoId && (
        <View style={[styles.thumbnail, { backgroundColor: theme.backgroundTertiary }]}>
          <Feather name="play" size={16} color={theme.textSecondary} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.md,
  },
  avatarContainer: {
    position: "relative",
  },
  iconBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
  },
  content: {
    flex: 1,
    gap: Spacing.xs,
  },
  text: {
    fontSize: 14,
  },
  username: {
    fontWeight: "700",
  },
  time: {
    fontSize: 12,
  },
  thumbnail: {
    width: 44,
    height: 56,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
