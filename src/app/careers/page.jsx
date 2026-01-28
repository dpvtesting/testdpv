import React from 'react'
import Image from 'next/image'
import PreFooter from '@/components/PreFooter'
import Container from '@/components/Container'
import useAssetUrl from '@/hook/asset'
import { fetchContent } from '@/util'
import CareersBackground from '@/components/CareersBackground'

export async function generateMetadata() {
  const careers = await fetchContent('careers')
  const seo = careers.seo || {}
  return {
    title: seo.title || 'Careers',
    description: seo.description || '',
    openGraph: {
      title: seo.title || 'Careers',
      description: seo.description || '',
      type: 'website',
      images: seo.images?.map(img => ({
        url: useAssetUrl(img.path),
        width: 1200,
        height: 630,
        alt: 'Careers',
      }))
    },
    twitter: {
      title: seo.title || 'Careers',
      card: 'summary_large_image',
      description: seo.description || '',
      images: seo.images?.map(img => useAssetUrl(img.path))
    }
  }
}

const TitleDesc = ({ title, desc }) => (
  <div className="pb-12 xl:pb-20 mb-8 xl:mb-8 border-b border-gray-dpv-6 flex flex-col xl:flex-row">
    <div className="xl:w-[55%] text-[44px] xl:text-[52px] mb-4 xl:mb-0 -mt-2.5 font-medium leading-none text-purple-dpv">
      {title}
    </div>
    <p className="xl:w-[40%] text-[22px] font-medium text-black-dpv">
      {desc}
    </p>
  </div>
)

const Careers = async () => {
  const careers = await fetchContent('careers')
  return (
    <>
      <section>
        <CareersBackground hero={careers.hero} />

        <Container>
          <TitleDesc
            title={careers.benefit?.whyJoinUs.title}
            desc={careers.benefit?.whyJoinUs.description} />

          <TitleDesc
            title={careers.benefit?.meaningfulWork.title}
            desc={careers.benefit?.meaningfulWork.description} />

          <TitleDesc
            title={careers.benefit?.collaborativeCulture.title}
            desc={careers.benefit?.collaborativeCulture.description} />

          <TitleDesc
            title={careers.benefit?.roomToGrow.title}
            desc={careers.benefit?.roomToGrow.description} />
        </Container>

        <Container className="flex flex-col xl:flex-row xl:flex-wrap gap-y-8 xl:gap-5 pt-0">
          <div className="xl:w-[24%] mb-6 xl:mb-0">
            <div className="tracking-widest text-gray-dpv-5 text-sm xl:text-base font-bold uppercase">
              {careers.vision?.subtitle}
            </div>
            <div className="text-[40px] xl:text-[52px] font-medium leading-none text-purple-dpv uppercase">
              {careers.vision?.title}
            </div>
          </div>

          {
            careers.vision?.items?.map((v, i) => (
              <div key={i} className="h-[19rem] xl:w-[23.5%] 3xl:w-[24%] bg-blue-dpv/5 rounded-lg px-4 pt-4 pb-8 xl:px-6 xl:pt-6 xl:pb-12 flex flex-col">
                <div className="text-[53px] leading-none font-bold text-blue-dpv">
                  {v.letter}
                </div>
                <div className="mt-auto text-[28px] mb-2 w-5/6 leading-8 font-bold text-blue-dpv">
                  {v.title}
                </div>
                <div className="text-xl font-medium text-black-dpv">
                  {v.description}
                </div>
              </div>
            ))
          }
        </Container>

        <Container>
          <div className="text-center">
            <div className="text-sm xl:text-base tracking-widest font-bold text-gray-dpv-5 uppercase">
              {careers.culture?.title}
            </div>
            <p className="text-[22px] xl:w-1/3 font-medium mt-4 mx-auto text-black-dpv">
              {careers.culture?.description}
            </p>
          </div>

          <section className="mt-24 xl:mt-14 flex flex-col xl:flex-row xl:flex-wrap gap-y-8 xl:gap-5">
            {
              careers.culture?.items?.map((it, i) => (
                <div key={i} className="xl:w-[32%] py-8 px-4 xl:px-6 xl:h-[26.25rem] border border-gray-dpv-7">
                  <div className="xl:h-5/6 flex flex-col">
                    <div className="rounded-full w-12 h-12 xl:w-16 xl:h-16 p-1.5 xl:p-3 bg-green-dpv/20">
                      <Image
                        src={useAssetUrl(it.icon?.path)}
                        width={it.icon?.width}
                        height={it.icon?.height}
                        alt="icon" />
                    </div>

                    <div className="mt-18 xl:mt-[12%] mb-2 xl:mb-0 text-blue-dpv text-[28px] font-bold">
                      {it.title}
                    </div>

                    <p className="text-[22px] font-medium text-black-dpv">
                      {it.description}
                    </p>
                  </div>
                </div>
              ))
            }
          </section>
        </Container>
      </section>

      <PreFooter
        title={careers.footer?.title}
        subtitle={careers.footer?.subtitle}
        buttonText={careers.footer?.buttonText}
        buttonLink={careers.footer?.link} />
    </>
  )
}

export default Careers