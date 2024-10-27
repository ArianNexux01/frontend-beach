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
}

interface Partner extends Host {
  ref: number;
}
interface Guest extends Host {}
// Define the main object interface
interface Companions {
  id: string;
  name: string;
  phone: string;
  bracelet: string;
  guestId: string | null;
  partnerId: string;
  entranceId: string;
  createdAt: string;
  updatedAt: string;
  guest: Guest;
  partner: Partner;
}

const PdfGenerator: React.FC = () => {
  // Function to generate PDF with text and table
  const getData = async () => {
    const response = await api.get('/companions/reports');

    return response.data;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hostAlreadyExists = (tableRows: any, data: Companions) => {
    if (data.guest !== null) {
      return (
        tableRows.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (row: any) =>
            row[1] === "<span style='font-weight: bolder'>" + data.guest.phone + '</span>',
        ).length > 0
      );
    } else {
      return (
        tableRows.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (row: any) =>
            row[1] === "<span style='font-weight: bolder'>" + data.partner.phone + '</span>',
        ).length > 0
      );
    }
  };
  const generatePdf = async () => {
    const reportData = await getData();
    const doc = new jsPDF('p', 'mm', 'a4');

    //  const tableColumnHeaders = ['Nome', 'Telefone', 'Sócio', 'Cor da Pulseira', 'Hora'];
    const tableRows: string[][] = [];
    let htmlContent = `
    <div>
      <h2 style="margin-bottom: 25px">Lista de Entradas do Dia - ${new Date().toLocaleDateString()}</h2>
      <table style="width:38%; border-collapse: collapse;" border="1">
        <thead style="background-color: #c2b067; color: white;">
          <tr>
            <th style="padding: 10px;">Nome</th>
            <th style="padding: 10px;">Telefone</th>
            <th style="padding: 10px;">Sócio</th>
            <th style="padding: 10px;">Cor da Pulseira</th>
            <th style="padding: 10px;">Hora</th>
            <th style="padding: 10px;">Entrada</th>
          </tr>
        </thead>
        <tbody>
  `;

    reportData.forEach((data: Companions) => {
      const hourMinute =
        new Date(data.createdAt).getUTCHours().toString() +
        ':' +
        new Date(data.createdAt).getUTCMinutes().toString();
      if (!hostAlreadyExists(tableRows, data)) {
        if (data.guest !== null) {
          tableRows.push([
            "<span style='font-weight: bolder'>" + data.guest.name + '</span>',
            "<span style='font-weight: bolder'>" + data.guest.phone + '</span>',
            "<span style='font-weight: bolder'>" + 'Não' + '</span>',
            "<span style='font-weight: bolder'>" + data.guest.bracelet + '</span>',
            "<span style='font-weight: bolder'>" + hourMinute + '</span>',
          ]);
        } else {
          tableRows.push([
            "<span style='font-weight: bolder'>" + data.partner.name + '</span>',
            "<span style='font-weight: bolder'>" + data.partner.phone + '</span>',
            "<span style='font-weight: bolder'>" + 'Sim' + '</span>',
            "<span style='font-weight: bolder'>" + data.partner.bracelet + '</span>',
            "<span style='font-weight: bolder'>" + hourMinute + '</span>',
          ]);
        }
      }
      tableRows.push([data.name, data.phone, 'Não', data.bracelet, hourMinute]);
    });

    console.log('Entrei');
    tableRows.forEach((row) => {
      htmlContent += `
      <tr>
        <td style="padding: 10px;">${row[0]}</td>
        <td style="padding: 10px;">${row[1]}</td>
        <td style="padding: 10px;">${row[2]}</td>
        <td style="padding: 10px;">${row[3]}</td>
        <td style="padding: 10px;">${row[4]}</td>
        <td style="padding: 10px;"><input type="checkbox"></td>
      </tr>`;
    });

    console.log(htmlContent);
    htmlContent += `</tbody> </table></div>`;
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    document.body.appendChild(element); // Append to the DOM to ensure rendering

    // Use jsPDF's html method to convert the HTML to a PDF
    doc.html(element, {
      callback: function (doc) {
        // Save the generated PDF
        doc.save('table.pdf');
      },
      x: 10,
      y: 10,
      width: 490, // Maximum width of content on the page
      windowWidth: element.scrollWidth, // Use the actual width of the content
    });

    // Remove the temporary element from the DOM after the PDF is created
    document.body.removeChild(element);
  };

  return (
    <Button startIcon={<ReportsIcon />} onClick={generatePdf}>
      Baixar Lista de Entradas do Dia
    </Button>
  );
};

export default PdfGenerator;
