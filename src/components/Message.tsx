import React from 'react';

interface MessageProps {
  children: React.ReactNode;
  type?: 'success' | 'error' | 'info';
}

/*<div className="text-center mt-16">
            <p className="text-lg">Please log in to manage your wishlists.</p>
          </div> */
const Message = ({ children, type = "info" }: MessageProps) => {
  return (
    
    <div className={`p-4 rounded-lg shadow-lg mt-16 mb-4 mx-4 flex items-center justify-between ${
      type === 'success'
        ? 'bg-green-200'
        : type === 'error'
        ? 'bg-red-200'
        : 'bg-blue-200'
    }`}>
      <i className={`mr-2 fa-xl fa-solid fa-${
        type === 'success'
          ? 'check-circle'
          : type === 'error'
          ? 'exclamation-circle'
          : 'info-circle'
      }`}></i>
      <h3 className="text-xl font-bold w-full">{children}</h3>
    </div>
  );
};

export default Message;