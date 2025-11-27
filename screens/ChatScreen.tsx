import React, { useState, useRef } from "react";
import { View, StyleSheet, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { mockMessages, Message } from "@/data/mockData";
import type { MessagesStackParamList } from "@/navigation/MessagesStackNavigator";

type ChatScreenRouteProp = RouteProp<MessagesStackParamList, "Chat">;

interface MessageBubbleProps {
  message: Message;
  isSent: boolean;
  theme: any;
}

function MessageBubble({ message, isSent, theme }: MessageBubbleProps) {
  return (
    <View
      style={[
        styles.messageBubble,
        isSent ? styles.sentBubble : styles.receivedBubble,
        {
          backgroundColor: isSent ? theme.primary : theme.backgroundSecondary,
        },
      ]}
    >
      <ThemedText
        style={[
          styles.messageText,
          { color: isSent ? "#FFFFFF" : theme.text },
        ]}
      >
        {message.text}
      </ThemedText>
    </View>
  );
}

export default function ChatScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const route = useRoute<ChatScreenRouteProp>();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState(mockMessages.filter(m => m.chatId === route.params.chatId));
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      chatId: route.params.chatId,
      fromUserId: "current",
      text: inputText.trim(),
      createdAt: new Date().toISOString(),
      isRead: true,
    };

    setMessages([...messages, newMessage]);
    setInputText("");
    
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble
      message={item}
      isSent={item.fromUserId === "current"}
      theme={theme}
    />
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.backgroundRoot,
            paddingBottom: insets.bottom + Spacing.sm,
            borderTopColor: theme.border,
          },
        ]}
      >
        <Pressable
          style={[styles.attachButton, { backgroundColor: theme.backgroundSecondary }]}
        >
          <Feather name="plus" size={20} color={theme.textSecondary} />
        </Pressable>

        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Message..."
          placeholderTextColor={theme.textSecondary}
          style={[
            styles.input,
            {
              backgroundColor: theme.backgroundSecondary,
              color: theme.text,
            },
          ]}
          multiline
          maxLength={500}
        />

        <Pressable
          onPress={handleSend}
          disabled={!inputText.trim()}
          style={({ pressed }) => [
            styles.sendButton,
            {
              backgroundColor: inputText.trim() ? theme.primary : theme.backgroundSecondary,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Feather
            name="send"
            size={18}
            color={inputText.trim() ? "#FFFFFF" : theme.textSecondary}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  sentBubble: {
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: Spacing.md,
    gap: Spacing.sm,
    borderTopWidth: 1,
  },
  attachButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 100,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 15,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
