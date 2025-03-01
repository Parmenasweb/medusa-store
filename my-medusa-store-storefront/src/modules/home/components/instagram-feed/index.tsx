"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { Instagram } from "lucide-react"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

// Mock Instagram posts data
// In a real implementation, this would come from Instagram's API
const instagramPosts = [
  {
    id: "1",
    imageUrl: "/instagram/post1.jpg",
    likes: 234,
    comments: 12,
    link: "https://instagram.com"
  },
  {
    id: "2",
    imageUrl: "/instagram/post2.jpg",
    likes: 456,
    comments: 23,
    link: "https://instagram.com"
  },
  {
    id: "3",
    imageUrl: "/instagram/post3.jpg",
    likes: 789,
    comments: 45,
    link: "https://instagram.com"
  },
  {
    id: "4",
    imageUrl: "/instagram/post4.jpg",
    likes: 123,
    comments: 8,
    link: "https://instagram.com"
  }
]

export default function InstagramFeed() {
  return (
    <section className="py-16 bg-white dark:bg-emperor-950">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center mx-auto">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white">
              Follow Us on Instagram
            </h2>
            <p className="text-emperor-600 dark:text-emperor-300 max-w-2xl mx-auto">
              Get inspired by our latest styles and behind-the-scenes content
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {instagramPosts.map((post) => (
              <motion.a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="group relative aspect-square overflow-hidden rounded-lg bg-emperor-100 dark:bg-emperor-800"
              >
                <Image
                  src={post.imageUrl}
                  alt="Instagram post"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="font-medium">{post.likes} likes</p>
                    <p className="text-sm">{post.comments} comments</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <a
              href="https://instagram.com/your-store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 rounded-full hover:bg-emperor-800 dark:hover:bg-emperor-100 transition-colors font-medium"
            >
              Follow @your-store
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
} 