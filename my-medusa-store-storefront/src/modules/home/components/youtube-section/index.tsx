"use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { Youtube, Play, Clock, Eye } from "lucide-react"

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
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

// Dummy YouTube video data
const videos = [
  {
    id: "1",
    title: "Summer Collection 2024 - Behind the Scenes",
    thumbnail: "https://images.unsplash.com/photo-1596939122461-d57c7d2c0579?w=800&h=450&q=80",
    duration: "10:24",
    views: "15K",
    date: "2 days ago"
  },
  {
    id: "2",
    title: "Streetwear Styling Tips for Spring",
    thumbnail: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&h=450&q=80",
    duration: "8:15",
    views: "12K",
    date: "5 days ago"
  },
  {
    id: "3",
    title: "Sustainable Fashion: Our Commitment",
    thumbnail: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=450&q=80",
    duration: "15:30",
    views: "20K",
    date: "1 week ago"
  }
]

export default function YouTubeSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-emperor-50 dark:from-emperor-950 dark:to-emperor-900 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-glow-gradient from-glow-primary opacity-30 dark:opacity-40 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-glow-gradient from-glow-secondary opacity-30 dark:opacity-40 blur-3xl" />
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
              <Youtube className="w-8 h-8 text-emperor-950 dark:text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white">
                Watch Our Latest Videos
              </h2>
              <p className="text-emperor-600 dark:text-emperor-300 max-w-2xl mx-auto">
                Get an exclusive look behind the scenes, styling tips, and the latest fashion trends
                through our video content.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {videos.map((video) => (
              <motion.a
                key={video.id}
                href="#"
                variants={itemVariants}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                className="group relative bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass rounded-2xl overflow-hidden shadow-glass dark:shadow-glass-dark transition-transform duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Thumbnail */}
                <div className="aspect-video relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-white/80 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 text-emperor-950 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 text-white text-sm font-medium">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="font-medium text-emperor-950 dark:text-white group-hover:text-emperor-600 dark:group-hover:text-emperor-300 transition-colors duration-300">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-emperor-500 dark:text-emperor-400">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{video.date}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-glass-gradient dark:bg-glass-gradient-dark backdrop-blur-glass shadow-glass dark:shadow-glass-dark text-emperor-950 dark:text-white font-medium hover:shadow-glass-sm dark:hover:shadow-glass-dark-sm transition-all duration-300"
            >
              Visit Our Channel
              <Youtube className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}