import type { IUser } from "@/types/user";

const FAKE_USERS: IUser[] = [
  { name: "Hildon", email: "hildon@example.com", password: "123123" },
  { name: "Guest", email: "guest@example.com", password: "123123" },
];

// Simula uma chamada de backend com delay
export async function fakeSignIn(email: string, password: string) {
  await new Promise((r) => setTimeout(r, 700)); // delay 700ms

  // regra simples: qualquer senha "1234" passa
  const user = FAKE_USERS.find((u) => u.email === email);
  if (!user || password !== "1234") {
    return { ok: false, status: 401, message: "Credenciais inválidas" };
  }

  // retorna "token" fake e user
  return {
    ok: true,
    data: {
      token: `fake-token-${user.name}-${Date.now()}`,
      user,
    },
  };
}

export async function fakeSignOut() {
  await new Promise((r) => setTimeout(r, 200));
  return { ok: true };
}
