import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const [page, setPage] = useState("login");
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loans, setLoans] = useState([]);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userId, setUserId] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountType, setAccountType] = useState("savings");

  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [toAccountId, setToAccountId] = useState("");

  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");

  const API = "http://localhost:5000";

  // LOGIN
  const login = async () => {
    try {
      const res = await axios.post(API + "/users/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setPage("dashboard");
    } catch (e) {
      alert("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };

  // REGISTER
  const registerUser = async () => {
    try {
      await axios.post(API + "/users/register", {
        username,
        password,
        email,
        phoneNumber: phone,
      });
      alert("User Registered");
      setUsername("");
      setPassword("");
      setEmail("");
      setPhone("");
    } catch (e) {
      alert("Error registering user");
    }
  };

  // CREATE ACCOUNT
  const createAccount = async () => {
    if (!userId) return;
    try {
      await axios.post(API + "/accounts/create", {
        userId,
        accountType,
      });
      alert("Account Created");
      setUserId("");
      getAccounts();
    } catch (e) {
      alert("Error creating account");
    }
  };

  // GET ACCOUNTS
  const getAccounts = async () => {
    try {
      const res = await axios.get(API + "/accounts");
      setAccounts(res.data);
    } catch (e) {
      alert("Error fetching accounts");
    }
  };

  // DEPOSIT
  const deposit = async () => {
    if (!selectedAccount || !amount) return;
    try {
      await axios.post(API + "/transactions/deposit", {
        accountId: selectedAccount._id,
        amount: parseFloat(amount),
      });
      alert("Deposit successful");
      setAmount("");
      setSelectedAccount(null);
      getAccounts();
      getTransactions();
    } catch (e) {
      alert("Error depositing");
    }
  };

  // WITHDRAW
  const withdraw = async () => {
    if (!selectedAccount || !amount) return;
    try {
      await axios.post(API + "/transactions/withdraw", {
        accountId: selectedAccount._id,
        amount: parseFloat(amount),
      });
      alert("Withdraw successful");
      setAmount("");
      setSelectedAccount(null);
      getAccounts();
      getTransactions();
    } catch (e) {
      alert("Error withdrawing");
    }
  };

  // TRANSACTIONS
  const getTransactions = async () => {
    try {
      const res = await axios.get(API + "/transactions");
      setTransactions(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  // LOANS
  const getLoans = async () => {
    try {
      const res = await axios.get(API + "/loans", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoans(res.data);
    } catch (e) {
      alert("Error fetching loans");
    }
  };

  const applyForLoan = async () => {
    if (!userId || !loanAmount || !interestRate || !term) return;
    try {
      await axios.post(
        API + "/loans/create",
        {
          userId,
          loanAmount: parseFloat(loanAmount),
          interestRate: parseFloat(interestRate),
          term,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Loan applied");
      getLoans();
    } catch (e) {
      alert("Error applying loan");
    }
  };

  // PAGE EFFECTS
  useEffect(() => {
    if (page === "accounts") getAccounts();
    if (page === "transactions") {
      getAccounts();
      getTransactions();
    }
    if (page === "loans") getLoans();
  }, [page]);

  // LOGIN PAGE
  if (page === "login") {
    return (
      <div className="login">
        <h2>Bank Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>

        <button onClick={() => setPage("register")}>
          Register
        </button>
      </div>
    );
  }

  // MAIN UI
  return (
    <div>
      <nav className="navbar">
        <img src={logo} width="50" alt="logo" />
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("accounts")}>Accounts</button>
        <button onClick={() => setPage("transactions")}>Transactions</button>
        <button onClick={() => setPage("loans")}>Loans</button>
        <button onClick={logout}>Logout</button>
      </nav>

      {page === "dashboard" && <h2>Welcome to MERN Bank</h2>}

      {page === "accounts" && (
        <div>
          <h2>Accounts</h2>
          {accounts.map((a) => (
            <p key={a._id}>
              {a.accountNumber} - ${a.balance}
            </p>
          ))}
        </div>
      )}

      {page === "transactions" && (
        <div>
          <h2>Transactions</h2>
          {transactions.map((t) => (
            <p key={t._id}>
              {t.type} - ${t.amount}
            </p>
          ))}
        </div>
      )}

      {page === "loans" && (
        <div>
          <h2>Loans</h2>
          {loans.map((l) => (
            <p key={l._id}>
              ${l.loanAmount} - {l.interestRate}%
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;