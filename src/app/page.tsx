"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  TrendingUp,
  Users,
  Award,
  Search,
  Heart,
  User,
  Plus,
  ChevronUp,
  ChevronDown,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { mockGifts, mockUsers, categories } from "@/data/mockData";

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = mockUsers[0];

  const handleVote = (giftId: string, type: "upvote" | "downvote") => {
    console.log("Vote:", giftId, type);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-purple-700">
              🎁 GiftReco
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Hediye ara..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                <Plus className="h-4 w-4" />
                <span>Hediye Öner</span>
              </button>

              <div className="flex items-center space-x-3">
                <Image
                  src={currentUser.avatar || ""}
                  alt={currentUser.username}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden md:block">
                  <div className="text-sm font-medium">
                    {currentUser.username}
                  </div>
                  <div className="text-xs text-purple-600">
                    {currentUser.points} puan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Topluluktan Gelen
            <br />
            <span className="text-purple-200">En İyi Hediye Fikirleri</span>
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Gerçek kullanıcıların önerdiği, test ettiği ve onayladığı hediyeler.
            Sosyal kanıt ile desteklenen, güvenilir öneriler.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-200">2.4K+</div>
              <div className="text-purple-100">Hediye Önerisi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-200">15K+</div>
              <div className="text-purple-100">Mutlu Kullanıcı</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-200">98%</div>
              <div className="text-purple-100">Memnuniyet Oranı</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <TrendingUp className="w-6 h-6 text-purple-600 mr-3" />
            Popüler Kategoriler
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all group"
              >
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </span>
                <span className="text-xs font-medium text-gray-700 text-center">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gifts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Popüler Öneriler
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGifts.map((gift) => (
              <div
                key={gift.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={gift.image}
                    alt={gift.title}
                    fill
                    className="object-cover"
                  />

                  {gift.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Öne Çıkan
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${gift.category.color}`}
                    >
                      <span className="mr-1">{gift.category.icon}</span>
                      {gift.category.name}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg text-gray-900 leading-tight flex-1 mr-3">
                      {gift.title}
                    </h3>
                    {gift.price && (
                      <span className="text-lg font-bold text-purple-600">
                        {gift.price}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {gift.description.length > 100
                      ? gift.description.substring(0, 100) + "..."
                      : gift.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {gift.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={gift.submittedBy.avatar || ""}
                        alt={gift.submittedBy.username}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {gift.submittedBy.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {gift.submittedBy.points} puan
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleVote(gift.id, "upvote")}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <span className="font-semibold text-sm text-gray-600">
                          {gift.upvotes - gift.downvotes}
                        </span>
                        <button
                          onClick={() => handleVote(gift.id, "downvote")}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </button>
                      </div>

                      <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{gift.comments.length}</span>
                      </button>
                    </div>

                    <a
                      href={gift.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Satın Al</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">
            🎁 GiftReco
          </h3>
          <p className="text-gray-300 mb-4">
            Topluluk destekli hediye öneri platformu
          </p>
          <p className="text-gray-400">
            © 2025 GiftReco. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}
