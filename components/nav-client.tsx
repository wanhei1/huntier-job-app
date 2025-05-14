"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface NavClientProps {
  lang: string
  navItems: Array<{ name: string; href: string }>
  myProfileText: string
}

export function NavClient({ lang, navItems, myProfileText }: NavClientProps) {
  const pathname = usePathname()

  const navItemVariants = {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, y: -2 }
  }

  // Stagger animation for nav items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <>
      <motion.nav 
        className="hidden md:flex items-center gap-6 ml-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={navItemVariants}
            transition={{ 
              duration: 0.2,
              type: "spring",
              stiffness: 400,
              damping: 17
            }}
          >
            <Link
              href={item.href}
              className={cn(
                "text-sm font-medium transition-all duration-300 relative group nav-link",
                pathname === item.href 
                  ? "text-emerald-600 dark:text-emerald-400 font-semibold" 
                  : "text-foreground/80 hover:text-emerald-600 dark:hover:text-emerald-400"
              )}
            >
              {item.name}
              <span className={cn(
                "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ease-out rounded-full",
                pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          </motion.div>
        ))}
      </motion.nav>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-full h-9 w-9 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/30 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Menu className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-l border-emerald-100/30 dark:border-emerald-900/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
            <motion.div 
              className="flex flex-col gap-4 mt-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ 
                    x: 5, 
                    transition: { 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 10 
                    } 
                  }}
                  transition={{ 
                    delay: 0.1 + index * 0.1, 
                    duration: 0.3,
                    type: "spring", 
                    stiffness: 300
                  }}
                  className="animate-slide-left"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-all duration-300 relative block py-2 px-3 rounded-lg",
                      pathname === item.href 
                        ? "text-white bg-gradient-to-r from-emerald-600 to-teal-500 shadow-md" 
                        : "text-foreground/80 hover:text-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
