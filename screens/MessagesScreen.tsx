import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { SearchBar } from "@/components/SearchBar";
import { ChatPreview } from "@/components/ChatPreview";
import { useTheme } from "@/hooks/useTheme";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { Spacing } from "@/constants/theme";
import { mockChats, Chat } from "@/data/mockData";
import type { MessagesStackParamList } from "@/navigation/MessagesStackNavigator";

type NavigationProp = NativeStackNavigationProp<MessagesStackParamList>;

export default function MessagesScreen() {
  const { theme } = useTheme();
  const { paddingTop, paddingBottom } = useScreenInsets();
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = searchQuery
    ? mockChats.filter((chat) =>
        chat.participant.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockChats;

  const handleChatPress = (chat: Chat) => {
    navigation.navigate("Chat", {
      chatId: chat.id,
      userName: chat.participant.displayName,
    });
  };

  const renderChat = ({ item }: { item: Chat }) => (
    <ChatPreview chat={item} onPress={() => handleChatPress(item)} />
  );

  const renderHeader = () => (
    <View style={styles.searchContainer}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search messages"
      />
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <ThemedText style={[styles.emptyText, { color: theme.textSecondary }]}>
        No messages yet
      </ThemedText>
      <ThemedText style={[styles.emptySubtext, { color: theme.textSecondary }]}>
        Start a conversation with someone!
      </ThemedText>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={filteredChats}
        renderItem={renderChat}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
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
  searchContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
  },
});
