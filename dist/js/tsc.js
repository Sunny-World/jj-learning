"use strict";
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var testName = { firstName: "Jane", lastName: "User" };
console.log(greeter(testName));
