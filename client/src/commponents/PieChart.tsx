import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import calculatePercentage from '../utils/calculatePercentage';

type PieChartBoxProps = {
  titel: string;
  data: { name: string; totalAmount: number }[];
  colors: string[];
};
const PieChartBox = ({ titel, data, colors }: PieChartBoxProps) => {
  const totalValue = data.reduce((a, b) => a + b.totalAmount, 0);

  return (
    <div className='p-5'>
      <div className='flex justify-between'>
        <h1 className='mb-5'>{titel}</h1>
        <span>Total: {totalValue}</span>
      </div>
      <ResponsiveContainer width='99%' height={300}>
        <PieChart width={600} height={600}>
          <Pie
            dataKey='totalAmount'
            isAnimationActive={true}
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={60}
            outerRadius={90}
            paddingAngle={8}
            fill='#8884d8'
            label={({ name, totalAmount }) => `${name}: ${totalAmount} EA`}
            className='text-xs'
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className='options | flex justify-between gap-2 text-sm mt-4'>
        {data.map((item, i) => (
          <div className='option | flex flex-col gap-2' key={item.name}>
            <div className='title | flex items-center gap-2'>
              <div
                className='dot | w-[10px] h-[10px]'
                style={{ backgroundColor: colors[i] }}
              />
              <span>{item.name}</span>
            </div>
            <span className='text-right'>{`${calculatePercentage(
              item.totalAmount,
              totalValue
            )}%`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PieChartBox;
