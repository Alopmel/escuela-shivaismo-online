import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center rounded-[25px]  bg-[#502668] px-4 text-sm font-medium text-white transition-colors hover:bg-[#78379e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9749c4] active:bg-[#c08fdd] aria-disabled:cursor-not-allowed aria-disabled:opacity-50 border-none",
        className
      )}
    >
      {children}
    </button>
  );
}
