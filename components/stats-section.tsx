export default function StatsSection() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard number="3M+" label="Lives Saved" description="Through our donor network" />
          <StatCard number="10K+" label="Active Donors" description="Ready to donate when needed" />
          <StatCard number="98%" label="Success Rate" description="For urgent blood requests" />
          <StatCard number="24/7" label="Support" description="Always available to help" />
        </div>
      </div>
    </section>
  )
}

function StatCard({
  number,
  label,
  description,
}: {
  number: string
  label: string
  description: string
}) {
  return (
    <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
      <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">{number}</div>
      <div className="text-lg font-semibold mb-1">{label}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  )
}
