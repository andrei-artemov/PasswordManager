import React from 'react';
import './DashboardItem.css';
import PropTypes from 'prop-types';

export default function DashboardItem({ row, deleteRow, editRow, saveRow }) {
    return (
        <li className="DashboardItem">
            <p>
                <div className="dashboardItem-content">
                    <p className="dashboardItem-content__siteName">{row.siteName}</p>
                    <p className="dashboardItem-content__login">{row.login}</p>
                    <p className="dashboardItem-content__password">{row.password}</p>
                </div>
                <button className="btn btn-edit btn-secondary" onClick={() => editRow(row.id)}>Edit</button>
                <button className="btn btn-save btn-secondary" onClick={() => saveRow(row.id)}>Save</button>
                <button className="btn btn-addto btn-secondary" onClick={() => deleteRow(row.id)}>Remove</button>
            </p>
        </li>
    )
}

DashboardItem.propTypes = {
    row: PropTypes.object.isRequired,
    deleteRow: PropTypes.func.isRequired,
    addRow: PropTypes.func.isRequired,
    editRow: PropTypes.func.isRequired,
}
 