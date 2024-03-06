import { TextField } from '@mui/material';
import { ApplierType } from '../../../server/src/models/applier/applier.mongo';
import { useForm } from 'react-hook-form';

const UpdateApplierDB = () => {
  // !!!tempo Data
  const dataToEdit: ApplierType = {
    _id: 'd1fa65s4df6asd',
    dmNumber: 'DM62/039',
    itemCode: '544965A',
    serialNumber: '06C1749070-041',
    getDifSerial: '',
    proformaInv: 'IM62/033',
    receiveDocs: 'IM20/011',
    received: true,
    repairable: 'fixed',
    additionInfo: 'ได้คืนแล้วเป็นของใหม่ 1 EA',
    lastEditor: '',
    rpa: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplierType>();

  const onSubmit = handleSubmit((data: ApplierType) => {
    console.log(data);
  });

  return (
    <div>
      <dialog id='my_modal_3' className='modal '>
        <div className='modal-box bg-white text-black'>
          <form method='dialog'>
            {/* close */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>

          <h3 className='font-bold text-lg mb-7'>Update Applier</h3>

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
                  defaultValue={dataToEdit?.proformaInv}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
                  placeholder='Proforma invoice...'
                  autoComplete='off'
                  {...register('proformaInv', {
                    required: 'This field is required',
                    validate: (value) =>
                      value.startsWith('IM') ||
                      'Proforma Inv. must start with "IM"',
                  })}
                  onInput={(e) =>
                    (e.currentTarget.value =
                      e.currentTarget.value.toUpperCase())
                  }
                />
                {errors.proformaInv && (
                  <span className='text-red-500'>
                    {errors.proformaInv.message}
                  </span>
                )}
              </div>
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
                  defaultValue={dataToEdit?.dmNumber}
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
                    defaultValue={dataToEdit?.itemCode}
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
        </div>
      </dialog>
    </div>
  );
};
export default UpdateApplierDB;
