"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@lib/providers/theme-provider"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-emperor-100 dark:bg-emperor-800 text-emperor-800 dark:text-emperor-100 hover:bg-emperor-200 dark:hover:bg-emperor-700 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : 180,
        }}
        transition={{ duration: 0.2 }}
        style={{ position: "absolute" }}
      >
        <Moon size={20} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === "light" ? 1 : 0,
          rotate: theme === "light" ? 0 : -180,
        }}
        transition={{ duration: 0.2 }}
        style={{ position: "absolute" }}
      >
        <Sun size={20} />
      </motion.div>
    </motion.button>
  )
} 