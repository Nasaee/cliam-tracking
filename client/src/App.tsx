import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
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

function App() {
  const Layout = () => {
    return (
      <>
        <main className='font-inter'>
          <Navbar />
          <div className='flex'>
            <div className='menu-container | p-5 border-r-2 border-[#384256]'>
              <Menu />
            </div>
            <div className='content-container | w-full min-h-screen px-5 pb-5 overflow-hidden'>
              <Outlet />
            </div>
          </div>
          <Footer />
        </main>
        <Toaster />
      </>
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
