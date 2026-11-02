# NAYA IMMOBILIER — Plateforme Immobilière Moderne (Burkina Faso)

> **Concept de démonstration réalisé pour le portfolio de Ramde Studio.**  
> *Signature : « Le bon bien, au bon endroit. »*

Plateforme immobilière responsive (**mobile-first**) pensée pour le marché burkinabè (**Ouagadougou**, **Bobo-Dioulasso**, **Koudougou**). Elle permet de découvrir des biens (maisons, appartements, terrains, locaux commerciaux), de filtrer le catalogue selon de multiples critères en FCFA, de gérer ses favoris hors-compte (`localStorage`), de consulter des galeries plein écran et d'envoyer des demandes de visite ou des propositions de biens directement via **WhatsApp**.

---

## 1. Stack Technique & Dépendances

- **Framework** : Next.js 15 (App Router) + React 19
- **Typage** : TypeScript
- **Styles** : Tailwind CSS v4 + Design System personnalisé (`#F7F8F5`, `#214C3B`, `#D9BD91`)
- **Typographies** : `Manrope` (Titres & prix FCFA) & `DM Sans` (Corps de texte) via `next/font/google`
- **Animations** : `motion` (`motion/react`) + `gsap` (`@gsap/react`) avec prise en charge stricte de `prefers-reduced-motion`
- **Formulaires & Validation** : `react-hook-form` + `zod` + `@hookform/resolvers`
- **Icônes** : `lucide-react`

---

## 2. Architecture du Projet

```text
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout global (Polices, SEO, Header, Footer, Nav Mobile)
│   │   ├── page.tsx                # Page d'accueil complète (8 sections + recherche)
│   │   ├── globals.css             # Tokens du Design System NAYA IMMOBILIER
│   │   ├── biens/
│   │   │   ├── page.tsx            # Catalogue avec filtres combinables & tiroir mobile
│   │   │   └── [slug]/page.tsx     # Fiche détaillée + SEO dynamique + Galerie + Visite
│   │   ├── favoris/page.tsx        # Favoris persistants (localStorage)
│   │   ├── contact/page.tsx        # Demande de visite & Soumission Propriétaire
│   │   ├── sitemap.ts              # Sitemap XML dynamique
│   │   └── robots.ts               # Robots.txt
│   ├── components/
│   │   ├── layout/                 # Header, Footer, MobileBottomNav
│   │   ├── home/                   # Hero, Categories, WhyNaya, HowItWorks, OwnersCTA, FAQ
│   │   ├── search/                 # HeroSearchBar (Acheter, Louer, Terrains, Ville, Budget FCFA)
│   │   ├── filters/                # CatalogFilters (Sidebar desktop & Bottom Sheet mobile)
│   │   ├── property/               # PropertyCard, PropertyDetailClient
│   │   ├── gallery/                # PropertyGallery (Lightbox tactile & clavier)
│   │   ├── forms/                  # VisitRequestForm, OwnerSubmissionForm
│   │   └── ui/                     # Button, Badge
│   ├── config/
│   │   └── agency.ts               # Configuration centralisée (Agence, WhatsApp, Villes)
│   ├── data/
│   │   └── properties.ts           # 12 propriétés fictives de démonstration (FCFA)
│   ├── hooks/
│   │   ├── use-favorites.ts        # Hook localStorage synchronisé sans erreur SSR
│   │   └── use-properties.ts       # Hook d'accès et filtrage des propriétés
│   ├── lib/
│   │   ├── currency.ts             # Formatage FCFA déterministe
│   │   ├── filters.ts              # Logique de filtrage et tri
│   │   ├── whatsapp.ts             # Générateur de messages WhatsApp Click-to-Chat
│   │   └── utils.ts                # Utilitaire cn()
│   └── types/
│       └── property.ts             # Interfaces TypeScript
```

---

## 3. Lancement en Local

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

Pour tester le build de production :
```bash
npm run build
npm run start
```

---

## 4. Informations à Modifier Avant une Utilisation Réelle

1. **Configuration de l'agence (`src/config/agency.ts`)** :
   - Renseigner `contact.whatsappNumber` au format international sans `+` (ex: `"22670000000"`). Tant que ce champ est vide (`""`), l'application utilise le mode de partage WhatsApp (`api.whatsapp.com/send?text=...`) + copie en un clic pour tester les parcours sans inventer de numéro.
   - Mettre à jour `contact.email`, `socialLinks` et les horaires si nécessaire.
2. **Catalogue immobilier (`src/data/properties.ts`)** :
   - Remplacer les 12 biens de démonstration par les annonces réelles et leurs photographies définitives.
   - Retirer ou adapter le bandeau d'avertissement `demoDisclaimer` dans `src/config/agency.ts`.

---

## 5. Déploiement sur Vercel

1. Pousser le dépôt sur GitHub / GitLab.
2. Importer le projet dans [Vercel](https://vercel.com/new).
3. Framework Preset : **Next.js** (détecté automatiquement).
4. Cliquer sur **Deploy** (aucune variable d'environnement obligatoire pour cette version statique/locale).

