const Footer = () => {
  return (
    <footer className='footer footer-center p-5 pb-8'>
      <aside>
        <img src='/im-logo.png' alt='company logo' className='h-16 mb-3' />
        <p className='font-bold tracking-wider'>
          Inter Medical Ltd. <br />
          We are the exclusive distributor importing and distributing medical
          products since 1977
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        <p className='mt-8 text-xs text-gray-400 tracking-widest'>
          {'<Designed & Developed by Nasaee Madadam />'}
        </p>
      </aside>
    </footer>
  );
};
export default Footer;
