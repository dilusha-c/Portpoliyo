# 🚀 Dilusha Chamika - Personal Portfolio

**This is my personal portfolio website** - a cutting-edge, futuristic showcase of my web development skills featuring advanced UI/UX design, robotic-themed animations, and seamless user experience.

**Live Demo**: [dilusha-chamika.vercel.app](https://dilusha-chamika.vercel.app/)

---

> **Note**: This is my personal portfolio project. While you're welcome to explore the code and learn from it, this repository represents my individual work and achievements.

## ✨ Features

### 🎨 Design & UI/UX
- **Futuristic Robotic Theme**: Cyberpunk-inspired design with circuit board patterns and robotic animations
- **Dual Theme System**: Light and dark modes with smooth transitions
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Advanced Animations**: Framer Motion powered smooth transitions and micro-interactions
- **Hardware-inspired UI**: Circuit patterns, binary matrices, and robotic elements

### 🛠️ Technical Features
- **Performance Optimized**: WebP images, lazy loading, and code splitting
- **SEO Friendly**: Meta tags, structured data, and fast loading times
- **Contact Integration**: EmailJS powered contact form with validation
- **Image Management**: Cloudinary integration for optimized image delivery
- **Modern Build System**: Vite for lightning-fast development and builds

### 📱 Interactive Elements
- **Skills Modal**: Comprehensive technical skills showcase
- **Project Gallery**: Interactive project cards with image modals
- **Smooth Scrolling**: Custom navigation with section highlighting
- **Form Validation**: Real-time contact form validation and feedback
- **Mobile Menu**: Responsive navigation with smooth animations

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Next-generation frontend tooling for fast development

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library for React
- **Lucide React** - Beautiful & consistent icon toolkit

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic CSS vendor prefixing

### External Services
- **EmailJS** - Client-side email sending service
- **Vercel** - Deployment and hosting platform
- **Vercel Analytics** - Web analytics and insights

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/it23782518/Portpoliyo.git
cd Portpoliyo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

#### Copy Environment Template
```bash
cp .env.example .env
```

#### Get Required API Keys

**EmailJS Setup:**
1. Visit [EmailJS Dashboard](https://www.emailjs.com/)
2. Create an account and verify your email
3. Create a new email service (Gmail, Outlook, etc.)
4. Create an email template with these variables:
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{title}}` - Message subject
   - `{{message}}` - Message content
   - `{{to_name}}` - Recipient name
   - `{{reply_to}}` - Reply-to email
5. Copy Service ID, Template ID, and Public Key

#### Configure Environment Variables
Update your `.env` file with actual values:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to view the development server!

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint for code linting

# Deployment
npm run deploy       # Deploy to Vercel (requires Vercel CLI)
```

## 🌐 Deployment to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings:**
   - Framework Preset: `Vite`
   - Root Directory: `./` (leave default)
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env` file
   - Set Environment to "Production"

4. **Deploy:**
   - Click "Deploy"
   - Wait for build completion
   - Your site will be live at `your-project.vercel.app`

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy project
vercel

# Add environment variables
vercel env add VITE_EMAILJS_SERVICE_ID
vercel env add VITE_EMAILJS_TEMPLATE_ID
vercel env add VITE_EMAILJS_PUBLIC_KEY

# Deploy to production
vercel --prod
```

## 📁 Project Structure

```
Portpoliyo/
├── public/                 # Static assets
│   ├── assets/            # Images, fonts, icons
│   ├── robots.txt         # SEO and crawling
│   └── sitemap.xml        # Site structure for search engines
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── BinaryMatrix.jsx      # Animated background
│   │   ├── BootScreen.jsx        # Loading animation
│   │   ├── RoboticSectionTitle.jsx # Section headers
│   │   └── ...
│   ├── contexts/          # React contexts
│   │   └── ThemeContext.jsx      # Theme management
│   ├── hooks/             # Custom React hooks
│   │   └── useIsMobile.js        # Mobile detection
│   ├── pages/             # Page components
│   │   ├── HeroSection.jsx       # Landing section
│   │   ├── AboutSection.jsx      # Personal info
│   │   ├── ProjectsSection.jsx   # Project showcase
│   │   └── ...
│   ├── styles/            # Global styles
│   │   └── roboticTheme.css     # Theme-specific styles
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global CSS
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md             # Project documentation
```

## 🎨 About This Project

This portfolio showcases my journey as a full-stack developer with expertise in modern web technologies. The design reflects my interest in robotics and futuristic interfaces, implemented using cutting-edge web technologies.

### Key Highlights:
- **Personal Branding**: Unique robotic theme that represents my technical interests
- **Performance Focused**: Optimized for fast loading and smooth user experience
- **Responsive Design**: Works perfectly across all devices and screen sizes
- **Interactive Elements**: Engaging animations and user interactions
- **Professional Presentation**: Showcases my projects, skills, and achievements

## 📚 Learning & Code Exploration

This project serves as a demonstration of modern web development practices. You're welcome to explore the codebase to learn about:

- **React 18** with hooks and modern patterns
- **Vite** build system and optimization techniques
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for advanced animations
- **EmailJS** integration for contact forms
- **Responsive design** and mobile-first development
- **Performance optimization** strategies

### Code Structure
The project follows clean architecture principles with:
- Modular component structure
- Custom hooks for reusable logic
- Context API for state management
- Organized file structure for scalability

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Dilusha Chamika**
- **Email**: dilushachamika@gmail.com
- **LinkedIn**: [linkedin.com/in/dilusha-chamika](https://www.linkedin.com/in/dilusha-chamika/)
- **GitHub**: [github.com/it23782518](https://github.com/it23782518)
- **Portfolio**: [dilusha-chamika.vercel.app](https://dilusha-chamika.vercel.app/)

---

**Built with ❤️ by Dilusha Chamika**
*Showcasing my journey in web development and robotics*
