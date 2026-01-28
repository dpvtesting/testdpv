import React from 'react'
import PreFooter from "@/components/PreFooter"
import ResourceList from '@/components/ResourceList'
import { fetchContents } from '@/util'

export async function generateMetadata() {
  return {
    title: 'Resources',
    openGraph: {
      title: 'Resources',
      type: 'website',
    },
    twitter: {
      title: 'Resources',
    }
  }
}

const Resources = async () => {
  const content = await fetchContents(['resourceTypes', 'resourceTopics'])
  return (
    <>
      <ResourceList
        topics={content.resourceTopics || []}
        types={content.resourceTypes || []} />
      <PreFooter />
    </>
  )
}

export default Resources