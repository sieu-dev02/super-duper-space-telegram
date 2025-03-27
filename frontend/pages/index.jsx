import { useQuery, gql } from '@apollo/client';

const GET_MOTORCYCLES = gql`
  query GetMotorcycles {
    getMotorcycles {
      id
      tenLoaiXe
      giaTheoNgay
      soLuong
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_MOTORCYCLES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>Danh sách xe máy</h1>
      <ul>
        {data.getMotorcycles.map(motorcycle => (
          <li key={motorcycle.id}>
            {motorcycle.tenLoaiXe} - {motorcycle.giaTheoNgay} - {motorcycle.soLuong}
          </li>
        ))}
      </ul>
    </div>
  );
}
