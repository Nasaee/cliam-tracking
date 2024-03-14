import { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { IoIosSave } from 'react-icons/io';
import { AddApplierData } from '../store/addApplier/addApplierSlice';
import { AdditionalProps } from './ReadOnlyRow';

type Props = {
  index: number;
  dataToEdit: AddApplierData & { quantity?: number };
  handleCancel: () => void;
  handleSaveEditedData: (formData: any) => void;
};

const EditableRow = ({
  dataToEdit,
  index,
  handleCancel,
  handleSaveEditedData,
}: Props) => {
  const [editFormData, setEditFormData] = useState<AdditionalProps>(
    dataToEdit as AdditionalProps
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const key = e.target.getAttribute('name') as string;
    const value = e.target.value;
    setEditFormData({ ...editFormData, [key]: value });
  };
  return (
    <>
      <td className='px-4 py-3'>{index + 1}</td>
      <th scope='row' className=' font-medium text-gray-900 whitespace-nowrap'>
        <input
          type='text'
          name='dmNumber'
          value={editFormData.dmNumber}
          onChange={handleInputChange}
          className='px-2 py-1.5 border w-full bg-white'
          autoComplete='off'
        />
      </th>
      <td className='px-2 py-1.5'>
        <input
          type='text'
          name='itemCode'
          value={editFormData.itemCode}
          onChange={handleInputChange}
          className='px-2 py-1.5 border w-full bg-white'
          autoComplete='off'
        />
      </td>
      {editFormData.quantity && (
        <td className='px-2 py-1.5'>
          <input
            type='text'
            name='quantity'
            min={1}
            value={editFormData.quantity}
            onChange={handleInputChange}
            className='px-2 py-1.5 border w-full bg-white'
            autoComplete='off'
          />
        </td>
      )}
      <td className='px-2 py-1.5'>
        <input
          type='text'
          name='serialNumber'
          value={editFormData.serialNumber}
          onChange={handleInputChange}
          className='px-2 py-1.5 border w-full bg-white'
          autoComplete='off'
        />
      </td>
      <td className='px-2 py-1.5'>
        <input
          type='text'
          name='proformaInv'
          value={editFormData.proformaInv}
          onChange={handleInputChange}
          className='px-2 py-1.5 border w-full bg-white'
          autoComplete='off'
        />
      </td>
      <td className='px-2 py-1.5'>
        <input
          type='text'
          name='rpa'
          value={editFormData.rpa}
          onChange={handleInputChange}
          className='px-2 py-1.5 border w-full bg-white'
          autoComplete='off'
        />
      </td>
      <td className='px-2 py-1.5'>
        <input
          type='text'
          name='additionInfo'
          value={editFormData.additionInfo}
          onChange={handleInputChange}
          className='px-2 py-1.5 border w-full bg-white'
          autoComplete='off'
        />
      </td>
      <td className='flex justify-center items-center gap-2 px-4 py-3 w-full'>
        <button
          type='button'
          onClick={() => handleSaveEditedData(editFormData)}
        >
          <IoIosSave className='text-blue-500 text-lg' />
        </button>
        <button type='button'>
          <ImCancelCircle
            className='text-[#fa5252] cursor-pointer'
            onClick={handleCancel}
          />
        </button>
      </td>
    </>
  );
};
export default EditableRow;
