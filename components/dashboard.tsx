"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Layers, BarChart3, CreditCard, Gift, TrendingUp, TrendingDown, Clock } from "lucide-react"
import { HeroScene } from "@/components/hero-scene"
import { PortfolioChart } from "@/components/portfolio-chart"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const [timeframe, setTimeframe] = useState("1m")
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState(null)

  const assets = [
    {
      id: 1,
      name: "Skyline Tower",
      symbol: "SKY",
      value: 125000,
      change: 3.2,
      type: "property",
      location: "New York, NY",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Digital Masterpiece",
      symbol: "DGART",
      value: 47500,
      change: -1.2,
      type: "collectible",
      creator: "Digital Visionary",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Carbon Credits",
      symbol: "CARB",
      value: 32750,
      change: 5.7,
      type: "environmental",
      location: "Global",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Tech Patent",
      symbol: "TPAT",
      value: 85000,
      change: 0.8,
      type: "intellectual",
      field: "Renewable Energy",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "Luxury Apartment",
      symbol: "LUXAP",
      value: 95000,
      change: 2.1,
      type: "property",
      location: "Miami, FL",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 6,
      name: "Rare Collectible",
      symbol: "RCOL",
      value: 28500,
      change: 4.3,
      type: "collectible",
      year: "1985",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 7,
      name: "Water Rights",
      symbol: "WATER",
      value: 42000,
      change: -0.5,
      type: "environmental",
      location: "Colorado River",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 8,
      name: "Music Royalties",
      symbol: "MUSIC",
      value: 63500,
      change: 1.9,
      type: "intellectual",
      artist: "Various Artists",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const filteredAssets = activeTab === "all" ? assets : assets.filter((asset) => asset.type === activeTab)

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
  const totalChange = +(
    assets.reduce((sum, asset) => sum + asset.value * (asset.change / 100), 0) / totalValue
  ).toFixed(2)

  const recentActivity = [
    {
      id: 1,
      type: "purchase",
      asset: "Skyline Tower",
      amount: "$12,500",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "sale",
      asset: "Digital Masterpiece",
      amount: "$5,200",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "dividend",
      asset: "Tech Patent",
      amount: "$850",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "tokenize",
      asset: "Luxury Apartment",
      amount: "$95,000",
      time: "2 days ago",
    },
  ]

  const allActivity = [
    ...recentActivity,
    {
      id: 5,
      type: "purchase",
      asset: "Carbon Credits",
      amount: "$3,200",
      time: "3 days ago",
    },
    {
      id: 6,
      type: "dividend",
      asset: "Music Royalties",
      amount: "$1,250",
      time: "4 days ago",
    },
    {
      id: 7,
      type: "sale",
      asset: "Rare Collectible",
      amount: "$4,800",
      time: "5 days ago",
    },
    {
      id: 8,
      type: "tokenize",
      asset: "Water Rights",
      amount: "$42,000",
      time: "1 week ago",
    },
    {
      id: 9,
      type: "purchase",
      asset: "Tech Patent",
      amount: "$8,500",
      time: "1 week ago",
    },
    {
      id: 10,
      type: "dividend",
      asset: "Skyline Tower",
      amount: "$3,750",
      time: "2 weeks ago",
    },
  ]

  const handleViewAllActivity = () => {
    setShowActivityModal(true)
  }

  const handleAssetTrade = (asset) => {
    setSelectedAsset(asset)
    window.location.href = `/trade?asset=${asset.symbol}`
  }

  return (
    <>
      <Navbar />
      <div className="container py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/20">
                  Decentralized Asset Ecosystem
                </Badge>
                <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                  Tokenize Reality.
                  <br />
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Unlock Value.
                  </span>
                </h1>
                <p className="mt-4 max-w-md text-lg text-gray-600">
                  Transform your physical and digital assets into tokenized value in the decentralized ecosystem.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:opacity-90">
                  <Link href="/tokenize">
                    Get Started
                    <ArrowUpRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="h-[400px] w-full rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FFE66D]/10 p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <HeroScene />
            </motion.div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Layers, label: "Tokenize", href: "/tokenize", color: "from-[#FF6B6B] to-[#FF9671]" },
              { icon: BarChart3, label: "Trade", href: "/trade", color: "from-[#FFE66D] to-[#FFC75F]" },
              { icon: CreditCard, label: "Lend", href: "/lend", color: "from-[#FF6B6B] to-[#FFE66D]" },
              { icon: Gift, label: "Donate", href: "/community", color: "from-[#4ECDC4] to-[#6A0572]" },
            ].map((action, index) => (
              <Link key={action.label} href={action.href}>
                <motion.div
                  className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`absolute -right-6 -top-6 size-24 rounded-full bg-primary/10 opacity-10 blur-xl transition-all group-hover:opacity-20`}
                  />
                  <div className={`mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10`}>
                    <action.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground">{action.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Quick access to {action.label.toLowerCase()} features
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Portfolio Overview */}
        <section className="mb-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Portfolio Performance</CardTitle>
                    <CardDescription>Track your asset value over time</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {["1w", "1m", "3m", "1y", "all"].map((period) => (
                      <Button
                        key={period}
                        variant={timeframe === period ? "secondary" : "ghost"}
                        size="sm"
                        className="h-8"
                        onClick={() => setTimeframe(period)}
                      >
                        {period.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <PortfolioChart timeframe={timeframe} />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Stats</CardTitle>
                  <CardDescription>Current value and metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Total Value</div>
                    <div className="text-3xl font-bold text-gray-900">${totalValue.toLocaleString()}</div>
                    <div
                      className={`flex items-center text-sm ${totalChange >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {totalChange >= 0 ? (
                        <TrendingUp className="mr-1 size-4" />
                      ) : (
                        <TrendingDown className="mr-1 size-4" />
                      )}
                      {totalChange >= 0 ? "+" : ""}
                      {totalChange}% overall
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Assets</div>
                      <div className="text-lg font-medium text-gray-900">{assets.length}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Categories</div>
                      <div className="text-lg font-medium text-gray-900">4</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Highest Value</div>
                      <div className="text-lg font-medium text-gray-900">
                        ${Math.max(...assets.map((a) => a.value)).toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Best Performer</div>
                      <div className="text-lg font-medium text-green-600">
                        +{Math.max(...assets.map((a) => a.change))}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest transactions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3">
                        <div
                          className={`flex size-10 items-center justify-center rounded-full ${
                            activity.type === "purchase"
                              ? "bg-green-100 text-green-600"
                              : activity.type === "sale"
                                ? "bg-red-100 text-red-600"
                                : activity.type === "dividend"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {activity.type === "purchase" ? (
                            <TrendingUp className="size-5" />
                          ) : activity.type === "sale" ? (
                            <TrendingDown className="size-5" />
                          ) : activity.type === "dividend" ? (
                            <CreditCard className="size-5" />
                          ) : (
                            <Layers className="size-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-gray-900">
                              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                            </div>
                            <div className="text-sm font-medium text-gray-900">{activity.amount}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">{activity.asset}</div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="mr-1 size-3" />
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={handleViewAllActivity}>
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Asset Cards */}
        <section>
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="font-display text-2xl font-bold text-gray-900">Your Assets</h2>
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="property">Property</TabsTrigger>
                <TabsTrigger value="collectible">Collectible</TabsTrigger>
                <TabsTrigger value="environmental">Environmental</TabsTrigger>
                <TabsTrigger value="intellectual">Intellectual</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                <Card className="group overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{asset.symbol}</Badge>
                      <div className={`text-sm font-medium ${asset.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {asset.change >= 0 ? "+" : ""}
                        {asset.change}%
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="size-16 overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={asset.image || "/placeholder.svg"}
                          width={80}
                          height={80}
                          alt={asset.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{asset.name}</h3>
                        <p className="text-sm text-gray-500">
                          {asset.type === "property"
                            ? asset.location
                            : asset.type === "collectible"
                              ? asset.creator || asset.year
                              : asset.type === "environmental"
                                ? asset.location
                                : asset.field || asset.artist}
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">${asset.value.toLocaleString()}</div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t pt-3">
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleAssetTrade(asset)}>
                      Trade
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Activity Modal */}
      <Dialog open={showActivityModal} onOpenChange={setShowActivityModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>All Activity</DialogTitle>
            <DialogDescription>Your complete transaction history</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto py-4">
            <div className="space-y-4">
              {allActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                  <div
                    className={`flex size-10 items-center justify-center rounded-full ${
                      activity.type === "purchase"
                        ? "bg-green-100 text-green-600"
                        : activity.type === "sale"
                          ? "bg-red-100 text-red-600"
                          : activity.type === "dividend"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {activity.type === "purchase" ? (
                      <TrendingUp className="size-5" />
                    ) : activity.type === "sale" ? (
                      <TrendingDown className="size-5" />
                    ) : activity.type === "dividend" ? (
                      <CreditCard className="size-5" />
                    ) : (
                      <Layers className="size-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900">
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{activity.amount}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">{activity.asset}</div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="mr-1 size-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
