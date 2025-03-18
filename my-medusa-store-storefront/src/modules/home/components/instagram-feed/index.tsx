"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { Instagram, ExternalLink, Heart, MessageCircle } from "lucide-react"

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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

// Mock Instagram data - replace with real API integration
const instagramPosts = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&q=80",
    likes: 234,
    comments: 12,
    aspectRatio: "4/5",
    caption: "New collection dropping soon 🔥 #fashion #streetwear"
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&q=80",
    likes: 567,
    comments: 23,
    aspectRatio: "4/3",
    caption: "Behind the scenes at our latest shoot 📸 #bts"
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=800&q=80",
    likes: 890,
    comments: 45,
    aspectRatio: "4/5",
    caption: "Summer vibes in our new collection ☀️ #summertime"
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&h=600&q=80",
    likes: 432,
    comments: 18,
    aspectRatio: "4/3",
    caption: "Style is a way to say who you are without speaking 💫"
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?w=600&h=800&q=80",
    likes: 765,
    comments: 34,
    aspectRatio: "4/5",
    caption: "Sustainable fashion is the future 🌿 #ecofriendly"
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&h=600&q=80",
    likes: 321,
    comments: 15,
    aspectRatio: "4/3",
    caption: "Express yourself through fashion 🎨 #styleinspo"
  }
]

export default function InstagramFeed() {
  return (
    <section className="py-24 bg-gradient-to-b from-emperor-50 to-white dark:from-emperor-900 dark:to-emperor-950 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-glow-gradient from-glow-secondary opacity-30 dark:opacity-40 blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-glow-gradient from-glow-primary opacity-30 dark:opacity-40 blur-3xl" />
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative space-y-16"
        >
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark flex items-center justify-center mx-auto">
              <Instagram className="w-8 h-8 text-emperor-950 dark:text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white">
                Follow Our Style Journey
              </h2>
              <p className="text-emperor-600 dark:text-emperor-300 max-w-2xl mx-auto">
                Get inspired by our latest collections and behind-the-scenes moments on Instagram.
                Join our community of fashion enthusiasts.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {instagramPosts.map((post) => (
              <motion.a
                key={post.id}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group relative block overflow-hidden rounded-2xl bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark"
                style={{ 
                  aspectRatio: post.aspectRatio,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={post.imageUrl}
                    alt="Instagram post"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{post.comments}</span>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                      <p className="text-sm text-white/90 line-clamp-2">
                        {post.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark text-emperor-950 dark:text-white font-medium hover:shadow-glass-sm dark:hover:shadow-glass-dark-sm transition-all duration-300"
            >
              Follow Us on Instagram
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
} 