# 📰 THE GOURNAL

## *Your trusted source for daily news*

![The Gournal Logo](./public/THE-GOURNAL-Logo.svg)

**The Gournal** is a newspaper-style web application that brings the classic 1980s newspaper reading experience to the digital age. Built as the capstone project for the ALX Frontend Engineering Program, it combines authentic newspaper design with modern web technologies to deliver real-time news from premium sources worldwide.

[![Live Demo](https://img.shields.io/badge/Demo-Live-8B4513?style=for-the-badge)](https://your-demo-link.com)
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

### 🌐 **Premium News Integration**

- **Multiple Sources**: BBC, Reuters, Bloomberg, CNN, The Verge, Wired, and more
- **Rate Limiting**: Respectful API usage with 1-second delays
- **Content Enhancement**: Clean, readable text with source attribution

### ⚡ **Performance & UX**

- **Fast Loading**: Optimized images with lazy loading
- **Error Handling**: Graceful fallbacks and user-friendly messages
- **Loading States**: Animated loading indicators

## 🚀 Live Demo

Experience The Gournal: [**View Live Demo**](https://your-demo-link.com)

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

- **Axios** - HTTP client with interceptors
- **News API** - Real-time news from premium sources
- **Rate Limiting** - Respectful API usage patterns

### **Development Tools**

- **ESLint** - Code quality and consistency
- **Vite Plugins** - Enhanced development experience
- **Path Aliases** - Clean import statements

## 📦 Installation & Setup

### **Prerequisites**

- Node.js
- npm or yarn
- News API key from [NewsAPI.org](https://newsapi.org/)

### **Quick Start**

```bash
# Clone the repository
git clone https://github.com/Y1HY11/the-gournal.git
cd the-gournal

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Get your free API key from [NewsAPI.org](https://newsapi.org/register)
# Add your News API key to .env
NEWS_API_KEY='your_news_api_key_here'

Note: Remember to keep your API key secure and not expose it in public repositories.

# Start development server
npm run dev

# Open http://localhost:5173 / http://localhost:3000 or on your network IP in your browser
```

## 📁 Project Structure

```
The Gournal/
├── public/
│   ├── THE-GOURNAL-Logo.svg    # Logo asset
├── src/
│   ├── components/
│   │   ├── Article.jsx         # Multi-layout article component
│   │   ├── ArticleStyles.jsx   # Styled components for articles
│   │   ├── Header.jsx          # Newspaper header with date
│   │   ├── Footer.jsx          # Classic footer design
│   │   └── SearchBar.jsx       # Search input for articles
│   ├── context/
│   │   ├── ApiServices.js      # News API integration
│   │   └── UserContext.jsx     # Zustand state management
│   ├── pages/
│   │   ├── Journal.jsx         # Main newspaper layout
│   │   └── NotFound.jsx        # 404 page
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles & responsive design
├── .env                       # Environment template
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

### **Color Palette**

- **Primary Background**: `#E2D4BC` (Warm beige)
- **Text Color**: `#302B1F` (Dark brown)
- **Accent**: Grayscale with hover effects

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
- **[News API](https://newsapi.org/)** - For providing reliable news data

## 👨‍💻 Author

[@Y1HY11](https://github.com/Y1HY11) 
[🌟 Star this repo](https://github.com/Y1HY11/the-gournal) 
[🐛 Report Bug](https://github.com/Y1HY11/the-gournal/issues) 
[💡 Request Feature](https://github.com/Y1HY11/the-gournal/issues) 

**© 2025 The Gournal. All rights reserved.** <br> *ALX Frontend Engineering Capstone Project*
