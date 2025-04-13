v# Finance Advisor

A comprehensive financial management application with real-time market data, portfolio tracking, and an AI-powered financial advisor.

![Finance Advisor Dashboard](https://i.imgur.com/j2KPDr0.png)

## Features

- **Authentication System**: Secure user registration and login powered by Supabase
- **Interactive Dashboard**: Visualize financial data with dynamic charts and metrics
- **Portfolio Management**: Track your investment portfolio with real-time updates
- **Market Analysis**: Access real-time market data for stocks, ETFs, and indices
- **AI Financial Advisor**: Get personalized financial advice from a multi-agent AI system
- **Financial Planning Tools**: Plan for retirement, analyze investments, and optimize taxes

## Technology Stack

### Frontend
- React with TypeScript
- TailwindCSS with ShadCN UI components
- Chart.js for data visualization
- Tanstack Query for data fetching
- Supabase Auth for authentication

### Backend
- Node.js Express server
- Django Rest Framework for AI services and data processing
- PostgreSQL database for data persistence
- Drizzle ORM for database interactions

### AI System
- Google Gemini 2.0 Flash model
- LangChain for orchestrating multi-agent system
- Multi-agent architecture with specialized financial agents

## Multi-Agent System

Finance Advisor uses a sophisticated multi-agent AI system built on Google's Gemini 2.0 Flash model. The system includes the following specialized agents:

- **Financial Analyst**: Analyzes market trends and company financials
- **Portfolio Manager**: Constructs and optimizes investment portfolios
- **Risk Analyst**: Evaluates investment risks and suggests mitigation strategies
- **Retirement Planner**: Specializes in long-term financial planning
- **Tax Strategist**: Provides tax-efficient investment strategies
- **Research Agent**: Gathers and synthesizes financial news and research
- **Coordinator Agent**: Orchestrates the system and ensures coherent advice

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL database
- Supabase account
- RapidAPI account (for Finance API)
- Google API key (for Gemini AI)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL=your_postgresql_connection_string

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# RapidAPI
RAPIDAPI_KEY=your_rapidapi_key

# Google AI
GOOGLE_API_KEY=your_google_api_key
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/finance-advisor.git
cd finance-advisor
```

2. Install dependencies
```bash
# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r backend/requirements.txt
```

3. Set up the database
```bash
npm run db:push
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Usage

1. Register a new account or log in with existing credentials
2. View your financial dashboard with key metrics
3. Add investments to your portfolio
4. Browse real-time market data
5. Chat with the AI Financial Advisor for personalized guidance
6. Use planning tools to optimize your financial strategy

## Team

- **Imad Agjoud**: Product & Vision Lead
- **Douae Imloul**: AI & Data Specialist
- **Widad Rachidi**: Frontend & UX Engineer
- **Adam Affia**: Backend & Security Engineer

Special thanks to our Encadrant Pr. Lamrani ALLAOUI for guidance and support.

## License

This project is licensed under the MIT License - see the LICENSE file for details.