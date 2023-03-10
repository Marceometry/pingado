type ChipProps = React.SVGProps<SVGSVGElement> & {
  size?: number
  color: string
}

export const ChipIcon = ({ size = 96, color, ...props }: ChipProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 256 256'
    fill='#fff'
    {...props}
  >
    <rect width='256' height='256' fill='none'></rect>
    <path
      d='M128,32a96,96,0,1,0,96,96A96,96,0,0,0,128,32Zm0,152a56,56,0,1,1,56-56A56,56,0,0,1,128,184Z'
      opacity='0.2'
    ></path>
    <circle
      cx='128'
      cy='128'
      r='96'
      fill='#fff'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='16'
    ></circle>
    <circle
      cx='128'
      cy='128'
      r='56'
      fill={color}
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='16'
    ></circle>
    <line
      x1='128'
      y1='72'
      x2='128'
      y2='32'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='16'
    ></line>
    <line
      x1='88.4'
      y1='88.4'
      x2='60.1'
      y2='60.1'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='16'
    ></line>
    <line
      x1='72'
      y1='128'
      x2='32'
      y2='128'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='16'
    ></line>
    <line
      x1='88.4'
      y1='167.6'
      x2='60.1'
      y2='195.9'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='16'
    ></line>
    <line
      x1='128'
      y1='184'
      x2='128'
      y2='224'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='16'
    ></line>
    <line
      x1='167.6'
      y1='167.6'
      x2='195.9'
      y2='195.9'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='16'
    ></line>
    <line
      x1='184'
      y1='128'
      x2='224'
      y2='128'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='16'
    ></line>
    <line
      x1='167.6'
      y1='88.4'
      x2='195.9'
      y2='60.1'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='16'
    ></line>
  </svg>
)
