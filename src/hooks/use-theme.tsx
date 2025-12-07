import { ThemeProvider as NativeThemeProvider, Theme } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { NAV_THEME, THEME } from "@/lib/theme";
import type { ThemeColors } from "@/types/theme";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "dark",
  setTheme: () => {},
  isDark: true,
  colors: THEME.dark,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { setColorScheme } = useColorScheme();
  const systemTheme = Appearance.getColorScheme() ?? "light";
  const colors = THEME[systemTheme];

  const [theme, setThemeState] = useState<ThemeMode>(systemTheme === "dark" ? "dark" : "light");

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    setColorScheme(newTheme);
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setThemeState(colorScheme as ThemeMode);
        setColorScheme(colorScheme);
      }
    });
    return () => subscription.remove();
  }, [setColorScheme]);

  return (
    <NativeThemeProvider value={NAV_THEME[theme]}>
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
          isDark: theme === "dark",
          colors: colors,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </NativeThemeProvider>
  );
};

export const useTheme = () => useContext(ThemeContext);
