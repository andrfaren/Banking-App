'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);

  });
};

const calcDisplayBalance = function(account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummary = function(account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const outflow = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = `${outflow}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * account.interestRate / 100)
    .filter((interest, array) => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function(acc) {

  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};


// Event handlers
let currentAccount;

// When the user clicks the login button, we find the account with the
// username that matches the user's input ('js' -> 'js')
// The account that is matched is stored in a 'currentAccount' variable
btnLogin.addEventListener('click', function(e) {

  // Prevent form from submitting
  e.preventDefault();

  // Find account with username that matches input from user
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {

    // Display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ').at(0)}`;
    containerApp.style.opacity = '100';

    // Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update the UI
    updateUI(currentAccount);

  }

});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiver &&
    currentAccount.balance >= amount &&
    receiver?.username !== currentAccount.username) {

    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiver.movements.push(amount);

    // Update the UI
    updateUI(currentAccount);

  }

});


// const deposits = movements.filter(function(movement) {
//   return movement > 0;
// });
//
// const withdrawals = movements.filter(function(movement) {
//   return movement < 0;
// });
//
// const balance = movements.reduce((acc, curr) => acc + curr, 0);
// const movementsUSD = movements.map((movement) => movement * euroToUsd);
//
// const movementsDescriptions = movements.map((movement, i) => {
//   if (movement > 0) {
//     return `Movement ${i + 1}: You deposited ${movement}`;
//
//   } else {
//     return `Movement ${i + 1}: You withdrew ${Math.abs(movement)}`;
//   }
// });
//
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroToUsd = 1.1;

// // Maximum value of movements array
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//
// const maxValue = movements.reduce(function(acc, curr) {
//   return Math.max(acc, curr);
// }, 0);
//
// console.log(maxValue);

///////////////////////////////////////
// Coding Challenge #2

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = function(array) {
//   const adults = array
//     .map(dogAge => dogAge <= 2 ? dogAge * 2 : dogAge * 4 + 16)
//     .filter(humanAge => humanAge >= 18);
//
//   return adults.reduce((acc, curr) => acc + curr, 0) / adults.length;
// };

// const calcAverageHumanAge = function(array) {
//   return array
//     .map(dogAge => dogAge <= 2 ? dogAge * 2 : dogAge * 4 + 16)
//     .filter(humanAge => humanAge >= 18)
//     .reduce((acc, curr, _, adults) => acc + curr / adults.length, 0);
// };
//
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.find(movement => movement < 0));
//
// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);
//
// const accountFor = function() {
//   let account = undefined;
//
//   for (const acc of accounts) {
//     if (acc.owner === 'Jessica Davis') account = acc;
//   }
//     return account;
// }
//
// console.log(accountFor());
//
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   // .map(mov => mov * 1.1)
//   .map((mov, i, arr) => {
//     // console.log(arr);
//     return mov * 1.1;
//   })
//   .reduce((acc, mov) => acc + mov);
//
// console.log(totalDepositsUSD);

