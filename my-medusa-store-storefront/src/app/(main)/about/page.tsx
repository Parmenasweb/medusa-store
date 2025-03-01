import { Metadata } from "next"
import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us | Emperor's Clothing",
  description: "Learn about our story, mission, and values at Emperor's Clothing.",
}

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

export default function AboutPage() {
  return (
    <div className="min-h-[100vh] bg-white dark:bg-emperor-950">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-gradient-to-r from-emperor-100 to-emperor-200 dark:from-emperor-900 dark:to-emperor-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Container>
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-emperor-950 dark:text-white mb-4">
              Our Story
            </h1>
            <p className="text-lg md:text-xl text-emperor-600 dark:text-emperor-300">
              Crafting exceptional fashion experiences since 2023
            </p>
          </motion.div>
        </Container>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        className="py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white">
                Our Mission
              </h2>
              <p className="text-emperor-600 dark:text-emperor-300 leading-relaxed">
                At Emperor's Clothing, we believe that fashion is more than just clothing—it's a form of self-expression, confidence, and empowerment. Our mission is to provide high-quality, sustainable fashion that helps you express your unique style while maintaining our commitment to ethical practices and environmental responsibility.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/about-mission.jpg"
                alt="Our mission in action"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="py-16 md:py-24 bg-emperor-50 dark:bg-emperor-900"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white text-center mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                description: "We source the finest materials and partner with skilled artisans to create clothing that lasts."
              },
              {
                title: "Sustainability",
                description: "Environmental responsibility is at the heart of everything we do, from production to packaging."
              },
              {
                title: "Innovation",
                description: "We continuously explore new technologies and techniques to improve our products and services."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="bg-white dark:bg-emperor-800 p-8 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-display text-emperor-950 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-emperor-600 dark:text-emperor-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-emperor-950 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-emperor-600 dark:text-emperor-300">
              Passionate individuals dedicated to bringing you the best in fashion
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Creative Director",
                image: "/team-1.jpg"
              },
              {
                name: "Sarah Johnson",
                role: "Head of Design",
                image: "/team-2.jpg"
              },
              {
                name: "Michael Lee",
                role: "Sustainability Lead",
                image: "/team-3.jpg"
              }
            ].map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="text-center"
              >
                <div className="relative h-[300px] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-display text-emperor-950 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-emperor-600 dark:text-emperor-300">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>
    </div>
  )
} 