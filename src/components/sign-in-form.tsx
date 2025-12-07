import { useRouter } from "expo-router";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, type TextInput, View } from "react-native";
import { SocialConnections } from "@/components/social-connections";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/hooks/use-translation";

type FormData = {
  email: string;
  password: string;
};

export function SignInForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  const onSubmit = handleSubmit(async ({ email, password }) => {
    console.log("Submitting form with:", { email });
    const res = await signIn(email, password); // agora passa os dados do form

    if (res.ok) {
      console.log("Successfully logged in");
      router.push("/(auth)/(tabs)");
    }

    console.log("Failed to log in:", res.message);
  });

  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Sign in to your app</CardTitle>
          <CardDescription className="text-center sm:text-left">
            {t("dashboard.welcome")}! Please sign in to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <View className="gap-6">
            {/* EMAIL */}
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    onSubmitEditing={onEmailSubmitEditing}
                    returnKeyType="next"
                    submitBehavior="submit"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />

              {errors.email && <Text className="text-red-500 text-xs">{errors.email.message}</Text>}
            </View>

            {/* PASSWORD */}
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                  onPress={() => {
                    // TODO: forgot password
                  }}
                >
                  <Text className="font-normal leading-4">Forgot your password?</Text>
                </Button>
              </View>

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                }}
                render={({ field }) => (
                  <Input
                    ref={passwordInputRef}
                    id="password"
                    secureTextEntry
                    returnKeyType="send"
                    onSubmitEditing={onSubmit}
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />

              {errors.password && (
                <Text className="text-red-500 text-xs">{errors.password.message}</Text>
              )}
            </View>

            <Button className="w-full" onPress={onSubmit}>
              <Text>Continue</Text>
            </Button>
          </View>

          <Text className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Pressable
              onPress={() => {
                // TODO: navigate sign up
              }}
            >
              <Text className="text-sm underline underline-offset-4">Sign up</Text>
            </Pressable>
          </Text>

          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="text-muted-foreground px-4 text-sm">or</Text>
            <Separator className="flex-1" />
          </View>

          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
