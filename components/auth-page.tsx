"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export function AuthPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") === "login" ? "login" : "signup"
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-foreground dark:from-navy-900 dark:via-navy-950 dark:to-navy-900">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <div className="relative size-8 rounded-full bg-gradient-to-br from-teal-400 to-purple-500 p-[1px]">
            <div className="h-full w-full rounded-full bg-background"></div>
          </div>
          <span className="font-montserrat text-xl font-bold tracking-tight text-primary">
            UnityVault
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="rounded-2xl border border-transparent bg-gradient-to-br from-white/60 to-purple-100/60 p-1 shadow-lg backdrop-blur-md dark:from-navy-800/80 dark:to-teal-900/60 dark:text-white">
            <div className="rounded-2xl bg-background p-6 dark:bg-navy-950">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-bold font-montserrat">
                  Welcome to UnityVault
                </CardTitle>
                <CardDescription className="text-center">
                  {activeTab === "login"
                    ? "Sign in to your account"
                    : "Create a new account"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-muted rounded-xl overflow-hidden">
                    <TabsTrigger
                      value="login"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    >
                      Login
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                        <Input
                          id="email"
                          placeholder="Enter your email"
                          type="email"
                          className="pl-10 placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href="#"
                          className="text-xs text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" className="data-[state=checked]:bg-primary" />
                      <label htmlFor="remember" className="text-sm">
                        Remember me
                      </label>
                    </div>
                  </TabsContent>

                  <TabsContent value="signup" className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 size-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          placeholder="Enter your full name"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          placeholder="Enter your email"
                          type="email"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" className="data-[state=checked]:bg-primary" />
                      <label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white hover:shadow-xl hover:scale-[1.01] transition-transform"
                >
                  <Link href="/dashboard">
                    {activeTab === "login" ? "Sign In" : "Create Account"}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  {activeTab === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <button
                        onClick={() => setActiveTab("signup")}
                        className="text-primary hover:underline"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        onClick={() => setActiveTab("login")}
                        className="text-primary hover:underline"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </div>
              </CardFooter>
            </div>
          </Card>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              asChild
              className="text-muted-foreground hover:text-foreground"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 size-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
