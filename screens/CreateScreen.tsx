import React, { useState } from "react";
import { View, StyleSheet, Pressable, Platform, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { ThemedText } from "@/components/ThemedText";
import { IconButton } from "@/components/IconButton";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Colors } from "@/constants/theme";

export default function CreateScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isRecording, setIsRecording] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [frontCamera, setFrontCamera] = useState(true);

  const handleRecordPress = () => {
    setIsRecording(!isRecording);
  };

  const handleGalleryPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      Alert.alert("Video Selected", "Video editing would be available here in a full implementation.");
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const showWebMessage = Platform.OS === "web";

  return (
    <View style={[styles.container, { backgroundColor: "#000" }]}>
      <View style={[styles.cameraArea, { backgroundColor: theme.backgroundSecondary }]}>
        {showWebMessage ? (
          <View style={styles.webMessage}>
            <Feather name="video" size={48} color={theme.textSecondary} />
            <ThemedText style={[styles.webText, { color: theme.textSecondary }]}>
              Camera recording is available in Expo Go
            </ThemedText>
            <ThemedText style={[styles.webSubtext, { color: theme.textSecondary }]}>
              Scan the QR code to test on your device
            </ThemedText>
          </View>
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Feather name="video" size={64} color="rgba(255,255,255,0.3)" />
          </View>
        )}
      </View>

      <View style={[styles.topControls, { paddingTop: insets.top + Spacing.md }]}>
        <IconButton name="x" size={28} color="#FFFFFF" onPress={handleClose} />

        <View style={styles.topRight}>
          <IconButton
            name={flashOn ? "zap" : "zap-off"}
            size={24}
            color="#FFFFFF"
            onPress={() => setFlashOn(!flashOn)}
          />
          <IconButton
            name="refresh-cw"
            size={24}
            color="#FFFFFF"
            onPress={() => setFrontCamera(!frontCamera)}
          />
          <IconButton name="clock" size={24} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.rightControls}>
        <View style={styles.controlItem}>
          <IconButton name="sliders" size={24} color="#FFFFFF" />
          <ThemedText style={styles.controlLabel}>Filters</ThemedText>
        </View>
        <View style={styles.controlItem}>
          <IconButton name="activity" size={24} color="#FFFFFF" />
          <ThemedText style={styles.controlLabel}>Speed</ThemedText>
        </View>
        <View style={styles.controlItem}>
          <IconButton name="smile" size={24} color="#FFFFFF" />
          <ThemedText style={styles.controlLabel}>Effects</ThemedText>
        </View>
      </View>

      <View style={[styles.bottomControls, { paddingBottom: insets.bottom + Spacing.xl }]}>
        <View style={styles.bottomLeft}>
          <Pressable
            onPress={handleGalleryPress}
            style={({ pressed }) => [
              styles.galleryButton,
              {
                backgroundColor: theme.backgroundTertiary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Feather name="image" size={24} color="#FFFFFF" />
          </Pressable>
          <ThemedText style={styles.controlLabel}>Upload</ThemedText>
        </View>

        <Pressable
          onPress={handleRecordPress}
          style={({ pressed }) => [
            styles.recordButton,
            {
              backgroundColor: isRecording ? Colors.dark.accent : Colors.dark.accent,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            },
          ]}
        >
          <View
            style={[
              styles.recordInner,
              {
                borderRadius: isRecording ? 8 : 30,
                backgroundColor: isRecording ? Colors.dark.accent : Colors.dark.accent,
              },
            ]}
          />
        </Pressable>

        <View style={styles.bottomRight}>
          <View style={styles.durationContainer}>
            <Feather name="music" size={24} color="#FFFFFF" />
          </View>
          <ThemedText style={styles.controlLabel}>Music</ThemedText>
        </View>
      </View>

      <View style={styles.durationSelector}>
        {["15s", "60s", "3m"].map((duration) => (
          <Pressable
            key={duration}
            style={({ pressed }) => [
              styles.durationOption,
              {
                backgroundColor: duration === "15s" ? "rgba(255,255,255,0.2)" : "transparent",
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <ThemedText style={styles.durationText}>{duration}</ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraArea: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  webMessage: {
    alignItems: "center",
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  webText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  webSubtext: {
    fontSize: 14,
    textAlign: "center",
  },
  topControls: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: Spacing.md,
  },
  topRight: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  rightControls: {
    position: "absolute",
    right: Spacing.md,
    top: "35%",
    alignItems: "center",
    gap: Spacing.lg,
  },
  controlItem: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  controlLabel: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "500",
  },
  bottomControls: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  bottomLeft: {
    alignItems: "center",
    gap: Spacing.xs,
    width: 60,
  },
  bottomRight: {
    alignItems: "center",
    gap: Spacing.xs,
    width: 60,
  },
  galleryButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  durationContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  recordButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  recordInner: {
    width: 56,
    height: 56,
  },
  durationSelector: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.md,
  },
  durationOption: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 16,
  },
  durationText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});
