"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send, Trash2, Download, ChevronRight, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { generateAIResponse } from "@/lib/api/gemini-api"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface EnhancedFinanceAgentProps {
  marketData: any
  newsData: any
  isLoading: boolean
}

export function EnhancedFinanceAgent({ marketData, newsData, isLoading }: EnhancedFinanceAgentProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem("conversationHistory")
    return saved
      ? JSON.parse(saved)
      : [
          {
            role: "assistant",
            content:
              "Hello! I'm your AI financial advisor. How can I help you with your investments or financial planning today?",
          },
        ]
  })

  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Predefined questions for quick access
  const questionCategories = [
    {
      name: "Market Analysis",
      icon: BarChart3,
      color: "#10b981",
      questions: [
        "What's your analysis of the current market conditions?",
        "How are tech stocks performing today?",
        "What's the outlook for the S&P 500 this quarter?",
        "Which sectors are showing the most growth potential?",
      ],
    },
    {
      name: "Investment Strategy",
      icon: TrendingUp,
      color: "#3b82f6",
      questions: [
        "How should I diversify my portfolio?",
        "What's a good strategy for tax-efficient investing?",
        "Should I invest in bonds in the current market?",
        "How can I reduce my investment risk?",
      ],
    },
    {
      name: "Retirement Planning",
      icon: PiggyBank,
      color: "#8b5cf6",
      questions: [
        "What are some good retirement planning strategies?",
        "How much should I be saving for retirement?",
        "Should I prioritize a Roth IRA or traditional 401(k)?",
        "When should I start taking Social Security benefits?",
      ],
    },
  ]

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Save conversation history to localStorage
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("conversationHistory", JSON.stringify(messages))
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)

    try {
      // Create context for the AI with market data and news
      const context = {
        marketData: marketData?.data
          ? {
              symbol: marketData.data.symbol,
              price: marketData.data.price,
              change: marketData.data.change,
              changePercent: marketData.data.change_percent,
            }
          : null,
        recentNews:
          newsData?.data?.news?.slice(0, 3).map((item: any) => ({
            title: item.article_title,
            source: item.source,
          })) || [],
      }

      const response = await generateAIResponse(
        messages.map((m) => ({ role: m.role, content: m.content })),
        userMessage.content,
        context,
      )

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating AI response:", error)

      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    setSelectedCategory(null)
    // Focus the textarea
    textareaRef.current?.focus()
  }

  const clearConversation = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I'm your AI financial advisor. How can I help you with your investments or financial planning today?",
      },
    ])
    localStorage.removeItem("conversationHistory")
  }

  const downloadConversation = () => {
    const conversationText = messages.map((msg) => `${msg.role === "user" ? "You" : "AI"}: ${msg.content}`).join("\n\n")

    const blob = new Blob([conversationText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `finance-advisor-conversation-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-24 w-full" />
        <div className="space-y-2 mt-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex max-w-[85%] rounded-lg px-4 py-2",
                message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              {message.content}
            </motion.div>
          ))}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 bg-muted w-max rounded-lg px-4 py-2"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <p>Thinking...</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t flex flex-col gap-4">
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Card className="border-primary/20">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">{selectedCategory} Questions</h3>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setSelectedCategory(null)}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                  <div className="grid gap-1.5">
                    {questionCategories
                      .find((cat) => cat.name === selectedCategory)
                      ?.questions.map((question, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          size="sm"
                          className="justify-start h-auto py-1.5 px-2 text-left text-xs"
                          onClick={() => handleQuickQuestion(question)}
                        >
                          <ChevronRight className="mr-1 h-3 w-3 text-primary" />
                          {question}
                        </Button>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {questionCategories.map((category, idx) => {
            const Icon = category.icon
            return (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className={cn(
                  "flex-shrink-0 transition-all duration-200",
                  selectedCategory === category.name && "border-primary bg-primary/5",
                )}
                style={{
                  borderColor: selectedCategory === category.name ? category.color : undefined,
                  backgroundColor: selectedCategory === category.name ? `${category.color}10` : undefined,
                }}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
              >
                <Icon className="mr-1 h-4 w-4" style={{ color: category.color }} />
                {category.name}
              </Button>
            )
          })}
          <Button variant="outline" size="sm" className="flex-shrink-0" onClick={() => setSelectedCategory("Help")}>
            <HelpCircle className="mr-1 h-4 w-4" />
            Help
          </Button>
        </div>

        <div className="flex gap-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={clearConversation}
              title="Clear conversation"
              className="bg-background hover:bg-muted"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Clear conversation</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={downloadConversation}
              title="Download conversation"
              className="bg-background hover:bg-muted"
            >
              <Download className="h-4 w-4" />
              <span className="sr-only">Download conversation</span>
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your finances, market trends, or investment advice..."
              className="min-h-12 resize-none flex-1 bg-background focus-visible:ring-primary"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isProcessing || !input.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

// Import the icons used in the component
import { BarChart3, TrendingUp, PiggyBank, X } from "lucide-react"
