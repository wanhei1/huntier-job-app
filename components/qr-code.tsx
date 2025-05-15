"use client"

import { Button } from '@/components/ui/button'
import { QrCode } from 'lucide-react'

interface QRCodeProps {
  lang: string
}

export function ApplicationQRCode({ lang }: QRCodeProps) {
  return (
    <a 
      href="https://forms.office.com/Pages/ResponsePage.aspx?id=ROSIKAh8xEeDWfJL0sT0JiIbgHXDTOxPl-deIlSNGStUMzZaQ1NVUFBEQUJJNjJXQzFXTVY0S1JFWi4u&origin=QRCode"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full w-12 h-12 bg-white border-emerald-200 hover:bg-emerald-50 dark:bg-gray-800 dark:border-emerald-800 dark:hover:bg-emerald-900/30 shadow-md relative group"
        title={lang === 'en' ? 'Click to apply' : '点击申请'}
      >
        <QrCode className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-slate-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {lang === 'en' ? 'Click to apply' : '点击申请'}
        </span>
      </Button>
    </a>
  )
}