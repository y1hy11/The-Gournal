# 📰 THE GOURNAL

## *Your trusted source for daily news*

![The Gournal Logo](./public/THE-GOURNAL-Logo.svg)

**The Gournal** is a newspaper-style web application that brings the classic 1980s newspaper reading experience to the digital age. Built as the capstone project for the ALX Frontend Engineering Program, it combines authentic newspaper design with modern web technologies to deliver real-time news from RSS feeds worldwide.

[![THE GOURNAL](https://img.shields.io/badge/THE-GOURNAL-8B4513?style=for-the-badge)](https://the-gournal.vercel.app/)
[![ALX](https://img.shields.io/badge/ALX-Program-DC143C?style=for-the-badge)](https://www.alxafrica.com/)

## ✨ Features

### 📱 **Responsive Design**

- **Mobile-First Approach**: Optimized for all screen sizes (320px - 4K+)
- **CSS Media Queries**: Reliable responsive behavior using pure CSS
- **Touch-Friendly**: Enhanced mobile navigation and interaction
- **Adaptive Layout**: 12-column grid system that transforms seamlessly

### 🎨 **Classic Newspaper Aesthetic**

- **1980s Typography**: Traditional newspaper fonts (Calibri, Georgia, Times New Roman)
- **Authentic Layout**: Multi-column grid system inspired by The New York Times
- **Color Palette**: Classic beige (#E2D4BC) and dark brown (#302B1F) scheme
- **Grayscale Images**: Hover effects for modern interactivity

### 📰 **Advanced Article System**

- **Multiple Layouts**: Headline, Spotlight, Horizontal, Reverse, and various sizes
- **Smart Content Processing**: HTML/code cleaning and truncation handling
- **Dynamic Grid**: Intelligent article positioning across 12-column layout
- **Image Optimization**: Fixed dimensions with object-fit cover

### 🌐 **RSS News Integration**

- **Multiple RSS Sources**: BBC, Reuters, Bloomberg, CNN, The Verge, Wired, and 20+ more
- **Real-time Updates**: Direct RSS feed parsing for fresh content
- **No API Limits**: Unlimited access to diverse news sources
- **CORS Proxy**: Seamless client-side RSS feed processing
- **Content Enhancement**: Clean, readable text with intelligent image fallbacks

### ⚡ **Performance & UX**

- **Fast Loading**: Optimized images with lazy loading
- **Error Handling**: Graceful fallbacks and user-friendly messages
- **Loading States**: Animated loading indicators

## 🚀 Live Demo

Experience The Gournal: [**THE GOURNAL**](https://the-gournal.vercel.app/)

## 🛠️ Technology Stack

### **Frontend Framework**

- **React** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool and dev server
- **React Router DOM** - Client-side routing

### **Styling & Design**

- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Media queries for reliable responsive design
- **Classic Typography** - Traditional newspaper font stack

### **State Management**

- **Zustand** - Lightweight state management
- **Custom Hooks** - Optimized React patterns

### **API & Data**

- **Fast XML Parser** - High-performance RSS/XML parsing
- **RSS Feeds** - Real-time news from 25+ premium sources worldwide
- **CORS Proxy** - Seamless cross-origin RSS feed access

### **Development Tools**

- **ESLint** - Code quality and consistency
- **Vite Plugins** - Enhanced development experience
- **Path Aliases** - Clean import statements

## 📦 Installation & Setup

### **Prerequisites**

- Node.js
- npm or yarn
- RSS feed URLs

### **Quick Start**

```bash
# Clone the repository
git clone https://github.com/Y1HY11/the-gournal.git
cd the-gournal

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 / http://localhost:3000 or on your network IP in your browser
```

## 📁 Project Structure

```text
The Gournal/
├── public/
│   ├── THE-GOURNAL-Logo.svg    # Logo asset  
├── src/
│   ├── components/
│   │   ├── Article.jsx         # Multi-layout article component
│   │   ├── ArticleStyles.jsx   # Article styling configurations
│   │   ├── Header.jsx          # Newspaper header with date
│   │   ├── Footer.jsx          # Classic footer design
│   │   └── SearchBar.jsx       # Real-time article search
│   ├── context/
│   │   └── UserContext.jsx     # Zustand state management
│   ├── services/
│   │   └── RSSService.js       # RSS feed parsing & integration
│   ├── pages/
│   │   ├── Journal.jsx         # Main newspaper layout
│   │   └── NotFound.jsx        # 404 page
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles & responsive design
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js             # Vite build configuration
├── eslint.config.js           # ESLint configuration
├── package-lock.json          # npm package lock file
└── package.json               # Dependencies & scripts
```

## 🎨 Design Philosophy

**The Gournal** recreates the authoritative feel of traditional print journalism while embracing modern web capabilities. The design draws inspiration from:

- **The New York Times** (1980s layout structure)
- **The Guardian** (Classic typography)
- **Traditional Broadsheets** (Multi-column layouts)

### **Color Palette**

- **Primary Background**: `#E2D4BC` (Warm beige)
- **Text Color**: `#302B1F` (Dark brown)
- **Accent**: Grayscale with hover effects

## 📱 Responsive Behavior

### **Desktop Experience**

- Full 12-column newspaper layout
- Multi-column article text
- Sidebar spotlight sections
- Large hero images

### **Mobile Experience**

- Single-column vertical stack
- Touch-optimized interactions
- Scaled typography
- Condensed navigation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### **Development Workflow**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🙏 Acknowledgments

### **Special Thanks**

- **[ALX Africa](https://www.alxafrica.com/)** - For the comprehensive frontend engineering program
- **RSS Feed Providers** - BBC, Reuters, CNN, Bloomberg, and all news sources
- **React Community** - For exceptional documentation and support
- **Tailwind CSS Team** - For the utility-first CSS framework
- **Fast XML Parser** - For reliable RSS parsing capabilities

## 👨‍💻 Author

[@Y1HY11](https://github.com/Y1HY11) 
[🌟 Star this repo](https://github.com/Y1HY11/the-gournal) 
[🐛 Report Bug](https://github.com/Y1HY11/the-gournal/issues) 
[💡 Request Feature](https://github.com/Y1HY11/the-gournal/issues) 

**© 2025 The Gournal. All rights reserved.** <br> *ALX Frontend Engineering Capstone Project*
