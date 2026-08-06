import { Feather } from "@expo/vector-icons";
import { type ReactNode, useRef } from "react";
import { Pressable } from "react-native";
import { SheetModal } from "@/components/sheet-modal";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { colorsInHex } from "@/utils/theme";

type BottomSheetModalProps = {
  children?: ReactNode | ((props: { close: () => void }) => ReactNode);
  trigger: ReactNode;
  height: number;
  openDuration?: number;
  closeDuration?: number;
  onClose?: () => void;
  onOpen?: () => void;
};

export function BottomSheetModal({
  children,
  height,
  trigger,
  closeDuration,
  onClose,
  onOpen,
  openDuration,
}: BottomSheetModalProps) {
  /* biome-ignore lint/suspicious/noExplicitAny: Pode ser any */
  const rbSheetRef = useRef<any>(null);
  const { theme } = useTheme()
  const colors = colorsInHex[theme]

  const openSheet = () => {
    rbSheetRef.current?.open();
  };

  const closeSheet = () => {
    rbSheetRef.current?.close();
  };

  return (
    <>
      <Button variant={"ghost"} size={"sm"} onPress={openSheet} className="p-2">
        {trigger}
      </Button>
      <SheetModal
        height={height}
        rbSheetRef={rbSheetRef}
        onClose={onClose}
        onOpen={onOpen}
        closeDuration={closeDuration}
        openDuration={openDuration}
      >
        {typeof children === "function" ? children({ close: closeSheet }) : children}
        <Pressable onPress={closeSheet} className="absolute right-4 top-4">
          <Feather name="x" size={20} color={colors.foreground}/>
        </Pressable>
      </SheetModal>
    </>
  );
}
