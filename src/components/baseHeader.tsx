import React from 'react';

interface BaseHeaderProps {
  title: string;
  messageState: { message: string; setMessage: React.Dispatch<React.SetStateAction<string>> };
  showState: { show: boolean; setShow: React.Dispatch<React.SetStateAction<boolean>> };
}

const BaseHeader: React.FC<BaseHeaderProps> = ({ title, messageState, showState }) => {
  const { message,  } = messageState;
  const { show,  } = showState;

  return (
    <header>
      <h1>{title}</h1>
      {show && <p>{message}</p>}
    </header>
  );
};

export default BaseHeader;
