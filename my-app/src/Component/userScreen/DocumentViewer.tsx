import React, { useState, useEffect } from 'react';
import './DocumentViewer.css'; // נניח ששם הקובץ הוא DocumentViewer.css
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
const [loading, setLoading] = useState<boolean>(false);
console.log(sessionStorage.getItem("email"))
const email=sessionStorage.getItem("email")
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
      {/* {project && project.endDate && <MoreStatus project={project} />} */}
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
    )}
  </div>
);
};
export default DocumentViewer;
