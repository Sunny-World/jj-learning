interface Person{
    firstName:string,
    lastName:string
}

function greeter(person:Person){
    return "Hello, " + person.firstName + " " + person.lastName;
}

let testName = { firstName: "Jane", lastName: "User" };

console.log(greeter(testName))