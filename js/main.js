const $result = document.querySelector("#result");
console.log($result.textContent);

let er1 = /^[0-9]+$/;
let chk = false;
let var1;
let var2;
let op;
function clean() {
  $result.textContent = "0.0";
  var1 = undefined;
  var2 = undefined;
  op = undefined;
  chk = false;
}
function deleteNum(num) {
  if (num.toString().length == 1) return num;
  return parseInt(num.toString().slice(0, -1));
}
function asigDecimal(num) {
  if (num.toString().includes(".")) return num;
  return num + ".";
}
function calculate(op) {
  switch (op) {
    case "+":
      var1 = var1 + var2;
      var2 = undefined;
      $result.textContent = var1;
      break;
    case "-":
      var1 = var1 - var2;
      var2 = undefined;
      $result.textContent = var1;
      break;
    case "*":
      var1 = var1 * var2;
      var2 = undefined;
      $result.textContent = var1;
      break;
    case "/":
      var1 = var1 / var2;
      var2 = undefined;
      $result.textContent = var1;
      break;
  }
  return;
}
function insertNum(e) {
  // *asig decimal
  if (e == ".") {
    if (!chk) {
      var1 = asigDecimal(var1);
      $result.textContent = var1;
      return;
    }
    var2 = asigDecimal(var2);
    $result.textContent = var2;
    return;
  }
  // *delete number
  if (e == "delete") {
    if (var1 != undefined && var2 == undefined) {
      var1 = deleteNum(var1);
      $result.textContent = var1;
      return;
    }
    var2 = deleteNum(var2);
    $result.textContent = var2;
    return;
  }
  if (var1 === undefined && var2 === undefined && !er1.test(e)) {
    alert("Please enter a valid number");
    return;
  }

  //*calculate
  if (!er1.test(e) && e != "=" && e != "delete") {
    if (chk && var1 && var2) {
      calculate(op);
    }
    op = e;
    chk = true;
    return;
  }
  if (e == "=") {
    if (var1 && var2) {
      calculate(op);
    }
    return;
  }

  if (er1.test(e)) {
    if (!chk) {
      if (var1) {
        var1 = Number(`${var1}${e}`);
      } else {
        var1 = Number(`${e}`);
      }
      $result.textContent = var1;
    } else {
      if (var2) {
        var2 = Number(`${var2}${e}`);
      } else {
        var2 = Number(`${e}`);
      }
      $result.textContent = var2;
    }
    return;
  }
}
