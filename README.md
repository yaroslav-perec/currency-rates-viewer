# 💱 Currency Rates Viewer

A modern, responsive web application built with **React 19**, **TypeScript**, and **Redux Toolkit + RTK Query**, allowing users to view and compare **exchange rates over the past 7 days**.
The user can change the base currency, manage compared currencies, and select any date up to **90 days in the past**.

---

## 🚀 Features

* 📅 **7-Day History** — Displays exchange rates for the last 7 days from the selected date
* 💷 **Base Currency Selector** — Change base currency (default: GBP)
* 💱 **Manage Compared Currencies** — Add/remove currencies (min 3, max 7)
* 📊 **Sortable Table** — Sort by date or any currency column
* 🧩 **Type-Safe Architecture** — Fully written in TypeScript
* 🎨 **Responsive UI** — Built with Material UI (MUI)
* 🧪 **Comprehensive Tests** — Vitest + React Testing Library + MSW
* ⚙️ **Clean State Management** — Redux Toolkit with RTK Query
* 🧾 **Code Quality Tools** — ESLint + Prettier

---

## 🧠 Tech Stack

| Category                 | Technology                           |
| ------------------------ | ------------------------------------ |
| **Framework**            | React 19 + Vite                      |
| **Language**             | TypeScript                           |
| **State Management**     | Redux Toolkit + RTK Query            |
| **UI Library**           | Material UI (MUI)                    |
| **Date Picker**          | MUI X Date Pickers                   |
| **Testing**              | Vitest + React Testing Library + MSW |
| **Formatting / Linting** | ESLint + Prettier                    |
| **Bundler**              | Vite                                 |
| **Package Manager**      | npm                                  |

---

## ⚙️ Scripts

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Run development server              |
| `npm run build`        | Type-check and build for production |
| `npm run preview`      | Preview production build            |
| `npm run test`         | Run all tests                       |
| `npm run test:watch`   | Run tests in watch mode             |
| `npm run lint`         | Run ESLint                          |
| `npm run format`       | Format code with Prettier           |
| `npm run format:check` | Check code formatting               |

---

## 🧰 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the development server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### 3️⃣ Run tests

```bash
npm run test
```

---

## 🧾 ESLint & Prettier

* **ESLint** enforces best practices for React Hooks, TypeScript, and import rules.
  It uses `eslint-config-prettier` to avoid rule conflicts and includes plugins for `react-hooks` and `react-refresh`.
* **Prettier** ensures consistent formatting — **2 spaces**, semicolons, single quotes, trailing commas, and max line width of **100 characters**.
* Run checks before committing:

  ```bash
  npm run lint
  npm run format:check
  ```

---

## 🎨 Styling Approach

* **Material UI (MUI)** was selected for its accessibility, responsiveness, and modern design system.
* The `sx` prop and MUI theme provide a type-safe and consistent styling API.
* SCSS or CSS modules could be added for custom theming later — MUI offers a maintainable baseline for this scale of app.

---

## 🧠 Design & Architecture Decisions

* **Redux Toolkit + RTK Query** for predictable state and data caching
* **Functional composition** — hooks handle logic, components focus on presentation
* **Testable architecture** — MSW used for API mocking in integration tests
* **Type-safety** throughout all layers (API, hooks, Redux, UI props)
* **Separation of concerns** — isolated modules and shared utilities

---

## 🧩 API References

### 🪙 List of available currencies

```
https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json
```

### 💹 Rates for a specific date and base currency

```
https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{yyyy-MM-dd}/v1/currencies/{currency-code}.json
```

Example:
[`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-02/v1/currencies/gbp.json`](https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-02/v1/currencies/gbp.json)

---

## 🧪 Testing Overview

| Test File                      | Purpose                                  |
| ------------------------------ | ---------------------------------------- |
| `CurrencyRatesPage.test.tsx`   | Integration test for full page using MSW |
| `useRatesForLast7Days.test.ts` | Validates API aggregation logic          |
| `CurrencyTable.test.tsx`       | Renders table, loading & error states    |
| `useTableSort.test.ts`         | Sorting logic correctness                |
| `currenciesSlice.test.ts`      | Redux reducers & actions                 |
| `BaseCurrencySelect.test.tsx`  | Base currency selection                  |
| `DateSelector.test.tsx`        | Date picker logic                        |

---

## 🧩 Example Workflow

1. Select base currency (default: GBP)
2. Add or remove compared currencies (min 3, max 7)
3. Pick any date within the last 90 days
4. The app fetches and displays 7 days of exchange rate history
5. Sort by date or currency to analyze trends

---

## ⚠️ Known Limitations

* Data comes from the **Fawaz Ahmed Currency API**, which updates daily (not real-time).
* The app does not persist user selections — resets on reload.
* No offline or caching layer — RTK Query refetches on mount.
* Only English locale supported (no i18n).

---

## 🧠 Possible Extensions

* 📈 Add simple line charts for trend visualization
* 🌍 Add i18n (language selection)
* 💾 Persist user-selected base and compared currencies
* 🌓 Add light/dark theme toggle

---

## 👤 Author

**Yaroslav Perets** — Frontend Developer
📧 [perets.yaroslav@gmail.com](mailto:perets.yaroslav@gmail.com)
💼 [linkedin.com/in/yaroslav-perets](https://www.linkedin.com/in/yaroslav-perets/)

---

## 📝 License

This project is open-source and available under the **MIT License**.
