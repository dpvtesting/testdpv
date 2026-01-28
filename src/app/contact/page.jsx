import React from 'react'
import Container from '@/components/Container'
import Image from 'next/image'
import Button from '@/components/Button'
import arrowRight from '@/assets/arrow-right.png'
import useAssetUrl from '@/hook/asset'
import ContactForm from '@/components/ContactForm'
import { fetchContent } from '@/util'

export async function generateMetadata() {
  const contact = await fetchContent('contact')
  const seo = contact.seo || {}
  return {
    title: seo.title || 'Contact',
    description: seo.description || '',
    openGraph: {
      title: seo.title || 'Contact',
      description: seo.description || '',
      type: 'website',
      images: seo.images?.map(img => ({
        url: useAssetUrl(img.path),
        width: 1200,
        height: 630,
        alt: 'Contact',
      }))
    },
    twitter: {
      title: seo.title || 'Contact',
      card: 'summary_large_image',
      description: seo.description || '',
      images: seo.images?.map(img => useAssetUrl(img.path))
    }
  }
}

const Contact = async () => {
  const contact = await fetchContent('contact')

  return (
    <section>
      <div className="bg-purple-dpv min-h-[100dvh] xl:h-screen flex flex-col">
        <div className="h-full flex xl:flex-col xl:pt-25">
          <div className="w-[90%] xl:w-[70%] flex flex-col xl:flex-row m-auto py-[15vh] xl:py-0">
            <div className="xl:w-1/2 mb-15 xl:mb-0">
              <div className="text-[60px] xl:text-[80px] xl:w-[70%] 3xl:w-[60%] leading-none xl:leading-22 text-white-dpv">
                {contact.title}
              </div>
            </div>
            <div className="w-full xl:w-1/2">
              <ContactForm form={contact.form} />
            </div>
          </div>
        </div>
      </div>

      <Container className="pb-5 xl:pb-5 3xl:pb-5">
        <div className="text-sm xl:text-base text-center font-bold tracking-widest text-blue-dpv">
          {contact.address?.subtitle}
        </div>
        <div className="text-[44px] xl:text-[64px] text-center text-blue-dpv font-semibold">
          {contact.address?.title}
        </div>
      </Container>

      <div className="xl:w-[100%] xl:pl-20 mx-auto relative">
        <Image
          src={useAssetUrl(contact.address?.background?.path)}
          width={contact.address?.background?.width}
          height={contact.address?.background?.height}
          className="w-full object-cover"
          alt="map" />
        <div className="absolute inset-0 bg-radial from-transparent to-white to-78%"></div>
      </div>

      <Container className="flex flex-col xl:flex-row gap-y-8 xl:gap-y-0 gap-x-5">
        {
          contact.locations?.map((loc, i) => (
            <div key={i} className="xl:w-[49%] bg-blue-dpv/5 rounded-lg p-7 xl:py-5 xl:px-8 flex flex-col">
              <div className="flex justify-between">
                <div className="text-purple-dpv tracking-widest font-bold text-sm xl:text-base uppercase">
                  {loc.country}
                </div>
                <div className="text-gray-dpv-8 font-bold">
                  {loc.tag}
                </div>
              </div>
              <div className="text-[23px] my-2 font-bold text-purple-dpv">
                {loc.name}
              </div>
              <div className="text-black-dpv font-medium text-[23px] mb-10" dangerouslySetInnerHTML={{ __html: loc.detail || '' }} />

              <div className="mt-auto">
                <Button
                  title={loc.buttonText}
                  icon={arrowRight}
                  redirect={loc.link}
                  shadow />
              </div>
            </div>
          ))
        }
      </Container>
    </section>
  )
}

export default Contact