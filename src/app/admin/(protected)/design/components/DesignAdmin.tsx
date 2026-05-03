'use client'

import ConstructionAdminByType from '../../construction-work/components/ConstructionAdminByType'

export default function DesignAdmin() {
  return (
    <ConstructionAdminByType
      type='DESIGN'
      title='Quản lý Thiết kế'
      description='Danh sách công trình thuộc mảng thiết kế'
      itemLabel='thiết kế'
    />
  )
}
