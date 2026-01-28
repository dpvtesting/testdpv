'use client'
import React, { useEffect, useState } from 'react'
import Container from '@/components/Container'
import Dropdown from "@/components/Dropdown"
import { AnimatePresence, motion } from 'motion/react'
import ResourceCard from "@/components/ResourceCard"

const ResourceList = ({ types = [], topics = [] }) => {
  const [selectedType, setSelectedType] = useState({})
  const [selectedTopic, setSelectedTopic] = useState({})
  const [resources, setResources] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchResources()
  }, [selectedTopic, selectedType])

  const fetchResources = async () => {
    try {
      setIsLoading(true)

      const filter = {}
      const qs = {
        sort: JSON.stringify({ _created: -1 }),
        fields: JSON.stringify({ _id: 1, headline: 1, thumbnail: 1, date: 1, type: 1, topic: 1 }),
        filter: ''
      }

      if (selectedTopic.value) {
        filter['topic._id'] = selectedTopic.id
      }
      if (selectedType.value) {
        filter['type._id'] = selectedType.id
      }

      qs.filter = JSON.stringify(filter)

      const url = new URL(process.env.NEXT_PUBLIC_ADMIN_HOST + '/api/content/items/resources')
      url.search = new URLSearchParams(qs).toString()

      const res = await fetch(url)
      const data = await res.json()
      setResources(data)
    } catch(err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const onSelectType = selected => {
    setSelectedType(selected)
  }

  const onSelectTopic = selected => {
    setSelectedTopic(selected)
  }

  const clearDropdown = () => {
    setSelectedType({})
    setSelectedTopic({})
  }

  return (
    <div>
      <Container xOnly className="mt-28 xl:mt-24 mb-8">
        <div className="flex gap-x-4">
          <div className="w-28 xl:w-40">
            <Dropdown
              items={types.map(i => ({ id: i._id, value: i.value }))}
              onSelect={onSelectType}
              value={selectedType.value}
              placeholder="Type" />
          </div>

          <div className="w-28 xl:w-40">
            <Dropdown
              items={topics.map(i => ({ id: i._id, value: i.value }))}
              onSelect={onSelectTopic}
              value={selectedTopic.value}
              placeholder="Topic" />
          </div>

          <div
            className="cursor-pointer flex gap-x-2 items-center xl:ml-5"
            onClick={clearDropdown}>
            <div className="font-bold text-gray-dpv-8 whitespace-nowrap">
              CLEAR ALL
            </div>
            
            <button
              className="flex flex-col gap-y-2 relative rotate-45 p-1 cursor-pointer mt-1"
              onClick={clearDropdown}>
              <div className="h-0.5 w-3 absolute top-1/2 left-1/2 -translate-1/2 bg-gray-dpv-8" />
              <div className="h-3 w-0.5 absolute top-1/2 left-1/2 -translate-1/2 bg-gray-dpv-8" />
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {!isLoading && !!resources.length && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-10 xl:mb-16"
          >
            <Container xOnly className="grid grid-cols-1 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-16 gap-y-12">
              {
                resources.map(resource => (
                  <ResourceCard
                    key={resource._id}
                    id={resource._id}
                    thumbnail={resource.thumbnail}
                    type={resource.type}
                    headline={resource.headline}
                    date={resource.date}
                    types={types}
                  />
                ))
              }
            </Container>
          </motion.div> 
        )}

        {!isLoading && !resources.length && (
          <Container className="flex items-center justify-center text-blue-dpv text-4xl min-h-[60vh]">
            No resources found
          </Container>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ResourceList