import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { PortalHost } from "@rn-primitives/portal";
import ToastManager from "toastify-react-native";

import "../global.css";
import { useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../hooks/use-auth";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <KeyboardProvider>
          <SafeAreaView>
            <Slot />
          </SafeAreaView>
          <PortalHost />
          <ToastManager />
          <StatusBar style="auto" />
        </KeyboardProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
