import './GlobalStyles.css';

interface GlobalStylesProps {
  children: React.ReactNode;
}

function GlobalStyles({ children }: GlobalStylesProps) {
  return <>{children}</>;
}

export default GlobalStyles;
