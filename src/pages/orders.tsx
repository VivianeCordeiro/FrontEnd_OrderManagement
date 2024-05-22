import { useState, ChangeEvent } from 'react';
import { Button, Card, Modal } from 'antd';
import * as XLSX from 'xlsx';
import './stylePages.scss';
import { useNavigate } from 'react-router-dom';
import { OrderTable } from '../models/orderTable';
import { handleSubmit } from '../utils/handleSubmit';

const apiUrl = 'https://localhost:44310/DataManagement';

function Orders() {
    const navigate = useNavigate();
    const [modalTable, setModalTable] = useState<boolean>(false);
    const [excelData, setExcelData] = useState<OrderTable[]>([]);

    function ordersModal(): JSX.Element {
        return (
            <div>
                <Modal
                    open={modalTable}
                    closeIcon={true}
                    onCancel={() => setModalTable(false)}
                    onOk={() => handleSubmit(apiUrl, excelData, setModalTable, responseData => {
                        navigate("/analyzeData", { state: responseData });
                    })}
                >
                    <input type="file" onChange={handleFileChange} />
                </Modal>
            </div>
        );
    }

    const readAndConvertExcelFile = (file: File): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1 });
                    const header = jsonData.shift() || [];
                    const filteredData = jsonData.filter(row => row.some(cell => cell !== null && cell.toString().trim() !== ''));
                    const formattedData = filteredData.map(row => {
                        const obj: any = {};
                        header.forEach((attr, index) => {
                            obj[attr] = row[index];
                        });
                        return obj;
                    });

                    resolve(formattedData);
                } else {
                    reject(new Error('Evento FileReader não possui alvo'));
                }
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const convertExcelDateToJSDate = (excelDate: number): string => {
        const jsDate = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
        return jsDate.toISOString().split('T')[0];
    };

    const formatDocument = (document: any): string => {
        return document ? String(document).replace(/[\.\-\/]/g, '') : '';
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            readAndConvertExcelFile(file)
                .then((jsonData) => {
                    const data: OrderTable[] = jsonData.map((item: any) => ({
                        Documento: formatDocument(item.Documento),
                        CEP: item.CEP,
                        Date: typeof item.Data === 'number' ? convertExcelDateToJSDate(item.Data) : item.Data,
                        NumeroPedido: item['Número do pedido'],
                        Produto: item.Produto,
                        RazaoSocial: item['Razão Social']
                    }));
                    setExcelData(data);
                })
                .catch((error) => {
                    console.error('Erro ao ler e converter o arquivo XLSX:', error);
                });
        }
    };

    return (
        <>
            {ordersModal()}
            <div className='order'>
                <Card className='card'>
                    <p>A Onion S.A pioneira na indústria de eletrônicos, comprometida com a inovação e avanços tecnológicos. Nosso portfólio inclui produtos como smartphones, smart TVs e notebooks.</p>
                </Card>
                <Card  className='card'>
                    <p>Essa aplicação é uma ferramenta online totalmente gratuita para gerenciar seus dados de forma prática e rápida.</p>
                </Card>
                <Card  className='card'>
                    <p>Para começar a usar nosso sistema, faça o <a href="https://docs.google.com/spreadsheets/d/1c0nwVOmEHgqMheW-dYs886lBVGHLr8NC/edit?usp=sharing&ouid=113300974879507968748&rtpof=true&sd=true" download>download da planilha modelo</a> . Com ela, você poderá importar facilmente seus pedidos e visualizar gráficos de vendas por região e por produto.</p>
                </Card>
                <Card  className='card' >
                    <p>A lista de vendas será automaticamente gerada após inserir a planilha de dados no sistema, simplificando ainda mais o processo de análise e gerenciamento dos seus pedidos.</p>
                </Card>
            </div>
            <div>
                <Button className='button' size="middle" onClick={() => setModalTable(true)}>Adicionar Tabela</Button>
            </div>
        </>
    );
}

export default Orders;
