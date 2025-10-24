const conn = require('../Services/Database');

// Récupère un utilisateur par email
function findCredentialByEmail(email) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT id, email, password_hash, role FROM user_credentials WHERE LOWER(email) = LOWER(?) LIMIT 1`;
    conn.query(sql, [email], (err, rows) => {
      if (err) {
        console.error('Erreur SQL dans findCredentialByEmail:', err);
        return reject(err);
      }
      resolve(rows && rows[0] ? rows[0] : null);
    });
  });
}

// Crée un nouvel utilisateur
function createCredential({ email, passwordHash, role = 'user' }) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO user_credentials (email, password_hash, role)
      VALUES (?, ?, ?)`;
    conn.query(sql, [email, passwordHash, role], (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId, email, role });
    });
  });
}

// Met à jour la dernière connexion
function touchLastLogin(id) {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE user_credentials SET last_login_at = NOW() WHERE id = ?`;
    conn.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}


module.exports = { findCredentialByEmail, createCredential, touchLastLogin };
