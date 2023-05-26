// Truy xuất đến 2 thẻ <input> numberOne và numberTwo "document.getElementById"
// Lấy giá trị ở 2 ô InPut ".value"

// Truy xuất đến button "sum"
// Đăng ký sự kiện "click" cho button "sum"
// Truy xuất đến thẻ h2.result
// Thực hiện tính và gán giá trị cho thẻ h2.result.

var elInput1 = document.getElementById('number-one');
var elInput2 = document.getElementById('number-two');
var elH2 = document.getElementById('result');
var elBtnSum = document.getElementById('btn-sum');
var elBtnSubtract = document.getElementById('btn-subtract');
var elBtnMultiply = document.getElementById('btn-multiply');
var elBtnDivide = document.getElementById('btn-divide');

function calculate(calculator = '+') {
    var value1 = elInput1.value;
    value1 = parseInt(value1);

    var value2 = elInput2.value;
    value2 = parseInt(value2);

    var result = 0;
    switch (calculator) {
        case '+':
            result = value1 + value2;
            break;
        case '-':
            result = value1 - value2;
            break;
        case 'X':
            result = value1 * value2;
            break;
        case '/':
            if (value2 != 0) {
                result = value1 / value2;
            } else {
                result = 'Không thực hiện được';
            }
            
            break;
    }
    elH2.innerText = 'Result: ' + result;
}

elBtnSum.addEventListener('click', function () {
    calculate('+');
})
elBtnSubtract.addEventListener('click', function () {
    calculate('-');
})
elBtnMultiply.addEventListener('click', function () {
    calculate('X');
})
elBtnDivide.addEventListener('click', function () {
    calculate('/');
})

