# 🧪 FitCheck: AI-Powered Portfolio Reviewer

## 📘 Table of Contents

- [Project Title](#-fitcheck-ai-powered-portfolio-reviewer)
- [Project Description](#project-description)

  - [Scope and Functionality](#scope-and-functionality)
  - [Motivation](#motivation)
  - [Screenshots or Demo](#screenshots-or-demo)

- [Technology Stack](#technology-stack)
- [Future Implementations/Improvements](#future-implementationsimprovements)
- [Known Bugs](#known-bugs)
- [Installation and Setup](#installation-and-setup)
- [Detailed User Manual](#detailed-user-manual)
- [Credits and Acknowledgments](#credits-and-acknowledgments)

## Project Description

### Scope and Functionality

FitCheck is a web application designed to provide AI-powered code reviews for GitHub repositories. Users select a reviewer persona (e.g., Mentor, Recruiter, Senior Developer) and get real-time, markdown-formatted feedback tailored to that perspective. The application supports multiple frontend frameworks and allows users to select specific files for review.

### Motivation

The motivation behind FitCheck was to help developers — especially students and job seekers — receive clear, relevant, and contextual feedback on their code. It aims to simulate real-world code reviews in a fast, automated way.

### Screenshots or Demo

![Home](https://i.imgur.com/AzVxZoO.png)

![Persona Select](https://i.imgur.com/itcuKpb.png)

![Techstack Select](https://i.imgur.com/n4qN5kT.png)

![Enter Url](https://i.imgur.com/yHzOdgo.png)

![AI Feedback](https://i.imgur.com/tQNfQ8E.png)

## Technology Stack

- Next.js
- React
- TypeScript
- TailwindCSS
- ShadCN UI
- OpenAI SDK
- SWR
- Framer Motion

## Future Implementations/Improvements

- Export reviews as PDFs
- Integrate resume reviewer module
- Add support for backend languages (Node, Python, etc.)

## 🐞 Known Bugs

### 🔧 Functional Bugs

#### 🔁 Duplicate URL Submission Doesn’t Trigger Review
If a user submits the same GitHub repo twice in a row, the app doesn't trigger a re-review — likely due to unchanged state not re-firing the request.  
**Temporary Fix:** Refresh the page or slightly change the URL (e.g., add/remove a trailing space).  
**Planned:** Force state reset or manual re-fetch logic.

#### 🔄 Persona & Techstack Can Be Changed Mid-Review
Users can change the selected mode or stack after clicking submit, which may cause review mismatches.  
**Planned:** Disable selection buttons as soon as the review starts and re-enable only after it's done.

---

📬 [Submit a bug or view open issues](https://github.com/ChetanbirSingh/FitCheck/issues)
## Installation and Setup

### Prerequisites

- OpenAI API Key (required)
- Github API Key (required)

### Setup Instructions

```bash
git clone https://github.com/ChetanbirSingh/fitcheck
cd fitcheck

# Copy the example env file and rename it
cp .env.example .env.local

# Open .env.local and add your OpenAI and GitHub API keys

npm install
npm run dev

```

## Detailed User Manual

1. Choose a reviewer persona (Mentor, Recruiter, etc.)
2. Select a tech stack (React, Next.js, HTML/CSS, etc.)
3. Paste a GitHub repository URL (public repos only)
4. Select files you want reviewed
5. Hit submit — feedback streams in real-time

Each persona tailors the tone and focus of the review:

- **Mentor**: Growth and learning tips
- **Recruiter**: Hireability and red flags
- **Senior Dev**: Code architecture and practices
- **UI/UX Designer**: Visual critique
- **Peer**: Friendly suggestions

## Credits and Acknowledgments

- [OpenAI](https://openai.com) – for GPT-4o
- [ShadCN](https://ui.shadcn.com) – UI components
- [Lucide Icons](https://lucide.dev/) – Icon set
