// // import React, { useState } from 'react';
// // import { Status } from "../enum/statusCostumer.enum";
// // import ProjectDetails from "./projectCostumer.component";
// // interface Project {
// //   customer_id: string;
// //   first_name: string;
// //   last_name: string;
// //   business_name: string;
// //   email: string;
// //   status: Status;
// //   project_description: string;
// //   access_details: string;
// //   comments: string;
// // }

// // const ProjectsTable: React.FC = () => {
// //   const projects: Project[] = [
// //     {
// //       customer_id: "st123456",
// //       first_name: "esti",
// //       last_name: "ff",
// //       business_name: "חוט",
// //       email: "d@d",
// //       status: Status.Active,
// //       project_description: "תאור הפרויקט 1",
// //       access_details: "פרטי גישה 1",
// //       comments: "הערות 1"
// //     },
// //     {
// //       customer_id: "st123457",
// //       first_name: "גגג",
// //       last_name: "ff",
// //       business_name: "חוט",
// //       email: "d@d",
// //       status: Status.Active,
// //       project_description: "תאור הפרויקט 2",
// //       access_details: "פרטי גישה 2",
// //       comments: "הערות 2"
// //     }
// //   ];

// //   const [expandedRow, setExpandedRow] = useState<string | null>(null);
// //   const [useropen, setuseropen] = useState<string>('+');


// //   const handleButtonClick = (customerId: string) => {
// //     setuseropen(customerId === expandedRow ? '+' : '-');
// //     // setExpandedRow(customerId === expandedRow ? null : customerId);
// //   };

// //   return (
// //     <div>
// //       <h2>פרויקטים</h2>

// //       <table>
// //         <caption>פרויקטים</caption>
// //         <thead>
// //           <tr>
// //             <th></th>
// //             <th>שם לקוח</th>
// //             <th>שם הפרויקט</th>
// //             <th>מייל</th>
// //             <th>סטטוס</th>
// //             <th>פעולות</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {projects.map((project, index) => (
// //             <React.Fragment key={index}>
// //               <tr>
// //                 <td><button onClick={() => handleButtonClick(project.customer_id)}>{project.customer_id === expandedRow ? '-' : '+'}</button></td>
// //                 <td>{`${project.first_name} ${project.last_name}`}</td>
// //                 <td>{project.business_name}</td>
// //                 <td>{project.email}</td> 
// //                 <td>{project.status}</td>
// //               </tr>
// //               {expandedRow === project.customer_id && (
// //                 <tr>
// //                   <td colSpan={6} style={{ padding: '10px' }}>
// //                     <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
// //                       <h4>תאור הפרויקט:</h4>
// //                       <p>{project.project_description}</p>
// //                       <h4>פרטי גישה:</h4>
// //                       <p>{project.access_details}</p>
// //                       <h4>הערות:</h4>
// //                       <p>{project.comments}</p>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               )}
// //             </React.Fragment>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default ProjectsTable;


// import React, { useState } from 'react';
// import ProjectDetails from "./projectCostumer.component";
// import { getAllCostumers } from "../api/costumer.api";
// import {Costumer  } from "../model/costumer.model";


// const ProjectsTable: React.FC = () => {
//   const projects: Costumer[] = getAllCostumers();
 
   

//   const [expandedRow, setExpandedRow] = useState<string | null>(null);

//   const handleButtonClick = (customerId: string) => {
//     setExpandedRow(customerId === expandedRow ? null : customerId);
//   };

//   return (
//     <div>
//       <h2>פרויקטים</h2>

//       <table>
//         <caption>פרויקטים</caption>
//         <thead>
//           <tr>
//             <th></th>
//             <th>שם לקוח</th>
//             <th>שם הפרויקט</th>
//             <th>מייל</th>
//             <th>סטטוס</th>
//             <th>פעולות</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projects.map((project, index) => (
//             <React.Fragment key={index}>
//               <tr>
//                 <td><button onClick={() => handleButtonClick(project.customer_id)}>{project.customer_id === expandedRow ? '-' : '+'}</button></td>
//                 <td>{`${project.first_name} ${project.last_name}`}</td>
//                 <td>{project.business_name}</td>
//                 <td>{project.email}</td>
//                 <td>{project.status}</td>
//               </tr>
//               {expandedRow === project.customer_id && (
//                 <tr>
//                   <td colSpan={6} style={{ padding: '10px' }}>
//                   <ProjectDetails
//                   customer_id={project.customer_id}
// />

//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProjectsTable;



import React, { useState, useEffect } from 'react';
import ProjectDetails from "./projectCostumer.component";
import { getAllCostumers } from "../../api/costumer.api";
import { Costumer } from "../../model/costumer.model";

const ProjectsTable: React.FC = () => {
  const [projects, setProjects] = useState<Costumer[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    const fetchCostumers = async () => {
      try {
        const response = await getAllCostumers(); // קריאה ל-API
        setProjects(response.data); // הגדרת הנתונים שנקבל
      } catch (error) {
        console.error('Error fetching costumers:', error);
      }
    };

    fetchCostumers();
  }, []); // קריאה רק פעם אחת בטעינה הראשונית

  const handleButtonClick = (customerId: string) => {
    setExpandedRow(customerId === expandedRow ? null : customerId);
  };

  return (
    <div>
      <h2>פרויקטים</h2>

      <table>
        <caption>פרויקטים</caption>
        <thead>
          <tr>
            <th></th>
            <th>שם לקוח</th>
            <th>שם הפרויקט</th>
            <th>מייל</th>
            <th>סטטוס</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <React.Fragment key={index}>
              <tr>
                <td><button onClick={() => handleButtonClick(project.customer_id)}>{project.customer_id === expandedRow ? '-' : '+'}</button></td>
                <td>{`${project.first_name} ${project.last_name}`}</td>
                <td>{project.business_name}</td>
                <td>{project.email}</td>
                {/* <td>{project.status}</td> */}
              </tr>
              {expandedRow === project.customer_id && (
                <tr>
                  <td colSpan={6} style={{ padding: '10px' }}>
                    <ProjectDetails
                      customer_id={project.customer_id}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;