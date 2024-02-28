import { useSelector } from 'react-redux';
import Navbar from '../commponents/Navbar';
import { RootState } from '../store/rootReducer';
import { Navigate } from 'react-router-dom';

const PendingApproval = () => {
  const { userId } = useSelector((state: RootState) => state.user);

  if (!userId) {
    return <Navigate to='/' />;
  }
  return (
    <div className='bg-white min-h-screen'>
      <div className='bg-[#2a3447]'>
        <Navbar />
      </div>
      <div className=' h-full'>
        <div>
          className=''
          <img
            src='../../public/pending.svg'
            className='block w-96 h-96 mx-auto'
          />
          <p className='flex flex-col gap-4 text-gray-500 text-center text-2xl font-bold capitalize'>
            <span className='text-2xl'>
              register <span className='text-green-500'>successfully!</span>
            </span>
            <span>Pleas wait for approval of contact admin</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default PendingApproval;
