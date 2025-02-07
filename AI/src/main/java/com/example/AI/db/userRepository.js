const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost', // Update with your MySQL host
    user: 'root', // Update with your MySQL user
    password: 'password', // Update with your MySQL password
    database: 'arthurross' // Update with your MySQL database name
});

async function findUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows;
}

async function findUserByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows;
}

async function createUser(username, email, hashedPassword) {
    await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
}

module.exports = {
    findUserByEmail,
    findUserByUsername,
    createUser
};
