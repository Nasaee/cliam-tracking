import { GridColDef } from '@mui/x-data-grid';
import { otherProducts } from '../otherProducts';
import { OtherProductsType } from '../../../server/src/shares/types';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import DataTable from '../commponents/DataTable';

const ClaimOtherProducts = () => {
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
      {/* <DataTable
        columns={columns}
        rows={[...otherProducts].reverse()}
        category='otherProducts'
      /> */}
    </section>
  );
};
export default ClaimOtherProducts;
