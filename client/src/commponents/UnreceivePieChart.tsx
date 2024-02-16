import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { receiveStatus } from '../data';
import groupDataByStatus from '../utils/groupDataByStatus';

const UnreceivePieChart = () => {
  const unreceivedItems = groupDataByStatus(receiveStatus[0]);

  const COLORS = ['#00C49F', '#FFBB28', '#8884d8'];
  return (
    <div className='p-5'>
      <h1 className='mb-5'>Unreceive Items</h1>
      <ResponsiveContainer width='99%' height={200}>
        <PieChart width={800} height={600}>
          <Pie
            dataKey='totalAmount'
            isAnimationActive={true}
            data={unreceivedItems}
            cx='50%'
            cy='50%'
            innerRadius={60}
            outerRadius={90}
            paddingAngle={8}
            fill='#8884d8'
            label={({ name, totalAmount }) => `${name}: ${totalAmount} EA`}
            className='text-xs'
          >
            {receiveStatus.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className='options | '></div>
    </div>
  );
};
export default UnreceivePieChart;
