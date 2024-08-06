import React, { useState, ChangeEvent } from 'react';
import Swal from 'sweetalert2';
import './anydesck.css';
import {sendEmail  } from "../../api/sendEmail.api";
const AnyDeskChecker: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [anyDeskCode, setAnyDeskCode] = useState<string>('');

  const checkAnyDesk = () => {
    Swal.fire({
      title: 'האם מותקן לך אנידסק על המחשב?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'כן',
      cancelButtonText: 'לא'
    }).then((result) => {
      if (result.isConfirmed) {
        openAnyDesk();
      } else {
        setMessage(
          '<a href="https://anydesk.com/en/downloads" target="_blank" rel="noopener noreferrer">לחצו להורדה AnyDesk</a>.'
        );
        setShowCodeInput(true);
      }
    });
  };

  const openAnyDesk = () => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'anydesk:';
    document.body.appendChild(iframe);

    const timeout = setTimeout(() => {
      document.body.removeChild(iframe);
      setMessage(
        'אנידסק לא מותקן. ' +
        '<a href="https://anydesk.com/en/downloads" target="_blank" rel="noopener noreferrer"> לחצו להורדה AnyDesk</a>.'
      );
      setShowCodeInput(true);
    }, 2000); 


  window.onblur = () => {
    clearTimeout(timeout);
    setMessage(
      'אנידסק מותקן ונפתח!' +
      '<br />במקרה של בעיה, פתחו ידנית והכניסו את הקוד.'
    );
    setShowCodeInput(true);
    window.onblur = null; 
  };
};

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnyDeskCode(e.target.value);
    };
    const sendCodeToServer = async () => {
      try {
        await sendEmail("תמיכה טכנית", anyDeskCode);
        Swal.fire({
          title: 'נשלח בהצלחה!',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      } catch (error) {
        Swal.fire({
          title: 'השליחה נכשלה',
          text: 'לא הצלחנו לשלוח את המייל, אנא נסה שוב מאוחר יותר.',
          icon: 'error',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    };

  return (
    <div>
      <div className='computer'>
      <svg className='computer' width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M51.9151 0H6.55339C3.19799 0 0.468262 2.72985 0.468262 6.08513V30.9787V34.8511C0.468262 38.2064 3.19799 40.9362 6.55339 40.9362H21.2464L19.4762 49.7873H13.7449C13.1338 49.7873 12.6385 50.2826 12.6385 50.8936C12.6385 51.5047 13.1338 52 13.7449 52H44.7236C45.3346 52 45.8299 51.5047 45.8299 50.8936C45.8299 50.2826 45.3346 49.7873 44.7236 49.7873H38.9923L37.2221 40.9362H51.9151C55.2704 40.9362 58.0002 38.2065 58.0002 34.8511V30.9787V6.08513C58.0002 2.72985 55.2705 0 51.9151 0ZM21.7327 49.7873L23.5029 40.9362H34.9655L36.7357 49.7873H21.7327ZM55.7875 34.8511C55.7875 36.9863 54.0504 38.7235 51.9151 38.7235H6.55339C4.41819 38.7235 2.68099 36.9864 2.68099 34.8511V32.0852H55.7874V34.8511H55.7875ZM55.7875 29.8724H2.68099V27.6597H9.3193C9.93036 27.6597 10.4257 27.1644 10.4257 26.5534C10.4257 25.9423 9.93036 25.447 9.3193 25.447H2.68099V6.08513C2.68099 3.94993 4.41808 2.21273 6.55339 2.21273H51.9151C54.0503 2.21273 55.7875 3.94981 55.7875 6.08513V29.8724Z" fill="#002046" />
      </svg>
      </div>
      <div className='context'>
      <svg className='contextText' width="179" height="25" viewBox="0 0 179 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.7475 19L13.2475 3.34H0.5275V1.15H15.7675V2.89L11.2075 19H8.7475ZM0.5275 24.76V10H2.8675V24.76H0.5275ZM21.1806 19V3.34H18.9606V1.15H23.5206V19H21.1806ZM29.9404 19V3.34H27.7204V1.15H37.8604C42.2704 1.15 44.9704 2.77 44.9704 7.99V19H42.6304V8.05C42.6304 4.3 41.0404 3.34 37.6504 3.34H32.2804V19H29.9404ZM57.76 19V9.19C57.76 4.54 56.35 3.34 52.36 3.34H47.5V1.15H52.57C58.09 1.15 60.1 3.55 60.1 9.13V19H57.76ZM74.4384 19.15C73.2384 19.15 72.1284 19.06 71.2284 18.91L71.5884 16.69C72.3684 16.87 73.7184 16.99 74.6184 16.99C78.2784 16.99 81.0684 14.05 81.0684 10.03C81.0684 6.16 78.6384 3.07 75.4584 3.07C72.4884 3.07 70.3884 4.87 69.2184 8.65L66.0084 19H63.5784L67.0284 8.32L63.2184 1.15H65.7084L68.0784 6.13C69.4884 2.89 72.1284 0.97 75.5784 0.97C79.9584 0.97 83.4084 5.02 83.4084 10.03C83.4084 15.07 79.6584 19.15 74.4384 19.15ZM107.463 19V9.19C107.463 4.42 105.873 3.34 102.093 3.34H94.8927V1.15H102.303C107.613 1.15 109.803 3.46 109.803 9.13V19H107.463ZM95.2527 19V10H97.5927V19H95.2527ZM113.535 19V16.81H116.475C120.765 16.81 123.615 14.29 123.615 10.03C123.615 5.8 120.765 3.34 116.475 3.34H113.535V1.15H116.475C121.965 1.15 125.955 4.21 125.955 10.09C125.955 15.94 121.965 19 116.475 19H113.535ZM130.162 10.75V3.34H127.942V1.15H132.502V10.75H130.162ZM147.183 19.15C145.983 19.15 144.873 19.06 143.973 18.91L144.333 16.69C145.113 16.87 146.463 16.99 147.363 16.99C151.023 16.99 153.812 14.05 153.812 10.03C153.812 6.16 151.383 3.07 148.203 3.07C145.233 3.07 143.133 4.87 141.963 8.65L138.753 19H136.323L139.773 8.32L135.963 1.15H138.453L140.823 6.13C142.233 2.89 144.873 0.97 148.323 0.97C152.702 0.97 156.153 5.02 156.153 10.03C156.153 15.07 152.403 19.15 147.183 19.15ZM162.209 19.15C161.069 19.15 159.989 19.03 159.209 18.91L159.599 16.9C160.349 17.02 161.309 17.08 162.089 17.08C163.379 17.08 164.189 16.6 164.189 14.41V3.34H160.199V1.15H171.149C176.969 1.15 178.769 3.07 178.769 8.53V19H176.429V8.59C176.429 4.06 175.229 3.34 171.149 3.34H166.529V14.44C166.529 17.89 164.849 19.15 162.209 19.15Z" fill="#002046" />
      </svg>
      </div>

      <button className="anydesk-button" onClick={checkAnyDesk}>
        Check AnyDesk
      </button>
      <p dangerouslySetInnerHTML={{ __html: message }}></p>
      {showCodeInput && (
        <div className="code-input-container">
          <input
            type="text"
            placeholder="Enter AnyDesk code"
            value={anyDeskCode}
            onChange={handleCodeChange}
          />
          <button className="send-code-button" onClick={sendCodeToServer}>
            Send Code
          </button>
        </div>
      )}
    </div>
  );
};

export default AnyDeskChecker;


