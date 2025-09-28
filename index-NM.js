const INVALID_INPUT_MSG = "błędne dane";
function add(e, l) {
  return (e = convertToDecimal(e)), (l = convertToDecimal(l)), parseFloat(e.add(l).toString());
}
function subtract(e, l) {
  return (e = convertToDecimal(e)), (l = convertToDecimal(l)), parseFloat(e.minus(l).toString());
}
function multiply(e, l) {
  return (e = convertToDecimal(e)), (l = convertToDecimal(l)), parseFloat(e.times(l));
}
function divide(e, l) {
  return (e = convertToDecimal(e)), (l = convertToDecimal(l)), parseFloat(e.div(l));
}
function convertToDecimal(e) {
  return typeof e !== Decimal && (e = new Decimal(e)), e;
}
function calculate1(e, l, t) {
  validInput(e, l) ? (t.value = divide(multiply(e.value, l.value), 100)) : (t.value = INVALID_INPUT_MSG);
}
function calculate2(e, l, t) {
  if (validInput(e, l)) {
    let c = subtract(l.value, e.value),
      a = multiply(divide(c, e.value), 100),
      n = a.toString();
    a > 0 && (n = "+" + n), (t.value = n);
  } else t.value = INVALID_INPUT_MSG;
}
function calculate3(e, l, t) {
  if (validInput(e, l)) {
    let c = add(parseFloat(e.value), divide(multiply(e.value, l.value), 100));
    t.value = c.toString();
  } else t.value = INVALID_INPUT_MSG;
}
function calculate4(e, l, t) {
  if (validInput(e, l)) {
    let c = subtract(parseFloat(e.value), divide(multiply(e.value, l.value), 100));
    t.value = c.toString();
  } else t.value = INVALID_INPUT_MSG;
}
function calculate5(e, l, t) {
  if (validInput(e, l)) {
    let c = multiply(divide(l.value, e.value), 100);
    t.value = c.toString();
  } else t.value = INVALID_INPUT_MSG;
}
function calculate6(e, l, t) {
  if (validInput(e, l)) {
    let c = subtract(parseFloat(e.value), divide(multiply(e.value, l.value), 100));
    t.value = c.toString();
  } else t.value = INVALID_INPUT_MSG;
}
function calculate7(e, l, t) {
  if (validInput(e, l)) {
    let c = subtract(100, l.value),
      a = divide(e.value, c),
      n = multiply(a, 100);
    t.value = n.toString();
  } else t.value = INVALID_INPUT_MSG;
}
function calculate8(e, l, t) {
  if (validInput(e, l)) {
    let c = add(parseFloat(e.value), divide(multiply(e.value, l.value), 100));
    t.value = c.toString();
  } else t.value = INVALID_INPUT_MSG;
}
function calculate9(e, l, t) {
  if (validInput(e, l)) {
    let c = add(100, parseFloat(l.value)),
      a = divide(e.value, c),
      n = multiply(a, 100);
    t.value = n.toString();
  } else t.value = INVALID_INPUT_MSG;
}
function round(e) {
  let l = e.value;
  if ("" === l || void 0 === l || l === INVALID_INPUT_MSG) return "";
  let t = "";
  ("+" == l[0] || "-" == l[0]) && (t = l[0]);
  let c = parseFloat(l.replace(t, ""));
  return t + (c = Math.round((c + Number.EPSILON) * 100) / 100).toString();
}
function copyValue(e, l) {
  navigator.clipboard.writeText(e.value),
    l.classList.add("completed"),
    setTimeout(() => {
      l.classList.remove("completed");
    }, 1e3);
}
function showInfo(e, l) {
  e.classList.remove("show"), e.classList.add("no-show"), l.classList.remove("no-show"), l.classList.add("show");
}
function hideInfo(e, l) {
  e.classList.remove("no-show"), e.classList.add("show"), l.classList.remove("show"), l.classList.add("no-show");
}
function focusFirstInput(e, l) {
  setTimeout(() => {
    l || scrollSlightlyDown();
    let t = document.getElementById(e);
    if (t && (window.innerWidth > 1200 || !l)) {
      let c = t.getElementsByTagName("input")[0];
      if (!c) return;
      c.focus({preventScroll: !0});
    }
  }, 100);
}
function scrollSlightlyDown() {
  let e = scrollY;
  window.scroll(0, e - 150);
}
function validInput(e, l) {
  return e.value.length > 0 && l.value.length > 0;
}
let calc1 = document.getElementById("app-procent-z-liczby"),
  calc2 = document.getElementById("app-roznica-procentowa"),
  calc3 = document.getElementById("app-dodaj-procent-do-liczby"),
  calc4 = document.getElementById("app-odejmij-procent"),
  calc5 = document.getElementById("app-jakim-procentem"),
  calc6 = document.getElementById("app-cena-po-rabacie"),
  calc7 = document.getElementById("app-liczba-przed-odjeciem-procetu"),
  calc8 = document.getElementById("app-cena-po-podwyzce"),
  calc9 = document.getElementById("app-liczba-przed-dodaniem-procentu"),
  calcDivs = [calc1, calc2, calc3, calc4, calc5, calc6, calc7, calc8, calc9],
  calculators = [calculate1, calculate2, calculate3, calculate4, calculate5, calculate6, calculate7, calculate8, calculate9];
for (let i = 0; i < calcDivs.length; i++) {
  let e = calcDivs[i].getElementsByTagName("input")[0],
    l = calcDivs[i].getElementsByTagName("input")[1],
    t = calcDivs[i].getElementsByTagName("input")[2],
    c = calcDivs[i].getElementsByTagName("button")[0],
    a = calcDivs[i].getElementsByClassName("round-button")[0],
    n = calcDivs[i].getElementsByClassName("copy-button")[0],
    o = calcDivs[i].getElementsByClassName("info-colapsed")[0],
    u = calcDivs[i].getElementsByClassName("info-expanded")[0],
    s = calcDivs[i].getElementsByClassName("close-button")[0];
  calcDivs[i].addEventListener("click", function () {
    markActiveCalculator(calcDivs[i].id);
  }),
    e.addEventListener("keydown", function (c) {
      "Enter" === c.key && (c.preventDefault(), calculators[i](e, l, t));
    }),
    l.addEventListener("keydown", function (c) {
      "Enter" === c.key && (c.preventDefault(), calculators[i](e, l, t));
    }),
    c.addEventListener("click", function () {
      calculators[i](e, l, t);
    }),
    a.addEventListener("click", function () {
      t.value = round(t);
    }),
    n.addEventListener("click", function () {
      copyValue(t, n);
    }),
    o.addEventListener("click", function () {
      showInfo(o, u);
    }),
    s.addEventListener("click", function () {
      hideInfo(o, u);
    });
  let v = calcDivs[i].getElementsByTagName("input");
  for (let d = 0; d < v.length; d++)
    v[d].addEventListener("focus", function () {
      markActiveCalculator(calcDivs[i].id);
    });
}
function handleScroolBtnVissability() {
  let e = document.querySelector("#scrollToTheTopButton");
  !e.classList.contains("show-scrollTop") && window.scrollY > 200 && e.classList.add("show-scrollTop"), window.scrollY < 200 && e.classList.remove("show-scrollTop");
}
function scrollToTheTop() {
  window.scroll(0, 0);
}
function markActiveCalculator(e) {
  for (let l = 0; l < calcDivs.length; l++) calcDivs[l].id === e ? calcDivs[l].classList.add("active") : calcDivs[l].classList.remove("active");
}
window.addEventListener("load", (e) => {
  focusFirstInput("app-procent-z-liczby", !0);
});
window.addEventListener("scroll", handleScroolBtnVissability);

// app popup start
const minVisits = 3;
const hideForDays = 7;

function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

function showPopup() {
  document.getElementById("app-popup").style.display = "flex";
}

// Obsługa wizyt i popupu
(function () {
  if (!isMobile()) return; 

  const now = Date.now();
  const lastShown = localStorage.getItem("popupLastShown");
  const visits = parseInt(localStorage.getItem("popupVisits") || "0") + 1;
  localStorage.setItem("popupVisits", visits);

  if (lastShown && now - parseInt(lastShown) < hideForDays * 24 * 60 * 60 * 1000) {
    return; // popup niedostępny jeszcze
  }

  if (visits >= minVisits) {
    showPopup();
    localStorage.setItem("popupLastShown", now.toString());
    localStorage.setItem("popupVisits", "0");
  }
})();

// Zamknięcie popupu
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".popup-close").addEventListener("click", () => {
    document.getElementById("app-popup").style.display = "none";
  });
});
// app popup end
