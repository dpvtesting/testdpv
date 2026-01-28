import React from 'react'
import Container from '@/components/Container'
import PreFooter from '@/components/PreFooter'
import KeyBenefit from '@/components/KeyBenefit'
import ImageGrid3 from '@/components/ImageGrid3'
import ImageGrid4 from '@/components/ImageGrid4'
import SolutionHeader from '@/components/SolutionHeader'
import SolutionCard from '@/components/SolutionCard'
import { fetchContent } from '@/util'
import { notFound } from 'next/navigation'
import useAssetUrl from '@/hook/asset'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const content = await fetchContent('solutions', {
    filter: { slug }
  })
  const seo = content.seo || {}
  return {
    title: seo.title || 'Solutions',
    description: seo.description || '',
    openGraph: {
      title: seo.title || 'Solutions',
      description: seo.description || '',
      type: 'website',
      images: seo.images?.map(img => ({
        url: useAssetUrl(img.path),
        width: 1200,
        height: 630,
        alt: 'Solutions',
      }))
    },
    twitter: {
      title: seo.title || 'Solutions',
      card: 'summary_large_image',
      description: seo.description || '',
      images: seo.images?.map(img => useAssetUrl(img.path))
    }
  }
}

const Solutions = async ({ params }) => {
  const { slug } = await params
  const content = await fetchContent('solutions', {
    filter: { slug }
  })

  if (!content._id) {
    notFound()
  }

  return (
    <>
      <section>
        <SolutionHeader
          background={content.banner || {}}
          title={content.bannerTitle} />

        <Container>
          {!content.title?.hideOnPage && (
            <div className="w-2/3 xl:w-full mb-10 text-[44px] xl:text-[58px] font-semibold leading-none text-blue-dpv">
              {content.title?.text}
            </div>
          )}
          <p className="text-[22px] xl:w-2/3 font-medium text-black-dpv">
            {content.description}
          </p>

          {!!content.cards && !!content.cards.items?.length && (
            <section className="mt-10 xl:mt-20">
              <SolutionCard
                column={content.cards?.column}
                items={content.cards?.items}/>
            </section>
          )}
        </Container>

        {!!content.grids?.type && (
          <Container className="pt-0 xl:pt-0 3xl:pt-0">
            <div className="text-blue-dpv text-[40px] xl:text-[52px] xl:-mt-2 font-medium leading-none">
              Technology
            </div>
            <section className="mt-8 xl:mt-12">
              {content.grids.type === 'Grid 3' && (
                <ImageGrid3 images={content.grids?.items_3} />
              )}
              {content.grids.type === 'Grid 4' && (
                <ImageGrid4
                  longBanner1={{
                    background: content.grids.items_4?.longBanner1Background,
                    title: content.grids.items_4?.longBanner1Title,
                    subtitle: content.grids.items_4?.longBanner1Subtitle
                  }}
                  longBanner2={{
                    background: content.grids.items_4?.longBanner2Background,
                    title: content.grids.items_4?.longBanner2Title,
                    subtitle: content.grids.items_4?.longBanner2Subtitle
                  }}
                  shortBanner1={{
                    background: content.grids.items_4?.shortBanner1Background,
                    title: content.grids.items_4?.shortBanner1Title,
                    subtitle: content.grids.items_4?.shortBanner1Subtitle
                  }}
                  shortBanner2={{
                    background: content.grids.items_4?.shortBanner2Background,
                    title: content.grids.items_4?.shortBanner2Title,
                    subtitle: content.grids.items_4?.shortBanner2Subtitle
                  }} />
              )}
            </section>
          </Container>
        )}

        {!!content.keyBenefit && !!content.keyBenefit.benefits?.length && (
          <div className="mb-12 xl:mb-20">
            <KeyBenefit
              background={content.keyBenefit?.banner || {}}
              items={content.keyBenefit?.benefits || []}
            />
          </div>
        )}
      </section>

      <PreFooter
        title={content.footer?.title}
        subtitle={content.footer?.subtitle}
        buttonText={content.footer?.buttonText}
        buttonLink={content.footer?.link} />
    </>
  )
}

export default Solutions