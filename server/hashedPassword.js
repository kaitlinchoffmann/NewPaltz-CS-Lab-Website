const bcrypt = require("bcryptjs");

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password:", hashedPassword);
}

// Replace "yourpassword" with your desired password
hashPassword("admin123");
