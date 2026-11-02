import { Property } from "@/types/property";

export const DEMO_PROPERTIES: Property[] = [
  {
    id: "naya-01",
    slug: "villa-contemporaine-4-chambres-ouaga-2000",
    title: "Villa contemporaine de 4 chambres avec jardin arboré",
    description:
      "Villa lumineuse aux lignes épurées située dans un secteur calme d'Ouaga 2000, offrant de grands volumes de réception et une cour paysagée.",
    detailedDescription: {
      intro:
        "Conçue pour offrir un confort thermique naturel et une belle circulation de la lumière, cette villa contemporaine associe espaces de vie généreux et finitions soignées.",
      interiorSpaces: [
        "Double séjour traversant avec baies vitrées donnant sur la terrasse",
        "Cuisine moderne aménagée avec espace réserve / buanderie",
        "Suite principale avec dressing et salle d'eau privative",
        "Trois chambres secondaires climatisées avec placards intégrés",
        "Trois salles d'eau au total et toilettes visiteurs indépendantes",
      ],
      exteriorSpaces: [
        "Terrasse couverte ventilée donnant sur le jardin",
        "Cour pavée permettant le stationnement de 3 véhicules",
        "Guérite et dépendance arrière avec point d'eau",
      ],
      amenities: [
        "Climatisation split dans les pièces principales",
        "Chauffe-eau solaire installé",
        "Réserve d'eau avec suppresseur",
        "Pré-équipement groupe électrogène",
      ],
      particularities:
        "Accès aisé depuis les grands axes bitumés d'Ouaga 2000. Bien fictif de démonstration.",
    },
    transactionType: "vente",
    propertyType: "maison",
    city: "Ouagadougou",
    neighborhood: "Ouaga 2000",
    price: 125000000,
    surface: 420,
    bedrooms: 4,
    bathrooms: 3,
    features: [
      "Jardin arboré",
      "Chauffe-eau solaire",
      "Parking 3 véhicules",
      "Réserve d'eau",
      "Terrasse couverte",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
        alt: "Façade contemporaine de la villa à Ouaga 2000",
        caption: "Vue extérieure et jardin paysager",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        alt: "Espace de réception lumineux avec baies vitrées",
        caption: "Séjour principal ouvert sur la terrasse",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        alt: "Cuisine contemporaine équipée",
        caption: "Cuisine aménagée avec rangements",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        alt: "Chambre principale spacieuse",
        caption: "Suite parentale climatisée",
      },
    ],
    demoStatus: "Exemple de démonstration",
    publishedAt: "2026-10-28",
    featured: true,
    badge: "Coup de cœur",
  },
  {
    id: "naya-02",
    slug: "appartement-moderne-2-pieces-bobo-sarfalao",
    title: "Appartement moderne de 2 chambres avec balcon ventilé",
    description:
      "Appartement fonctionnel et bien éclairé situé à Sarfalao, pensé pour un cadre de vie pratique à proximité des commerces et axes principaux.",
    detailedDescription: {
      intro:
        "Situé au premier étage d'une petite résidence calme à Sarfalao, cet appartement propose un agencement bien pensé et une ventilation naturelle agréable.",
      interiorSpaces: [
        "Salon séjour lumineux donnant sur le balcon",
        "Deux chambres avec placards muraux",
        "Cuisine fermée avec paillasse carrelée et rangements",
        "Deux salles d'eau modernes",
      ],
      exteriorSpaces: [
        "Balcon privatif abrité du soleil direct",
        "Cour commune propre avec stationnement dédié",
      ],
      amenities: [
        "Brasseurs d'air et pré-installation climatisation",
        "Compteur électrique individuel Cash Power",
        "Accès sécurisé et gardiennage de nuit",
      ],
      particularities:
        "Idéal pour un couple ou un professionnel en poste à Bobo-Dioulasso. Bien fictif de démonstration.",
    },
    transactionType: "location",
    propertyType: "appartement",
    city: "Bobo-Dioulasso",
    neighborhood: "Sarfalao",
    price: 165000,
    pricePeriod: "mois",
    surface: 95,
    bedrooms: 2,
    bathrooms: 2,
    features: [
      "Balcon privatif",
      "Compteur individuel",
      "Parking résident",
      "Quartier calme",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
        alt: "Salon lumineux de l'appartement à Sarfalao",
        caption: "Séjour principal baigné de lumière naturelle",
      },
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
        alt: "Espace salle à manger et salon",
        caption: "Agencement fluide et fonctionnel",
      },
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
        alt: "Chambre principale claire",
        caption: "Chambre principale avec rangements",
      },
    ],
    demoStatus: "Exemple de démonstration",
    publishedAt: "2026-10-26",
    featured: true,
    badge: "Nouveau",
  },
  {
    id: "naya-03",
    slug: "maison-familiale-3-chambres-karpala-ouagadougou",
    title: "Maison familiale de 3 chambres sur parcelle clôturée",
    description:
      "Maison de plain-pied conviviale avec grande cour pavée à Karpala, idéale pour une vie de famille sereine à Ouagadougou.",
    detailedDescription: {
      intro:
        "Cette maison familiale met l'accent sur la praticité au quotidien : une distribution fluide de plain-pied, une cour spacieuse et une bonne autonomie en eau.",
      interiorSpaces: [
        "Séjour-salle à manger de bonne dimension",
        "Cuisine intérieure avec accès direct à la cour arrière",
        "Chambre principale autonome avec salle d'eau",
        "Deux chambres enfants partageant une salle d'eau",
      ],
      exteriorSpaces: [
        "Grande cour avant pavée et arborée",
        "Espace buanderie extérieur couvert",
        "Garage ouvert pour 2 voitures",
      ],
      amenities: [
        "Polytank avec château d'eau",
        "Panneaux solaires d'appoint pour l'éclairage",
        "Menuiseries aluminium avec grillages de protection",
      ],
      particularities:
        "Parcelle d'angle facilement accessible. Bien fictif de démonstration.",
    },
    transactionType: "vente",
    propertyType: "maison",
    city: "Ouagadougou",
    neighborhood: "Karpala",
    price: 58000000,
    surface: 300,
    bedrooms: 3,
    bathrooms: 2,
    features: [
      "Plain-pied",
      "Château d'eau",
      "Cour pavée",
      "Appoint solaire",
      "Garage 2 voitures",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80",
        alt: "Maison familiale avec cour à Karpala",
        caption: "Façade et cour pavée",
      },
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        alt: "Intérieur du salon familial",
        caption: "Espace séjour convivial",
      },
      {
        url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
        alt: "Chambre lumineuse",
        caption: "Chambre principale",
      },
    ],
    demoStatus: "Exemple de démonstration",
    publishedAt: "2026-10-24",
    featured: true,
  },
  {
    id: "naya-04",
    slug: "terrain-residentiel-viabilise-bobo-belle-ville",
    title: "Terrain résidentiel plat de 400 m² en zone dégagée",
    description:
      "Parcelle résidentielle bien délimitée située à Belle-Ville (Bobo-Dioulasso), prête à accueillir un projet de construction familiale.",
    detailedDescription: {
      intro:
        "Située dans un secteur en plein développement résidentiel de Belle-Ville, cette parcelle offre une topographie plane facilitant les travaux d'implantation.",
      interiorSpaces: [],
      exteriorSpaces: [
        "Terrain plat de 400 m² borné",
        "Accès par voie dégagée de 15 mètres",
        "Environnement calme composé de villas récentes",
      ],
      amenities: [
        "Réseau d'eau et d'électricité à proximité immédiate",
        "Repères de bornage visibles sur le terrain",
      ],
      particularities:
        "Terrain destiné à un usage d'habitation. Bien fictif de démonstration.",
    },
    transactionType: "vente",
    propertyType: "terrain",
    city: "Bobo-Dioulasso",
    neighborhood: "Belle-Ville",
    price: 14500000,
    surface: 400,
    features: [
      "Terrain plat",
      "Bornage visible",
      "Voie d'accès 15m",
      "Zone résidentielle",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
        alt: "Terrain résidentiel plat et dégagé",
        caption: "Vue d'ensemble de la zone résidentielle",
      },
      {
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
        alt: "Perspective du terrain au soleil couchant",
        caption: "Topographie plane propice à la construction",
      },
    ],
    demoStatus: "Exemple de démonstration",
    publishedAt: "2026-10-22",
    featured: true,
    badge: "Coup de cœur",
  },
  {
    id: "naya-05",
    slug: "local-commercial-vitrine-zone-du-bois-ouagadougou",
    title: "Local commercial avec façade vitrée sur axe passant",
    description:
      "Espace professionnel modulable en rez-de-chaussée à la Zone du Bois, offrant une excellente visibilité pour boutique, showroom ou agence.",
    detailedDescription: {
      intro:
        "Ce local commercial bénéficie d'un emplacement stratégique à la Zone du Bois avec une large vitrine en façade et une aire de stationnement client devant le bâtiment.",
      interiorSpaces: [
        "Plateau principal ouvert de 110 m² facilement cloisonnable",
        "Bureau de direction ou réserve arrière de 30 m²",
        "Bloc sanitaire interne avec point d'eau",
      ],
      exteriorSpaces: [
        "Façade vitrée sécurisée par rideau métallique",
        "Aire de stationnement frontale pour les visiteurs",
      ],
      amenities: [
        "Climatisation installée",
        "Éclairage LED professionnel",
        "Fibre optique disponible dans la rue",
      ],
      particularities:
        "Convient pour showroom, cabinet, agence de services ou commerce spécialisé. Bien fictif de démonstration.",
    },
    transactionType: "location",
    propertyType: "local-commercial",
    city: "Ouagadougou",
    neighborhood: "Zone du Bois",
    price: 450000,
    pricePeriod: "mois",
    surface: 140,
    bathrooms: 1,
    features: [
      "Façade vitrée",
      "Axe passant",
      "Stationnement clients",
      "Plateau modulable",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
        alt: "Espace intérieur du local commercial à la Zone du Bois",
        caption: "Plateau principal lumineux et modulable",
      },
      {
        url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
        alt: "Espace bureau et showroom",
        caption: "Configuration adaptée aux bureaux ou showrooms",
      },
    ],
    demoStatus: "Exemple de démonstration",
    publishedAt: "2026-10-20",
    featured: true,
  },
  {
    id: "naya-06",
    slug: "maison-a-louer-avec-cour-koudougou-secteur-1",
    title: "Maison à louer de 3 chambres avec cour ombragée",
    description:
      "Villa agréable et bien ventilée au Secteur 1 de Koudougou, disposant d'une grande véranda et d'une cour arborée.",
    detailedDescription: {
      intro:
        "Située à proximité des commodités du centre de Koudougou, cette maison offre un cadre de vie paisible avec une cour ombragée très appréciable.",
      interiorSpaces: [
        "Grand salon traversant",
        "Trois chambres confortables",
        "Cuisine interne avec rangements",
        "Deux salles d'eau",
      ],
      exteriorSpaces: [
        "Large véranda couverte en façade",
        "Cour fermée plantée de manguiers",
        "Abri voiture",
      ],
      amenities: [
        "Ventilateurs plafonniers dans toutes les pièces",
        "Réserve d'eau",
        "Compteur eau et électricité individuels",
      ],
      particularities:
        "Quartier résidentiel accessible toute l'année. Bien fictif de démonstration.",
    },
    transactionType: "location",
    propertyType: "maison",
    city: "Koudougou",
    neighborhood: "Secteur 1",
    price: 150000,
    pricePeriod: "mois",
    surface: 260,
    bedrooms: 3,
    bathrooms: 2,
    features: [
      "Cour ombragée",
      "Grande véranda",
      "Réserve d'eau",
      "Proche commodités",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
        alt: "Maison avec véranda et cour à Koudougou",
        caption: "Vue extérieure de la maison et de la terrasse",
      },
      {
        url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
        alt: "Espace intérieur lumineux",
        caption: "Pièce de vie principale",
      },
    ],
    demoStatus: "Exemple de démonstration",
    publishedAt: "2026-10-18",
    featured: true,
    badge: "Nouveau",
  },
  {
    id: "naya-07",
    slug: "studio-meuble-contemporain-patte-doie-ouagadougou",
    title: "Studio meublé fonctionnel avec terrasse privative",
    description:
      "Studio soigneusement aménagé à la Patte d'Oie, offrant un espace optimisé et calme pour les séjours professionnels ou résidentiels.",
    detailedDescription: {
      intro:
        "Ce studio meublé réunit dans un volume bien organisé un coin nuit confortable, un espace salon-bureau et une kitchenette équipée.",
      interiorSpaces: [
        "Pièce principale climatisée avec coin salon et espace nuit",
        "Kitchenette équipée (réfrigérateur, plaques, rangements)",
        "Salle d'eau contemporaine avec douche à l'italienne",
      ],
      exteriorSpaces: [
        "Petite terrasse privative donnant sur cour intérieure",
      ],
      amenities: [
        "Mobilier complet inclus",
        "Climatisation split",
        "Chauffe-eau individuel",
      ],
    },
    transactionType: "location",
    propertyType: "appartement",
    city: "Ouagadougou",
    neighborhood: "Patte d'Oie",
    price: 120000,
    pricePeriod: "mois",
    surface: 48,
    bedrooms: 1,
    bathrooms: 1,
    features: ["Meublé", "Climatisé", "Terrasse privative", "Accès rapide"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1400&q=80",
        alt: "Studio meublé moderne à Ouagadougou",
        caption: "Espace principal meublé et lumineux",
      },
      {
        url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80",
        alt: "Coin salon et kitchenette du studio",
        caption: "Aménagement intérieur optimisé",
      },
    ],
    demoStatus: "Exemple de démonstration",
    publishedAt: "2026-10-15",
    featured: false,
  },
  {
    id: "naya-08",
    slug: "parcelle-projet-commercial-route-ouaga-koudougou",
    title: "Parcelle d'angle de 600 m² pour projet commercial",
    description:
      "Terrain bien situé sur un axe dynamique de Koudougou, adapté à l'implantation d'un bâtiment commercial ou mixte.",
    detailedDescription: {
      intro:
        "Grâce à sa position en angle et sa façade généreuse sur une voie fréquentée, cette parcelle de 600 m² offre une belle visibilité pour un projet professionnel.",
      interiorSpaces: [],
      exteriorSpaces: [
        "Surface totale de 600 m² en angle de rue",
        "Double façade facilitant les accès véhicules et livraisons",
      ],
      amenities: [
        "Axe bitumé à proximité",
        "Terrain plat et dégagé",
      ],
    },
    transactionType: "vente",
    propertyType: "terrain",
    city: "Koudougou",
    neighborhood: "Axe Route de Ouaga",
    price: 24000000,
    surface: 600,
    features: ["Parcelle d'angle", "Double façade", "600 m²", "Fort potentiel"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1400&q=80",
        alt: "Parcelle dégagée à Koudougou",
        caption: "Emplacement dégagé à fort potentiel",
      },
    ],
    demoStatus: "Exemple de démonstration",
    publishedAt: "2026-10-12",
    featured: false,
  },
  {
    id: "naya-09",
    slug: "appartement-familial-3-chambres-ouaga-cissin",
    title: "Appartement familial de 3 chambres en résidence calme",
    description:
      "Grand appartement traversant situé à Cissin, combinant les volumes d'une maison et la simplicité d'entretien d'un appartement.",
    detailedDescription: {
      intro:
        "Pensé pour les familles souhaitant résider en appartement sans compromis sur l'espace, ce logement de 145 m² propose trois vraies chambres et un vaste séjour.",
      interiorSpaces: [
        "Séjour double avec balcon filant",
        "Trois chambres dont une suite parentale",
        "Grande cuisine avec buanderie attenante",
        "Deux salles d'eau et WC visiteurs",
      ],
      exteriorSpaces: [
        "Balcon sur rue calme",
        "Parking sécurisé en rez-de-cour",
      ],
      amenities: [
        "Surpresseur et réserve d'eau dédiée",
        "Gardiennage",
        "Climatisation dans la chambre principale",
      ],
    },
    transactionType: "location",
    propertyType: "appartement",
    city: "Ouagadougou",
    neighborhood: "Cissin",
    price: 250000,
    pricePeriod: "mois",
    surface: 145,
    bedrooms: 3,
    bathrooms: 2,
    features: [
      "Grand séjour",
      "Buanderie",
      "Parking sécurisé",
      "Réserve d'eau",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80",
        alt: "Grand salon d'appartement familial à Cissin",
        caption: "Séjour spacieux et lumineux",
      },
      {
        url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
        alt: "Cuisine familiale spacieuse",
        caption: "Cuisine avec nombreux rangements",
      },
    ],
    demoStatus: "Exemple de démonstration",
    publishedAt: "2026-10-10",
    featured: false,
  },
  {
    id: "naya-10",
    slug: "villa-duplex-espace-exterieur-bobo-kua",
    title: "Villa duplex de 4 chambres avec grand espace extérieur",
    description:
      "Belle propriété contemporaine située dans le quartier Kua à Bobo-Dioulasso, dotée d'une terrasse panoramique à l'étage.",
    detailedDescription: {
      intro:
        "Cette villa duplex offre une séparation harmonieuse entre les espaces de réception au rez-de-chaussée et l'espace nuit familial à l'étage.",
      interiorSpaces: [
        "Salon et salle à manger lumineux au rez-de-chaussée",
        "Une chambre d'amis au rez-de-chaussée avec salle d'eau",
        "Trois chambres à l'étage dont une suite principale",
        "Salon privé familial à l'étage",
      ],
      exteriorSpaces: [
        "Terrasse supérieure ouverte sur le quartier arboré de Kua",
        "Cour paysagée avec abri pour 2 véhicules",
      ],
      amenities: [
        "Climatisation intégrale",
        "Chauffe-eau solaire",
        "Château d'eau autonome",
      ],
    },
    transactionType: "vente",
    propertyType: "maison",
    city: "Bobo-Dioulasso",
    neighborhood: "Kua",
    price: 85000000,
    surface: 380,
    bedrooms: 4,
    bathrooms: 3,
    features: [
      "Architecture duplex",
      "Terrasse à l'étage",
      "Cour paysagée",
      "Chauffe-eau solaire",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
        alt: "Villa duplex contemporaine à Bobo-Dioulasso",
        caption: "Architecture contemporaine et volumes généreux",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        alt: "Séjour intérieur du duplex",
        caption: "Espace de vie du rez-de-chaussée",
      },
    ],
    demoStatus: "Exemple de démonstration",
    publishedAt: "2026-10-08",
    featured: false,
    badge: "Coup de cœur",
  },
  {
    id: "naya-11",
    slug: "terrain-residentiel-grande-superficie-ouagadougou",
    title: "Terrain résidentiel de 750 m² pour projet d'envergure",
    description:
      "Grande parcelle régulière offrant l'espace nécessaire pour une villa avec jardin ou un petit ensemble résidentiel en périphérie sud d'Ouagadougou.",
    detailedDescription: {
      intro:
        "D'une superficie rare de 750 m², ce terrain plat permet d'envisager une construction aérée avec de vastes espaces verts ou plusieurs logements.",
      interiorSpaces: [],
      exteriorSpaces: [
        "Surface rectangulaire de 750 m² (25m x 30m)",
        "Voie d'accès carrossable",
      ],
      amenities: [
        "Secteur calme en développement",
        "Bornage effectué",
      ],
    },
    transactionType: "vente",
    propertyType: "terrain",
    city: "Ouagadougou",
    neighborhood: "Périphérie Sud",
    price: 32000000,
    surface: 750,
    features: ["750 m²", "Format 25m x 30m", "Terrain plat", "Projet familial"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
        alt: "Grand terrain résidentiel de 750 m²",
        caption: "Grande superficie plane",
      },
    ],
    demoStatus: "Exemple de démonstration",
    publishedAt: "2026-10-05",
    featured: false,
  },
  {
    id: "naya-12",
    slug: "local-commercial-centre-ville-bobo-dioulasso",
    title: "Espace commercial de 85 m² au cœur de Bobo-Dioulasso",
    description:
      "Local professionnel bien situé au centre-ville de Bobo-Dioulasso, idéal pour une agence, un cabinet de conseil ou une boutique spécialisée.",
    detailedDescription: {
      intro:
        "Accessible directement depuis une rue commerçante active de Bobo-Dioulasso, cet espace offre une configuration simple et immédiatement opérationnelle.",
      interiorSpaces: [
        "Salle principale d'accueil de 60 m²",
        "Pièce arrière de 25 m² pour bureau privé ou stockage",
        "Toilettes internes",
      ],
      exteriorSpaces: [
        "Accès direct sur rue",
        "Emplacement enseigne en façade",
      ],
      amenities: [
        "Grilles de sécurité",
        "Compteur électrique indépendant",
        "Climatisation",
      ],
    },
    transactionType: "location",
    propertyType: "local-commercial",
    city: "Bobo-Dioulasso",
    neighborhood: "Centre-ville",
    price: 220000,
    pricePeriod: "mois",
    surface: 85,
    bathrooms: 1,
    features: [
      "Centre-ville",
      "Accès direct rue",
      "Bureau arrière",
      "Climatisé",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=80",
        alt: "Intérieur du local commercial à Bobo-Dioulasso",
        caption: "Espace d'accueil lumineux",
      },
    ],
    demoStatus: "Exemple de démonstration",
    publishedAt: "2026-10-02",
    featured: false,
  },
];

