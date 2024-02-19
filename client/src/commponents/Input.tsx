type Prop = {
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  label: string;
  value: string;
  maxWidth?: number;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ label, maxWidth, value, type, handleChange }: Prop) => {
  return (
    <label
      className='flex flex-col gap-2'
      style={{ maxWidth: maxWidth ? `${maxWidth}px` : '' }}
    >
      <span className='font-bold text-xs tracking-wider text-gray-500 pl-2'>
        {label}
      </span>
      <input
        type={type}
        value={value}
        className='border border-black rounded-lg px-3 py-2 min-w-[200px] text-sm'
        onChange={handleChange}
      />
    </label>
  );
};
export default Input;
