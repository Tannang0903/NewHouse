import { Construction } from './construction'

export interface CompanyInfoProps {
  designImages: string[]
}

export interface ConstructionSliderProps {
  title: string
  description: string
  constructions: Construction[]
}

export interface CardItemProps {
  construction: Construction
}
