import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { TextField } from '@mui/material';

export type AddItemData = {
  dmNumber: '';
  itemCode:
    | ''
    | '544965'
    | '544965A'
    | '544965AF'
    | '544965D'
    | '544990'
    | '544990A'
    | '544990AF'
    | '544990D'
    | '544995'
    | '544995A'
    | '544995AF'
    | '544995D';
  serialNumber: '';
  proformaInv: '';
  additionInfo: '';
};

const AddClaimApplier = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddItemData>();

  const onSubmit = handleSubmit((data: AddItemData) => {
    console.log(data);
    reset({
      dmNumber: data.dmNumber, // Keep dmNumber unchanged
      itemCode: '',
      serialNumber: '',
      proformaInv: '',
      additionInfo: '',
    });
  });
  return (
    <section className='bg-white flex flex-col gap-6 text-black py-8'>
      <h1 className='mb-5 tracking-wider uppercase px-7'>Add Claim Applier</h1>
      <div className='grid grid-cols-[1fr_2fr] min-h-screen'>
        <form
          className='add-items | flex flex-col gap-6 min-w-[300px] max-w-[400px] border-r px-5'
          onSubmit={onSubmit}
        >
          <div>
            <label
              htmlFor='first_name'
              className='block mb-2 text-sm font-medium text-gray-500 '
            >
              Dm Number
            </label>
            <input
              type='text'
              id='itemCode'
              autoComplete='off'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              placeholder='DM...'
              {...register('dmNumber', {
                required: 'This field is required',
                validate: (value) =>
                  value.startsWith('DM') || 'DM must start with "DM"',
              })}
            />
            {errors.dmNumber && (
              <span className='text-red-500'>{errors.dmNumber.message}</span>
            )}
          </div>

          <div>
            <div className='grid gap-6 mb-6 md:grid-cols-2'>
              {/* Item Code */}
              <div>
                <label
                  htmlFor='itemCode'
                  className='block mb-2 text-sm font-medium text-gray-500'
                >
                  Item Code
                </label>
                <input
                  type='text'
                  id='itemCode'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                  placeholder='Enter item code...'
                  {...register('itemCode', {
                    required: 'This field is required',
                    validate: (value) =>
                      [
                        '',
                        '544965',
                        '544965A',
                        '544965AF',
                        '544965D',
                        '544990',
                        '544990A',
                        '544990AF',
                        '544990D',
                        '544995',
                        '544995A',
                        '544995AF',
                        '544995D',
                      ].includes(value) || 'Invalid item code',
                  })}
                />
                {errors.itemCode && (
                  <span className='text-red-500'>
                    {errors.itemCode.message}
                  </span>
                )}
              </div>
              {/* Serial Number */}
              <div>
                <label
                  htmlFor='serialNumber'
                  className='block mb-2 text-sm font-medium text-gray-500 '
                >
                  Serial
                </label>
                <input
                  type='text'
                  id='serialNumber'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
                  placeholder='serial number...'
                  autoComplete='off'
                  {...register('serialNumber', {
                    required: 'This field is required',
                  })}
                />
              </div>
              {/* Proforma Inv. */}
              <div>
                <label
                  htmlFor='proformaInv'
                  className='block mb-2 text-sm font-medium text-gray-500 '
                >
                  Proforma Inv.
                </label>
                <input
                  type='text'
                  id='proformaInv'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
                  placeholder='Proforma invoice...'
                  autoComplete='off'
                  {...register('proformaInv')}
                />
              </div>
            </div>
            {/* More Details */}
            <div>
              <label
                htmlFor='proformaInv'
                className='block mb-2 text-sm font-medium text-gray-500 '
              >
                More Details
              </label>
              <TextField
                type='text'
                id='additionInfo'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
                placeholder='Input your comment here...'
                autoComplete='off'
                {...register('additionInfo')}
              />
            </div>
          </div>

          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            Add
          </button>
        </form>
        <div className='table'></div>
      </div>
    </section>
  );
};
export default AddClaimApplier;
