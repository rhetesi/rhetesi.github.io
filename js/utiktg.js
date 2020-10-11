//Alapadatok definiálása (munkahely, Ft/km) költségtérítés megadása
let workCity = "Hévíz"; // Használni is kellene, ha már deklaráltad, sőt definiáltad is.
let forintKm = 9; // Később ehelyett is listából kellene választani.

// Hónapok neveinek és alap hosszuknak tömbökbe töltése
let monthName = ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"];
let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Alap dátumok beállítása: rendszerdátum és rendszeridő lekérdezése, lekérdezett hónap értékének áttöltése a date változóba, aktuláis hónap hosszának betöltése
// az actulMonthLength változóba, a monthLength tömbből a month változó értéke szerint kikeresett érték alapján
let date = new Date();

let today = date;
let todayDay = today.getDate();
let todayMonth = today.getMonth();
let todayYear = today.getFullYear();
let todayDate = today.setFullYear(todayYear, todayMonth, todayDay);
let actualYear = date.getFullYear();
let doneDate = todayDate;

//leapYear, azaz szökőév vizsgálata -- s elég egy sima if-else nem kell függvény (function) hozzá. Így szebb és rövidebb a kód!
let leapYear = actualYear;
if (leapYear = ((leapYear % 4 == 00 && leapYear % 100 != 0) || leapYear % 400 == 0)) {
  monthLength = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
} else monthLength = monthLength;

let month = date.getMonth();
month = month - 1; // EZT KELL kivenni és megcsinálni a hónap választást!!!!!
let actualMonth = month;
let actualMonthLength = monthLength[month];
let beforeMonth = actualMonth - 1;

//Január-ról decemberre visszalépés kezelése: változik a hónap, és az évszám is csökken!
if (beforeMonth < 0) {
  beforeMonth = 11;
  actualYear = actualYear - 1;
} else beforeMonth = beforeMonth; actualYear = actualYear

// nyomtatandók (már itt lehetne objektum és tömb) deklarálása, ezekbe szedjük majd össze az adatokat
var stringsToPrint;
var dataToPrint;
var dataToCalc;
var lastSelectedDay;

// createAnyElement függvény, bármely HTML elem létrehozásához
function createAnyElement(name, attributes) {
  let element = document.createElement(name);
  for (let k in attributes) {
    element.setAttribute(k, attributes[k]);
  }
  return element;
}

// Hónap napjainak megfelelő táblázat létrehozása, első oszlopban a napok innerHTML-be töltve, második oszlopban checkbox az adott nap kiválasztásához
// A hónap táblázat sorait hozzá kell rendelni a class="table table-striped" osztályokhoz
let table = document.querySelector("#gepjarmu");
let tBody = table.querySelector("tbody");
for (let i = 0; i < actualMonthLength; i++) {
  let tr = createAnyElement("tr");
  let td = createAnyElement("td");
  let day = i + 1;
  td.innerHTML = actualYear + ". " + monthName[month] + " " + day + ".";
  tr.appendChild(td);
  td = createAnyElement("td"/*, {class: "text-center"}*/);
  let checkBox = createAnyElement("input", {
    type: "checkbox",
    class: "form-check-input checkbox", /* a form-chek-input mit is csinál? */
    id: day,    
    name: `${actualYear}. ${month + 1}. ${day}.`, 
    value: date.setFullYear(actualYear, month, day)
  });
  td.appendChild(checkBox);
  tr.appendChild(td);
  tBody.appendChild(tr);
}
let tr = createAnyElement("tr");
let td = createAnyElement("td");
tr.appendChild(td);
td = createAnyElement("td");

let submit = createAnyElement("button", {
  type: "button",
  id: "print",
  name: "Print",
  class: "btn btn-outline-primary"
});
submit.innerHTML = "Nyomtatás";
td.appendChild(submit);
tr.appendChild(td);
tBody.appendChild(tr);

// "Nyomtatás" gomb megnyomására az adatok összeszedése
document.querySelector("#print").addEventListener("click", function () {
  stringsToPrint = {}; // az objektum kiürítése az adatgyűjtés előtt
  getStringsToPrint("input.nyomtatvany", stringsToPrint); // a nyomtatvány többi input field-jét RENDELD HOZZÁ a "nyomtatvany" osztályhoz!
  //console.log(stringsToPrint);
});


document.querySelector("#print").addEventListener("click", function () {
  dataToPrint = []; // a tömb kiürítése az adatgyűjtés előtt
  getDataToPrint("input.checkbox", dataToPrint);
  //console.log(dataToPrint);
});


document.querySelector("#print").addEventListener("click", function () {
  dataToCalc = [];
  getDataToCalc("input.checkbox", dataToCalc);
  //console.log(dataToCalc);
});


document.querySelector("#print").addEventListener("click", function () {
  //console.log(dataToPrint);
  //console.log(stringsToPrint);
  lastSelectedDay = dataToCalc[dataToCalc.length - 1];
  //console.log(lastSelectedDay);
  //console.log, date;
  //console.log(todayDate);
  
  if (new Date(lastSelectedDay).getMonth() < new Date(todayDate).getMonth()) {
    doneDate = todayDate
  } else if (lastSelectedDay != todayDate) {
    doneDate = lastSelectedDay
  } else doneDate = todayDate;

  //console.log(doneDate);

  doneDate = parseDate(doneDate);

  var dateOfPrint = "Hévíz, " + doneDate.getFullYear() + ". " + monthName[doneDate.getMonth()] + " " + doneDate.getDate() + ".";
  console.log(dateOfPrint);

  printForm("print.html", dataToPrint, stringsToPrint, dateOfPrint);

});

//Feltétel vizsgálat alapján 3 ciklus gyűjti az adatokat, kettő, ha az input mező checkbox osztály, harmadik, ha nem az
function getStringsToPrint(from, data) {
  let inputs = document.querySelectorAll(from);
  for (let i = 0; i < inputs.length; i++) {
    data[inputs[i].name] = inputs[i].value;
  }
  return data;
}

function getDataToPrint(from, data) {
  let inputs = document.querySelectorAll(from);
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      data.push(inputs[i].name);
    }
  }
  return data;
}

function getDataToCalc(from, data) {
  let inputs = document.querySelectorAll(from);
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      data.push(parseInt(inputs[i].value)); // parseInt-tel msec-ben, parseDate függvényeddel dátummá alakítva kapod
      //data.push(parseDate(inputs[i].value)
    }
  }
  return data;
}

function parseDate(data) {
  data = new Date(parseInt(data));
  return data;
}


function printForm(url, dataToPrint, stringsToPrint, dateOfPrint) { //Az adatokat is át kell adnod egy objektumban, nem csak az URL-t
  var printWindow = window.open(url/*, "Title"*/);

  printWindow.onload = function () {
    printWindow.document.getElementById('yearAndMonth').innerHTML = actualYear + ". " + monthName[actualMonth] + " hónap";
    printWindow.document.getElementById('nameAndAddress').innerHTML = "Név: " + stringsToPrint.employeename + " ; Lakcím: " + stringsToPrint.postcode + " " + stringsToPrint.city + ", " + stringsToPrint.address;
    printWindow.document.getElementById('carTypeAndPlate').innerHTML = "Személygépjármű típusa: " + stringsToPrint.cartype + " ; rendszáma: " + stringsToPrint.carplate;
  
    let printTableBody = printWindow.document.getElementById('printTableBody');
    
    let distance = parseFloat(stringsToPrint.distance);
    
    for (let i = 0; i < 31; i++) {

      if (i < dataToPrint.length) {
        let tr = createAnyElement("tr");
        let td = createAnyElement("td", {class: "text-right"});
        td.innerHTML = dataToPrint[i];
        tr.appendChild(td);
        td = createAnyElement("td", {class: "text-center"});
        td.innerHTML = stringsToPrint.city + " - Hévíz - " + stringsToPrint.city;
        tr.appendChild(td);
        td = createAnyElement("td", {class: "text-right"});
        fromAndToDistance = distance * 2;
        td.innerHTML = fromAndToDistance.toFixed(2);
        tr.appendChild(td);
        td = createAnyElement("td", {class: "text-right"});
        let kmPrice = distance * forintKm * 2;
        td.innerHTML = kmPrice.toFixed(2) + " Ft";
        tr.appendChild(td);
        printTableBody.appendChild(tr);
      } else {
        let tr = createAnyElement("tr");
        let td = createAnyElement("td");
        tr.appendChild(td);
        td = createAnyElement("td");
        tr.appendChild(td);
        td = createAnyElement("td");
        tr.appendChild(td);
        td = createAnyElement("td");
        tr.appendChild(td);
        printTableBody.appendChild(tr);
      }
    }

    let sumPrice = forintKm * distance * dataToPrint.length * 2;
    printWindow.document.getElementById('sumPrice').innerHTML = sumPrice.toFixed(2) + " Ft";

    printWindow.document.getElementById('date').innerHTML = dateOfPrint;
    printWindow.print();
    // printWindow.close(); // Ezt a kommentet élő kóddá kell alakítani, hogy a nyomtatást követően záródjon be
  }
}
