import React, { PropsWithChildren } from 'react';

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add any additional specific props here if needed
}

const Row: React.FC<PropsWithChildren<RowProps>> = ({ children, ...other }) => {
  return (
    <div 
      {...other} 
      className={`flex flex-row ${other.className || ''}`}
    >
      {children}
    </div>
  );
};

export default Row;