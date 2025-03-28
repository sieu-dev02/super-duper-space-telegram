import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/router';

const CREATE_MOTORCYCLE = gql`
  mutation CreateMotorcycle($input: MotorcycleInput) {
    createMotorcycle(input: $input) {
      _id
      name
      price
      quantity
      imageUrl
    }
  }
`;

export default function Add() {
  const router = useRouter();
  const [createMotorcycle] = useMutation(CREATE_MOTORCYCLE);
  const [formData, setFormData] = useState({ name: '', price: 0, quantity: 0, imageUrl: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMotorcycle({ variables: { input: formData } });
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Add Motorcycle</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2 mb-2 w-full" />
        <input type="number" placeholder="Price" onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })} className="border p-2 mb-2 w-full" />
        <input type="number" placeholder="Quantity" onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })} className="border p-2 mb-2 w-full" />
        <input type="text" placeholder="Image URL" onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} className="border p-2 mb-2 w-full" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Motorcycle</button>
      </form>
    </div>
  );
}
