# CustomerWithTesting

A **React Native mobile app** to display Zeller customers with **unit** and **end-to-end (E2E)** testing.  
This project demonstrates robust mobile development practices using Expo, GraphQL, Jest, and Appium.

---

## ✨ Features

- 📋 Display a list of customers  
- 🔍 Search customers by name  
- 🧑‍💼 Filter customers by role (Admin / Manager)  
- 🔄 Pull-to-refresh support  
- ✅ Unit testing (Jest + React Native Testing Library)  
- ✅ End-to-end testing (Appium + WebdriverIO)  

---

## 📱 Tech Stack

| Layer             | Technology                           |
|------------------|---------------------------------------|
| Framework         | React Native (TypeScript)            |
| Testing - Unit    | Jest, React Native Testing Library   |
| Testing - E2E     | Appium, WebdriverIO                  |
| UI Components     | `@rneui/base`                        |
| GraphQL Client    | Custom Service Layer                 |
| App Runtime       | Expo SDK                             |

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/NanthiniRamakrishnan/CustomerWithTesting.git
cd CustomerWithTesting
```

2. **Install dependencies**
npm install

3.  **Run the app**
npm run android

🧪 Testing
✅ **Unit Tests (Jest)**

npm test

Located in the __tests__/ directory.
Tests for search, filtering, and UI rendering.
Built with Jest and React Native Testing Library.

✅ **E2E Tests (Appium + WebdriverIO)**

1. **Install Appium**

npm install -g appium
appium driver install uiautomator2

3. **Start Appium Server**

appium

3.**Run WebdriverIO Tests**

npx wdio

E2E tests live in e2e-appium/zellerCustomer.test.js.
Simulates user actions like:
Viewing the list
Filtering roles
Pull-to-refresh
Searching by name
**Note: Ensure your emulator is ready and the APK path is correct in wdio.conf.js.**

📁 **Folder Structure**

CustomerWithTesting/
├── App.tsx
├── __tests__/                   # Unit test files
├── e2e-appium/                 # E2E test files
│   └── zellerCustomer.test.js
├── models/                     # TypeScript interfaces
├── queries/                    # GraphQL queries
├── screens/
│   └── ZellerCustomers.tsx     # Main customer screen
├── common/
│   └── graphQLService.ts       # GraphQL service layer
├── wdio.conf.js                # WebdriverIO config
├── jest.config.js              # Jest config
└── README.md



🧑‍💻 **Author**
Nanthini Ramakrishnan
GitHub: @NanthiniRamakrishnan


