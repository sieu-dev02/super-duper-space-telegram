import Link from 'next/link';

export default function MotorcycleCard({ motorcycle, index }) {
  return (
    <tr className="border-b">
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">
        <Link href={`/detail?id=${motorcycle.id}`}>
          <a className="text-blue-500 hover:underline">{motorcycle.tenLoaiXe}</a>
        </Link>
      </td>
      <td className="px-4 py-2">{motorcycle.giaTheoNgay.toLocaleString()}</td>
      <td className="px-4 py-2">{motorcycle.soLuong}</td>
    </tr>
  );
}