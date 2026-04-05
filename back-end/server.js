/* const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

npconst authRoutes = require("./Routes/authRoutes");
const customerRoutes = require("./Routes/customerRoutes");
const accountRoutes = require("./Routes/accountRoutes");
const transactionRoutes = require("./Routes/transactionRoutes");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/bankDB")
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

app.listen(5000,()=>{
    console.log("Server running on port 5000");
}); */
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const userRoutes = require("./Routes/userRoutes")
const accountRoutes = require("./Routes/accountRoutes")
const transactionRoutes = require("./Routes/transactionRoutes")
const loanRoutes = require("./Routes/loanRoutes")

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/bankDB")
  .then(() => console.log("Database Connected"))
  .catch(err => console.error("Database connection error:", err))

app.use("/users", userRoutes)
app.use("/accounts", accountRoutes)
app.use("/transactions", transactionRoutes)
app.use("/loans", loanRoutes)

app.listen(5000,()=>{
    console.log("Server running on port 5000")
})