# Welcome to OnSpace AI

Onspace AI empowers anyone to turn ideas into powerful AI applications in minutes—no coding required. Our free, no-code platform enables effortless creation of custom AI apps; simply describe your vision and our agentic AI handles the rest. The onspace-app, built with React Native and Expo, demonstrates this capability—integrating popular third-party libraries to deliver seamless cross-platform performance across iOS, Android, and Web environments.

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Start the Project

- Start the development server (choose your platform):

```bash
npm run start         # Start Expo development server
npm run android       # Launch Android emulator
npm run ios           # Launch iOS simulator
npm run web           # Start the web version
```

- Reset the project (clear cache, etc.):

```bash
npm run reset-project
```

### 3. Lint the Code

```bash
npm run lint
```

## Main Dependencies

- React Native: 0.79.4
- React: 19.0.0
- Expo: ~53.0.12
- Expo Router: ~5.1.0
- Supabase: ^2.50.0
- Other commonly used libraries:  
  - @expo/vector-icons  
  - react-native-paper  
  - react-native-calendars  
  - lottie-react-native  
  - react-native-webview  
  - and more

For a full list of dependencies, see [package.json](./package.json).

## Development Tools

- TypeScript: ~5.8.3
- ESLint: ^9.25.0
- @babel/core: ^7.25.2

## Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b main`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is private ("private": true). For collaboration inquiries, please contact the author.

---

Feel free to add project screenshots, API documentation, feature descriptions, or any other information as needed.
## Deploy as a Web App (GitHub Pages)

This project is built with **Expo Router** and exports a static web bundle via
`expo export --platform web`. A GitHub Actions workflow deploys that bundle to
**GitHub Pages** on every push to `main`.

### One-time setup

1. In the repository on GitHub, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, pick **GitHub Actions**.
3. Push to `main` (or trigger the `Deploy Web to GitHub Pages` workflow
   manually). The workflow installs deps with pnpm, lints, exports the web
   bundle, and publishes `dist/` to Pages.

Your site will be available at:

```
https://<your-username>.github.io/ugc-personal-assistant/
```

The base path is configured in `app.json` via
`expo.experiments.baseUrl = "/ugc-personal-assistant"`. If you deploy under a
different repo name or to a custom domain, update that value accordingly.

### Build the web bundle locally

```bash
pnpm install
pnpm expo export --platform web
# output goes to ./dist
```

### Run the web dev server

```bash
pnpm web
```
