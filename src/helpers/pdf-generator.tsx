import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@mui/material';
import ReportsIcon from 'components/icons/menu-icons/ReportsIcon';
import api from 'api/axios';

interface Host {
  id: string;
  name: string;
  email: string;
  phone: string;
  bracelet: string;
  ref: string;
  isOut: boolean;
  isPartner: string;
  createdAt: string;
  companions: Companions[];
}

// Define the main object interface
interface Companions {
  id: string;
  name: string;
  phone: string;
  bracelet: string;
  isOut: boolean;
  entranceId: string;
  createdAt: string;
  updatedAt: string;
}

const PdfGenerator: React.FC = () => {
  // Function to generate PDF with text and table
  const getData = async () => {
    const response = await api.get('/companions/reports');

    return response.data;
  };

  const generatePdf = async (all: number) => {
    const reportData = await getData();
    const doc = new jsPDF('l', 'mm', 'a4');
    console.log(reportData);
    //  const tableColumnHeaders = ['Nome', 'Telefone', 'Sócio', 'Cor da Pulseira', 'Hora'];
    let htmlContent = `
    <div style="font-size: 8px">
      <h2 style="margin-bottom: 25px">Lista de Entradas do Dia - ${new Date().toLocaleDateString()}</h2>
      <table style="width:40%; border-collapse: collapse;" border="1">
        <thead style="background-color: #c2b067; color: white;">
          <tr>
            <th style="padding: 5px;width:30px">Sócio</th>
            <th style="padding: 5px;width:200px">Nome</th>
            <th style="padding: 5px;width:180px">Convidado</th>
            <th style="padding: 5px;width:50px">Tipo</th>
            <th style="padding: 5px;width:60px">Telefone</th>
            <th style="padding: 5px;width:40px">Pulseira</th>
            <th style="padding: 5px; width:20px">Hora</th>
            <th style="padding: 5px;width:30px">Saída</th>
          </tr>
        </thead>
        <tbody>
  `;
    reportData.forEach((data: Host) => {
      const hourMinute =
        new Date(data.createdAt).getUTCHours().toString().padStart(2, '0') +
        ':' +
        new Date(data.createdAt).getUTCMinutes().toString().padStart(2, '0');
      if (all === 1) {
        htmlContent += `
      <tr>
        <td style="padding: 1px;"><span style='font-weight: bolder'> ${data.ref} </span></td>
        <td style="padding: 2px; width:150px"><span style='font-weight: bolder'> ${data.name} </span></td>
        <td style="padding: 1px;"><span style='font-weight: bolder'></span></td>
        <td style="padding: 1px;"><span style='font-weight: bolder'>${data.isPartner} </span></td>
        <td style="padding: 1px;"><span style='font-weight: bolder'>${data.phone} </span></td>
        <td style="padding: 1px;"><span style='font-weight: bolder'> ${data.bracelet}</span></td>
        <td style="padding: 1px;"><span style='font-weight: bolder'> ${hourMinute}</span></td>
            <td style="padding: 1px;"><input type="checkbox" ${data.isOut ? 'checked' : ''}></td>
      </tr>
  `;
      } else if (all === 2 && !data.isOut) {
        htmlContent += `
        <tr>
          <td style="padding: 1px;"><span style='font-weight: bolder'> ${data.ref} </span></td>
          <td style="padding: 2px; width:150px"><span style='font-weight: bolder'> ${data.name} </span></td>
          <td style="padding: 1px;"><span style='font-weight: bolder'></span></td>
          <td style="padding: 1px;"><span style='font-weight: bolder'>${data.isPartner} </span></td>
          <td style="padding: 1px;"><span style='font-weight: bolder'>${data.phone} </span></td>
          <td style="padding: 1px;"><span style='font-weight: bolder'> ${data.bracelet}</span></td>
          <td style="padding: 1px;"><span style='font-weight: bolder'> ${hourMinute}</span></td>
              <td style="padding: 1px;"><input type="checkbox" ${data.isOut ? 'checked' : ''}></td>
        </tr>
    `;
      }
      data.companions.forEach((companions: Companions) => {
        if (all === 1) {
          htmlContent += `
          <tr>
          <td style="padding: 1px;"></td>
          <td style="padding: 1px;"></td>
          <td style="padding: 1px;">${companions.name}</td>
          <td style="padding: 1px;"><span style='font-weight: bolder'>Convidado</span></td>
          <td style="padding: 1px;">${companions.phone === null ? data.phone : companions.phone}</td>
          <td style="padding: 1px;">${companions.bracelet}</td>
          <td style="padding: 1px;">${hourMinute}</td>
          <td style="padding: 1px;"><input type="checkbox" ${companions.isOut ? 'checked' : ''}></td>
          </tr>`;
        } else if (all === 2 && companions.isOut === false) {
          htmlContent += `
          <tr>
          <td style="padding: 1px;"></td>
          <td style="padding: 1px;"></td>
          <td style="padding: 1px;">${companions.name}</td>
          <td style="padding: 1px;"><span style='font-weight: bolder'>Convidado</span></td>
          <td style="padding: 1px;">${companions.phone === null ? data.phone : companions.phone}</td>
          <td style="padding: 1px;">${companions.bracelet}</td>
          <td style="padding: 1px;">${hourMinute}</td>
          <td style="padding: 1px;"><input type="checkbox" ${companions.isOut ? 'checked' : ''}></td>
          </tr>`;
        }
      });
    });

    htmlContent += `</tbody> </table></div>`;
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    document.body.appendChild(element); // Append to the DOM to ensure rendering

    // Use jsPDF's html method to convert the HTML to a PDF
    doc.html(element, {
      callback: function (doc) {
        // Save the generated PDF
        doc.save('lista-entradas.pdf');
      },
      x: 10,
      y: 10,
      width: 680, // Maximum width of content on the page
      windowWidth: element.scrollWidth, // Use the actual width of the content
    });

    // Remove the temporary element from the DOM after the PDF is created
    document.body.removeChild(element);
  };

  return (
    <>
      <Button
        startIcon={<ReportsIcon />}
        onClick={() => {
          generatePdf(1);
        }}
      >
        Lista de Entradas do Dia
      </Button>
      <Button
        startIcon={<ReportsIcon />}
        onClick={() => {
          generatePdf(2);
        }}
      >
        Lista de Saida do Dia
      </Button>
    </>
  );
};

export default PdfGenerator;
