import Button from "@/components/Button"
import arrowRight from '@/assets/arrow-right.png'
import routeConstant from '@/constant/route'
import Container from "@/components/Container"
import PreFooter from "@/components/PreFooter"
import Image from "next/image"
import useAssetUrl from '@/hook/asset'
import Link from "next/link"
import { fetchContent, fetchContents } from "@/util"
import ResourceCard from "@/components/ResourceCard"
import RetailSolution from "@/components/RetailSolution"

export async function generateMetadata() {
  const home = await fetchContent('home')
  const seo = home.seo || {}
  return {
    title: seo.title || 'Home',
    description: seo.description || '',
    openGraph: {
      title: seo.title || 'Home',
      description: seo.description || '',
      type: 'website',
      images: seo.images?.map(img => ({
        url: useAssetUrl(img.path),
        width: 1200,
        height: 630,
        alt: 'Home',
      }))
    },
    twitter: {
      title: seo.title || 'Home',
      card: 'summary_large_image',
      description: seo.description || '',
      images: seo.images?.map(img => useAssetUrl(img.path))
    }
  }
}

export default async function Home() {
  const allContent = await fetchContents([
    'home',
    'resourceTypes',
    {
      key: 'resources',
      param: {
        sort: { _created: -1 },
        fields: { _id: 1, headline: 1, thumbnail: 1, date: 1, type: 1, topic: 1 },
        filter: {
          isFeatured: true
        },
        limit: 3
      }
    }
  ])

  const home = allContent.home || {}
  const featuredResources = allContent.resources || []

  const getBgVid = () => useAssetUrl(home.hero?.background?.path)

  return (
    <>
      <section className="relative">
        <div className="relative w-full flex flex-col min-h-[100dvh]">
          <video autoPlay loop muted playsInline className="absolute top-0 left-0 inset-0 w-full h-full object-cover">
            <source src={getBgVid()} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-purple-dpv/40 pointer-events-none" />

          <Container className="relative pt-0 xl:pt-0 3xl:pt-0 flex flex-col">
            <div className="h-[100dvh] flex flex-col pb-8 xl:pb-12">
              <div className="mt-auto mb-8 xl:mb-12 text-[52px] xl:text-8xl leading-none font-normal text-white-dpv xl:w-[55%] 3xl:w-[42%]">
                {home.hero?.title}
              </div>

              <Link href="#targetScroll" target="_top">
                <Button
                  title="EXPLORE"
                  icon={arrowRight} />
              </Link>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: home.hero?.description || '' }}
              className="mt-20 xl:mt-30 3xl:w-[70%] xl:w-3/4 mb-8 text-white-dpv text-2xl xl:text-[32px] font-medium leading-10" />
          </Container>
        </div>

        <div id="targetScroll" />

        <Container>
          <div className="text-sm xl:text-base text-purple-dpv tracking-widest font-bold uppercase">
            {home.offer?.subtitle}
          </div>
          <div className="flex justify-between mt-3 xl:w-[88%]">
            <div className="xl:w-[35%] 3xl:w-[30%] text-blue-dpv font-semibold text-[44px] xl:text-[64px] leading-none">
              {home.offer?.title}
            </div>
            <div className="hidden xl:block text-blue-dpv font-medium xl:text-xl xl:w-[38%]">
              {home.offer?.description}
            </div>
          </div>

          <section className="mt-10 xl:mt-20 flex flex-col gap-y-12 xl:gap-y-0 xl:flex-row xl:gap-x-8">
            {
              home.offer?.items?.map((item, i) => (
                <div key={i} className="flex flex-col xl:w-1/3">
                  <Image
                    src={useAssetUrl(item.image.path)}
                    height={600}
                    width={800}
                    className="aspect-[4/3] object-cover"
                    alt="illustration" />
                  <div className="text-blue-dpv text-[32px] font-semibold leading-none my-2">
                    {item.title}
                  </div>
                  <div className="text-black-dpv text-xl font-medium">
                    {item.description}
                  </div>
                </div>
              ))
            }
          </section>
        </Container>

        <Container className="bg-gray-dpv-4">
          <div className="flex flex-col xl:flex-row xl:justify-between mb-10">
            <div className="w-3/4 xl:w-full text-blue-dpv text-[40px] xl:text-[52px] font-medium leading-none">
              {home.expertise?.title}
            </div>
            <div className="mt-6 xl:mt-0 text-black-dpv font-medium text-xl xl:w-1/3 mr-12">
              {home.expertise?.description}
            </div>
          </div>

          <section className="mt-16 xl:mt-20 flex flex-col gap-y-8 xl:gap-y-0 xl:flex-row xl:gap-x-8">
            {
              home.expertise?.items?.map((item, i) => (
                <div key={i} className="flex flex-col xl:w-1/3 bg-blue-dpv/5 rounded-lg p-5">
                  <div className="w-11 h-11 xl:w-13 xl:h-13 flex items-center rounded-full justify-center bg-green-dpv/20 p-1.5 xl:p-0">
                    <Image
                      src={useAssetUrl(item.icon?.path)}
                      height={item.icon.height}
                      width={item.icon.width}
                      className="aspect-square w-8 object-cover"
                      alt="icon" />
                  </div>

                  <div className="text-purple-dpv text-[28px] font-bold mt-12 xl:mt-20">
                    {item.title}
                  </div>

                  <div className="text-black-dpv text-xl font-medium mt-2 xl:w-4/5 3xl:w-[65%]">
                    {item.description}
                  </div>
                </div>
              ))
            }
          </section>
        </Container>

        <div className="py-10 px-6 xl:pl-28 xl:pr-8 bg-blue-dpv/20 flex flex-col xl:flex-row xl:justify-between xl:items-center">
          <RetailSolution title={home.retailSolution} />
        </div>

        <Container className="bg-blue-dpv">
          <div className="text-sm xl:text-base text-white-dpv tracking-widest font-bold uppercase">
            {home.resource?.subtitle}
          </div>
          <div className="xl:mt-2 flex flex-col xl:flex-row xl:items-center xl:justify-between">
            <div className="text-[44px] xl:text-[64px] leading-none font-semibold text-white-dpv mb-8">
              {home.resource?.title}
            </div>
            <Link href={routeConstant.resources} target="_top">
              <Button
                title={home.resource?.buttonText}
                icon={arrowRight}
              />
            </Link>
          </div>

          <div className="mt-12 xl:mt-16 grid grid-cols-1 xl:grid-cols-3 gap-x-8 gap-y-16">
            {
              featuredResources.map(resource => (
                <ResourceCard
                  key={resource._id}
                  id={resource._id}
                  thumbnail={resource.thumbnail}
                  type={resource.type}
                  headline={resource.headline}
                  date={resource.date}
                  types={allContent.resourceTypes}
                  secondary
                />
              ))
            }
          </div>
        </Container>

        <Container>
          <div className="text-blue-dpv tracking-widest font-bold text-sm xl:text-base uppercase">
            {home.client?.subtitle}
          </div>
          <div className="text-[44px] xl:text-[64px] xl:mt-2 leading-none font-semibold text-blue-dpv">
            {home.client?.title}
          </div>
          <div className="xl:w-11/12 mt-12 xl:mt-16 grid grid-cols-2 xl:grid-cols-6 items-center gap-x-[8%] gap-y-16">
            {
              home.client?.items?.map((item, i) => (
                <div key={i}>
                  <Image
                    src={useAssetUrl(item.path)}
                    width={item.width}
                    height={item.height}
                    className="object-cover w-[10rem] xl:w-[12rem] filter grayscale"
                    alt="client" />
                </div>
              ))
            }
          </div>
        </Container>
      </section>

      <PreFooter
        title={home.footer?.title}
        subtitle={home.footer?.subtitle}
        buttonText={home.footer?.buttonText}
        buttonLink={home.footer?.link} />
    </>
  )
}
