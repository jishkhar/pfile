"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight, AlertTriangle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InterestRateChart } from "@/components/interest-rate-chart"

export function LendingPortal() {
  const [activeTab, setActiveTab] = useState("lend")
  const [selectedAsset, setSelectedAsset] = useState("SKY")
  const [amount, setAmount] = useState(1000)
  const [term, setTerm] = useState(30)
  const [collateralRatio, setCollateralRatio] = useState(150)

  const assets = [
    {
      symbol: "SKY",
      name: "Skyline Tower",
      apy: 5.2,
      tvl: "$2.45M",
      available: "$1.2M",
      collateralFactor: 0.7,
      price: "$1.05",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      symbol: "DGART",
      name: "Digital Masterpiece",
      apy: 3.8,
      tvl: "$875K",
      available: "$450K",
      collateralFactor: 0.5,
      price: "$0.95",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      symbol: "CARB",
      name: "Carbon Credits",
      apy: 6.5,
      tvl: "$1.1M",
      available: "$650K",
      collateralFactor: 0.6,
      price: "$1.12",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      symbol: "TPAT",
      name: "Tech Patent",
      apy: 4.2,
      tvl: "$1.8M",
      available: "$950K",
      collateralFactor: 0.65,
      price: "$1.03",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ]

  const selectedAssetData = assets.find((a) => a.symbol === selectedAsset) || assets[0]

  const calculateInterest = (principal: number, rate: number, days: number) => {
    return principal * (rate / 100) * (days / 365)
  }

  const interest = calculateInterest(amount, selectedAssetData.apy, term)
  const totalReturn = amount + interest

  const calculateLoanAmount = (collateralAmount: number, collateralRatio: number) => {
    return collateralAmount * (100 / collateralRatio)
  }

  const loanAmount = calculateLoanAmount(amount, collateralRatio)
  const healthFactor = collateralRatio / 100
  const liquidationThreshold = amount * 0.825 // 82.5% of collateral value

  const getRiskLevel = (ratio: number) => {
    if (ratio >= 175) return { level: "Low", color: "text-green-600" }
    if (ratio >= 150) return { level: "Medium", color: "text-yellow-600" }
    return { level: "High", color: "text-red-600" }
  }

  const riskLevel = getRiskLevel(collateralRatio)

  const activeLoans = [
    {
      id: 1,
      asset: "SKY",
      amount: 5000,
      collateral: "USDC",
      collateralAmount: 7500,
      healthFactor: 1.5,
      interestRate: 4.8,
      timeRemaining: "25 days",
    },
    {
      id: 2,
      asset: "TPAT",
      amount: 2500,
      collateral: "USDC",
      collateralAmount: 4000,
      healthFactor: 1.6,
      interestRate: 3.9,
      timeRemaining: "12 days",
    },
  ]

  const activeDeposits = [
    {
      id: 1,
      asset: "CARB",
      amount: 3500,
      apy: 6.5,
      interest: 227.5,
      timeRemaining: "30 days",
    },
    {
      id: 2,
      asset: "DGART",
      amount: 1800,
      apy: 3.8,
      interest: 68.4,
      timeRemaining: "15 days",
    },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <Badge className="mb-2 bg-primary/20 text-primary hover:bg-primary/20">Lending Portal</Badge>
        <h1 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">Lend & Borrow Assets</h1>
        <p className="mt-2 text-gray-600">Earn interest on your assets or get a loan using your tokens as collateral</p>
      </div>

      <Tabs defaultValue="lend" onValueChange={setActiveTab} className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger
              value="lend"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Lend Assets
            </TabsTrigger>
            <TabsTrigger
              value="borrow"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Borrow Assets
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="lend" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Lend Your Assets</CardTitle>
                  <CardDescription>Earn interest by lending your tokenized assets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select Asset</Label>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {assets.map((asset) => (
                        <div
                          key={asset.symbol}
                          className={`flex cursor-pointer flex-col items-center rounded-lg border p-3 transition-all hover:border-primary/20 hover:bg-primary/10 ${
                            selectedAsset === asset.symbol ? "border-primary/20 bg-primary/10" : "border-border"
                          }`}
                          onClick={() => setSelectedAsset(asset.symbol)}
                        >
                          <div className="mb-2 size-10 rounded-full bg-gray-100 p-2">
                            <img src={asset.icon || "/placeholder.svg"} alt={asset.name} className="h-full w-full" />
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-gray-900">{asset.symbol}</div>
                            <div className="text-xs text-green-600">{asset.apy}% APY</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount to Lend</Label>
                    <div className="relative">
                      <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="pr-16"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500">
                        {selectedAsset}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Available: 10,000 {selectedAsset}</span>
                      <button className="text-blue-600" onClick={() => setAmount(10000)}>
                        Max
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Lending Term</Label>
                      <span className="text-sm font-medium text-gray-900">{term} days</span>
                    </div>
                    <Slider
                      defaultValue={[30]}
                      min={1}
                      max={365}
                      step={1}
                      value={[term]}
                      onValueChange={(value) => setTerm(value[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1 day</span>
                      <span>30 days</span>
                      <span>90 days</span>
                      <span>365 days</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-4 font-medium text-gray-900">Lending Summary</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Asset</span>
                        <div className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-gray-100">
                            <img
                              src={selectedAssetData.icon || "/placeholder.svg"}
                              alt={selectedAssetData.name}
                              className="h-full w-full"
                            />
                          </div>
                          <span className="font-medium text-gray-900">{selectedAssetData.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Principal Amount</span>
                        <span className="font-medium text-gray-900">
                          {amount.toLocaleString()} {selectedAsset}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">APY</span>
                        <span className="font-medium text-green-600">{selectedAssetData.apy}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Term</span>
                        <span className="font-medium text-gray-900">{term} days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Estimated Interest</span>
                        <span className="font-medium text-green-600">
                          +{interest.toFixed(2)} {selectedAsset}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                        <span className="text-gray-900">Total Return</span>
                        <span className="text-lg font-bold text-gray-900">
                          {totalReturn.toFixed(2)} {selectedAsset}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary text-primary-foreground hover:opacity-90">
                    Lend {selectedAsset}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interest Rate</CardTitle>
                  <CardDescription>Current rates for {selectedAssetData.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <InterestRateChart asset={selectedAssetData} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asset Information</CardTitle>
                  <CardDescription>
                    {selectedAssetData.name} ({selectedAssetData.symbol})
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Current Price</span>
                    <span className="font-medium text-gray-900">{selectedAssetData.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Total Value Locked</span>
                    <span className="font-medium text-gray-900">{selectedAssetData.tvl}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Available Liquidity</span>
                    <span className="font-medium text-gray-900">{selectedAssetData.available}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Collateral Factor</span>
                    <span className="font-medium text-gray-900">{selectedAssetData.collateralFactor * 100}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {activeDeposits.length > 0 && (
            <div>
              <h2 className="mb-4 font-display text-xl font-bold text-gray-900">Your Active Deposits</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {activeDeposits.map((deposit) => (
                  <Card key={deposit.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{deposit.asset}</CardTitle>
                        <Badge variant="outline" className="bg-green-50 text-green-600">
                          {deposit.apy}% APY
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Deposited Amount</span>
                          <span className="font-medium text-gray-900">
                            {deposit.amount.toLocaleString()} {deposit.asset}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Accrued Interest</span>
                          <span className="font-medium text-green-600">
                            +{deposit.interest.toFixed(2)} {deposit.asset}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Time Remaining</span>
                          <div className="flex items-center gap-1 text-sm text-gray-700">
                            <Clock className="size-4" />
                            {deposit.timeRemaining}
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-gray-500">Term Progress</span>
                            <span className="text-gray-700">50%</span>
                          </div>
                          <Progress value={50} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Extend Term
                      </Button>
                      <Button variant="destructive" size="sm">
                        Withdraw Early
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="borrow" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Borrow Against Collateral</CardTitle>
                  <CardDescription>Use your assets as collateral to get a loan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select Collateral Asset</Label>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {assets.map((asset) => (
                        <div
                          key={asset.symbol}
                          className={`flex cursor-pointer flex-col items-center rounded-lg border p-3 transition-all hover:border-primary/20 hover:bg-primary/10 ${
                            selectedAsset === asset.symbol ? "border-primary/20 bg-primary/10" : "border-border"
                          }`}
                          onClick={() => setSelectedAsset(asset.symbol)}
                        >
                          <div className="mb-2 size-10 rounded-full bg-gray-100 p-2">
                            <img src={asset.icon || "/placeholder.svg"} alt={asset.name} className="h-full w-full" />
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-gray-900">{asset.symbol}</div>
                            <div className="text-xs text-gray-600">CF: {asset.collateralFactor * 100}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collateral-amount">Collateral Amount</Label>
                    <div className="relative">
                      <Input
                        id="collateral-amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="pr-16"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500">
                        {selectedAsset}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Available: 10,000 {selectedAsset}</span>
                      <button className="text-blue-600" onClick={() => setAmount(10000)}>
                        Max
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Collateralization Ratio</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <span>{collateralRatio}%</span>
                              <Info className="size-4" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-sm">
                              Higher collateralization ratio means lower risk of liquidation but smaller loan amount.
                              Minimum ratio is 125%.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Slider
                      defaultValue={[150]}
                      min={125}
                      max={200}
                      step={5}
                      value={[collateralRatio]}
                      onValueChange={(value) => setCollateralRatio(value[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs">
                      <span className="text-red-600">High Risk (125%)</span>
                      <span className="text-yellow-600">Medium (150%)</span>
                      <span className="text-green-600">Low Risk (200%)</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-4 font-medium text-gray-900">Loan Summary</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Collateral Asset</span>
                        <div className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-gray-100">
                            <img
                              src={selectedAssetData.icon || "/placeholder.svg"}
                              alt={selectedAssetData.name}
                              className="h-full w-full"
                            />
                          </div>
                          <span className="font-medium text-gray-900">{selectedAssetData.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Collateral Amount</span>
                        <span className="font-medium text-gray-900">
                          {amount.toLocaleString()} {selectedAsset}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Collateral Value</span>
                        <span className="font-medium text-gray-900">
                          ${(amount * Number.parseFloat(selectedAssetData.price.replace("$", ""))).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Collateralization Ratio</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{collateralRatio}%</span>
                          <Badge className={`${riskLevel.color} bg-opacity-10`}>{riskLevel.level} Risk</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Liquidation Threshold</span>
                        <span className="font-medium text-gray-900">${liquidationThreshold.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Interest Rate (APR)</span>
                        <span className="font-medium text-gray-900">{(selectedAssetData.apy * 0.8).toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                        <span className="text-gray-900">Available Loan Amount</span>
                        <span className="text-lg font-bold text-gray-900">${loanAmount.toFixed(2)} USDC</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary text-primary-foreground hover:opacity-90">
                    Get Loan
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                  <CardDescription>Understand your liquidation risk</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className={`size-3 rounded-full ${riskLevel.color}`} />
                      <h4 className={`font-medium ${riskLevel.color}`}>{riskLevel.level} Risk Level</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your position will be at risk of liquidation if the collateral value falls below $
                      {liquidationThreshold.toLocaleString()}.
                    </p>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Health Factor</span>
                      <span
                        className={`font-medium ${healthFactor >= 1.5 ? "text-green-600" : healthFactor >= 1.2 ? "text-yellow-600" : "text-red-600"}`}
                      >
                        {healthFactor.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className={`h-full rounded-full ${
                          healthFactor >= 1.5 ? "bg-green-500" : healthFactor >= 1.2 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${Math.min(healthFactor * 50, 100)}%` }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>1.0</span>
                      <span>1.5</span>
                      <span>2.0</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 size-4 flex-shrink-0 text-yellow-600" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Liquidation Warning</h4>
                        <p className="text-sm text-yellow-700">
                          If your health factor drops below 1.0, your position may be liquidated to repay the loan.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loan Terms</CardTitle>
                  <CardDescription>Understand your loan conditions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Loan Duration</span>
                    <span className="font-medium text-gray-900">30 days (renewable)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Interest Payment</span>
                    <span className="font-medium text-gray-900">Accrued continuously</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Early Repayment</span>
                    <span className="font-medium text-green-600">No penalty</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Liquidation Fee</span>
                    <span className="font-medium text-gray-900">10%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {activeLoans.length > 0 && (
            <div>
              <h2 className="mb-4 font-display text-xl font-bold text-gray-900">Your Active Loans</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {activeLoans.map((loan) => (
                  <Card key={loan.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{loan.asset} Loan</CardTitle>
                        <Badge
                          variant="outline"
                          className={
                            loan.healthFactor >= 1.5 ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                          }
                        >
                          Health: {loan.healthFactor.toFixed(2)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Borrowed Amount</span>
                          <span className="font-medium text-gray-900">
                            {loan.amount.toLocaleString()} {loan.asset}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Collateral</span>
                          <span className="font-medium text-gray-900">
                            {loan.collateralAmount.toLocaleString()} {loan.collateral}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Interest Rate</span>
                          <span className="font-medium text-gray-900">{loan.interestRate}% APR</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Time Remaining</span>
                          <div className="flex items-center gap-1 text-sm text-gray-700">
                            <Clock className="size-4" />
                            {loan.timeRemaining}
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-gray-500">Loan Progress</span>
                            <span className="text-gray-700">60%</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Add Collateral
                      </Button>
                      <Button className="bg-primary text-primary-foreground hover:opacity-90" size="sm">
                        Repay Loan
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
