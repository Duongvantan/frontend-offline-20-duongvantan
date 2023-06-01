var elHome = document.getElementById("score-home");
var elHome1 = document.getElementById("btn-home1");
var elHome2 = document.getElementById("btn-home2");
var elHome3 = document.getElementById("btn-home3");

var elAway = document.getElementById("score-away");
var elAway1 = document.getElementById("btn-away1");
var elAway2 = document.getElementById("btn-away2");
var elAway3 = document.getElementById("btn-away3");

var elClock = document.getElementById("clock");
var elStart = document.getElementById("btn-start");

// var scoreHome = Number(elHome.innerText);
var scoreHome = parseInt(elHome.innerText);
elHome1.addEventListener("click", function () {
    scoreHome = scoreHome + 1;
    elHome.innerText = setTwoDigit(scoreHome);
})

elHome2.addEventListener("click", function () {
    scoreHome = scoreHome + 2;
    elHome.innerText = setTwoDigit(scoreHome);
})

elHome3.addEventListener("click", function () {
    scoreHome = scoreHome + 3;
    elHome.innerText = setTwoDigit(scoreHome);
})

var scoreAway = parseInt(elAway.innerText);
elAway1.addEventListener("click", function () {
    scoreAway++;
    elAway.innerText = setTwoDigit(scoreAway);
})
elAway2.addEventListener("click", function () {
    scoreAway +=2;
    elAway.innerText = setTwoDigit(scoreAway);
})
elAway3.addEventListener("click", function () {
    scoreAway +=3;
    elAway.innerText = setTwoDigit(scoreAway);
})


elStart.addEventListener("click", function () {
    setTime();
})

function setTwoDigit(number) {
    if(number < 10) number = "0" + number;
    return number;
}
    var sec = 0;
    var min = 0;
    var pause;
function setTime() {
    sec++;
    if(sec == 60){
        min++;
        sec = 0;
    }
    if(min == 90){
        min = 0
        clearTimeout(pause);
    }
    elClock.innerText = setTwoDigit(min) + ":" + setTwoDigit(sec);
    pause = setTimeout("setTime()",1000);
}