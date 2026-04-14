import { Header } from '@/payload/globals/Header/Component'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', padding: '1rem' }}>
      <Header />
      {children}
    </div>
  )
}
