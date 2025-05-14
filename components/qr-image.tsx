"use client"

import Image from 'next/image'

interface QRImageProps {
  size?: "sm" | "md" | "lg"
  lang: string
}

export function QRImage({ size = "md", lang }: QRImageProps) {
  const sizes = {
    sm: { width: 100, height: 100, className: "rounded-lg" },
    md: { width: 150, height: 150, className: "rounded-xl" },
    lg: { width: 200, height: 200, className: "rounded-2xl" }
  }

  const { width, height, className } = sizes[size]

  return (
    <div className={`overflow-hidden border-2 border-emerald-200 dark:border-emerald-800 shadow-lg ${className} bg-white`}>
      <Image 
        src="/qr-code.png" 
        alt={lang === 'en' ? "Huntier Job Application Form QR Code" : "Huntier 求职信息表二维码"} 
        width={width} 
        height={height}
        className="w-full h-auto"
      />
    </div>
  )
}
