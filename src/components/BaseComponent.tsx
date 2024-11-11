import React from 'react'
import Navbar from './Navbar';

const BaseComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="bg-[#F6F7F8] antialiased">
          <div>
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

export default BaseComponent
