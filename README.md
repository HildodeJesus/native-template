# native-template — Template Expo (TypeScript + Expo Router)

Este repositório é um template pronto para começar apps com Expo, TypeScript e Expo Router. Ele já vem com algumas integrações úteis (NativeWind/Tailwind, i18n, WatermelonDB, MMKV, EAS-ready) e uma estrutura de pastas pensada para apps universais (Android, iOS e Web).

Abaixo você encontrará instruções rápidas de início, primeiros passos, descrição da estrutura de pastas e os principais comandos disponíveis neste template.

---

## Pré-requisitos

- Node.js (recomenda-se Node 18+)
- npm ou yarn (o projeto foi criado usando npm)
- Expo CLI / EAS CLI (para builds e publicação)
- Android Studio / Xcode para emular (opcional)

Observação: o script `android` no `package.json` usa `bunx` (se você usa Bun). Se não usa Bun, execute `npx expo run:android` diretamente.

---

## Instalação

1. Instale dependências:

```bash
npm install
# ou, se preferir yarn
# yarn install
```

2. Inicie o servidor Metro / Expo:

```bash
npm start
# ou iniciar cliente dev (dev client):
# npm run dev
```

3. Execute no emulador ou dispositivo:

```bash
# Android (pode exigir Bun para o script definido):
npm run android

# iOS (macOS):
npm run ios

# Web:
npm run web
```

Se algum comando falhar por causa do uso de `bunx`, tente `npx expo run:android` ou `npx expo run:ios`.

---

## Principais scripts (do `package.json`)

- `npm start` — inicia o Metro / Expo Dev Tools
- `npm run dev` — inicia com o dev client (útil para builds de desenvolvimento com EAS)
- `npm run android` — compila/instala no dispositivo/emulador Android
- `npm run ios` — compila/instala no simulador iOS
- `npm run web` — executa a versão web
- `npm run reset-project` — move o código de exemplo para `app-example` e cria uma pasta `app` vazia (útil para começar um novo projeto a partir do template)
- `npm run lint` — executa o linter (ESLint)
- `npm run build:dev` / `build:preview` / `build:prod` — scripts prontos para `eas build` com perfis já definidos
- `npm run submit:android` / `submit:ios` — envia a build mais recente com `eas submit`

---

## Primeiros passos (recomendado)

1. Rode `npm install` e `npm start`.
2. Abra `app/_layout.tsx` e entenda o ponto de entrada do Expo Router (layouts e navegação ficam aqui).
3. Edite ou crie rotas dentro da pasta `app/` (o sistema é file-based routing do Expo Router). Arquivos e subpastas se transformam em rotas automaticamente.
4. Para estilos rápidos, use classes Tailwind via NativeWind (config em `tailwind.config.js`).
5. Para traduções, veja `src/i18n.ts` e a pasta `src/locales/`.
6. Se planeja usar banco local, dê uma olhada em `src/database/` (models, migrations e schemas já presentes).

---

## Estrutura principal de pastas

- `app/` — rotas do Expo Router (ponto de entrada do app). Modifique aqui para alterar telas e navegação.
- `src/` — código-fonte principal
  - `components/` — componentes reutilizáveis e UI
  - `assets/` — imagens e recursos estáticos
  - `constants/` — constantes do app (tema, cores, etc.)
  - `database/` — configuração do WatermelonDB, modelos e migrations
  - `hooks/` — hooks customizados (autenticação, tema, etc.)
  - `lib/` — utilitários e configurações (ex.: `config.ts`, `fakeAuth.ts`)
  - `locales/` — arquivos de tradução (i18n)
  - `services/` — serviços locais ou integrações com APIs
  - `types/` — tipos TypeScript e declarações
- `android/`, `ios/` — projetos nativos gerados pelo Expo (quando aplicável)
- `scripts/` — scripts utilitários do repositório (`reset-project.js`)

Arquivos de configuração importantes:
- `package.json` — scripts e dependências
- `tsconfig.json` — configuração TypeScript
- `tailwind.config.js` — configuração do Tailwind / NativeWind
- `metro.config.js`, `babel.config.js` — configs do bundler/transpilador

---

## Integrações e funcionalidades incluídas

- Expo Router — roteamento baseado em arquivos para Expo
- TypeScript — tipagem estática
- NativeWind / Tailwind CSS para estilos declarativos
- WatermelonDB — banco local rápido e escalável (em `src/database/`)
- react-native-mmkv — armazenamento rápido local
- i18next + react-i18next — internacionalização (veja `src/i18n.ts` e `src/locales/`)
- EAS (Expo Application Services) — scripts prontos para build e submit

---

## Dicas úteis

- Se for publicar com EAS, instale e configure o `eas-cli` e faça login com sua conta Expo.
- Para testes rápidos em dispositivo físico, use o QR code do Expo Dev Tools (após `npm start`).
- No desenvolvimento Android/iOS nativo com `expo run:android`/`expo run:ios`, verifique se SDKs/NDKs e variáveis de ambiente do Android estão configuradas.
- O comando `npm run reset-project` é útil para começar com o template limpo — ele move o código exemplo para `app-example`.
- Para editar traduções, edite os arquivos dentro de `src/locales/{lang}/translation.json`.
- Caso precise trocar a configuração de ambiente, verifique arquivos que usam `dotenv` e `src/lib/config.ts`.

---

## Contribuição

Você pode usar este template como base para novos projetos — sinta-se à vontade para:

- Adaptar a estrutura de pastas conforme as necessidades do projeto
- Remover libs que não usa e ajustar `package.json`
- Atualizar o `tailwind.config.js` e `src/constants/theme.ts` para o seu sistema de design

---

## Comandos rápidos

Instalar dependências:

```bash
npm install
```

Iniciar desenvolvimento:

```bash
npm start
# ou (dev client):
npm run dev
```

Compilar e rodar em Android / iOS / Web:

```bash
npm run android
npm run ios
npm run web
```

Resetar o template (cria `app-example` e uma `app` vazia):

```bash
npm run reset-project
```

Builds e envio com EAS:

```bash
npm run build:dev
npm run build:preview
npm run build:prod
npm run submit:android
npm run submit:ios
```

---

Se quiser, posso também:
- Ajustar o README com comandos alternativos para quem não usa npm (yarn / pnpm / bun)
- Incluir passos detalhados para configurar EAS (conta, credenciais) ou Android Studio
- Gerar um checklist de onboarding para novos desenvolvedores

Se quiser que eu aplique alguma dessas opções, diga qual e eu atualizo o README.
