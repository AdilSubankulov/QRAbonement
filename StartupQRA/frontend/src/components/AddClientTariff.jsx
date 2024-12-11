import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddClientTariff.css';
import addplus from '../assets/addplus.svg';

function AddClientTariff() {
    const navigate = useNavigate();

    return (
        <>
            <div className="right-bar">
                <div className="add-btns">
                    <div className="tariffs">
                        <button className="add-tariff-btn">
                            <h1 className="tariffs-h1">tariffs</h1>
                        </button>
                    </div>
                    <div className="add-tariff">
                        <button className="add-tariff-btn">
                            <h1 className="tariff-h1">add tariff</h1>
                            <img src={addplus} alt="addtariff" />
                        </button>
                    </div>
                    <div className="add-client">
                        <button 
                            className="add-tariff-btn" 
                            onClick={() => navigate('/clients/add')}
                        >
                            <h1 className="client-h1">add client</h1>
                            <img src={addplus} alt="addclient" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddClientTariff;
