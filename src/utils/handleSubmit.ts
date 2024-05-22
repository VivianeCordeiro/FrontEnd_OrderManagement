export const handleSubmit = (
    url: string,
    excelData: any[],
    setModalTable: React.Dispatch<React.SetStateAction<boolean>>,
    onResponse: (responseData: any) => void 
) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(excelData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        onResponse(data); 
    })
    .catch(error => {
        console.error('Error:', error);
    });

    setModalTable(false); 
};
