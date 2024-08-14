import React, { useState } from 'react';
import './document.css';
import { FaDownload } from 'react-icons/fa';
import { importFile } from '../../api/upFileTDrive';
interface Task {
  description: string;
  files: File[];
}
const Documents: React.FC = () => {
  const [task, setTask] = useState<Task>({ description: '', files: [] });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setTask((prevTask) => ({ ...prevTask, files: [...prevTask.files, ...newFiles] }));
    }
  };
  const handleDeleteFile = (index: number) => {
    setTask((prevTask) => {
      const newFiles = [...prevTask.files];
      newFiles.splice(index, 1);
      return { ...prevTask, files: newFiles };
    });
  };
  const drive=async () =>{
   await importFile(task.files[0])
  }
  const handleFileClick = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    const newWindow = window.open();
    if (newWindow) {
      newWindow.location.href = fileUrl;
    } else {
      window.location.href = fileUrl;
    }
  };
  const handleFileDownload = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()}>
        <div id="ab">
          <label htmlFor="file-upload" className="upload-label">
            <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.18548 0C5.07861 0.00030445 3.37126 1.82872 3.37097 4.085V12.3718C3.37126 13.6311 4.32399 14.6514 5.5 14.6518C6.67601 14.6514 7.62874 13.6311 7.62903 12.3718V5.89C7.62903 5.62767 7.43045 5.415 7.18548 5.415C6.94052 5.415 6.74193 5.62767 6.74193 5.89V12.3718C6.74171 12.7405 6.60362 13.07 6.37818 13.3122C6.15203 13.5536 5.84436 13.7015 5.5 13.7018C5.15564 13.7015 4.84797 13.5536 4.62182 13.3122C4.39638 13.07 4.25829 12.7405 4.25807 12.3718V4.085C4.25829 3.21779 4.58503 2.43704 5.11548 1.86823C5.64665 1.30015 6.37569 0.950232 7.18548 0.95C7.99527 0.950232 8.72432 1.30015 9.25549 1.86823C9.78594 2.43704 10.1127 3.21779 10.1129 4.085V13.11C10.1127 14.4756 9.59727 15.7076 8.76182 16.6031C7.92564 17.4978 6.77523 18.0498 5.5 18.05C4.22477 18.0498 3.07436 17.4978 2.23818 16.6031C1.40272 15.7076 0.887314 14.4756 0.887097 13.11V5.80878C0.887097 5.54643 0.68851 5.33378 0.443548 5.33378C0.198587 5.33378 0 5.54643 0 5.80878V13.11C0.000284081 16.3631 2.46226 18.9997 5.5 19C8.53774 18.9997 10.9997 16.3631 11 13.11V4.085C10.9997 1.82872 9.29236 0.00030445 7.18548 0Z" fill="#002046" />
            </svg>
            <span > :העלאת קבצים נוספים</span>
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
          <div id="aaa">
            <h3>קבצים מצורפים :</h3>
          </div>
        </div>
     
      </form>
      <div id="main1">
        <div id="maink">
        
          <div style={{ display: 'flex', flexWrap: 'wrap', direction: 'rtl' }}>
            {task.files.map((file, index) => {
              const fileUrl = URL.createObjectURL(file);
              const isImage = file.type.startsWith('image/');
              const isPDF = file.type === 'application/pdf';

              return (
                <div
                  key={index}
                  className="cont1"
                  style={{
                    zIndex: 0,
                    textAlign: 'center',
                    margin: 15,
                    width: 182,
                    height: 73,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                  }}
                >
                  <div className="s" style={{ margin: 10, textAlign: 'center', zIndex: 1 }}>
                    {isImage || isPDF ? (
                      <div>
                        {isImage ? (
                          <img
                            src={fileUrl}
                            alt={file.name}
                            style={{ maxWidth: 182, maxHeight: 73, display: 'flex', flexWrap: 'nowrap' }}
                            onClick={() => handleFileClick(file)}
                          />
                        ) : (
                          <div onClick={() => handleFileClick(file)} style={{ cursor: 'pointer' }}>
                            <span>{file.name}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div onClick={() => handleFileDownload(file)} style={{ cursor: 'pointer' }}>
                        <span>{file.name}</span>
                      </div>
                    )}
                    <div className="button-container">
                      <button className='delete-button' onClick={() => handleDeleteFile(index)}>x</button>
                      <button className='download-button' onClick={() => handleFileDownload(file)}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                      </button>
                      <button className='drive-b'   onClick={()=>drive()}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="23px" fill="#5f6368"><path d="M220-100q-17 0-34.5-10.5T160-135L60-310q-8-14-8-34.5t8-34.5l260-446q8-14 25.5-24.5T380-860h200q17 0 34.5 10.5T640-825l182 312q-23-6-47.5-8t-48.5 2L574-780H386L132-344l94 164h316q11 23 25.5 43t33.5 37H220Zm70-180-29-51 183-319h72l101 176q-17 13-31.5 28.5T560-413l-80-139-110 192h164q-7 19-10.5 39t-3.5 41H290Zm430 160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
