import BarChartBox from '../commponents/BarChart';
import PieChart from '../commponents/PieChart';
// import UnreceivePieChart from '../commponents/UnreceivePieChart';
import { receiveStatus } from '../data';
import groupDataByItem from '../utils/groupDatabyItem';

const colorsForReceiveStatus = ['#e64980', '#3bc9db', '#0b7285'];
const colorsGreen = ['#2b8a3e', '#a9e34b', '#5c940d'];
const colorsGold = ['#fff3bf', '#e67700', '#fcc419'];
const colorsViolet = ['#b197fc', '#9c36b5', '#845ef7'];
const Home = () => {
  const allApplierItems = groupDataByItem(receiveStatus);

  return (
    <section className='w-full'>
      <h1 className='mb-5 tracking-wider uppercase'>Applier</h1>
      <div className='grid grid-cols-2 gap-5 grid-rows-[180px,minmax(180px,1fr)] '>
        <div className='border-2 col-span-2 row-span-2 border-[#384256] rounded-lg'>
          <BarChartBox />
        </div>
        <div className='row-span-2 border-2 border-[#384256] rounded-lg'>
          <PieChart
            titel='Receive Status'
            colors={colorsForReceiveStatus}
            data={receiveStatus}
          />
        </div>
        {/* uncomment if need to show */}
        {/* <div className='row-span-2 border-2 border-[#384256] rounded-lg'>
          <UnreceivePieChart />
        </div> */}
        <div className='row-span-2 border-2 border-[#384256] rounded-lg'>
          <PieChart
            titel='544965'
            colors={colorsGreen}
            data={Object.values(allApplierItems[544965])}
          />
        </div>
        <div className='row-span-2 border-2 border-[#384256] rounded-lg'>
          <PieChart
            titel='544990'
            colors={colorsGold}
            data={Object.values(allApplierItems[544990])}
          />
        </div>
        <div className='row-span-2 border-2 border-[#384256] rounded-lg'>
          <PieChart
            titel='544995'
            colors={colorsViolet}
            data={Object.values(allApplierItems[544995])}
          />
        </div>
      </div>
    </section>
  );
};
export default Home;
