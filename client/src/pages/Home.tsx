import BarChartBox from '../commponents/BarChart';
import PieChart from '../commponents/PieChart';

const Home = () => {
  return (
    <section>
      <h1 className='mb-5 tracking-wider uppercase'>Applier</h1>
      <div className='grid grid-cols-2 gap-5 grid-rows-[180px,minmax(180px,1fr)] '>
        <div className='row-span-2 border-2 border-[#384256] rounded-lg'>
          <PieChart />
        </div>
        <div className='row-span-2 border-2 border-[#384256] rounded-lg'>
          <BarChartBox />
        </div>
        <div className='border-2 border-[#384256] rounded-lg'>Box3</div>
      </div>
    </section>
  );
};
export default Home;
