// My Global Variable declearation
const bankName = "Infinity Bank Inc.";

// Customer Accounts (Array of Objects)
let customerAccounts = [
  {
    accountId: 10012323,
    accountHolder: "Quadri Rogers",
    balance: 490330.70,
    type: "Savings"
  },
  {
    accountId: 10014545,
    accountHolder: "John Obi",
    balance: 705200.01,
    type: "Checking"
  },
  {
    accountId: 10016767,
    accountHolder: "Kelvin Herd",
    balance: 5508500.50,
    type: "Checking"
  }
];

// Function to find Account
function findAccount(accountId) {
  return customerAccounts.find(acc => acc.accountId === accountId);
}

// Displaying result on page and in console
function displayResult(message, isError = false) {
  const resultDiv = document.getElementById("resultArea");
  const color = isError ? "red" : "green";
  resultDiv.innerHTML = `<p style="color:${color}">${message}</p>`;
  console.log(message);
}

// Deposit Function
function deposit(accountId, amount) {
  let account = findAccount(accountId);
  if (account && amount > 0) {
    account.balance += amount;
    let msg = `✅ Deposit of ₦${amount.toFixed(2)} successful for ${account.accountHolder}.<br>
               Thank you for banking with ${bankName}.<br>
               New Balance: ₦${account.balance.toFixed(2)}`;
    displayResult(msg);
  } else {
    displayResult("Invalid deposit amount or account not found.", true);
  }
}

// Withdrawal Function and fee
function withdraw(accountId, amount) {
  const feeRate = 0.01; // variable declearation for withdrawal transaction fee
  let account = findAccount(accountId);

  if (!account) {
    displayResult("Account not found.", true);
    return;
  }

  let fee = amount * feeRate;

  if (amount + fee <= account.balance) {
    account.balance -= (amount + fee);
    let msg = `💸 Withdrawal of ₦${amount.toFixed(2)} successful for ${account.accountHolder}.<br>
                Transaction fee: ₦${fee.toFixed(2)}<br>
               Your remaining Balance is: ₦${account.balance.toFixed(2)}`;
    displayResult(msg);
  } else {
    displayResult(`Insufficient funds! ${account.accountHolder} has only ₦${account.balance.toFixed(2)}.`, true);
  }
}

// Balance Function input to check available balance
function checkBalance(accountId) {
  let account = findAccount(accountId);
  if (account) {
    let msg = `${account.accountHolder}'s Balance: ₦${account.balance.toFixed(2)} (${account.type} Account)`;
    displayResult(msg);
  } else {
    displayResult("Account not found.", true);
  }
}

// My Scope Check
try {
  console.log(feeRate); // ReferenceError in console
} catch (err) {
  console.log("Cannot access feeRate outside withdraw():", err.message);
}

// Function for form Submission
document.getElementById("bankForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const id = parseInt(document.getElementById("accountId").value);
  const amount = parseFloat(document.getElementById("amount").value);
  const action = document.getElementById("action").value;

  if (action === "checkBalance") checkBalance(id);
  else if (action === "deposit") deposit(id, amount);
  else if (action === "withdraw") withdraw(id, amount);
});
