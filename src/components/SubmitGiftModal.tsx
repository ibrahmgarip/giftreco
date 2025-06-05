"use client";

import { useState } from "react";
import { X, Upload, Link, Tag, DollarSign } from "lucide-react";
import { categories, occasions, recipients, interests } from "@/data/mockData";
import { SubmitGiftData } from "@/types";

interface SubmitGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubmitGiftData) => void;
}

export default function SubmitGiftModal({
  isOpen,
  onClose,
  onSubmit,
}: SubmitGiftModalProps) {
  const [formData, setFormData] = useState<SubmitGiftData>({
    title: "",
    description: "",
    image: "",
    price: "",
    affiliateLink: "",
    tags: [],
    category: "",
    occasion: [],
    recipient: [],
    interests: [],
  });

  const [currentTag, setCurrentTag] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleInputChange = (field: keyof SubmitGiftData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      handleInputChange("tags", [...formData.tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove),
    );
  };

  const toggleArraySelection = (
    field: "occasion" | "recipient" | "interests",
    value: string,
  ) => {
    const currentArray = formData[field];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    handleInputChange(field, newArray);
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.title.trim()) newErrors.title = "Hediye başlığı gerekli";
      if (!formData.description.trim())
        newErrors.description = "Açıklama gerekli";
      if (!formData.image.trim()) newErrors.image = "Görsel URL gerekli";
      if (!formData.affiliateLink.trim())
        newErrors.affiliateLink = "Satın alma linki gerekli";
    }

    if (stepNumber === 2) {
      if (!formData.category) newErrors.category = "Kategori seçimi gerekli";
      if (formData.occasion.length === 0)
        newErrors.occasion = "En az bir özel gün seçin";
      if (formData.recipient.length === 0)
        newErrors.recipient = "En az bir alıcı türü seçin";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(2)) {
      onSubmit(formData);
      onClose();
      // Reset form
      setFormData({
        title: "",
        description: "",
        image: "",
        price: "",
        affiliateLink: "",
        tags: [],
        category: "",
        occasion: [],
        recipient: [],
        interests: [],
      });
      setStep(1);
      setErrors({});
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Hediye Önerisi Gönder
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div
              className={`flex-1 h-1 mx-4 ${step >= 2 ? "bg-purple-600" : "bg-gray-200"}`}
            ></div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">Hediye Bilgileri</span>
            <span className="text-sm text-gray-600">
              Kategoriler & Etiketler
            </span>
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hediye Başlığı *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="ör. Kişiye Özel El Yapımı Seramik Kupa"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Hediyenizi detaylı bir şekilde tanıtın. Neden özel olduğunu, hangi durumlarda uygun olduğunu açıklayın..."
                  rows={4}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Görsel URL *
                </label>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) =>
                        handleInputChange("image", e.target.value)
                      }
                      placeholder="https://example.com/image.jpg"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        errors.image ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Yükle</span>
                  </button>
                </div>
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                      onError={() => handleInputChange("image", "")}
                    />
                  </div>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fiyat (İsteğe bağlı)
                </label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="₺99"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Affiliate Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Satın Alma Linki *
                </label>
                <div className="flex items-center space-x-2">
                  <Link className="w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={formData.affiliateLink}
                    onChange={(e) =>
                      handleInputChange("affiliateLink", e.target.value)
                    }
                    placeholder="https://example.com/product"
                    className={`flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.affiliateLink
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.affiliateLink && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.affiliateLink}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Etiketler
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                    placeholder="Etiket ekle"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Ekle
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Kategori *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.category === category.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={formData.category === category.id}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                        className="sr-only"
                      />
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              {/* Occasions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Uygun Özel Günler * (Birden fazla seçebilirsiniz)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {occasions.map((occasion) => (
                    <label
                      key={occasion.id}
                      className={`flex items-center space-x-3 p-2 border rounded-lg cursor-pointer transition-colors ${
                        formData.occasion.includes(occasion.id)
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.occasion.includes(occasion.id)}
                        onChange={() =>
                          toggleArraySelection("occasion", occasion.id)
                        }
                        className="sr-only"
                      />
                      <span>{occasion.icon}</span>
                      <span className="text-sm">{occasion.name}</span>
                    </label>
                  ))}
                </div>
                {errors.occasion && (
                  <p className="text-red-500 text-sm mt-1">{errors.occasion}</p>
                )}
              </div>

              {/* Recipients */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Kime Hediye * (Birden fazla seçebilirsiniz)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {recipients.map((recipient) => (
                    <label
                      key={recipient.id}
                      className={`flex items-center space-x-2 p-2 border rounded-lg cursor-pointer transition-colors ${
                        formData.recipient.includes(recipient.id)
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.recipient.includes(recipient.id)}
                        onChange={() =>
                          toggleArraySelection("recipient", recipient.id)
                        }
                        className="sr-only"
                      />
                      <span>{recipient.icon}</span>
                      <span className="text-xs">{recipient.name}</span>
                    </label>
                  ))}
                </div>
                {errors.recipient && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.recipient}
                  </p>
                )}
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  İlgi Alanları (İsteğe bağlı)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {interests.map((interest) => (
                    <label
                      key={interest.id}
                      className={`flex items-center space-x-2 p-2 border rounded-lg cursor-pointer transition-colors ${
                        formData.interests.includes(interest.id)
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest.id)}
                        onChange={() =>
                          toggleArraySelection("interests", interest.id)
                        }
                        className="sr-only"
                      />
                      <span>{interest.icon}</span>
                      <span className="text-sm">{interest.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">Adım {step} / 2</div>
          <div className="flex space-x-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Geri
              </button>
            )}
            {step < 2 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Devam
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Hediye Önerisini Gönder
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
