let dobbelstenen = [
  document.querySelector("#getal1 img"),
  document.querySelector("#getal2 img"),
  document.querySelector("#getal3 img"),
  document.querySelector("#getal4 img"),
  document.querySelector("#getal5 img"),
];

let btnGooi = document.getElementById("dice");
let aantalBeurten = 3;
let dice = [1, 1, 1, 1, 1];
let hold = [false, false, false, false, false];

let scores = {
  eentjes: document.getElementById("score-1"),
  tweeën: document.getElementById("score-2"),
  drieën: document.getElementById("score-3"),
  vier: document.getElementById("score-4"),
  vijf: document.getElementById("score-5"),
  zesjes: document.getElementById("score-6"),
  drieGelijk: document.getElementById("score-three-of-a-kind"),
  vierGelijk: document.getElementById("score-four-of-a-kind"),
  fullhouse: document.getElementById("score-full-house"),
  straatje: document.getElementById("score-small-straight"),
  groteStraat: document.getElementById("score-large-straight"),
  yahtzee: document.getElementById("score-yathzee"),
  kans: document.getElementById("score-chance"),
};

function dobbel() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
  if (aantalBeurten > 0) {
    for (let i = 0; i < 5; i++) {
      if (!hold[i]) {
        dice[i] = dobbel();
      }
    }
    aantalBeurten = aantalBeurten - 1;
    toonDobbels();
  } else {
    alert("je hebt al 3x gegooid en kan niet meer gooien!");
  }
}

function zetVast(nr) {
  hold[nr] = !hold[nr];
  if (hold[nr]) {
    dobbelstenen[nr].style.border = "3px solid black";
  } else {
    dobbelstenen[nr].style.border = "none";
  }
}

function toonDobbels() {
  for (let i = 0; i < 5; i++) {
    dobbelstenen[i].src = "fotos/" + dice[i] + ".png";
  }
  berekenPunten();
}

function berekenPunten() {
  let count = [0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 5; i++) {
    count[dice[i] - 1]++;
  }

  if (count.includes(3)) {
    scores.drieGelijk.innerText = optel(dice);
  } else {
    scores.drieGelijk.innerText = 0;
  }

  if (count.includes(4)) {
    scores.vierGelijk.innerText = optel(dice);
  } else {
    scores.vierGelijk.innerText = 0;
  }

  if (count.includes(3) && count.includes(2)) {
    scores.fullhouse.innerText = 25;
  } else {
    scores.fullhouse.innerText = 0;
  }

  scores.eentjes.innerText = count[0];
  scores.tweeën.innerText = count[1] * 2;
  scores.drieën.innerText = count[2] * 3;
  scores.vier.innerText = count[3] * 4;
  scores.vijf.innerText = count[4] * 5;
  scores.zesjes.innerText = count[5] * 6;

  if (
    (count[0] && count[1] && count[2] && count[3]) ||
    (count[1] && count[2] && count[3] && count[4]) ||
    (count[2] && count[3] && count[4] && count[5])
  ) {
    scores.straatje.innerText = 30;
  } else {
    scores.straatje.innerText = 0;
  }

  if (
    (count[0] && count[1] && count[2] && count[3] && count[4]) ||
    (count[1] && count[2] && count[3] && count[4] && count[5])
  ) {
    scores.groteStraat.innerText = 40;
  } else {
    scores.groteStraat.innerText = 0;
  }

  if (count.includes(5)) {
    scores.yahtzee.innerText = 50;
  } else {
    scores.yahtzee.innerText = 0;
  }

  scores.kans.innerText = optel(dice);
}

function optel(arr) {
  let som = 0;
  for (let i = 0; i < arr.length; i++) {
    som += arr[i];
  }
  return som;
}

btnGooi.addEventListener("click", rollDice);

for (let i = 0; i < dobbelstenen.length; i++) {
  dobbelstenen[i].addEventListener("click", function () {
    zetVast(i);
  });
}

toonDobbels();
