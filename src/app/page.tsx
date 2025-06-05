"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Sparkles,
  TrendingUp,
  Users,
  Award,
  Filter as FilterIcon,
  Grid3X3,
  List,
  Gift as GiftIcon,
} from "lucide-react";
import Header from "@/components/Header";
import GiftCard from "@/components/GiftCard";
import FilterSection from "@/components/FilterSection";
import SubmitGiftModal from "@/components/SubmitGiftModal";
import { mockGifts, mockUsers, categories, occasions } from "@/data/mockData";
import { Gift, FilterOptions, SubmitGiftData, VoteAction } from "@/types";

export default function Homepage() {
  const [gifts, setGifts] = useState<Gift[]>(mockGifts);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "newest",
  });

  // Mock current user (in real app, this would come from auth context)
  const currentUser = mockUsers[0];

  // Filter and sort gifts
  const filteredGifts = useMemo(() => {
    let filtered = [...gifts];

    // Apply category filter
    if (filters.category?.length) {
      filtered = filtered.filter((gift) =>
        filters.category!.includes(gift.category.id),
      );
    }

    // Apply occasion filter
    if (filters.occasion?.length) {
      filtered = filtered.filter((gift) =>
        gift.occasion.some((occ) => filters.occasion!.includes(occ.id)),
      );
    }

    // Apply recipient filter
    if (filters.recipient?.length) {
      filtered = filtered.filter((gift) =>
        gift.recipient.some((rec) => filters.recipient!.includes(rec.id)),
      );
    }

    // Apply interests filter
    if (filters.interests?.length) {
      filtered = filtered.filter((gift) =>
        gift.interests.some((int) => filters.interests!.includes(int.id)),
      );
    }

    // Apply price filter
    if (filters.priceRange) {
      filtered = filtered.filter((gift) => {
        if (!gift.price) return true; // Include gifts without price
        const price = parseInt(gift.price.replace("₺", ""));
        return (
          price >= (filters.priceRange!.min || 0) &&
          price <= (filters.priceRange!.max || 9999)
        );
      });
    }

    // Sort gifts
    switch (filters.sortBy) {
      case "popular":
        filtered.sort(
          (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes),
        );
        break;
      case "trending":
        // Simple trending algorithm based on recent votes and engagement
        filtered.sort((a, b) => {
          const aScore = a.upvotes - a.downvotes + a.comments.length * 2;
          const bScore = b.upvotes - b.downvotes + b.comments.length * 2;
          return bScore - aScore;
        });
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.submittedDate).getTime() -
            new Date(a.submittedDate).getTime(),
        );
        break;
      case "price-low":
        filtered.sort((a, b) => {
          const aPrice = a.price ? parseInt(a.price.replace("₺", "")) : 0;
          const bPrice = b.price ? parseInt(b.price.replace("₺", "")) : 0;
          return aPrice - bPrice;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const aPrice = a.price ? parseInt(a.price.replace("₺", "")) : 0;
          const bPrice = b.price ? parseInt(b.price.replace("₺", "")) : 0;
          return bPrice - aPrice;
        });
        break;
    }

    return filtered;
  }, [gifts, filters]);

  const handleVote = (giftId: string, type: "upvote" | "downvote") => {
    setGifts((prevGifts) =>
      prevGifts.map((gift) => {
        if (gift.id === giftId) {
          // In a real app, you'd send this to your backend
          return {
            ...gift,
            upvotes: type === "upvote" ? gift.upvotes + 1 : gift.upvotes,
            downvotes:
              type === "downvote" ? gift.downvotes + 1 : gift.downvotes,
          };
        }
        return gift;
      }),
    );
  };

  const handleComment = (giftId: string) => {
    // In a real app, this would open a comment modal or navigate to gift detail page
    console.log("Comment on gift:", giftId);
  };

  const handleSubmitGift = (data: SubmitGiftData) => {
    // In a real app, this would be sent to your backend
    const newGift: Gift = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      image: data.image,
      price: data.price,
      affiliateLink: data.affiliateLink,
      submittedBy: currentUser,
      submittedDate: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      comments: [],
      tags: data.tags,
      category: categories.find((c) => c.id === data.category)!,
      occasion: occasions.filter((o) => data.occasion.includes(o.id)),
      recipient: [], // Would be populated from data
      interests: [], // Would be populated from data
      verified: false,
      featured: false,
    };

    setGifts((prev) => [newGift, ...prev]);
  };

  const featuredGifts = gifts.filter((gift) => gift.featured).slice(0, 3);
  const trendingCategories = categories.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSubmitGift={() => setShowSubmitModal(true)}
        currentUser={currentUser}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Topluluktan Gelen
              <br />
              <span className="text-purple-200">En İyi Hediye Fikirleri</span>
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Gerçek kullanıcıların önerdiği, test ettiği ve onayladığı
              hediyeler. Sosyal kanıt ile desteklenen, güvenilir öneriler.
            </p>

            {/* Stats */}
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
        </div>
      </section>

      {/* Featured Gifts */}
      {featuredGifts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Öne Çıkan Hediyeler
                </h2>
              </div>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Tümünü Gör
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredGifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onVote={handleVote}
                  onComment={handleComment}
                  currentUserId={currentUser.id}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Popüler Kategoriler
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {trendingCategories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    category: [category.id],
                  }))
                }
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <FilterSection
                filters={filters}
                onFiltersChange={setFilters}
                className={showFilters ? "block" : "hidden lg:block"}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Tüm Hediyeler ({filteredGifts.length})
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg"
                >
                  <FilterIcon className="w-4 h-4" />
                  <span>Filtreler</span>
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-purple-100 text-purple-600" : "text-gray-600"}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-purple-100 text-purple-600" : "text-gray-600"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Gifts Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {filteredGifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onVote={handleVote}
                  onComment={handleComment}
                  currentUserId={currentUser.id}
                />
              ))}
            </div>

            {filteredGifts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Gift className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aradığınız kriterlerde hediye bulunamadı
                </h3>
                <p className="text-gray-600 mb-4">
                  Filtreleri değiştirin veya yeni bir hediye önerisi gönderin.
                </p>
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  İlk Hediye Önerisini Siz Gönderin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Community Stats Section */}
      <section className="bg-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Topluluk Gücü ile Büyüyoruz
            </h2>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto">
              Her gün yeni hediye fikirleri keşfedin, kendi önerilerinizi
              paylaşın ve puanlar kazanarak topluluğun en aktif üyesi olun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">15,000+</div>
              <div className="text-purple-100">Aktif Üye</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">2,400+</div>
              <div className="text-purple-100">Hediye Önerisi</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">45,000+</div>
              <div className="text-purple-100">Oy Verildi</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-purple-100">Memnuniyet</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">
                🎁 GiftReco
              </h3>
              <p className="text-gray-300 mb-4">
                Topluluk destekli hediye öneri platformu. Gerçek kullanıcıların
                deneyimleriyle en iyi hediye fikirlerini keşfedin.
              </p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white">
                  Twitter
                </button>
                <button className="text-gray-400 hover:text-white">
                  Instagram
                </button>
                <button className="text-gray-400 hover:text-white">
                  Facebook
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Keşfet</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <button className="hover:text-white">
                    Popüler Hediyeler
                  </button>
                </li>
                <li>
                  <button className="hover:text-white">Yeni Eklenenler</button>
                </li>
                <li>
                  <button className="hover:text-white">Kategoriler</button>
                </li>
                <li>
                  <button className="hover:text-white">Trendler</button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Topluluk</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <button className="hover:text-white">Hediye Öner</button>
                </li>
                <li>
                  <button className="hover:text-white">Puanlama Sistemi</button>
                </li>
                <li>
                  <button className="hover:text-white">Rozetler</button>
                </li>
                <li>
                  <button className="hover:text-white">Sıkça Sorulanlar</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 GiftReco. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* Submit Gift Modal */}
      <SubmitGiftModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onSubmit={handleSubmitGift}
      />
    </div>
  );
}
