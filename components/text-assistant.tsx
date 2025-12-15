"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Bot, User, Paperclip, FileAudio, FileText, X, Waves } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  file?: {
    name: string
    type: string
  }
}

export function TextAssistant() {
  const quickPrompts = [
    "Summarize the attached PDF in 3 bullet points.",
    "Draft meeting notes from this voice memo.",
    "Give me 3 key risks and mitigations.",
    "Rewrite this in a warmer tone.",
  ]
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if ((!input.trim() && !uploadedFile) || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input || "Uploaded a file",
      ...(uploadedFile && {
        file: {
          name: uploadedFile.name,
          type: uploadedFile.type,
        },
      }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setIsLoading(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: userMessage.file
          ? `I received your ${userMessage.file.type.includes("pdf") ? "PDF" : "audio"} file "${userMessage.file.name}". ${input ? `You also asked: "${input}". ` : ""}In a production app, I would analyze this file using AI.`
          : `I received your message: "${userMessage.content}". This is a demo response. In a production app, this would be powered by a real AI model.`,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const isAudio = file.type.startsWith("audio/")
      const isPDF = file.type === "application/pdf"

      if (isAudio || isPDF) {
        setUploadedFile(file)
      }
    }
  }

  const removeUploadedFile = () => {
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="relative flex h-[650px] flex-col overflow-hidden border border-white/10 bg-white/5 shadow-[0_24px_120px_-45px_rgba(0,0,0,0.85)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(99,102,241,0.08),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.08),transparent_28%),linear-gradient(120deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-sky-400/30 text-indigo-50 ring-1 ring-white/10">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-slate-300">Assistant</p>
            <p className="text-base font-semibold text-white">Calm & focused responses</p>
          </div>
        </div>
        <Badge className="gap-1 rounded-full border-0 bg-emerald-500/20 text-emerald-100 ring-1 ring-emerald-400/30">
          <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_4px_rgba(34,197,94,0.15)]" />
          Live
        </Badge>
      </div>

      <div className="relative border-b border-white/5 px-5 py-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-sm text-slate-200">
          <Waves className="h-4 w-4 text-sky-300" />
          <span className="text-slate-300">Try a quick prompt:</span>
          <div className="flex gap-2">
            {quickPrompts.map((prompt) => (
              <Button
                key={prompt}
                type="button"
                size="sm"
                variant="outline"
                className="border-white/15 bg-white/5 text-xs text-slate-100 hover:border-indigo-400/50 hover:bg-indigo-500/10"
                onClick={() => setInput(prompt)}
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-200" />
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex-1 space-y-5 overflow-y-auto px-5 py-5">
        {messages.map((message) => {
          const isUser = message.role === "user"
          return (
            <div key={message.id} className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
              {!isUser && (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-indigo-100 ring-1 ring-white/10">
                  <Bot className="h-5 w-5" />
                </div>
              )}

              <div
                className={`relative max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                  isUser
                    ? "bg-gradient-to-br from-indigo-500/80 via-purple-500/70 to-pink-500/60 text-white ring-1 ring-white/20"
                    : "bg-white/10 border border-white/10 text-slate-100 backdrop-blur"
                }`}
              >
                {message.file && (
                  <div className="mb-2 flex items-center gap-2 rounded-xl bg-black/20 px-3 py-2 text-xs text-slate-200 ring-1 ring-white/10">
                    {message.file.type.includes("pdf") ? (
                      <FileText className="h-4 w-4" />
                    ) : (
                      <FileAudio className="h-4 w-4" />
                    )}
                    <span className="truncate">{message.file.name}</span>
                  </div>
                )}
                <p>{message.content}</p>

                <div className="mt-2 flex items-center gap-2 text-[11px] uppercase tracking-wide text-white/70">
                  <span className="h-2 w-2 rounded-full bg-emerald-300/90" />
                  {isUser ? "You" : "Assistant"}
                </div>
              </div>

              {isUser && (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-100 ring-1 ring-white/10">
                  <User className="h-5 w-5" />
                </div>
              )}
            </div>
          )
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-indigo-100 ring-1 ring-white/10">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-slate-200 backdrop-blur">
              <div className="h-2 w-2 animate-bounce rounded-full bg-white/70" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:0.18s]" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:0.32s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative border-t border-white/10 bg-slate-950/60 px-5 py-4 backdrop-blur-xl"
      >
        {uploadedFile && (
          <div className="mb-3 flex items-center justify-between gap-2 rounded-2xl border border-indigo-400/25 bg-indigo-500/10 px-3 py-2 text-sm text-slate-100">
            <div className="flex items-center gap-2 truncate">
              {uploadedFile.type.includes("pdf") ? (
                <FileText className="h-4 w-4 text-indigo-200" />
              ) : (
                <FileAudio className="h-4 w-4 text-indigo-200" />
              )}
              <span className="truncate">{uploadedFile.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={removeUploadedFile}
              type="button"
              className="h-8 w-8 text-slate-200 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-3 py-3 shadow-inner">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 text-slate-100 hover:border-indigo-400/50 hover:bg-indigo-500/10"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,application/pdf,.pdf,.mp3,.wav,.m4a,.ogg,.webm"
            onChange={handleFileUpload}
            className="hidden"
          />

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything or describe your audio/PDF..."
            disabled={isLoading}
            className="flex-1 border-0 bg-transparent text-slate-100 placeholder:text-slate-500 focus-visible:ring-0"
          />
          <Button
            type="submit"
            disabled={isLoading || (!input.trim() && !uploadedFile)}
            size="icon"
            className="h-11 w-11 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/20 transition hover:shadow-pink-500/30 disabled:opacity-60"
          >
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  )
}
