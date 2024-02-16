interface Props {
  serialNumber: string;
  dmNumber: string;
  itemCode: string;
  proformaInv: string;
  additionInfo: string;
}
const EditableRow = () => {
  return (
    <tr>
      <td>
        <input type='text' name='dmNumber' />
      </td>
      <td>
        <input type='text' name='itemCode' />
      </td>
      <td>
        <input type='text' name='serialNumber' />
      </td>
      <td>
        <input type='text' name='proformaInv' />
      </td>
      <td>
        <input type='text' name='additionInfo' />
      </td>
    </tr>
  );
};
export default EditableRow;
