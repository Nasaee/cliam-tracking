import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import {
  AddOtherProductsType,
  deleteOtherProductItem,
  editOtherProductItem,
} from '../store/addOtherProducts/addOtherProducts';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ShowOtherProductsToAddDbTable = () => {
  const [rowIdToEdit, setRowIdToEdit] = useState<string | null>(null);
  const dispatch = useDispatch();

  const itemsToAddDB = useSelector(
    (state: RootState) => state.otherProductsToAddDB
  );

  const handleDeleteItem = (id: string) => {
    dispatch(deleteOtherProductItem({ id }));
    toast.success('Remove succeeded');
  };

  const handleSaveEditedData = (formData: AddOtherProductsType) => {
    dispatch(editOtherProductItem(formData));
    setRowIdToEdit(null);
    toast.success('Add item succeeded');
  };

  return (
    <>
      {itemsToAddDB.length > 0 && (
        <div className='flex items-center justify-end mb-2'>
          <button
            className='text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'
            onClick={() => {
              console.log('handle add data to db');
            }}
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
              Qty.
            </th>
            <th scope='col' className='px-4 py-4'>
              Serial
            </th>
            <th scope='col' className='px-4 py-4'>
              Proforma Inv.
            </th>
            <th scope='col' className='px-4 py-4'>
              RPA
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
          {itemsToAddDB.map((item: AddOtherProductsType, index) => {
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
export default ShowOtherProductsToAddDbTable;
