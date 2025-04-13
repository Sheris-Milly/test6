import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Plus, 
  ThumbsUp, 
  ThumbsDown, 
  Clock, 
  RefreshCw, 
  Trash2, 
  MessagesSquare, 
  Bot, 
  Brain,
  User as UserIcon
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: Date;
  feedback?: "like" | "dislike";
}

export default function AIAdvisorPage() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "assistant",
      content: "Hello! I'm your AI Financial Advisor. I can help you with investment strategies, retirement planning, market analysis, and more. What would you like to know about your finances today?",
      timestamp: new Date()
    }
  ]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: prompt,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        content: "I'll analyze your portfolio and provide personalized advice based on your financial goals and current market conditions. Our multi-agent system combines insights from specialized AI experts in different financial domains to give you comprehensive guidance.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const formatMessageDate = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const startNewChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "assistant",
        content: "Hello! I'm your AI Financial Advisor. I can help you with investment strategies, retirement planning, market analysis, and more. What would you like to know about your finances today?",
        timestamp: new Date()
      }
    ]);
  };

  const provideFeedback = (messageId: string, feedback: "like" | "dislike") => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? { ...message, feedback }
          : message
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <SidebarNavigation />

      <div className="flex-1 p-6 lg:p-8 overflow-auto flex flex-col">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">AI Financial Advisor</h1>
            <p className="text-muted-foreground mt-1">
              Powered by a multi-agent system with specialized financial expertise
            </p>
          </header>

          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="px-4 py-3 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Financial Advisor Chat</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={startNewChat}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Chat
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => setMessages([])}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear History
                  </Button>
                </div>
              </div>
            </CardHeader>
            <div className="flex flex-1 overflow-hidden">
              <div className="w-[280px] border-r overflow-auto hidden md:block p-3">
                <div className="mb-4">
                  <Input
                    placeholder="Search conversations..."
                    className="h-9"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                    RECENT CONVERSATIONS
                  </div>
                  <button className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted text-left">
                    <MessagesSquare className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 truncate">
                      <div className="text-sm font-medium">Retirement Planning</div>
                      <div className="text-xs text-muted-foreground truncate">
                        Discussing 401k allocation...
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">2h ago</div>
                  </button>
                  <button className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted text-left">
                    <MessagesSquare className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 truncate">
                      <div className="text-sm font-medium">Portfolio Review</div>
                      <div className="text-xs text-muted-foreground truncate">
                        Analysis of tech stocks in your...
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">1d ago</div>
                  </button>
                  <button className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted text-left">
                    <MessagesSquare className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 truncate">
                      <div className="text-sm font-medium">Market Analysis</div>
                      <div className="text-xs text-muted-foreground truncate">
                        Impact of recent Fed decisions...
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">3d ago</div>
                  </button>
                </div>
              </div>
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-auto p-4">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <Bot className="h-12 w-12 mb-4 text-muted-foreground/60" />
                      <h3 className="text-lg font-semibold mb-2">Start a New Conversation</h3>
                      <p className="text-muted-foreground max-w-md mb-8">
                        Ask about investment strategies, retirement planning, market analysis, or any
                        financial questions you have.
                      </p>
                      <div className="flex flex-col gap-1 w-full max-w-md">
                        <p className="text-sm font-medium mb-1">Suggested topics:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-auto py-1.5"
                            onClick={() => setPrompt("What stocks should I consider for long-term growth?")}
                          >
                            Growth stocks
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-auto py-1.5"
                            onClick={() => setPrompt("How can I optimize my retirement savings?")}
                          >
                            Retirement planning
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-auto py-1.5"
                            onClick={() => setPrompt("What's your analysis of the current market conditions?")}
                          >
                            Market analysis
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-auto py-1.5"
                            onClick={() => setPrompt("How should I diversify my investment portfolio?")}
                          >
                            Portfolio diversification
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-auto py-1.5"
                            onClick={() => setPrompt("What tax strategies can help maximize my investment returns?")}
                          >
                            Tax strategies
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`flex gap-3 max-w-3xl ${
                              message.sender === "user" ? "flex-row-reverse" : ""
                            }`}
                          >
                            <Avatar className="h-8 w-8">
                              {message.sender === "user" ? (
                                <>
                                  <AvatarImage src="" />
                                  <AvatarFallback className="bg-primary text-primary-foreground">
                                    {user?.firstName?.[0] || user?.username?.[0] || "U"}
                                  </AvatarFallback>
                                </>
                              ) : (
                                <>
                                  <AvatarImage src="" />
                                  <AvatarFallback className="bg-zinc-800 text-zinc-200">
                                    <Bot className="h-4 w-4" />
                                  </AvatarFallback>
                                </>
                              )}
                            </Avatar>
                            <div
                              className={`p-3 rounded-lg ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <div className="text-sm">{message.content}</div>
                              <div className="flex items-center justify-between mt-2">
                                <div className="text-xs opacity-70">
                                  {formatMessageDate(message.timestamp)}
                                </div>
                                {message.sender === "assistant" && (
                                  <div className="flex items-center gap-1">
                                    <button
                                      className={`p-1 rounded-full hover:bg-background/10 ${
                                        message.feedback === "like"
                                          ? "text-green-500"
                                          : "opacity-50"
                                      }`}
                                      onClick={() => provideFeedback(message.id, "like")}
                                    >
                                      <ThumbsUp className="h-3 w-3" />
                                    </button>
                                    <button
                                      className={`p-1 rounded-full hover:bg-background/10 ${
                                        message.feedback === "dislike"
                                          ? "text-red-500"
                                          : "opacity-50"
                                      }`}
                                      onClick={() => provideFeedback(message.id, "dislike")}
                                    >
                                      <ThumbsDown className="h-3 w-3" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="flex gap-3 max-w-3xl">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" />
                              <AvatarFallback className="bg-zinc-800 text-zinc-200">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="p-3 rounded-lg bg-muted animate-pulse flex items-center">
                              <div className="text-sm">Thinking...</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-4 border-t">
                  <form onSubmit={sendMessage} className="flex gap-2">
                    <Textarea
                      placeholder="Ask a question about your finances..."
                      className="min-h-12 resize-none"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!prompt.trim() || isLoading}
                      className={isLoading ? "opacity-50" : ""}
                    >
                      {isLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}