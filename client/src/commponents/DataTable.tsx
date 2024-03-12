import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import styled from 'styled-components';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import UpdateApplierDB from './UpdateApplierDB';
import { useState } from 'react';
import { ApplierType } from '../../../server/src/shares/types';

type TableProps = {
  columns: GridColDef[];
  rows: object[];
  category: 'applier' | 'otherProducts';
  handleDeleteItem: (id: string) => void;
  isLoading: boolean;
};

export default function DataTable({
  columns,
  rows,
  category,
  isLoading,
  handleDeleteItem,
}: TableProps) {
  const [dataToEdit, setDataToEdit] = useState<ApplierType | null>(null);

  const handleOpenModal = () => {
    const model = document.getElementById('my_modal_3') as HTMLDialogElement;
    model?.showModal();
  };

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    width: 200,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div className='flex gap-2 text-lg'>
          <button
            type='button'
            disabled={isLoading}
            onClick={() => {
              setDataToEdit(row);
              handleOpenModal();
            }}
          >
            <FaRegEdit className='text-[#51cf66]' />
          </button>

          <button
            type='button'
            disabled={isLoading}
            onClick={() => handleDeleteItem(row._id)}
          >
            <RiDeleteBin5Line className='text-[#fa5252] cursor-pointer' />
          </button>
        </div>
      );
    },
  };
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
      {/* Update Applier Form */}
      {category === 'applier' && dataToEdit && (
        <UpdateApplierDB dataToEdit={dataToEdit} />
      )}
      {/* Update Other Products Form */}
      {category === 'applier' && <div>ohter products</div>}
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
