const fs = require('fs')

function readFile(){
    let rawdata = fs.readFileSync('./users.json');
    return JSON.parse(rawdata);
}

function writeToFile(entry) {
    fs.writeFileSync('users.json', JSON.stringify(entry, null, 2))
}

function isUserExists(phone) {
    let usersDB = readFile();
    for (let i = 0; i < usersDB.users.length; ++i) {
        const user = usersDB.users[i];

        if (user.phone === phone)
            return true;
    }
    return false;
}

function addUser(userData) {
    let usersDB = readFile();
    
    if (isUserExists(userData.phone) === true)
        return "Exists";

    usersDB.users.push(userData)
    writeToFile(usersDB)
}

function deleteUser(phone) {
    let usersDB = readFile();

    if (isUserExists(phone) !== true)
        return "Doesn't exists!";

    for (let i = 0; i < usersDB.users.length; ++i) {
        if (usersDB.users[i].phone === phone) {
            usersDB.users.splice(i, 1);
        }
    }

    writeToFile(usersDB)
}

function updateUser(userData) {
    let usersDB = readFile();

    if (isUserExists(userData.phone) !== true)
        return "Doesn't exists!";

    for (let i = 0; i < usersDB.users.length; ++i) {
        if (usersDB.users[i].phone === userData.phone) {
            usersDB.users[i] = userData;
        }
    }

    writeToFile(usersDB)
}

function getNumbersForGroup(groupName){
    let usersDB = readFile();
    let result = [];

    for (let i = 0; i < usersDB.users.length; ++i){
        if (usersDB.users[i].groups.includes(groupName))
            result.push(usersDB.users[i].phone)
    }
    return result
}

console.log(getNumbersForGroup("igel"))
