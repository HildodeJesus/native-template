import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import ToastManager from "toastify-react-native";

import "../global.css";

import * as Sentry from "@sentry/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageLoading } from "@/components/page-loading";
import { AuthProvider } from "@/hooks/use-auth";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemeProvider } from "@/hooks/use-theme";
import { initI18n } from "@/i18n";
import { NAV_THEME } from "@/lib/theme";
import AppConfig from "../../app.config";

Sentry.init({
  // dsn: "https://4e0dda05975ecfc761adbad1f6a8d00d@o4509469884678144.ingest.us.sentry.io/4509469891559424",
  dsn: AppConfig.expo.extra.internal.sentryAuthUrl,

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

function RootLayout() {
  const [ready, setReady] = useState(false);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60,
          },
        },
      }),
  );
  const colorScheme = useColorScheme();
  const themeName = colorScheme === "light" ? "light" : "dark";

  useEffect(() => {
    initI18n().then(() => setReady(true));
  }, []);

  return ready ? (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <KeyboardProvider>
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: NAV_THEME[themeName].colors.background,
              }}
            >
              <Slot />
            </SafeAreaView>
            <ToastManager />
            <StatusBar style="auto" />
          </KeyboardProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  ) : (
    <PageLoading />
  );
}

export default Sentry.wrap(RootLayout);
