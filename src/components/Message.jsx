import React from 'react';
import { AuthContext } from '../store/Context';
import { ChatContext } from '../store/ChatContext';

const Message = ({ message }) => {
  const { currentUser, img } = React.useContext(AuthContext);
  const { data } = React.useContext(ChatContext);

  // Format the date of the message
  const date = new Date(message.date);
  const formattedDate = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
  });

  const ref = React.useRef();

  // for showing recent messages
  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div className="">
      {((message.text.length > 0) || (message.img)) && (
        <div
          ref={ref}
          className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
          <div className="messageInfo">
            <img
              className="bg-white h-[30px] w-[30px] md:h-[50px] md:w-[50px] rounded-full object-cover object-center"
              src={message.senderId === currentUser.uid ? img : data.user.photoURL}
              alt=""
            />
            <span className="md:text-xs xs:text-[10px] m-1">{formattedDate}</span>
          </div>
          <div className="messageContent">
            {(message.text.length > 0) && <p className="md:max-w-[600px] max-w-[250px] break-words md:py-2 md:px-5 py-2 px-4 text-xs md:text-sm">{message.text}</p>}
            {message.img && (
              <img className="w-[40%] m-2" src={message.img} alt="" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
