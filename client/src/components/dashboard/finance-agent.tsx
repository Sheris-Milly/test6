import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Bot, Send, User, RefreshCw, ChevronDown, Copy, CheckCheck } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Sample agent response
const sampleAdvice = [
  {
    question: "How should I diversify my investment portfolio?",
    answer: `Based on your current portfolio and market conditions, here's my recommendation:

1. **Reduce technology exposure**: Your portfolio is currently 48% allocated to tech stocks, which creates concentration risk. Consider reducing this to 30-35%.

2. **Increase defensive assets**: With current market volatility, add more to consumer staples, healthcare, and utilities (aim for 20-25% combined).

3. **Add more international exposure**: Your portfolio is heavily US-focused. Consider adding 15-20% international stocks for geographical diversification.

4. **Consider fixed income**: With the recent change in interest rate expectations, adding 10-15% high-quality bonds could provide stability.

5. **Keep some cash reserves**: Maintain 5-10% cash position for opportunities and unexpected market movements.

These adjustments would help balance your risk while maintaining good growth potential.`,
  },
  {
    question: "What are the potential impacts of the Federal Reserve's policy on my investments?",
    answer: `The Federal Reserve's recent policy stance could impact your portfolio in several ways:

1. **Interest rate outlook**: The Fed has signaled potential rate cuts this year, which typically benefits growth stocks and real estate. Your technology holdings (AAPL, MSFT, NVDA) may benefit, but be cautious of valuations.

2. **Bond considerations**: Your current bond allocation (BND) will likely appreciate if rates decrease. Consider adding to this position if you agree with the rate cut projections.

3. **Banking sector exposure**: Your financial holdings (JPM, BAC) may face pressure from lower interest rates, as it can reduce net interest margins. Monitor these positions closely.

4. **Inflation concerns**: Despite rate cuts, inflation persistence remains a risk. Your lack of TIPS or commodity exposure could be addressed by adding 5-8% allocation as an inflation hedge.

5. **Dollar strength**: Rate cuts typically weaken the dollar, potentially boosting your international holdings. Consider increasing your international ETF allocation (VXUS) by 5-10%.

The key is to remain balanced while making tactical adjustments as policy evolves.`,
  },
]

interface Message {
  sender: "user" | "assistant"
  content: string
}

export function FinanceAgent({
  marketData,
  newsData,
}: {
  marketData: any
  newsData: any
}) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      content: "Hello! I'm your AI financial advisor. How can I help you with your investments today?",
    },
  ])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedAdvice, setSelectedAdvice] = useState(0)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        content: input,
      },
    ])

    // Clear input
    setInput("")

    // Simulate AI thinking
    setIsGenerating(true)
    
    // In a real app, we would call an API here
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          content: sampleAdvice[Math.floor(Math.random() * sampleAdvice.length)].answer,
        },
      ])
      setIsGenerating(false)
    }, 2000)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="chat">
        <TabsList className="mb-4">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <div className="h-[300px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[80%] items-start gap-2.5 ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 rounded-full items-center justify-center ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] items-start gap-2.5">
                    <div className="flex h-8 w-8 rounded-full items-center justify-center bg-muted">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="rounded-lg px-4 py-2 bg-muted">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 rounded-full bg-current animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 flex border-t bg-background">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Ask a question..."
                className="rounded-r-none border-r-0"
                disabled={isGenerating}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isGenerating}
                className="rounded-l-none"
              >
                {isGenerating ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Tip: Ask detailed questions about portfolio optimization, market trends, or specific investment advice.</p>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="space-y-5">
            <Card className="p-4 bg-muted/40">
              <h3 className="text-lg font-semibold mb-1">Market Summary</h3>
              <p className="text-sm">
                Major indices are showing mixed performance today with tech sectors outperforming. Volatility remains
                low with the VIX at 12.92. Bond yields remain stable around 4.01%, suggesting market confidence in the
                Fed's current policy stance.
              </p>
            </Card>

            <Card className="p-4 bg-muted/40">
              <h3 className="text-lg font-semibold mb-1">Portfolio Analysis</h3>
              <p className="text-sm">
                Your portfolio value of {formatCurrency(124567.89)} has increased by 2.34% today, outperforming the
                broader market. Technology holdings are your main performance drivers. Your current asset allocation
                leans heavily toward growth stocks (68%), with limited exposure to defensive sectors (12%).
              </p>
            </Card>

            <Card className="p-4 bg-muted/40">
              <h3 className="text-lg font-semibold mb-1">Risk Assessment</h3>
              <p className="text-sm">
                Your portfolio shows moderate risk with a beta of 1.2 relative to the S&P 500. While this has benefited
                performance in the current bull market, you may want to consider adding defensive positions to protect
                against potential market corrections.
              </p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-4">
            {sampleAdvice.map((advice, index) => (
              <div
                key={index}
                className={`rounded-lg border p-4 transition-all ${
                  selectedAdvice === index ? "ring-1 ring-primary" : ""
                }`}
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setSelectedAdvice(index)}
                >
                  <h3 className="font-medium">{advice.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      selectedAdvice === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {selectedAdvice === index && (
                  <div className="mt-3 relative">
                    <div className="text-sm whitespace-pre-line pt-2 border-t">
                      {advice.answer}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-0"
                      onClick={() => handleCopy(index, advice.answer)}
                    >
                      {copiedIndex === index ? (
                        <CheckCheck className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}