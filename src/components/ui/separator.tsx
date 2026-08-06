import type React from "react";
import { View, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: ViewProps &
  React.RefAttributes<View> & {
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
  }) {
  return (
    <View
      className={cn(
        "bg-border shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      role={decorative ? "none" : "separator"}
      {...props}
    />
  );
}

export { Separator };
