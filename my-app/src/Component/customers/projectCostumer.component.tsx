
// import React from 'react';
// import { getcostumerProjec } from "../api/costumer.api";

// interface ProjectDetailsProps {
//   customer_id: string; // קוראים לכל הid
// }

// const ProjectDetails: React.FC<ProjectDetailsProps> = ({ customer_id }) => {
//   return (
//     <div>
//       <div>
//         <h2>תאור הפרויקט</h2>
//         <div>
//           <p>סוג הפרויקט: {}</p> {/*הדפיס את הid */}
//         </div>
//       </div>
//       <div>
//         <h2>פרטי גישה</h2>
//         <div>
//           <p>לינק לפיגמה: _____</p>
//         </div>
//         <div>
//           <p>לינק לניהול אתר: _____</p>
//         </div>
//         <div>
//           <p>שם משתמש: תסיס</p>
//         </div>
//       </div>
//       <div>
//         <h2>הערות</h2>
//         <p>טקסט חופשי תודה</p>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetails;


import React, { useEffect, useState } from 'react';
import { getcostumerProjec } from "../..//api/costumer.api";

interface ProjectDetailsProps {
  customer_id: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ customer_id }) => {
  const [projectData, setProjectData] = useState<any>(null); // אם את מצפה לנתונים מסוג מסוים, החלף את 'any' בסוג הנתונים המתאים

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getcostumerProjec(customer_id); // קריאה ל-API עם ה-ID שנשלח
        setProjectData(response.data); // הגדרת הנתונים שמתקבלים מה-API
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchData();
  }, [customer_id]); // הרצה מחדש כאשר משתנה ה-ID משתנה

  if (!projectData) {
    return <div>Loading...</div>; // או מצב טעינה אחר
  }

  return (
    <div>
      <div>
        <h2>תאור הפרויקט</h2>
        <div>
          <p>סוג הפרויקט: {projectData.project_type}</p> {/* לדוגמה, כאן תוכלי להשתמש בנתונים שמגיעים מהשרת */}
        </div>
      </div>
      <div>
        <h2>פרטי גישה</h2>
        <div>
          <p>לינק לפיגמה: _____</p>
        </div>
        <div>
          <p>לינק לניהול אתר: _____</p>
        </div>
        <div>
          <p>שם משתמש: {projectData.source}</p> {/* דוגמה לשימוש בנתונים שמגיעים מהשרת */}
        </div>
      </div>
      <div>
        <h2>הערות</h2>
        <p>טקסט חופשי תודה</p>
      </div>
    </div>
  );
};

export default ProjectDetails;


