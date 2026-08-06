import { ThemeProvider as NativeThemeProvider } from "@react-navigation/native";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { Uniwind } from "uniwind";
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
  const systemTheme = Appearance.getColorScheme() ?? "light";

  const [theme, setThemeState] = useState<ThemeMode>(systemTheme === "dark" ? "dark" : "light");
  const colors = THEME[theme];

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    Uniwind.setTheme(newTheme);
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        const nextTheme = colorScheme as ThemeMode;
        setThemeState(nextTheme);
        Uniwind.setTheme(nextTheme);
      }
    });
    return () => subscription.remove();
  }, []);

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
