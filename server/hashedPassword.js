const bcrypt = require("bcryptjs");

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password:", hashedPassword);
}

console.log (hashPassword("test123"));
