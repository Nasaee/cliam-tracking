import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ZodType, z } from 'zod';
import * as apiClient from '../api-client';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { useMutation, useQueryClient } from 'react-query';
import { MdOutlineContentCopy } from 'react-icons/md';
import { testEmail, testPassword } from '../data';

export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const schema: ZodType<LoginFormData> = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: apiClient.login,
    onSuccess: async () => {
      toast.success('Logged in successfuly');
      reset();
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      reset();
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((formData: LoginFormData) => {
    mutation.mutate(formData);
  });

  if (userId) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='flex flex-col justify-center bg-white min-h-screen px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <div className='flex flex-col items-center'>
        <div className=' text-black mt-10 text-sm font-Lexend space-y-3 bg-gray-300 py-6 px-12 rounded-md'>
          <div className='flex gap-2'>
            <p className='p-1'>Test email:</p>
            <p className='flex gap-3 py-1 pl-4 pr-3 bg-gray-200 border border-slate-300 rounded-md'>
              <span>{testEmail}</span>
              <button
                className='text-gray-500 hover:text-indigo-600'
                onClick={() => {
                  navigator.clipboard.writeText(testEmail);
                  toast.success('Copied to clipboard');
                }}
              >
                <MdOutlineContentCopy />
              </button>
            </p>
          </div>
          <div className='flex gap-2'>
            <p className='p-1'>Password:</p>
            <p className='flex gap-3 py-1 pl-4 pr-3 bg-gray-200 border border-slate-300 rounded-md'>
              <span>{testPassword}</span>
              <button
                className='text-gray-500 hover:text-indigo-600'
                onClick={() => {
                  navigator.clipboard.writeText(testPassword);
                  toast.success('Copied to clipboard');
                }}
              >
                <MdOutlineContentCopy />
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form
          onSubmit={onSubmit}
          className='space-y-6'
          action='#'
          method='POST'
        >
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                type='email'
                id='email'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                placeholder='name@mail.com'
                {...register('email')}
              />
              {errors.email && (
                <span className='text-red-500'>{errors.email.message}</span>
              )}
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
            </div>
            <div className='mt-2'>
              <input
                type='password'
                id='password'
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                {...register('password')}
              />
              {errors.password && (
                <span className='text-red-500'>{errors.password.message}</span>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={mutation.isLoading}
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign in
            </button>
          </div>
        </form>

        <p className='mt-10 text-center text-sm text-gray-500'>
          Not a member?
          <Link
            to='/register'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500 underline ml-2'
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
