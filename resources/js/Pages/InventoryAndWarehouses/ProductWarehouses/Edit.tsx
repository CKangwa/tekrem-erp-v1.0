import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import useRoute from '@/Hooks/useRoute';
import SectionTitle from '@/Components/SectionTitle';
import { Warehouse } from 'lucide-react';

const Edit = ({ productWarehouse, warehouses, products }) => {
  const [formData, setFormData] = useState({
    warehouse_id: productWarehouse.warehouse_id || '',
    product_id: productWarehouse.product_id || '',
    quantity: productWarehouse.quantity || '',
  });

  const route = useRoute();

  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'Inventory Movement', href: '/inventory/product-warehouses' },
    { label: 'Update Product To Warehouse' },
  ];

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    router.put(
      route('inventory.product-warehouses.update', productWarehouse.id),
      formData,
      {
        onSuccess: () => {
          Swal.fire(
            'Updated!',
            'The product warehouse has been updated successfully.',
            'success',
          ).then(() => {
            router.get(route('inventory.product-warehouses.index'));
          });
        },
        onError: error => {
          Swal.fire(
            'Error',
            'There was an issue updating the product to warehouse.',
            'error',
          );
        },
      },
    );
  };

  return (
    <AppLayout title="Add product to warehouse">
      <Breadcrumb items={items} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Update product to warehouse"
          description="Fill out the details to add a new add product to warehouse. Include Add product to warehouse, and assign a manager."
        />
        <div className="p-6 bg-white shadow-md rounded-lg col-span col-span-2">
          <h1 className="text-2xl font-bold mb-4">Update product to warehouse</h1>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label htmlFor="product_id" className="block font-medium mb-2">
                Products
              </label>
              <Dropdown
                id="product_id"
                name="product_id"
                options={products}
                optionLabel="name"
                optionValue="id"
                value={formData.product_id}
                onChange={handleChange}
                className="w-full border-2"
                required
              />
            </div>
            <div>
              <label htmlFor="warehouse_id" className="block font-medium mb-2">
                Warehouses
              </label>
              <Dropdown
                id="warehouse_id"
                name="warehouse_id"
                options={warehouses}
                optionLabel="name"
                optionValue="id"
                value={formData.warehouse_id}
                onChange={handleChange}
                className="w-full border-2"
                required
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block font-medium mb-2">
                Quantity
              </label>
              <InputText
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                label="Add product to warehouse"
                icon="pi pi-check"
                className="p-button-success bg-primary text-white p-2 rounded-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Edit;
