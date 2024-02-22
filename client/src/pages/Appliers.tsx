import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../commponents/DataTable';
import { data } from '../data';
import { Link } from 'react-router-dom';

const Appliers = () => {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'No.',
      width: 90,
      valueFormatter(params) {
        // TODO: fix this to sequence number or remove column
        return params.value;
      },
    },
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
      field: 'getDifSerail',
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
      sortable: false,
      type: 'boolean',
    },
    {
      field: 'repairable',
      headerName: 'fixed',
      sortable: false,
      type: 'boolean',
    },
    {
      field: 'additionInfo',
      headerName: 'More Details',
      sortable: false,
    },
  ];
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
      <DataTable columns={columns} rows={[...data].reverse()} />
    </section>
  );
};
export default Appliers;
