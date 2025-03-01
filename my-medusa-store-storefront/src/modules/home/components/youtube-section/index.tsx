 "use client"

import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { Youtube } from "lucide-react"

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

// Featured YouTube videos
const videos = [
  {
    id: "1",
    title: "Spring Collection Lookbook 2024",
    description: "Explore our latest spring collection featuring fresh styles and vibrant colors.",
    embedId: "d7O_WZkZq4g",
  },
  {
    id: "2",
    title: "Behind the Scenes: Fashion Week",
    description: "Get an exclusive look at our preparation and showcase at Fashion Week.",
    embedId: "ScZFJKVrlute",
  },
  {
    id: "3",
    title: "Style Guide: Streetwear Essentials",
    description: "Learn how to style our streetwear pieces for any occasion.",
    embedId: "qK4vBx-Qfdq",
  }
]

export default function YoutubeSection() {
  return (
    <section className="py-16 bg-emperor-50 dark:bg-emperor-900">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto">
              <Youtube className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white">
              Watch Our Latest Videos
            </h2>
            <p className="text-emperor-600 dark:text-emperor-300 max-w-2xl mx-auto">
              Discover styling tips, behind-the-scenes content, and more
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {videos.map((video) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                className="space-y-4"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-emperor-100 dark:bg-emperor-800">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-display text-emperor-950 dark:text-white">
                    {video.title}
                  </h3>
                  <p className="text-sm text-emperor-600 dark:text-emperor-300">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <a
              href="https://youtube.com/@your-store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emperor-950 dark:bg-white text-white dark:text-emperor-950 rounded-full hover:bg-emperor-800 dark:hover:bg-emperor-100 transition-colors font-medium"
            >
              Subscribe to Our Channel
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}