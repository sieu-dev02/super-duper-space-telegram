import React from 'react';

export default function MotorcycleCard({ motorcycle }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img src={motorcycle.imageUrl} alt={motorcycle.name} className="w-full h-40 object-cover mb-4" />
      <h2 className="text-xl font-semibold">{motorcycle.name}</h2>
      <p>Price: ${motorcycle.price}</p>
      <p>Quantity: {motorcycle.quantity}</p>
      {/* Bạn có thể thêm link đến trang chi tiết nếu cần */}
    </div>
  );
}
