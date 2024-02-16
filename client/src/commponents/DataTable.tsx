import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

type TableProps = {
  columns: GridColDef[];
  rows: object[];
};

const actionColumn: GridColDef = {
  field: 'action',
  headerName: 'Action',
  width: 200,
  sortable: false,
  renderCell: () => {
    // TODO: add action
    return (
      <div className='flex gap-2 text-lg'>
        <Link to={'/'}>
          <FaRegEdit className='text-[#51cf66]' />
        </Link>
        <div className='delete' onClick={() => {}}>
          <RiDeleteBin5Line className='text-[#fa5252] cursor-pointer' />
        </div>
      </div>
    );
  },
};

export default function DataTable({ columns, rows }: TableProps) {
  return (
    <Wrapper>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          className='bg-white p-4'
          rows={rows}
          columns={[...columns, actionColumn]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .MuiBox-root {
    height: 100%;
  }
  .MuiDataGrid-toolbarContainer {
    flex-direction: row-reverse;
  }
`;
