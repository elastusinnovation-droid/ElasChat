import React, { useState } from "react";
import { View, StyleSheet, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { Avatar } from "@/components/Avatar";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing, BorderRadius } from "@/constants/theme";
import { mockComments, Comment, formatTimeAgo } from "@/data/mockData";
import type { HomeStackParamList } from "@/navigation/HomeStackNavigator";

type CommentsRouteProp = RouteProp<HomeStackParamList, "Comments">;

interface CommentItemProps {
  comment: Comment;
  theme: any;
}

function CommentItem({ comment, theme }: CommentItemProps) {
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [likesCount, setLikesCount] = useState(comment.likesCount);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <View style={styles.commentItem}>
      <Avatar name={comment.user.displayName} size={36} />

      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <ThemedText style={styles.commentUsername}>
            {comment.user.displayName}
          </ThemedText>
          <ThemedText style={[styles.commentTime, { color: theme.textSecondary }]}>
            {formatTimeAgo(comment.createdAt)}
          </ThemedText>
        </View>

        <ThemedText style={styles.commentText}>{comment.text}</ThemedText>

        <View style={styles.commentActions}>
          <Pressable
            onPress={handleLike}
            style={({ pressed }) => [
              styles.likeButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Feather
              name="heart"
              size={14}
              color={isLiked ? theme.accent : theme.textSecondary}
            />
            <ThemedText style={[styles.likeCount, { color: theme.textSecondary }]}>
              {likesCount}
            </ThemedText>
          </Pressable>

          <Pressable style={styles.replyButton}>
            <ThemedText style={[styles.replyText, { color: theme.textSecondary }]}>
              Reply
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function CommentsScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const route = useRoute<CommentsRouteProp>();
  const [inputText, setInputText] = useState("");
  const [comments, setComments] = useState(
    mockComments.filter((c) => c.videoId === route.params.videoId)
  );

  const handleSubmit = () => {
    if (!inputText.trim() || !user) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      videoId: route.params.videoId,
      userId: user.id,
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        followersCount: user.followersCount,
        followingCount: user.followingCount,
        postsCount: user.postsCount,
      },
      text: inputText.trim(),
      likesCount: 0,
      createdAt: new Date().toISOString(),
    };

    setComments([newComment, ...comments]);
    setInputText("");
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <CommentItem comment={item} theme={theme} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Feather name="message-circle" size={48} color={theme.textSecondary} />
      <ThemedText style={[styles.emptyText, { color: theme.textSecondary }]}>
        No comments yet
      </ThemedText>
      <ThemedText style={[styles.emptySubtext, { color: theme.textSecondary }]}>
        Be the first to comment!
      </ThemedText>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
        <Avatar name={user?.displayName || "User"} size={32} />

        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Add a comment..."
          placeholderTextColor={theme.textSecondary}
          style={[
            styles.input,
            {
              backgroundColor: theme.backgroundSecondary,
              color: theme.text,
            },
          ]}
          multiline
          maxLength={300}
        />

        <Pressable
          onPress={handleSubmit}
          disabled={!inputText.trim()}
          style={({ pressed }) => [
            styles.submitButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <ThemedText
            style={[
              styles.submitText,
              {
                color: inputText.trim() ? theme.primary : theme.textSecondary,
              },
            ]}
          >
            Post
          </ThemedText>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.md,
    flexGrow: 1,
  },
  commentItem: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  commentUsername: {
    fontWeight: "600",
    fontSize: 14,
  },
  commentTime: {
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  commentActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
    marginTop: Spacing.sm,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  likeCount: {
    fontSize: 12,
  },
  replyButton: {
    paddingVertical: Spacing.xs,
  },
  replyText: {
    fontSize: 12,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing["4xl"],
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
  },
  emptySubtext: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: Spacing.md,
    gap: Spacing.sm,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 80,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 14,
  },
  submitButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  submitText: {
    fontWeight: "700",
    fontSize: 14,
  },
});
