import React from "react";
import { View, StyleSheet, Pressable, Alert, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { Spacing, BorderRadius } from "@/constants/theme";

interface SettingsItemProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress?: () => void;
  destructive?: boolean;
  theme: any;
}

function SettingsItem({ icon, label, onPress, destructive, theme }: SettingsItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingsItem,
        {
          backgroundColor: pressed ? theme.backgroundSecondary : "transparent",
        },
      ]}
    >
      <Feather
        name={icon}
        size={22}
        color={destructive ? theme.accent : theme.text}
      />
      <ThemedText
        style={[
          styles.settingsLabel,
          { color: destructive ? theme.accent : theme.text },
        ]}
      >
        {label}
      </ThemedText>
      <Feather name="chevron-right" size={20} color={theme.textSecondary} />
    </Pressable>
  );
}

function SettingsSection({
  title,
  children,
  theme,
}: {
  title: string;
  children: React.ReactNode;
  theme: any;
}) {
  return (
    <View style={styles.section}>
      <ThemedText type="label" style={[styles.sectionTitle, { color: theme.textSecondary }]}>
        {title}
      </ThemedText>
      <View style={[styles.sectionContent, { backgroundColor: theme.backgroundDefault }]}>
        {children}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const { paddingTop, paddingBottom } = useScreenInsets();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{ paddingTop, paddingBottom }}
      showsVerticalScrollIndicator={false}
    >
      <SettingsSection title="Account" theme={theme}>
        <SettingsItem icon="mail" label="Email" theme={theme} />
        <SettingsItem icon="phone" label="Phone Number" theme={theme} />
        <SettingsItem icon="lock" label="Change Password" theme={theme} />
      </SettingsSection>

      <SettingsSection title="Privacy" theme={theme}>
        <SettingsItem icon="eye" label="Account Privacy" theme={theme} />
        <SettingsItem icon="message-circle" label="Who Can Message Me" theme={theme} />
        <SettingsItem icon="user-x" label="Blocked Accounts" theme={theme} />
      </SettingsSection>

      <SettingsSection title="Content" theme={theme}>
        <SettingsItem icon="download" label="Downloads" theme={theme} />
        <SettingsItem icon="bookmark" label="Saved Videos" theme={theme} />
      </SettingsSection>

      <SettingsSection title="Safety" theme={theme}>
        <SettingsItem icon="alert-circle" label="Report a Problem" theme={theme} />
        <SettingsItem icon="file-text" label="Community Guidelines" theme={theme} />
      </SettingsSection>

      <SettingsSection title="About" theme={theme}>
        <SettingsItem icon="info" label="Terms of Service" theme={theme} />
        <SettingsItem icon="shield" label="Privacy Policy" theme={theme} />
      </SettingsSection>

      <View style={styles.logoutSection}>
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logoutButton,
            {
              backgroundColor: pressed ? theme.backgroundSecondary : theme.backgroundDefault,
            },
          ]}
        >
          <ThemedText style={[styles.logoutText, { color: theme.accent }]}>
            Log Out
          </ThemedText>
        </Pressable>
      </View>

      <ThemedText type="caption" style={[styles.version, { color: theme.textSecondary }]}>
        ElasChat v1.0.0
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  sectionTitle: {
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  sectionContent: {
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.md,
  },
  settingsLabel: {
    flex: 1,
    fontSize: 16,
  },
  logoutSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  logoutButton: {
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
  },
  version: {
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
});
