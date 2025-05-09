// type ButtonProps = {
//   children: React.ReactNode;
//   onClick?: () => void;
//   variant?: 'gray' | 'blue'; // 확장 가능
//   size?: 's' | 'm'; // 사이즈
//   className?: string;
// };

type Variant = 'gray' | 'blue';
type Size = 's' | 'm';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
}


const Button = ({
  children,
  variant = 'blue',
  size = 's',
  className = '',
  ...rest
}: ButtonProps) => {
  const baseStyle = 'text-white';
  const colorStyle = {
    gray: 'bg-gray-400',
    blue: 'bg-blue-500',
  };
  const sizeStyle = {
    s: 'min-w-10 text-xs rounded-md h-8',
    m: 'min-w-14 text-sm rounded-lg h-11',
  };

  return (
    <button className={`${baseStyle} ${sizeStyle[size]} ${colorStyle[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
