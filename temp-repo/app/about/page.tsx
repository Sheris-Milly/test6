import type { Metadata } from "next"
import { AppLayout } from "@/components/app-layout"
import { AboutContent } from "@/components/about/about-content"

export const metadata: Metadata = {
  title: "About | Finance Advisor",
  description: "Learn about our Finance Advisor application and team",
}

export default function AboutPage() {
  return (
    <AppLayout>
      <AboutContent />
    </AppLayout>
  )
}
