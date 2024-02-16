import { Contact } from '../pages/AddClaimApplier';

interface Props {
  row: Contact;
  handleEditClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: Contact
  ) => void;
}
const ReadOnlyRow = ({ row, handleEditClick }: Props) => {
  const { serialNumber, dmNumber, itemCode, proformaInv, additionInfo } = row;
  return (
    <tr>
      <td>{dmNumber}</td>
      <td>{itemCode}</td>
      <td>{serialNumber}</td>
      <td>{proformaInv}</td>
      <td>{additionInfo}</td>
      <td>
        <button type='button' onClick={(e) => handleEditClick(e, row)}>
          edit
        </button>
      </td>
    </tr>
  );
};
export default ReadOnlyRow;
