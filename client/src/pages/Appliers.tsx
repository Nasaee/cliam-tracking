import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../commponents/DataTable';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as apiClient from '../api-client';
import Loading from '../commponents/Loading';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

type ApplierCode =
  | '544965'
  | '544965A'
  | '544965AF'
  | '544965D'
  | '544990'
  | '544990A'
  | '544990AF'
  | '544990D'
  | '544995'
  | '544995A'
  | '544995AF'
  | '544995D';

type ApplierData = {
  _id: string;
  dmNumber: string;
  itemCode: ApplierCode;
  serialNumber: string;
  getDifSerial: string;
  proformaInv: string;
  receiveDocs: string;
  repairable: string;
  received: true;
  additionInfo: string;
  lastEditor: string;
  rpa: string;
};

const Appliers = () => {
  const { data: applierData = [], isLoading } = useQuery<ApplierData[]>({
    queryKey: ['getAllApplier'],
    queryFn: apiClient.getAllApplier,
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
      renderCell: ({ row }: { row: ApplierData }) => {
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
        {/* // TODO: Add path to add page */}
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

      <DataTable columns={columns} rows={[...applierData].reverse()} />
    </section>
  );
};
export default Appliers;
