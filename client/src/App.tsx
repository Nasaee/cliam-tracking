import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Menu from './commponents/Menu';
import Navbar from './commponents/Navbar';
import Footer from './commponents/Footer';
import Home from './pages/Home';
import Appliers from './pages/Appliers';
import User from './pages/User';
import ClaimOtherProducts from './pages/ClaimOtherProducts';
import AdminPermission from './pages/AdminPermission';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  const Layout = () => {
    return (
      <main className='font-inter'>
        <Navbar />
        <div className='container | flex'>
          <div className='menu-container | lg:w-[250px] p-5 border-r-2 border-[#384256]'>
            <Menu />
          </div>
          <div className='content-container | w-full min-h-screen p-5'>
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
          path: '/users/:id',
          element: (
            <PrivateRoute redirectPath='/login' passCondition={true}>
              <User />
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
