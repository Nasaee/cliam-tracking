import { GridColDef } from '@mui/x-data-grid';
import { OtherProductsType } from '../../../server/src/shares/types';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import DataTable from '../commponents/DataTable';
import { useState } from 'react';
import UpdateOtherProductDBForm from '../commponents/UpdateOtherProductDBForm';
import { useMutation, useQuery } from 'react-query';
import * as apiClient from '../api-client';
import toast from 'react-hot-toast';

const ClaimOtherProducts = () => {
  const [dataToEdit, setDataToEdit] = useState<OtherProductsType | null>(null);

  const { data: otherProducts } = useQuery({
    queryKey: ['fetchOtherProducts'],
    queryFn: apiClient.getOtherProducts,
  });

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: apiClient.deleteOtherProductById,
    onSuccess: () => {
      toast.success('Deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'dmNumber',
      headerName: 'DM No.',
    },
    {
      field: 'itemCode',
      headerName: 'Items',
      width: 160,
      sortable: true,
    },
    {
      field: 'quantity',
      headerName: 'Qty.',
      sortable: true,
    },
    {
      field: 'serialNumber',
      headerName: 'Serial',
      width: 150,
      sortable: true,
    },
    {
      field: 'getDifSerial',
      headerName: 'Diff SN.',
      description: 'Received items difference serial number from sendout items',
      sortable: true,
    },
    {
      field: 'proformaInv',
      headerName: 'Proforma Inv.',
      sortable: true,
    },
    {
      field: 'receiveDocs',
      headerName: 'Receive Docs',
      sortable: true,
    },
    {
      field: 'rpa',
      headerName: 'RPA',
      sortable: true,
    },
    {
      field: 'received',
      headerName: 'Received',
      sortable: true,
      renderCell: ({ row }: { row: OtherProductsType }) => {
        const { received } = row;
        let value;
        if (received) {
          value = <IoMdCheckmark className='text-lg text-green-600' />;
        } else {
          value = <RxCross2 className='text-lg text-red-400' />;
        }

        return (
          <div className='flex justify-center items-center mx-auto'>
            {value}
          </div>
        );
      },
    },
    {
      field: 'repairable',
      headerName: 'Repair Status',
      sortable: true,
      renderCell: (params) => {
        const { repairable } = params.row;
        let value = (
          <span className='capitalize text-xs tracking-wide text-gray-500'>
            {`${repairable}...`}
          </span>
        );
        if (repairable === 'fixed') {
          value = <IoMdCheckmark className='text-lg text-green-600' />;
        }
        if (repairable === 'broken') {
          value = <RxCross2 className='text-lg text-red-400' />;
        }

        return (
          <div className='flex justify-center items-center mx-auto'>
            {value}
          </div>
        );
      },
    },
    {
      field: 'additionInfo',
      headerName: 'More Details',
      width: 250,
      sortable: false,
    },
  ];

  const handleOpenModal = () => {
    const model = document.getElementById(
      'otherProductModal'
    ) as HTMLDialogElement;
    model?.showModal();
  };

  const setEditData = (data: OtherProductsType) => {
    setDataToEdit(data);
    handleOpenModal();
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this Item?')) {
      mutate(id);
    }
  };

  return (
    <section>
      <div className='flex gap-4 items-center mb-4'>
        <h1>Appliers</h1>
        <Link
          to='/add-other-products'
          className='bg-white text-black py-1 px-2 text-xs rounded-[8px]'
        >
          Add Items
        </Link>
      </div>
      <div className='mb-3'>
        <span>Total: </span>
        <span>{`(${otherProducts?.length} Items)`}</span>
      </div>
      <DataTable
        columns={columns}
        rows={otherProducts || []}
        isLoading={isDeleting}
        handleDeleteItem={handleDeleteItem}
        setEditData={setEditData}
      />

      {/* Update Other Products Form */}
      {dataToEdit && <UpdateOtherProductDBForm dataToEdit={dataToEdit} />}
    </section>
  );
};
export default ClaimOtherProducts;
