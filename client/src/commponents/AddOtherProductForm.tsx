import { TextField } from '@mui/material';
import { OtherProductsType } from '../../../server/src/shares/types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  AddOtherProductsType,
  addOterProduct,
} from '../store/addOtherProducts/addOtherProducts';

const AddOtherProductForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OtherProductsType>();

  const onSubmit = handleSubmit((item: AddOtherProductsType) => {
    dispatch(addOterProduct(item));
    reset({
      dmNumber: item.dmNumber, // Keep dmNumber unchanged
      itemCode: '',
      quantity: 1,
      serialNumber: '',
      proformaInv: item.proformaInv,
      rpa: item.rpa,
      additionInfo: '',
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className='add-items | flex flex-col gap-6 w-[300px] border-r px-5'
    >
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
          {...register('proformaInv', {
            required: 'This field is required',
          })}
        />
        {errors.proformaInv && (
          <span className='text-red-500'>{errors.proformaInv.message}</span>
        )}
      </div>
      {/* Dm Number */}
      <div>
        <label
          htmlFor='dmNumber'
          className='block mb-2 text-sm font-medium text-gray-500'
        >
          Dm Number
        </label>
        <input
          type='text'
          id='dmNumber'
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
              })}
              onInput={(e) =>
                (e.currentTarget.value = e.currentTarget.value.toUpperCase())
              }
            />
            {errors.itemCode && (
              <span className='text-red-500'>{errors.itemCode.message}</span>
            )}
          </div>
          {/* Quantity */}
          <div>
            <label
              htmlFor='quantity'
              className='block mb-2 text-sm font-medium text-gray-500'
            >
              Quantity
            </label>
            <input
              type='number'
              id='quantity'
              min={1}
              autoComplete='off'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              placeholder='Enter Amount...'
              {...register('quantity', {
                required: 'This field is required',
                validate: (value) =>
                  value > 0 || 'Quantity must be greater than 0',
              })}
            />
            {errors.quantity && (
              <span className='text-red-500'>{errors.quantity.message}</span>
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
              {...register('serialNumber')}
              onInput={(e) =>
                (e.currentTarget.value = e.currentTarget.value.toUpperCase())
              }
            />
            {errors.serialNumber && (
              <span className='text-red-500'>
                {errors.serialNumber.message}
              </span>
            )}
          </div>
        </div>
        {/* RPA */}
        <div>
          <label
            htmlFor='proformaInv'
            className='block mb-2 text-sm font-medium text-gray-500 '
          >
            RPA
          </label>
          <input
            type='text'
            id='proformaInv'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
            placeholder='Proforma invoice...'
            autoComplete='off'
            {...register('rpa')}
            onInput={(e) =>
              (e.currentTarget.value = e.currentTarget.value.toUpperCase())
            }
          />
          {errors.rpa && (
            <span className='text-red-500'>{errors.rpa.message}</span>
          )}
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
      <div className='flex flex-col gap-1'>
        <button
          type='submit'
          className='text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-[2px] focus:outline-none'
        >
          Add
        </button>
        <button
          type='button'
          onClick={() => reset()}
          className='text-white bg-indigo-400 hover:bg-indigo-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none'
        >
          Clear
        </button>
      </div>
    </form>
  );
};
export default AddOtherProductForm;
