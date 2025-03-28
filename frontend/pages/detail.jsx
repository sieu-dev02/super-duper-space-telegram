import { useRouter } from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

const GET_MOTORCYCLE = gql`
  query GetMotorcycle($id: ID!) {
    getMotorcycle(id: $id) {
      _id
      name
      price
      quantity
      imageUrl
    }
  }
`;

const DELETE_MOTORCYCLE = gql`
  mutation DeleteMotorcycle($id: ID!) {
    deleteMotorcycle(id: $id) {
      _id
    }
  }
`;

const UPDATE_MOTORCYCLE = gql`
  mutation UpdateMotorcycle($id: ID!, $input: MotorcycleInput) {
    updateMotorcycle(id: $id, input: $input) {
      _id
      name
      price
      quantity
      imageUrl
    }
  }
`;

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_MOTORCYCLE, { variables: { id } });
  const [deleteMotorcycle] = useMutation(DELETE_MOTORCYCLE);
  const [updateMotorcycle] = useMutation(UPDATE_MOTORCYCLE);
  const [formData, setFormData] = useState({ name: '', price: 0, quantity: 0, imageUrl: '' });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const motorcycle = data.getMotorcycle;

  const handleDelete = async () => {
    await deleteMotorcycle({ variables: { id } });
    router.push('/');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateMotorcycle({ variables: { id, input: formData } });
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Motorcycle Details</h1>
      <img src={motorcycle.imageUrl} alt={motorcycle.name} className="w-full h-60 object-cover mb-4" />
      <h2 className="text-2xl font-semibold">{motorcycle.name}</h2>
      <p>Price: ${motorcycle.price}</p>
      <p>Quantity: {motorcycle.quantity}</p>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Delete</button>
      <form onSubmit={handleUpdate} className="mt-4">
        <h3 className="text-xl font-semibold">Update Motorcycle</h3>
        <input type="text" placeholder="Name" defaultValue={motorcycle.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2 mb-2 w-full" />
        <input type="number" placeholder="Price" defaultValue={motorcycle.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })} className="border p-2 mb-2 w-full" />
        <input type="number" placeholder="Quantity" defaultValue={motorcycle.quantity} onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })} className="border p-2 mb-2 w-full" />
        <input type="text" placeholder="Image URL" defaultValue={motorcycle.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} className="border p-2 mb-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
