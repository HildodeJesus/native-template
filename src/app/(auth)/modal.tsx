import { Link } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ModalScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center p-5 bg-background">
      <ThemedText type="title" className="text-2xl font-semibold text-foreground">
        This is a modal
      </ThemedText>

      <Link href="/" dismissTo className="mt-4 py-3">
        <ThemedText type="link" className="text-primary font-medium">
          Go to home screen
        </ThemedText>
      </Link>
    </ThemedView>
  );
}
