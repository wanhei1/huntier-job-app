import Link from "next/link"
import { BriefcaseBusiness } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { NavClient } from "@/components/nav-client"
import { getDictionary } from "@/lib/dictionary"
import styles from '@/styles/navbar-animations.module.css'
import { ApplicationQRCode } from "@/components/qr-code"

interface NavbarProps {
  lang: string
}

export async function Navbar({ lang }: NavbarProps) {
  const dictionary = await getDictionary(lang)
  const navItems = [
    { name: dictionary.navbar.resources, href: `/${lang}/resources` },
    { name: dictionary.navbar.about, href: `/${lang}/about` },
    { name: dictionary.navbar.uploadCV, href: `/${lang}/uploadcv` },
  ]

  return (
    <header className="sticky top-4 z-50 w-full flex justify-center animate-fade-in">
      <div className="relative max-w-5xl w-[95%] mx-auto">
        {/* Morphing blob background with subtle rotation */}
        <div className={`navbar-pill absolute inset-0 animate-morph-blob backdrop-blur-xl animate-subtle-rotate`}></div>
        
        {/* Background glow effect */}
        <div className={`navbar-glow animate-glow-pulse`}></div>
        
        {/* Glow shine effect - adds a moving highlight */}
        <div className={`absolute inset-0 rounded-full overflow-hidden animate-glow-shimmer`}></div>
        
        {/* Animated blobs in background */}
        <div className="navbar-blob-background">
          <div className="navbar-blob navbar-blob-1"></div>
          <div className="navbar-blob navbar-blob-2"></div>
          <div className="navbar-blob navbar-blob-3"></div>
        </div>
        
        <div className="relative flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <Link 
              href={`/${lang}`} 
              className="flex items-center gap-2 transition-all hover:opacity-90 group"
            >
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <BriefcaseBusiness className="h-6 w-6 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110 duration-300 relative" />
              </div>
              <span className="text-xl font-bold tracking-tight relative">
                huntier
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
              </span>
            </Link>
            <NavClient lang={lang} navItems={navItems} myProfileText={dictionary.navbar.myProfile} />
          </div>          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 transition-all hover:scale-105">
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-2 transition-all hover:scale-105">
              <LanguageToggle
                lang={lang}
                translations={{
                  english: dictionary.languageToggle.english,
                  chinese: dictionary.languageToggle.chinese,
                }}
              />
            </div>
            <div className="relative transition-all hover:scale-105">
              <ApplicationQRCode lang={lang} />
              <div className="absolute top-0 right-0 w-full h-full bg-transparent rounded-full animate-ping-slow opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
