import { Check, ChevronDown } from "lucide-react-native";
import * as React from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  type GestureResponderEvent,
  type PressableProps,
  type TextProps,
  type TouchableOpacityProps,
  type ViewProps,
} from "react-native";
import { Icon } from "@/components/ui/icon";
import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

type SelectContextValue = {
  value: Option | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  onValueChange: (option: Option) => void;
  disabled?: boolean;
};

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select compound components must be used inside a <Select />");
  }
  return context;
}

type SelectProps = {
  value?: Option | null;
  defaultValue?: Option | null;
  onValueChange?: (option: Option | null) => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

function Select({ value, defaultValue, onValueChange, disabled, children }: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<Option | null>(defaultValue ?? null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = (option: Option) => {
    if (!isControlled) {
      setInternalValue(option);
    }
    onValueChange?.(option);
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        open,
        setOpen,
        onValueChange: handleValueChange,
        disabled,
      }}
    >
      <View>{children}</View>
    </SelectContext.Provider>
  );
}

type SelectTriggerProps = Omit<PressableProps, "children"> &
  React.RefAttributes<View> & {
    children?: React.ReactNode;
    size?: "default" | "sm";
  };

function SelectTrigger({ className, children, size = "default", ...props }: SelectTriggerProps) {
  const { open, setOpen, disabled } = useSelectContext();
  return (
    <Pressable
      ref={props.ref}
      onPress={() => setOpen(!open)}
      disabled={disabled}
      className={cn(
        "border-input dark:bg-input/30 dark:active:bg-input/50 bg-background flex h-10 flex-row items-center justify-between gap-2 rounded-md border px-3 py-2 shadow-sm shadow-black/5 sm:h-9",
        Platform.select({
          web: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-input/50 w-fit whitespace-nowrap text-sm outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
        }),
        disabled && "opacity-50",
        size === "sm" && "h-8 py-2 sm:py-1.5",
        className,
      )}
      {...props}
    >
      {children}
      <Icon as={ChevronDown} aria-hidden={true} className="text-muted-foreground size-4" />
    </Pressable>
  );
}

type SelectValueProps = TextProps & {
  placeholder?: string;
};

function SelectValue({ className, placeholder }: SelectValueProps) {
  const { value } = useSelectContext();
  return (
    <Text
      className={cn(
        "text-foreground line-clamp-1 text-sm",
        !value && "text-muted-foreground",
        className,
      )}
    >
      {value?.label ?? placeholder ?? ""}
    </Text>
  );
}

function SelectContent({ className, children }: ViewProps & { className?: string }) {
  const { open, setOpen } = useSelectContext();
  if (!open) {
    return null;
  }

  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
      <TextClassContext.Provider value="text-popover-foreground">
        <Pressable
          className="flex-1 items-center justify-center bg-black/50 px-6"
          onPress={() => setOpen(false)}
        >
          <View
            className={cn(
              "bg-popover border-border w-full max-w-xs rounded-md border p-1 shadow-md shadow-black/5",
              className,
            )}
          >
            <ScrollView>{children}</ScrollView>
          </View>
        </Pressable>
      </TextClassContext.Provider>
    </Modal>
  );
}

function SelectGroup({ children }: { children?: React.ReactNode }) {
  return <View className="gap-1">{children}</View>;
}

type SelectLabelProps = TextProps & {
  children?: React.ReactNode;
};

function SelectLabel({ className, children }: SelectLabelProps) {
  return (
    <Text className={cn("text-muted-foreground px-2 py-2 text-xs sm:py-1.5", className)}>
      {children}
    </Text>
  );
}

type SelectItemProps = Omit<TouchableOpacityProps, "children"> &
  React.RefAttributes<View> & {
    value: string;
    label: string;
    children?: React.ReactNode;
  };

function SelectItem({
  className,
  value,
  label,
  children,
  onPress,
  ...props
}: SelectItemProps) {
  const { value: selected, onValueChange } = useSelectContext();
  const isSelected = selected?.value === value;

  return (
    <TouchableOpacity
      ref={props.ref}
      activeOpacity={0.7}
      onPress={(event: GestureResponderEvent) => {
        onValueChange({ value, label });
        onPress?.(event);
      }}
      className={cn(
        "active:bg-accent group relative flex w-full flex-row items-center gap-2 rounded-sm py-2 pl-2 pr-8 sm:py-1.5",
        Platform.select({
          web: "focus:bg-accent focus:text-accent-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 cursor-default outline-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none",
        }),
        props.disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      <View className="absolute right-2 flex size-3.5 items-center justify-center">
        {isSelected && <Icon as={Check} className="text-muted-foreground size-4 shrink-0" />}
      </View>
      <Text className="text-foreground group-active:text-accent-foreground select-none text-sm">
        {children ?? label}
      </Text>
    </TouchableOpacity>
  );
}

function SelectSeparator({ className }: ViewProps & { className?: string }) {
  return (
    <View
      className={cn(
        "bg-border -mx-1 my-1 h-px",
        Platform.select({ web: "pointer-events-none" }),
        className,
      )}
    />
  );
}

/**
 * @platform Web only
 * Returns null on native platforms
 */
function SelectScrollUpButton() {
  return null;
}

/**
 * @platform Web only
 * Returns null on native platforms
 */
function SelectScrollDownButton() {
  return null;
}

/**
 * @platform Native only
 * Returns the children on the web
 */
function NativeSelectScrollView({ className, children }: React.ComponentProps<typeof ScrollView>) {
  if (Platform.OS === "web") {
    return <>{children}</>;
  }
  return <ScrollView className={cn("max-h-52", className)}>{children}</ScrollView>;
}

export {
  NativeSelectScrollView,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
};
