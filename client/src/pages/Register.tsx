import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <section className='bg-gray-50'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <p className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white mx-auto'>
          Claim Tracker
        </p>

        <div className='w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Create an account
            </h2>
            <form className='space-y-4 md:space-y-6' action='#'>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Username
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                  placeholder='Your name'
                />
              </div>
              <div>
                <label
                  htmlFor='username'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                  placeholder='name@mail.com'
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                />
              </div>
              <div>
                <label
                  htmlFor='confirm-password'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Confirm password
                </label>
                <input
                  type='confirm-password'
                  name='confirm-password'
                  id='confirm-password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                />
              </div>
              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Create an account
                </button>
              </div>
            </form>
            <p className='mt-10 text-center text-sm text-gray-500'>
              Already have an account?{' '}
              <Link
                to='/login'
                className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500 underline ml-2'
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;
