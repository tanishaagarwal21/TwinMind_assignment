"use client"

import { TextAssistant } from "@/components/text-assistant"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Mic2, ShieldCheck, Waves, Sparkles } from "lucide-react"

const highlights = [
  { icon: Bot, title: "Real-time replies", body: "Streaming, grounded answers that stay on topic." },
  { icon: Mic2, title: "Voice-first", body: "Upload audio, narrations, or quick voice notes." },
  { icon: ShieldCheck, title: "Secure by design", body: "Local-first UI with privacy-friendly defaults." },
  { icon: Waves, title: "Media aware", body: "Understands PDFs, transcripts, and long form audio." },
]

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-[-10%] h-72 w-72 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-0 h-80 w-80 rounded-full bg-purple-500/25 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.14),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(56,189,248,0.08),transparent_28%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 pb-16 pt-14 lg:grid-cols-[1.05fr_minmax(0,1fr)] lg:items-start lg:pb-24 lg:pt-16">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 shadow-inner backdrop-blur">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            Aurora Studio · Voice + Text AI
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              A sleek workspace for voice-forward AI chats
            </h1>
            <p className="text-lg text-slate-300">
              Blend quick voice uploads, PDF context, and fast chat replies inside a calm, dark canvas.
              Designed for creators who want clarity without distractions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-pink-500/30"
            >
              Start a conversation
            </Button>
            <Button variant="outline" size="lg" className="border-white/15 bg-white/5 text-slate-100 shadow-sm">
              View transcript history
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-sky-400/30 text-indigo-100 ring-1 ring-white/10">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-slate-50">{item.title}</p>
                    <p className="text-sm text-slate-300">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 backdrop-blur">
            <Badge variant="outline" className="border-indigo-400/40 bg-indigo-500/10 text-indigo-100">
              Updated
            </Badge>
            New ambient gradients, glass panels, and richer chat bubbles for a calmer nighttime workspace.
          </div>
        </div>

        <div className="w-full lg:pt-2 lg:justify-self-stretch">
          <TextAssistant />
        </div>
      </div>
    </div>
  )
}
