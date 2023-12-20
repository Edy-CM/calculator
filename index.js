const buttonsEl = document.getElementById("buttons")
const calculator = document.getElementById("calculator")
const delBtn = document.getElementById("del")
const clearBtn = document.getElementById("clear")
const totalEl = document.getElementById("result")
const lastOperator = document.getElementById("last-operator")

let operation = []
let digits = []

delBtn.addEventListener("click", function(){
  operation.pop()
  digits.pop()
  totalEl.textContent = digits.join("")
})

clearBtn.addEventListener("click", function(){
  operation = []
  digits = []
  lastOperator.textContent = ""
  totalEl.textContent = ""
})

calculator.addEventListener("click", function(e){
  if (e.target.dataset.numberValue) {
    operation.push(Number(e.target.dataset.numberValue))
    digits.push(Number(e.target.dataset.numberValue))
    totalEl.textContent = digits.join("")
  }
  if (e.target.dataset.operator) {
    if (e.target.dataset.operator == "=") {
      operate()
      return
    }
    digits = []
    lastOperator.textContent = e.target.dataset.operator
    operation.push(e.target.dataset.operator)
  }
})

function operate() {
  if (operation.length === 0) {
    totalEl.textContent = "0"
    return
  }
  const result = eval(operation.join(""))
  operation = [result]
  lastOperator.textContent = ""
  totalEl.textContent = result
}

function renderButtons() {
  function numberToWord(number) {
    const units = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  
    if (number >= 0 && number <= 9) {
      return units[number];
    } else {
      return 'Number out of range (0-9)';
    }
  }

  let buttonsHtml = ""
  for (let i = 0; i <= 9; i++) {
    buttonsHtml += `<button class="btn number-btn ${numberToWord(i)}" data-number-value="${i}">${i}</button>`
  }
  buttonsEl.innerHTML = buttonsHtml
}

renderButtons()
