import { Pasta } from '../types';

export const PASTA_DATABASE: Pasta[] = [
  {
    id: '1',
    name: 'Tagliatelle',
    italianName: 'Tagliatelle',
    type: 'long',
    region: 'Emilia-Romagna',
    difficulty: 'beginner',
    equipment: ['Rolling Pin', 'Knife'],
    prepTime: 30,
    description: 'Long, flat ribbons of pasta, perfect for rich meat sauces like Bolognese.',
    history: 'Legend says tagliatelle was invented in 1487 by a chef inspired by Lucrezia Borgia\'s blonde hair.',
    instructions: [
      {
        stepNumber: 1,
        title: 'Make the dough',
        description: 'Mix 100g flour per egg, knead for 10 minutes until smooth and elastic.',
        tip: 'The dough should be firm but pliable, not sticky.'
      },
      {
        stepNumber: 2,
        title: 'Rest the dough',
        description: 'Wrap in plastic and rest for 30 minutes at room temperature.',
        tip: 'This allows the gluten to relax for easier rolling.'
      },
      {
        stepNumber: 3,
        title: 'Roll out thin',
        description: 'Roll dough to 2mm thickness, dusting with flour to prevent sticking.',
      },
      {
        stepNumber: 4,
        title: 'Cut into ribbons',
        description: 'Roll up the sheet loosely and cut into 6-8mm wide ribbons.',
      },
      {
        stepNumber: 5,
        title: 'Unravel and dry',
        description: 'Gently shake out the ribbons and let dry for 15 minutes before cooking.',
      }
    ],
    saucePairings: [
      { name: 'Ragù Bolognese', description: 'Classic meat sauce from Bologna', compatibility: 'excellent' },
      { name: 'Alfredo', description: 'Creamy butter and parmesan sauce', compatibility: 'excellent' },
      { name: 'Porcini Mushroom', description: 'Earthy mushroom cream sauce', compatibility: 'good' }
    ],
    recipes: [
      { id: 'r1', name: 'Tagliatelle al Ragù', imageUrl: 'https://picsum.photos/seed/tagliatelle1/300/200', prepTime: 180, difficulty: 'intermediate' },
      { id: 'r2', name: 'Tagliatelle ai Funghi Porcini', imageUrl: 'https://picsum.photos/seed/tagliatelle2/300/200', prepTime: 45, difficulty: 'beginner' }
    ],
    imageUrl: 'https://picsum.photos/seed/tagliatelle/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/tagliatelle/300/200',
    nutritionalInfo: {
      servingSize: '100g',
      calories: 371,
      protein: 13,
      carbs: 74,
      fat: 1.5
    },
    tags: ['classic', 'egg pasta', 'versatile']
  },
  {
    id: '2',
    name: 'Orecchiette',
    italianName: 'Orecchiette',
    type: 'short',
    region: 'Puglia',
    difficulty: 'intermediate',
    equipment: ['Knife'],
    prepTime: 45,
    description: 'Small ear-shaped pasta from Puglia, traditionally served with broccoli rabe.',
    history: 'Dating back to 12th century Puglia, these "little ears" were designed to catch chunky vegetable sauces.',
    instructions: [
      {
        stepNumber: 1,
        title: 'Make semolina dough',
        description: 'Mix semolina flour with water (no eggs), knead until smooth.',
      },
      {
        stepNumber: 2,
        title: 'Roll into rope',
        description: 'Roll dough into 1cm thick ropes.',
      },
      {
        stepNumber: 3,
        title: 'Cut small pieces',
        description: 'Cut rope into 1cm pieces.',
      },
      {
        stepNumber: 4,
        title: 'Shape with thumb',
        description: 'Press each piece with your thumb and drag to create the ear shape.',
        tip: 'Use a butter knife for extra texture on the ridged side.'
      }
    ],
    saucePairings: [
      { name: 'Cime di Rapa', description: 'Broccoli rabe with garlic and chili', compatibility: 'excellent' },
      { name: 'Tomato and Ricotta', description: 'Simple tomato sauce with creamy ricotta', compatibility: 'excellent' },
      { name: 'Sausage and Fennel', description: 'Italian sausage with fennel seeds', compatibility: 'good' }
    ],
    recipes: [
      { id: 'r3', name: 'Orecchiette con Cime di Rapa', imageUrl: 'https://picsum.photos/seed/orecchiette1/300/200', prepTime: 30, difficulty: 'beginner' }
    ],
    imageUrl: 'https://picsum.photos/seed/orecchiette/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/orecchiette/300/200',
    tags: ['puglia specialty', 'semolina', 'vegetable friendly']
  },
  {
    id: '3',
    name: 'Tortellini',
    italianName: 'Tortellini',
    type: 'filled',
    region: 'Emilia-Romagna',
    difficulty: 'advanced',
    equipment: ['Rolling Pin', 'Ravioli Stamp'],
    prepTime: 90,
    description: 'Ring-shaped stuffed pasta, traditionally filled with meat and served in broth.',
    history: 'Legend says tortellini was created to resemble Venus\'s navel. First documented in Bologna in the 12th century.',
    instructions: [
      {
        stepNumber: 1,
        title: 'Prepare the filling',
        description: 'Mix ground pork, prosciutto, mortadella, Parmigiano, egg, and nutmeg.',
        tip: 'Chill the filling for easier handling.'
      },
      {
        stepNumber: 2,
        title: 'Roll pasta thin',
        description: 'Roll egg pasta dough very thin (1mm) and cut into 4cm squares.',
      },
      {
        stepNumber: 3,
        title: 'Fill and fold',
        description: 'Place small amount of filling in center, fold diagonally to form triangle.',
      },
      {
        stepNumber: 4,
        title: 'Shape into ring',
        description: 'Wrap triangle around your finger and press ends together to form ring shape.',
        tip: 'Wet edges with water to help seal.'
      }
    ],
    saucePairings: [
      { name: 'Brodo (Broth)', description: 'Traditional chicken or beef broth', compatibility: 'excellent' },
      { name: 'Panna (Cream)', description: 'Simple cream sauce with butter', compatibility: 'good' },
      { name: 'Ragù', description: 'Meat-based tomato sauce', compatibility: 'good' }
    ],
    recipes: [
      { id: 'r4', name: 'Tortellini in Brodo', imageUrl: 'https://picsum.photos/seed/tortellini1/300/200', prepTime: 120, difficulty: 'intermediate' }
    ],
    imageUrl: 'https://picsum.photos/seed/tortellini/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/tortellini/300/200',
    tags: ['filled', 'traditional', 'christmas dish']
  },
  {
    id: '4',
    name: 'Pappardelle',
    italianName: 'Pappardelle',
    type: 'long',
    region: 'Tuscany',
    difficulty: 'beginner',
    equipment: ['Rolling Pin', 'Knife'],
    prepTime: 35,
    description: 'Wide, flat pasta ribbons from Tuscany, perfect for hearty meat sauces.',
    instructions: [
      {
        stepNumber: 1,
        title: 'Make egg dough',
        description: 'Mix flour and eggs, knead for 10 minutes.',
      },
      {
        stepNumber: 2,
        title: 'Rest dough',
        description: 'Let dough rest wrapped for 30 minutes.',
      },
      {
        stepNumber: 3,
        title: 'Roll thin sheets',
        description: 'Roll to 2mm thickness.',
      },
      {
        stepNumber: 4,
        title: 'Cut wide ribbons',
        description: 'Cut into 2-3cm wide ribbons.',
      }
    ],
    saucePairings: [
      { name: 'Wild Boar Ragù', description: 'Tuscan wild boar meat sauce', compatibility: 'excellent' },
      { name: 'Hare Ragù', description: 'Rich hare and red wine sauce', compatibility: 'excellent' },
      { name: 'Mushroom', description: 'Mixed wild mushroom sauce', compatibility: 'good' }
    ],
    recipes: [
      { id: 'r5', name: 'Pappardelle al Cinghiale', imageUrl: 'https://picsum.photos/seed/pappardelle1/300/200', prepTime: 150, difficulty: 'intermediate' }
    ],
    imageUrl: 'https://picsum.photos/seed/pappardelle/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/pappardelle/300/200',
    tags: ['wide', 'tuscan', 'game meats']
  },
  {
    id: '5',
    name: 'Trofie',
    italianName: 'Trofie',
    type: 'short',
    region: 'Liguria',
    difficulty: 'intermediate',
    equipment: ['None'],
    prepTime: 50,
    description: 'Short, twisted pasta from Liguria, traditionally served with pesto.',
    instructions: [
      {
        stepNumber: 1,
        title: 'Make simple dough',
        description: 'Mix flour and water (no eggs) to form firm dough.',
      },
      {
        stepNumber: 2,
        title: 'Cut small pieces',
        description: 'Roll into thin rope and cut 3-4cm pieces.',
      },
      {
        stepNumber: 3,
        title: 'Roll and twist',
        description: 'Roll each piece under your palm while twisting to create spiral shape.',
        tip: 'Press firmly and roll quickly for best results.'
      }
    ],
    saucePairings: [
      { name: 'Pesto Genovese', description: 'Basil, pine nuts, garlic, and parmesan', compatibility: 'excellent' },
      { name: 'Pesto with Potatoes', description: 'Traditional pesto with potatoes and green beans', compatibility: 'excellent' }
    ],
    recipes: [
      { id: 'r6', name: 'Trofie al Pesto', imageUrl: 'https://picsum.photos/seed/trofie1/300/200', prepTime: 25, difficulty: 'beginner' }
    ],
    imageUrl: 'https://picsum.photos/seed/trofie/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/trofie/300/200',
    tags: ['ligurian', 'pesto', 'twisted']
  },
  {
    id: '6',
    name: 'Gnocchi',
    italianName: 'Gnocchi',
    type: 'specialty',
    region: 'Veneto',
    difficulty: 'intermediate',
    equipment: ['Fork', 'Gnocchi Board'],
    prepTime: 60,
    description: 'Soft potato dumplings, a comfort food favorite across Italy.',
    instructions: [
      {
        stepNumber: 1,
        title: 'Cook potatoes',
        description: 'Boil potatoes until tender, then peel and mash while hot.',
        tip: 'Use starchy potatoes like russet for best texture.'
      },
      {
        stepNumber: 2,
        title: 'Mix dough',
        description: 'Add flour and egg to warm potato, mix gently until just combined.',
        tip: 'Don\'t overwork or gnocchi will be tough.'
      },
      {
        stepNumber: 3,
        title: 'Roll and cut',
        description: 'Roll into 2cm ropes, cut into 2cm pieces.',
      },
      {
        stepNumber: 4,
        title: 'Create ridges',
        description: 'Roll each piece on gnocchi board or fork to create ridges.',
      }
    ],
    saucePairings: [
      { name: 'Sage Butter', description: 'Brown butter with fresh sage', compatibility: 'excellent' },
      { name: 'Tomato Basil', description: 'Simple tomato sauce with basil', compatibility: 'excellent' },
      { name: 'Gorgonzola Cream', description: 'Creamy blue cheese sauce', compatibility: 'good' }
    ],
    recipes: [
      { id: 'r7', name: 'Gnocchi alla Sorrentina', imageUrl: 'https://picsum.photos/seed/gnocchi1/300/200', prepTime: 45, difficulty: 'beginner' }
    ],
    imageUrl: 'https://picsum.photos/seed/gnocchi/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/gnocchi/300/200',
    tags: ['potato', 'dumplings', 'comfort food']
  },
  {
    id: '7',
    name: 'Lasagne',
    italianName: 'Lasagne',
    type: 'sheet',
    region: 'Emilia-Romagna',
    difficulty: 'beginner',
    equipment: ['Rolling Pin'],
    prepTime: 40,
    description: 'Wide, flat pasta sheets used for layered baked dishes.',
    instructions: [
      {
        stepNumber: 1,
        title: 'Make pasta dough',
        description: 'Mix eggs and flour, knead until smooth.',
      },
      {
        stepNumber: 2,
        title: 'Rest dough',
        description: 'Wrap and rest for 30 minutes.',
      },
      {
        stepNumber: 3,
        title: 'Roll thin',
        description: 'Roll or use pasta machine to create thin sheets (1-2mm).',
      },
      {
        stepNumber: 4,
        title: 'Cut to size',
        description: 'Cut sheets to fit your baking dish.',
        tip: 'Blanch sheets in boiling water for 30 seconds before layering.'
      }
    ],
    saucePairings: [
      { name: 'Bolognese & Béchamel', description: 'Classic meat sauce with white sauce', compatibility: 'excellent' },
      { name: 'Ricotta & Spinach', description: 'Vegetarian filling with cheese', compatibility: 'excellent' }
    ],
    recipes: [
      { id: 'r8', name: 'Lasagne Bolognese', imageUrl: 'https://picsum.photos/seed/lasagne1/300/200', prepTime: 180, difficulty: 'intermediate' }
    ],
    imageUrl: 'https://picsum.photos/seed/lasagne/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/lasagne/300/200',
    tags: ['sheets', 'baked', 'layered']
  },
  {
    id: '8',
    name: 'Strozzapreti',
    italianName: 'Strozzapreti',
    type: 'short',
    region: 'Emilia-Romagna',
    difficulty: 'intermediate',
    equipment: ['None'],
    prepTime: 45,
    description: 'Hand-rolled twisted pasta, whose name means "priest strangler".',
    history: 'Legend says wives made this pasta so delicious that priests would eat too quickly and choke.',
    instructions: [
      {
        stepNumber: 1,
        title: 'Make dough',
        description: 'Mix flour and water to create firm dough.',
      },
      {
        stepNumber: 2,
        title: 'Roll strips',
        description: 'Roll small pieces into thin strips about 10cm long.',
      },
      {
        stepNumber: 3,
        title: 'Twist',
        description: 'Twist each strip to create spiral shape, roll between palms.',
      }
    ],
    saucePairings: [
      { name: 'Tomato and Sausage', description: 'Hearty tomato sauce with Italian sausage', compatibility: 'excellent' },
      { name: 'Arrabbiata', description: 'Spicy tomato sauce', compatibility: 'good' }
    ],
    recipes: [
      { id: 'r9', name: 'Strozzapreti al Ragù', imageUrl: 'https://picsum.photos/seed/strozzapreti1/300/200', prepTime: 60, difficulty: 'beginner' }
    ],
    imageUrl: 'https://picsum.photos/seed/strozzapreti/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/strozzapreti/300/200',
    tags: ['twisted', 'hand-rolled', 'rustic']
  },
  {
    id: '9',
    name: 'Agnolotti',
    italianName: 'Agnolotti',
    type: 'filled',
    region: 'Piedmont',
    difficulty: 'advanced',
    equipment: ['Rolling Pin', 'Knife'],
    prepTime: 90,
    description: 'Small filled pasta from Piedmont, traditionally stuffed with meat or vegetables.',
    instructions: [
      {
        stepNumber: 1,
        title: 'Prepare filling',
        description: 'Mix roasted meat, vegetables, and cheese for filling.',
      },
      {
        stepNumber: 2,
        title: 'Roll thin pasta',
        description: 'Roll egg pasta very thin.',
      },
      {
        stepNumber: 3,
        title: 'Pipe filling',
        description: 'Pipe small mounds of filling in rows on pasta sheet.',
      },
      {
        stepNumber: 4,
        title: 'Fold and cut',
        description: 'Fold sheet over, press between mounds, cut into squares or half-moons.',
      }
    ],
    saucePairings: [
      { name: 'Butter and Sage', description: 'Simple sage-infused butter', compatibility: 'excellent' },
      { name: 'Meat Jus', description: 'Rich roasted meat juices', compatibility: 'excellent' }
    ],
    recipes: [
      { id: 'r10', name: 'Agnolotti del Plin', imageUrl: 'https://picsum.photos/seed/agnolotti1/300/200', prepTime: 120, difficulty: 'advanced' }
    ],
    imageUrl: 'https://picsum.photos/seed/agnolotti/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/agnolotti/300/200',
    tags: ['filled', 'piemontese', 'delicate']
  },
  {
    id: '10',
    name: 'Paccheri',
    italianName: 'Paccheri',
    type: 'short',
    region: 'Campania',
    difficulty: 'beginner',
    equipment: ['Rolling Pin', 'Knife'],
    prepTime: 40,
    description: 'Large tube-shaped pasta from Campania, perfect for chunky sauces.',
    history: 'Originally created to smuggle garlic cloves from Italy to Prussia, hidden inside the large tubes.',
    instructions: [
      {
        stepNumber: 1,
        title: 'Make semolina dough',
        description: 'Mix semolina flour with water, knead until smooth.',
      },
      {
        stepNumber: 2,
        title: 'Roll into sheet',
        description: 'Roll dough into 3-4mm thick sheet.',
      },
      {
        stepNumber: 3,
        title: 'Cut rectangles',
        description: 'Cut into rectangles about 4cm x 6cm.',
      },
      {
        stepNumber: 4,
        title: 'Form tubes',
        description: 'Wrap each rectangle around a dowel or finger to form tube, seal edge.',
      }
    ],
    saucePairings: [
      { name: 'Seafood', description: 'Fresh clams, mussels, and tomatoes', compatibility: 'excellent' },
      { name: 'Neapolitan Ragù', description: 'Slow-cooked tomato and meat sauce', compatibility: 'excellent' },
      { name: 'Eggplant and Ricotta', description: 'Fried eggplant with creamy ricotta', compatibility: 'good' }
    ],
    recipes: [
      { id: 'r11', name: 'Paccheri allo Scoglio', imageUrl: 'https://picsum.photos/seed/paccheri1/300/200', prepTime: 45, difficulty: 'intermediate' }
    ],
    imageUrl: 'https://picsum.photos/seed/paccheri/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/paccheri/300/200',
    tags: ['large tubes', 'campanian', 'seafood']
  },
];

// Helper functions for filtering
export function getPastaByRegion(region: string): Pasta[] {
  return PASTA_DATABASE.filter(p => p.region === region);
}

export function getPastaByType(type: string): Pasta[] {
  return PASTA_DATABASE.filter(p => p.type === type);
}

export function getPastaByDifficulty(difficulty: string): Pasta[] {
  return PASTA_DATABASE.filter(p => p.difficulty === difficulty);
}

export function getPastaById(id: string): Pasta | undefined {
  return PASTA_DATABASE.find(p => p.id === id);
}
