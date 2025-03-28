import { gql, useQuery } from '@apollo/client';
import MotorcycleCard from '../components/MotorcycleCard';

const GET_MOTORCYCLES = gql`
  query GetMotorcycles {
    getMotorcycles {
      _id
      name
      price
      quantity
      imageUrl
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_MOTORCYCLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Motorcycle List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.getMotorcycles.map(moto => (
          <MotorcycleCard key={moto._id} motorcycle={moto} />
        ))}
      </div>
    </div>
  );
}