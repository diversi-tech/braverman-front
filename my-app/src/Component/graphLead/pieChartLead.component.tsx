// import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { useDispatch, useSelector } from 'react-redux';
// import { Lead } from '../../model/leads.model';
// import { getAllLeads } from '../../api/leads.api';
// import { setAllLeads } from '../../Redux/Leads/leadsAction';
// import { Enum } from '../../model/enum.model';
// import { setAllStatusLeads } from '../../Redux/enum/statusLeadAction';
// import { getAllEnumFromServer } from '../../api/enum.api';
// import "./pieGraph.css";

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// const PieChartLead = () => {
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [leadsStatus, setLeadsStatus] = useState<Enum[]>([]);
//   const [leadStatusCount, setLeadStatusCount] = useState({
//     "נסגר": 0,
//     "ליד חדש": 0,
//     "פגישת אפיון": 0,
//     "הוצאת חשבונית": 0,
//     "הועבר ללקוח": 0,
//     "שיחה ראשונית": 0,
//     "נשלחה הצעת מחיר": 0,
//     "שיחת מעקב": 0,
//     "שליחת הצעת מחיר": 0,
//     "העברה להקמה בפועל": 0,
//   });

//   const dispatch = useDispatch();
//   const leadsState = useSelector((state: { leads: { allLeads: Lead[] } }) => state.leads);
//   const leadStatus = useSelector((state: { statusLead: { allStatusLead: Enum[] } }) => state.statusLead);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let data;
//         if (leadsState.allLeads.length) {
//           data = leadsState.allLeads;
//         } else {
//           const resAllLeads = await getAllLeads();
//           data = resAllLeads.data;
//           dispatch(setAllLeads(data));
//         }
//         setLeads(data);

//         let statusData;
//         if (leadStatus.allStatusLead.length) {
//           statusData = leadStatus.allStatusLead;
//         } else {
//           const resAllStatusLeads = await getAllEnumFromServer(5);
//           statusData = resAllStatusLeads.data;
//           dispatch(setAllStatusLeads(statusData));
//         }
//         setLeadsStatus(statusData);
//       } catch (error) {
//         console.error('Error fetching leads:', error);
//       }
//     };

//     fetchData();
//   }, [dispatch, leadsState.allLeads, leadStatus.allStatusLead]);

//   useEffect(() => {
//     if (leads.length > 0) {
//       statusCount();
//     }
//   }, [leads]);

//   const statusCount = () => {
//     const newLeadStatusCount = { ...leadStatusCount }; // Create a copy of the current counts
//     for (let index = 0; index < leads.length; index++) {
//       switch (leads[index].status) {
//         case 'נסגר':
//           newLeadStatusCount['נסגר'] += 1;
//           break;
//         case 'ליד חדש':
//           newLeadStatusCount['ליד חדש'] += 1;
//           break;
//         case 'פגישת אפיון':
//           newLeadStatusCount['פגישת אפיון'] += 1;
//           break;
//         case 'הוצאת חשבונית':
//           newLeadStatusCount['הוצאת חשבונית'] += 1;
//           break;
//         case 'הועבר ללקוח':
//           newLeadStatusCount['הועבר ללקוח'] += 1;
//           break;
//         case 'שיחה ראשונית':
//           newLeadStatusCount['שיחה ראשונית'] += 1;
//           break;
//         case 'נשלחה הצעת מחיר':
//           newLeadStatusCount['נשלחה הצעת מחיר'] += 1;
//           break;
//         case 'שיחת מעקב':
//           newLeadStatusCount['שיחת מעקב'] += 1;
//           break;
//         case 'שליחת הצעת מחיר':
//           newLeadStatusCount['שליחת הצעת מחיר'] += 1;
//           break;
//         case 'העברה להקמה בפועל':
//           newLeadStatusCount['העברה להקמה בפועל'] += 1;
//           break;
//         default:
//           console.warn(`Unknown status: ${leads[index].status}`);
//       }
//     }
//     setLeadStatusCount(newLeadStatusCount);
//   };

//   const data = {
//     labels: ["נסגר", "ליד חדש", "פגישת אפיון", "הוצאת חשבונית", "הועבר ללקוח", "שיחה ראשונית",
//       "נשלחה הצעת מחיר", "שיחת מעקב", "שליחת הצעת מחיר", "העברה להקמה בפועל"],
//     datasets: [
//       {
//         label: 'סטטוס',
//         data: Object.values(leadStatusCount),
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.2)', // Different colors for each status
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)'
//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)',
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)'
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false, // Hide legend
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context: any) {
//             const value = context.raw as number;
//             const percentage = ((value / Object.values(leadStatusCount).reduce((a, b) => a + b, 0)) * 100).toFixed(2);
//             return `${percentage}%`;
//           }
//         }
//       },
//       datalabels: {
//         display: false, // Hide data labels
//       }
//     }
//   };

//   return (
//     <div>
//       <div className='pie'>
//         <div className="legend-container">
//           <ul className="legend-list">
//             {Object.keys(leadStatusCount).map((status, index) => (
//               <li key={status} style={{ color: data.datasets[0].borderColor[index] }}>
//                 <span className="legend-color-box" style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}></span>
//                 {status}
//               </li>
//             ))}
//           </ul>
//           <br></br>
//           <br></br>
//           <div id='dateFilter' className='filterDate'>
//             <input
//               type='date'
//             />
//             סנן
//           </div>
//         </div>
//         <div className=" graphPie"
//           style={{ width: '40%', height: '40%' }}>
//           <Pie data={data} options={options} />

//         </div>
//         <div></div>

//       </div>
//     </div>
//   );
// };

// export default PieChartLead;


import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useDispatch, useSelector } from 'react-redux';
import { Lead } from '../../model/leads.model';
import { getAllLeads } from '../../api/leads.api';
import { setAllLeads } from '../../Redux/Leads/leadsAction';
import { Enum } from '../../model/enum.model';
import { setAllStatusLeads } from '../../Redux/enum/statusLeadAction';
import { getAllEnumFromServer } from '../../api/enum.api';
import "./pieGraph.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChartLead = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsStatus, setLeadsStatus] = useState<Enum[]>([]);
  const [leadStatusCount, setLeadStatusCount] = useState({
    "נסגר": 0,
    "ליד חדש": 0,
    "פגישת אפיון": 0,
    "הוצאת חשבונית": 0,
    "הועבר ללקוח": 0,
    "שיחה ראשונית": 0,
    "נשלחה הצעת מחיר": 0,
    "שיחת מעקב": 0,
    "שליחת הצעת מחיר": 0,
    "העברה להקמה בפועל": 0,
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const dispatch = useDispatch();
  const leadsState = useSelector((state: { leads: { allLeads: Lead[] } }) => state.leads);
  const leadStatus = useSelector((state: { statusLead: { allStatusLead: Enum[] } }) => state.statusLead);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (leadsState.allLeads.length) {
          data = leadsState.allLeads;
        } else {
          const resAllLeads = await getAllLeads();
          data = resAllLeads.data;
          dispatch(setAllLeads(data));
        }
        setLeads(data);

        let statusData;
        if (leadStatus.allStatusLead.length) {
          statusData = leadStatus.allStatusLead;
        } else {
          const resAllStatusLeads = await getAllEnumFromServer(5);
          statusData = resAllStatusLeads.data;
          dispatch(setAllStatusLeads(statusData));
        }
        setLeadsStatus(statusData);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchData();
  }, [dispatch, leadsState.allLeads, leadStatus.allStatusLead]);

  useEffect(() => {
    if (leads.length > 0) {
      statusCount();
    }
  }, [leads, selectedDate]);

  const statusCount = () => {
    const newLeadStatusCount = {
      "נסגר": 0,
      "ליד חדש": 0,
      "פגישת אפיון": 0,
      "הוצאת חשבונית": 0,
      "הועבר ללקוח": 0,
      "שיחה ראשונית": 0,
      "נשלחה הצעת מחיר": 0,
      "שיחת מעקב": 0,
      "שליחת הצעת מחיר": 0,
      "העברה להקמה בפועל": 0,
    };

    for (let index = 0; index < leads.length; index++) {
      const lead = leads[index];
      if (!selectedDate || new Date(lead.createdDate) >= selectedDate) {
        switch (lead.status) {
          case 'נסגר':
            newLeadStatusCount['נסגר'] += 1;
            break;
          case 'ליד חדש':
            newLeadStatusCount['ליד חדש'] += 1;
            break;
          case 'פגישת אפיון':
            newLeadStatusCount['פגישת אפיון'] += 1;
            break;
          case 'הוצאת חשבונית':
            newLeadStatusCount['הוצאת חשבונית'] += 1;
            break;
          case 'הועבר ללקוח':
            newLeadStatusCount['הועבר ללקוח'] += 1;
            break;
          case 'שיחה ראשונית':
            newLeadStatusCount['שיחה ראשונית'] += 1;
            break;
          case 'נשלחה הצעת מחיר':
            newLeadStatusCount['נשלחה הצעת מחיר'] += 1;
            break;
          case 'שיחת מעקב':
            newLeadStatusCount['שיחת מעקב'] += 1;
            break;
          case 'שליחת הצעת מחיר':
            newLeadStatusCount['שליחת הצעת מחיר'] += 1;
            break;
          case 'העברה להקמה בפועל':
            newLeadStatusCount['העברה להקמה בפועל'] += 1;
            break;
          default:
            console.warn(`Unknown status: ${lead.status}`);
        }
      }
    }
    setLeadStatusCount(newLeadStatusCount);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value ? new Date(event.target.value) : null);
  };

  const data = {
    labels: ["נסגר", "ליד חדש", "פגישת אפיון", "הוצאת חשבונית", "הועבר ללקוח", "שיחה ראשונית",
      "נשלחה הצעת מחיר", "שיחת מעקב", "שליחת הצעת מחיר", "העברה להקמה בפועל"],
    datasets: [
      {
        label: 'סטטוס',
        data: Object.values(leadStatusCount),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)', // Different colors for each status
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw as number;
            const percentage = ((value / Object.values(leadStatusCount).reduce((a, b) => a + b, 0)) * 100).toFixed(2);
            return `${percentage}%`;
          }
        }
      },
      datalabels: {
        display: false, // Hide data labels
      }
    }
  };

  return (
    <div>
      <div className='pieStyle'>
        <div className='pie'>
          <div className="legend-container">
            <ul className="legend-list">
              {Object.keys(leadStatusCount).map((status, index) => (
                <li key={status} style={{ color: data.datasets[0].borderColor[index] }}>
                  <span className="legend-color-box" style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}></span>
                  {status}
                </li>
              ))}
            </ul>
            <br></br>
            <br></br>

          </div>
          <div className="graphPie" style={{ width: '40%', height: '40%' }}>
            <Pie data={data} options={options} />
          </div>
        </div>
        <div id='dateFilter' className='filterDate'>
          <input
            type='date'
            onChange={handleDateChange}
          />
          סנן
        </div>
      </div>
    </div>
  );
};

export default PieChartLead;
