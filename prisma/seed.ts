import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  // ==================== USER ADMIN ====================
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    throw new Error('Thiếu ADMIN_PASSWORD trong môi trường')
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  await prisma.user.upsert({
    where: { email: 'admin@newhouse.vn' },
    update: {},
    create: {
      email: 'admin@newhouse.vn',
      password: hashedPassword,
      name: 'Admin NewHouse',
      role: 'ADMIN',
    },
  })

  // ==================== CONSTRUCTION - DESIGN ====================
  const designItems = [
    {
      name: 'Nhà Phố 2 Tầng Hiện Đại Tối Giản',
      introduction: 'Thiết kế nhà phố 2 tầng nổi bật với hình khối tối giản, mặt tiền mềm mại và điểm nhấn cây xanh.',
      description:
        'Công trình nhà phố hiện đại mang phong cách tối giản với mặt tiền được bo cong nhẹ nhàng, kết hợp cùng hệ lam gỗ và cây xanh tạo điểm nhấn tự nhiên.',
      images: [],
      type: 'DESIGN' as const,
      order: 1,
    },
    {
      name: 'Nhà Phố 3 Tầng Phong Cách Hiện Đại Bo Cong',
      introduction: 'Mẫu nhà phố 3 tầng nổi bật với thiết kế bo cong ấn tượng và hệ cửa sổ tròn đầy sáng tạo.',
      description:
        'Công trình 3 tầng hiện đại sở hữu hình khối mềm mại với các góc bo cong và hệ cửa sổ tròn - oval đầy cá tính.',
      images: [],
      type: 'DESIGN' as const,
      order: 2,
    },
    {
      name: 'Biệt Thự 2 Tầng Mái Nhật Hiện Đại Sân Vườn Rộng',
      introduction:
        'Thiết kế biệt thự 2 tầng mái Nhật thanh lịch, không gian mở với hệ cột ốp gỗ và sân vườn xanh mát.',
      description:
        'Mẫu biệt thự 2 tầng nổi bật với thiết kế mái Nhật đặc trưng kết hợp hệ cột cao ốp gỗ tạo điểm nhấn mặt tiền sang trọng.',
      images: [],
      type: 'DESIGN' as const,
      order: 3,
    },
  ]

  for (const item of designItems) {
    await prisma.construction.create({ data: item })
  }

  // ==================== CONSTRUCTION - CONSTRUCTION ====================
  const constructionItems = [
    {
      name: 'Công Trình Thi Công Nhà Mái Thái 2 Tầng Tại Đà Nẵng',
      introduction: 'Công trình thực tế với thiết kế mái Thái truyền thống kết hợp mặt tiền hiện đại.',
      description:
        'Ngôi nhà được thi công theo kiểu mái Thái 2 tầng truyền thống với hai mái đối xứng và phần ban công rộng rãi phía trước.',
      images: [],
      type: 'CONSTRUCTION' as const,
      order: 1,
    },
    {
      name: 'Công Trình Thi Công Nhà Phố 2 Tầng Vòm Cong & Gạch Thẻ',
      introduction: 'Công trình thi công nhà phố 2 tầng nổi bật với mặt tiền bo cong và tường rào điểm nhấn hình học.',
      description:
        'Ngôi nhà phố 2 tầng được thi công với thiết kế hiện đại, kết hợp hài hòa giữa đường cong kiến trúc và chất liệu gạch thẻ truyền thống.',
      images: [],
      type: 'CONSTRUCTION' as const,
      order: 2,
    },
  ]

  for (const item of constructionItems) {
    await prisma.construction.create({ data: item })
  }

  // ==================== DESIGN PRICE ====================
  const designPrices = [
    { label: 'Thiết kế kiến trúc & nội thất', price: 150000, isIncluded: true, order: 1 },
    { label: 'Hồ sơ xin phép xây dựng', price: 20000, isIncluded: true, order: 2 },
    { label: 'Phối cảnh 3D ngoại thất', price: 30000, isIncluded: true, order: 3 },
    { label: 'Phối cảnh 3D nội thất', price: 50000, isIncluded: true, order: 4 },
    { label: 'Giám sát thiết kế', price: 20000, isIncluded: false, order: 5, note: 'Tính theo tháng' },
  ]

  for (const item of designPrices) {
    await prisma.designPrice.create({ data: item })
  }

  // ==================== ROUGH LABOR PRICE ====================
  const roughPrices = [
    { label: 'Phần móng & cọc', price: 500000, isIncluded: true, order: 1 },
    { label: 'Phần thân - cột dầm sàn', price: 800000, isIncluded: true, order: 2 },
    { label: 'Xây tường - trát vữa', price: 300000, isIncluded: true, order: 3 },
    { label: 'Chống thấm mái & ban công', price: 100000, isIncluded: true, order: 4 },
    { label: 'Hệ thống điện âm tường', price: 150000, isIncluded: false, order: 5, note: 'Tùy chọn' },
  ]

  for (const item of roughPrices) {
    await prisma.roughLaborPrice.create({ data: item })
  }

  // ==================== COMPLETED PRICE ====================
  const completedPrices = [
    { label: 'Lát gạch nền', price: 250000, isIncluded: true, order: 1 },
    { label: 'Ốp gạch tường WC', price: 200000, isIncluded: true, order: 2 },
    { label: 'Hệ thống điện hoàn thiện', price: 300000, isIncluded: true, order: 3 },
    { label: 'Hệ thống nước', price: 200000, isIncluded: true, order: 4 },
    { label: 'Sơn nước trong & ngoài', price: 100000, isIncluded: true, order: 5 },
    { label: 'Trần thạch cao', price: 150000, isIncluded: false, order: 6, note: 'Tùy chọn theo thiết kế' },
  ]

  for (const item of completedPrices) {
    await prisma.completedPrice.create({ data: item })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
