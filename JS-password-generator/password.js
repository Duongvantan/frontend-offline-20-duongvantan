var elResult = document.getElementById("result");
var elResLength = document.getElementById("length");
var elRanLenght = document.getElementById("input-length");
var elNumber = document.getElementById("checkbox-numbers");
var elLetter = document.getElementById("checkbox-letters");
var elSymbol = document.getElementById("checkbox-symbols");
var elGenerate = document.getElementById("btn-generate")


var NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var SYMBOLS = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"];


elRanLenght.addEventListener("input", function () {
    elResLength.innerText = elRanLenght.value;
})

// var arrCenter = new Array();

// if(elNumber.checked === true){
//     arrCenter = arrCenter.concat(NUMBERS);
// }

// if(elLetter.checked === true){
//     arrCenter = arrCenter.concat(LETTERS);
// }

// if(elSymbol.checked === true){
//     arrCenter = arrCenter.concat(SYMBOLS);
// }

elGenerate.addEventListener("click", function () {
 
    var arrCenter = new Array();

if(elNumber.checked){
    arrCenter = arrCenter.concat(NUMBERS);
}

if(elLetter.checked){
    arrCenter = arrCenter.concat(LETTERS);
}

if(elSymbol.checked){
    arrCenter = arrCenter.concat(SYMBOLS);
}

var password = "";
    for(let i=0; i < elRanLenght.value; i++){
        var characterCode = arrCenter[Math.floor(Math.random() * arrCenter.length)];
        password += characterCode;
    }
    // console.log(arrCenter);
    elResult.innerText = password;
})