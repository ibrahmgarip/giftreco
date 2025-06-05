"use client";

import Header from "@/components/Header";
import { mockUsers } from "@/data/mockData";

export default function Homepage() {
  const currentUser = mockUsers[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSubmitGift={() => console.log("Submit gift")}
        currentUser={currentUser}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            🎁 GiftReco
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Topluluk destekli hediye önerileri
          </p>
          <p className="text-sm text-gray-500">
            Kullanıcı sayısı: {mockUsers.length}
          </p>
        </div>
      </div>
    </div>
  );
}
