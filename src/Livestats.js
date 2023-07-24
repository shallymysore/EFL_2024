import React, { useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Breadcrumb } from 'antd';
import SideBar from "./AntSider";

export default function Livestats() {
    const [Allplayers, setAllPlayerslist] = useState([]);
    const [activePlayers, setActivePlayers] = useState([]);
    const [timsestamps, setTimestamps] = useState([]);
  
    const baseURL = process.env.REACT_APP_BASE_URL;

    const breadcrumbStyle = {
        display: 'flex',
        //justifyContent: 'space-between',
      };
    
      const firstItemStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        fontWeight:'bold',
        color:'red'
      };
  
    useEffect(() => {
      async function getallactiveplayerslist() {
        try {
          const response = await fetch(
            baseURL+'/getallplayers'
          );
          if (response.ok) {
            const data = await response.json();
            setAllPlayerslist(data);
            setActivePlayers(data.filter((item) => item.isAvailable === true));
          } else {
            console.log('Error: ' + response.status + response.body);
          }
        } catch (error) {
          console.error(error);
        }
      }
      getallactiveplayerslist();
    }, []);

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


    const defaultColDef = {
        sortable: true,
        resizable: true,
        //filter: true,
      };
    
    const playerColumns = [
        { field: "name", headerName: "Name", width: 140, filter: true},
        { field: "ownerTeam", headerName: "Owner", width: 140, filter: true,sort: "desc" },
        { field: "todayPoints", headerName: "Points", width: 100},
        { field: "status", headerName: "Status", width: 100,filter: true },
        { field: "iplTeam", headerName: "IPL Team", width: 120, filter: true },
      ];

    const getRowStyle = (params) => {
        const Teams = params.data.ownerTeam;
        switch (Teams) {
            case "Bhaisaab's Royal Fixers":
                return { backgroundColor: "rgba(255, 206, 86, 0.5)" };
            case "Dad's Army":
                return { backgroundColor: "rgba(255, 99, 71, 0.5)" };
            case "Gajjab Gujjus":
                return { backgroundColor: "rgba(106, 209, 98, 0.5)" };
            case "Lions of Mirzapur":
                return { backgroundColor: "rgba(54, 162, 235, 0.5)" };
            case "My Lord Dilliboy":
                return { backgroundColor: "rgba(153, 102, 255, 0.5)" };
            case "No Mercy Any More":
                return { backgroundColor: "rgba(255, 159, 64, 0.5)" };
            case "One Pitch One Hand":
                return { backgroundColor: "rgba(200, 142, 144, 0.5)" };
            case "Untouchaballs":
                return { backgroundColor: "rgba(75, 192, 192, 0.5)" };
            default:
                return null;
        }
    };

return(
    <SideBar pagedata={
        <>
        {timsestamps[0] &&
            <Breadcrumb style={breadcrumbStyle} separator=" ">
            <Breadcrumb.Item style={firstItemStyle}>Points Updated At {timsestamps[0].pointsUpdatedAt}</Breadcrumb.Item>
            </Breadcrumb>}
    <div className="ag-theme-alpine-dark" style={ {height:"75vh",width:"85vw"} }>
          <AgGridReact
          rowData={activePlayers}
          columnDefs={playerColumns}
          defaultColDef={defaultColDef}
          getRowStyle={getRowStyle}/>
          </div>
          </>}/>

)
}