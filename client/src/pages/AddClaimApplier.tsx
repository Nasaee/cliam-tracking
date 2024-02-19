import styled from 'styled-components';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ReadOnlyRow from '../commponents/ReadOnlyRow';
import EditableRow from '../commponents/EditableRow';

// !temporary
import mockData from '../mock-data';
import Input from '../commponents/Input';

export interface Items {
  dmNumber: string;
  itemCode: string;
  serialNumber: string;
  proformaInv: string;
  additionInfo: string;
}
const AddClaimApplier = () => {
  // const [items, setItems] = useState<Items[]>([]);
  // !temporary
  const [items, setItems] = useState<Items[]>(mockData);
  const [addFormData, setAddFormData] = useState({
    dmNumber: '',
    itemCode: '',
    serialNumber: '',
    proformaInv: '',
    additionInfo: '',
  });

  const [editFromData, setEditFormData] = useState({
    dmNumber: '',
    itemCode: '',
    serialNumber: '',
    proformaInv: '',
    additionInfo: '',
  });

  const [editItemsId, setEditItemsId] = useState<string | number | null>(null);

  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute('name') as string;
    const fieldValue = e.target.value;
    setAddFormData({ ...addFormData, [fieldName]: fieldValue });
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute('name') as string;
    const fieldValue = e.target.value;
    setEditFormData({ ...editFromData, [fieldName]: fieldValue });
  };

  const handleAddFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !addFormData.dmNumber ||
      !addFormData.itemCode ||
      !addFormData.serialNumber
    )
      return toast.error('DM, Item, Serial Number cannot be empty');
    const newItems = {
      dmNumber: addFormData.dmNumber,
      itemCode: addFormData.itemCode,
      serialNumber: addFormData.serialNumber,
      proformaInv: addFormData.proformaInv,
      additionInfo: addFormData.additionInfo,
    };
    setItems([...items, newItems]);
    setAddFormData({
      dmNumber: '',
      itemCode: '',
      serialNumber: '',
      proformaInv: '',
      additionInfo: '',
    });
  };

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editedItems = {
      dmNumber: editFromData.dmNumber,
      itemCode: editFromData.itemCode,
      serialNumber: editFromData.serialNumber,
      proformaInv: editFromData.proformaInv,
      additionInfo: editFromData.additionInfo,
    };

    const index = items.findIndex((item) => item.serialNumber === editItemsId);

    items[index] = editedItems;
    setEditItemsId(null);
  };

  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: Items
  ) => {
    e.preventDefault();
    if (!row) return;
    setEditItemsId(row.serialNumber);
    setEditFormData({
      dmNumber: row.dmNumber,
      itemCode: row.itemCode,
      serialNumber: row.serialNumber,
      proformaInv: row.proformaInv,
      additionInfo: row.additionInfo,
    });
  };

  const handleCancelClick = () => {
    setEditItemsId(null);
  };

  const handleDeleteClick = (id: string) => {
    const newItems = [...items];
    const index = items.findIndex((item) => item.serialNumber === id);
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className='flex flex-col gap-10 bg-white w-full h-full text-black'>
      <h1>Add Item</h1>
      <form onSubmit={handleAddFormSubmit}>
        <Input
          type='text'
          name='dmNumber'
          value={addFormData.dmNumber}
          onChange={handleAddFormChange}
        />
        <input
          type='text'
          name='dmNumber'
          value={addFormData.dmNumber}
          onChange={handleAddFormChange}
        />
        <input
          type='text'
          name='itemCode'
          value={addFormData.itemCode}
          onChange={handleAddFormChange}
        />
        <input
          type='text'
          name='serialNumber'
          value={addFormData.serialNumber}
          onChange={handleAddFormChange}
        />
        <input
          type='text'
          name='proformaInv'
          value={addFormData.proformaInv}
          onChange={handleAddFormChange}
        />
        <input
          type='text'
          name='additionInfo'
          value={addFormData.additionInfo}
          onChange={handleAddFormChange}
        />
        <button type='submit' className='bg-[#51cf66]'>
          Add
        </button>
      </form>
      <form onSubmit={handleEditFormSubmit}>
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
            {items.map((row) => {
              return (
                <tr key={row.serialNumber}>
                  {editItemsId === row.serialNumber ? (
                    <EditableRow
                      key={row.serialNumber}
                      editFromData={editFromData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      key={row.serialNumber}
                      row={row}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};
export default AddClaimApplier;

// const Wrapper = styled.div`
//   & {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     padding: 1rem;
//     font-size: 12px;
//   }

//   input {
//     border: 1px solid black;
//     width: 200px;
//   }

//   table {
//     border-collapse: collapse;
//     width: 100%;
//   }

//   th,
//   td {
//     border: 1px solid #ffffff;
//     text-align: left;
//     padding: 8px;
//   }

//   th {
//     background-color: rgb(117, 201, 250);
//   }

//   td {
//     background-color: rgb(205, 235, 253);
//   }

//   form {
//     display: flex;
//     gap: 5px;
//   }

//   form td:last-child {
//     display: flex;
//     justify-content: space-evenly;
//   }

//   form * {
//     font-size: 28px;
//   }
// `;
