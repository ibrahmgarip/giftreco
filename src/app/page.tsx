"use client";

import Header from "@/components/Header";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSubmitGift={() => console.log("Submit gift")} />
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            🎁 GiftReco
          </h1>
          <p className="text-lg text-gray-600">
            Topluluk destekli hediye önerileri
          </p>
        </div>
      </div>
    </div>
  );
}
