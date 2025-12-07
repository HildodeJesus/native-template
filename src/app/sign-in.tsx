import { Animated, View } from "react-native";
import { useKeyboardAnimation } from "react-native-keyboard-controller";
import { SignInForm } from "@/components/sign-in-form";

export default function SiginIn() {
  const { height } = useKeyboardAnimation();

  return (
    <View className="w-screen h-screen flex justify-center items-center">
      <View className="flex-row">
        <Animated.View
          style={{
            transform: [{ translateY: height }],
          }}
        >
          <SignInForm />
        </Animated.View>
      </View>
    </View>
  );
}
