'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import useAssetUrl from '@/hook/asset'
import { motion, useScroll, useTransform } from 'motion/react'

const KeyBenefit = ({ background, items }) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const yPos = useTransform(scrollYProgress, [0, 1], ['-30%', '30%'])

  const MotionImage = motion.create(Image)

  return (
    <div
      ref={ref}
      className="flex flex-col xl:flex-row bg-blue-dpv min-h-210"
    >
      <div className="w-full xl:w-1/2 flex flex-col px-6 xl:px-0 py-15">
        <div className="xl:w-3/5 xl:mx-auto xl:my-auto">
          <div className="mb-14 xl:mb-20 text-[52px] -mt-2 font-medium leading-none text-white-dpv">
            Key Benefits
          </div>
          <div className="flex flex-col gap-y-10 xl:gap-y-15">
            {
              items.map((item, i) => (
                <div key={i}>
                  <div className="text-[28px] font-bold text-white-dpv">
                    {item.title}
                  </div>
                  <div className="text-[22px] font-medium text-white-dpv">
                    {item.subtitle}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="w-full xl:w-1/2 overflow-hidden">
        <MotionImage
          src={useAssetUrl(background.path)}
          style={{ scale: 1.2, y: yPos }}
          width={background.width}
          height={background.height}
          className="w-full h-full aspect-square xl:aspect-auto object-cover"
          alt="key benefit" />
      </div>
    </div>
  )
}

export default KeyBenefit