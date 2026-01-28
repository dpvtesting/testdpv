import React from 'react'
import Image from 'next/image'
import useAssetUrl from '@/hook/asset'

const Text = ({ title, subtitle }) => (
  <div className="p-8 absolute left-0 top-0 bottom-0 flex flex-col w-full">
    <div className="text-[28px] font-bold text-white-dpv mt-auto">
      {title}
    </div>
    <div className="text-[22px] mt-2 xl:w-2/3 leading-7 text-white-dpv">
      {subtitle}
    </div>
  </div>
)

const ImageGrid3 = ({ images }) => {
  return (
    <section className="flex flex-col xl:flex-row gap-y-8 xl:gap-y-0 xl:gap-x-6">
      {
        images.map((img, i) => (
          <div key={i} className="xl:w-1/3 relative">
            <Image
              src={useAssetUrl(img.background?.path)}
              width={img.background?.width}
              height={img.background?.height}
              className="aspect-square object-cover w-full h-full"
              alt="illustration" />
            <div className="absolute top-0 left-0 inset-0 bg-gradient-to-b from-transparent to-black-dpv" />
            <Text
              title={img.title}
              subtitle={img.subtitle} />
          </div>
        ))
      }
    </section>
  )
}

export default ImageGrid3