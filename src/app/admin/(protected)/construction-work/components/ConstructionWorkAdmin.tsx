'use client'

import ConstructionAdminByType from './ConstructionAdminByType'

export default function ConstructionWorkAdmin() {
  return (
    <ConstructionAdminByType
      type='CONSTRUCTION'
      title='Quản lý Thi công'
      description='Danh sách công trình thuộc mảng thi công'
      itemLabel='công trình'
    />
  )
}
