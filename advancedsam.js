// 1. You might learn a lot about the map method if you implement your own version of it. 
// It is recommended you use a for loop or Array.prototype.forEach().
// Write your own Array.prototype.myMap(), which should behave exactly like Array.prototype.map(). 
// You should not use the built-in map method. The Array instance can be accessed in the myMap method using this.

function question1() {
    Array.prototype.myMap = function (callback) {
        const newArray = [];
        // Only change code below this line
        this.forEach((element, index, originalArr) =>
            newArray.push(callback(element, index, originalArr))
        );
        // Only change code above this line
        return newArray;
    };
    // Only change code above this line
    console.log([23, 65, 98, 5, 13].myMap(item => item * 2)); // [46, 130, 196, 10, 26].
    console.log(["naomi", "quincy", "camperbot"].myMap(element => element.toUpperCase())); // ["NAOMI", "QUINCY", "CAMPERBOT"].
}

function question2() {
    // 2. Understand the Prototype Chain
    // All objects in JavaScript (with a few exceptions) have a prototype. Also, an object’s prototype itself is an object.
    function Bird(name) {
        this.name = name;
    }
    typeof Bird.prototype;
    // Because a prototype is an object, a prototype can have its own prototype! In this case, the prototype of Bird.prototype is Object.prototype:
    // Object.prototype.isPrototypeOf(Bird.prototype);
    // How is this useful? You may recall the hasOwnProperty method from a previous challenge:
    let duck = new Bird("Donald");
    duck.hasOwnProperty("name");
    // hasOwnProperty method is defined in Object.prototype, can be accessed by Bird.prototype, which can then be accessed by duck. 
    // This is an example of the prototype chain. 
    // In this prototype chain, Bird is the supertype for duck, while duck is the subtype. 
    // Object is a supertype for both Bird and duck. 
    // Object is a supertype for all objects in JavaScript. Therefore, any object can use the hasOwnProperty method.
    // Modify the code to show the correct prototype chain.
    function Dog(name) {
        this.name = name;
    }
    let beagle = new Dog("Snoopy");
    Dog.prototype.isPrototypeOf(beagle);  // yields true
    // Fix the code below so that it evaluates to true
    if (Object.prototype.isPrototypeOf(Dog.prototype) == true) {
        console.log('true')
    }
    else { console.log('false') };
}
function question3() {
    // 3. Understand Own Properties
    // In the following example, the Bird constructor defines two properties: name and numLegs:
    function Bird(name) {
        this.name = name;
        this.numLegs = 2;
    }
    let duck = new Bird("Donald");
    let canary = new Bird("Tweety");
    // name and numLegs are called own properties, because they are defined directly on the instance object. 
    // In fact every instance of Bird (like duck and canary) will have its own copy of these properties. 
    // The following code adds all of the own properties of duck to the array ownProps:
    let ownProps = [];
    for (let property in duck) {
        if (duck.hasOwnProperty(property)) {
            ownProps.push(property);
        }
    }
    console.log('These are properties of duck: ' + ownProps);
    // The console would display the value ["name", "numLegs"].
    // Add the own properties of canary to the array ownProps.
    let ownProps2 = [];
    // Only change code below this line
    for (let property in canary) {
        if (canary.hasOwnProperty(property)) {
            ownProps2.push(property);
        }
    }
    console.log('These are properties of canary: ' + ownProps2);
}

// 4 Use Prototype Properties to Reduce Duplicate Code
function question4() {
    // Since numLegs will probably have the same value for all instances of Bird, 
    // you essentially have a duplicated variable numLegs inside each Bird instance.
    // This may not be an issue when there are only two instances, but imagine if there are millions of instances. 
    // That would be a lot of duplicated variables. A better way is to use the prototype of Bird. 
    // Properties in the prototype are shared among ALL instances of Bird. 
    // Here's how to add numLegs to the Bird prototype:
    function Bird(name) {
        this.name = name;
    }
    Bird.prototype.numLegs = 2;
    let duck = new Bird("Donald");
    let canary = new Bird("Tweety");
    // If you add to the prototype, you add to all instances of Bird the numLegs property.
    console.log(duck.numLegs);
    console.log(canary.numLegs);
    // Since all instances automatically have the properties on the prototype, think of a prototype as a "recipe" for creating objects. 
    // Note that the prototype for duck and canary is part of the Bird constructor as Bird.prototype. 
    // Nearly every object in JavaScript has a prototype property which is part of the constructor function that created it.
    // Add a numLegs property to the prototype of Dog
    function Dog(name) {
        this.name = name;
    }
    // Only change code above this line
    let beagle = new Dog("Snoopy");
    Dog.prototype.numLegs = 4;
    console.log(beagle.numLegs);
}

// 5 Iterate Over All Properties
function question5() {
    // Own properties are defined directly on the object instance itself. And prototype properties are defined on the prototype.
    function Bird(name) {
        this.name = name;  //own property
    }
    Bird.prototype.numLegs = 2; // prototype property
    let duck = new Bird("Donald");
    // Here is how you add duck's own properties to the array ownProps and prototype properties to the array prototypeProps:
    let ownProps = [];
    let prototypeProps = [];
    for (let property in duck) {
        if (duck.hasOwnProperty(property)) {
            ownProps.push(property);
        } else {
            prototypeProps.push(property);
        }
    }
    console.log('These are properties of duck: ' + ownProps); // ["name"] 
    console.log('These are properties of duck: ' + prototypeProps); // ["numLegs"]
    // Add all of the own properties of beagle to the array ownProps. 
    // Add all of the prototype properties of Dog to the array prototypeProps.
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.numLegs = 4;
    let beagle = new Dog("Snoopy");
    let ownPropsbeagle = [];
    let prototypePropsbeagle = [];
    // Only change code below this line
    for (let property in beagle) {
        if (beagle.hasOwnProperty(property)) {
            ownPropsbeagle.push(property);
        } else {
            prototypePropsbeagle.push(property);
        }
    }
    console.log('These are properties of beagle: ' + ownPropsbeagle); // ["name"] 
    console.log('These are properties of beagle: ' + prototypePropsbeagle); // ["numLegs"]
}

// 6 Modify an Array Stored in an Object
function question6() {
    // Now you've seen all the basic operations for JavaScript objects. 
    // You can add, modify, and remove key-value pairs, check if keys exist, and iterate over all the keys in an object. 
    // As you continue learning JavaScript you will see even more versatile applications of objects. 
    // Additionally, the Data Structures lessons located in the Coding Interview Prep section of the curriculum also cover 
    // the ES6 Map and Set objects, both of which are similar to ordinary objects but provide some additional features. 
    // The user object contains three keys. The data key contains five keys, one of which contains an array of friends. 
    // From this, you can see how flexible objects are as data structures. We've started writing a function addFriend. 
    // Add the name of the friend argument to the array stored in user.data.friends and returns that array.
    let user = {
        name: 'Kenneth',
        age: 28,
        data: {
            username: 'kennethCodesAllDay',
            joinDate: 'March 26, 2016',
            organization: 'freeCodeCamp',
            friends: [
                'Sam',
                'Kira',
                'Tomo'
            ],
            location: {
                city: 'San Francisco',
                state: 'CA',
                country: 'USA'
            }
        }
    };
    function addFriend(userObj, friend) {
        // Only change code below this line
        userObj.data.friends.push(friend);
        return userObj.data.friends;
        // Only change code above this line
    }
    console.log(addFriend(user, 'Pete'));
}

// 7  Chunky Monkey
function question7() {

    // Write a function that splits an array (first argument) into groups the length of size (second argument) 
    // and returns them as a two-dimensional array.
    function chunkArrayInGroups(arr, size) {
        var group = [];
        while (arr.length > 0) {
            group.push(arr.splice(0, size));
        }
        return group;
    }
    var arr = ["a", "b", "c", "d"]
    console.log('This is before splice:' + arr);
    console.log(chunkArrayInGroups(arr, 2));
    console.log(chunkArrayInGroups(["a", "b", "c", "d"], 2));
    console.log('This is after splice:' + arr);
    // note that using splice will destroy the original array that it is called on. 
    // so if you dont want to destroy the original, let's use slice instead.
    function sliceArrayInGroups(arr, size) {
        const newArr = [];
        for (let i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }
    var arr2 = ["a", "b", "c", "d"]
    console.log('This is before slice:' + arr2);
    console.log(sliceArrayInGroups(arr2, 2));
    console.log(sliceArrayInGroups(["a", "b", "c", "d"], 2));
    console.log('This is after slice:' + arr2);
}

// 8 Change the Prototype to a New Object
function question8() {
    // Up until now you have been adding properties to the prototype individually:
    // This becomes tedious after more than a few properties.
    // A more efficient way is to set the prototype to a new object that already contains the properties. 
    // This way, the properties are added all at once:
    function Dog(name) {
        this.name = name; // own property
    }
    Dog.prototype = {
        // Only change code below this line
        numLegs: 4,
        eat: function () {
            console.log("nom nom nom");
        },
        describe: function () {
            console.log("My name is " + this.name);
        }
    };
    let beagle = new Dog("Snoopy");
    let ownProps = [];
    let prototypeProps = [];
    for (let property in beagle) {
        if (beagle.hasOwnProperty(property)) {
            ownProps.push(property);
        } else {
            prototypeProps.push(property);
        }
    }
    console.log('These are own properties of beagle: ' + ownProps);
    console.log('These are prototype properties of beagle: ' + prototypeProps);
}

// 9  Use Closure to Protect Properties Within an Object from Being Modified Externally
function question9() {
    // In the previous challenge, bird had a public property name. 
    // It is considered public because it can be accessed and changed outside of bird's definition.
    // Therefore, any part of your code can easily change the name of bird to any value. That could cause a lot of issues.
    // The simplest way to make this public property private is by creating a variable within the constructor function. 
    // This changes the scope of that variable to be within the constructor function versus available globally. 
    // This way, the variable can only be accessed and changed by methods also within the constructor function.
    // Here getHatchedEggCount is a privileged method, because it has access to the private variable hatchedEgg. 
    // This is possible because hatchedEgg is declared in the same context as getHatchedEggCount. 
    // In JavaScript, a function always has access to the context in which it was created. This is called closure.
    // Change how weight is declared in the Bird function so it is a private variable. 
    // Then, create a method getWeight that returns the value of weight 15.
    function Bird() {
        let hatchedEgg = 10;
        let weight = 15;
        this.getHatchedEggCount = function () {
            return hatchedEgg;
        };
        this.getWeight = function () {
            return weight;
        };
    }
    let ducky = new Bird();
    console.log(ducky.getHatchedEggCount());
    console.log(ducky.getWeight());
}