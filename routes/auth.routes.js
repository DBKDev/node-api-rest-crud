const express = require('express');
const bcrypt = require('bcryptjs');
const { signAuth } = require('../Services/jwt.service');
const credService = require('../Services/CredentialService')

const router = express.Router();

/**
 * POST /auth/register
 * Body: { email, password, signupCode }
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, signupCode } = req.body || {};

    if (!email || !password || !signupCode) {
      return res.status(400).json({ error: 'email, password et signupCode sont requis' });
    }

    if (signupCode !== process.env.SIGNUP_CODE) {
      return res.status(403).json({ error: 'Accès refusé' });
    }

    const existing = await credService.findCredentialByEmail(email);
    if (existing) return res.status(409).json({ error: 'Identifiants invalides' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await credService.createCredential({ email, passwordHash });

    const token = signAuth({ sub: user.id, role: user.role });
    return res.status(201).json({ message: 'Utilisateur créé', token });
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * POST /auth/login
 * Body: { email, password }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'email et password requis' });
    }

    const cred = await credService.findCredentialByEmail(email);
    if (!cred) return res.status(401).json({ error: 'Identifiants invalides' });

    const ok = await bcrypt.compare(password, cred.password_hash);
    if (!ok) return res.status(401).json({ error: 'Identifiants invalides' });

    await credService.touchLastLogin(cred.id);
    const token = signAuth({ sub: cred.id, role: cred.role });

    return res.json({ token });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
