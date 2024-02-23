import { TextField } from '@mui/material';
import { ItemData, addApplierItem } from '../store/addApplier/addApplierSlice';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const AddApplierForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemData>();

  const onSubmit = handleSubmit((data: ItemData) => {
    console.log(data);
    dispatch(addApplierItem(data));
    reset({
      dmNumber: data.dmNumber, // Keep dmNumber unchanged
      itemCode: '',
      serialNumber: '',
      proformaInv: '',
      additionInfo: '',
    });
  });
  return (
    <form
      className='add-items | flex flex-col gap-6 w-[300px]   border-r px-5'
      onSubmit={onSubmit}
    >
      <div>
        <label
          htmlFor='itemCode'
          className='block mb-2 text-sm font-medium text-gray-500'
        >
          Dm Number
        </label>
        <input
          type='text'
          id='itemCode'
          autoComplete='off'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 uppercase'
          placeholder='DM...'
          {...register('dmNumber', {
            required: 'This field is required',
            validate: (value) =>
              value.startsWith('DM') || 'DM must start with "DM"',
          })}
          onInput={(e) =>
            (e.currentTarget.value = e.currentTarget.value.toUpperCase())
          }
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
              autoComplete='off'
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
              onInput={(e) =>
                (e.currentTarget.value = e.currentTarget.value.toUpperCase())
              }
            />
            {errors.itemCode && (
              <span className='text-red-500'>{errors.itemCode.message}</span>
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
              onInput={(e) =>
                (e.currentTarget.value = e.currentTarget.value.toUpperCase())
              }
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
              onInput={(e) =>
                (e.currentTarget.value = e.currentTarget.value.toUpperCase())
              }
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
        className='text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'
      >
        Add
      </button>
    </form>
  );
};
export default AddApplierForm;
