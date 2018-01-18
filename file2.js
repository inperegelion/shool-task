let fetch = require("node-fetch")


let a = 0;
let b = 0;
let resultArray = [];
let id = '';
let stack = [];
let i = 0;


function postfixCalc(expression) {
    stack = [];
    expression = expression.split(' ');
    for (i = 0; i < expression.length; i++) {
        switch (expression[i]) {
            case '+': // a-b
                b = stack.pop();
                a = stack.pop();
                stack.push(a - b);
                break;
            case '-': // a+b+8 
                b = stack.pop();
                a = stack.pop();
                stack.push(a + b + 8);
                break;
            case '*': // a%b
                b = stack.pop();
                a = stack.pop();
                if (b == 0) { stack.push(42); }
                else { stack.push(a % b); };
                break;
            case '/': // a/b
                b = stack.pop();
                a = stack.pop();
                if (b == 0) { stack.push(42) }
                else { stack.push(a / b); };
                break;
            default:
                stack.push(parseInt(expression[i]));
        };
    };
    return stack[0];
};




fetch('https://www.eliftech.com/school-task')
    .then(function (response) {
        return response.json();
    })
    .then(function (task) {
        for (let index = 0; index < task['expressions'].length; index++) {
            resultArray.push(postfixCalc(task['expressions'][index]));
        };
        id = task['id']
        return JSON.stringify({ id: task['id'], results: resultArray })
    })
    .then(function (calc) {
        fetch('https://www.eliftech.com/school-task', { method: 'POST', body: calc })
            .then(function (res) {
                console.log(res);
            })
    })

