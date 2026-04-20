# 🚗 Commercial Pro — Infocom France

Application CRM commerciale mobile-first pour la vente d'espaces publicitaires sur véhicules municipaux.

## ✨ Fonctionnalités

- **📁 Dossiers** — Gestion multi-campagnes avec onglets
- **📄 Import PDF** — Extraction automatique des entreprises via Claude IA
- **🔍 Recherche gérant** — Identification du dirigeant avant chaque appel (data.gouv.fr + IA)
- **📞 Appel en 1 clic** — Lancement direct depuis l'iPhone (`tel:`)
- **✅ Checklist d'appel** — 7 étapes tirées du book Infocom (se remet à zéro à chaque appel)
- **🚫 Interdits** — Mots à bannir avec leur version correcte
- **💬 Objections** — 15 réponses officielles (book Télépro Infocom)
- **📋 Argumentaire** — Script complet Véhicule Transport de Personnes
- **📅 Post-appel** — RDV pris ? → export `.ics` calendrier iOS + email de confirmation auto
- **✉ Email type** — Modèle personnalisable avec variables `{NOM}`, `{DATE}`, `{HEURE}`, `{ADRESSE}`
- **☁️ Sync GitHub Gist** — Sauvegarde cloud des données
- **👤 Multi-profils** — Accès PIN par commercial
- **✦ Assistant IA** — Claude intégré pour analyse et conseils

## 🚀 Déploiement GitHub Pages

1. Créer un repo GitHub (ex: `commercial-pro`)
2. Uploader `index.html`
3. **Settings → Pages → Branch: main → / (root)**
4. URL générée : `https://[username].github.io/commercial-pro`

## 📱 Installation sur iPhone

1. Ouvrir l'URL dans Safari
2. Bouton partage → **"Ajouter à l'écran d'accueil"**
3. L'app s'ouvre en plein écran comme une app native

## 🔑 API Claude

L'app utilise l'API Anthropic directement depuis le navigateur.  
Aucune clé à configurer — l'authentification est gérée par le proxy Claude.ai.

## 📂 Structure

```
index.html   ← Application complète (fichier unique, autonome)
README.md    ← Ce fichier
```

---
*Infocom France — Commercial Pro v6*
