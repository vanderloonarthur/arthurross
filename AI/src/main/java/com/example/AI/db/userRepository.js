const db = require('./db'); // Assuming you have a db module to handle database connections

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [results] = await db.execute(query, [email]);
    return results;
};

const findUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [results] = await db.execute(query, [username]);
    return results;
};

const createUser = async (username, email, hashedPassword, verificationToken) => {
    const query = 'INSERT INTO users (username, email, password, verification_token) VALUES (?, ?, ?, ?)';
    await db.execute(query, [username, email, hashedPassword, verificationToken]);
};

const findUserByVerificationToken = async (token) => {
    const query = 'SELECT * FROM users WHERE verification_token = ?';
    const [results] = await db.execute(query, [token]);
    return results[0];
};

const verifyUser = async (userId) => {
    const query = 'UPDATE users SET verified = 1, verification_token = NULL WHERE id = ?';
    await db.execute(query, [userId]);
};

module.exports = {
    findUserByEmail,
    findUserByUsername,
    createUser,
    findUserByVerificationToken,
    verifyUser
};
