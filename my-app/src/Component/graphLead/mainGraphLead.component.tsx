import React, { useEffect, useState } from 'react';
import BarChart from "./barGraphLead.component";
import PieChartLead from "./pieChartLead.component";
import "./graph.css";

export const DashboardGraph = () => {

    return (<div>
        <h1 className='h1'>אחוזי סטטוסים</h1>
        <div className="grafh">
            <div className="graph2" style={{ width: '30%', height: '30%' }}>
                <PieChartLead />
            </div>
            <div className="graph1" style={{ width: '30%', height: '30%' }}>
                <BarChart />
            </div>
        </div>
    </div>
    )
}





