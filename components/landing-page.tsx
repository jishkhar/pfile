"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Layers, BarChart3, Shield, Wallet } from "lucide-react"

export function LandingPage() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="border-b backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="relative size-8 rounded-full bg-primary p-[1px]">
              <div className="h-full w-full rounded-full bg-background"></div>
            </div>
            <span className="font-space text-xl font-bold tracking-tight">UnityVault</span>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
              How It Works
            </Link>
            <Link href="#ecosystem" className="text-sm text-muted-foreground hover:text-foreground">
              Ecosystem
            </Link>
            <Link href="/auth" className="text-sm text-muted-foreground hover:text-foreground">
              Sign In
            </Link>
            <Button asChild className="bg-primary text-primary-foreground hover:opacity-90">
              <Link href="/auth">
                Get Started
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
          <Button asChild className="bg-primary text-primary-foreground hover:opacity-90 md:hidden">
            <Link href="/auth">
              Sign In
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Decentralized Asset Ecosystem
            </div>
            <h1 className="font-space text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Tokenize Reality.
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Unlock Value.
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Transform your physical and digital assets into tokenized value in the decentralized ecosystem. Secure,
              transparent, and governed by the community.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:opacity-90">
                <Link href="/auth">
                  Launch App
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-foreground" onClick={() => setShowDemo(true)}>
                Watch Demo
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="size-8 rounded-full border-2 border-background bg-muted"></div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">2,500+</span> users already tokenizing assets
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative h-[400px] w-full max-w-[500px] overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 hex-pattern opacity-20"></div>
              <div className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"></div>
              <div className="absolute left-1/4 top-1/4 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-2xl"></div>
              <div className="absolute right-1/4 bottom-1/4 size-32 translate-x-1/2 translate-y-1/2 rounded-full bg-primary/20 blur-2xl"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/20">
                    <Wallet className="size-8 text-primary" />
                  </div>
                  <h3 className="font-space text-xl font-bold">Decentralized Asset Platform</h3>
                  <p className="mt-2 text-muted-foreground">Secure. Transparent. Community-driven.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-space text-3xl font-bold md:text-4xl">Unlock the Power of Tokenization</h2>
            <p className="mt-4 text-muted-foreground">Transform any asset into a digital token with real-world value</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Layers,
                title: "Tokenize Assets",
                description: "Convert real-world assets into digital tokens with verified ownership and value.",
                color: "from-primary to-primary/70",
              },
              {
                icon: BarChart3,
                title: "Trade & Invest",
                description: "Buy, sell, and trade tokenized assets in a secure and transparent marketplace.",
                color: "from-primary to-primary/70",
              },
              {
                icon: Shield,
                title: "Governance & Security",
                description: "Community-driven governance with advanced security protocols and transparency.",
                color: "from-primary to-primary/70",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl border p-6"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-6 text-primary" />
                </div>
                <h3 className="font-space text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="rounded-2xl border bg-gradient-to-b from-secondary to-background p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-space text-3xl font-bold md:text-4xl">Ready to Start Your Tokenization Journey?</h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of users already transforming their assets into digital tokens. Get started today and
              unlock the full potential of your assets.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:opacity-90">
                <Link href="/auth">
                  Create Account
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary" asChild>
                <Link href="/auth?tab=login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="relative size-8 rounded-full bg-primary p-[1px]">
                <div className="h-full w-full rounded-full bg-background"></div>
              </div>
              <span className="font-space text-xl font-bold tracking-tight">UnityVault</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Docs
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">© 2024 UnityVault. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
