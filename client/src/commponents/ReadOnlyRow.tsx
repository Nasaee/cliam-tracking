import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

export type AdditionalProps = {
  index: number;
  dmNumber: string;
  itemCode: string;
  quantity?: number;
  serialNumber: string;
  proformaInv: string;
  rpa: string;
  additionInfo: string;
};

type Props = {
  handleDelete: (id: string) => void;
  handleEditRow: React.Dispatch<React.SetStateAction<string | null>>;
} & AdditionalProps;

const ReadOnlyRow = ({
  index,
  dmNumber,
  itemCode,
  quantity,
  serialNumber,
  proformaInv,
  rpa,
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
      {quantity && <td className='px-4 py-3'>{quantity}</td>}
      <td className='px-4 py-3'>{serialNumber}</td>
      <td className='px-4 py-3'>{proformaInv}</td>
      <td className='px-4 py-3'>{rpa}</td>
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
