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
  renderCell: ({ id }) => {
    // TODO: add action pass id to database
    return (
      <div className='flex gap-2 text-lg'>
        {/* // TODO: add action pass id to database to edit */}
        <button
          type='button'
          onClick={() => {
            console.log(id);
          }}
        >
          <FaRegEdit className='text-[#51cf66]' />
        </button>
        {/* // TODO: add action pass id to database to remove item from database */}
        <button
          type='button'
          onClick={() => {
            console.log(id);
          }}
        >
          <RiDeleteBin5Line className='text-[#fa5252] cursor-pointer' />
        </button>
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
          getRowId={(row) => row._id}
          columns={[...columns, actionColumn]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[100]}
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
