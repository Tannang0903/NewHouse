import React from 'react'
import { constructionWorks } from '../api/mockData'
import CompanyInfo from './component/company-info'
import ConstructionSlider from './component/construction-slider'
import { designWorks } from '../api/mockData'

const HomePage = () => {
  return (
    <div>
      <div className='bg-black xl:px-0 lg:px-0 md:px-0 px-2'>
        <CompanyInfo />
        <ConstructionSlider
          title={designWorks.title}
          description={designWorks.description}
          constructions={designWorks.items}
        />
        <ConstructionSlider
          title={constructionWorks.title}
          description={constructionWorks.description}
          constructions={constructionWorks.items}
        />
      </div>
    </div>
  )
}

export default HomePage
