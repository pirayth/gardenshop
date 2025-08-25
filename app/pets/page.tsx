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

  const griffinSpecial = {
    name: "Griffin",
    price: "3.5",
    originalPrice: "8",
    discount: Math.round(((8 - 3.5) / 8) * 100),
    image: "/griffin.png",
    rarity: "Mythic",
    saleEnd: new Date(Date.now() + 48 * 60 * 60 * 1000)
  }

  const pets = [
    griffinSpecial,
    { name: "Ascended Pets", price: "15", originalPrice: "25", discount: 40, image: "/ascended.png", rarity: "Mythic" },
    { name: "Raccoon", price: "10", originalPrice: "20", discount: 50, image: "/raccoon.png", rarity: "Epic" },
    { name: "Disco Bee", price: "10", originalPrice: "18", discount: 44, image: "/disco.png", rarity: "Epic" },
    { name: "Fennec Fox", price: "8.5", originalPrice: "17", discount: 50, image: "/fennec.png", rarity: "Rare" },
    { name: "Spino", price: "7", originalPrice: "14", discount: 50, image: "/spino.png", rarity: "Rare" },
    { name: "Butterfly", price: "7", originalPrice: "12", discount: 42, image: "/butterfly.png", rarity: "Rare" },
    { name: "Dragonfly", price: "6", originalPrice: "10", discount: 40, image: "/dragon.png", rarity: "Common" },
    { name: "T-Rex", price: "5", originalPrice: "12", discount: 58, image: "/rex.png", rarity: "Common" },
    { name: "Mimic", price: "5", originalPrice: "8", discount: 38, image: "/mimic.png", rarity: "Common" },
    { name: "Chicken Zombie", price: "5", originalPrice: "9", discount: 44, image: "/chicken.png", rarity: "Common" },
    { name: "Corrupt Kitsune", price: "4", originalPrice: "15", discount: 73, image: "/corrupt.png", rarity: "Common" },
    { name: "French Fry Ferret", price: "3", originalPrice: "6", discount: 50, image: "/ferret.png", rarity: "Common" },
    { name: "Lobster", price: "3", originalPrice: "6", discount: 50, image: "/lobster.png", rarity: "Common" },
    { name: "Golden Goose", price: "4", originalPrice: "7.5", discount: 47, image: "/goose.png", rarity: "Rare" },
  ]

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

          <div className="flex space-x-4 mt-4">
            <span className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold shadow">
              Pets
            </span>
            <Link
              href="/sheckles"
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg shadow"
            >
              Sheckles
            </Link>
          </div>
        </div>
      </header>

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

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPets.map((pet, idx) => (
              <Card
                key={idx}
                className={`relative bg-slate-800/50 border-slate-700/50 transition-all duration-300 group cursor-pointer ${
                  pet.name === "Griffin"
                    ? "border-4 border-yellow-400 shadow-[0_0_30px_rgba(255,223,0,0.8)] animate-pulse"
                    : "hover:border-pink-500/30"
                }`}
              >
                <CardContent className="p-2">
                  <div className="relative">
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      Save {pet.discount}%
                    </div>
                    {pet.name === "Griffin" && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full z-10 animate-pulse">
                        🔥 Limited 48h Sale!
                      </div>
                    )}
                    <img
                      src={pet.image || `https://via.placeholder.com/600x400?text=${encodeURIComponent(pet.name)}`}
                      alt={pet.name}
                      className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-contain rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2">
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
