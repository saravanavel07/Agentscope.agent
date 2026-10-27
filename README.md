# AgentScope Agent

A modern TypeScript-powered multi-agent AI monitoring and debugging workspace for visualizing agent behavior, tracing execution flows, and diagnosing issues in autonomous systems.

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="Google AI" src="https://img.shields.io/badge/Google%20AI-Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" />
</p>


## Overview

AgentScope Agent is designed to help developers and researchers inspect, reason about, and debug multi-agent systems in real time. It combines a structured dashboard, execution traces, and AI-assisted analysis to identify issues such as recursive loops, schema drift, delegation failures, latency spikes, and prompt ambiguity.

The project is built for scenarios where multiple AI agents collaborate, delegate, or trigger tool calls, and where fast visibility into agent health is essential.


## Why This Project

As agent-based systems become more complex, debugging them becomes increasingly difficult. Traditional logs often do not capture the causal structure of agent interactions, decision chains, or prompt-induced failure patterns.

AgentScope Agent addresses this by providing:

- A visual system overview for multi-agent execution
- Trace-based monitoring of events and agent states
- AI-powered root-cause analysis
- Suggested prompt improvements for affected agents
- A workflow optimized for troubleshooting and iteration


## Key Features

### Real-time monitoring
- Live visual inspection of agent activity
- Event timeline tracking
- Scenario-driven debugging workflow

### AI meta-debugger
- Analyzes agent traces using Gemini-backed reasoning
- Detects recurring failure modes
- Suggests targeted fixes and updated prompts

### Agent execution simulation
- Run simulated agent steps
- Inspect incoming messages, tool usage, and responses
- Observe delegation and error handling behavior

### Telemetry export
- Export trace data in JSON format
- Useful for analysis, documentation, and external observability pipelines

### Developer-friendly setup
- Vite + React frontend
- Express server for backend APIs
- TypeScript-first source layout


## Architecture

This project uses a lightweight full-stack architecture:

- Frontend: React + TypeScript + Vite
- Backend: Express server
- AI integration: Google Gemini via `@google/genai`
- Runtime: Node.js

The server exposes API endpoints for:

- health checks
- agent debugging analysis
- simulated agent step execution
- telemetry export

The frontend consumes these APIs to render the interactive debugging experience.


## Project Structure

```text
Agentscope.agent/
├── src/                     # Frontend application source
├── index.html              # Vite entry HTML
├── server.ts               # Express + AI API server
├── metadata.json           # App metadata
├── package.json            # Scripts and dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── README.md               # Project documentation
├── .gitignore              # Git ignore rules
└── dist/                   # Build output (generated)
```


## Prerequisites

Before running the project, ensure you have:

- Node.js 18 or later
- npm or pnpm
- A valid Google Gemini API key


## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/saravanavel07/Agentscope.agent.git
cd Agentscope.agent
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add your Gemini key:

```env
GEMINI_API_KEY=your_api_key_here
```

### 4. Start the development server

```bash
npm run dev
```

The application is served locally via the Express + Vite setup.


## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Build the production bundle
npm run start    # Start the built server
npm run preview  # Preview the Vite build
npm run lint     # Type-check the project
```


## Environment Notes

The backend uses the `GEMINI_API_KEY` environment variable to initialize the Google GenAI client. If the key is missing, the API endpoints that rely on Gemini analysis will fail with a configuration error.

In a production deployment, store this key securely using environment management or secret configuration rather than committing it into source control.


## Usage Workflow

1. Launch the application.
2. Configure or load a multi-agent scenario.
3. Review the live trace and event timeline.
4. Inspect agent behavior, delegation flow, and error severity.
5. Use the AI meta-debugger to identify likely root causes.
6. Apply suggested prompt updates or fix recommendations.
7. Export telemetry for deeper analysis or reporting.


## Supported Debugging Scenarios

The system is designed for issues such as:

- Recursive reasoning loops
- Prompt ambiguity or weak role definitions
- Schema mismatches between agents
- Delegation deadlocks
- Latency spikes or performance bottlenecks


## Contributing

Contributions are welcome. To contribute:

```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then open a pull request with a clear description of the change and its impact.


## Support

For issues, feature requests, or feedback, use the repository's GitHub issue tracker or discussions page.


## Notes

This project is a focused tool for research, testing, and debugging agentic workflows. It is best suited for development and experimentation environments where multi-agent behavior must be inspected carefully.

---

Built for debugging agent systems with clarity, visibility, and AI-assisted reasoning.
