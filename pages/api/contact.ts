import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message, to } = req.body;

  // Vérification des champs requis
  if (!name || !email || !subject || !message || !to) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  // Vérifie que "to" est un tableau
  if (!Array.isArray(to)) {
    return res.status(400).json({ message: 'Le champ "to" doit être un tableau' });
  }

  // Création du transporteur Nodemailer (via Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Envoi de l'e-mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to.join(', '),
      subject: `Nouveau message de ${name}: ${subject}`,
      text: `
Nom: ${name}
Email: ${email}
Sujet: ${subject}
Message: ${message}
      `,
      html: `
        <h3>Nouveau message de contact</h3>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // 🔐 Enregistrement dans un fichier JSON local
    const dataPath = path.join(process.cwd(), 'data', 'contact.json');
    const newEntry = {
      name,
      email,
      subject,
      message,
      date: new Date().toISOString(),
    };

    let entries = [];

    if (fs.existsSync(dataPath)) {
      const raw = fs.readFileSync(dataPath, 'utf-8');
      entries = JSON.parse(raw);
    }

    entries.push(newEntry);
    fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    fs.writeFileSync(dataPath, JSON.stringify(entries, null, 2));

    // ✅ Succès
    return res.status(200).json({ message: 'Message envoyé et sauvegardé.' });
  } catch (error) {
    console.error('Erreur lors de l’envoi du mail ou de l’enregistrement :', error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
}
