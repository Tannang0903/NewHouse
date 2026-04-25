// Root admin layout - KHÔNG check session ở đây
// Việc check session được thực hiện trong (protected)/layout.tsx
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
