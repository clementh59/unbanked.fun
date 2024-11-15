import React, { PropsWithChildren } from 'react';

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add any additional specific props here if needed
}

const Column: React.FC<PropsWithChildren<ColumnProps>> = ({ children, ...other }) => {
  return (
    <div 
      {...other} 
      className={`flex flex-col ${other.className || ''}`}
    >
      {children}
    </div>
  );
};

export default Column;