const db = require('../Services/Database');

// Récupère un utilisateur par email
async function findCredentialByEmail(email) {
  const sql = `SELECT id, email, password_hash, role FROM user_credentials WHERE email = ? LIMIT 1`;
  const rows = await db.query(sql, [email]);
  return rows[0] || null;
}

// Crée un nouvel utilisateur
async function createCredential({ email, passwordHash, role = 'user' }) {
  const sql = `
    INSERT INTO user_credentials (email, password_hash, role)
    VALUES (?, ?, ?)
  `;
  const result = await db.query(sql, [email, passwordHash, role]);
  return { id: result.insertId, email, role };
}

// Met à jour la dernière connexion
async function touchLastLogin(id) {
  const sql = `UPDATE user_credentials SET last_login_at = NOW() WHERE id = ?`;
  await db.query(sql, [id]);
}

module.exports = { findCredentialByEmail, createCredential, touchLastLogin };
