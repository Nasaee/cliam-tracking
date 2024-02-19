import { Items } from '../pages/AddClaimApplier';

interface Props {
  editFromData: Items;
  handleEditFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancelClick: () => void;
}
const EditableRow = ({
  editFromData,
  handleEditFormChange,
  handleCancelClick,
}: Props) => {
  return (
    <>
      <td>
        <input
          type='text'
          name='dmNumber'
          onChange={handleEditFormChange}
          value={editFromData.dmNumber}
        />
      </td>
      <td>
        <input
          type='text'
          name='itemCode'
          onChange={handleEditFormChange}
          value={editFromData.itemCode}
        />
      </td>
      <td>
        <input
          type='text'
          name='serialNumber'
          onChange={handleEditFormChange}
          value={editFromData.serialNumber}
        />
      </td>
      <td>
        <input
          type='text'
          name='proformaInv'
          onChange={handleEditFormChange}
          value={editFromData.proformaInv}
        />
      </td>
      <td>
        <input
          type='text'
          name='additionInfo'
          onChange={handleEditFormChange}
          value={editFromData.additionInfo}
        />
      </td>
      <td>
        <button type='submit'>Save</button>
        <button type='button' onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </>
  );
};
export default EditableRow;
