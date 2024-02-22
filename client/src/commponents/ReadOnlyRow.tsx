import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { ItemData } from '../store/addApplier/addApplierSlice';

type AdditionalProps = {
  index: number;
  handleDelete: (id: string) => void;
  handleEditRow: React.Dispatch<React.SetStateAction<string | null>>;
};

type Props = ItemData & AdditionalProps;

const ReadOnlyRow = ({
  index,
  dmNumber,
  itemCode,
  serialNumber,
  proformaInv,
  additionInfo,
  handleDelete,
  handleEditRow,
}: Props) => {
  return (
    <>
      <td className='px-4 py-3'>{index + 1}</td>
      <th
        scope='row'
        className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap'
      >
        {dmNumber}
      </th>
      <td className='px-4 py-3'>{itemCode}</td>
      <td className='px-4 py-3'>{serialNumber}</td>
      <td className='px-4 py-3'>{proformaInv}</td>
      <td className='px-4 py-3'>{additionInfo}</td>
      <td className='flex justify-center gap-2 px-4 py-3'>
        <button type='button'>
          <FaRegEdit
            className='text-[#51cf66]'
            onClick={() => handleEditRow(serialNumber)}
          />
        </button>
        <button type='button'>
          <RiDeleteBin5Line
            className='text-[#fa5252] cursor-pointer'
            onClick={() => handleDelete(serialNumber)}
          />
        </button>
      </td>
    </>
  );
};
export default ReadOnlyRow;
