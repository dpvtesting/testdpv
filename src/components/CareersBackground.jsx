'use client'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import useAssetUrl from '@/hook/asset'
import Image from 'next/image'
import Button from '@/components/Button'
import arrowRight from '@/assets/arrow-right.png'

const CareersBackground = ({ hero = {} }) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const MotionImage = motion.create(Image)

  return (
    <div ref={ref} className="h-[100dvh] xl:h-[80vh] relative">
      <div className="h-[100dvh] xl:h-[80vh] relative overflow-hidden">
        <MotionImage
          src={useAssetUrl(hero.background?.path)}
          style={{ scale, y }}
          width={hero.background?.width}
          height={hero.background?.height}
          alt="background"
          className="w-full h-full object-cover origin-center" />
        <div className="absolute top-0 left-0 inset-0 bg-gradient-to-b from-transparent to-blue-dpv" />
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 xl:-translate-x-0 xl:top-[40vh] 3xl:top-[45vh] xl:left-0 pb-12 px-4 xl:pb-0 xl:px-6 w-full flex flex-col items-center justify-center">
        <div className="text-[44px] xl:text-[52px] xl:-mt-2.5 font-medium leading-none text-white-dpv text-center">
          {hero.title}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: hero.description || '' }}
          className="my-8 xl:w-[55%] xl:text-[22px] text-[20px] xl:font-medium text-center text-white-dpv" />
        <Button
          title={hero.buttonText}
          icon={arrowRight}
          redirect={hero.buttonLink} />
      </div>
    </div>
  )
}

export default CareersBackground