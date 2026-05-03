'use client'

import ConstructionAdminByType from '../../construction-work/components/ConstructionAdminByType'

export default function InteriorAdmin() {
  return (
    <ConstructionAdminByType
      type='INTERIOR'
      title='Quản lí nội thất'
      description='Danh sách công trình thuộc mảng nội thất'
      itemLabel='nội thất'
    />
  )
}
