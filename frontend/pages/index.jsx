import { gql, useQuery } from '@apollo/client'

const GET_MOTORCYCLES = gql`
  query GetMotorcycles {
    motorcycles {
      id
      name
      price
      quantity
      imageUrl
    }
  }
`

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_MOTORCYCLES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách xe máy</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">STT</th>
              <th className="border px-4 py-2">Hình sản phẩm</th>
              <th className="border px-4 py-2">Tên loại xe</th>
              <th className="border px-4 py-2">Giá theo ngày</th>
              <th className="border px-4 py-2">Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {data.motorcycles.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span className="italic text-gray-400">No Image</span>
                  )}
                </td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">
                  {item.price?.toLocaleString('vi-VN')} đ
                </td>
                <td className="border px-4 py-2 text-center">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
