import styled from 'styled-components';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ReadOnlyRow from '../commponents/ReadOnlyRow';

// ! temporary
import mockData from '../mock-data';
import EditableRow from '../commponents/EditableRow';

export interface Contact {
  dmNumber: string;
  itemCode: string;
  serialNumber: string;
  proformaInv: string;
  additionInfo: string;
}
const AddClaimApplier = () => {
  // const [contacts, setContacts] = useState<Contact[]>([]);
  // ! temporary (uncomment top)
  const [contacts, setContacts] = useState<Contact[]>(mockData);
  const [addFormData, setAddFormData] = useState({
    dmNumber: '',
    itemCode: '',
    serialNumber: '',
    proformaInv: '',
    additionInfo: '',
  });

  const handleAddItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute('name') as string;
    const fieldValue = e.target.value;
    setAddFormData({ ...addFormData, [fieldName]: fieldValue });
  };

  const handleAddFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !addFormData.dmNumber ||
      !addFormData.itemCode ||
      !addFormData.serialNumber
    )
      return toast.error('DM, Item, Serial Number cannot be empty');
    const newContact = {
      dmNumber: addFormData.dmNumber,
      itemCode: addFormData.itemCode,
      serialNumber: addFormData.serialNumber,
      proformaInv: addFormData.proformaInv,
      additionInfo: addFormData.additionInfo,
    };
    setContacts([...contacts, newContact]);
    setAddFormData({
      dmNumber: '',
      itemCode: '',
      serialNumber: '',
      proformaInv: '',
      additionInfo: '',
    });
  };

  const [editContactId, setEditContactId] = useState<string | number | null>(
    null
  );

  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: Contact
  ) => {
    e.preventDefault();
    if (!row) return;
    setEditContactId(row.serialNumber);
  };

  return (
    <Wrapper className='bg-white w-full h-full text-black'>
      <h1>Add Item</h1>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type='text'
          name='dmNumber'
          value={addFormData.dmNumber}
          onChange={handleAddItem}
        />
        <input
          type='text'
          name='itemCode'
          value={addFormData.itemCode}
          onChange={handleAddItem}
        />
        <input
          type='text'
          name='serialNumber'
          value={addFormData.serialNumber}
          onChange={handleAddItem}
        />
        <input
          type='text'
          name='proformaInv'
          value={addFormData.proformaInv}
          onChange={handleAddItem}
        />
        <input
          type='text'
          name='additionInfo'
          value={addFormData.additionInfo}
          onChange={handleAddItem}
        />
        <button type='submit' className='bg-[#51cf66]'>
          Add
        </button>
      </form>
      <form>
        <table>
          <thead>
            <tr>
              <th>DM</th>
              <th>Item</th>
              <th>Serial Number</th>
              <th>Proforma Invoice</th>
              <th>More Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((row) => {
              return (
                <>
                  {editContactId === row.serialNumber ? (
                    <EditableRow />
                  ) : (
                    <ReadOnlyRow
                      key={row.serialNumber}
                      row={row}
                      handleEditClick={handleEditClick}
                    />
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </form>
    </Wrapper>
  );
};
export default AddClaimApplier;

const Wrapper = styled.div`
  & {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 1rem;
    font-size: 12px;
  }

  input {
    border: 1px solid black;
    width: 200px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    border: 1px solid #ffffff;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: rgb(117, 201, 250);
  }

  td {
    background-color: rgb(205, 235, 253);
  }

  form {
    display: flex;
    gap: 5px;
  }

  form td:last-child {
    display: flex;
    justify-content: space-evenly;
  }

  form * {
    font-size: 28px;
  }
`;
