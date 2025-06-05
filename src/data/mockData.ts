import {
  Gift,
  User,
  GiftCategory,
  Occasion,
  RecipientType,
  Interest,
  Badge,
} from "@/types";

export const badges: Badge[] = [
  {
    id: "1",
    name: "Gift Guru",
    description: "50+ helpful gift suggestions",
    icon: "🎁",
    color: "text-yellow-600",
  },
  {
    id: "2",
    name: "Community Helper",
    description: "100+ helpful votes received",
    icon: "🤝",
    color: "text-blue-600",
  },
  {
    id: "3",
    name: "Trendsetter",
    description: "Suggested 5 trending gifts",
    icon: "🔥",
    color: "text-red-600",
  },
  {
    id: "4",
    name: "Early Bird",
    description: "One of the first 1000 users",
    icon: "🐦",
    color: "text-green-600",
  },
];

export const categories: GiftCategory[] = [
  {
    id: "handmade",
    name: "El Yapımı",
    icon: "🔨",
    color: "bg-amber-100 text-amber-800",
  },
  {
    id: "tech",
    name: "Teknoloji",
    icon: "📱",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "home",
    name: "Ev & Dekorasyon",
    icon: "🏠",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "fashion",
    name: "Moda & Aksesuar",
    icon: "👗",
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: "books",
    name: "Kitap & Sanat",
    icon: "📚",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "food",
    name: "Yiyecek & İçecek",
    icon: "🍷",
    color: "bg-red-100 text-red-800",
  },
  {
    id: "beauty",
    name: "Kişisel Bakım",
    icon: "💄",
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: "sports",
    name: "Spor & Outdoor",
    icon: "⚽",
    color: "bg-teal-100 text-teal-800",
  },
];

export const occasions: Occasion[] = [
  { id: "birthday", name: "Doğum Günü", icon: "🎂" },
  { id: "anniversary", name: "Yıldönümü", icon: "💕" },
  { id: "wedding", name: "Düğün", icon: "💍" },
  { id: "graduation", name: "Mezuniyet", icon: "🎓" },
  { id: "mothers-day", name: "Anneler Günü", icon: "🌸" },
  { id: "fathers-day", name: "Babalar Günü", icon: "👔" },
  { id: "valentines", name: "Sevgililer Günü", icon: "❤️" },
  { id: "christmas", name: "Yılbaşı", icon: "🎄" },
  { id: "new-job", name: "Yeni İş", icon: "💼" },
  { id: "housewarming", name: "Yeni Ev", icon: "🏡" },
];

export const recipients: RecipientType[] = [
  { id: "mom", name: "Anne", icon: "👩" },
  { id: "dad", name: "Baba", icon: "👨" },
  { id: "partner", name: "Sevgili/Eş", icon: "💑" },
  { id: "friend", name: "Arkadaş", icon: "👫" },
  { id: "colleague", name: "İş Arkadaşı", icon: "👥" },
  { id: "child", name: "Çocuk", icon: "👶" },
  { id: "teen", name: "Genç", icon: "👦" },
  { id: "grandparent", name: "Büyükanne/Büyükbaba", icon: "👴" },
  { id: "teacher", name: "Öğretmen", icon: "👩‍🏫" },
];

export const interests: Interest[] = [
  { id: "cooking", name: "Yemek Pişirme", icon: "👨‍🍳" },
  { id: "reading", name: "Okuma", icon: "📖" },
  { id: "gaming", name: "Oyun", icon: "🎮" },
  { id: "fitness", name: "Fitness", icon: "💪" },
  { id: "travel", name: "Seyahat", icon: "✈️" },
  { id: "music", name: "Müzik", icon: "🎵" },
  { id: "art", name: "Sanat", icon: "🎨" },
  { id: "gardening", name: "Bahçıvanlık", icon: "🌱" },
  { id: "photography", name: "Fotoğrafçılık", icon: "📸" },
  { id: "diy", name: "Kendin Yap", icon: "🔧" },
];

// Create users without circular references
export const mockUsers: User[] = [
  {
    id: "1",
    username: "aysel_k",
    email: "aysel@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    joinDate: "2024-01-15",
    points: 1250,
    badges: [badges[0], badges[1]],
    submittedGifts: 23,
    helpfulVotes: 145,
  },
  {
    id: "2",
    username: "mehmet_design",
    email: "mehmet@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    joinDate: "2024-02-20",
    points: 890,
    badges: [badges[2]],
    submittedGifts: 15,
    helpfulVotes: 67,
  },
  {
    id: "3",
    username: "zeynep_gifts",
    email: "zeynep@example.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    joinDate: "2024-03-10",
    points: 2100,
    badges: [badges[0], badges[1], badges[2]],
    submittedGifts: 42,
    helpfulVotes: 234,
  },
];

// Create gifts with proper references (no circular dependencies)
export const mockGifts: Gift[] = [
  {
    id: "1",
    title: "Kişiye Özel El Yapımı Seramik Kupa",
    description:
      "Her sabah kahvenizi içerken sevdiklerinizi hatırlatacak, isim yazılı özel seramik kupa. El yapımı ve tamamen doğal malzemelerden üretilmiş.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400",
    price: "₺89",
    affiliateLink: "https://example.com/affiliate/ceramic-mug",
    submittedBy: mockUsers[0],
    submittedDate: "2024-11-15",
    upvotes: 47,
    downvotes: 3,
    comments: [],
    tags: ["kişiye özel", "el yapımı", "seramik", "kahve"],
    category: categories[0],
    occasion: [occasions[0], occasions[4]],
    recipient: [recipients[0], recipients[2]],
    interests: [interests[0]],
    verified: true,
    featured: true,
  },
  {
    id: "2",
    title: "Akıllı Bitki Bakım Sensörü",
    description:
      "Bitki severlere özel! Toprağın nem durumunu, ışık seviyesini ve sıcaklığı ölçerek telefonunuza bildirim gönderen akıllı sensör.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    price: "₺245",
    affiliateLink: "https://example.com/affiliate/plant-sensor",
    submittedBy: mockUsers[1],
    submittedDate: "2024-11-12",
    upvotes: 32,
    downvotes: 1,
    comments: [],
    tags: ["akıllı", "bitki", "teknoloji", "bahçe"],
    category: categories[1],
    occasion: [occasions[8], occasions[9]],
    recipient: [recipients[3], recipients[4]],
    interests: [interests[7], interests[1]],
    verified: true,
    featured: false,
  },
  {
    id: "3",
    title: "Minimal Ahşap Fotoğraf Standı",
    description:
      "Instagram fotoğraflarınızı şık bir şekilde sergilemek için minimalist tasarımlı ahşap stand. Telefonlar ve küçük çerçeveler için ideal.",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
    price: "₺65",
    affiliateLink: "https://example.com/affiliate/photo-stand",
    submittedBy: mockUsers[2],
    submittedDate: "2024-11-10",
    upvotes: 28,
    downvotes: 2,
    comments: [],
    tags: ["ahşap", "minimal", "fotoğraf", "dekorasyon"],
    category: categories[2],
    occasion: [occasions[0], occasions[9]],
    recipient: [recipients[5], recipients[6]],
    interests: [interests[8], interests[6]],
    verified: true,
    featured: false,
  },
];
