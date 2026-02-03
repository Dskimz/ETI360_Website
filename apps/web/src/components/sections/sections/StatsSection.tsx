export function StatsSection({value}: {value: any}) {
  const items = Array.isArray(value.items) ? value.items : []

  return (
    <section className="bg-transparent">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((item: any, index: number) => (
            <div key={item?._key ?? index} className="border-l border-border pl-6 first:border-l-0 first:pl-0">
              <div className="text-xl font-semibold tracking-tight text-text-secondary">{item.value}</div>
              <div className="mt-2 text-sm text-text-tertiary">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
