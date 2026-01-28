import React from 'react'
import Image from 'next/image'
import useAssetUrl from '@/hook/asset'

const Card = ({ icon, className = '', title, desc }) => {
  return (
    <div className={'flex flex-col bg-blue-dpv/5 rounded-lg p-6 xl:p-8 ' + className}>
      <div className="w-11 h-11 xl:w-13 xl:h-13 flex items-center rounded-full justify-center bg-green-dpv/20">
        <Image
          src={useAssetUrl(icon?.path)}
          width={icon.width}
          height={icon.height}
          className="w-6 xl:w-7"
          alt="icon" />
      </div>

      <div className="text-purple-dpv text-[28px] font-bold leading-8 mt-15 xl:mt-20 xl:min-h-16">
        {title}
      </div>

      <div className="text-black-dpv text-xl xl:font-medium mt-4 xl:w-11/12">
        {desc}
      </div>
    </div>
  )
}

export default Card