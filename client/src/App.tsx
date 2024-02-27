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

function App() {
  const Layout = () => {
    // TODO: check from cookie

    const isLogin = false;

    if (!isLogin) {
      return <Navigate to='/login' replace />;
    }
    return (
      <main className='font-inter'>
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
            <PrivateRoute redirectPath='/' passCondition={true}>
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
      ],
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />;
      <Toaster />
    </>
  );
}

export default App;
