# Pastapedia 🍝

A beautiful native mobile app for learning and tracking homemade pasta shapes, built with Expo and React Native.

## Features

- **Browse Pasta Catalog**: Explore 10 authentic Italian pasta shapes with detailed information
- **Track Progress**: Mark pasta shapes as made and track your pasta-making journey
- **Achievement System**: Unlock achievements as you master different pasta types
- **Light & Dark Mode**: Beautiful themes that adapt to your preference
- **Regional Guide**: Learn pasta from all regions of Italy
- **Step-by-Step Instructions**: Detailed making instructions for each pasta shape

## Tech Stack

- **Expo SDK 54** - React Native framework
- **TypeScript** - Type-safe development
- **Expo Router** - File-based routing and navigation
- **Zustand** - Lightweight state management
- **AsyncStorage** - Local data persistence
- **NativeWind** - Tailwind CSS for React Native
- **React Native Reanimated** - Smooth animations
- **Expo Haptics** - Tactile feedback

## Getting Started

### Prerequisites

- Node.js 20+ (you have v20.10.0 - should work despite warnings)
- npm or yarn
- Expo Go app on your phone (iOS or Android)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## Project Structure

```
pastapedia/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Home/Dashboard
│   │   ├── browse.tsx     # Browse pasta shapes
│   │   ├── progress.tsx   # Progress tracking
│   │   └── profile.tsx    # Settings
│   ├── pasta/[id].tsx     # Pasta detail (dynamic route)
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── cards/            # PastaCard, etc.
│   ├── badges/           # DifficultyBadge, etc.
│   ├── buttons/          # Button
│   └── layout/           # Screen wrapper
├── contexts/             # React contexts (Theme, Pasta, Progress)
├── hooks/                # Custom hooks
├── constants/            # Design system (colors, typography, spacing)
├── data/                 # Pasta database and achievements
├── types/                # TypeScript interfaces
└── utils/                # Helper functions
```

## Design System

### Colors
- **Primary**: Olive green (#8B9556)
- **Secondary**: Terracotta (#D4845C)
- **Accent**: Pasta yellow (#F4D19B)
- **Background**: Warm cream (#FFF8F0) / Dark brown (#1A1410)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **UI/Labels**: Montserrat (geometric sans-serif)

### Spacing
Based on 4px/8px grid system

## Data Structure

### Pasta Shapes (10 included)
1. **Tagliatelle** - Emilia-Romagna - Long - Beginner
2. **Orecchiette** - Puglia - Short - Intermediate
3. **Tortellini** - Emilia-Romagna - Filled - Advanced
4. **Pappardelle** - Tuscany - Long - Beginner
5. **Trofie** - Liguria - Short - Intermediate
6. **Gnocchi** - Veneto - Specialty - Intermediate
7. **Lasagne** - Emilia-Romagna - Sheet - Beginner
8. **Strozzapreti** - Emilia-Romagna - Short - Intermediate
9. **Agnolotti** - Piedmont - Filled - Advanced
10. **Paccheri** - Campania - Short - Beginner

## Achievements

- 🎉 **First Steps**: Make your first pasta
- 👨‍🍳 **Pasta Apprentice**: Make 5 shapes
- 👑 **Pasta Master**: Make all 10 shapes
- 🍝 **Emilia-Romagna Expert**: Master all shapes from the region
- 🎓 **Beginner Graduate**: Complete all beginner shapes
- And more!

## Features Not Yet Implemented

- **AI Ingredient Matcher**: Requires backend API (separate repo)
- **Italy Map View**: Interactive SVG map (SVG coordinates needed)
- **Custom Fonts**: Download fonts from Google Fonts and add to assets/fonts/
- **Recipe Integration**: Full cooking instructions beyond pasta making
- **User Photos**: Camera integration for completed pastas

## Next Steps

1. **Add Custom Fonts**: Download and add Playfair Display, Inter, and Montserrat fonts to `assets/fonts/`
2. **Expand Pasta Database**: Add 20-40 more pasta shapes to reach target of 30-50
3. **Italy Map**: Research and add SVG coordinates for Italian regions
4. **More Achievements**: Add additional achievement types
5. **Animations**: Add entrance animations, transitions, and haptic feedback enhancements
6. **Backend**: Build Node.js + Express + Claude API for AI ingredient matcher (separate repo)

## Development

### Run on iOS Simulator
```bash
npx expo start --ios
```

### Run on Android Emulator
```bash
npx expo start --android
```

### Build for Production
```bash
eas build --platform ios
eas build --platform android
```

## Contributing

This is a portfolio project showcasing mobile development skills. Feel free to fork and customize!

## License

MIT

## Author

Built with ❤️ by Raeesa Parker
