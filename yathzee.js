const dobbelSteen = [
  document.querySelector("#getal1").querySelector("img"),
  document.getElementById("getal2").querySelector("img"),
  document.querySelector("#getal3 img"),
  document.querySelector("#getal4").querySelector("img"),
  document.getElementById("getal5").querySelector("img"),
];

const button = document.getElementById("dice");

let dicevalues = [1, 1, 1, 1, 1];
let holdStatus = [0, 0, 0, 0, 0]; // 0 = niet vast, 1 = vast
var beurten = 3;

var puntenTabel = {
  eentjes: document.querySelector("#score-1"),
  tweeën: document.getElementById("score-2"),
  drie: document.querySelector("#score-3"),
  vier: document.getElementById("score-4"),
  vijf: document.getElementById("score-5"),
  zes: document.querySelector("#score-6"),
  drieGelijk: document.getElementById("score-three-of-a-kind"),
  vierGelijk: document.querySelector("#score-four-of-a-kind"),
  volleBeker: document.getElementById("score-full-house"),
  straatKlein: document.getElementById("score-small-straight"),
  straatGroot: document.getElementById("score-large-straight"),
  yathzee: document.getElementById("score-yathzee"),
  geluk: document.getElementById("score-chance"),
};

function randomCijfer() {
  return Math.floor(Math.random() * (7 - 1)) + 1; // Beetje onnodige berekening
}

function roll() {
  if (beurten != 0) {
    for (let index = 0; index < 5; index++) {
      if (holdStatus[index] == 0) {
        dicevalues[index] = randomCijfer();
      }
    }
    beurten--;
    updateScherm();
  } else {
    console.log("Geen beurten meer!");
  }
}

function hold(nummer) {
  if (holdStatus[nummer] == 0) {
    holdStatus[nummer] = 1;
    dobbelSteen[nummer].style.border = "3px dotted yellow";
  } else {
    holdStatus[nummer] = 0;
    dobbelSteen[nummer].style.border = "none";
  }
}

function updateScherm() {
  for (var teller = 0; teller < dicevalues.length; teller++) {
    dobbelSteen[teller].src = "fotos/" + dicevalues[teller] + ".png";
  }
  berekenScore();
}

function berekenScore() {
  let counter = [0, 0, 0, 0, 0, 0];
  for (let w = 0; w < dicevalues.length; w++) {
    counter[dicevalues[w] - 1]++;
  }

  puntenTabel.eentjes.innerText = counter[0];
  puntenTabel.tweeën.innerText = counter[1] * 2;
  puntenTabel.drie.innerText = counter[2] * 3;
  puntenTabel.vier.innerText = counter[3] * 4;
  puntenTabel.vijf.innerText = counter[4] * 5;
  puntenTabel.zes.innerText = counter[5] * 6;

  if (counter.includes(3)) {
    puntenTabel.drieGelijk.innerText = dicevalues.reduce((a, b) => a + b);
  } else {
    puntenTabel.drieGelijk.innerText = "0";
  }

  if (counter.includes(4)) {
    puntenTabel.vierGelijk.innerText = dicevalues.reduce((x, y) => x + y);
  } else {
    puntenTabel.vierGelijk.innerText = "0";
  }

  let heeftDrie = false;
  let heeftTwee = false;
  for (var q = 0; q < counter.length; q++) {
    if (counter[q] == 3) {
      heeftDrie = true;
    }
    if (counter[q] == 2) {
      heeftTwee = true;
    }
  }
  puntenTabel.volleBeker.innerText = heeftDrie && heeftTwee ? "25" : "0";

  puntenTabel.straatKlein.innerText = checkStraatKlein(counter) ? "30" : "0";
  puntenTabel.straatGroot.innerText = checkStraatGroot(counter) ? "40" : "0";
  puntenTabel.yathzee.innerText = counter.includes(5) ? "50" : "0";

  let totaalPunten = 0;
  for (var c = 0; c < dicevalues.length; c++) {
    totaalPunten += dicevalues[c];
  }
  puntenTabel.geluk.innerText = totaalPunten;
}

function checkStraatKlein(teller) {
  return (
    (teller[0] > 0 && teller[1] > 0 && teller[2] > 0 && teller[3] > 0) ||
    (teller[1] > 0 && teller[2] > 0 && teller[3] > 0 && teller[4] > 0) ||
    (teller[2] > 0 && teller[3] > 0 && teller[4] > 0 && teller[5] > 0)
  );
}

function checkStraatGroot(teller) {
  return (
    (teller[0] > 0 &&
      teller[1] > 0 &&
      teller[2] > 0 &&
      teller[3] > 0 &&
      teller[4] > 0) ||
    (teller[1] > 0 &&
      teller[2] > 0 &&
      teller[3] > 0 &&
      teller[4] > 0 &&
      teller[5] > 0)
  );
}

button.addEventListener("click", roll);
dobbelSteen.forEach(function (dobbel, nummer) {
  dobbel.addEventListener("click", function () {
    hold(nummer);
  });
});

updateScherm();
