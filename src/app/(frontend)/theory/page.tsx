import { Button } from '@/shared/ui/button'

export default function Page() {
  return (
    <section className="container flex flex-col gap-10">
      <h1>Это страница Теория</h1>
      <div className="flex gap-5">
        <Button variant="default">Кнопка</Button>
        <Button variant="secondary">Кнопка</Button>
        <Button variant="destructive">Кнопка</Button>
        <Button variant="outline">Кнопка</Button>
        <Button variant="ghost">Кнопка</Button>
        <Button variant="link">Кнопка</Button>
        <Button variant="default">Кнопка</Button>
      </div>
      <div className="flex flex-col gap-5">
        <Button variant="default" className="w-fit">
          Кнопка
        </Button>
        <Button variant="secondary">Кнопка</Button>
        <Button variant="destructive">Кнопка</Button>
        <Button variant="outline">Кнопка</Button>
        <Button variant="ghost">Кнопка</Button>
        <Button variant="link">Кнопка</Button>
        <Button variant="default">Кнопка</Button>
      </div>
    </section>
  )
}
