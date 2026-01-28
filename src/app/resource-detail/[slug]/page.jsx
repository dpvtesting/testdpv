import React from 'react'
import { fetchContent, fetchContents } from '@/util'
import { notFound } from 'next/navigation'
import PreFooter from '@/components/PreFooter'
import Container from '@/components/Container'
import { formatDate } from '@/util'
import ResourceCard from '@/components/ResourceCard'
import ResourceDetailShare from '@/components/ResourceDetailShare'
import ResourceDownload from '@/components/ResourceDownload'
import useAssetUrl from '@/hook/asset'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const detail = await fetchContent('resources', {
    filter: {
      _id: slug
    }
  })
  const seo = detail.seo || {}
  return {
    title: seo.title || 'Resources',
    description: seo.description || '',
    openGraph: {
      title: seo.title || 'Resources',
      description: seo.description || '',
      type: 'website',
      images: seo.images?.map(img => ({
        url: useAssetUrl(img.path),
        width: 1200,
        height: 630,
        alt: 'Resources',
      }))
    },
    twitter: {
      title: seo.title || 'Resources',
      card: 'summary_large_image',
      description: seo.description || '',
      images: seo.images?.map(img => useAssetUrl(img.path))
    }
  }
}

const ResourceDetail = async ({ params }) => {
  const { slug } = await params
  const detail = await fetchContent('resources', {
    filter: {
      _id: slug
    }
  })

  const featuredResources = await fetchContents([
    'resourceTypes',
    {
      key: 'resources',
      param: {
        sort: { _created: -1 },
        fields: { _id: 1, headline: 1, thumbnail: 1, date: 1, type: 1, topic: 1 },
        filter: {
          isFeatured: true,
          _id: {
            $ne: slug
          }
        },
        limit: 3
      }
    }
  ])

  if (!detail._id) {
    notFound()
  }

  return (
    <>
      <section>
        <Container className="mt-10">
          <div className="text-[44px] xl:text-[64px] text-purple-dpv leading-none">
            {detail.headline}
          </div>

          <div className="bg-blue-dpv w-full h-[1px] mt-8 mb-4" />

          <section className="flex flex-col xl:flex-row">
            <section className="self-start mb-6 xl:mb-0 xl:w-1/4 gap-y-8 grid grid-cols-2 xl:grid-cols-1 uppercase">
              <div>
                <div className="text-purple-dpv text-sm xl:text-base font-bold">
                  DATE
                </div>
                <div className="text-gray-dpv-5 text-sm xl:text-base font-bold">
                  {formatDate(detail.date)}
                </div>
              </div>

              <div>
                <div className="text-purple-dpv text-sm xl:text-base font-bold">
                  AUTHOR
                </div>
                <div className="text-gray-dpv-5 text-sm xl:text-base font-bold">
                  {detail.author}
                </div>
              </div>

              <div>
                <div className="text-purple-dpv text-sm xl:text-base font-bold">
                  SHARE
                </div>
                <ResourceDetailShare id={slug} />
              </div>

              <ResourceDownload
                headline={detail.headline}
                content={detail.content} />
            </section>

            <section className="xl:w-[70%]">
              <div
                className="resource-content"
                dangerouslySetInnerHTML={{ __html: detail.content || '' }} />
            </section>
          </section>
        </Container>

        {featuredResources.resources?.length && (
          <Container>
            <div className="h-[1px] w-full bg-blue-dpv mb-5" />
            <div className="tracking-widest text-gray-dpv-5 text-sm xl:text-base font-bold">
              FEATURED NEWS
            </div>

            <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-x-8 gap-y-16">
              {
                featuredResources.resources?.map(resource => (
                  <ResourceCard
                    key={resource._id}
                    id={resource._id}
                    thumbnail={resource.thumbnail}
                    type={resource.type}
                    headline={resource.headline}
                    date={resource.date}
                    types={featuredResources.resourceTypes || []}
                  />
                ))
              }
            </div>
          </Container>
        )}
      </section>

      <PreFooter />
    </>
  )
}

export default ResourceDetail