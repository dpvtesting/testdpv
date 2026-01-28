'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import polygon from '@/assets/polygon.png'
import { motion, AnimatePresence } from 'motion/react'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.03,
      staggerChildren: 0.05,
    },
  },
}

const itemVar = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
}

const Dropdown = ({ placeholder, items, onSelect, value }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <button
        className="relative w-full p-1.5 xl:px-3 xl:py-1.5 flex items-center justify-between border border-gray-dpv-8 cursor-pointer"
        onClick={() => setVisible(true)}>
        <div className="font-semibold">
          {value ? value : placeholder}
        </div>

        <div>
          <Image src={polygon} alt="icon" className="w-3 mt-0.5" />
        </div>
      </button>

      {visible && (
        <div
          onClick={() => setVisible(false)}
          className="fixed top-0 left-0 h-screen w-screen bg-transparent z-20" />
      )}

      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute top-full w-full z-20"
            initial={{opacity: 0}}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="px-2 mt-2 border border-gray-8 divide-y divide-gray-dpv-8 flex flex-col bg-white w-60 xl:w-auto">
              {
                items?.map(item => (
                  <motion.button
                    key={item.id}
                    variants={itemVar}
                    className="py-2 cursor-pointer text-left"
                    onClick={() => {
                      setVisible(false)
                      onSelect && onSelect(item)
                    }}>
                    {item.value}
                  </motion.button>
                ))
              }
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown