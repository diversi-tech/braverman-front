import React, { useState, useEffect } from 'react';
import './DocumentViewer.css'; // נניח ששם הקובץ הוא DocumentViewer.css
import MoreStatus from '../project/moreStatus';
import { Project } from '../../model/project.model';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_BRAVERMAN;
const apiUrl = process.env.REACT_APP_BRAVERMAN
// פונקציה לשליחת בקשה לקבלת טוקן
const fetchToken = async (): Promise<string> => {
  const response = await fetch(`${apiUrl}GreenInvoice/fetch-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data.token;
  }
  throw new Error('Failed to fetch token');
};
// פונקציה לחיפוש לקוח לפי מייל
const searchClientByEmail = async (email: string, token: string): Promise<{type: string, number: string, documentDate: string, description: string, price: string, downloadLink: string }[]> => {
  const response = await fetch(`${apiUrl}GreenInvoice/search-client/${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.ok) {
const data = await response.json();
    return data;
  }
  throw new Error('Failed to fetch documents');
};
// רכיב React
const DocumentViewer: React.FC= () => {
  const [documents, setDocuments] = useState<{type: string, number: string, documentDate: string, description: string, price: string, downloadLink: string }[]>([]);
const email=sessionStorage.getItem("email")
const [loading, setLoading] = useState<boolean>(false);
  debugger
  // שימוש ב-useEffect לטעינת המסמכים בעת טעינת הקומפוננטה
  useEffect(() => {
    const fetchDocuments = async () => {
      if (email) {
        setLoading(true);
        try {
          debugger
          const token = await fetchToken(); // שליחה לבקשה לקבלת Token
          const documents = await searchClientByEmail(email, token); // חיפוש לקוח לפי מייל
          setDocuments(documents);
        } catch (error) {
          console.error('Error:', error);
          console.log('An error occurred');
        } finally {
          setLoading(false);
        }
      }
    };
fetchDocuments();
  }, [email]);
     return (
      <div>
        <div className='allDocument'>
      {/* {project && project.endDate && <MoreStatus project={project} />} */}
      <svg width="349" height="28" viewBox="0 0 349 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.882852 8.29C0.882852 6.88 1.96285 5.92 3.31285 5.92C4.66285 5.92 5.74285 6.85 5.74285 8.29C5.74285 9.67 4.69285 10.66 3.31285 10.66C2.02285 10.66 0.882852 9.73 0.882852 8.29ZM0.882852 20.05C0.882852 18.64 1.96285 17.68 3.31285 17.68C4.66285 17.68 5.74285 18.61 5.74285 20.05C5.74285 21.43 4.69285 22.42 3.31285 22.42C2.02285 22.42 0.882852 21.49 0.882852 20.05ZM21.5032 22V12.58C21.5032 8.56 20.0632 7.6 16.6732 7.6H9.35316V4.03H17.0632C23.0032 4.03 25.5232 6.25 25.5232 12.46V22H21.5032ZM9.68316 22V13H13.7032V22H9.68316ZM36.4989 22V7.6H27.6789V4.03H43.3689V7.6H40.4889V22H36.4989ZM55.0551 22V12.43C55.0551 8.56 53.6151 7.6 50.1351 7.6H45.7551V4.03H50.5251C56.9151 4.03 59.0751 6.19 59.0751 12.31V22H55.0551ZM64.0228 22V7.6H61.8628V4.03H68.0428V22H64.0228ZM84.345 22V12.58C84.345 8.56 82.905 7.6 79.515 7.6H72.195V4.03H79.905C85.845 4.03 88.365 6.25 88.365 12.46V22H84.345ZM72.525 22V13H76.545V22H72.525ZM94.8372 22L99.3672 7.6H90.6072V0.91H94.5072V4.03H103.627V7.12L98.9172 22H94.8372ZM116.434 22.18C115.264 22.18 114.064 22.03 113.224 21.88L113.674 18.46C114.364 18.58 115.204 18.67 115.954 18.67C117.154 18.67 117.844 18.16 117.844 16.39V7.6H113.944V4.03H125.164C131.734 4.03 133.744 5.95 133.744 11.98V22H129.754V12.04C129.754 8.26 128.914 7.6 125.554 7.6H121.864V16.84C121.864 20.77 119.914 22.18 116.434 22.18ZM138.701 22V7.6H136.541V4.03H142.721V22H138.701ZM150.443 22L154.973 7.6H146.213V0.91H150.113V4.03H159.233V7.12L154.523 22H150.443ZM162.301 22V18.46H171.601V12.1C171.601 8.35 170.191 7.6 167.221 7.6H162.301V4.03H167.731C173.461 4.03 175.591 6.04 175.591 12.04V18.46H178.171V22H162.301ZM189.615 22L193.245 7.6H180.945V4.03H197.535V6.76L193.665 22H189.615ZM180.945 27.76V13H184.935V27.76H180.945ZM206.849 25.48L213.749 0.91H216.989L210.089 25.48H206.849ZM227.469 22.18C226.299 22.18 225.099 22.03 224.259 21.88L224.709 18.46C225.399 18.58 226.239 18.67 226.989 18.67C228.189 18.67 228.879 18.16 228.879 16.39V7.6H224.979V4.03H236.199C242.769 4.03 244.779 5.95 244.779 11.98V22H240.789V12.04C240.789 8.26 239.949 7.6 236.589 7.6H232.899V16.84C232.899 20.77 230.949 22.18 227.469 22.18ZM249.736 22V7.6H247.576V4.03H253.756V22H249.736ZM259.018 13.87V7.6H256.858V4.03H263.038V13.87H259.018ZM266.241 22V18.46H270.381V7.6H266.601V4.03H274.371V22H266.241ZM279.853 22V7.6H277.693V4.03H283.873V22H279.853ZM287.545 22V18.46H296.845V12.1C296.845 8.35 295.435 7.6 292.465 7.6H287.545V4.03H292.975C298.705 4.03 300.835 6.04 300.835 12.04V18.46H303.415V22H287.545ZM312.595 13.9C311.245 13.9 310.135 13.57 309.355 12.91C309.895 16.48 312.445 18.64 315.925 18.64C319.945 18.64 322.675 15.67 322.675 11.41V4.03H326.665V11.35C326.665 17.77 322.315 22.3 316.015 22.3C309.775 22.3 305.395 17.83 305.395 11.35V4.03H309.415V9.7C309.865 10.48 310.795 10.9 311.995 10.9C313.765 10.9 314.695 9.76 314.695 7.81V4.03H318.265V7.84C318.265 11.59 316.075 13.9 312.595 13.9ZM331.562 22V7.6H329.402V4.03H340.052C345.302 4.03 348.062 6.01 348.062 11.59V22H344.072V11.62C344.072 8.56 342.752 7.6 339.932 7.6H335.582V22H331.562Z" fill="#002046"/>
</svg>
      <div className="header-svg">
        <svg width="349" height="28" viewBox="0 0 349 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* SVG path here */}
        </svg>
      </div>
      {loading && <div>Loading...</div>}
      {!loading && documents.length === 0 && <div>No documents found.</div>}
      {!loading && documents.length > 0 &&  (
      <div className="document-grid">
        <div className="column-header">מספר חשבונית</div>
        <div className="column-header">סוג החשבונית</div>
        <div className="column-header">סכום החשבונית</div>
        <div className="column-header">תאריך</div>
        <div className="column-header">פעולות נוספות</div>
        {documents.map((doc, index) => (
          <React.Fragment key={index}>
            <div className="document-item">{doc.number}</div>
            <div className="document-item">
              {doc.type === "320" ? "חשבונית מס/קבלה" : doc.type === "300" ? "חשבון עיסקה" : "אחר"}
            </div>
            <div className="document-item">{doc.price}</div>
            <div className="document-item">{doc.documentDate}</div>
            <div className="document-item">
              <a href={doc.downloadLink} target="_blank" rel="noopener noreferrer">
                {doc.description ? `הורדה לPDF את:${doc.description}` : `Download Document ${index + 1}`}
              </a>
            </div>
          </React.Fragment>
        ))}
      </div>
    )}</div>
  </div>
);
};
export default DocumentViewer;
