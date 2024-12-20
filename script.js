//sidebar
const toggleMenu = document.getElementById("toggle-menu");
const sideMenu = document.getElementById("side-menu");

toggleMenu.addEventListener("click", () => {
  sideMenu.classList.toggle("active");
});
//end sidebar

const titleType = document.getElementById("title-type");
const types = document.getElementsByClassName("type");
const buttons = document.querySelectorAll("button");

//expression type default
let type = "postfix";
let result = "";
let expression = "";
let isEqual = false;
let step = 1;
let newStack = false;
let popped = "";

// document.getElementById("space").disabled = true; //disable space for infix

//sidebar click events: infix, postfix or prefix
for (var i = 0; i < types.length; i++) {
  types[i].addEventListener("click", function () {
    //active
    var current = document.getElementsByClassName("active-type");
    current[0].className = current[0].className.replace(" active-type", "");
    this.className += " active-type";

    //change type notation
    if (this.id == "postfix") {
      type = "postfix";
      titleType.innerHTML = "Postfix";
      document.getElementById("space").disabled = false;
      document.getElementById("stack").style.display = "block";
    } else if (this.id == "prefix") {
      type = "prefix";
      titleType.innerHTML = "Prefix";
      document.getElementById("space").disabled = false;
      document.getElementById("stack").style.display = "block";
    } else {
      type = "infix";
      titleType.innerHTML = "Infix";
      document.getElementById("space").disabled = true;
      document.getElementById("stack").style.display = "none";
    }

    sideMenu.classList.toggle("active");
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = button.getAttribute("value").trim();

    if (isEqual) {
      result = "";
      isEqual = false;
      newStack = true;
      popped = ""
    }

    try {
      if (value == "=") {
        if (result != "") {
          isEqual = true;
          newStack = true;
          expression = result;
          if (type == "postfix") {
            result = evaluatePostfix();
          } else if (type == "prefix") {
            result = evaluatePrefix();
          } else {
            result = evaluateInfix();
          }
        }
      } else if (value == "ac") {
        result = "";
      } else if (value == "del") {
        result = result.toString().slice(0, -1);
      } else if (value == "space") {
        if (result == "" || result[result.length - 1] == " ") return;

        result += " ";
      } else {
        result += value;
      }
    } catch {
      result = "Wrong expression.";
      isEqual = true;
      newStack = true
    }

    if (isEqual) {
      document.getElementById("show-expr").value = expression;
    }
    document.getElementById("display").value = result;
  });
});

function evaluateInfix() {
  return eval(result);
}

function evaluatePostfix() {
  result = result.trim();
  const stack = [];
  const ops = result.split(" ");

  try {
    for (o of ops) {
      if (!isNaN(o)) {
        stack.push(parseInt(o));
        updateStack(stack, "push", '');
      } else {
        const b = stack.pop();
        const a = stack.pop();
        const operate = applyOperator(o, a, b);
        popped = o;
        if (!operate) {
          return "Invalid expression";
        } else {
          stack.push(applyOperator(o, a, b));
          updateStack(stack, "push", popped);
        }
      }
    }
    return stack.length == 1 ? stack.pop() : "Invalid expression";
  } catch {
    return "Invalid expression";
  }
}

function evaluatePrefix() {
  result = result.trim();
  const stack = [];
  const ops = result.split(" ").reverse();

  try {
    for (o of ops) {
      if (!isNaN(o)) {
        stack.push(parseInt(o));
        updateStack(stack, "push", '');
      } else {
        const b = stack.pop();
        const a = stack.pop();
        popped = o;
        const operate = applyOperator(o, a, b);

        if (!operate) {
          return "Invalid expression";
        } else {
          stack.push(applyOperator(o, a, b));
          updateStack(stack, "push", popped);
        }
      }
    }
    return stack.length == 1 ? stack.pop() : "Invalid expression";
  } catch {
    return "Invalid expression";
  }
}

const stackList = document.getElementById("stack-steps");

function applyOperator(operator, a, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return false;
  }
}

function updateStack(stack, method, popped = "") {
  if (newStack) {
    step = 1;
    stackList.innerHTML = "";
    popped = ""

    const div = document.createElement("div");
    div.setAttribute("class", "stack-step");
    
    const div2 = document.createElement("div");
    div2.setAttribute("class", "grid");

    const span = document.createElement("span");
    span.textContent = "Step " + step++ + ": ";

    div2.appendChild(span);

    const ul = document.createElement("ul");

    const li = document.createElement("li");
    li.textContent = "Empty Stack";
    ul.appendChild(li);

    div.appendChild(div2);
    div.appendChild(ul);

    stackList.appendChild(div);
  }

  if (method == "push") {
    newStack = false;
    const div = document.createElement("div");
    div.setAttribute("class", "stack-step");

    const span = document.createElement("span");
    span.textContent = "Step " + step++ + ": ";

    if (popped != "") {
      span.textContent += "(" + popped + ")";
    }

    const ul = document.createElement("ul");

    stack.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.prepend(li);
    });

    div.appendChild(span);
    div.appendChild(ul);

    stackList.appendChild(div);
  }

  popped = ""

}

// Dark Mode
var checkbox = document.querySelector("input[name=theme]");

checkbox.addEventListener("change", function () {
  trans();
  if (this.checked) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

function trans() {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
}
// End Dark Mode

//Info Modal
var modal = document.getElementById("info-modal");
var btn = document.getElementById("info");
var span = document.getElementsByClassName("close")[0];

btn.addEventListener("click", function () {
  modal.style.display = "block";
});

span.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
