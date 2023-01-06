# Mina RNG
Mina RNG is a [ZK Oracle](https://docs.minaprotocol.com/zkapps/tutorials/oracle) used to provide random numbers in a ZkApp.

## Usage
The app is deployed to [mina-rng.45930.xyz](https://mina-rng.45930.xyz).  To use in an app, make network requests to the API routes
- `/api/randomNumber`
- `/api/dice`

### Public Key
This app will sign requests as `B62qpvpwLbLDTLQvA2EVBrX5QXmTQ7yy9442KhCj8R1zAk21LuVKtwd`

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Testing

This app uses playwright tests.  First start the server with

```bash
npm run dev
```

Then run tests with

```bash
npx playwright test
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
