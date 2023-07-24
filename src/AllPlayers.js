import React, { useState, useEffect, useMemo} from "react";
import './style.css';
import DataTable, { createTheme } from 'react-data-table-component';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import SideBar from "./AntSider";


export default function AllPlayers() {
  const [Allplayers, setAllPlayerslist] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [soldPlayers, setSoldPlayers] = useState([]);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);

  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    async function getallplayerslist() {
      try {
        const response = await fetch(
          baseURL+'/getallplayers'
        );
        if (response.ok) {
          const data = await response.json();
          setAllPlayerslist(data);
          setFilteredPlayers(data.filter((item) => item.status !== 'sold'));
          setSoldPlayers(data.filter((item) => item.status !== 'sold'));
        } else {
          console.log('Error: ' + response.status + response.body);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getallplayerslist();
  }, []);
  
  const defaultColDef = {
    sortable: true,
    resizable: true,
    //filter: true,
  };

  const columnDefs = [
    { field: "name", headerName: "Name", width: 200, filter: true},
    { field: "iplTeam", headerName: "IPL Team", width: 120, filter: true },
    { field: "status", headerName: "Status", width: 150,filter: true },
    { field: "role", headerName: "Role", width: 120, filter: true },
    { field: "country", headerName: "Country", width: 120,filter: true },
    { field: "tier", headerName: "Tier", width: 80, filter: true },
    { field: "points", headerName: "Points", width: 95 },
    { field: "salaryNumber", headerName: "Salary", width: 100 },
    { field: "eflBase", headerName: "EFL Base Salary", width: 150 },
    { field: "rank", headerName: "Rank",sort:'asc', width: 100 },
  ];

  const getRowStyle = (params) => {
    const tier = params.data.tier;
    switch (tier) {
      case 1:
        return { backgroundColor: "lightgreen" };
      case 2:
        return { backgroundColor: "lightblue" };
      case 3:
        return { backgroundColor: "orange" };
      case 4:
        return { backgroundColor: "lightpink" };
      default:
        return null;
    }
  };

    
    const handleFilter = (e) => {
    const value = e.target.value;
    const filtered = soldPlayers.filter((player) =>
    player.name.toLowerCase().includes(value.toLowerCase()) ||
    player.iplTeam.toLowerCase().includes(value.toLowerCase()) ||
    player.role.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPlayers(filtered);
    };
    
    return (
    <SideBar pagedata={
      <div className="ag-theme-alpine-dark" style={ {height:"77vh",width:"82vw"} }>
    <AgGridReact
    rowData={filteredPlayers}
    columnDefs={columnDefs}
    defaultColDef={defaultColDef}
    getRowStyle={getRowStyle}
    onFilterChanged={handleFilter}
    //floatingFilter={true}
    />
     </div>}/>
    );
    }