'use client'
import React, { useRef } from 'react'
import Container from '@/components/Container'
import ContactUsButton from '@/components/ContactUsButton'
import Image from 'next/image'
import useAssetUrl from '@/hook/asset'
import { motion, useScroll, useTransform } from 'motion/react'

const SolutionHeader = ({ background, title }) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const MotionImage = motion.create(Image)

  return (
    <div ref={ref} className="h-[75vh] xl:h-[65vh] relative">
      <div className="h-[75vh] xl:h-[65vh] relative overflow-hidden">
        <MotionImage
          src={useAssetUrl(background.path)}
          style={{ scale, y }}
          width={background.width}
          height={background.height}
          className="w-full h-full object-cover origin-top-left"
          alt="background" />
        <div className="absolute top-0 left-0 inset-0 bg-gradient-to-b from-transparent to-blue-dpv" />
      </div>

      <Container className="absolute bottom-0 left-0 w-full flex flex-col">
        <div className="xl:w-[40%] text-4xl xl:text-[46px] -mt-1.5 mb-8 font-semibold leading-12 xl:leading-14 text-white-dpv">
          {title}
        </div>
        <div>
          <ContactUsButton
            shadow
            withArrow />
        </div>
      </Container>
    </div>
  )
}

export default SolutionHeader