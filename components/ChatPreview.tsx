import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Avatar } from "@/components/Avatar";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Chat, formatTimeAgo } from "@/data/mockData";

interface ChatPreviewProps {
  chat: Chat;
  onPress?: () => void;
}

export function ChatPreview({ chat, onPress }: ChatPreviewProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed ? theme.backgroundSecondary : "transparent",
        },
      ]}
    >
      <Avatar name={chat.participant.displayName} size={50} />

      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText style={styles.name} numberOfLines={1}>
            {chat.participant.displayName}
          </ThemedText>
          <ThemedText style={[styles.time, { color: theme.textSecondary }]}>
            {formatTimeAgo(chat.lastMessageTime)}
          </ThemedText>
        </View>

        <View style={styles.messageRow}>
          <ThemedText
            style={[
              styles.message,
              {
                color: chat.unreadCount > 0 ? theme.text : theme.textSecondary,
                fontWeight: chat.unreadCount > 0 ? "600" : "400",
              },
            ]}
            numberOfLines={1}
          >
            {chat.lastMessage}
          </ThemedText>

          {chat.unreadCount > 0 && (
            <View style={[styles.badge, { backgroundColor: theme.primary }]}>
              <ThemedText style={styles.badgeText}>{chat.unreadCount}</ThemedText>
            </View>
          )}
        </View>
      </View>
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
  content: {
    flex: 1,
    gap: Spacing.xs,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  time: {
    fontSize: 12,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  message: {
    fontSize: 14,
    flex: 1,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xs,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
