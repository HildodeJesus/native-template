import type React from "react";
import { forwardRef } from "react";
import { Platform, TextInput, type TextInputProps, View } from "react-native";
import { cn } from "@/lib/utils";

interface InputProps extends TextInputProps {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ className, startContent, endContent, ...props }, ref) => {
    return (
      <View
        className={cn(
          "border-input bg-background text-foreground flex h-12 w-full min-w-0 flex-row items-center rounded-md border px-3 py-1 shadow-sm shadow-black/5",
          props.editable === false &&
            cn(
              "opacity-50",
              Platform.select({
                web: "disabled:pointer-events-none disabled:cursor-not-allowed",
              }),
            ),
          Platform.select({
            web: cn(
              "transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
            ),
          }),
          className,
        )}
      >
        {startContent && <View className="mr-2">{startContent}</View>}

        <TextInput
          ref={ref}
          {...props}
          className={cn(
            "flex-1 text-base leading-5 text-foreground",
            Platform.select({
              web: "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground outline-none md:text-sm",
              native: "placeholder:text-muted-foreground/50",
            }),
          )}
        />

        {endContent && <View className="ml-2">{endContent}</View>}
      </View>
    );
  },
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
