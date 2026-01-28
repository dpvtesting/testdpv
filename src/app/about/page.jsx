import React from 'react'
import Container from '@/components/Container'
import PreFooter from "@/components/PreFooter"
import Image from 'next/image'
import Leader from '@/components/Leader'
import useAssetUrl from '@/hook/asset'
import { fetchContent } from "@/util"

export async function generateMetadata() {
  const about = await fetchContent('about')
  const seo = about.seo || {}
  return {
    title: seo.title || 'About',
    description: seo.description || '',
    openGraph: {
      title: seo.title || 'About',
      description: seo.description || '',
      type: 'website',
      images: seo.images?.map(img => ({
        url: useAssetUrl(img.path),
        width: 1200,
        height: 630,
        alt: 'About',
      }))
    },
    twitter: {
      title: seo.title || 'About',
      card: 'summary_large_image',
      description: seo.description || '',
      images: seo.images?.map(img => useAssetUrl(img.path))
    }
  }
}

const About = async () => {
  const about = await fetchContent('about')

  return (
    <>
      <div>
        {/* Mobile */}
        <Container xOnly className="block xl:hidden min-h-[100dvh] inset-0 bg-gradient-to-b from-blue-dpv to-green-dpv-2 pb-12">
          <div className="h-[80px]"></div>
          <div className="h-[95dvh] flex flex-col pb-12">
            <div className="mt-auto tracking-widest text-sm font-bold text-white-dpv uppercase">
              {about.hero?.subtitle}
            </div>
            <div className="mt-4 text-[28px] text-white-dpv leading-10">
              {about.hero?.title}
            </div>
            <div className="mt-10">
              <Image
                src={useAssetUrl(about.hero?.background?.path)}
                width={about.hero?.background?.width}
                height={about.hero?.background?.height}
                className="aspect-[3/2] object-cover"
                alt="banner" />
            </div>
          </div>

          {!!about.hero?.description && (
            <div
              dangerouslySetInnerHTML={{ __html: about.hero?.description }}
              className="xl:text-base xl:leading-10 text-2xl xl:text-[32px] xl:w-[52%] 3xl:w-[45%] -mt-2.5 text-white-dpv font-medium">
            </div>
          )}
        </Container>

        {/* Desktop */}
        <Container xOnly className="min-h-screen inset-0 bg-gradient-to-b from-blue-dpv to-green-dpv-2 hidden xl:flex xl:flex-col justify-center pb-10">
          <div className="h-[100px]"></div>
          <div className="tracking-widest text-base font-bold text-white-dpv uppercase">
            {about.hero?.subtitle}
          </div>
          <div className="xl:w-[85%] 3xl:w-3/4 mt-6 text-[58px] text-white-dpv leading-16">
            {about.hero?.title}
          </div>

          <div className="mt-28 xl:gap-x-3 3xl:gap-x-6 flex">
            <div className="xl:w-[45%]">
              <Image
                src={useAssetUrl(about.hero?.background?.path)}
                width={about.hero?.background?.width}
                height={about.hero?.background?.height}
                className="xl:w-[87%] 3xl:w-[90%] aspect-[3/2] object-cover"
                alt="banner" />
            </div>
            {!!about.hero?.description && (
              <div
                dangerouslySetInnerHTML={{ __html: about.hero?.description }}
                className="leading-10 text-[32px] xl:w-[52%] 3xl:w-[45%] -mt-2.5 text-white-dpv font-medium">
              </div>
            )}
          </div>
        </Container>

        <Container className="flex flex-col xl:flex-row bg-gray-dpv-4">
          <div className="xl:w-1/2 xl:font-medium text-[40px] xl:text-[52px] xl:-mt-2.5 leading-none text-purple-dpv mb-5 xl:mb-0">
            {about.mission?.title}
          </div>
          <div className="w-[85%] xl:w-[45%] text-xl xl:text-[22px] font-medium text-black-dpv">
            {about.mission?.description}
          </div>
        </Container>

        <Container>
          <div className="mb-4 xl:mb-6 text-sm xl:text-base text-gray-dpv-5 tracking-widest font-bold">
            {about.team?.subtitle}
          </div>
          <div className="text-[40px] xl:text-[52px] font-medium xl:-mt-2.5 xl:w-[30%] leading-none text-purple-dpv">
            {about.team?.title}
          </div>

          <section className="mt-12 xl:mt-16 flex flex-col xl:flex-row xl:flex-wrap gap-y-12 xl:gap-x-5 xl:gap-y-16">
            {
              about.team?.peoples?.map(l => (
                <Leader
                  key={l.name}
                  name={l.name}
                  image={l.image}
                  description={l.description}
                  position={l.position}
                />
              ))
            }
          </section>
        </Container>
      </div>

      <PreFooter
        title={about.footer?.title}
        subtitle={about.footer?.subtitle}
        buttonText={about.footer?.buttonText}
        buttonLink={about.footer?.link} />
    </>
  )
}

export default About