import { useForm } from 'react-hook-form';
import { OtherProductsType } from '../../../server/src/shares/types';
import Loading from './Loading';
import { TextField } from '@mui/material';
import { repairStatus } from '../data';
import hasEqualValues from '../utils/compaireObject';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import * as apiClient from '../api-client';
import { useMutation, useQueryClient } from 'react-query';

type Props = {
  dataToEdit: OtherProductsType;
};

const UpdateOtherProductDBForm = ({ dataToEdit }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: 'updateOtherProduct',
    mutationFn: apiClient.updateOtherProductToDb,
    onSuccess: () => {
      toast.success('Update succeeded');
      queryClient.invalidateQueries({
        queryKey: ['fetchOtherProducts'],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OtherProductsType>();

  const onSubmit = handleSubmit((updatedData: OtherProductsType) => {
    const isChanged = !hasEqualValues(dataToEdit, updatedData);
    if (!isChanged) {
      toast.error('No changes made');
    }

    if (window.confirm('Are you sure you want to update this item?')) {
      mutate(updatedData);
    }
  });

  useEffect(() => {
    reset(dataToEdit);
  }, [dataToEdit]);

  return (
    <div>
      <dialog id='otherProductModal' className='modal '>
        <div className='modal-box bg-white text-black'>
          <form method='dialog'>
            {/* close */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>

          <h3 className='font-bold text-lg mb-7'>Update Applier</h3>

          {isLoading ? (
            <div className='w-full h-full bg-white'>
              <Loading />
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className='flex flex-col gap-6'>
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
                    <span className='text-red-500'>
                      {errors.proformaInv.message}
                    </span>
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
                      (e.currentTarget.value =
                        e.currentTarget.value.toUpperCase())
                    }
                  />
                  {errors.dmNumber && (
                    <span className='text-red-500'>
                      {errors.dmNumber.message}
                    </span>
                  )}
                </div>
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
                        (e.currentTarget.value =
                          e.currentTarget.value.toUpperCase())
                      }
                    />
                    {errors.itemCode && (
                      <span className='text-red-500'>
                        {errors.itemCode.message}
                      </span>
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
                      autoComplete='off'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                      placeholder='Enter Amount...'
                      {...register('quantity', {
                        required: 'This field is required',
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
                      defaultValue={dataToEdit?.serialNumber}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
                      placeholder='serial number...'
                      autoComplete='off'
                      {...register('serialNumber', {
                        required: 'This field is required',
                      })}
                      onInput={(e) =>
                        (e.currentTarget.value =
                          e.currentTarget.value.toUpperCase())
                      }
                    />
                    {errors.serialNumber && (
                      <span className='text-red-500'>
                        {errors.serialNumber.message}
                      </span>
                    )}
                  </div>

                  {/* Different Number */}
                  <div>
                    <label
                      htmlFor='getDifSerial'
                      className='block mb-2 text-sm font-medium text-gray-500 '
                    >
                      Get Different Serial
                    </label>
                    <input
                      type='text'
                      id='getDifSerial'
                      defaultValue={dataToEdit?.getDifSerial}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
                      placeholder='serial number...'
                      autoComplete='off'
                      {...register('getDifSerial')}
                      onInput={(e) =>
                        (e.currentTarget.value =
                          e.currentTarget.value.toUpperCase())
                      }
                    />
                    {errors.getDifSerial && (
                      <span className='text-red-500'>
                        {errors.getDifSerial.message}
                      </span>
                    )}
                  </div>

                  {/* Receive Docs */}
                  <div>
                    <label
                      htmlFor='receiveDocs'
                      className='block mb-2 text-sm font-medium text-gray-500 '
                    >
                      Receive Docs
                    </label>
                    <input
                      type='text'
                      id='receiveDocs'
                      defaultValue={dataToEdit?.receiveDocs}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
                      placeholder='serial number...'
                      autoComplete='off'
                      {...register('receiveDocs')}
                      onInput={(e) =>
                        (e.currentTarget.value =
                          e.currentTarget.value.toUpperCase())
                      }
                    />
                    {errors.receiveDocs && (
                      <span className='text-red-500'>
                        {errors.receiveDocs.message}
                      </span>
                    )}
                  </div>
                  {/* Repair status */}
                  <div>
                    <label
                      htmlFor='serialNumber'
                      className='block mb-2 text-sm font-medium text-gray-500 '
                    >
                      RepairStatus
                    </label>

                    <select
                      id='repairable'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
                      {...register('repairable', {
                        validate: (value) => {
                          return (
                            repairStatus.includes(value) ||
                            'repair status must be fixed, broken or pending'
                          );
                        },
                      })}
                    >
                      {repairStatus.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    {errors.repairable && (
                      <span className='text-red-500'>
                        {errors.repairable.message}
                      </span>
                    )}
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
                        (e.currentTarget.value =
                          e.currentTarget.value.toUpperCase())
                      }
                    />
                    {errors.rpa && (
                      <span className='text-red-500'>{errors.rpa.message}</span>
                    )}
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
                    defaultValue={dataToEdit?.additionInfo}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
                    placeholder='Input your comment here...'
                    autoComplete='off'
                    {...register('additionInfo')}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-1 mt-4'>
                <button
                  type='submit'
                  className='text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-[2px] focus:outline-none'
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};
export default UpdateOtherProductDBForm;
