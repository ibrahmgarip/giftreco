"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { categories, occasions, recipients, interests } from "@/data/mockData";
import { FilterOptions } from "@/types";

interface FilterSectionProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  className?: string;
}

export default function FilterSection({
  filters,
  onFiltersChange,
  className = "",
}: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    occasion: false,
    recipient: false,
    interests: false,
    price: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleArrayFilter = (
    key: "category" | "occasion" | "recipient" | "interests",
    value: string,
  ) => {
    const currentArray = filters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];

    updateFilter(key, newArray);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      sortBy: "newest",
    });
  };

  const hasActiveFilters =
    filters.category?.length ||
    filters.occasion?.length ||
    filters.recipient?.length ||
    filters.interests?.length ||
    filters.priceRange;

  const activeFilterCount =
    (filters.category?.length || 0) +
    (filters.occasion?.length || 0) +
    (filters.recipient?.length || 0) +
    (filters.interests?.length || 0) +
    (filters.priceRange ? 1 : 0);

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Filtreler</h3>
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {activeFilterCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Temizle
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden p-1 text-gray-600 hover:text-gray-900"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filter Content */}
      <div className={`${isExpanded ? "block" : "hidden"} lg:block`}>
        {/* Sort Options */}
        <div className="p-4 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sıralama
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter("sortBy", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="newest">En Yeni</option>
            <option value="popular">En Popüler</option>
            <option value="trending">Trend</option>
            <option value="price-low">Fiyat (Düşük)</option>
            <option value="price-high">Fiyat (Yüksek)</option>
          </select>
        </div>

        {/* Categories */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("category")}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <span className="font-medium text-gray-900">Kategoriler</span>
            {expandedSections.category ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {expandedSections.category && (
            <div className="px-4 pb-4 space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.category?.includes(category.id) || false}
                    onChange={() => toggleArrayFilter("category", category.id)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 flex items-center space-x-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Occasions */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("occasion")}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <span className="font-medium text-gray-900">Özel Günler</span>
            {expandedSections.occasion ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {expandedSections.occasion && (
            <div className="px-4 pb-4 space-y-2">
              {occasions.map((occasion) => (
                <label
                  key={occasion.id}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.occasion?.includes(occasion.id) || false}
                    onChange={() => toggleArrayFilter("occasion", occasion.id)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 flex items-center space-x-2">
                    <span>{occasion.icon}</span>
                    <span>{occasion.name}</span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Recipients */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("recipient")}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <span className="font-medium text-gray-900">Kime Hediye</span>
            {expandedSections.recipient ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {expandedSections.recipient && (
            <div className="px-4 pb-4 space-y-2">
              {recipients.map((recipient) => (
                <label
                  key={recipient.id}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.recipient?.includes(recipient.id) || false}
                    onChange={() =>
                      toggleArrayFilter("recipient", recipient.id)
                    }
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 flex items-center space-x-2">
                    <span>{recipient.icon}</span>
                    <span>{recipient.name}</span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Interests */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("interests")}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <span className="font-medium text-gray-900">İlgi Alanları</span>
            {expandedSections.interests ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {expandedSections.interests && (
            <div className="px-4 pb-4 space-y-2">
              {interests.map((interest) => (
                <label
                  key={interest.id}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.interests?.includes(interest.id) || false}
                    onChange={() => toggleArrayFilter("interests", interest.id)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 flex items-center space-x-2">
                    <span>{interest.icon}</span>
                    <span>{interest.name}</span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div>
          <button
            onClick={() => toggleSection("price")}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <span className="font-medium text-gray-900">Fiyat Aralığı</span>
            {expandedSections.price ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {expandedSections.price && (
            <div className="px-4 pb-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Min (₺)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.priceRange?.min || ""}
                    onChange={(e) =>
                      updateFilter("priceRange", {
                        ...filters.priceRange,
                        min: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Max (₺)
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={filters.priceRange?.max || ""}
                    onChange={(e) =>
                      updateFilter("priceRange", {
                        ...filters.priceRange,
                        max: parseInt(e.target.value) || 1000,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "₺0-₺50", min: 0, max: 50 },
                  { label: "₺50-₺100", min: 50, max: 100 },
                  { label: "₺100-₺250", min: 100, max: 250 },
                  { label: "₺250+", min: 250, max: 9999 },
                ].map((range) => (
                  <button
                    key={range.label}
                    onClick={() =>
                      updateFilter("priceRange", {
                        min: range.min,
                        max: range.max,
                      })
                    }
                    className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-purple-50 hover:border-purple-300"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
