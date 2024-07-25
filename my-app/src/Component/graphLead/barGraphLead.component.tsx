// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Scale } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { Lead } from '../../model/leads.model';
// import { useDispatch, useSelector } from 'react-redux';
// import { Enum } from '../../model/enum.model';
// import { getAllLeads } from '../../api/leads.api';
// import { setAllLeads } from '../../Redux/Leads/leadsAction';
// import { getAllEnumFromServer } from '../../api/enum.api';
// import { setAllStatusLeads } from '../../Redux/enum/statusLeadAction';
// import "./graph.css";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

// const BarChart = () => {
//     const [leads, setLeads] = useState<Lead[]>([]);
//     const [leadsStatus, setLeadsStatus] = useState<Enum[]>([]);
//     const [leadStatusCount, setLeadStatusCount] = useState({
//         "נסגר": 0,
//         "העברה להקמה בפועל": 0,
//     });
//     const total = leadStatusCount["נסגר"] + leadStatusCount["העברה להקמה בפועל"];
//     const closeLead = ((leadStatusCount["נסגר"] / total) * 100).toFixed(2);
//     const passLead = ((leadStatusCount["העברה להקמה בפועל"] / total) * 100).toFixed(2);

//     const dispatch = useDispatch();
//     const leadsState = useSelector((state: { leads: { allLeads: Lead[] } }) => state.leads);
//     const leadStatus = useSelector((state: { statusLead: { allStatusLead: Enum[] } }) => state.statusLead);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 let data;
//                 if (leadsState.allLeads.length) {
//                     data = leadsState.allLeads;
//                 } else {
//                     const resAllLeads = await getAllLeads();
//                     data = resAllLeads.data;
//                     dispatch(setAllLeads(data));
//                 }
//                 setLeads(data);

//                 let statusData;
//                 if (leadStatus.allStatusLead.length) {
//                     statusData = leadStatus.allStatusLead;
//                 } else {
//                     const resAllStatusLeads = await getAllEnumFromServer(5);
//                     statusData = resAllStatusLeads.data;
//                     dispatch(setAllStatusLeads(statusData));
//                 }
//                 setLeadsStatus(statusData);
//             } catch (error) {
//                 console.error('Error fetching leads:', error);
//             }
//         };

//         fetchData();
//     }, [dispatch, leadsState.allLeads, leadStatus.allStatusLead]);

//     useEffect(() => {
//         if (leads.length > 0) {
//             statusCount();
//         }
//     }, [leads]);

//     const statusCount = () => {
//         const newLeadStatusCount = { "נסגר": 0, "העברה להקמה בפועל": 0 };
//         leads.forEach((lead) => {
//             switch (lead.status) {
//                 case 'נסגר':
//                     newLeadStatusCount['נסגר'] += 1;
//                     break;
//                 case 'העברה להקמה בפועל':
//                     newLeadStatusCount['העברה להקמה בפועל'] += 1;
//                     break;
//                 default:
//                     console.warn(`Unknown status: ${lead.status}`);
//             }
//         });
//         setLeadStatusCount(newLeadStatusCount);
//     };

//     const totalLeads = leads.length;
//     const getPercentage = (count: number) => ((count / totalLeads) * 100).toFixed(2) + '%';

//     const data = {
//         labels: ['נסגרו', 'הועברו לפרויקט'],
//         datasets: [
//             {
//                 label: 'סטטוס לידים',
//                 data: [closeLead, passLead],
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 display: false,
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function (context:any) {
//                         const value = context.raw as number;
//                         return value + '%';
//                     }
//                 }
//             }
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 max: 100,
//                 ticks: {
//                     callback: function (this: Scale, value: string | number) {
//                         return value + '%';
//                     }
//                 }
//             }
//         }
//     };

//     return <div className='bar'>
//         <Bar data={data} options={options} />
//         <button>סינון לפי תאריך</button>
//         </div>;
// };

// export default BarChart;


import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Scale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Lead } from '../../model/leads.model';
import { useDispatch, useSelector } from 'react-redux';
import { Enum } from '../../model/enum.model';
import { getAllLeads } from '../../api/leads.api';
import { setAllLeads } from '../../Redux/Leads/leadsAction';
import { getAllEnumFromServer } from '../../api/enum.api';
import { setAllStatusLeads } from '../../Redux/enum/statusLeadAction';
import "./graph.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarChart = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [leadsStatus, setLeadsStatus] = useState<Enum[]>([]);
    const [leadStatusCount, setLeadStatusCount] = useState({
        "נסגר": 0,
        "העברה להקמה בפועל": 0,
    });
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State for selected date

    const total = leadStatusCount["נסגר"] + leadStatusCount["העברה להקמה בפועל"];
    const closeLead = total ? ((leadStatusCount["נסגר"] / total) * 100).toFixed(2) : '0';
    const passLead = total ? ((leadStatusCount["העברה להקמה בפועל"] / total) * 100).toFixed(2) : '0';

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
        const newLeadStatusCount = { "נסגר": 0, "העברה להקמה בפועל": 0 };
        leads.filter((lead) => {
            if (!selectedDate) 
                return true;
            return new Date(lead.createdDate) >= selectedDate;
        }).forEach((lead) => {
            switch (lead.status) {
                case 'נסגר':
                    newLeadStatusCount['נסגר'] += 1;
                    break;
                case 'העברה להקמה בפועל':
                    newLeadStatusCount['העברה להקמה בפועל'] += 1;
                    break;
                default:
                    console.warn(`Unknown status: ${lead.status}`);
            }
        });
        setLeadStatusCount(newLeadStatusCount);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value ? new Date(event.target.value) : null);
    };

    const data = {
        labels: ['נסגרו', 'הועברו לפרויקט'],
        datasets: [
            {
                label: 'סטטוס לידים',
                data: [closeLead, passLead],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context:any) {
                        const value = context.raw as number;
                        return value + '%';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function (this: Scale, value: string | number) {
                        return value + '%';
                    }
                }
            }
        }
    };

    return (
        <div className='bar'>
            <Bar data={data} options={options} />
            <div id='dateFilter' className='hidden'>
                <input 
                    type='date' 
                    onChange={handleDateChange} 
                />
                 סנן  
            </div>
        </div>
    );
};

export default BarChart;
