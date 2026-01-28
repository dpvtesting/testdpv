'use client'
import React, { useState } from 'react'
import useAssetUrl from '@/hook/asset'
import Image from 'next/image'
import classNames from 'classnames'

const Leader = ({
  name,
  image,
  description,
  position
}) => {
  const [visibleDesc, setVisibleDesc] = useState(false)
  return (
    <div className="xl:w-[30%]">
      <div
        onMouseEnter={() => setVisibleDesc(true)}
        onMouseLeave={() => setVisibleDesc(false)}
        className="relative">
        <Image
          src={useAssetUrl(image?.path)}
          width={image?.width}
          height={image?.height}
          className="aspect-[3/4] w-full object-cover"
          alt="leader" />
          <div className={classNames({
            'absolute top-0 left-0 h-full w-full bg-blue-dpv/60 backdrop-blur-[20px] text-base xl:text-[20px] 3xl:text-[22px] px-6 pb-6 3xl:pb-16 leading-6.5 3xl:leading-8 text-white-dpv flex items-end xl:transition': true,
            'opacity-0': !visibleDesc,
            'opacity-100': visibleDesc
          })}>
            {description}
          </div>
      </div>
      <div className="text-4xl leading-none mt-2 font-bold text-blue-dpv">
        {name}
      </div>
      <div className="text-[22px] font-medium text-gray-dpv-3">
        {position}
      </div>
    </div>
  )
}

export default Leader