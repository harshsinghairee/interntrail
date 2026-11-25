# InternTrail

A responsive internship application tracker built with React, JavaScript, HTML and CSS. Manage a personal application pipeline without an account or server.

## Run locally

Install Node.js 22.12 or newer, then open a terminal in this folder:

```sh
npm install
npm run dev
```

Open the localhost address printed in the terminal. For a production build, run `npm run build`, followed by `npm run preview`. Run `npm test` for the data-logic tests. A pnpm lockfile is included; pnpm users can run `pnpm install --frozen-lockfile`.

## Features

- Create, edit and delete applications; undo the most recent deletion.
- Track Saved, Applied, Interview, Offer and Closed stages in list or board view.
- Search companies, roles, skills and notes; filter status and work mode.
- Sort by newest, deadline or stipend. Review open deadlines in a dedicated view.
- Dashboard totals and deadlines due in the next seven days.
- Save notes, listing links, work location and monthly stipend.
- Preserve applications using localStorage; report storage failures visibly.
- Export CSV with quoted values and protection against spreadsheet formula prefixes.
- Responsive layouts, labelled controls and a native modal dialog.
- Fictional demo data is optional, explicitly loaded by the user.

## How the code works

`src/main.jsx` renders the application. `useState` holds applications, filters, view choice and the open form. Inputs are controlled: their values come from state and each change updates state. `save()` updates React state and localStorage together. `useMemo` derives the visible list from application data and filters. `useEffect` opens or closes the native dialog after React updates it. The browser handles modal focus trapping and Escape.

`src/model.js` contains pure functions for validation, filters, calendar-day comparisons, CSV conversion and loading saved data. Date differences use UTC calendar values rather than elapsed local hours to avoid daylight-saving offsets. `src/model.test.js` tests those rules with Node's built-in test runner.

`src/styles.css` supplies the layout, component styling, visible keyboard focus and mobile breakpoints. Google Fonts are optional; the app falls back to local sans-serif fonts if unavailable.

Data flow: input event → state update → derived list → rendered UI. Saving an application also writes a JSON array to localStorage. No backend, authentication, live vacancy search or application submission is included. Data belongs to the browser and origin; changing ports or clearing site data can make it unavailable. Export backups regularly. This is a single-tab personal tool; simultaneous edits in multiple tabs are not merged.

## Learn it before putting it forward in an interview

This starting project was generated with AI assistance for Harsh Singh Airee. Do not describe it as independently authored or claim production users. Run it, read the code and make changes you understand before presenting it as evidence of your skills.

1. Add a fictional application, edit its status, refresh, search, export and delete/undo it.
2. Explain why React needs stable IDs for list keys and why array updates create a new array.
3. Trace a form input from `onChange` through `setForm` to `submit` and `save`.
4. Explain why localStorage differs from a database and what happens when saving fails.
5. Add a field such as “contact person” yourself, including form, search and export support.
6. Extract ApplicationTable and ApplicationForm into separate components as a refactoring exercise.
7. Add a test for your own change and document what you did.

Possible next versions: JSON backup restore with validation, drag-and-drop stages, a backend with accounts, or scheduled reminders. These are extension ideas, not implemented features.

## Publish when ready

Create a GitHub repository and upload the project without node_modules or dist. Static hosting services can build using `npm run build` and serve `dist`. No keys or environment variables are required. Add real repository and live-demo links to your resume only after publishing.
