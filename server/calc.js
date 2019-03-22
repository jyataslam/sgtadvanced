
function doMath ( num1, num2, operator) {
    var mathObj = {
        'x': function( n1, n2 ){
            return n1 * n2;
        },
        '+': function( n1, n2 ){
            return n1 + n2;
        },
        '-': function( n1, n2 ){
            return n1 - n2;
        },
        '÷': function( n1, n2 ){
            return n1 / n2;
        }
    }
    return mathObj[operator](num1, num2);
} 

var number1 = parseInt(process.argv[2]);
var op = process.argv[3];
var number2 = parseInt(process.argv[4]);

var answer = doMath(number1, number2, op);
console.log(answer);