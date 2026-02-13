"use client";

import { 
    ListTodo, 
    MessageCircle, 
    ListChecks, 
    Users, 
    PenSquare, 
    MessageSquare, 
    Workflow, 
    Files 
} from "lucide-react";

import { cn } from "@/lib/utils";

const stats = [
    {
        title: "Total Posts",
        value: "305",
        icon: ListTodo,
        color: "text-green-600",
        bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
        title: "Total Comments",
        value: "11",
        icon: MessageCircle,
        color: "text-slate-600 dark:text-slate-300",
        bgColor: "bg-slate-100 dark:bg-slate-800/50",
    },
    {
        title: "Total Subscribers",
        value: "12",
        icon: ListChecks,
        color: "text-cyan-600",
        bgColor: "bg-cyan-50 dark:bg-cyan-900/30",
    },
    {
        title: "Total Users",
        value: "2",
        icon: Users,
        color: "text-pink-600",
        bgColor: "bg-pink-100 dark:bg-pink-900/30",
    },
    {
        title: "Todays Posts",
        value: "0",
        icon: PenSquare,
        color: "text-purple-600",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
        title: "Todays Comments",
        value: "0",
        icon: MessageSquare,
        color: "text-sky-500",
        bgColor: "bg-sky-100 dark:bg-sky-900/30",
    },
    {
        title: "Today Subscribers",
        value: "0",
        icon: Workflow,
        color: "text-yellow-600",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
        title: "Total Reporters",
        value: "19",
        icon: Files,
        color: "text-emerald-600",
        bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    },
];

export function DashboardStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <div 
                    key={index} 
                    className={cn(
                        "flex items-center p-4 rounded-xl transition-all hover:scale-[1.02] cursor-default",
                        stat.bgColor
                    )}
                >
                    <div className={cn("p-3 rounded-lg mr-4", stat.color)}>
                        <stat.icon className="h-8 w-8" strokeWidth={2.5} />
                    </div>
                    <div>
                        <p className={cn("text-sm font-bold text-muted-foreground/80 dark:text-muted-foreground", "text-black/70 dark:text-white/70")}>
                            {stat.title}
                        </p>
                        <h3 className={cn("text-xl font-bold", "text-black/90 dark:text-white")}>
                            {stat.value}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
