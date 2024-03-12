import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../commponents/DataTable';
import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';
import Loading from '../commponents/Loading';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ApplierType } from '../../../server/src/shares/types';
import toast from 'react-hot-toast';

const Appliers = () => {
  const { data: applierData = [], isLoading } = useQuery<ApplierType[]>({
    queryKey: ['getAllApplier'],
    queryFn: apiClient.getAllApplier,
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleteLoading } = useMutation({
    mutationFn: apiClient.deleteApplierById,
    mutationKey: ['deleteApplier'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'getAllAppliers',
          'fetchReciveApplierStatus',
          'getAmontsendOutItemByYear',
        ],
      });
      toast.success('applier deleted successfully');
    },

    onError: () => {
      toast.error('applier delete failed');
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
      renderCell: ({ row }: { row: ApplierType }) => {
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
      sortable: false,
    },
  ];

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this applier?')) {
      mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className='w-full h-full bg-white'>
        <Loading />
      </div>
    );
  }

  return (
    <section>
      <div className='flex gap-4 items-center mb-4'>
        <h1>Appliers</h1>
        <Link
          to='/add-appliers'
          className='bg-white text-black py-1 px-2 text-xs rounded-[8px]'
        >
          Add Items
        </Link>
      </div>
      <div className='mb-3'>
        <span>Total: </span>
        <span>{`(${applierData?.length} Items)`}</span>
      </div>

      <DataTable
        columns={columns}
        rows={[...applierData].reverse()}
        category='applier'
        handleDeleteItem={handleDeleteItem}
        isLoading={isDeleteLoading}
      />
    </section>
  );
};
export default Appliers;
