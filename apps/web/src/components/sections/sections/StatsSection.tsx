export function StatsSection({value}: {value: any}) {
  const items = Array.isArray(value.items) ? value.items : []

  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((item: any, index: number) => (
            <div key={item?._key ?? index} className="rounded-xl border border-border bg-background p-6">
              <div className="text-2xl font-semibold tracking-tight text-text-secondary">{item.value}</div>
              <div className="mt-2 text-sm text-text-tertiary">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

