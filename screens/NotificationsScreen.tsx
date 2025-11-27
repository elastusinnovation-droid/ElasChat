import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { NotificationItem } from "@/components/NotificationItem";
import { useTheme } from "@/hooks/useTheme";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { Spacing } from "@/constants/theme";
import { mockNotifications, Notification } from "@/data/mockData";

export default function NotificationsScreen() {
  const { theme } = useTheme();
  const { paddingTop, paddingBottom } = useScreenInsets();

  const renderNotification = ({ item }: { item: Notification }) => (
    <NotificationItem notification={item} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <ThemedText style={[styles.emptyText, { color: theme.textSecondary }]}>
        No notifications yet
      </ThemedText>
    </View>
  );

  const renderSectionHeader = () => (
    <View style={styles.sectionHeader}>
      <ThemedText type="label" style={[styles.sectionTitle, { color: theme.textSecondary }]}>
        Recent
      </ThemedText>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={mockNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderSectionHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop, paddingBottom },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
  },
  sectionTitle: {
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  emptyText: {
    fontSize: 14,
  },
});
