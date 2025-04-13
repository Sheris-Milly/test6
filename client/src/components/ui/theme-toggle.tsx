import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // On mount, read the theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      // Check system preference
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDarkMode ? "dark" : "light")
    }
  }, [])

  // Sync theme state with document
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  )
}

export { ThemeToggle }
export default ThemeToggle