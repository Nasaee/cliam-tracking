import { useState } from 'react';
import Input from '../commponents/Input';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';

const AddClaimApplier = () => {
  const defaultItemState = {
    dmNumber: '',
    itemCode: '',
    serialNumber: '',
    proformaInv: '',
    additionInfo: '',
  };
  const [dmNumber, setDmNumber] = useState('');
  const [addFormData, setAddFormData] = useState({ ...defaultItemState });
  const applierToAddDB = useSelector(
    (state: RootState) => state.applierToAddDB
  );

  const handleDmNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    setDmNumber(value);
  };

  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute('name') as string;
    const fieldValue = e.target.value;
    setAddFormData({ ...addFormData, [fieldName]: fieldValue });
  };
  return (
    <section className='bg-white flex flex-col gap-6 text-black py-8'>
      <h1 className='px-8'>Add Claim</h1>
      <div className='grid grid-cols-[1fr_2fr] min-h-screen'>
        <form className='add-items | min-w-[300px] max-w-[400px] border-r px-5'>
          <div>
            <label
              htmlFor='first_name'
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              Dm Number
            </label>
            <input
              type='text'
              name='dmNumber'
              onChange={handleDmNumberChange}
              value={dmNumber}
              id='first_name'
              className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              placeholder='DM...'
              required
            />
          </div>
          <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <div>
              <label
                htmlFor='first_name'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Item Code
              </label>
              <input
                type='text'
                id='itemCode'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                placeholder='John'
                required
              />
            </div>
          </div>
        </form>
        <div className='table'></div>
      </div>
    </section>
  );
};
export default AddClaimApplier;
