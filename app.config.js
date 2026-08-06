import "dotenv/config";

export default {
  expo: {
    name: "native-template",
    slug: "native-template",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    scheme: "nativetemplate",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.nativetemp.app",
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./src/assets/images/android-icon-foreground.png",
        backgroundImage: "./src/assets/images/android-icon-background.png",
        monochromeImage: "./src/assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.nativetemp.app",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./src/assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-localization",
      "expo-font",
      "expo-image",
      "expo-status-bar",
      "expo-updates",
      "@sentry/react-native",
      "expo-web-browser",
      "expo-dev-client",
      [
        "@sentry/react-native/expo",
        {
          url: "https://sentry.io/",
          project: process.env.SENTRY_PROJECT,
          organization: process.env.SENTRY_ORG,
        },
      ],
      [
        "expo-splash-screen",
        {
          image: "./src/assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",

          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    extra: {
      internal: {
        env: process.env.NODE_ENV,
        encryptionKey: process.env.ENCRYPTION_KEY,
        databaseName: process.env.DATABASE_NAME,
        sentryAuthToken: process.env.SENTRY_AUTH_TOKEN,
        sentryAuthUrl: process.env.SENTRY_AUTH_URL,
        baseApiUrl: process.env.BASE_API_URL,
      },
      eas: {
        projectId: process.env.PROJECT_ID,
      },
    },
    updates: {
      url: `https://u.expo.dev/${process.env.PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  },
};
