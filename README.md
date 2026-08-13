# 🤖 Agentscope Agent

> **A sophisticated multi-agent AI system visualizer and debugger for real-time agent monitoring, troubleshooting, and autonomous debugging.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

---

## 🎯 Overview

**Agentscope Agent** is a comprehensive platform for visualizing, monitoring, and debugging multi-agent AI systems. It provides real-time insights into agent behavior, identifies system failures, and automates debugging through an intelligent meta-debugger.

### Use Cases
- Monitor multi-agent workflows in real-time
- Identify and isolate agent failures quickly
- Debug system prompts autonomously
- Visualize agent state trees and trace histories
- Analyze performance metrics and bottlenecks

---

## ✨ Key Features

### 🔍 Real-Time Agent Monitoring
- **Live Swarm Troubleshooting Dashboard**: View active agent issues at a glance
- **Issue Categorization**: Organizes problems into clear categories:
  - Delegation Deadlocks
  - Loop Hallucinations
  - Schema Drifts
  - Latency Spikes

### 🤖 Autonomous Meta-Debugger
- Intelligent AI auditor that analyzes multi-agent trace trees
- Identifies failure patterns and hallucinations automatically
- Generates and applies system prompt patches
- Provides precise, actionable debugging insights

### 🎨 Premium Visual Design
- **Elegant Dark Theme**: Charcoal background with gold accents
- **Animated Backgrounds**: Dynamic moving grids and gradient waves
- **Smooth Animations**: Fluid transitions and motion effects powered by Motion
- **Responsive Layout**: Works seamlessly on desktop and tablet

### ⌨️ Keyboard-Driven Workflow
- **Space**: Play/Pause agent simulation
- **R**: Reset timeline to initial state
- **D**: Toggle the meta-debugger panel

### 📊 Data Visualization
- Interactive charts and graphs (Recharts)
- 3D spatial visualization (D3.js)
- Agent state tree navigation
- Performance timeline scrubbing

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Animation** | Motion (Framer Motion) |
| **Visualization** | Recharts, D3.js |
| **Server** | Express.js + Vite Integration |
| **Typography** | Cinzel, Serif Fonts |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **npm** or **pnpm**: Package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/saravanavel07/Agentscope.agent.git
cd Agentscope.agent

# Install dependencies
npm install
# or
pnpm install
```

### Running the Development Server

```bash
# Start the development server
npm run dev

# The application will be available at:
# http://localhost:3000
```

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📖 Usage Guide

### Starting a Session
1. Open the application at `http://localhost:3000`
2. The dashboard displays all active agents and their current status
3. View real-time agent metrics on the main visualization panel

### Troubleshooting Agents
1. Navigate to the **Swarm Troubleshooting Column** on the left
2. Select an agent experiencing issues
3. Review the categorized problem (Deadlock, Hallucination, etc.)
4. Click **Auto-Patch** to let the meta-debugger fix the system prompt
5. Or click **Trace CLI** to inspect the detailed call stack

### Using the Meta-Debugger
1. Press **`D`** to open the meta-debugger drawer
2. The AI auditor will analyze the current agent trace tree
3. Review generated system prompt patches
4. Apply patches to update agent behavior

### Timeline Control
- **Play/Pause**: Press **`Space`** to control simulation playback
- **Reset**: Press **`R`** to return to the beginning
- **Scrub**: Click on the timeline to jump to any point

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Context |
|----------|--------|---------|
| **Space** | Play / Pause Simulation | Global |
| **R** | Reset Timeline | Global |
| **D** | Toggle Meta-Debugger | Global |

> 💡 **Tip**: Hover over the footer badge to see all shortcuts

---

## 📁 Project Structure

```
Agentscope.agent/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page views
│   ├── styles/             # CSS files
│   ├── utils/              # Utility functions
│   └── App.tsx             # Main app component
├── public/                 # Static assets
├── server.ts               # Express server
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── package.json            # Dependencies
```

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)

---

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** changes: `git commit -m "Add your feature"`
4. **Push** to branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages
- Test your changes before submitting a PR

---

## 📝 License

© 2026 Agentscope. All rights reserved.

---

## 📧 Support

For issues, questions, or feedback:
- **GitHub Issues**: [Open an issue](https://github.com/saravanavel07/Agentscope.agent/issues)
- **Discussions**: [Start a discussion](https://github.com/saravanavel07/Agentscope.agent/discussions)

---

**Made with ❤️ by the Agentscope Team**
