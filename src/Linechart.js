import React, { useState, useEffect } from "react";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";
import SideBar from "./AntSider";
import { Breadcrumb } from 'antd';
import './style.css';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


export default function Linechart() {
    const [chartData, setChartData] = useState(null);
    const [teamsdata, setTeamData] = useState([]);
    const [timsestamps, setTimestamps] = useState([]);
    const baseURL = process.env.REACT_APP_BASE_URL;

    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    const breadcrumbStyle = {
      display: 'flex',
      //justifyContent: 'space-between',
    };
  
    const secondItemStyle = {
      display: 'flex',
      justifyContent: 'center',
      fontWeight:'bold',
      color:'green'
    };

    useEffect(() => {
        async function getallteampoints(){
          try {
            const response = await fetch(baseURL+'/getallownersdata');
            if(response.ok){
              const dat = await response.json();
              //console.log("x",dat)
              setTeamData(dat);
            } else {
              console.log('Error: ' + response.status + response.body);
            }
          } catch (error) {
            console.error(error);
          }
        }
        getallteampoints();
      }, [])

      useEffect(() => {
        async function gettimestamps(){
          try {
            const response = await fetch(baseURL+'/gettimestamps');
            if(response.ok){
              const data = await response.json();
              setTimestamps(data);
            } else {
              console.log('Error: ' + response.status + response.body);
            }
          } catch (error) {
            console.error(error);
          }
        }
        gettimestamps();
      }, [])

      const options = {
        animation: {
            duration: 0,
          },
          plugins: {
            legend: true,
            title: {
              display: true,
              text: () => "standings"
            }
          },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days'
                }
              },
            y: {
                reverse: true,
                title: {
                    display: true,
                    text: 'Rank'
                }
              }
          }
      };

    useEffect(() => {
        if (teamsdata && teamsdata.length > 0) {
            const [team1, team2, team3, team4, team5, team6, team7, team8] = teamsdata;
            const numDays = team1.standing.length;
            //const numDays = 7;
            const labels = Array.from({ length: numDays }, (_, i) => `day${i + 1}`);
            const datasets = [
                {
                    label: team1.ownerName,
                    data: team1.standing,
                    //data: [1,2,4,6,7,2,3],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(255, 206, 86, 0.5)",
                    backgroundColor:"rgba(255, 206, 86, 0.5)"
                },
                {
                    label: team2.ownerName,
                    data: team2.standing,
                    //data:[2,4,7,3,6,5,1],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(255, 99, 71, 0.5)",
                    backgroundColor: "rgba(255, 99, 71, 0.5)"
                },
                {
                    label: team3.ownerName,
                    data: team3.standing,
                    //data:[3,7,6,2,5,1,5],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(106, 209, 98, 0.5)",
                    backgroundColor: "rgba(106, 209, 98, 0.5)"
                },
                {
                    label: team4.ownerName,
                    data: team4.standing,
                    //data:[4,6,2,7,1,3,4],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(54, 162, 235, 0.5)",
                    backgroundColor: "rgba(54, 162, 235, 0.5)"
                },
                {
                    label: team5.ownerName,
                    data: team5.standing,
                    //data:[5,5,3,1,4,6,7],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(153, 102, 255, 0.5)",
                    backgroundColor: "rgba(153, 102, 255, 0.5)"
                },
                {
                    label: team6.ownerName,
                    data: team6.standing,
                    //data:[6,1,5,4,3,7,2],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(255, 159, 64, 0.5)",
                    backgroundColor: "rgba(255, 159, 64, 0.5)"
                },
                {
                    label: team7.ownerName,
                    data: team7.standing,
                    //data:[7,3,1,5,2,4,6],
                    fill: false,
                    tension: 0.4,
                    curve: 'smooth',
                    borderColor: "rgba(200, 142, 144, 0.5)",
                    backgroundColor: "rgba(200, 142, 144, 0.5)"
                },
                {
                  label: team8.ownerName,
                  data: team8.standing,
                  //data:[8,1,5,2,3,4,6],
                  fill: false,
                  tension: 0.4,
                  curve: 'smooth',
                  borderColor: "rgba(75, 192, 192, 0.5)",
                  backgroundColor: "rgba(75, 192, 192, 0.5)"
              }
            ];
            const data = { labels, datasets };
            
            setChartData(data);
        // re-render the Linechart whenever the teamsStats prop changes
        };
    },[teamsdata])
    return (
      <SideBar pagedata={
        <>
        {timsestamps[0] &&
        <Breadcrumb style={breadcrumbStyle} separator=" ">
          <Breadcrumb.Item style={secondItemStyle}>Standing Updated At {timsestamps[0].rankingsUpdatedAt}</Breadcrumb.Item>
        </Breadcrumb>}
        {isPortrait ? (
           <div className="chart" style={{height:"77vh",overflowX:"auto",aspectRatio:1}}>
           {chartData && <Line data={chartData} options={options} />}
       </div>
        ):(
        <div className="chart" style={{height:"77vh",overflow:"auto",aspectRatio:1.8}}>
            {chartData && <Line data={chartData} options={options} />}
        </div>)}
        </>
      }/>
    );
}