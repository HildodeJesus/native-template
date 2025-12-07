import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/hooks/use-auth";

export default function AuthLayout() {
  const { token, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Defer navigation slightly so the root navigator has time to mount.
    if (!user || !token) {
      const t = setTimeout(() => {
        try {
          // use replace so the auth layout doesn't remain in the history stack
          router.replace("/sign-in");
        } catch (err) {
          // If navigation isn't ready yet, log and ignore — the user will
          // still see the sign-in screen because of the app's stack configuration.
          console.warn("Navigation deferred: ", err);
        }
      }, 50);

      return () => clearTimeout(t);
    }
  }, [loading, user, token, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Slot />;
}
