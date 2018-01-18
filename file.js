var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let a = 0;
let b = 0;
let resultArray = [];
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
                stack.push(parseInt(a - b));
                break;
            case '-': // a+b+8 
                b = stack.pop();
                a = stack.pop();
                stack.push(parseInt(a + b + 8));
                break;
            case '*': // a%b
                b = stack.pop();
                a = stack.pop();
                if (b == 0) { stack.push(42); }
                else { stack.push(parseInt(a % b)); };
                break;
            case '/': // a/b
                b = stack.pop();
                a = stack.pop();
                if (b == 0) { stack.push(42) }
                else { stack.push(parseInt(a / b)); };
                break;
            default:
                stack.push(parseInt(expression[i]));
        };
    };
    return stack[0];
};

// taking task
var req = new XMLHttpRequest();
req.open("GET", "https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task", false);
req.send(null);
let task = JSON.parse(req.responseText);

// running alg for all expressions
for (let index = 0; index < task['expressions'].length; index++) {
    resultArray.push(postfixCalc(task['expressions'][index]));
};

//send result and check result
var res = new XMLHttpRequest();
res.open("POST", "https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task", false);
let sendingMessage = JSON.stringify({
    id: task['id'],
    results: resultArray,
});
console.log(sendingMessage);
res.send(sendingMessage);
console.log(' \n res status: ', res.status, res.statusText);
console.log('res.text: ', JSON.parse(res.responseText));

