var price = 19.5;
var cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

var coinValues = [
  ['PENNY', .01],
  ['NICKEL', .05],
  ['DIME', .1],
  ['QUARTER', .25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
];

const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

purchaseBtn.addEventListener("click", () => {
  const cashValue = parseFloat(cashInput.value);
  const changeDue = cashValue - price;

  if (cashInput.value < price) {
    alert("Customer does not have enough money to purchase the item");
    return
  } 
  if (cashInput.value === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return
  }
});

const calcChange = (changeDue, cid) => {
  var parsedCid = parseFloat(cid.reduce((sum, [_,amount]) => sum + amount, 0).toFixed(3)); //Sum of numbers and array, toFixed() for string notation
  if (parsedCid < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] }
  }

  let changeArr = [];
  let changeTemp = changeDue;

  for (var i = coinValues.length - 1; i >= 0; i--) {
    var unit = coinValues[i][0];
    var unitValue = coinValues[i][1];
    var unitCid = cid[i][1];

    if (unitValue <= changeTemp && unitCid > 0) {
      
    }
  }
}

console.log(calcChange(400, cid));