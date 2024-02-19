import { Items } from '../pages/AddClaimApplier';

interface Props {
  row: Items;
  handleEditClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: Items
  ) => void;
  handleDeleteClick: (id: string) => void;
}
const ReadOnlyRow = ({ row, handleEditClick, handleDeleteClick }: Props) => {
  const { serialNumber, dmNumber, itemCode, proformaInv, additionInfo } = row;
  return (
    <>
      <td>{dmNumber}</td>
      <td>{itemCode}</td>
      <td>{serialNumber}</td>
      <td>{proformaInv}</td>
      <td>{additionInfo}</td>
      <td>
        <button type='button' onClick={(e) => handleEditClick(e, row)}>
          Edit
        </button>
        <button type='button' onClick={() => handleDeleteClick(serialNumber)}>
          Delete
        </button>
      </td>
    </>
  );
};
export default ReadOnlyRow;
