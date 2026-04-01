import Teachers from '../components/Teachers'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function TeachersPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 min-h-screen"
    >
      <Teachers limit={100} />
    </motion.div>
  )
}
