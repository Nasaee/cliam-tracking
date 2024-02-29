import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import Menu from './commponents/Menu';
import Navbar from './commponents/Navbar';
import Footer from './commponents/Footer';
import Home from './pages/Home';
import Appliers from './pages/Appliers';
import ClaimOtherProducts from './pages/ClaimOtherProducts';
import AdminPermission from './pages/AdminPermission';
import PrivateRoute from './pages/PrivateRoute';
import AddClaimApplier from './pages/AddClaimApplier';
import AddClaimOtherProducts from './pages/AddClaimOtherProducts';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import * as apiClient from './api-client';
import Loading from './pages/Loading';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';
import { setCurrentUser } from './store/user/userSlice';
import PendingApproval from './pages/PendingApproval ';
import { useQuery } from '@tanstack/react-query';

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['validateToken'],
    queryFn: apiClient.validateToken,
    retry: false,
  });

  if (isSuccess && data.user) {
    dispatch(setCurrentUser(data.user));
  }

  const { userId, role } = useSelector((state: RootState) => state.user);

  const Layout = () => {
    if (role === 'pending') {
      return <Navigate to='/pending-approve' replace />;
    }

    if (!userId) {
      return <Navigate to='/login' replace />;
    }
    return (
      <main className='font-inter'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Navbar />
            <div className='flex'>
              <div className='menu-container | hidden md:block p-5 border-r-2 border-[#384256]'>
                <Menu />
              </div>
              <div className='content-container | w-full min-h-screen px-5 pb-5 overflow-hidden'>
                <Outlet />
              </div>
            </div>
            <Footer />
          </>
        )}
      </main>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: '/admin',
          element: (
            // TODO: check passCondition leter
            <PrivateRoute redirectPath='/' passCondition={role === 'admin'}>
              <AdminPermission />
            </PrivateRoute>
          ),
        },
        {
          path: '/claim-hemolok-applier',
          element: <Appliers />,
        },
        {
          path: '/claim-other-products',
          element: <ClaimOtherProducts />,
        },
        {
          path: '/add-appliers',
          element: <AddClaimApplier />,
        },
        {
          path: '/add-other-products',
          element: <AddClaimOtherProducts />,
        },
        {
          path: '*',
          element: <Navigate to='/' />,
        },
      ],
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
      path: '/pending-approve',
      element: (
        <PrivateRoute redirectPath='/' passCondition={role === 'pending'}>
          <PendingApproval />
        </PrivateRoute>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
