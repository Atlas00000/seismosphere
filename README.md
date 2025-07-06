# 🌍 SeismoSphere - Interactive 3D Earthquake Visualization

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **Experience Earth's seismic activity in real-time with stunning 3D visualizations and cosmic aurora effects**

## 🌟 Overview

SeismoSphere is an immersive, interactive 3D globe application that visualizes real-time earthquake data from the US Geological Survey (USGS). Built with cutting-edge web technologies, it combines scientific data visualization with breathtaking visual effects to create an engaging experience for understanding global seismic activity.

### ✨ Key Features

- **🌍 Interactive 3D Globe**: Rotate, zoom, and explore Earth with smooth 3D navigation
- **⚡ Real-time Data**: Live earthquake data from USGS updated every 5 minutes
- **🎨 Cosmic Visual Effects**: Stunning aurora borealis, solar wind particles, and starfield animations
- **📊 Depth Visualization**: Color-coded earthquake markers by depth (shallow, mid-depth, deep)
- **🔧 Interactive Controls**: Adjustable magnitude filters, globe size, and tectonic plate overlays
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **🌌 Seismic Wave Animations**: Dynamic wave propagation effects on canvas
- **🎯 Detailed Information**: Click on earthquakes for comprehensive data

## 🚀 Live Demo

**[Experience SeismoSphere Live](https://seismosphere.vercel.app)** *(Coming Soon)*

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### 3D Visualization
- **react-globe.gl** - Interactive 3D globe component
- **Three.js** - 3D graphics and rendering
- **Canvas API** - Custom seismic wave animations

### Data & APIs
- **USGS Earthquake API** - Real-time seismic data
- **Fetch API** - Data fetching with automatic updates

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Class Variance Authority** - Component variant management

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/seismosphere.git
   cd seismosphere
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage Guide

### Basic Navigation
- **Mouse/Touch**: Rotate the globe by dragging
- **Scroll**: Zoom in/out
- **Click**: Select earthquakes for detailed information

### Control Panel (Left Sidebar)
- **Minimum Magnitude Slider**: Filter earthquakes by magnitude (1.0-7.0)
- **Globe Size Slider**: Adjust the globe size (200-400px)
- **Tectonic Plates Toggle**: Show/hide plate boundaries
- **Refresh Data Button**: Manually update earthquake data

### Information Panel (Right Sidebar)
- **Live Statistics**: Total events, largest magnitude, depth distribution
- **Real-time Updates**: Data refreshes automatically every 5 minutes

### Visual Effects
- **Aurora Borealis**: Dynamic cosmic aurora effects
- **Solar Wind Particles**: Animated particle system
- **Starfield**: Twinkling star background
- **Seismic Waves**: Canvas-based wave propagation

## 🎨 Visual Features

### 🌌 Cosmic Atmosphere
```
┌─────────────────────────────────────┐
│  ✨ Twinkling Stars                │
│  🌈 Aurora Borealis Effects        │
│  🌪️ Solar Wind Particle System     │
│  🌊 Seismic Wave Animations        │
└─────────────────────────────────────┘
```

### 🎯 Earthquake Visualization
```
Depth Color Coding:
🔴 Red    - Shallow (<70km)
🟡 Amber  - Mid-depth (70-300km)
🔵 Blue   - Deep (>300km)

Size = Magnitude × 0.3
```

### 📊 Data Integration
- **Real-time USGS API**: Automatic data fetching
- **5-minute refresh intervals**: Always current
- **Magnitude filtering**: Customizable thresholds
- **Depth analysis**: Comprehensive depth categorization

## 🏗️ Project Structure

```
seismosphere/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles & animations
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main SeismoSphere component
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional stylesheets
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for custom configurations:

```env
# Optional: Custom USGS API endpoint
NEXT_PUBLIC_USGS_API_URL=https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

# Optional: Custom refresh interval (in milliseconds)
NEXT_PUBLIC_REFRESH_INTERVAL=300000
```

### Customization Options

#### Visual Effects
```typescript
// Adjust aurora intensity
const auroraIntensity = 0.6 + (seismicActivity * 0.4);

// Modify particle count
const maxParticles = 150;

// Change wave animation speed
const waveSpeed = 2; // pixels per frame
```

#### Data Filtering
```typescript
// Custom magnitude range
const minMagnitude = 2.5;
const maxMagnitude = 7.0;

// Depth categories
const depthCategories = {
  shallow: 70,
  midDepth: 300
};
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Environment variables configured in Vercel dashboard

### Other Platforms
- **Netlify**: Compatible with Next.js
- **Railway**: Easy deployment with database options
- **Docker**: Containerized deployment available

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits for version control

## 📊 Performance

### Optimization Features
- **Lazy Loading**: Components load on demand
- **Canvas Optimization**: Efficient seismic wave rendering
- **Particle System**: Optimized solar wind animations
- **Image Optimization**: Next.js automatic image optimization

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## 🔒 Security

- **API Rate Limiting**: Respectful USGS API usage
- **Input Validation**: Sanitized user inputs
- **HTTPS Only**: Secure data transmission
- **Content Security Policy**: XSS protection

## 📈 Roadmap

### Phase 1: Core Features ✅
- [x] 3D Globe Visualization
- [x] Real-time Earthquake Data
- [x] Interactive Controls
- [x] Visual Effects

### Phase 2: Enhanced Features 🚧
- [ ] Historical Data Analysis
- [ ] Earthquake Prediction Models
- [ ] Mobile App Version
- [ ] Offline Capability

### Phase 3: Advanced Features 📋
- [ ] Machine Learning Integration
- [ ] Social Features
- [ ] Educational Content
- [ ] API for Developers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **US Geological Survey** for providing earthquake data
- **react-globe.gl** for the amazing 3D globe component
- **shadcn/ui** for beautiful UI components
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/seismosphere/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/seismosphere/discussions)
- **Email**: support@seismosphere.com

---

<div align="center">

**Made with ❤️ by the SeismoSphere Team**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/seismosphere?style=social)](https://github.com/yourusername/seismosphere)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/seismosphere?style=social)](https://github.com/yourusername/seismosphere)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/seismosphere)](https://github.com/yourusername/seismosphere/issues)

</div> 