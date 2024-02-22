import AddApplierForm from '../commponents/AddApplierForm';
import ShowApplierToAddDbTable from '../commponents/ShowApplierToAddDbTable';

const AddClaimApplier = () => {
  return (
    <section className='bg-white flex flex-col gap-6 text-black py-8'>
      <h1 className='mb-5 tracking-wider uppercase px-7'>Add Claim Applier</h1>
      <div className='flex min-h-screen'>
        <AddApplierForm />
        <div className='flex-1 px-6 shadow-md sm:rounded-lg overflow-auto'>
          <ShowApplierToAddDbTable />
        </div>
      </div>
    </section>
  );
};
export default AddClaimApplier;
