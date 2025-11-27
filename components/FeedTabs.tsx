import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

interface FeedTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
}

export function FeedTabs({ activeTab, onTabChange, tabs }: FeedTabsProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <Pressable
            key={tab}
            onPress={() => onTabChange(tab)}
            style={({ pressed }) => [
              styles.tab,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <ThemedText
              style={[
                styles.tabText,
                {
                  color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                  fontWeight: isActive ? "700" : "400",
                },
              ]}
            >
              {tab}
            </ThemedText>
            {isActive && (
              <View style={[styles.indicator, { backgroundColor: "#FFFFFF" }]} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.xl,
  },
  tab: {
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
  tabText: {
    fontSize: 16,
  },
  indicator: {
    marginTop: Spacing.xs,
    width: 24,
    height: 2,
    borderRadius: 1,
  },
});
