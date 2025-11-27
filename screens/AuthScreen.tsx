import React, { useState } from "react";
import { View, StyleSheet, TextInput, Image, Pressable, Alert, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import Spacer from "@/components/Spacer";

export default function AuthScreen() {
  const { theme, isDark } = useTheme();
  const { login, signup } = useAuth();
  const insets = useSafeAreaInsets();
  
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (!isLogin && (!username.trim() || !displayName.trim())) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, username, displayName);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
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
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot, paddingTop: insets.top }]}>
      <ScreenKeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText type="h2" style={[styles.title, { color: theme.primary }]}>
            ElasChat
          </ThemedText>
          <ThemedText type="body" style={[styles.subtitle, { color: theme.textSecondary }]}>
            Make short videos, share stories, and discover local creators.
          </ThemedText>
        </View>

        <Spacer height={Spacing["3xl"]} />

        {!isLogin && (
          <>
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
          </>
        )}

        <View style={styles.fieldContainer}>
          <ThemedText type="label" style={[styles.label, { color: theme.textSecondary }]}>
            Email
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={email}
            onChangeText={setEmail}
            placeholder="your.email@example.com"
            placeholderTextColor={theme.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <Spacer height={Spacing.md} />

        <View style={styles.fieldContainer}>
          <ThemedText type="label" style={[styles.label, { color: theme.textSecondary }]}>
            Password
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <Spacer height={Spacing["2xl"]} />

        <Button onPress={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : isLogin ? (
            "Log In"
          ) : (
            "Sign Up"
          )}
        </Button>

        <Spacer height={Spacing.lg} />

        <Pressable
          onPress={() => setIsLogin(!isLogin)}
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <ThemedText style={styles.switchText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <ThemedText style={[styles.switchLink, { color: theme.primary }]}>
              {isLogin ? "Sign Up" : "Log In"}
            </ThemedText>
          </ThemedText>
        </Pressable>

        <Spacer height={Spacing["3xl"]} />

        <ThemedText type="caption" style={[styles.terms, { color: theme.textSecondary }]}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </ThemedText>
      </ScreenKeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  title: {
    marginTop: Spacing.lg,
  },
  subtitle: {
    marginTop: Spacing.sm,
    textAlign: "center",
    paddingHorizontal: Spacing.xl,
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
  switchText: {
    textAlign: "center",
  },
  switchLink: {
    fontWeight: "600",
  },
  terms: {
    textAlign: "center",
    paddingHorizontal: Spacing.xl,
  },
});
