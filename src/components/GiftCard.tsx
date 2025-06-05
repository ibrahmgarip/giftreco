"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Share2,
  ExternalLink,
  Verified,
  Star,
  Heart,
  Calendar,
  User as UserIcon,
} from "lucide-react";
import { Gift } from "@/types";

interface GiftCardProps {
  gift: Gift;
  onVote: (giftId: string, type: "upvote" | "downvote") => void;
  onComment: (giftId: string) => void;
  userVote?: "upvote" | "downvote" | null;
  currentUserId?: string;
}

export default function GiftCard({
  gift,
  onVote,
  onComment,
  userVote,
  currentUserId,
}: GiftCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const totalVotes = gift.upvotes - gift.downvotes;
  const truncatedDescription =
    gift.description.length > 150
      ? gift.description.substring(0, 150) + "..."
      : gift.description;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: gift.title,
          text: gift.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "dün";
    if (diffDays < 7) return `${diffDays} gün önce`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} hafta önce`;
    return `${Math.ceil(diffDays / 30)} ay önce`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group">
      {/* Gift Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={gift.image}
          alt={gift.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {gift.featured && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <Star className="w-3 h-3 mr-1" />
              Öne Çıkan
            </span>
          )}
          {gift.verified && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <Verified className="w-3 h-3 mr-1" />
              Doğrulanmış
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${gift.category.color}`}
          >
            <span className="mr-1">{gift.category.icon}</span>
            {gift.category.name}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </button>
      </div>

      {/* Gift Content */}
      <div className="p-6">
        {/* Title and Price */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-gray-900 leading-tight flex-1 mr-3">
            {gift.title}
          </h3>
          {gift.price && (
            <span className="text-lg font-bold text-purple-600 flex-shrink-0">
              {gift.price}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {showFullDescription ? gift.description : truncatedDescription}
          {gift.description.length > 150 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-purple-600 hover:text-purple-700 ml-1 font-medium"
            >
              {showFullDescription ? "daha az" : "devamı"}
            </button>
          )}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {gift.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
          {gift.tags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{gift.tags.length - 3} daha
            </span>
          )}
        </div>

        {/* Occasions and Recipients */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center flex-wrap gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-600 mr-2">Uygun:</span>
            {gift.occasion.slice(0, 2).map((occasion, index) => (
              <span key={occasion.id} className="text-xs text-purple-600">
                {occasion.icon} {occasion.name}
                {index < Math.min(gift.occasion.length, 2) - 1 && ", "}
              </span>
            ))}
            {gift.occasion.length > 2 && (
              <span className="text-xs text-gray-500">
                +{gift.occasion.length - 2}
              </span>
            )}
          </div>

          <div className="flex items-center flex-wrap gap-1">
            <UserIcon className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-600 mr-2">Kime:</span>
            {gift.recipient.slice(0, 2).map((recipient, index) => (
              <span key={recipient.id} className="text-xs text-purple-600">
                {recipient.icon} {recipient.name}
                {index < Math.min(gift.recipient.length, 2) - 1 && ", "}
              </span>
            ))}
            {gift.recipient.length > 2 && (
              <span className="text-xs text-gray-500">
                +{gift.recipient.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Submitter Info */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            {gift.submittedBy.avatar ? (
              <Image
                src={gift.submittedBy.avatar}
                alt={gift.submittedBy.username}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {gift.submittedBy.username.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {gift.submittedBy.username}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(gift.submittedDate)} • {gift.submittedBy.points}{" "}
                puan
              </p>
            </div>
          </div>
          {gift.submittedBy.badges.length > 0 && (
            <div className="flex space-x-1">
              {gift.submittedBy.badges.slice(0, 2).map((badge) => (
                <span
                  key={badge.id}
                  className="text-sm"
                  title={badge.description}
                >
                  {badge.icon}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          {/* Voting */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onVote(gift.id, "upvote")}
                className={`p-2 rounded-lg transition-colors ${
                  userVote === "upvote"
                    ? "bg-green-100 text-green-600"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <span
                className={`font-semibold text-sm min-w-[2rem] text-center ${
                  totalVotes > 0
                    ? "text-green-600"
                    : totalVotes < 0
                      ? "text-red-600"
                      : "text-gray-600"
                }`}
              >
                {totalVotes}
              </span>
              <button
                onClick={() => onVote(gift.id, "downvote")}
                className={`p-2 rounded-lg transition-colors ${
                  userVote === "downvote"
                    ? "bg-red-100 text-red-600"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Comments */}
            <button
              onClick={() => onComment(gift.id)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{gift.comments.length}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Buy Button */}
          <a
            href={gift.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Satın Al</span>
          </a>
        </div>
      </div>
    </div>
  );
}
