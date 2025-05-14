"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { QrCode } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

interface QRCodeProps {
  lang: string
}

export function ApplicationQRCode({ lang }: QRCodeProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full w-12 h-12 bg-white border-emerald-200 hover:bg-emerald-50 dark:bg-gray-800 dark:border-emerald-800 dark:hover:bg-emerald-900/30 shadow-md"
        >
          <QrCode className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-emerald-100 dark:border-emerald-900/50">
        <div className="flex flex-col items-center justify-center p-4">
          <h3 className="text-xl font-medium mb-4 text-center">
            {lang === 'en' 
              ? 'Huntier Job Application Form'
              : 'Huntier 求职信息表 Job Application Form'}
          </h3>
          <div className="rounded-xl overflow-hidden border-2 border-emerald-200 dark:border-emerald-800 shadow-lg">
            <Image 
              src="/qr-code.png" 
              alt="Application QR Code" 
              width={300} 
              height={300}
              className="w-full h-auto"
            />
          </div>
          <p className="text-sm text-center text-muted-foreground mt-4">
            {lang === 'en' 
              ? 'Scan with your phone camera to access the job application form'
              : '用手机扫描二维码访问求职申请表'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
