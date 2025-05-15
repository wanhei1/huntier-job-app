"use client"

import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

interface QRImageProps {
  size?: "sm" | "md" | "lg"
  lang: string
}

export function QRImage({ size = "md", lang }: QRImageProps) {
  const sizes = {
    sm: { className: "text-xs px-2 py-1" },
    md: { className: "text-sm px-3 py-2" },
    lg: { className: "text-base px-4 py-3" }
  }

  const { className } = sizes[size]
  return (
    <a 
      href="https://forms.office.com/Pages/ResponsePage.aspx?id=ROSIKAh8xEeDWfJL0sT0JiIbgHXDTOxPl-deIlSNGStUMzZaQ1NVUFBEQUJJNjJXQzFXTVY0S1JFWi4u&origin=QRCode"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-medium transition-all ${className} shadow-md hover:shadow-lg`}
    >
      {lang === 'en' ? "Application Form" : "申请表"}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  )
}
