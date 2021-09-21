import {useState, useEffect} from 'react';
import { LinearProgress } from "@material-ui/core";

import api from '../../services/api';

import './styles.scss';

type acudeType = {
	Nome: string;
    Bacia: string;
    Município: string;
    'Capac. Máxima (m³)': string | number;
    'Volume Atual (m³)': string | number;
    'Volume total (%)': string;
    'Data do registro': string;
}

export function Volumes() {
    const [acudes, setAcudes] = useState([]);

    useEffect(() => {
        api.get('acudes').then(response => {
            const acudes = response.data;
            setAcudes(acudes);
        })
    }, []);

    return (

        <div>
            <section className="allVolumes">

                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th className="p">Nome</th>                            
                            <th className="s">Volume total (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {acudes.map((acude : acudeType) => {
                            return (
                                <tr key={acude.Nome}>                                
                                    <th>{acude.Nome}</th>
                                    
                                    { (Number(String(acude['Volume total (%)']).replace(",", ".")) > 50) ? (
                                        <th>
                                            <LinearProgress className="MuiLinearProgress-root" variant="determinate" value={Number(String(acude['Volume total (%)']).replace(",", "."))}/>
                                            {acude['Volume total (%)']}
                                        </th>
                                    ) : (
                                        <th>
                                            <LinearProgress color="secondary" variant="determinate" value={Number(String(acude['Volume total (%)']).replace(",", "."))}/>
                                            {acude['Volume total (%)']}                                        
                                        </th>
                                    )}                                    
                                    
                                </tr>                     
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </div>
        
    );
}