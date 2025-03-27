import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ADD_MOTORCYCLE = gql`
  mutation AddMotorcycle($tenLoaiXe: String!, $giaTheoNgay: Float!, $soLuong: Int!) {
    addMotorcycle(tenLoaiXe: $tenLoaiXe, giaTheoNgay: $giaTheoNgay, soLuong: $soLuong) {
      id
      tenLoaiXe
      giaTheoNgay
      soLuong
    }
  }
`;

export default function Add() {
  const router = useRouter();
  const [formData, setFormData] = useState({ tenLoaiXe: '', giaTheoNgay: '', soLuong: '' });
  const [addMotorcycle] = useMutation(ADD_MOTORCYCLE, { onCompleted: () => router.push('/') });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMotorcycle({ variables: { 
      tenLoaiXe: formData.tenLoaiXe, 
      giaTheoNgay: parseFloat(formData.giaTheoNgay), 
      soLuong: parseInt(formData.soLuong) 
    }});
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Thêm xe máy mới</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Tên loại xe"
          value={formData.tenLoaiXe}
          onChange={(e) => setFormData({ ...formData, tenLoaiXe: e.target.value })}
          className="border p-2 mb-2 block"
        />
        <input
          type="number"
          placeholder="Giá theo ngày"
          value={formData.giaTheoNgay}
          onChange={(e) => setFormData({ ...formData, giaTheoNgay: e.target.value })}
          className="border p-2 mb-2 block"
        />
        <input
          type="number"
          placeholder="Số lượng"
          value={formData.soLuong}
          onChange={(e) => setFormData({ ...formData, soLuong: e.target.value })}
          className="border p-2 mb-2 block"
        />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Thêm xe</button>
      </form>
      <div>
        <Link href="/"><a className="text-blue-500 hover:underline">Quay lại</a></Link>
      </div>
    </div>
  );
}