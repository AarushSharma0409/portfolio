//import { Liquid } from "@/components/ui/liquid-effect-animation"
import { Globe } from "@/components/ui/globe"
import { Meteors } from "@/components/ui/meteors"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* Meteors Background */}
      <div className="fixed inset-0 z-0">
        <Meteors number={50} />
      </div>
      
      {/* Content layer */}
      <div className="relative z-5 min-h-screen">
        {/* Globe */}
        <Globe className="opacity-100" />
        
        {/* Additional content */}
        <div className="absolute top-20 left-20 text-white">
          <h1 className="text-6xl font-bold"></h1>
        </div>
      </div>
    </main>
  )
}