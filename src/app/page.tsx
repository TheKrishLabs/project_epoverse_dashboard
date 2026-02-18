import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
// import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 overflow-hidden">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "opacity-50"
        )}
      />
      
      <div className="z-10 flex flex-col items-center text-center space-y-8 max-w-2xl">
        <div className="relative w-64 h-64 md:w-80 md:h-80 animate-in fade-in zoom-in duration-700">
           {/* Placeholder for the generated image. Using Icon for now due to generation service outage. */}
           <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-full animate-pulse">
              <Sparkles className="h-32 w-32 text-primary/80" />
           </div>
           {/* 
           <Image 
            src="/namaste_illustration.png" 
            alt="Namaste Welcome" 
            fill
            className="object-contain drop-shadow-xl"
            priority
           /> 
           */}
        </div>

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            Namaste, Welcome to Epoverse
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
            Your centralized dashboard for content, analytics, and community growth.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Link href="/login">
            <Button size="lg" className="min-w-[150px] shadow-lg hover:shadow-xl transition-all">
              Get Started
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="min-w-[150px] bg-background/50 backdrop-blur-sm">
              Live Dashboard
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-4 text-xs text-muted-foreground/50">
        © 2026 Epoverse Inc.
      </div>
    </div>
  );
}
