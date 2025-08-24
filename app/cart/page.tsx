"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, Minus, X } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  type: "sheckles" | "pet"
  amount?: string // For sheckles packages like "135x Sheckles"
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCryptoModal, setShowCryptoModal] = useState(false)

  const cryptoAddresses: Record<string, string> = {
    LTC: "ltc1q5czcd74d3e0fenj7mp8zs3d8ract478pz25c0d",
    SOL: "ERxdWGfi8WYSHBFyirFSKzreSHYz7NtgC5QH7SoF9xhM",
    "USDT (BEP20)": "0x046d9b1482Ad0910D90983D079ed59833d7f8ceF",
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  useEffect(() => {
    const savedCart = localStorage.getItem("roblox-garden-cart")
    if (savedCart) setCartItems(JSON.parse(savedCart))
  }, [])

  const updateCart = (newItems: CartItem[]) => {
    setCartItems(newItems)
    localStorage.setItem("roblox-garden-cart", JSON.stringify(newItems))
  }

  const removeItem = (id: string) => {
    const newItems = cartItems.filter((item) => item.id !== id)
    updateCart(newItems)
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    const newItems = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    updateCart(newItems)
  }

  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const clearCart = () => updateCart([])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 font-sans">🛒 Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-semibold mb-4 text-white">Your cart is empty</h2>
                <p className="text-gray-400 mb-6">Add some pets or sheckles to get started!</p>
                <div className="space-x-4">
                  <Button asChild className="bg-pink-600 hover:bg-pink-700">
                    <a href="/pets">Browse Pets</a>
                  </Button>
                  <Button asChild className="bg-amber-600 hover:bg-amber-700">
                    <a href="/sheckles">Buy Sheckles</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white">{item.amount ? item.amount : item.name}</h3>
                          <p className="text-gray-400 capitalize">{item.type}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0 border-gray-600 hover:bg-gray-700"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0 border-gray-600 hover:bg-gray-700"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right min-w-[80px]">
                            <div className="text-2xl font-bold text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-gray-400">${item.price.toFixed(2)} each</div>
                            )}
                          </div>

                          {/* Remove Button */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Cart Summary */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Total</h2>
                    <div className="text-3xl font-bold text-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]">
                      ${getTotalPrice().toFixed(2)}
                    </div>
                  </div>

                  {/* Payment Info Button */}
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 text-lg"
                    onClick={() => setShowCryptoModal(true)}
                  >
                    Show Crypto / PayPal Options
                  </Button>

                  {/* Submit Order Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 text-lg"
                    onClick={() => {
                      window.open(
                        "https://docs.google.com/forms/d/e/1FAIpQLSdXUPwM9kvrXpVO8W49jvoqlOfVfhCS6GnY6xspJjWn67xFsA/viewform",
                        "_blank"
                      )
                    }}
                  >
                    Submit Your Order 📝
                  </Button>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="flex-1 border-gray-600 hover:bg-gray-700 bg-transparent text-white"
                    >
                      Clear Cart
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="flex-1 border-gray-600 hover:bg-gray-700 bg-transparent text-white"
                    >
                      <a href="/">Continue Shopping</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Crypto / PayPal Modal */}
          {showCryptoModal && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full space-y-4 relative">
                <Button
                  className="absolute top-2 right-2 p-2 text-white hover:bg-gray-700 rounded-full"
                  onClick={() => setShowCryptoModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <h4 className="text-lg font-semibold text-white">💰 Payment Options</h4>

                {/* Crypto Addresses */}
                {Object.entries(cryptoAddresses).map(([coin, addr]) => (
                  <div key={coin} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                    <span>{coin}</span>
                    <div className="flex space-x-2">
                      <span className="break-all">{addr}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(addr)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                ))}

                {/* PayPal URL */}
                <div className="flex justify-between items-center bg-gray-700 p-2 rounded">
                  <span>PayPal</span>
                  <div className="flex space-x-2">
                    <span className="break-all">https://www.paypal.com/paypalme/pirasales</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard("https://www.paypal.com/paypalme/pirasales")}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
