import { useState } from "react";
import SidebarNavigation from "@/components/dashboard/sidebar-navigation";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Lightbulb, 
  PieChart, 
  LineChart, 
  Network, 
  Share2, 
  Workflow, 
  Dices, 
  BookOpen, 
  Compass, 
  Lock, 
  BarChart4, 
  MoveRight, 
  Zap,
  Star,
  MessageSquareText,
  Award,
  User
} from "lucide-react";

// Multi-agent system agents
const systemAgents = [
  {
    id: "financial_analyst",
    name: "Financial Analyst",
    icon: PieChart,
    description: "Analyzes market trends, company financials, and economic indicators to provide investment insights.",
    capabilities: [
      "Fundamental analysis of stocks and other securities",
      "Technical analysis using price patterns and indicators",
      "Economic trend assessment and market forecasting",
      "Financial statement analysis and valuation metrics",
      "Sector and industry performance comparison"
    ],
    color: "#2563eb"
  },
  {
    id: "portfolio_manager",
    name: "Portfolio Manager",
    icon: BarChart4,
    description: "Constructs and optimizes investment portfolios based on risk profiles, goals, and market conditions.",
    capabilities: [
      "Asset allocation across different investment classes",
      "Portfolio diversification and correlation analysis",
      "Risk assessment and volatility management",
      "Performance attribution and benchmarking",
      "Rebalancing recommendations and optimization"
    ],
    color: "#8b5cf6"
  },
  {
    id: "risk_analyst",
    name: "Risk Analyst",
    icon: Dices,
    description: "Evaluates investment risks, identifies potential downsides, and suggests risk mitigation strategies.",
    capabilities: [
      "Risk metrics calculation (Sharpe ratio, beta, volatility)",
      "Stress testing and scenario analysis",
      "Downside protection strategies",
      "Correlation analysis during market stress",
      "Liquidity risk assessment"
    ],
    color: "#10b981"
  },
  {
    id: "retirement_planner",
    name: "Retirement Planner",
    icon: Compass,
    description: "Specializes in long-term financial planning with focus on retirement readiness and income strategies.",
    capabilities: [
      "Retirement savings projection and gap analysis",
      "Withdrawal strategy optimization",
      "Social Security claiming strategies",
      "Tax-efficient retirement account utilization",
      "Longevity risk assessment and planning"
    ],
    color: "#f59e0b"
  },
  {
    id: "tax_strategist",
    name: "Tax Strategist",
    icon: Lightbulb,
    description: "Provides tax-efficient investment strategies and identifies opportunities for tax optimization.",
    capabilities: [
      "Tax-loss harvesting opportunities",
      "Asset location optimization across account types",
      "Capital gains planning and management",
      "Dividend and income tax efficiency",
      "Charitable giving and estate tax strategies"
    ],
    color: "#06b6d4"
  },
  {
    id: "research_agent",
    name: "Research Agent",
    icon: BookOpen,
    description: "Gathers, synthesizes, and presents the latest financial news, research, and market intelligence.",
    capabilities: [
      "Financial news filtering and summarization",
      "Research paper analysis and key takeaways",
      "Earnings reports and corporate announcement tracking",
      "Market sentiment analysis from news and social media",
      "Economic indicator monitoring and interpretation"
    ],
    color: "#ec4899"
  },
  {
    id: "coordinator",
    name: "Coordinator Agent",
    icon: Network,
    description: "Orchestrates the multi-agent system, ensures coherent advice, and resolves conflicting recommendations.",
    capabilities: [
      "Cross-agent knowledge integration and synthesis",
      "Recommendation prioritization and weighting",
      "Conflict resolution between competing strategies",
      "Personalization based on user preferences and history",
      "Consistent communication and response generation"
    ],
    color: "#6b7280"
  },
];

// Data sources
const dataSources = [
  {
    name: "Real-Time Market Data",
    description: "Live market data from major exchanges worldwide",
    provider: "RapidAPI Finance"
  },
  {
    name: "Company Financials",
    description: "Comprehensive financial statements and metrics for publicly traded companies",
    provider: "RapidAPI Finance"
  },
  {
    name: "Economic Indicators",
    description: "Global economic data including GDP, inflation, employment, and more",
    provider: "RapidAPI Finance"
  },
  {
    name: "Financial News",
    description: "Breaking financial news and analysis from reputable sources",
    provider: "RapidAPI Finance"
  },
  {
    name: "Technical Indicators",
    description: "Advanced technical analysis metrics and patterns",
    provider: "RapidAPI Finance"
  },
];

export default function AboutPage() {
  const [activeAgent, setActiveAgent] = useState("financial_analyst");
  
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <SidebarNavigation />

      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">About Finance Advisor</h1>
            <p className="text-muted-foreground mt-1">
              Learn about our AI-powered financial advisory system
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-7 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Multi-Agent AI System</CardTitle>
                  <CardDescription>
                    Powered by Google's Gemini 2.0 Flash AI model
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Finance Advisor utilizes a sophisticated multi-agent AI system built on Google's Gemini 2.0 Flash model. 
                    This system brings together specialized AI agents, each with deep expertise in different aspects of 
                    financial planning and investment management.
                  </p>
                  <p>
                    Unlike traditional single-AI approaches, our multi-agent architecture enables more nuanced, comprehensive, 
                    and trustworthy financial advice. Each agent focuses on a specific domain, collaboratively providing 
                    well-rounded insights that consider multiple perspectives and strategies.
                  </p>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Key Benefits of Our Multi-Agent System:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Brain className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Specialized Expertise</h4>
                          <p className="text-sm text-muted-foreground">
                            Each agent has deep knowledge in specific financial domains for more accurate advice
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Share2 className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Diverse Perspectives</h4>
                          <p className="text-sm text-muted-foreground">
                            Multiple viewpoints lead to more balanced and comprehensive financial strategies
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Workflow className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Cross-Domain Reasoning</h4>
                          <p className="text-sm text-muted-foreground">
                            Agents collaborate to connect insights across different financial aspects
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Lock className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Reduced Bias</h4>
                          <p className="text-sm text-muted-foreground">
                            Multiple agents cross-check each other, minimizing individual AI biases
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                  <CardDescription>
                    The underlying process behind our financial advice
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted-foreground/20"></div>
                    <div className="space-y-8">
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">1</div>
                        <h3 className="text-lg font-semibold mb-1">User Input Analysis</h3>
                        <p className="text-sm text-muted-foreground">
                          When you ask a question or request advice, the Coordinator Agent analyzes your query to understand 
                          your needs, financial context, and goals.
                        </p>
                      </div>
                      
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">2</div>
                        <h3 className="text-lg font-semibold mb-1">Task Distribution</h3>
                        <p className="text-sm text-muted-foreground">
                          The Coordinator distributes relevant tasks to specialized agents based on their areas of expertise 
                          and the specific requirements of your request.
                        </p>
                      </div>
                      
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">3</div>
                        <h3 className="text-lg font-semibold mb-1">Data Collection & Analysis</h3>
                        <p className="text-sm text-muted-foreground">
                          Each agent retrieves and processes data from relevant sources, including market data, your portfolio 
                          information, economic indicators, and financial news.
                        </p>
                      </div>
                      
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">4</div>
                        <h3 className="text-lg font-semibold mb-1">Collaborative Reasoning</h3>
                        <p className="text-sm text-muted-foreground">
                          Agents share their findings and insights, discuss conflicting viewpoints, and work together to 
                          develop comprehensive, balanced recommendations.
                        </p>
                      </div>
                      
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">5</div>
                        <h3 className="text-lg font-semibold mb-1">Response Generation</h3>
                        <p className="text-sm text-muted-foreground">
                          The Coordinator synthesizes the collective intelligence into a clear, personalized response that 
                          addresses your specific question with actionable insights.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-5 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Meet the Agents</CardTitle>
                  <CardDescription>
                    Our specialized AI financial experts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {systemAgents.map(agent => (
                      <div
                        key={agent.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors flex flex-col items-center text-center ${
                          activeAgent === agent.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setActiveAgent(agent.id)}
                      >
                        <agent.icon className="h-5 w-5 mb-1" />
                        <div className="text-xs font-medium truncate w-full">
                          {agent.name.split(" ")[0]}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {systemAgents.map(agent => (
                    <div 
                      key={agent.id} 
                      className={`space-y-3 ${activeAgent !== agent.id ? "hidden" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${agent.color}20`, color: agent.color }}
                        >
                          <agent.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground">AI Specialist</p>
                        </div>
                      </div>
                      <p className="text-sm">{agent.description}</p>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Capabilities:</h4>
                        <ul className="text-sm space-y-1">
                          {agent.capabilities.map((capability, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="rounded-full bg-primary/10 p-0.5 mt-0.5 shrink-0">
                                <Check className="h-3 w-3 text-primary" />
                              </span>
                              <span className="text-muted-foreground">{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Data Sources</CardTitle>
                  <CardDescription>
                    Real-time financial data powering our insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dataSources.map((source, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          {index === 0 && <LineChart className="h-4 w-4" />}
                          {index === 1 && <BarChart4 className="h-4 w-4" />}
                          {index === 2 && <Zap className="h-4 w-4" />}
                          {index === 3 && <MessageSquareText className="h-4 w-4" />}
                          {index === 4 && <Star className="h-4 w-4" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{source.name}</h4>
                          <p className="text-sm text-muted-foreground mb-1">
                            {source.description}
                          </p>
                          <div className="text-xs flex items-center text-primary">
                            <span>Provided by {source.provider}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">FAQ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is my financial data secure?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Yes, we implement bank-level security measures to protect your financial information. 
                    Your data is encrypted both in transit and at rest. Our multi-agent system processes 
                    your information locally within our secure environment, and we do not share your 
                    personal data with third parties without your explicit consent.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How accurate is the financial advice?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our multi-agent system is designed to provide high-quality financial insights based on 
                    real-time market data and established financial principles. However, it's important to 
                    understand that all investment advice involves inherent risk and uncertainty. The system 
                    continuously improves through feedback and learning from user interactions, but we recommend 
                    consulting with a professional financial advisor for major financial decisions.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I customize the advice to my needs?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Absolutely. Our system learns from your interactions and financial goals to provide 
                    increasingly personalized advice. You can specify your risk tolerance, investment 
                    horizon, financial goals, and preferences, allowing our multi-agent system to tailor 
                    its recommendations to your unique situation. The more you use the system, the more 
                    personalized your experience becomes.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How often is the market data updated?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We use real-time market data through RapidAPI's financial data services, providing 
                    up-to-the-minute information for stocks, ETFs, mutual funds, and other securities. 
                    Market indices, economic indicators, and company financials are updated according to 
                    their official release schedules. News and analysis are continuously refreshed throughout 
                    the trading day.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6 pb-6">
                <Award className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Ready to experience AI-powered financial guidance?</h2>
                <p className="max-w-lg mx-auto mb-6">
                  Start exploring your financial future with personalized insights from our multi-agent system.
                </p>
                <Button variant="outline" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Get Started <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Team Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Our Team</CardTitle>
                <CardDescription>
                  The people behind Finance Advisor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Award className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium">Imad Agjoud</h4>
                        <p className="text-sm text-muted-foreground mb-1">Product & Vision Lead</p>
                        <p className="text-sm">Defines platform direction, ensuring Finance Advisor remains a leader in innovation and user satisfaction.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Brain className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium">Douae Imloul</h4>
                        <p className="text-sm text-muted-foreground mb-1">AI & Data Specialist</p>
                        <p className="text-sm">Develops the multi-agent AI framework, ensuring high-quality data pipelines for accurate financial insights.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Zap className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium">Widad Rachidi</h4>
                        <p className="text-sm text-muted-foreground mb-1">Frontend & UX Engineer</p>
                        <p className="text-sm">Crafts the sleek, animation-rich UI, ensuring seamless interaction and responsive design across devices.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Lock className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium">Adam Affia</h4>
                        <p className="text-sm text-muted-foreground mb-1">Backend & Security Engineer</p>
                        <p className="text-sm">Oversees Django/FastAPI architecture, API integrations, and robust security protocols.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex flex-col items-center text-center">
                      <Star className="h-8 w-8 text-yellow-400 mb-2" />
                      <h4 className="font-medium text-lg">Special Thanks</h4>
                      <p className="text-muted-foreground">
                        We extend our deepest gratitude to our mentor, Pr. Lamrani ALLAOUI, for his invaluable guidance 
                        and support throughout the development of this project.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Team Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Our Team</CardTitle>
                <CardDescription>
                  The brilliant minds behind Finance Advisor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Imad Agjoud</h4>
                      <p className="text-sm text-primary mb-1">Product & Vision Lead</p>
                      <p className="text-sm text-muted-foreground">
                        Defines platform direction, ensuring Finance Advisor remains a leader in innovation and user satisfaction.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Douae Imloul</h4>
                      <p className="text-sm text-primary mb-1">AI & Data Specialist</p>
                      <p className="text-sm text-muted-foreground">
                        Develops the multi-agent AI framework, ensuring high-quality data pipelines for accurate financial insights.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Widad Rachidi</h4>
                      <p className="text-sm text-primary mb-1">Frontend & UX Engineer</p>
                      <p className="text-sm text-muted-foreground">
                        Crafts the sleek, animation-rich UI, ensuring seamless interaction and responsive design across devices.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Adam Affia</h4>
                      <p className="text-sm text-primary mb-1">Backend & Security Engineer</p>
                      <p className="text-sm text-muted-foreground">
                        Oversees Django/FastAPI architecture, API integrations, and robust security protocols.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6 mt-6">
                  <div className="flex items-center mb-4">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    <h4 className="font-medium">Special Thanks</h4>
                  </div>
                  <p className="text-muted-foreground">
                    We extend our heartfelt gratitude to our Encadrant Pr. Lamrani ALLAOUI for guidance, 
                    mentorship, and unwavering support throughout the development of Finance Advisor.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Check icon component
function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}