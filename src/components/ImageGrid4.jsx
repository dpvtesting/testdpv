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

const ImageGrid4 = ({ longBanner1, longBanner2, shortBanner1, shortBanner2 }) => {
  return (
    <section className="mt-8 xl:mt-12 flex flex-col">
      <div className="flex flex-col xl:flex-row gap-y-8 xl:gap-y-0 xl:gap-x-6 mb-8 xl:mb-6">
        <div className="xl:w-[60%] relative">
          <Image
            src={useAssetUrl(longBanner1.background?.path)}
            width={longBanner1.background?.width}
            height={longBanner1.background?.height}
            className="w-full h-full aspect-square xl:aspect-[2/1] object-cover" alt="banner" />
          <div className="absolute top-0 left-0 inset-0 bg-gradient-to-b from-transparent to-black-dpv" />
          <Text
            title={longBanner1.title}
            subtitle={longBanner1.subtitle} />
        </div>

        <div className="xl:w-[40%] relative">
          <Image
            src={useAssetUrl(shortBanner1.background?.path)}
            width={shortBanner1.background?.width}
            height={shortBanner1.background?.height}
            className="w-full h-full aspect-square xl:aspect-[2/1] object-cover"
            alt="banner" />
          <div className="absolute top-0 left-0 inset-0 bg-gradient-to-b from-transparent to-black-dpv" />
          <Text
            title={shortBanner1.title}
            subtitle={shortBanner1.subtitle} />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-y-8 xl:gap-y-0 gap-x-6">
        <div className="xl:w-[40%] relative">
          <Image
            src={useAssetUrl(shortBanner2.background?.path)}
            width={shortBanner2.background?.width}
            height={shortBanner2.background?.height}
            className="w-full h-full aspect-square xl:aspect-[2/1] object-cover"
            alt="banner" />
          <div className="absolute top-0 left-0 inset-0 bg-gradient-to-b from-transparent to-black-dpv" />
          <Text
            title={shortBanner2.title}
            subtitle={shortBanner2.subtitle} />
        </div>

        <div className="xl:w-[60%] relative">
          <Image
            src={useAssetUrl(longBanner2.background?.path)}
            width={longBanner2.background?.width}
            height={longBanner2.background?.height}
            className="w-full h-full aspect-square xl:aspect-[2/1] object-cover"
            alt="banner" />
          <div className="absolute top-0 left-0 inset-0 bg-gradient-to-b from-transparent to-black-dpv" />
          <Text
            title={longBanner2.title}
            subtitle={longBanner2.subtitle} />
        </div>
      </div>
    </section>
  )
}

export default ImageGrid4