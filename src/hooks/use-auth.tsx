// src/context/AuthContext.tsx
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { Toast } from "toastify-react-native";
import { fakeSignIn, fakeSignOut } from "../lib/fakeAuth";
import {authStorage} from "../lib/storage";
import type {IUser} from "../types/user";

type AuthState = {
  user: IUser | null;
  token: string | null;
  loading: boolean;
};

type AuthContextValue = AuthState & {
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; message?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // Start as loading=true so consumers/layouts don't try to navigate before
  // the auth state has been restored from storage and the navigation tree is mounted.
  const [loading, setLoading] = useState<boolean>(true);

  // Restore saved auth state once on mount.
  // We intentionally do not include `token` or `user` in the deps because
  // we want to use the values read from storage rather than stale closure values.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const savedToken = authStorage.get("token");
        const savedUser = authStorage.get("user");

        // Use the freshly read values instead of stale closure values.
        setToken(savedToken ?? null);
        setUser(savedUser ?? null);
      } catch (err) {
        console.error("Failed to load auth", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = async (
    email: string,
    password: string,
  ): Promise<{
    ok: boolean;
    message?: string;
  }> => {
    const res = await fakeSignIn(email, password);
    if (!res.ok) return { ok: false, message: res.message || "Erro" };

    if (!res.data) {
      Toast.error("Não foi possível logar. Tente novamente");

      return {
        ok: false,
        message: "Não foi possível logar. Tente novamente",
      };
    }

    const { token, user } = res.data;
    setUser(user);
    setToken(token);

    // Persist both user and token so future app launches restore auth state.
    authStorage.set("user", user);
    authStorage.set("token", token);

    return { ok: true };
  };

  const signOut = async () => {
    await fakeSignOut();
    setToken(null);
    setUser(null);
    authStorage.remove("token");
    authStorage.remove("user");
  };

  return (
    <AuthContext.Provider value={{ loading, token, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
