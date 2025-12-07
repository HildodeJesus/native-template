import { ActivityIndicator, View } from "react-native";
import { Text } from "@/components/ui/text";

export function PageLoading({ description }: { description?: string }) {
  return (
    <View className="w-full h-full flex-1 justify-center items-center space-y-4">
      <ActivityIndicator />
      {description && <Text>{description}</Text>}
    </View>
  );
}
