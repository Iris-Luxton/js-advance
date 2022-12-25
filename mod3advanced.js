// 1: Are counters independent?
//Here we make two counters: counter and counter2 using the same makeCounter function
//Are they independent? What is the second counter going to show? 0, 1 or 2, 3 or something else?

function questionOneAdvanced() {

    function makeCounter() {
        let count = 0;

        return function () {
            return count++;
        }
    }

    let counter = makeCounter();
    let counter2 = makeCounter();

    alert(counter()); // 0
    alert(counter()); // 1

    //Fill in the ?? with your guesses

    alert(counter2()); // ??
    alert(counter2()); // ??
}

// Functions counter and counter2 are created by different invocations of makeCounter. 
// So they have independent outer Lexical Environments, each one has its own count. 
// They may look similar but they get stored at different location in memory. 

// 2: Set and decrease counter?

//Modify the code of makeCounter() so that the counter can also decrease and set the number:
//counter.set(value) should set the counter to value
//counter.decrease() should decrease the counter by 1
// P.S. You can use either a closure or the function property to keep the current count. Or write both variants.

function questionTwoAdvanced() {

    //Modify makeCounter() to add the specifications written above
    function makeCounter() {
        let count = 0;
        function counter() { // this function is fancy object (quoted Seb)
            return count++;
        }
        counter.set = value => count = value;
        counter.decrease = () => count--;
        return counter;
    }

    let counter = makeCounter();

    if (counter() === 0) {
        console.log('Test 1 passed')
    } else {
        console.log('Test 1 failed')
    }

    if (counter() === 1) {
        console.log('Test 2 passed')
    } else {
        console.log('Test 2 failed')
    }

    //After test 2, the counter's count will be 2 (returns 1 and then increments)
    counter.decrease()
    //After the decrease, the counter's count will be 1

    if (counter() === 1) {
        console.log('Test 3 passed')
    } else {
        console.log('Test 3 failed')
    }

    counter.set(100)

    if (counter() === 100) {
        console.log('Test 4 passed')
    } else {
        console.log('Test 4 failed')
    }
}

// 3: Output every second

//Write a function printNumbers(from, to) that outputs a number every second,
//starting from 'from', and ending with 'to'.

//Make two variants of the solution
//1st Variant: Using setInterval
//2nd Variant: Using nested setTimeout

function questionThreeAdvancedp1() {
    function printNumbersOne(from, to) {
        // Write the setInterval variant code here
        // It is unlike setTimeout, which runs the function only once, it runs the function regularly after the given interval of time.
        let current = from;
        let timerId = setInterval(function () {
            console.log(current);
            if (current == to) {
                clearInterval(timerId);
            }
            current++;
        }, 1000);
    }
    printNumbersOne(1, 10);
}
function questionThreeAdvancedp2() {
    function printNumbersTwo(from, to) {
        // Write the nested setTimeout variant code here
        let current = from;
        setTimeout(function run() {
            console.log(current);
            ++current;
            if (current <= to) setTimeout(run, 1000);
        }, 1000)
    }
    printNumbersTwo(1, 10);
}

function questionThreeAdvancedp3() {
    function printRecursive(from, to) {
        if (from > to) return;
        console.log(from)
        setTimeout(printRecursive, 1000, from + 1, to)
    }
    // Start loop
    printRecursive(1, 10)
}

// 4: Debounce Decorator

//The result of debounce(f, ms) decorator is a wrapper that suspends calls to f
//until there's ms milliseconds of inactivity (no calls, "cooldown period"), then
//invokes f once with the latest arguments.

//In other words, debounce is like a secretary that accepts "phone calls", and waits
//until there's ms milliseconds of being quiet. And only then it transfers the latest
//call information to "the boss" (calls the actual f).

//For instance, we had a function f and replaced it with f = debounce(f, 1000).

//Then if the wrapped function is called at 0ms, 200ms and 500ms, and then
//there are no calls, then the actual f will be only called once, at 1500ms. 
//That is: after the cooldown period of 1000ms from the last call.

//...And it will get the arguments of the very last call, other calls are ignored.

//Here's some example code for it (uses the debounce decorator from the Lodash library)

function questionFourExampleAdvanced() {
    let f = _.debounce(alert, 1000);

    f("a");

    setTimeout(() => f("b"), 200);

    setTimeout(() => f("c"), 500);

    //debounced function waits 1000ms after the last call and then runs: alert("c")
}

function questionFourAdvanced() {

    //Write debounce code here
    function debounce(func, ms) {
        let timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, arguments), ms);
        };
    }

    let debouncedLog = debounce(console.log, 1000)

    debouncedLog("call 1") // call 1 is cancelled by call 2 at 800ms

    setTimeout(() => {
        debouncedLog("call 2")
    }, 800); //obviously less than 1000, this gets cancelled by call 3 at 1700-800=900ms 

    setTimeout(() => {
        debouncedLog("call 3")
    }, 1700); //does not get cancelled by call 4 (2750 - 1700 = 1050ms)

    setTimeout(() => {
        debouncedLog("call 4")
    }, 2750); //call 4 let call 3 finished

    setTimeout(() => {
        debouncedLog("call 5")
    }, 4000); //last argument will always get printed, because there is nothing to cancelled it
}

// 5: Partial application for login

//What should we pass askPassword in the code below, so that it calls
//user.login(true) as ok and user.login(false) as fail?

function questionFiveAdvanced() {

    function askPassword(ok, fail) {
        let password = prompt("Password?", '');
        if (password == "rockstar") ok();
        else fail();
    }

    let user = {
        name: 'John',
        login(result) {
            alert(this.name + (result ? ' logged in' : ' failed to log in'))
        }
    }
    //Your changes should only modify the commented code below
    //Before testing your code uncomment the line below
    askPassword(() => user.login(true), () => user.login(false)); //?
    // OR
    // askPassword(user.login.bind(user, true), user.login.bind(user, false));
}

// 6: Searching algorithm

//The task has two parts. Given the following objects

/*
let head = {
    glasses: 1
}

let table = {
    pen: 3
}

let bed = {
    sheet: 1,
    pillow: 2
}

let pockets = {
    money: 2000
}
*/

//a: Use __proto__ to assign prototypes in a way that any property lookup will follow the path: pockets - bed - table - head.
//For instance, pockets.pen should be 3 (found in table), and bed.glasses should be 1 (found in head)

//b: Answer the question: is it faster to get glasses as pockets.glasses or head.glasses?
//Benchmark if needed.

function questionSixAdvanced() {
    //Write code for a here
    let head = {
        glasses: 1
    };
    let table = {
        pen: 3,
        __proto__: head
    };
    let bed = {
        sheet: 1,
        pillow: 2,
        __proto__: table
    };
    let pockets = {
        money: 2000,
        __proto__: bed
    };
    alert(pockets.pen); // 3
    alert(bed.glasses); // 1
    alert(table.money); // undefined

    //Tests:
    if (pockets.pen === 3) {
        console.log("Test 1 passed")
    } else {
        console.log("Test 1 failed")
    }

    if (bed.glasses === 1) {
        console.log("Test 2 passed")
    } else {
        console.log("Test 2 failed")
    }

    if (table.money === undefined) {
        console.log("Test 3 passed")
    } else {
        console.log("Test 3 failed")
    }

    //Write answer for b here
    //Answer: head.glasses

}

// 7: Create an object with the same constructor

//Imagine, we have an arbitrary object obj, created by a constructor function -
//we don't know which one, but we'd like to create a new object using it.

//Can we do it like this?
//let obj2 = new obj.constructor();

//Give an example of a constructor function for obj which lets such code
//work right. And an example that makes it work wrong.

function questionSevenAdvanced() {
    //Write code here
    function User(name) {
        this.name = name;
        // this.constructor = false;
    }
    let user = new User('John');
    let user2 = new user.constructor('Pete');
    alert(user2.name); // Pete (worked!)
}

// 8: Add the decorating "defer()" to functions

//Add to the prototype of all functions the method defer(ms), that returns a wrapper
//delaying the call by ms milliseconds

//Here's an example of how it should work:

/*
function f(a, b) {
    alert( a + b );
}

f.defer(1000)(1, 2); //shows 3 after 1 second
*/

//Please note that the arguments should be passed to the original function

function questionEightAdvanced() {
    //Write defer code here
    // setTimeout(() => f.apply(this, args), ms);
    Function.prototype.defer = function (ms) {
        return (...args) => setTimeout(this, ms, ...args);
    };
    // check it
    function f(a, b) {
        console.log(a + b);
    }
    f.defer(1000)(1, 2); //shows 3 after 1 sec

    function sum(a, b) {
        console.log(a + b);
    }
    sum.defer(1000)(3, 4); //shows 3 after 1 second
}

// 9: Add toString to the dictionary
//There's an object dictionary, created as Object.create(null), to store any key/value pairs.
//Add method dictionary.toString() into it, that should return a comma-delimited list of keys.
//Your toString should not show up in for..in over the object.
//Here's how it should work:

function questionNineAdvanced() {
    // write your code to add dictionary.toString method here
    let dictionary = Object.create(null, { //null is prototype as it is not inherit from anything
        toString: { // toString is the key and the property of toString is value - which is a function
            value() { // in which it will print out all the keys and join them together into an Array
                return Object.keys(this).join();
            }
        } //using create to hide the toString 
        // property descriptor lesson note. 
    });
    dictionary.apple = "Apple";
    dictionary.__proto__ = "test";// __proto__ is a regular property key here
    // apple and __proto__ is in the loop
    for (let key in dictionary) {
        console.log(key); // "apple", then "__proto__"
    }
    console.log('Test 1 passed')
    // your toString in action
    for (let key in dictionary) {
        if (key === 'toString') {
            console.log('Test 1 failed. toString is showing up in for..in loop')
            return;
        }
    }

    console.log(dictionary); //Expected result: "apple,__proto__"
} // to be looked into by IOD - the result is not as expected

// 10: Extended Clock

//We've got a Clock class. As of now, it prints the time every second.

class Clock {
    constructor({ template }) {
        this.template = template;
    }
    render = () => {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output)
    }

    start = () => {
        this.render();
        this.timer = setInterval(this.render, 1000);
    }
    stop = () => {
        clearInterval(this.timer)
    }

}

//Create a new class ExtendedClock that inherits from Clock and adds the parameter precision - the number of ms between "ticks". 
//Should be 1000 - (1 seconds) by default.
//Don't modify the original Clock class. Extend it.

//Write ExtendedClock class here
class ExtendedClock extends Clock {
    constructor(options) {
        super(options);
        let { precision = 1000 } = options;
        this.precision = precision;
    }
    start() {
        this.render();
        this.timer = setInterval(() => this.render(), this.precision);
    }
};

function questionTenAdvanced() {
    const betterClock = new ExtendedClock({ precision: 2000, template: 'hh:mm:ss' });

    betterClock.start()

    setTimeout(() => betterClock.stop(), 10000)
    //This is weird, why does it log 11 times? So the precision doesnt work. 
    //Your ExtendedClock class worked if the clock logs 5 times over a 10 second period
}


// 11: Inherit from SyntaxError
//Create a class FormatError that inherits from the built-in SyntaxError class.
//It should support message, name, and stack properties.
//Usage example:

/*
let err = new FormatError("formating error");

alert( err.message ); //formatting error
alert( err.name ); //FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); //true (because inherits from SyntaxError)
*/

function questionElevenAdvanced() {
    //Write FormatError class code here
    class FormatError extends SyntaxError {
        constructor(message) {
            super(message);
            this.name = this.constructor.name;
        }
    }

    let err = new FormatError("formatting error");

    if (err.message === 'formatting error') {
        console.log("Test 1 passed")
    } else {
        console.log("Test 1 failed")
    }

    if (err.name === 'FormatError') {
        console.log("Test 2 passed")
    } else {
        console.log("Test 2 failed")
    }

    if (err instanceof SyntaxError === true) {
        console.log("Test 3 passed")
    } else {
        console.log("Test 3 failed")
    }
}

// 12: Delay with a promise

//The built-in function setTimeout uses callbacks. Create a promise-based alternative.

//The function delay(ms) should return a promise. That promise should resolve after ms
//milliseconds, so that we can add .then to it, like this:

function questionTwelveAdvanced() {
    function delay(ms) {
        //write your code here
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    delay(3000).then(() => alert('This alert should show after 3 seconds'))
}

// 13: Rewrite using async/await

//Rewrite this example code from the chapter Promises chaining using
//async/await instead of .then/.catch

/*
Example code:
function loadJson(url) {
    return fetch(url)
    .then(response => {
        if (response.status == 200) {
            return response.json();
        } else {
            throw new Error(response.status);
        }
    })
}

loadJson('no-such-user.json).catch(alert); //Error: 404
*/

function questionThirteenAdvanced() {
    //Write the async/await loadJson function here
    async function loadJson(url) { // (1)
        let response = await fetch(url); // (2)
        if (response.status == 200) {
            let json = await response.json(); // (3)
            return json;
        }
        throw new Error(response.status);
    }
    loadJson('no-such-user.json')
        .catch(alert); // Error: 404 (4)
    loadJson('no-such-user.json').catch(alert) //Code works if Error: 404 is displayed
}