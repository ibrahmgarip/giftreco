import Image from "next/image";
import { Heart, User, CalendarHeart, Briefcase, PartyPopper, Sparkles, Smile, Baby, Users, Brush, Home as HomeIcon, MonitorSmartphone, Bath, Gem, FileText, Star, Box, Hammer, HeartHandshake } from "lucide-react";

const exampleProducts = [
  {
    id: 1,
    title: "El Yapımı Seramik Kupa",
    image: "/products/kupa.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Kişiye Özel Ahşap Fotoğraf Çerçevesi",
    image: "/products/cerceve.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Doğal Taşlı Kolye",
    image: "/products/kolye.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Mini Bitki Teraryumu",
    image: "/products/teraryum.jpg",
    link: "#",
  },
];

const categories = [
  { label: "Anneler Günü", icon: CalendarHeart },
  { label: "Babalar Günü", icon: CalendarHeart },
  { label: "Sevgiliye Hediye", icon: Heart },
  { label: "Yeni İş", icon: Briefcase },
  { label: "Doğum Günü", icon: PartyPopper },
  { label: "Yılbaşı", icon: Sparkles },
  { label: "Kadınlara Özel", icon: Smile },
  { label: "Erkeklere Özel", icon: Users },
  { label: "Çocuklar", icon: Baby },
  { label: "Arkadaşa Hediye", icon: User },
  { label: "Hobiler", icon: Brush },
  { label: "Dekorasyon", icon: HomeIcon },
  { label: "Teknoloji", icon: MonitorSmartphone },
  { label: "Kişisel Bakım", icon: Bath },
  { label: "Takı & Aksesuar", icon: Gem },
  { label: "Ofis Hediyeleri", icon: FileText },
  { label: "Anlamlı Hediyeler", icon: Star },
  { label: "Sürpriz Kutular", icon: Box },
  { label: "El Yapımı", icon: Hammer },
  { label: "Romantik Hediyeler", icon: HeartHandshake },
];

export default function Homepage() {
  return (
    <div className="font-poppins bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Navbar */}
        <nav className="flex items-center justify-between py-4 shadow bg-white">
          {/* Logo */}
          <div className="text-2xl font-bold text-purple-700">GiftReco</div>

          {/* Search bar */}
          <div className="flex-grow max-w-xl mx-6">
            <input
              type="text"
              placeholder="Hediye ara..."
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-purple-700">
              <Heart size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-700">
              <User size={20} />
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="text-center py-16 bg-white">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-800 mb-4">
            Hediye bulmanın en ilham verici yolu
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kullanıcılarımızın önerdiği en yaratıcı hediyelere göz atın ve sevdiklerinizi mutlu edin.
          </p>
        </section>

        {/* Category Grid */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4 bg-purple-100 rounded-lg cursor-pointer hover:bg-purple-200"
            >
              <category.icon size={36} className="text-purple-700 mb-2" />
              <span className="text-sm font-medium text-purple-800 text-center">{category.label}</span>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <main className="py-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Popüler Öneriler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {exampleProducts.map((product) => (
              <a
                key={product.id}
                href={product.link}
                className="group border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white"
              >
                <div className="relative w-full h-60">
                  <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-purple-700">
                    {product.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-6 text-center text-sm text-gray-500">
          <p>© 2025 GiftReco. Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </div>
  );
}
