"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, FileText, Code, Workflow, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface GenerateResponse {
  output?: string
  error?: string
}

export default function ProjectQAGenerator() {
  const [formData, setFormData] = useState({
    summary: "",
    tech: "",
    workflow: "",
  })
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (error) setError("")
  }

  const handleGenerate = async () => {
    const { summary, tech, workflow } = formData

    if (!summary.trim() || !tech.trim()) {
      setError("Project Summary and Tech Stack are mandatory.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("https://projqa.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: summary.trim(),
          tech: tech.trim(),
          workflow: workflow.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error("Server Error or Daily Limit Exceeded")
      }

      const data: GenerateResponse = await response.json()

      if (data.output) {
        // Store result in localStorage and navigate to results page
        localStorage.setItem(
          "qaResult",
          JSON.stringify({
            result: data.output,
            projectInfo: {
              summary: summary.trim(),
              tech: tech.trim(),
              workflow: workflow.trim(),
            },
            timestamp: new Date().toISOString(),
          }),
        )
        router.push("/results")
      } else if (data.error) {
        setError(`Error: ${data.error}`)
      } else {
        setError("Unexpected response format")
      }
    } catch (err) {
      console.error(err)
      setError(`Error occurred: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({ summary: "", tech: "", workflow: "" })
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            Project Q&A Generator
          </h1>
          <p className="text-slate-600 text-lg">Generate comprehensive Q&A documentation for your projects</p>
        </div>

        {/* Main Form */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Project Details
            </CardTitle>
            <CardDescription>Fill in your project information to generate relevant Q&A content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Project Summary */}
            <div className="space-y-2">
              <Label htmlFor="summary" className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                Project Summary *
              </Label>
              <Textarea
                id="summary"
                placeholder="Describe your project, its purpose, and main features..."
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                className="min-h-[100px] resize-none border-slate-200 focus:border-blue-400 focus:ring-blue-400 transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <Label htmlFor="tech" className="text-sm font-medium flex items-center gap-2">
                <Code className="h-4 w-4 text-green-600" />
                Tech Stack *
              </Label>
              <Input
                id="tech"
                placeholder="e.g., React, Node.js, MongoDB, Express..."
                value={formData.tech}
                onChange={(e) => handleInputChange("tech", e.target.value)}
                className="border-slate-200 focus:border-blue-400 focus:ring-blue-400 transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Workflow */}
            <div className="space-y-2">
              <Label htmlFor="workflow" className="text-sm font-medium flex items-center gap-2">
                <Workflow className="h-4 w-4 text-purple-600" />
                Workflow (Optional)
              </Label>
              <Textarea
                id="workflow"
                placeholder="Describe your development workflow, deployment process, or any specific methodologies..."
                value={formData.workflow}
                onChange={(e) => handleInputChange("workflow", e.target.value)}
                className="min-h-[80px] resize-none border-slate-200 focus:border-blue-400 focus:ring-blue-400 transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="animate-shake">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <Sparkles className="h-3 w-3 absolute -top-1 -right-1 animate-pulse text-yellow-300" />
                      </div>
                      <span className="animate-pulse">Generating Q&A...</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Q&A
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isLoading}
                className="hover:bg-slate-50 transition-colors bg-transparent"
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading Animation */}
        {isLoading && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-pulse-slow">
            <CardContent className="p-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                  <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600 animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-medium text-slate-700 animate-pulse">Crafting your Q&A...</p>
                  <div className="flex justify-center space-x-1">
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
