import { AdminBar } from '@/payload/components/AdminBar'
import { Footer } from '@/payload/globals/Footer/Component'
import { Header } from '@/payload/globals/Header/Component'
import { draftMode } from 'next/headers'

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  return (
    <div className="flex min-h-screen flex-col">
      <AdminBar
        adminBarProps={{
          preview: isEnabled,
        }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
