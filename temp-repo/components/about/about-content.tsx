"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { LineChart, BarChart, PieChart, Bot, Database, Server, Code, BarChart3 } from "lucide-react"
import { useState, useEffect } from "react"
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, Cell } from "recharts"

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  delay,
}: {
  icon: any
  title: string
  description: string
  color: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="rounded-lg border p-4 transition-all duration-200 hover:shadow-md"
    >
      <motion.div
        className="rounded-full w-12 h-12 flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}20` }}
        whileHover={{
          rotate: 10,
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
      >
        <Icon className="h-6 w-6" style={{ color }} />
      </motion.div>
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}

function AnimatedBarChart() {
  const [data, setData] = useState([
    { name: "Stocks", value: 45, previousValue: 40 },
    { name: "Bonds", value: 20, previousValue: 25 },
    { name: "Cash", value: 15, previousValue: 20 },
    { name: "Real Estate", value: 10, previousValue: 8 },
    { name: "Crypto", value: 10, previousValue: 7 },
  ])

  const [optimizationScore, setOptimizationScore] = useState(82)

  useEffect(() => {
    const interval = setInterval(() => {
      setData((currentData) => {
        const newData = [...currentData]

        // Simulate portfolio optimization by gradually shifting allocation
        // Increase stocks and real estate, decrease bonds and cash over time
        return newData.map((item) => {
          const previousValue = item.value
          let change = 0

          if (item.name === "Stocks" || item.name === "Real Estate" || item.name === "Crypto") {
            change = Math.random() * 3 - 0.5 // Tendency to increase
          } else {
            change = Math.random() * 3 - 2 // Tendency to decrease
          }

          // Ensure values stay within reasonable ranges
          const newValue = Math.max(5, Math.min(60, item.value + change))

          return {
            ...item,
            previousValue,
            value: newValue,
          }
        })
      })

      // Increase optimization score over time
      setOptimizationScore((prev) => Math.min(98, prev + Math.random() * 1.5))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="absolute top-0 left-0 right-0 flex justify-between px-2 text-xs text-muted-foreground">
        <span>Asset Allocation</span>
        <motion.div
          className="flex items-center gap-1 text-primary font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span>Optimization Score:</span>
          <motion.span
            key={optimizationScore.toFixed(0)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {optimizationScore.toFixed(0)}%
          </motion.span>
        </motion.div>
      </div>
      <div className="pt-6 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} domain={[0, 60]} />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}%`, "Allocation"]}
              cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
            />
            <Bar
              dataKey="previousValue"
              fill="#6b7280"
              radius={[0, 0, 0, 0]}
              fillOpacity={0.3}
              name="Previous Allocation"
              stackId="stack"
            />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              name="Current Allocation"
              animationDuration={800}
              animationBegin={300}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(index)} fillOpacity={0.9} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xs text-muted-foreground">Live simulation - data updates every 3s</span>
      </motion.div>
    </>
  )
}

function getColor(index: number) {
  const colors = [
    "#10b981", // green
    "#3b82f6", // blue
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // purple
    "#ec4899", // pink
  ]
  return colors[index % colors.length]
}

export function AboutContent() {
  const teamMembers = [
    {
      name: "Widad",
      role: "Frontend Developer (React & UI/UX)",
      description:
        "Designs and implements the user interface and interactive components. Ensures a responsive, intuitive experience across dashboards, charts, and data displays.",
      icon: Code,
      color: "#10b981", // emerald-500
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGMOWjZz2IIcg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730209502625?e=1749081600&v=beta&t=76ywKPalY7PtfE9Ao92Av9FJAtkBxHKKt_A58KN1jxk",
      skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "UI/UX Design"],
    },
    {
      name: "Douae",
      role: "Backend Developer (API & Data Integration)",
      description:
        "Integrates real-time financial data via the Yahoo Finance API. Manages secure API calls, data fetching, and error handling.",
      icon: Database,
      color: "#3b82f6", // blue-500
      image: "/douae.jpg?height=200&width=200",
      skills: [
        "API Integration",
        "Data Processing",
        "Error Handling",
        "Caching Strategies",
        "Performance Optimization",
      ],
    },
    {
      name: "Imad",
      role: "AI Integration Engineer",
      description:
        "Implements the Gemini 2.0 Flash API to build the AI finance advisor agent. Develops conversation memory and context handling for personalized financial insights.",
      icon: Bot,
      color: "#8b5cf6", // violet-500
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHCkMcy1KIwPQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728263008165?e=1749686400&v=beta&t=9VIOZ3Bog5gHi9nvgd5xjIzFo4OORujefQ4XH6-VjDo",
      skills: ["AI Integration", "NLP", "Conversation Design", "Context Management", "Financial Analysis"],
    },
    {
      name: "Adam",
      role: "DevOps Engineer (Deployment & Infrastructure)",
      description:
        "Oversees deployment, environment configuration, and security (using environment variables). Manages CI/CD pipelines and ensures smooth integration of all application components.",
      icon: Server,
      color: "#f59e0b", // amber-500
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHCkMcy1KIwPQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728263008165?e=1749686400&v=beta&t=9VIOZ3Bog5gHi9nvgd5xjIzFo4OORujefQ4XH6-VjDo",
      skills: ["CI/CD", "Infrastructure Management", "Security", "Environment Configuration", "Deployment Automation"],
    },
  ]

  const features = [
    {
      title: "Interactive Dashboard",
      description: "Real-time financial metrics and portfolio overview with interactive charts and visualizations.",
      icon: LineChart,
      color: "#10b981", // emerald-500
      details:
        "Our dashboard provides a comprehensive overview of your financial status with real-time updates. It features interactive charts that respond to your interactions, allowing you to drill down into specific data points. The dashboard is designed to give you a quick snapshot of your portfolio performance, market trends, and key financial metrics.",
    },
    {
      title: "Portfolio Analysis",
      description: "Detailed portfolio tracking with performance metrics, allocation analysis, and rebalancing tools.",
      icon: PieChart,
      color: "#3b82f6", // blue-500
      details:
        "The Portfolio Analysis section offers in-depth insights into your investments. Track performance over time, analyze asset allocation across different sectors and investment types, and use our rebalancing tools to optimize your portfolio. The interactive charts allow you to visualize your portfolio composition and identify areas for improvement.",
    },
    {
      title: "Market Research",
      description: "Up-to-date market data, stock information, and financial news from reliable sources.",
      icon: BarChart,
      color: "#8b5cf6", // violet-500
      details:
        "Stay informed with our Market Research section, which provides real-time market data, detailed stock information, and the latest financial news. Track market indices, analyze stock performance, and read curated news articles relevant to your investments. The data is sourced from reliable financial APIs and updated in real-time.",
    },
    {
      title: "AI Financial Advisor",
      description: "Personalized financial advice and insights powered by advanced AI technology.",
      icon: Bot,
      color: "#f59e0b", // amber-500
      details:
        "Our AI Financial Advisor leverages advanced natural language processing to provide personalized financial guidance. It can analyze your portfolio, offer investment recommendations, and help with financial planning. The advisor learns from your interactions to provide increasingly relevant advice over time, all while maintaining strict privacy standards.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold">About Finance Advisor</h1>
      </motion.div>

      <Tabs defaultValue="app" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="app">About the App</TabsTrigger>
          <TabsTrigger value="team">Our Team</TabsTrigger>
          <TabsTrigger value="tech">Technology</TabsTrigger>
        </TabsList>

        <TabsContent value="app" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative mt-12 mb-8">
              <motion.div
                className="absolute -z-10"
                animate={{
                  x: [0, 20, 0],
                  y: [0, -30, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 10,
                  ease: "easeInOut",
                }}
                style={{ left: "10%", top: "20%" }}
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 blur-xl" />
              </motion.div>

              <motion.div
                className="absolute -z-10"
                animate={{
                  x: [0, -30, 0],
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 15,
                  ease: "easeInOut",
                }}
                style={{ right: "15%", bottom: "30%" }}
              >
                <div className="w-32 h-32 rounded-full bg-blue-500/10 blur-xl" />
              </motion.div>

              <motion.div
                className="absolute -z-10"
                animate={{
                  x: [0, 15, 0],
                  y: [0, 15, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 20,
                  ease: "easeInOut",
                }}
                style={{ left: "30%", bottom: "10%" }}
              >
                <div className="w-20 h-20 rounded-full bg-amber-500/10 blur-xl" />
              </motion.div>

              <Card className="relative z-10 border-primary/20 overflow-visible">
                <CardHeader className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
                  <CardTitle className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </motion.div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      Why Choose Finance Advisor?
                    </motion.span>
                  </CardTitle>
                  <CardDescription>Powerful tools to help you make informed financial decisions</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="grid gap-6 md:grid-cols-3"
                  >
                    <FeatureCard
                      icon={LineChart}
                      title="Real-time Analytics"
                      description="Get up-to-the-minute data and insights on your investments and market trends."
                      color="#10b981"
                      delay={0.6}
                    />
                    <FeatureCard
                      icon={Bot}
                      title="AI-Powered Advice"
                      description="Receive personalized financial guidance based on your goals and risk tolerance."
                      color="#3b82f6"
                      delay={0.8}
                    />
                    <FeatureCard
                      icon={PieChart}
                      title="Portfolio Optimization"
                      description="Visualize and optimize your asset allocation for better risk-adjusted returns."
                      color="#8b5cf6"
                      delay={1.0}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="mt-12"
                  >
                    <div className="rounded-lg border p-6 bg-gradient-to-br from-background via-primary/5 to-background">
                      <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                      <p className="text-muted-foreground mb-6">
                        Finance Advisor was created with a simple mission: to democratize financial intelligence and
                        empower individuals to make informed investment decisions. We believe that everyone deserves
                        access to powerful financial tools and insights, regardless of their investment experience or
                        portfolio size.
                      </p>

                      <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <motion.div
                          className="relative h-[250px] border rounded-lg p-4 bg-card/50 overflow-hidden"
                          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        >
                          <AnimatedBarChart />
                          <motion.div
                            className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-blue-500/5 blur-xl z-0"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 6,
                              ease: "easeInOut",
                            }}
                          />
                          <motion.div
                            className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/5 blur-xl z-0"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.5, 0.7, 0.5],
                            }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 8,
                              ease: "easeInOut",
                              delay: 1,
                            }}
                          />
                        </motion.div>
                      </motion.div>

                      <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                      <div className="grid gap-4 md:grid-cols-2 mb-6">
                        <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg border p-4 bg-card">
                          <h4 className="font-medium text-primary mb-2">Data Integration</h4>
                          <p className="text-sm">
                            Finance Advisor connects to multiple financial data sources to provide real-time market
                            information, stock prices, and news. Our intelligent caching system ensures optimal
                            performance while maintaining data accuracy.
                          </p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg border p-4 bg-card">
                          <h4 className="font-medium text-primary mb-2">Portfolio Management</h4>
                          <p className="text-sm">
                            Easily track your investments across different asset classes. Add stocks, monitor
                            performance, analyze allocation, and receive rebalancing suggestions to optimize your
                            portfolio.
                          </p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg border p-4 bg-card">
                          <h4 className="font-medium text-primary mb-2">AI-Powered Insights</h4>
                          <p className="text-sm">
                            Our advanced AI analyzes market trends, your portfolio composition, and financial news to
                            provide personalized recommendations and insights tailored to your financial goals.
                          </p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg border p-4 bg-card">
                          <h4 className="font-medium text-primary mb-2">Financial Planning</h4>
                          <p className="text-sm">
                            Set financial goals, track your progress, and use our retirement calculator and budget
                            planner to create a comprehensive financial strategy for your future.
                          </p>
                        </motion.div>
                      </div>

                      <div className="bg-muted/50 p-6 rounded-lg border border-muted">
                        <h3 className="text-lg font-medium mb-3">Why Users Trust Finance Advisor</h3>
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="flex items-start gap-2">
                            <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-500"
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </div>
                            <p className="text-sm">Data privacy and security with no third-party data sharing</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-500"
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </div>
                            <p className="text-sm">Transparent methodology with no hidden fees or commissions</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-500"
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </div>
                            <p className="text-sm">Continuous updates with the latest financial tools and features</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
                <CardTitle>Meet Our Team</CardTitle>
                <CardDescription>The talented individuals behind Finance Advisor</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <motion.div variants={container} initial="hidden" animate="show" className="grid gap-8 md:grid-cols-2">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={member.name}
                      variants={item}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="rounded-lg border overflow-hidden transition-all duration-200 hover:shadow-md"
                    >
                      <div className="p-6 flex flex-col items-center">
                        <motion.div
                          className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4"
                          style={{ borderColor: `${member.color}40` }}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2 + index * 0.1, duration: 0.5, type: "spring" }}
                        >
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={`${member.name} - ${member.role}`}
                            className="object-cover w-full h-full"
                          />
                        </motion.div>
                        <motion.div
                          className="text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                        >
                          <h3 className="font-medium text-lg">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </motion.div>
                        <motion.div
                          className="mt-4 p-4 rounded-lg w-full"
                          style={{ backgroundColor: `${member.color}10` }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="rounded-full p-2" style={{ backgroundColor: `${member.color}20` }}>
                              <member.icon className="h-5 w-5" style={{ color: member.color }} />
                            </div>
                            <p className="text-sm">{member.description}</p>
                          </div>

                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">Skills & Expertise:</p>
                            <div className="flex flex-wrap gap-1">
                              {member.skills.map((skill) => (
                                <motion.span
                                  key={skill}
                                  className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                                  style={{ backgroundColor: `${member.color}20`, color: member.color }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="tech" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
                <CardTitle>Technology Stack</CardTitle>
                <CardDescription>The technologies powering our application</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="rounded-lg border p-4 bg-gradient-to-br from-background to-muted/30">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Code className="h-5 w-5 text-primary" />
                        Frontend
                      </h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>React and Next.js for a responsive, server-side rendered application</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Tailwind CSS for modern, utility-first styling</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Framer Motion for smooth animations and transitions</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Recharts for interactive data visualizations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>shadcn/ui for accessible, reusable UI components</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="rounded-lg border p-4 bg-gradient-to-br from-background to-muted/30">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Database className="h-5 w-5 text-primary" />
                        Backend & Data
                      </h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Yahoo Finance API for real-time market and stock data</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Stock News API for financial news and updates</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Local storage for caching and persistence</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Environment variables for secure API key management</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="rounded-lg border p-4 bg-gradient-to-br from-background to-muted/30">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        AI & Machine Learning
                      </h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Gemini 2.0 Flash API for natural language processing and financial advice</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Context-aware conversation handling for personalized insights</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Conversation memory for consistent user experience</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="rounded-lg border p-4 bg-gradient-to-br from-background to-muted/30">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Server className="h-5 w-5 text-primary" />
                        DevOps & Deployment
                      </h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Vercel for continuous deployment and hosting</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Environment variable management for secure API access</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Optimized build process for performance</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="rounded-lg border p-6 mt-4 bg-gradient-to-br from-primary/5 to-background">
                    <h3 className="text-lg font-medium mb-2">Data Handling Architecture</h3>
                    <div className="relative">
                      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl"></div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border bg-card p-4">
                          <h4 className="font-medium text-primary">1. Data Fetching</h4>
                          <p className="mt-1 text-sm">
                            Real-time API calls to Yahoo Finance and Stock News with intelligent request throttling
                          </p>
                        </div>
                        <div className="rounded-lg border bg-card p-4">
                          <h4 className="font-medium text-primary">2. Caching Layer</h4>
                          <p className="mt-1 text-sm">
                            Local storage caching with time-based invalidation to reduce API calls and improve
                            performance
                          </p>
                        </div>
                        <div className="rounded-lg border bg-card p-4">
                          <h4 className="font-medium text-primary">3. Fallback System</h4>
                          <p className="mt-1 text-sm">
                            Graceful degradation to simulated data when API connections fail, with clear user
                            notifications
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
