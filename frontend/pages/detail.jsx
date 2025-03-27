import { useRouter } from 'next/router';
import { useQuery, useMutation, gql } from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';

const GET_MOTORCYCLE = gql`
  query GetMotorcycle($id: ID!) {
    getMotorcycle(id: $id) {
      id
      tenLoaiXe
      giaTheoNgay
      soLuong
    }
  }
`;

const DELETE_MOTORCYCLE = gql`
  mutation DeleteMotorcycle($id: ID!) {
    deleteMotorcycle(id: $id) {
      id
    }
  }
`;

const UPDATE_MOTORCYCLE = gql`
  mutation UpdateMotorcycle($id: ID!, $tenLoaiXe: String, $giaTheoNgay: Float, $soLuong: Int) {
    updateMotorcycle(id: $id, tenLoaiXe: $tenLoaiXe, giaTheoNgay: $giaTheoNgay, soLuong: $soLuong) {
      id
      tenLoaiXe
      giaTheoNgay
      soLuong
    }
  }
`;

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_MOTORCYCLE, { variables: { id } });
  const [deleteMotorcycle] = useMutation(DELETE_MOTORCYCLE, { onCompleted: () => router.push('/') });
  const [updateMotorcycle] = useMutation(UPDATE_MOTORCYCLE);
  const [formData, setFormData] = useState({ tenLoaiXe: '', giaTheoNgay: '', soLuong: '' });

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Có lỗi xảy ra!</p>;

  const motorcycle = data.getMotorcycle;

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateMotorcycle({ variables: { id, ...formData, giaTheoNgay: parseFloat(formData.giaTheoNgay), soLuong: parseInt(formData.soLuong) } });
    router.push('/');
  };

  const handleDelete = async () => {
    await deleteMotorcycle({ variables: { id } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chi tiết xe máy</h1>
      <div className="mb-4">
        <p>ID: {motorcycle.id}</p>
        <p>Tên loại xe: {motorcycle.tenLoaiXe}</p>
        <p>Giá theo ngày: {motorcycle.giaTheoNgay.toLocaleString()}</p>
        <p>Số lượng: {motorcycle.soLuong}</p>
      </div>
      <form onSubmit={handleUpdate} className="mb-4">
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
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Cập nhật</button>
      </form>
      <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Xóa xe</button>
      <div className="mt-4">
        <Link href="/"><a className="text-blue-500 hover:underline">Quay lại</a></Link>
      </div>
    </div>
  );
}