import type { ReactNode, Ref } from "react";
import { View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useTheme } from "@/hooks/use-theme";

export type SheetModalProps = {
  children?: ReactNode;
  height: number;
  openDuration?: number;
  closeDuration?: number;
  onClose?: () => void;
  onOpen?: () => void;
  /* biome-ignore lint/suspicious/noExplicitAny: Pode ser any */
  rbSheetRef: Ref<any>;
};

export function SheetModal({
  onOpen,
  openDuration,
  height,
  closeDuration,
  onClose,
  children,
  rbSheetRef,
}: SheetModalProps) {
  const { colors } = useTheme();

  return (
    <RBSheet
      ref={rbSheetRef}
      height={height}
      openDuration={openDuration ?? 300}
      onClose={onClose}
      onOpen={onOpen}
      closeDuration={closeDuration ?? 300}
      customStyles={{
        container: {
          backgroundColor: colors.background,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          paddingBottom: 15,
        },
        draggableIcon: {
          backgroundColor: colors.mutedForeground,
          width: 60,
        },
      }}
    >
      <View className="w-full flex-1 relative">{children}</View>
    </RBSheet>
  );
}