import { Image } from "expo-image";
import { Link } from "expo-router";
import { Platform, View } from "react-native";
import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useLocaleSwitcher } from "@/hooks/use-locale-switcher";
import { useTranslation } from "@/hooks/use-translation";
import { Languages } from "@/locales";

export default function HomeScreen() {
  const { currentLanguage, setLanguage } = useLocaleSwitcher();
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          className="absolute bottom-0 left-0 h-[178px] w-[290px]"
        />
      }
    >
      {/* Título */}
      <ThemedView className="flex-row items-center justify-between gap-2">
        <View>
          <ThemedText type="title">
            {t("dashboard.welcome", { name: user?.name ?? "" })}!
          </ThemedText>
          <HelloWave />
        </View>
        <Select
          onValueChange={(e) => setLanguage(e?.value as Languages)}
          value={{ value: currentLanguage, label: currentLanguage.toUpperCase() }}
        >
          <SelectTrigger>
            <SelectValue placeholder={"selecione a liguagem"} />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Languages).map((language) => (
              <SelectItem key={language} value={language} label={language.toUpperCase()} />
            ))}
          </SelectContent>
        </Select>
      </ThemedView>

      {/* Step 1 */}
      <ThemedView className="gap-2 mb-2">
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>

      {/* Step 2 */}
      <ThemedView className="gap-2 mb-2">
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert("Action pressed")} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert("Share pressed")}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert("Delete pressed")}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>

      {/* Step 3 */}
      <ThemedView className="gap-2 mb-2">
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}
