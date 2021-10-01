import React, { useState } from "react";
import app from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import "./Home.css"
import Dashboard from "./Dashboard";

const Home = () => {
    const [passwordValue, setpasswordValue] = useState([])
    const [loginValue, setloginValue] = useState([])
    const [siteNameValue, setsiteNameValue] = useState([])
    let rowItem;
    try {
        rowItem = JSON.parse(localStorage.getItem('rowItem'))
        if (!rowItem) rowItem = [];
    } catch (e) {
        rowItem = [];
    }
    const [rows, setrow] = useState(rowItem)

// ==================================addRow=============================================

    const addRow = () => {
        const rowItem = {
            id: uuidv4(),
            siteName: siteNameValue,
            login: loginValue,
            password: passwordValue,
        }

        localStorage.setItem('rowItem', JSON.stringify([...rows, rowItem]))
            
        setrow([...rows, rowItem])
        setsiteNameValue([siteNameValue])
        setloginValue([loginValue])
        setpasswordValue([passwordValue])
    }

// ==================================deleteRow=============================================

    const deleteRow = (id) => {
        let rowItem = localStorage.getItem('rowItem');
        const rowItemParced = JSON.parse(rowItem)
        setrow(
            rows.filter(row => row.id !== id),
            localStorage.setItem('rowItem', JSON.stringify(rowItemParced.filter(rowItem => rowItem.id !== id))),
        )
    }

// ==================================editRow=============================================

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }


    let passToChange;
    const inputToChange = document.createElement('input');
    inputToChange.className = 'inputToChange';


    const editRow = (id) => {

        let dashboardRow = document.getElementById(id);

        var btnActive = document.querySelector('.active')

        if (dashboardRow.querySelector('.dashboardItem-content__password') && !btnActive ) {
            dashboardRow.querySelector('.btn-edit').classList.add("active");
            const passParagraph = dashboardRow.querySelector('.dashboardItem-content__password');
            const loginParagraph = dashboardRow.querySelector('.dashboardItem-content__login');
            passToChange = dashboardRow.querySelector('.dashboardItem-content__password').textContent;
            passParagraph.parentNode.removeChild(passParagraph);
            insertAfter(inputToChange, loginParagraph);
            inputToChange.value = passToChange;
        }
    }

// ==================================saveRow=============================================

    const saveRow = (id) => {

        let rowItem = localStorage.getItem('rowItem');
        const rowItemParced = JSON.parse(rowItem)
        console.log(rowItemParced);

        let dashboardRow = document.getElementById(id)

        if (dashboardRow.querySelector('.inputToChange')) {
            document.querySelector('.active').classList.remove("active");
            const passParagraph = document.createElement('p');
            passParagraph.className = 'dashboardItem-content__password';
            const loginParagraph = dashboardRow.querySelector('.dashboardItem-content__login');
            passToChange = inputToChange.value;
            inputToChange.parentNode.removeChild(inputToChange);
            insertAfter(passParagraph, loginParagraph);
            passParagraph.textContent = passToChange;
            rowItemParced.forEach(function(item) {
                console.log(item)
                if (item.id === id) {
                    item.password = passToChange;
                    localStorage.setItem('rowItem', JSON.stringify(rowItemParced))
                }
            })
        }
    }

// =======================================================================================

    return (
        <div className="home">
            <div className="container">
                <div className="row">
                    <h1>Your accounts</h1>
                    <div className="input-content">
                        <input type="text" value={siteNameValue} placeholder='Site Name' onChange={(element) => setsiteNameValue(element.target.value)}/>
                        <input type="text" value={loginValue} placeholder='Login' onChange={(element) => setloginValue(element.target.value)}/>
                        <input type="password" value={passwordValue} placeholder='Password' onChange={(element) => setpasswordValue(element.target.value)}/>
                        <button className="btn-add" onClick={addRow}>add</button>
                    </div>
                    <Dashboard rows={rows} deleteRow={deleteRow} editRow={editRow} saveRow={saveRow}/>
                    <button className="btn btn-signout btn-primary" onClick={() => {app.auth().signOut()}}>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home