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
    'Volume total (%)': string | number;
    'Data do registro': string;
}

export function Acudes() {
    const [acudes, setAcudes] = useState([]);

    useEffect(() => {
        api.get('acudes').then(response => {
            const acudes = response.data;
            setAcudes(acudes);
        })
    }, []);

    return (
        <div className="home">

            <header>
                <h2>Todos os Açudes</h2>

                <p>Informações dos açudes da PB</p>

                <span>+ Infos</span>
            </header>

            <section className="allAcudes">

                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Bacia</th>
                            <th>Município</th>
                            <th>Capac. Máxima (m³)</th>
                            <th>Volume Atual (m³)</th>
                            <th>Volume total (%)</th>
                            <th>Data do registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {acudes.map((acude : acudeType) => {
                            return (
                                <tr key={acude.Nome}>                                
                                    <th>{acude.Nome}</th>
                                    <th>{acude.Bacia}</th>
                                    <th>{acude.Município}</th>
                                    <th>{acude['Capac. Máxima (m³)']}</th>
                                    <th>{acude['Volume Atual (m³)']}</th>
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
                                    <th>{acude['Data do registro']}</th>
                                </tr>                     
                            )
                        })}
                    </tbody>
                </table>
            </section>

        </div>
    );
}