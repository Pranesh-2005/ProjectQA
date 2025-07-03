"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Copy,
  Download,
  CheckCircle,
  FileText,
  Code,
  Workflow,
  Calendar,
  Share2,
  Printer,
} from "lucide-react"

interface QAResult {
  result: string
  projectInfo: {
    summary: string
    tech: string
    workflow: string
  }
  timestamp: string
}

export default function ResultsPage() {
  const [qaData, setQaData] = useState<QAResult | null>(null)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedData = localStorage.getItem("qaResult")
    if (storedData) {
      setQaData(JSON.parse(storedData))
    } else {
      // Redirect back if no data found
      router.push("/")
    }
  }, [router])

  const handleCopy = async () => {
    if (qaData?.result) {
      await navigator.clipboard.writeText(qaData.result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (qaData?.result) {
      const blob = new Blob([qaData.result], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `project-qa-${new Date().toISOString().split("T")[0]}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share && qaData?.result) {
      try {
        await navigator.share({
          title: "Project Q&A Documentation",
          text: qaData.result,
        })
      } catch (err) {
        // Fallback to copy
        handleCopy()
      }
    } else {
      handleCopy()
    }
  }

  // Format the result for better display
  const formatResult = (text: string) => {
    const sections = text.split(/(?=Q\d+:|Question \d+:|Question:)/i)
    return sections
      .filter((section) => section.trim())
      .map((section, index) => {
        const lines = section.trim().split("\n")
        const question = lines[0]
        const answer = lines.slice(1).join("\n").trim()

        return (
          <div
            key={index}
            className="group mb-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-semibold text-slate-800 leading-relaxed group-hover:text-blue-700 transition-colors">
                  {question}
                </h3>
                {answer && (
                  <div className="text-slate-600 leading-relaxed whitespace-pre-wrap pl-6 border-l-4 border-blue-100 bg-slate-50 p-4 rounded-r-lg">
                    {answer}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })
  }

  if (!qaData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your Q&A documentation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="hover:bg-slate-100">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Generator
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-800">Q&A Documentation</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare} className="hidden sm:flex bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint} className="hidden sm:flex bg-transparent">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="transition-all duration-200 bg-transparent"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All
                  </>
                )}
              </Button>
              <Button
                size="sm"
                onClick={handleDownload}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Project Info Summary */}
        <Card className="mb-8 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <CheckCircle className="h-5 w-5" />
              Project Overview
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-slate-600">
              <Calendar className="h-4 w-4" />
              Generated on{" "}
              {new Date(qaData.timestamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <h3 className="font-semibold text-slate-800">Project Summary</h3>
                </div>
                <p className="text-slate-600 leading-relaxed pl-6 border-l-2 border-blue-100">
                  {qaData.projectInfo.summary}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-green-600" />
                  <h3 className="font-semibold text-slate-800">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2 pl-6">
                  {qaData.projectInfo.tech.split(",").map((tech, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                      {tech.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {qaData.projectInfo.workflow && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-purple-600" />
                  <h3 className="font-semibold text-slate-800">Workflow</h3>
                </div>
                <p className="text-slate-600 leading-relaxed pl-6 border-l-2 border-purple-100">
                  {qaData.projectInfo.workflow}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Q&A Results */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <FileText className="h-5 w-5" />
              Questions & Answers
            </CardTitle>
            <CardDescription>Comprehensive Q&A documentation for your project</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">{formatResult(qaData.result)}</div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={() => router.push("/")} className="bg-white/80 hover:bg-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Generate Another Q&A
            </Button>
            <Button variant="outline" onClick={handleShare} className="bg-white/80 hover:bg-white sm:hidden">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" onClick={handlePrint} className="bg-white/80 hover:bg-white sm:hidden">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
