import React from 'react'
import ContactUsButton from '@/components/ContactUsButton'
import useAssetUrl from '@/hook/asset'
import Button from '@/components/Button'
import arrowRight from '@/assets/arrow-right.png'
import { fetchContent } from '@/util'
import { Suspense } from 'react'

const PreFooter = async ({ title, subtitle, buttonText, buttonLink }) => {
  const content = await fetchContent('footer')

  return (
    <Suspense>
      <section className="relative">
        <div className="h-[7rem] xl:h-[5rem]"></div>
        <div className="relative w-full h-[300px] xl:h-[500px]">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
            <source src={useAssetUrl(content.background?.path)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent z-[2] pointer-events-none" />

          <div className="
            z-[2] px-6 py-9 xl:px-20 xl:py-18 w-[90%] xl:w-[85%] 3xl:w-[75%]
            rounded-lg backdrop-blur-lg bg-white-dpv/20
            absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/5
            flex flex-col xl:flex-row xl:items-center justify-between border border-white-dpv">

            <div className="text-[34px] xl:text-[64px] xl:w-[55%] leading-none xl:leading-16 text-blue-dpv font-semibold ">
              {!!title ? title : "It's Time to Make Retail Work Smarter!"}
            </div>
            <div className="mt-8 xl:my-0">
              <div className="mb-5 xl:text-[32px] text-[24px] text-blue-dpv font-semibold">
                {!!subtitle ? subtitle : 'Connect With Us'}
              </div>
              {
                (!!buttonText && !!buttonLink) ? (
                  <Button
                    title={buttonText}
                    icon={arrowRight}
                    redirect={buttonLink}
                    shadow />
                ) : (
                  <ContactUsButton shadow />
                )
              }
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  )
}

export default PreFooter