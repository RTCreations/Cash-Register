var price = 19.5;

var cid = [
  ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
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

const cash = document.getElementById("cash");
const changeDueText = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

purchaseBtn.addEventListener("click", () => {
  const cashValue = parseFloat(cash.value);
  const changeDue = cashValue - price;

  if (cashValue < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } 

  if (cashValue === price) {
    changeDueText.innerText = "No change due - customer paid with exact cash";
    return;
  }

  const changeResult = calcChange(changeDue, cid);

  if (changeResult.status === "INSUFFICIENT_FUNDS" || changeResult.status === "CLOSED") {
    changeDueText.innerText = `Status: ${changeResult.status} ${formatChange(changeResult.change)}`;
  } else {
    var changeText = `Status: OPEN ${formatChange(changeResult.change)}`;
    changeDueText.innerText = changeText;
  }
});

const calcChange = (changeDue, cid) => {
  var parsedCid = parseFloat(cid.reduce((sum, [_,amount]) => sum + amount, 0).toFixed(2)); //Sum of numbers and array, toFixed() for string notation

  if (parsedCid < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  let changeArr = [];
  let changeTemp = changeDue;

  for (var i = coinValues.length - 1; i >= 0; i--) {
    var unit = coinValues[i][0];
    var unitValue = coinValues[i][1];
    var unitInDrawer = cid[i][1];

    if (unitValue <= changeTemp && unitInDrawer > 0) {
      var amountFromUnit = 0;
      
      while (changeTemp >= unitValue && unitInDrawer > 0) {
        changeTemp = (changeTemp - unitValue).toFixed(2);
        unitInDrawer -= unitValue;
        amountFromUnit += unitValue;
      }

      if (amountFromUnit > 0) {
        changeArr.push([unit, amountFromUnit]);
      }
    }
  }

  if (changeTemp > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (changeDue === parsedCid) {
    return { status: "CLOSED", change: cid };
  }

  return { status: "OPEN", change: changeArr };
}

const formatChange = changeArr => changeArr.filter(([unit, amount]) => amount > 0).map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(" "); //Creating the result in changeDueText
