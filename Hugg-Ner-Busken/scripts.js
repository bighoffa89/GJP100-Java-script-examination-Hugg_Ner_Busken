// java-script GJP100
// modul 4
// Examinationsuppgiften
// Hugg Ner Busken
// Miakel Hoffsten
/*
####################################################################################################
Jag har följt och gjort en kurs från "wesbos" course #JavaScript30 
kurs 30: https://courses.wesbos.com/account/access/6555cf52ccc03d0024fb4b67/view/194158577
som går igenom hur man skapar ett whack a mole spel som jag använt kod av. Jag visar i min kod
genom att skriva (följt kurs!) sen visar jag orginal koden jag utgått ifrån. visas inom ###### ruta
####################################################################################################
*/
//===================================================================================================
//                   Inställningar och information
//===================================================================================================

// (inst) Står för inställningar och har olika variabler som har med
// inställningar att göra.
const inst = {};

inst.inforamtion = document.querySelector(".information");
inst.instälningar = document.querySelector(".instellningar");
inst.infoKnapp = document.querySelector(".knappInformation");
inst.inställningsknapp = document.querySelector(".inställningsknapp");
inst.lettknapp = document.querySelector(".latt");
inst.normalknapp = document.querySelector(".normal");
inst.svarknapp = document.querySelector(".svor");
inst.sec10knapp = document.querySelector(".sek10");
inst.sec30knapp = document.querySelector(".sek30");
inst.sec60knapp = document.querySelector(".sek60");

inst.tid = 10000; // <-- är hur länge spelet körs
inst.mintid = 200; // <-- är den minsta tiden för hur länge buskarna är framme
inst.maxtid = 1000; // <-- är den längsta tiden för hur länge buskarna är framme

inst.levelLett = 3;
inst.levelNormal = 2; // <-- står för hur mycket poäng man ska få för ett Grymt! spel (tid delat på 2)
inst.levelSvor = 1;
inst.svorhetsgrad = inst.levelNormal; // <-- om inget ändras så är svårhetsgraden normal.

//===================================================================================================
//funktioner för inställningar och information
//===================================================================================================

// funktionen tar fram och tar bort informations rutan samt ändrar om
// färgen på knappen så det syns att den är intryckt.

inst.informationRuta = function () {
  if (inst.inforamtion.style.display === "block") {
    inst.inforamtion.style.display = "none";
    inst.infoKnapp.style.backgroundColor = "lightgray";
  } else {
    inst.inforamtion.style.display = "block";
    inst.infoKnapp.style.backgroundColor = "gray";
  }
};

// funtionen tar fram eller bort inställnings rutan samt ändrar om
// färgen på knappen så det syns att den är intryckt.

inst.inställningRuta = function () {
  if (inst.instälningar.style.display === "block") {
    inst.instälningar.style.display = "none";
    inst.inställningsknapp.style.backgroundColor = "lightgray";
  } else {
    inst.instälningar.style.display = "block";
    inst.inställningsknapp.style.backgroundColor = "gray";
  }
};

// funktionerna nedan ställer in hur länge spelet ska köras och
// ändrar om färgen på knapparna för att visa vilken som är
// aktiv

inst.inställ10sec = function () {
  inst.sec10knapp.style.backgroundColor = "gray";
  inst.sec30knapp.style.backgroundColor = "lightgray";
  inst.sec60knapp.style.backgroundColor = "lightgray";
  //skickar minne till tidtavla att räkna ner från (10)
  return (inst.tid = 10000), (tidtavla.minneTidKvar = 10);
};
inst.inställ30sec = function () {
  inst.sec30knapp.style.backgroundColor = "gray";
  inst.sec10knapp.style.backgroundColor = "lightgray";
  inst.sec60knapp.style.backgroundColor = "lightgray";
  //skickar minne till tidtavla att räkna ner från (30)
  return (inst.tid = 30000), (tidtavla.minneTidKvar = 30);
};
inst.inställ60sec = function () {
  inst.sec60knapp.style.backgroundColor = "gray";
  inst.sec10knapp.style.backgroundColor = "lightgray";
  inst.sec30knapp.style.backgroundColor = "lightgray";
  //<-- skickar minne till tidtavla att räkna ner från (60)
  return (inst.tid = 60000), (tidtavla.minneTidKvar = 60);
};

// funktionerna nedan ställer in svårighetsgraden på spelet
// genom lätt normal och svår samt
// ändrar om färgen på knapparna för att visa vilken som är
// aktiv

inst.lett = function () {
  inst.lettknapp.style.backgroundColor = "gray";
  inst.normalknapp.style.backgroundColor = "lightgray";
  inst.svarknapp.style.backgroundColor = "lightgray";
  return (
    (inst.mintid = 800),
    (inst.maxtid = 2000),
    (inst.svorhetsgrad = inst.levelLett)
  );
};
inst.normal = function () {
  inst.normalknapp.style.backgroundColor = "gray";
  inst.lettknapp.style.backgroundColor = "lightgray";
  inst.svarknapp.style.backgroundColor = "lightgray";
  return (
    (inst.mintid = 225),
    (inst.maxtid = 1250),
    (inst.svorhetsgrad = inst.levelNormal)
  );
};
inst.svor = function () {
  inst.svarknapp.style.backgroundColor = "gray";
  inst.lettknapp.style.backgroundColor = "lightgray";
  inst.normalknapp.style.backgroundColor = "lightgray";
  return (
    (inst.mintid = 125),
    (inst.maxtid = 800),
    (inst.svorhetsgrad = inst.levelSvor)
  );
};
//===================================================================================================
//                         spel
//===================================================================================================

//(spel) rör saker som får själva spelet att fungera
const spel = {};

// var jag hittade ljuden https://freesound.org/people/AbdrTar/sounds/519985/

spel.startSlutLjud = document.querySelector("#startAndStopp");
spel.knappSpel = document.querySelector(".KnappSrata");
spel.buske = document.querySelectorAll(".buske");
spel.nerRäknare = document.querySelector(".nerRäknare");
spel.jordPlatser = document.querySelectorAll(".jord");
spel.förraJorden; //<-- fungerar som ett minne för att komma
//ihåg vilken jordhög som användes sist.

spel.slut = false; //<-- variablen som säger till när spelet är slut.
spel.poang = 0; //<-- poängen man får i spelet
spel.timer; //<-- nedräkningen innan spelet börjar
spel.brajobbat = false; //<-- om poängen är mer än svårighetsgraden blir den true.

//===================================================================================================
// funktioner för själva spelet
//===================================================================================================

// funktionen gör att start knappen förvinner och lägger in hur länge
// spelet ska spelas i xyminne från inställningar och skriver ut det till
// tidtavlan.tidKvar.
// Medans tid ställs på 3 och skriver ut det mitten av sidan och ställer
// om poängen till noll och sen startas en timer funktion

spel.startaSpel = function () {
  spel.brajobbat = false;
  spel.knappSpel.style.display = "none";
  poangTavla.poangTavla.style.color = "black"; // <-- återställer färgen till svart
  tidtavla.xyminne = tidtavla.minneTidKvar;
  tidtavla.tidKvar.textContent = tidtavla.xyminne;
  let tid = 3; // <--tiden det tar innan spelet startar
  spel.nerRäknare.textContent = tid;
  poangTavla.poangTavla.textContent = 0;
  // när timern når noll så stannar den timer funktionen och startar själva
  //spelet och den uppdateras varje sec för att visa nedräkningen.
  spel.timer = setInterval(function () {
    tid--;
    spel.nerRäknare.textContent = tid;

    if (tid === 0) {
      clearInterval(spel.timer);
      spel.spelStartar();
      spel.nerRäknare.textContent = "";
    }
  }, 1000); // Uppdatera varje sekund (1000 ms)
};

// (följt kurs!)
/*############################## Orginal kod #############
  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
  }
 ###########################################################
 */

//funktionen som startar spelet säger till att spelet inte är slut. Ställer in
// poängen på noll och startar-ned-räknare och startar kalla-buskar-upp
// start ljudet spelas

spel.spelStartar = function () {
  spel.slut = false;
  spel.poang = 0;
  tidtavla.startaNedräknare();
  spel.kallaBuskeUpp();
  spel.startSlutLjud.play();
  // när speltiden är slut ställs spel slut till true
  setTimeout(function () {
    spel.slut = true;
  }, inst.tid);
};

// (följt kurs!)
/*############################## Orginal kod ###############
  function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }
  ###########################################################*/

// funktionen kallar på en annan funktion som ger klassen upp till buskarna.
// sedan tar svårighetsgraden in från inställningar samt hämtar vilken
// jordhög plats busken ska komma upp på.
// startar en timer funktion.

spel.kallaBuskeUpp = function () {
  spel.skickaUppBuske(
    function () {
      return spel.slumpadTid(inst.mintid, inst.maxtid);
    },
    spel.slumpadeJordPlatser,
    spel.jordPlatser,
    function () {
      if (!spel.slut) {
        spel.kallaBuskeUpp();
      }
    }
  );
};

// funktionen hämtar informationen från funktionen ovan.

spel.skickaUppBuske = function (
  slumpadTidElement, // En funktion som returnerar en slumpmässig tid.
  slumpadElement, // En funktion som returnerar ett slumpmässigt element från en given lista.
  elementLista, // En lista av element där det slumpmässiga elementet kommer att visas.
  skickatillbaka //En callback-funktion som kommer att anropas när det slumpade elementet har visats och sedan försvunnit.
) {
  const time = slumpadTidElement();
  const buske = slumpadElement(elementLista);
  buske.classList.add("up"); // Lägger till CSS-klassen "up" till det slumpade Elementet

  setTimeout(function () {
    //vänta en viss tid (time) innan det slumpade elementet återgår till sitt ursprungliga tillstånd.
    buske.classList.remove("up");
    skickatillbaka();
  }, time);
};

// (följt kurs!)
/*############################## Orginal kod ###################################
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
##############################################################################*/

// funktionen räknar ut ett slumpat tal från inställningarna. Från max till minst
// tid det får ta för busken att komma upp och ner.

spel.slumpadTid = function (xmintid, xmaxtid) {
  const slumpadIntervalTid = Math.random() * (xmaxtid - xmintid);
  const minstaIntervalTiden = slumpadIntervalTid + xmintid;
  return Math.round(minstaIntervalTiden);
};

// (följt kurs!)
/*############################## Orginal kod ##########################
 function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      console.log('Ah nah thats the same one bud');
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }
  ###################################################################*/

// funktion som slumpar fram vilken plats busken ska komma upp på.

spel.slumpadeJordPlatser = function (jordar) {
  const idx = Math.floor(Math.random() * jordar.length);
  const jord = jordar[idx];

  // skulle busken slumpas ut till samma plats igen så ska den slumpas om
  if (jord === spel.förraJorden) {
    return spel.slumpadeJordPlatser(jordar);
  }

  spel.förraJorden = jord;
  return jord;
};

// (följt kurs!)
/*############################## Orginal kod ##########################
function bonk(e) {
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
//###################################################################*/

// funktionen som känner efter om man träffar busken med mus klick.
// och om man träffar
// så läggs det till ett poäng och tar bort classen "up" på busken
// så den åker ner.
// uppdaterar poäng tavlan för varje lyckad träff och spelar upp ljud

spel.hugg = function () {
  spel.poang++;
  // ljud fil
  // https://freesound.org/people/TheRealISA/sounds/580651/
  let huggLjud = document.querySelector("#spelHuggBuske");
  huggLjud.play();
  this.parentNode.classList.remove("up");
  // uträkning för tröskelvärdet man ska komma över
  let tröskelvärde = tidtavla.minneTidKvar / inst.svorhetsgrad;
  // om spelarens poäng är under svårhetsgradens nivå är poängen röd, om det är över blir det blå
  if (spel.poang > tröskelvärde) {
    poangTavla.poangTavla.style.color = "blue";
    spel.brajobbat = true; //<-- gör så att man får Grymt! meddelande när spelet är slut.
  } else {
    poangTavla.poangTavla.style.color = "red";
  }

  poangTavla.poangTavla.textContent = spel.poang;
};
//=================================================================================================
//                Tid Tavla
//=================================================================================================

// (tidtavla) rör själva tiden som är kvar när spelet är igång.

const tidtavla = {};
tidtavla.tidKvar = document.querySelector(".tidKvar");
tidtavla.minneTidKvar = 10; //<-- hur länge spelet ska spelas om inget ändrats.
tidtavla.xyminne;
tidtavla.poangfergtid;
tidtavla.nedräknare;

//===================================================================================================
// Funktion för tid tavla
//===================================================================================================

// när den startas så startar en timer funktion som räknar ner till noll samt
// uppdaterar texten i rutan. När den är klar så kommer start knappen fram
// igen och stannar timern
// om spelaren fått tillräckligt med poäng får man meddelandet Grymt!

tidtavla.startaNedräknare = function () {
  tidtavla.nedräknare = setInterval(function () {
    if (tidtavla.xyminne > 0) {
      tidtavla.xyminne--;
      tidtavla.tidKvar.textContent = tidtavla.xyminne;
    } else {
      spel.startSlutLjud.play();

      spel.knappSpel.style.display = "block";
      clearInterval(tidtavla.nedräknare);
      if (spel.brajobbat === true) spel.nerRäknare.textContent = "Grymt!";
    }
  }, 1000); // Uppdatera varje sekund (1000 ms)
};
//===================================================================================================
//===================================================================================================

// variablen vart man ska skicka poängen
const poangTavla = [];
poangTavla.poangTavla = document.querySelector(".poäng");

//===================================================================================================
// EventListeners
//===================================================================================================

//addEventListenes som lyssnar efter en händelse
inst.svarknapp.addEventListener("click", inst.svor);
inst.normalknapp.addEventListener("click", inst.normal);
inst.lettknapp.addEventListener("click", inst.lett);
inst.sec60knapp.addEventListener("click", inst.inställ60sec);
inst.sec30knapp.addEventListener("click", inst.inställ30sec);
inst.sec10knapp.addEventListener("click", inst.inställ10sec);
inst.inställningsknapp.addEventListener("click", inst.inställningRuta);
inst.infoKnapp.addEventListener("click", inst.informationRuta);
spel.knappSpel.addEventListener("click", spel.startaSpel);

// (fölt kurs!)
/*############################## Orginal kod #######################
moles.forEach(mole => mole.addEventListener('click', bonk));
###################################################################*/

spel.buske.forEach(function (buske) {
  buske.addEventListener("click", spel.hugg);
});
