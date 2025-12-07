import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { PortalHost } from "@rn-primitives/portal";
import ToastManager from "toastify-react-native";

import "../global.css";

import * as Sentry from "@sentry/react-native";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageLoading } from "@/components/page-loading";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/hooks/use-theme";
import { initI18n } from "@/i18n";
import { AppConfig } from "@/lib/config";

Sentry.init({
  dsn: AppConfig.sentryAuthUrl,
  sendDefaultPii: true,
});

function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setReady(true));
  }, []);

  return ready ? (
    <ThemeProvider>
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
  ) : (
    <PageLoading />
  );
}

export default Sentry.wrap(RootLayout);
