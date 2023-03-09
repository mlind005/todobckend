import React, { useEffect, useState } from 'react'
import Chart from "chart.js/auto"
import { CategoryScale } from 'chart.js'
import { Bar } from "react-chartjs-2"
import axios from 'axios'

Chart.register(CategoryScale)
const Port = "http://localhost:6969/api/v1"

const samData = [

    { date: '2018-01-15', total: 1, done: 0, undone: 1 },

    { date: '2020-03-07', total: 2, done: 1, undone: 1 },

    { date: '2020-03-22', total: 1, done: 0, undone: 1 },

    { date: '2022-01-06', total: 1, done: 0, undone: 1 }
    ,
    { date: '2022-02-02', total: 1, done: 0, undone: 1 }
    ,
    { date: '2022-12-08', total: 1, done: 1, undone: 0 }
    ,
    { date: '2023-01-11', total: 1, done: 1, undone: 0 }
    ,
    { date: '2023-02-15', total: 1, done: 0, undone: 1 }
    ,
    { date: '2023-03-03', total: 3, done: 2, undone: 1 }
    ,
    { date: '2023-03-05', total: 1, done: 1, undone: 0 }
    ,
    { date: '2023-03-07', total: 1, done: 1, undone: 0 }
    ,
    { date: '2023-03-08', total: 5, done: 2, undone: 3 }
    ,
    { date: '2023-06-07', total: 1, done: 1, undone: 0 }
]



const Chartformat = (api) => {

    return ({

        labels: api.map((data) => data.date),
        datasets: [
            {
                label: "Done Tasks",
                data: api.map((data) => data.done),
                backgroundColor: [
                    "lightgreen",
                    // "rgba(1,1,1,,0.5)",

                ],
                // borderColor: "black",
                borderWidth: 2
            },
            {
                label: "total Tasks",
                data: api.map((data) => data.total),
                backgroundColor: [
                    "rgba(53, 162, 235, 0.5)"

                ],
                borderColor: "black",
                borderWidth: 2
            },]

    }
    )
}






const Charts = () => {
    const [api, SetAPi] = useState(samData)
    const [allYears,setAllYears] = useState([])

    useEffect(() => {
        GetData()
    }, [])
    const GetData = async () => {
        try {
            let res = await axios.get(`${Port}/Alltodos`)
            let Data = res.data.todos

            var Dates = [...new Set(Data.map((cur) => cur.date))]
            
            // sorting Dates in accending order 
            Dates = Dates.sort(function (a, b) {
                const date1 = new Date(a)
                const date2 = new Date(b)
                return date2 - date1;
            })
            
            
            var yearArray = [...new Set( Dates.map((date)=>date.substring(0,4)))]
          

            const FinalData = Dates.map((date) => {
                let total = Data.filter(x => (x.date === date)).length
                let done = Data.filter(el => (el.date === date && el.status === true)).length
                let undone = total - done
                return { date, total, done, undone }


            })

            SetAPi(FinalData)
            setAllYears(yearArray)
            setChartData(Chartformat(FinalData))
        }
        catch (err) { console.log(err) }
    }


 




const yearFilter=(year)=>{
    
    if(year==="--" && year==="")return

    // now we stored all Data in api state so use this 
    const AllData = api;
    const filteredData = AllData.filter((cur)=>cur.date.substring(0,4) === year)
    setChartData(Chartformat(filteredData))

}

    
    const filterChart = (date1, date2) => {
        
        const d1 = new Date(date1)
        const d2 = new Date(date2)

        if(d2<=d1){alert("please Enter valid Date Range")
        return
    }

    // now we stored all Data in api state so use this 
    const AllData = api;
    
       let filteredData = AllData.filter((cur)=>(d1 <= (new Date(cur.date))))
        filteredData = filteredData.filter((cur)=>(d2 >= (new Date(cur.date))));
        
        
        
        setChartData(Chartformat(filteredData))
        
    }


    
    
    
    const MonthFilter=(month)=>{
        // now we stored all Data in api state so use this 
        const AllData = api;
        
        let filteredData = AllData.filter((cur)=>(cur.date.substring(0,7)===month))
        
        setChartData(Chartformat(filteredData))
        
    }









    const [chartData, setChartData] = useState(Chartformat(api));
    const [fdate, setFdate] = useState({ sDate: "", eDate: "" })
    const [fyear, fsetYear] = useState("");
    const [fmonth,fsetMonth] = useState("");




       const resetALl = () => {
        GetData()
        setFdate({ sDate: "", eDate: "" })
        fsetYear("")
        fsetMonth("")

    }
    return (
        <div >
            <div className="chart-container" style={{ width: "80%", padding: "30px", border: "4px solid black", margin: "auto", backgroundColor: "white" }}>
                <h2 style={{ textAlign: "center" }}>Todos as per Dates stats</h2>
                <Bar
                    data={chartData}
                    options={{
                        scales: {
                            x: {
                                // stacked:true,
                                // overlapping:true,

                                beginAtZero: true,
                                ticks: {
                                    // forces step size to be 50 units
                                    stepSize: 1
                                }
                            },
                            y: {
                                // min:"2018-01-05",
                                // max:2050,

                                stacked: true,
                                beginAtZero: true
                            }
                        },
                        indexAxis: 'y'
                        // plugins: {
                        //     title: {
                        //         display: true,
                        //         text: "Users Gained betWeen 2016-2020"
                        //     },

                        // }
                    }}
                />
                <br />
                <br />
                <h3>Filters</h3>



<div className="row">

<div className='col-md-4'>
                <h5>Date range Filter</h5>
                From: <input type="date" value={fdate.sDate}
                    onChange={(e) => setFdate({ ...fdate, sDate: e.target.value })} />
                    <br />
                To: <input type="date" value={fdate.eDate}
                    onChange={(e) => setFdate({ ...fdate, eDate: e.target.value })} />
<br />
                <button onClick={() => { filterChart(fdate.sDate, fdate.eDate) }}>filter</button>
                
</div>
<div className='col-md-4'>
                    <h5>year filter</h5>

                <select  onChange={(e) => fsetYear(e.target.value)} value={fyear}>
                    {allYears.map((cur)=><option value={cur} key={cur} >{cur}</option>)}
                </select>

                <button onClick={()=>{yearFilter(fyear)}}>filter</button>
                
</div>
<div className='col-md-4'>
                    <h5>Month Filter</h5>
                    <input type="month" onChange={(e)=>{fsetMonth(e.target.value)}} value={fmonth} />
                    <button onClick={()=>MonthFilter(fmonth)}>filter</button>

</div>

</div>
<br />
                <button onClick={resetALl} className="btn btn-success btn-lg">Reset/Refresh</button>
                <div>
                </div>
            </div>

        </div>
    )
}

export default Charts 