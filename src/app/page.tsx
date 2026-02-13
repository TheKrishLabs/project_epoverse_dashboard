import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

export default function Home() {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] w-full flex-col p-6 gap-8 overflow-hidden bg-background">
      <div className="z-10 flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Welcome to Epoverse</h1>
        <p className="max-w-lg text-muted-foreground">
          Your new favorite place on the internet.
        </p>
      </div>

      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          "opacity-50"
        )}
      />
    </div>
  );
}


