import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { Avatar } from "@/components/Avatar";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import Spacer from "@/components/Spacer";

export default function EditProfileScreen() {
  const { theme } = useTheme();
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!displayName.trim() || !username.trim()) {
      Alert.alert("Error", "Display name and username are required");
      return;
    }

    setIsSaving(true);
    try {
      await updateUser({
        displayName: displayName.trim(),
        username: username.trim().toLowerCase().replace(/[^a-z0-9_]/g, ""),
        bio: bio.trim(),
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const inputStyle = [
    styles.input,
    {
      backgroundColor: theme.backgroundSecondary,
      color: theme.text,
    },
  ];

  return (
    <ScreenKeyboardAwareScrollView>
      <View style={styles.avatarSection}>
        <Avatar name={displayName || "User"} size={100} />
        <ThemedText type="link" style={styles.changePhoto}>
          Change Photo
        </ThemedText>
      </View>

      <Spacer height={Spacing["2xl"]} />

      <View style={styles.fieldContainer}>
        <ThemedText type="label" style={[styles.label, { color: theme.textSecondary }]}>
          Display Name
        </ThemedText>
        <TextInput
          style={inputStyle}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Your name"
          placeholderTextColor={theme.textSecondary}
          autoCapitalize="words"
        />
      </View>

      <Spacer height={Spacing.md} />

      <View style={styles.fieldContainer}>
        <ThemedText type="label" style={[styles.label, { color: theme.textSecondary }]}>
          Username
        </ThemedText>
        <TextInput
          style={inputStyle}
          value={username}
          onChangeText={setUsername}
          placeholder="username"
          placeholderTextColor={theme.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <Spacer height={Spacing.md} />

      <View style={styles.fieldContainer}>
        <ThemedText type="label" style={[styles.label, { color: theme.textSecondary }]}>
          Bio
        </ThemedText>
        <TextInput
          style={[inputStyle, styles.bioInput]}
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself"
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={4}
          maxLength={150}
          textAlignVertical="top"
        />
        <ThemedText type="caption" style={[styles.charCount, { color: theme.textSecondary }]}>
          {bio.length}/150
        </ThemedText>
      </View>

      <Spacer height={Spacing["2xl"]} />

      <Button onPress={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </ScreenKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  avatarSection: {
    alignItems: "center",
    gap: Spacing.md,
  },
  changePhoto: {
    fontWeight: "600",
  },
  fieldContainer: {
    width: "100%",
  },
  label: {
    marginBottom: Spacing.sm,
  },
  input: {
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.lg,
    fontSize: Typography.body.fontSize,
  },
  bioInput: {
    height: 100,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  charCount: {
    alignSelf: "flex-end",
    marginTop: Spacing.xs,
  },
});
