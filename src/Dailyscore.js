import React, { useState, useEffect} from "react";
import './style.css';
import DataTable from 'react-data-table-component';
import { createTheme } from "react-data-table-component";
import Linechart from "./Linechart";


import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Drawer, Space, Button,Modal,Breadcrumb } from 'antd';
import SideBar from "./AntSider";

export default function Dailyscore() {
  const [Playersownerslist, setPlayerownersslist] = useState([]);
  const [Teamsstats, setTeamsstats] = useState([])
  const [timsestamps, setTimestamps] = useState([]);

  const [showplayers, setShowPlayers] = useState([])
  const [teamname,setSelectedteamname] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false);
 

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
    async function getallsoldplayers(){
      try {
        const response = await fetch(baseURL+'/getallsoldplayers');
        if(response.ok){
          const data = await response.json();
          //console.log(data)
          setPlayerownersslist(data);
        } else {
          console.log('Error: ' + response.status + response.body);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getallsoldplayers();
  }, [])

  useEffect(() => {
    async function getallteampoints(){
      try {
        const response = await fetch(baseURL+'/getallownersdata');
        if(response.ok){
          const stats = await response.json();
          //console.log(data)
          setTeamsstats(stats);
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

  const teamData = Playersownerslist.reduce((acc, player) => {
    if (!acc[player.ownerTeam]) {
      acc[player.ownerTeam] = [];
      acc[player.ownerTeam].teamplayerpoints = 0;
    }
    acc[player.ownerTeam].push({ name: player.name, points: player.points });
    acc[player.ownerTeam].teamplayerpoints += player.points
    return acc;
  }, {});

  const teampoints = Teamsstats.reduce((tcc, teams) => {
    if (!tcc[teams.ownerName]) {
      tcc[teams.ownerName] = teams.totalPoints;
    }
    return tcc;
  }, {});
  
  const data = [];
  const teamtotalpoints = teampoints

  for (const [teamName, players] of Object.entries(teamData)) {
    const team = {
      teamName: teamName,
      totalpoint:teamtotalpoints[teamName],
      players: players,
    };
    data.push(team);
  }


/*
  const columnDefs = [
    { field: "teamName", headerName: "Team", width: 200, filter: true},
    { field: "sqaudsize", headerName: "Squad Size", width: 120, filter: true },
    { field: "purse", headerName: "Remaining Purse", width: 150,filter: true },
  ];*/

  const gridOptions = {
    rowSelection: 'single', // enable single-row selection mode
    onRowSelected: (event) => {
      if (event.node.isSelected()) {
        // handle row selection
        const selectedRow = event.node.data;
        setSelectedteamname(selectedRow.teamName)
        setShowPlayers(selectedRow.players)
        setIsModalOpen(true);
      } 
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const defaultColDef = {
    sortable: true,
    resizable: true,
    //filter: true,
  };

  const playerColumns = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Points', field: 'points' ,width:100,sort: "desc"},
  ];


  return(


    <SideBar pagedata={
      <>
      {timsestamps[0] &&
      <Breadcrumb style={breadcrumbStyle} separator=" ">
      <Breadcrumb.Item style={firstItemStyle}>Points Updated At {timsestamps[0].pointsUpdatedAt}</Breadcrumb.Item>
      </Breadcrumb>}
    <div style={{display:"flex",flexDirection:"row"}}>
      <div className="ag-theme-alpine-dark" style={ {height:"77vh",width:"85vw"} }>
     <AgGridReact
      rowData={data}
      gridOptions={gridOptions}
      columnDefs={[
        { cellRenderer: (params) => params.rowIndex + 1, headerName: "#", width: 80 },
        { field: "teamName", headerName: "Team Name", width: 200 },
        { field: "totalpoint", headerName: "Points", width: 120, sort: "desc" },
      ]}
      />
     </div>
     </div>
     <div>
      <Modal title={teamname + " players"} style={{ top: 20 }} open={isModalOpen} onOk={handleOk} onCancel={handleOk} bodyStyle={{ background: '#1f1f1f', color: '#fff' }} cancelButtonProps={{ style: { display: 'none' } }}>
      {
          <div className="ag-theme-alpine" style={ {height:"75vh"} }>
          <AgGridReact
          rowData={showplayers}
          columnDefs={playerColumns}
          defaultColDef={defaultColDef}/>
          </div>
        }
      </Modal>
     </div>
     </>}
     />
  )
  
  
}
