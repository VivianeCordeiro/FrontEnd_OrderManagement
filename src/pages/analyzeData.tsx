import { useLocation } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import './stylePages.scss';
import { Sales } from '../models/orderTable';

function AnalyzeData() {
    const location = useLocation();
    const state = location.state;
    const { celular, notebook, televisao } = state;
    const { norte, nordeste, sul, sudeste, centroOeste } = state;

    const optionsByRegion = {
        chart: {
            type: 'pie' as 'pie',
        },
        labels: Object.keys(state).filter(key => key !== 'sales'), 
    };

    const seriesByRegion = [norte, nordeste, sul, sudeste, centroOeste];

    const optionsByDevice = {
        chart: {
            type: 'pie' as 'pie',
        },
        labels: ['Celular', 'Notebook', 'Televisão'],
    };

    const seriesByDevice = [celular, notebook, televisao];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ width: '35%' }}>
                    <h2>Vendas por Região</h2>
                    <ReactApexChart options={optionsByRegion} series={seriesByRegion} type="pie" width="100%" />
                </div>
                <div style={{ width: '35%' }}>
                    <h2>Vendas por Tipo de Produto</h2>
                    <ReactApexChart options={optionsByDevice} series={seriesByDevice} type="pie" width="100%" />
                </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div >
                    <h2>Vendas</h2>
                    <table >
                        <thead>
                            <tr>
                                <th className='tableTH' >Nome do Cliente</th>
                                <th className='tableTH'>Produto</th>
                                <th className='tableTH'>Valor (R$)</th>
                                <th className='tableTH'>Data de Entrega</th>
                            </tr>
                        </thead>
                        <tbody >
                            {state.sales.map((sale: Sales, index: number) => (
                                <tr key={index}>
                                    <td style={{ padding: '10px' }}>{sale.name}</td>
                                    <td style={{ padding: '10px' }}>{sale.product}</td>
                                    <td style={{ padding: '10px' }}>{sale.finalValue.toFixed(2)}</td>
                                    <td style={{ padding: '10px' }}>{sale.deliveryDate.toString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AnalyzeData;
