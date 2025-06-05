"use client";

import {
  Search,
  Heart,
  User,
  Plus,
  Menu,
  Bell,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface HeaderProps {
  onSubmitGift: () => void;
  currentUser?: {
    id: string;
    username: string;
    avatar?: string;
    points: number;
  };
}

export default function Header({ onSubmitGift, currentUser }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-purple-700">
                🎁 GiftReco
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Hediye ara... (ör. 'anne doğum günü' veya 'teknoloji meraklısı')"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {/* Trending Button */}
            <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Trendler</span>
            </button>

            {/* Submit Gift Button */}
            <button
              onClick={onSubmitGift}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Hediye Öner</span>
            </button>

            {currentUser ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 p-2 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      {currentUser.avatar ? (
                        <Image
                          src={currentUser.avatar}
                          alt={currentUser.username}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {currentUser.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="hidden md:block text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {currentUser.username}
                        </div>
                        <div className="text-xs text-purple-600">
                          {currentUser.points} puan
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {currentUser.username}
                        </p>
                        <p className="text-sm text-purple-600">
                          {currentUser.points} puan
                        </p>
                      </div>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Profilim
                      </a>
                      <a
                        href="/my-gifts"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Hediye Önerilerim
                      </a>
                      <a
                        href="/favorites"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Favorilerim
                      </a>
                      <a
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Ayarlar
                      </a>
                      <hr className="my-1" />
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        Çıkış Yap
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium">
                  Giriş
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Kayıt Ol
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
