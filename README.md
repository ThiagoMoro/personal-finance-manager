# 💰 Personal Finance Manager

> A modern, intuitive financial control system built with React, TypeScript, and Node.js

---

## 🌟 What is this project?

Ever felt overwhelmed trying to track your money across different banks? Tired of spreadsheets that don't update automatically? 

**Personal Finance Manager** is here to help! It's a clean, simple app that lets you:

- 🏦 **Manage multiple bank accounts** in one place
- 💵 **Track your income** and see where your money comes from
- 💸 **Monitor expenses** and understand your spending habits
- 🔄 **Set up recurring payments** so you never forget a bill
- 📊 **Visualize everything** with beautiful charts and dashboards

Think of it as your personal financial assistant that never sleeps! ☕

---

## ✨ Key Features

### 🎯 Dashboard Overview
Get a bird's-eye view of your finances the moment you open the app:
- Total balance across all banks
- Monthly income vs expenses
- Visual charts showing spending by category
- Quick access to recent transactions

### 🏦 Multi-Bank Management
- Add unlimited bank accounts
- Real-time balance updates
- See which bank holds what amount
- Delete accounts you no longer use

### 💰 Income Tracking
- Record every penny that comes in
- Categorize income sources (salary, freelance, investments, etc.)
- Link income to specific bank accounts
- Automatic balance updates

### 💳 Expense Management
- Log all your spending
- Organize by categories (food, transport, entertainment, etc.)
- Track which bank account you paid from
- Instant balance adjustments

### 🔄 Recurring Payments
- Never forget a subscription or bill again!
- Set monthly recurring income (like salary)
- Set monthly recurring expenses (like rent, Netflix, gym)
- Choose which day of the month it happens

---

## 🛠️ Tech Stack

### Frontend (What you see)
- **React 18** - The UI library that makes everything smooth
- **TypeScript** - Keeps our code bug-free and predictable
- **Tailwind CSS** - Beautiful styling without the hassle
- **Recharts** - Gorgeous charts that make data fun
- **Vite** - Lightning-fast development experience
- **Axios** - Handles all communication with the backend

### Backend (The brain)
- **Node.js** - JavaScript on the server
- **Express** - Simple, fast web framework
- **TypeScript** - Type safety everywhere
- **SQLite** - Lightweight database that just works
- **CORS** - Lets frontend and backend talk to each other

---

## 🚀 Getting Started

### Prerequisites
Make sure you have these installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A code editor like **VS Code** (optional but recommended)

### Installation

#### 1️⃣ Clone or download the project
```bash
# If you have git
git clone <your-repo-url>

# Or just download and unzip the folder
```

#### 2️⃣ Set up the Backend
```bash
cd backend
npm install
npm run dev
```

You should see:
```
✅ Connected to SQLite database
✅ Database tables initialized
🚀 Server running on http://localhost:3001
```

#### 3️⃣ Set up the Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

#### 4️⃣ Open your browser
Go to **http://localhost:5173** and start managing your finances! 🎉

---

## 📖 How to Use

### Adding Your First Bank
1. Click on the **"Banks"** tab
2. Enter your bank name (e.g., "Santander")
3. Enter the current balance (e.g., 1500)
4. Click **"Add"**

### Recording Income
1. Go to the **"Incomes"** tab
2. Fill in:
   - Description (e.g., "Monthly Salary")
   - Amount (e.g., 2500)
   - Date
   - Select which bank received it
3. Click **"Add Income"**
4. Watch your bank balance update automatically! ✨

### Tracking Expenses
1. Navigate to **"Expenses"**
2. Enter:
   - What you bought (e.g., "Groceries")
   - How much (e.g., 85.50)
   - When
   - Which bank you paid from
3. Click **"Add Expense"**
4. Your balance adjusts instantly!

### Setting Up Recurring Payments
1. Open **"Recurring"** tab
2. Add details:
   - Description (e.g., "Netflix Subscription")
   - Amount (e.g., 15.99)
   - Type (Income or Expense)
   - Day of month (e.g., 15)
3. Click **"Add Recurring"**
4. Never forget a payment again!

---

## 🎨 Features in Detail

### Real-Time Balance Updates
Every time you add income or expense, the system automatically:
- Updates the relevant bank balance
- Recalculates total balance
- Updates all charts and statistics
- No manual refresh needed!

### Smart Data Visualization
- **Pie charts** show spending by category
- **Color-coded** amounts (green for income, red for expenses)
- **Responsive design** works on desktop, tablet, and mobile

### Data Persistence
All your data is stored in a local SQLite database, which means:
- ✅ Your data stays on your computer (privacy!)
- ✅ Works offline
- ✅ Fast and reliable
- ✅ No monthly fees or subscriptions

---

## 🔧 API Endpoints

The backend provides these endpoints:

### Banks
- `GET /banks` - Get all banks
- `POST /banks` - Create a new bank
- `DELETE /banks/:id` - Delete a bank

### Incomes
- `GET /incomes` - Get all incomes
- `POST /incomes` - Add new income
- `DELETE /incomes/:id` - Delete income

### Expenses
- `GET /expenses` - Get all expenses
- `POST /expenses` - Add new expense
- `DELETE /expenses/:id` - Delete expense

### Recurring Payments
- `GET /recurring` - Get all recurring payments
- `POST /recurring` - Add recurring payment
- `DELETE /recurring/:id` - Delete recurring payment

---

## 🎯 Future Enhancements

Here are some cool features we could add:

- 📅 **Calendar view** of transactions
- 🔍 **Search and filter** transactions
- 📊 **Monthly/yearly reports** with PDF export
- 🎨 **Custom categories** for income and expenses
- 🔔 **Notifications** for upcoming recurring payments
- 📱 **Mobile app** version
- 🌙 **Dark mode** for night owls
- 💱 **Multi-currency** support
- 🔐 **User authentication** for multiple users
- ☁️ **Cloud sync** option

---

## 🐛 Troubleshooting

### Backend won't start?
- Make sure port 3001 is not in use
- Check if Node.js is installed: `node --version`
- Try deleting `node_modules` and running `npm install` again

### Frontend shows blank page?
- Check if backend is running on port 3001
- Open browser console (F12) and check for errors
- Make sure you ran `npm install` in the frontend folder

### Database errors?
- Delete `database.sqlite` file and restart backend
- It will create a fresh database automatically

### Styles not loading?
- Make sure Tailwind CSS is properly configured
- Check if `index.css` is imported in `main.tsx`
- Try clearing browser cache

---

## 🤝 Contributing

Want to make this project even better? Here's how:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit (`git commit -m 'Add some amazing feature'`)
5. Push (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 💬 Support

Having issues? Questions? Ideas?

- 📧 Email: thiago.g.moro@gmail.com
- 💬 Open an issue on GitHub

---

## 🙏 Acknowledgments

Built with ❤️ using:
- React team for the amazing framework
- Tailwind CSS for beautiful styling
- Recharts for stunning visualizations
- The open-source community for inspiration

---

**Made with 💙 by Thiago Moro**

*Last updated: December 2025*