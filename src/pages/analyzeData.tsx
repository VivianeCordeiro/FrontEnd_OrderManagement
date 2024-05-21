// import { Chart } from 'chart.js';
// import React, { useEffect } from 'react';
// //import Chart from 'chart.js/auto'; // Importe o Chart.js

// type Order = {
//     id: number;
//     productName: string;
//     quantity: number;
//     price: number;
// };

// const AnalyzeData: React.FC = () => {
//     useEffect(() => {
//         // Cria o gráfico de pizza
//         const ctx = document.getElementById('pizzaChart') as HTMLCanvasElement;
//         new Chart(ctx, {
//             type: 'doughnut',
//             data: {
//                 labels: ['Produto A', 'Produto B', 'Produto C'],
//                 datasets: [{
//                     label: 'Pedidos',
//                     data: [30, 20, 50],
//                     backgroundColor: [
//                         'rgba(255, 99, 132, 0.6)',
//                         'rgba(54, 162, 235, 0.6)',
//                         'rgba(255, 206, 86, 0.6)',
//                     ],
//                     hoverOffset: 4
//                 }]
//             }
//         });
//     }, []);

//     const orders: Order[] = [
//         { id: 1, productName: 'Produto A', quantity: 2, price: 10 },
//         { id: 2, productName: 'Produto B', quantity: 1, price: 15 },
//         { id: 3, productName: 'Produto C', quantity: 3, price: 8 },
//     ];

//     return (
//         <div>
//             <h2>Gráfico de Pizza</h2>
//             <canvas id="pizzaChart" width="400" height="400"></canvas>

//             <h2>Listagem de Pedidos</h2>
//             <ul>
//                 {orders.map((order) => (
//                     <li key={order.id}>
//                         {order.productName} - Quantidade: {order.quantity} - Preço: {order.price}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default AnalyzeData;

import React from 'react';
import ReactApexChart from 'react-apexcharts';

function AnalyzeData() {
    const options = {
        chart: {
            type: 'pie' as 'pie', // Casting 'type' explicitamente
        },
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        theme: {
            monochrome: {
                enabled: true
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -5
                }
            }
        },
        title: {
            text: "Monochrome Pie"
        },
        dataLabels: {
            formatter(val: number, opts: any) {
                const name = opts.w.globals.labels[opts.seriesIndex];
                return `${name}: ${val.toFixed(1)}%`; // Retornando uma string concatenada
            }
        },
        legend: {
            show: false
        }
    };

    const series = [25, 15, 44, 55, 41, 17];

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
            <ReactApexChart options={options} series={series} type="pie" width="100%" />
        </div>
    );
}

export default AnalyzeData;
