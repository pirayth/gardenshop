"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Heart, ArrowLeft, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"

export default function PetsPage() {
  const [cartCount, setCartCount] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [popupPetName, setPopupPetName] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"low" | "high" | "">("")

  useEffect(() => {
    const savedCart = localStorage.getItem("roblox-garden-cart")
    if (savedCart) {
      const cart = JSON.parse(savedCart)
      setCartCount(cart.length)
    }
  }, [])

  const addToCart = (pet: any) => {
    const cartItem = {
      id: `pet-${pet.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: pet.name,
      price: Number.parseFloat(pet.price),
      quantity: 1,
      type: "pet" as const,
      image: pet.image,
    }

    const existingCart = JSON.parse(localStorage.getItem("roblox-garden-cart") || "[]")
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === cartItem.id)

    let updatedCart
    if (existingItemIndex >= 0) {
      updatedCart = existingCart.map((item: any, index: number) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item,
      )
    } else {
      updatedCart = [...existingCart, cartItem]
    }

    localStorage.setItem("roblox-garden-cart", JSON.stringify(updatedCart))
    setCartCount(updatedCart.reduce((total: number, item: any) => total + item.quantity, 0))

    setPopupPetName(pet.name)
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 3000)
  }

  const pets = [
    { name: "Ascended Pets", price: "15", originalPrice: "25", discount: 40, rating: 5.0, image: "https://s2.ezgif.com/tmp/ezgif-2e68a20baa5e80.png", rarity: "Mythic" },
    { name: "Raccoon", price: "10", originalPrice: "20", discount: 50, rating: 4.8, image: "https://s2.ezgif.com/tmp/ezgif-2a182d723f4e6f.png", rarity: "Epic" },
    { name: "Disco Bee", price: "10", originalPrice: "18", discount: 44, rating: 4.7, image: "https://s2.ezgif.com/tmp/ezgif-296960daba605d.png", rarity: "Epic" },
    { name: "Fennec Fox", price: "8.5", originalPrice: "17", discount: 50, rating: 4.6, image: "https://s2.ezgif.com/tmp/ezgif-2407dda9a4c8d4.png", rarity: "Rare" },
    { name: "Spino", price: "7", originalPrice: "14", discount: 50, rating: 4.5, image: "https://s2.ezgif.com/tmp/ezgif-2d95e54d8c489c.png", rarity: "Rare" },
    { name: "Butterfly", price: "7", originalPrice: "12", discount: 42, rating: 4.4, image: "https://s2.ezgif.com/tmp/ezgif-2a7186d612a5f3.png", rarity: "Rare" },
    { name: "Dragonfly", price: "6", originalPrice: "10", discount: 40, rating: 4.3, image: "https://s2.ezgif.com/tmp/ezgif-21a673b4645c7b.png", rarity: "Common" },
    { name: "T-Rex", price: "5", originalPrice: "12", discount: 58, rating: 4.2, image: "https://s2.ezgif.com/tmp/ezgif-27dc7dc4d88517.png", rarity: "Common" },
    { name: "Mimic", price: "5", originalPrice: "8", discount: 38, rating: 4.1, image: "https://s2.ezgif.com/tmp/ezgif-2e5b0c69415b60.png", rarity: "Common" },
    { name: "Chicken Zombie", price: "5", originalPrice: "9", discount: 44, rating: 3.9, image: "https://s2.ezgif.com/tmp/ezgif-2f5d4f7b671652.png", rarity: "Common" },
    { name: "Corrupt Kitsune", price: "4", originalPrice: "15", discount: 73, rating: 3.8, image: "https://s2.ezgif.com/tmp/ezgif-2c7900e5f909f4.png", rarity: "Common" },
    { name: "French Fry Ferret", price: "3", originalPrice: "6", discount: 50, rating: 4.0, image: "https://s2.ezgif.com/tmp/ezgif-2576397e724f46.png", rarity: "Common" },
    { name: "Lobster", price: "3", originalPrice: "6", discount: 50, rating: 4.0, image: "https://s2.ezgif.com/tmp/ezgif-2b429bbd5e8dcb.png", rarity: "Common" },
    { name: "Golden Goose", price: "4", originalPrice: "7.5", discount: 47, rating: 4.5, image: "https://s2.ezgif.com/tmp/ezgif-239b68f8744ba5.png", rarity: "Rare" },
  ]

  // 🔎 Search + Sort logic
  const filteredPets = useMemo(() => {
    let result = pets.filter((pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortOrder === "low") {
      result = result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    } else if (sortOrder === "high") {
      result = result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    }

    return result
  }, [searchTerm, sortOrder, pets])

  const getNeonPriceColor = (rarity: string) => {
    return "text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {showPopup && (
        <div className="fixed top-20 right-4 z-[60] bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-in slide-in-from-right">
          <Heart className="w-5 h-5" />
          <span className="font-semibold">{popupPetName} added to cart!</span>
          <button onClick={() => setShowPopup(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-amber-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <ArrowLeft className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 hover:text-amber-300">Back to Shop</span>
            </Link>
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
              <Link href="/cart">
                <ShoppingCart className="w-4 h-4 mr-2" /> Cart ({cartCount})
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* 🔎 Search + Sort Controls */}
      <section className="container mx-auto px-4 mt-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search pets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "low" | "high" | "")}
          className="px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">Sort by</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </section>

      {/* Pet Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet, idx) => (
              <Card
                key={idx}
                className="bg-slate-800/50 border-slate-700/50 hover:border-pink-500/30 transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      Save {pet.discount}%
                    </div>
                    <img
                      src={pet.image || `https://via.placeholder.com/600x400?text=${encodeURIComponent(pet.name)}`}
                      alt={pet.name}
                      className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white mb-2 group-hover:text-pink-400 transition-colors font-sans text-lg">
                      {pet.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className={`${getNeonPriceColor(pet.rarity)}`}>${pet.price}</span>
                        <span className="text-sm text-gray-500 line-through">${pet.originalPrice}</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold"
                        onClick={() => addToCart(pet)}
                      >
                        Adopt Pet
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
