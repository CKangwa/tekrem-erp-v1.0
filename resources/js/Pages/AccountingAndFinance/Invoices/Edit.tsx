import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import useRoute from '@/Hooks/useRoute';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

const EditInvoice = ({ invoice, users }) => {
  const route = useRoute();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounting & Finance', href: '/accounting' },
    { label: 'Invoices', href: '/accounting/invoices' },
    { label: 'Edit Invoice' },
  ];

  const [invoiceData, setInvoiceData] = useState({
    user_id: invoice.user_id || null,
    total_amount: invoice.total_amount || '',
    due_date: invoice.due_date || null,
    status: invoice.status || null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Populate the form with existing invoice data
    setInvoiceData({
      user_id: invoice.user_id || null,
      total_amount: invoice.total_amount || '',
      due_date: invoice.due_date || null,
      status: invoice.status || null,
    });
  }, [invoice]);

  const validateForm = () => {
    const validationErrors = {};
    if (!invoiceData.user_id) 
      validationErrors.user_id = 'User is required.';
    if (!invoiceData.total_amount) 
      validationErrors.total_amount = 'Total amount is required.';
    if (!invoiceData.due_date) 
      validationErrors.due_date = 'Due date is required.';
    if (!invoiceData.status) 
      validationErrors.status = 'Status is required.';
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this invoice?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        setIsSubmitting(true);

        router.put(route('accounting.invoices.update', invoice.id), invoiceData, {
          onSuccess: () => {
            Swal.fire(
              'Updated!',
              'The invoice has been updated successfully.',
              'success'
            ).then(() => {
              router.get(route('invoices.index'));
            });
            setInvoiceData({
              user_id: null,
              total_amount: '',
              due_date: null,
              status: null,
            });
            setErrors({});
          },
          onError: () => {
            Swal.fire(
              'Error',
              'There was an issue updating the invoice.',
              'error'
            );
          },
          onFinish: () => setIsSubmitting(false),
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
    }
  };

  return (
    <AppLayout title="Edit Invoice">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionTitle
          title="Edit Invoice"
          description="Update the details of the invoice below."
        />

        <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="user_id" className="font-semibold mb-2">
                User
              </label>
              <Dropdown
                id="user_id"
                value={invoiceData.user_id}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, user_id: e.value })
                }
                options={users}
                optionLabel="name"
                optionValue="id"
                placeholder="Select a User"
                className="w-full"
              />
              {errors.user_id && (
                <small className="p-error">{errors.user_id}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="total_amount" className="font-semibold mb-2">
                Total Amount
              </label>
              <input
                id="total_amount"
                type="number"
                value={invoiceData.total_amount}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, total_amount: e.target.value })
                }
                placeholder="Enter total amount"
                className="p-inputtext w-full"
              />
              {errors.total_amount && (
                <small className="p-error">{errors.total_amount}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="due_date" className="font-semibold mb-2">
                Due Date
              </label>
              <Calendar
                id="due_date"
                value={invoiceData.due_date}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, due_date: e.value })
                }
                placeholder="Select due date"
                className="w-full"
              />
              {errors.due_date && (
                <small className="p-error">{errors.due_date}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="status" className="font-semibold mb-2">
                Status
              </label>
              <Dropdown
                id="status"
                value={invoiceData.status}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, status: e.value })
                }
                options={[
                  { label: 'Pending', value: 'pending' },
                  { label: 'Paid', value: 'paid' },
                  { label: 'Overdue', value: 'overdue' },
                ]}
                placeholder="Select Status"
                className="w-full"
              />
              {errors.status && (
                <small className="p-error">{errors.status}</small>
              )}
            </div>

            <Button
              label="Update"
              icon="pi pi-check"
              className="p-button-primary mt-4"
              type="submit"
              disabled={isSubmitting}
            />
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default EditInvoice;