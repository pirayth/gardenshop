"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, Star, CreditCard } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  type: "sheckles" | "pet"
  amount?: string
}

export default function ShecklesPage() {
  const [cartCount, setCartCount] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState("")

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("roblox-garden-cart")
      if (savedCart) {
        const cartItems: CartItem[] = JSON.parse(savedCart)
        const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
        setCartCount(totalCount)
      }
    }

    updateCartCount()

    window.addEventListener("storage", updateCartCount)
    return () => window.removeEventListener("storage", updateCartCount)
  }, [])

  const shecklePackages = [
    {
      amount: "13Sx Sheckles",
      price: "$2.00",
      discount: "20%",
    },
    {
      amount: "33Sx Sheckles",
      price: "$5.00",
      discount: "33%",
    },
    {
      amount: "67Sx Sheckles",
      price: "$10.00",
      discount: "43%",
    },
    {
      amount: "133Sx Sheckles",
      price: "$20.00",
      discount: "50%",
    },
    {
      amount: "333Sx Sheckles",
      price: "$50.00",
      discount: "55%",
    },
    {
      amount: "667Sx Sheckles",
      price: "$100.00",
      discount: "60%",
    },
    {
      amount: "1.3SP Sheckles",
      price: "$200.00",
      discount: "67%",
    },
  ]

  const addToCart = (pack: { amount: string; price: string }) => {
    const savedCart = localStorage.getItem("roblox-garden-cart")
    const cartItems: CartItem[] = savedCart ? JSON.parse(savedCart) : []

    const newItem: CartItem = {
      id: `sheckles-${pack.amount}`,
      name: `${pack.amount} Sheckles`,
      price: Number.parseFloat(pack.price.replace("$", "")),
      quantity: 1,
      type: "sheckles",
      amount: pack.amount,
    }

    const existingItemIndex = cartItems.findIndex((item) => item.id === newItem.id)
    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += 1
    } else {
      cartItems.push(newItem)
    }

    localStorage.setItem("roblox-garden-cart", JSON.stringify(cartItems))

    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    setCartCount(totalCount)

    setPopupMessage(`${pack.amount} Sheckles added to cart!`)
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {showPopup && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[60] animate-in slide-in-from-right">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4" />
            <span className="font-semibold">{popupMessage}</span>
          </div>
        </div>
      )}

      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-amber-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <ArrowLeft className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 hover:text-amber-300">Back to Shop</span>
            </Link>
            <Link href="/cart">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({cartCount})
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Buy
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">
              {" "}
              Sheckles
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Get premium Sheckles to unlock exclusive items, rare pets, and magical decorations for your garden paradise.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {shecklePackages.slice(0, 4).map((pack, idx) => (
              <Card
                key={idx}
                className="bg-gradient-to-b from-green-700 to-green-800 border-green-600 hover:border-green-500 transition-all duration-300 group cursor-pointer relative"
              >
                <Badge className="absolute -top-2 -left-2 bg-green-500 text-white font-semibold text-xs px-2 py-1">
                  Save {pack.discount}
                </Badge>
                <CardContent className="p-4 text-center">
                  <div className="text-white font-bold text-lg mb-3">SHECKLES</div>
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 border-4 border-yellow-500">
                    <span className="text-yellow-800 font-bold text-2xl">$</span>
                  </div>
                  <div className="bg-amber-600 text-white font-bold text-sm py-1 px-3 rounded mb-3">
                    FOR SALE
                    <div className="text-xs font-normal">GROW A GARDEN ROBLOX</div>
                  </div>
                  <div className="text-white font-bold text-lg mb-2">{pack.amount}</div>
                  <div className="text-pink-400 font-bold text-xl mb-4 drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]">
                    {pack.price}
                  </div>
                  <Button
                    onClick={() => addToCart(pack)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 text-lg"
                  >
                    BUY
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {shecklePackages.slice(4).map((pack, idx) => (
              <Card
                key={idx + 4}
                className="bg-gradient-to-b from-green-700 to-green-800 border-green-600 hover:border-green-500 transition-all duration-300 group cursor-pointer relative"
              >
                <Badge className="absolute -top-2 -left-2 bg-green-500 text-white font-semibold text-xs px-2 py-1">
                  Save {pack.discount}
                </Badge>
                <CardContent className="p-4 text-center">
                  <div className="text-white font-bold text-lg mb-3">SHECKLES</div>
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 border-4 border-yellow-500">
                    <span className="text-yellow-800 font-bold text-2xl">$</span>
                  </div>
                  <div className="bg-amber-600 text-white font-bold text-sm py-1 px-3 rounded mb-3">
                    FOR SALE
                    <div className="text-xs font-normal">GROW A GARDEN ROBLOX</div>
                  </div>
                  <div className="text-white font-bold text-lg mb-2">{pack.amount}</div>
                  <div className="text-pink-400 font-bold text-xl mb-4 drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]">
                    {pack.price}
                  </div>
                  <Button
                    onClick={() => addToCart(pack)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 text-lg"
                  >
                    BUY
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-800/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Why Buy Sheckles?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Exclusive Items</h3>
              <p className="text-slate-400">Access premium pets, rare seeds, and magical decorations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Instant Delivery</h3>
              <p className="text-slate-400">Sheckles are added to your account immediately</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">VIP Status</h3>
              <p className="text-slate-400">Unlock special privileges and early access to new items</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
