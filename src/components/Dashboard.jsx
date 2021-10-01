import React from 'react'
import DashboardItem from './DashboardItem'
import PropTypes from 'prop-types';
import './Dashboard.css'

export default function Dashboard({ rows, deleteRow, editRow, saveRow }) {
    return (
        <ul className="Dashboard">
            {rows.map(row => {
                return (
                    <DashboardItem key={row.id} row={row} deleteRow={deleteRow} editRow={editRow} saveRow={saveRow}/>
                )
            })}
        </ul>
    )
}

Dashboard.propTypes = {
    rows: PropTypes.array.isRequired,
    deleteRow: PropTypes.func.isRequired,
    addRow: PropTypes.func.isRequired,
    editRow: PropTypes.func.isRequired,
    saveRow: PropTypes.func.isRequired,
}
