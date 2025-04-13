import os
from typing import Dict, Any, Optional
import google.generativeai as genai
from langchain.prompts import PromptTemplate
from langchain_google_genai import GoogleGenerativeAIChat
from langchain.chains import LLMChain
from langchain.agents import initialize_agent, Tool
from langchain_core.language_models import BaseChatModel
import json

# Initialize the Gemini API
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# Define the specialized agents
market_analysis_prompt = PromptTemplate(
    input_variables=["question", "context"],
    template="""
    You are a financial market analysis expert. Consider the user's question and any provided context.
    Question: {question}
    Context: {context}
    
    Provide a detailed market analysis based on the question, including:
    1. Market trends related to the query
    2. Economic indicators that might impact the user's financial decisions
    3. Sector-specific insights if applicable
    """
)

investment_advice_prompt = PromptTemplate(
    input_variables=["question", "context"],
    template="""
    You are a certified financial advisor specializing in investment strategies. Consider the user's question and any provided context.
    Question: {question}
    Context: {context}
    
    Provide professional investment advice based on the question, including:
    1. Asset allocation recommendations
    2. Risk assessment
    3. Investment timeframes
    4. Diversification strategies
    """
)

tax_planning_prompt = PromptTemplate(
    input_variables=["question", "context"],
    template="""
    You are a tax planning specialist. Consider the user's question and any provided context.
    Question: {question}
    Context: {context}
    
    Provide tax planning advice based on the question, including:
    1. Tax efficiency strategies
    2. Potential tax implications of financial decisions
    3. Relevant tax laws or regulations
    4. Tax-advantaged account recommendations
    
    Note: Clarify that this is general advice and not legal or accounting advice.
    """
)

retirement_planning_prompt = PromptTemplate(
    input_variables=["question", "context"],
    template="""
    You are a retirement planning specialist. Consider the user's question and any provided context.
    Question: {question}
    Context: {context}
    
    Provide retirement planning advice based on the question, including:
    1. Retirement savings strategies
    2. Retirement income projections
    3. Social security considerations
    4. Retirement account recommendations
    """
)

# Initialize Gemini model
def create_gemini_llm(model_name="gemini-1.5-flash") -> BaseChatModel:
    return GoogleGenerativeAIChat(
        model=model_name,
        temperature=0.3,
        google_api_key=GOOGLE_API_KEY,
        convert_system_message_to_human=True
    )

# Create specialized agents
market_analysis_llm = create_gemini_llm()
investment_advice_llm = create_gemini_llm()
tax_planning_llm = create_gemini_llm()
retirement_planning_llm = create_gemini_llm()

market_analysis_chain = LLMChain(llm=market_analysis_llm, prompt=market_analysis_prompt)
investment_advice_chain = LLMChain(llm=investment_advice_llm, prompt=investment_advice_prompt)
tax_planning_chain = LLMChain(llm=tax_planning_llm, prompt=tax_planning_prompt)
retirement_planning_chain = LLMChain(llm=retirement_planning_llm, prompt=retirement_planning_prompt)

# Define tools for the router agent
tools = [
    Tool(
        name="MarketAnalysis",
        func=lambda inp: market_analysis_chain.run(json.loads(inp)),
        description="Use this for questions about market trends, economic indicators, and financial markets.",
    ),
    Tool(
        name="InvestmentAdvice",
        func=lambda inp: investment_advice_chain.run(json.loads(inp)),
        description="Use this for questions about investment strategies, asset allocation, and portfolio management.",
    ),
    Tool(
        name="TaxPlanning",
        func=lambda inp: tax_planning_chain.run(json.loads(inp)),
        description="Use this for questions about tax optimization, tax implications of financial decisions, and tax strategies.",
    ),
    Tool(
        name="RetirementPlanning",
        func=lambda inp: retirement_planning_chain.run(json.loads(inp)),
        description="Use this for questions about retirement savings, retirement accounts, and retirement income strategies.",
    ),
]

# Create the router agent
router_llm = create_gemini_llm()
router_agent = initialize_agent(
    tools,
    router_llm,
    agent="zero-shot-react-description",
    verbose=True
)

def get_financial_advice(question: str, context: Optional[Dict[Any, Any]] = None) -> str:
    """
    Process a financial question through the multi-agent system and return advice.
    
    Args:
        question: The user's financial question
        context: Optional context like market data, portfolio data, etc.
    
    Returns:
        str: The AI-generated financial advice
    """
    if context is None:
        context = {}
    
    try:
        # Prepare input for the router agent
        inp = {
            "question": question,
            "context": json.dumps(context)
        }
        
        # Execute the router agent to determine the best specialized agent
        result = router_agent.run(f"Question: {question}\nContext: {json.dumps(context)}")
        return result
    
    except Exception as e:
        return f"I apologize, but I encountered an error while generating financial advice: {str(e)}. Please try a different question or contact support."