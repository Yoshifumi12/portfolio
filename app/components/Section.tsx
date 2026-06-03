'use client'

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="relative z-10 px-5 sm:px-12">
        <div className="flex min-h-[calc(100vh-74px)] flex-col justify-center">{children}</div>
      </div>
    </div>
  )
}
