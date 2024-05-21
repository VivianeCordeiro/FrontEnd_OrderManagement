import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import * as XLSX from 'xlsx';
import { ChangeEvent } from 'react';
import './stylePages.scss'
import { useNavigate } from 'react-router-dom';

function Orders() {
    const navigate = useNavigate();
    const [modalTable, setModalTable] = useState<boolean>(false);
    function ordersModal(): JSX.Element {
        console.log("aqui");
        
        return (
            <div>
                <Modal open={modalTable} closeIcon={true} onCancel={() => setModalTable(false)}>
                    <input type="file" onChange={handleFileChange} />
                </Modal>
            </div>
        )
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

                    // Extrair a primeira linha como o cabeçalho dos atributos
                    const header = jsonData.shift() || [];

                    // Filtrar apenas as linhas que possuem algum conteúdo
                    const filteredData = jsonData.filter(row => row.some(cell => cell !== null && cell.toString().trim() !== ''));

                    // Mapear as demais linhas para objetos usando o cabeçalho como chaves
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


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            readAndConvertExcelFile(file)
                .then((jsonData) => {
                    console.log('JSON Data:', jsonData);
                    // Aqui você pode fazer o que quiser com os dados JSON
                })
                .catch((error) => {
                    console.error('Erro ao ler e converter o arquivo XLSX:', error);
                });
        }
    };
    return (
        <>
            {ordersModal()}
            <div>
                <Button size="middle" onClick={e => setModalTable(true)}>Adicionar Tabela</Button>
                <Button size="middle" onClick={e => navigate("/analyzeData")}>teste</Button>
            
            </div>
        </>

    )
}
export default Orders;