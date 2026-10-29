# Todo SPA — Redux State Management & Session Replay

A single-page application built to demonstrate predictable state management, action recording, and deterministic session replay using Redux.

Originally written in February 2020 as a frontend coding challenge using React 16, JavaScript, and a custom Webpack 4 + Babel config ([original repository](https://github.com/lucastlima/todo-spa)). This repository updates the build tooling to Vite and migrates the codebase to TypeScript while keeping the original Redux architecture intact.

## What This Demo Covers

- **Core Redux Architecture**: Hand-written reducers, action creators, and `redux-thunk` middleware (`todos` and `recording` slices) without higher-level abstractions, showing unidirectional data flow and immutable state updates directly.
- **Action Recording & Deterministic Replay**: Captures dispatched Redux actions (`ADD_TODO`, `UPDATE_TODO`, `REMOVE_TODO`) into a session log, validates session consistency (blocking edits or deletes on items created outside the active recording), and replays the recorded action log step-by-step on an async timeline.
- **State Persistence**: Hydrates the Redux store from `localStorage` on startup and persists state transitions across reloads.
- **Custom UI Components**: Modal and dialog system built with `ReactDOM.createPortal`, scoped styling with `styled-components` and CSS custom properties, and accessible hover/focus tooltips.
- **Integration Testing**: Component and store tests written with React Testing Library and Vitest using a custom `renderWithRedux` helper, covering CRUD flows and async session playback.

## How Session Replay Works

1. Click **Rec** in the top bar to start a new recording session.
2. Add, edit, or delete todos — each dispatched action is appended to `recording.session`.
3. Click **Stop** when done.
4. Click **Play** to reset the board and replay each recorded action in sequence at 1-second intervals, highlighting updated items along the way.

## Scripts

- `npm run dev` — Start the Vite dev server
- `npm run build` — Typecheck (`tsc -b`) and build static assets into `dist/`
- `npm run preview` — Preview the production build locally
- `npm test` — Run the test suite with Vitest
- `npm run lint` — Run `oxlint`
