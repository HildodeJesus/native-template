# native-template

Um template moderno para apps Expo + React Native com TypeScript e Expo Router — pronto para Android, iOS e Web. Inclui integrações úteis (NativeWind/Tailwind, i18n, WatermelonDB, MMKV, EAS-ready) e uma estrutura pensada para projetos universais.

<!-- Badges (adicione manualmente quando houver repositório público / pacote) -->

[//]: # (Ex.: ![npm version](https://img.shields.io/npm/v/your-package) )

Sumário
- Quick Start
- Pré-requisitos
- Instalação
- Desenvolvimento
- EAS (builds e submit)
- Scripts principais
- Estrutura do projeto
- Integrações incluídas
- Dicas & Troubleshooting
- Contribuindo
- Licença & Agradecimentos
- Contato / Links

---

Quick Start

1) Clone o repositório

```bash
git clone <REPO_URL>
cd native-template
```

2) Instale dependências (escolha um)

```bash
# npm
npm install

# yarn
yarn

# pnpm
pnpm install

# bun
bun install
```

3) Inicie o servidor de desenvolvimento (Expo/Metro)

```bash
# npm
npm run start

# yarn
yarn start

# pnpm
pnpm start

# bun (ex.: bunx)
bunx expo start
```

4) Execute no dispositivo/emulador

```bash
# Android
npm run android

# iOS (macOS)
npm run ios

# Web
npm run web
```

Pré-requisitos

- Node.js (recomendado: LTS, Node 18+)
- Um gerenciador de pacotes: npm, yarn, pnpm ou bun
- Expo CLI e EAS CLI (recomendado para builds):
  - npm i -g expo-cli eas-cli
- Android Studio (para emular/compilar Android) e Xcode (macOS) para iOS
- Conta Expo/EAS para builds distribuídos

Instalação detalhada

1. Clone e entre na pasta do projeto (veja Quick Start)
2. Instale dependências com o gerenciador de sua preferência
3. (Opcional) Crie um arquivo `.env` na raiz para variáveis sensíveis — não commite esse arquivo.
   - Recomenda-se adicionar um `.env.example` com chaves vazias para orientar colaboradores.

Desenvolvimento

- Iniciar Metro / Expo Dev Tools

```bash
npm run start
```

- Iniciar com Dev Client (quando usar builds de desenvolvimento ou pacotes nativos)

```bash
npm run dev
```

- Executar em Android (emulador / dispositivo conectado)

```bash
npm run android
```

- Executar em iOS (simulador — macOS)

```bash
npm run ios
```

- Rodar versão Web

```bash
npm run web
```

EAS — Builds e envio (resumo rápido)

Este template inclui configuração para EAS em `eas.json` com perfis prontos (ex.: `development`, `preview`, `production`).

Passos sugeridos:

1. Faça login no EAS:

```bash
eas login
```

2. Configure credenciais caso necessário (Android/iOS):

```bash
eas credentials
```

3. Build com perfil desejado:

```bash
npm run build:dev     # perfil de desenvolvimento
npm run build:preview # perfil preview
npm run build:prod    # produção
```

4. Enviar a build (submit):

```bash
npm run submit:android
npm run submit:ios
```

Links úteis:
- EAS Build: https://docs.expo.dev/eas/
- EAS Submit: https://docs.expo.dev/submit/

Scripts principais (resumo do `package.json`)

- start — inicia Metro / Expo Dev Tools
- dev — inicia com `--dev-client` (útil para dev clients)
- android / ios / web — executa o app em cada plataforma
- reset-project — script utilitário que prepara/reset a pasta `app` (útil para templates)
- lint / ci:* — comandos de lint/format (Bi0me/ESLint/Prettier conforme configurado)
- build:dev | build:preview | build:prod — wrappers para `eas build` com perfis
- submit:android | submit:ios — wrappers para `eas submit`

Estrutura do projeto (visão geral)

- `app/` — rotas do Expo Router (file-based routing)
- `src/`
  - `app/` — layouts e telas do app (Expo Router)
  - `components/` — componentes reutilizáveis (UI)
  - `constants/` — tokens de tema e constantes
  - `database/` — WatermelonDB: modelos, migrations e schemas
  - `hooks/` — hooks customizados (autenticação, tema, etc.)
  - `lib/` — utilitários de app (config, storage, fakeAuth, etc.)
  - `locales/` — traduções (i18n)
  - `assets/` — imagens e ícones
- `android/`, `ios/` — projetos nativos gerados (quando aplicável)
- configurações: `app.config.js`, `eas.json`, `babel.config.js`, `tsconfig.json`, `tailwind.config.js`

Integrações incluídas

- Expo Router — navegação file-based
- TypeScript — tipagem e configurações em `tsconfig.json`
- NativeWind / Tailwind — utilitários de estilo (configurado em `tailwind.config.js`)
- WatermelonDB — banco local de alta performance
- react-native-mmkv — armazenamento rápido local
- i18next + react-i18next — internacionalização
- Sentry (opcional) — integração presente/indicada em `app.config.js`
- EAS — perfis de build prontos em `eas.json`

Dicas rápidas & Troubleshooting

- Limpar cache do Metro / Expo:

```bash
expo start -c
# ou
npm run start -- --clear
```

- Problemas com dev client (após mudanças nativas): recompile o dev client.
- Erros de build Android por falta de memória: aumente a heap do Gradle (ex.: `org.gradle.jvmargs=-Xmx2048m` em `gradle.properties`).
- Pods (iOS macOS): se houver pasta `ios/`, execute `pod install` dentro dela.
- Reiniciar Watchman (macOS) ou limpar cache quando recompilações estranhas ocorrerem:

```bash
watchman watch-del-all
```

- Se TypeScript acusar paths: verifique `tsconfig.json` e possíveis aliases usados no projeto.

Contribuindo

Contribuições são bem-vindas. Sugestão de fluxo:

1. Fork → branch com nome descritivo → implementações
2. Rode lint/format e testes locais antes do PR
3. Abra um Pull Request com descrição clara das mudanças

Recomendado rodar antes do PR:

```bash
npm run ci:format
npm run ci:lint
```

Licença & Agradecimentos

- Não foi encontrado um arquivo `LICENSE` no repositório; o `package.json` parece marcar o projeto como privado. Se pretende publicar este template, adicione um `LICENSE` na raiz.
- Agradecimentos às bibliotecas e comunidades: Expo, React Native, NativeWind, WatermelonDB, i18next e mantenedores.

Contato / Links

- Documentação Expo: https://docs.expo.dev/
- EAS: https://docs.expo.dev/eas/
- Issues / Contato: abra uma issue no repositório ou adicione um e-mail/link de contato neste documento.

Notas finais e Assunções

- Fiz pequenas suposições para manter o README genérico e útil para quem chega ao template:
  - `package.json` contém `private: true` (sem badge npm/licença automática).
  - `eas.json` e `app.config.js` estão presentes e configurados para perfis de EAS (development/preview/production).
  - Não adicionei badges por não haver metadados públicos; posso inserir badges com a URL do repositório pública.

Se quiser, eu:
- Adiciono badges com placeholders prontos (basta informar o repositório público),
- Crio um `.env.example` com variáveis comuns detectadas em `app.config.js`,
- Adiciono instruções iOS mais detalhadas (se houver pasta `ios/`).

---

(README atualizado automaticamente)
