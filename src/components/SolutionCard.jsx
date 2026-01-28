import React from 'react'
import Card from '@/components/Card'

const SolutionCard = ({ column, items }) => {
  const map = {
    2: 'xl:grid-cols-2',
    3: 'xl:grid-cols-3',
    4: 'xl:grid-cols-4',
    5: 'xl:grid-cols-5'
  }
  return (
    <section className={`xl:mt-20 grid gap-8 grid-cols-1 ${map[column]}`}>
      {
        items.map((item, i) => (
          <Card
            key={i}
            icon={item.icon}
            title={item.title}
            desc={item.description}
          />
        ))
      }
    </section>
  )
}

export default SolutionCard