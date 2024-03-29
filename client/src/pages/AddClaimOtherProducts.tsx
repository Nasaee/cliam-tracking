import AddOtherProductForm from '../commponents/AddOtherProductForm';
import ShowOtherProductsToAddDbTable from '../commponents/ShowOtherProductsToAddDbTable';

const AddClaimOtherProducts = () => {
  return (
    <section className='bg-white flex flex-col gap-6 text-black py-8'>
      <h1 className='mb-5 tracking-wider uppercase px-7'>
        Add Claim Other Product
      </h1>
      <div className='flex flex-col items-center md:flex-row md:items-start min-h-screen overflow-auto'>
        <AddOtherProductForm />
        <div className='flex-1 px-6 sm:rounded-lg overflow-auto'>
          <ShowOtherProductsToAddDbTable />
        </div>
      </div>
    </section>
  );
};
export default AddClaimOtherProducts;
