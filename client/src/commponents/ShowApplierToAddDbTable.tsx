import { useDispatch } from 'react-redux';
import {
  ItemData,
  deleteApplierItem,
  editApplierItem,
  reset,
} from '../store/addApplier/addApplierSlice';
import { RootState } from '../store/rootReducer';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import * as apiClient from '../api-client';
import { useMutation } from '@tanstack/react-query';
import { ApplierType } from '../../../server/src/models/applier/applier.mongo';

const ShowApplierToAddDbTable = () => {
  const dispatch = useDispatch();

  // const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['addAppliers'],
    mutationFn: apiClient.addAppliersToDB,
    onSuccess: () => {
      toast.success('Add item succeeded');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const itemsToAddDB = useSelector(
    (state: RootState) => state.applierToAddDB as ApplierType[]
  );

  const [rowIdToEdit, setRowIdToEdit] = useState<string | null>(null);

  const handleDeleteItem = (id: string) => {
    dispatch(deleteApplierItem({ id }));
    toast.success('Remove succeeded');
  };

  const handleSaveEditedData = (formData: ItemData) => {
    dispatch(editApplierItem(formData));
    setRowIdToEdit(null);
    toast.success('Add item succeeded');
  };

  const handleUpdateDataToDb = (itemsDataArray: ItemData[]) => {
    console.log(itemsDataArray);
    mutation.mutate(itemsDataArray as ApplierType[]);
    dispatch(reset());
  };

  return (
    <>
      {itemsToAddDB.length > 0 && (
        <div className='flex items-center justify-end mb-2'>
          <button
            className='text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'
            onClick={() => handleUpdateDataToDb(itemsToAddDB)}
          >
            Update Cliam
          </button>
        </div>
      )}
      <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
        <thead className='text-xs text-white uppercase bg-[#2a3447a6]'>
          <tr>
            <th scope='col' className='px-4 py-4'>
              #
            </th>
            <th scope='col' className='px-4 py-4'>
              DM
            </th>
            <th scope='col' className='px-4 py-4'>
              Items
            </th>
            <th scope='col' className='px-4 py-4'>
              Serial
            </th>
            <th scope='col' className='px-4 py-4'>
              Proforma Inv.
            </th>
            <th scope='col' className='px-4 py-4'>
              More Details
            </th>
            <th scope='col' className='px-4 py-4'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {itemsToAddDB.map((item: ApplierType, index) => {
            return (
              <tr
                key={item.serialNumber}
                className=' odd:bg-white even:bg-gray-200 border-b w-full'
              >
                {rowIdToEdit === item.serialNumber ? (
                  <EditableRow
                    dataToEdit={item}
                    index={index}
                    handleCancel={() => setRowIdToEdit(null)}
                    handleSaveEditedData={handleSaveEditedData}
                  />
                ) : (
                  <ReadOnlyRow
                    {...item}
                    index={index}
                    handleDelete={handleDeleteItem}
                    handleEditRow={setRowIdToEdit}
                  />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default ShowApplierToAddDbTable;
