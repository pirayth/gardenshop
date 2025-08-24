"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, Minus } from "lucide-react"

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

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("roblox-garden-cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
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

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const clearCart = () => {
    updateCart([])
  }

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
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Total</h2>
                    <div className="text-3xl font-bold text-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]">
                      ${getTotalPrice().toFixed(2)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Stripe Checkout Button - Ready for integration */}
                    <div className="space-y-4 text-white">
                      <div className="space-y-6 text-white">
                        {/* Payment Info */}
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">💳 Payment Information</h3>
                          <p>
                            <span className="font-medium">LTC Crypto Address:</span> 
                            <span className="ml-2 break-all text-pink-400">ltc1q5czcd74d3e0fenj7mp8zs3d8ract478pz25c0d</span>
                          </p>
                          <p>
                            <span className="font-medium">PayPal Email:</span> 
                            <span className="ml-2 text-pink-400">pirasalesonline@gmail.com</span>
                          </p>
                          <p>
                            <span className="font-medium">Order Form:</span> Please submit your order using the form below ONLY after completing payment.
                          </p>
                        </div>

                        {/* Submit Button */}
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
                      </div> {/* <-- Fixed missing closing div */}

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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
