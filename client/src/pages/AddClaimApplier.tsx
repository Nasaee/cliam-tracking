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
        <div className='add-items | min-w-[300px] max-w-[400px] border-r px-5'>
          <label className='flex flex-col gap-2'>
            <span className='font-bold text-xs tracking-wider text-gray-500 pl-2'>
              Dm Number
            </span>
            <input
              type='text'
              value={dmNumber}
              className='border border-black rounded-lg px-3 py-2 min-w-[200px] text-sm'
              onChange={handleDmNumberChange}
            />
          </label>
        </div>
        <div className='table'></div>
      </div>
    </section>
  );
};
export default AddClaimApplier;
