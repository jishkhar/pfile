"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowDownUp, TrendingUp, TrendingDown, Clock, ArrowRight, Search, ExternalLink } from "lucide-react"
import { TradingChart } from "@/components/trading-chart"
import { OrderbookVisualizer } from "@/components/orderbook-visualizer"
import { Badge } from "@/components/ui/badge"

export function TradingPlatform() {
  const [tradeType, setTradeType] = useState("buy")
  const [orderType, setOrderType] = useState("market")
  const [amount, setAmount] = useState(100)
  const [price, setPrice] = useState(1.05)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  const assetPairs = [
    { name: "SKY/USDC", price: 1.05, change: 3.2, volume: "125,430" },
    { name: "DGART/USDC", price: 0.95, change: -1.2, volume: "87,250" },
    { name: "CARB/USDC", price: 1.12, change: 5.7, volume: "56,780" },
    { name: "TPAT/USDC", price: 1.03, change: 0.8, volume: "98,320" },
    { name: "LUXAP/USDC", price: 1.08, change: 2.1, volume: "45,670" },
    { name: "RCOL/USDC", price: 0.87, change: 4.3, volume: "32,450" },
    { name: "WATER/USDC", price: 0.92, change: -0.5, volume: "76,890" },
    { name: "MUSIC/USDC", price: 1.15, change: 1.9, volume: "54,320" },
  ]

  const [selectedPair, setSelectedPair] = useState(assetPairs[0])

  const handlePairChange = (pairName: string) => {
    const pair = assetPairs.find((p) => p.name === pairName)
    if (pair) {
      setSelectedPair(pair)
      setPrice(pair.price)
    }
  }

  const orderbook = {
    asks: [
      { price: 1.08, amount: 1200 },
      { price: 1.07, amount: 850 },
      { price: 1.06, amount: 1500 },
      { price: 1.05, amount: 2000 },
    ],
    bids: [
      { price: 1.04, amount: 1800 },
      { price: 1.03, amount: 1200 },
      { price: 1.02, amount: 900 },
      { price: 1.01, amount: 1500 },
    ],
  }

  const recentTransactions = [
    {
      id: "0x8a7c...3f9b",
      type: "Buy",
      pair: "SKY/USDC",
      price: 1.05,
      amount: 500,
      total: 525,
      time: "2 mins ago",
      status: "Completed",
      hash: "0x8a7c3d2e1f9b8a7c3d2e1f9b8a7c3d2e1f9b8a7c3d2e1f9b8a7c3d2e1f9b",
      from: "0x7F...A3D9",
      to: "0x3A...B2C1",
      fee: "0.05 USDC",
      blockNumber: 12345678,
    },
    {
      id: "0x3d2e...7a1c",
      type: "Sell",
      pair: "DGART/USDC",
      price: 0.95,
      amount: 1000,
      total: 950,
      time: "15 mins ago",
      status: "Completed",
      hash: "0x3d2e7a1c5b4f3d2e7a1c5b4f3d2e7a1c5b4f3d2e7a1c5b4f3d2e7a1c5b4f",
      from: "0x3A...B2C1",
      to: "0x5D...E7F2",
      fee: "0.09 USDC",
      blockNumber: 12345670,
    },
    {
      id: "0x5f8b...2d4e",
      type: "Buy",
      pair: "CARB/USDC",
      price: 1.12,
      amount: 750,
      total: 840,
      time: "1 hour ago",
      status: "Completed",
      hash: "0x5f8b2d4e9c1a5f8b2d4e9c1a5f8b2d4e9c1a5f8b2d4e9c1a5f8b2d4e9c1a",
      from: "0x7F...A3D9",
      to: "0x8B...C4D2",
      fee: "0.08 USDC",
      blockNumber: 12345665,
    },
  ]

  const totalValue = amount * price

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setShowTransactionModal(true)
  }

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <Badge className="mb-2 bg-primary/20 text-primary hover:bg-primary/20">Trading Platform</Badge>
        <h1 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">Trade Tokenized Assets</h1>
        <p className="mt-2 text-gray-600">Buy and sell assets in the decentralized marketplace</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Asset Pairs Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Asset Pairs</CardTitle>
            <CardDescription>Select a pair to trade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 size-4 text-gray-400" />
              <Input placeholder="Search pairs..." className="pl-8" />
            </div>

            <div className="mt-4 space-y-1">
              {assetPairs.map((pair) => (
                <motion.div
                  key={pair.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors ${selectedPair.name === pair.name ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}`}
                  onClick={() => handlePairChange(pair.name)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${pair.change >= 0 ? "bg-green-500" : "bg-red-500"}`} />
                    <span>{pair.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${pair.price.toFixed(2)}</div>
                    <div className={`text-xs ${pair.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {pair.change >= 0 ? "+" : ""}
                      {pair.change}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Trading Area */}
        <div className="space-y-6 lg:col-span-3">
          {/* Price Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>{selectedPair.name}</CardTitle>
                  <Badge variant="outline">24h Vol: ${selectedPair.volume}</Badge>
                </div>
                <CardDescription>
                  <span className="text-lg font-medium text-gray-900">${selectedPair.price.toFixed(2)}</span>
                  <span className={`ml-2 text-sm ${selectedPair.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {selectedPair.change >= 0 ? "+" : ""}
                    {selectedPair.change}%
                  </span>
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Clock className="mr-1 size-3" />
                  1H
                </Button>
                <Button variant="secondary" size="sm" className="h-8">
                  <Clock className="mr-1 size-3" />
                  1D
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Clock className="mr-1 size-3" />
                  1W
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Clock className="mr-1 size-3" />
                  1M
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <TradingChart pair={selectedPair} />
              </div>
            </CardContent>
          </Card>

          {/* Trading Interface */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Order Form */}
            <Card>
              <CardHeader>
                <CardTitle>Place Order</CardTitle>
                <CardDescription>Trade {selectedPair.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex rounded-md">
                  <Button
                    className={`w-1/2 rounded-r-none ${tradeType === "buy" ? "bg-green-600 text-white hover:bg-green-700" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                    onClick={() => setTradeType("buy")}
                  >
                    <TrendingUp className="mr-2 size-4" />
                    Buy
                  </Button>
                  <Button
                    className={`w-1/2 rounded-l-none ${tradeType === "sell" ? "bg-red-600 text-white hover:bg-red-700" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                    onClick={() => setTradeType("sell")}
                  >
                    <TrendingDown className="mr-2 size-4" />
                    Sell
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Order Type</Label>
                  <Select defaultValue="market" onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market Order</SelectItem>
                      <SelectItem value="limit">Limit Order</SelectItem>
                      <SelectItem value="stop">Stop Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="pr-16"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500">
                      {selectedPair.name.split("/")[0]}
                    </div>
                  </div>
                </div>

                {orderType !== "market" && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <div className="relative">
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="pr-16"
                        step="0.01"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500">
                        {selectedPair.name.split("/")[1]}
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Slippage Tolerance</Label>
                    <span className="text-sm text-gray-700">0.5%</span>
                  </div>
                  <Slider defaultValue={[0.5]} max={2} step={0.1} />
                </div>

                <div className="flex items-center justify-between rounded-md bg-gray-50 p-3">
                  <span className="text-sm text-gray-500">Total Value</span>
                  <span className="font-medium text-gray-900">
                    ${totalValue.toFixed(2)} {selectedPair.name.split("/")[1]}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="advanced" />
                  <Label htmlFor="advanced">Advanced Options</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${tradeType === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                >
                  {tradeType === "buy" ? "Buy" : "Sell"} {selectedPair.name.split("/")[0]}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Orderbook */}
            <Card>
              <CardHeader>
                <CardTitle>Orderbook</CardTitle>
                <CardDescription>Market depth and orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 h-[300px]">
                  <OrderbookVisualizer orderbook={orderbook} />
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-500">
                    <div>Price ({selectedPair.name.split("/")[1]})</div>
                    <div className="text-right">Amount ({selectedPair.name.split("/")[0]})</div>
                    <div className="text-right">Total</div>
                  </div>

                  {/* Asks (Sell Orders) */}
                  <div className="space-y-1">
                    {orderbook.asks.map((ask, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-red-600">{ask.price.toFixed(2)}</div>
                        <div className="text-right text-gray-900">{ask.amount.toLocaleString()}</div>
                        <div className="text-right text-gray-500">{(ask.price * ask.amount).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>

                  {/* Current Price */}
                  <div className="grid grid-cols-3 gap-2 rounded-md bg-primary/10 p-2 text-sm font-medium">
                    <div className="text-primary">{selectedPair.price.toFixed(2)}</div>
                    <div className="text-right text-foreground">Current Price</div>
                    <div className="text-right text-foreground">
                      <ArrowDownUp className="ml-auto size-4" />
                    </div>
                  </div>

                  {/* Bids (Buy Orders) */}
                  <div className="space-y-1">
                    {orderbook.bids.map((bid, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-green-600">{bid.price.toFixed(2)}</div>
                        <div className="text-right text-gray-900">{bid.amount.toLocaleString()}</div>
                        <div className="text-right text-gray-500">{(bid.price * bid.amount).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your trading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-10 items-center justify-center rounded-full ${tx.type === "Buy" ? "bg-green-100" : "bg-red-100"}`}
                      >
                        {tx.type === "Buy" ? (
                          <TrendingUp className="size-5 text-green-600" />
                        ) : (
                          <TrendingDown className="size-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {tx.type} {tx.pair}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {tx.time}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          {tx.amount} @ ${tx.price} = ${tx.total}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleViewTransaction(tx)}>
                      <ExternalLink className="mr-1 size-4" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transaction Details Modal */}
      <Dialog open={showTransactionModal} onOpenChange={setShowTransactionModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>Complete information about this transaction</DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm font-medium text-gray-500">Transaction Type</span>
                <span
                  className={`font-medium ${selectedTransaction.type === "Buy" ? "text-green-600" : "text-red-600"}`}
                >
                  {selectedTransaction.type}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Transaction Hash</span>
                  <span className="font-medium text-gray-900">{selectedTransaction.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Asset Pair</span>
                  <span className="font-medium text-gray-900">{selectedTransaction.pair}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Price</span>
                  <span className="font-medium text-gray-900">${selectedTransaction.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Amount</span>
                  <span className="font-medium text-gray-900">
                    {selectedTransaction.amount} {selectedTransaction.pair.split("/")[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Value</span>
                  <span className="font-medium text-gray-900">
                    ${selectedTransaction.total} {selectedTransaction.pair.split("/")[1]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Fee</span>
                  <span className="font-medium text-gray-900">{selectedTransaction.fee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">From</span>
                  <span className="font-medium text-gray-900">{selectedTransaction.from}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">To</span>
                  <span className="font-medium text-gray-900">{selectedTransaction.to}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Block Number</span>
                  <span className="font-medium text-gray-900">{selectedTransaction.blockNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Time</span>
                  <span className="font-medium text-gray-900">{selectedTransaction.time}</span>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 size-4" />
                  View on Explorer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
