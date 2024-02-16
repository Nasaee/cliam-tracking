import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { nanoid } from 'nanoid';
import { sendOutItemsAmount } from '../data';

const BarChartBox = () => {
  const COLORS = ['#94d82d', '#9775fa', '#fcc419'];

  return (
    <div className='p-5'>
      <h1 className='mb-5'>Send Out</h1>
      <ResponsiveContainer width='99%' height={250}>
        <BarChart
          width={500}
          height={300}
          data={sendOutItemsAmount}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='year' />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey='544965'
            fill={COLORS[0]}
            activeBar={<Rectangle fill='#40c057' stroke='blue' />}
          />
          <Bar
            dataKey='544995'
            fill={COLORS[1]}
            activeBar={<Rectangle fill='#5f3dc4' stroke='purple' />}
          />
          <Bar
            dataKey='544990'
            fill={COLORS[2]}
            activeBar={<Rectangle fill='#e67700' stroke='purple' />}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className='options | flex justify-between gap-2 text-sm mt-4'>
        {sendOutItemsAmount.map((item) => (
          <div className='option | flex flex-col  gap-2' key={nanoid()}>
            <div className='title | flex items-center gap-2'>
              <span>{item.year}</span>
            </div>
            <span className='flex items-center justify-between gap-3'>
              <span
                className='dot | block w-[10px] h-[10px] text-center'
                style={{ background: COLORS[0] }}
              ></span>
              <span className='text-right'>{`${item[544965]} EA`}</span>
            </span>
            <span className='flex items-center justify-between gap-3'>
              <span
                className='dot | block w-[10px] h-[10px] text-center'
                style={{ background: COLORS[1] }}
              ></span>
              <span className='text-right'>{`${item[544995]} EA`}</span>
            </span>
            <span className='flex items-center justify-between gap-3'>
              <span
                className='dot | block w-[10px] h-[10px] text-center'
                style={{ background: COLORS[2] }}
              ></span>
              <span className='text-right'>{`${item[544990]} EA`}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BarChartBox;
