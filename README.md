# Code Snippet

## Last known developer environment

- Node: 12.13.1
- NPM: 6.12.1

## Environment Values
- See the env files in `server/.env-local` or `server/.env`
- Go to the `app.config.js`, for the value of `X_API_KEY`, `X_API_SECRET`, and `EXTERNAL_USER_ID`, this will be used in the local development, to check where it is define
go to the `webpack.dev.js`.

## Quick developer setup

- Run `lerna bootstrap --hoist` in the root directory to install dependencies for all packages
- Navigate to `packages/code-snippet` folder.
- Run `npm start:full-dev` to start the FE and BE (proxy) in development mode.
- Alternatively, run `npm run start` to start express server in production mode.
- Navigate to `http://localhost:8080`.
