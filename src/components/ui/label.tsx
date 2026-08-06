import { Platform, Text, View, type TextProps } from "react-native";
import { cn } from "@/lib/utils";

function Label({
  className,
  htmlFor,
  ...props
}: TextProps & {
  htmlFor?: string;
}) {
  return (
    <View
      className={cn(
        "flex select-none flex-row items-center gap-2",
        Platform.select({
          web: "cursor-default leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        }),
      )}
    >
      <Text
        className={cn(
          "text-foreground text-sm font-medium",
          Platform.select({ web: "leading-none" }),
          className,
        )}
        {...props}
      />
    </View>
  );
}

export { Label };
