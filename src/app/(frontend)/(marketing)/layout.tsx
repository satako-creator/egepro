import { Footer } from '@/payload/globals/Footer/Component'
import { Header } from '@/payload/globals/Header/Component'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
