import AddOtherProductForm from '../commponents/AddOtherProductForm';

const AddClaimOtherProducts = () => {
  return (
    <section className='bg-white flex flex-col gap-6 text-black py-8'>
      <h1 className='mb-5 tracking-wider uppercase px-7'>
        Add Claim Other Product
      </h1>
      <div className='flex min-h-screen'>
        <AddOtherProductForm />
        <div className='flex-1 px-6 shadow-md sm:rounded-lg overflow-auto'>
          <div>table</div>
        </div>
      </div>
    </section>
  );
};
export default AddClaimOtherProducts;
