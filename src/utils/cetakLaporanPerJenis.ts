import fs from 'fs';
import PDFDocumentTable from 'pdfkit-table';

export const cetakLaporanPerJenis = async (data: any, path: any) => {
  let doc: any = new PDFDocumentTable({
    size: 'A2',
    margin: 20,
    layout: 'landscape',
  });
  let rows: any = [];
  data.forEach((dt: any, i: any) => {
    rows.push([
      i + 1,
      dt.unit,
      dt.r2baik,
      dt.r2rr,
      dt.r2rb,
      dt.r2baik + dt.r2rr + dt.r2rb,
      dt.r4baik,
      dt.r4rr,
      dt.r4rb,
      dt.r4baik + dt.r4rr + dt.r4rb,
      dt.r2baik + dt.r2rr + dt.r2rb + dt.r4baik + dt.r4rr + dt.r4rb,
    ]);
  });
  doc.pipe(fs.createWriteStream(path));
  // the magic
  const table = {
    title:
      'LAPORAN INVENTARIS BARANG DINAS KESEHATAN KABUPATEN SUMBA TIMUR - REKAPITULASI ASET',
    subtitle: '',
    headers: [
      'No',
      'Nama Unit',
      'Roda 2 (Baik)',
      'Roda 2 (RR)',
      'Roda 2 (RB)',
      'Jumlah',
      'Roda 4 (Baik)',
      'Roda 4 (RR)',
      'Roda 4 (RB)',
      'Jumlah',
      'Total',
    ],
    rows: rows,
  };
  await doc.table(table, {
    columnsSize: [50, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    prepareHeader: () => doc.font('Helvetica-Bold').fontSize(8),
    prepareRow: (
      row: any,
      indexColumn: any,
      indexRow: any,
      rectRow: any,
      rectCell: any
    ) => {
      doc.font('Helvetica').fontSize(8);
      indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
    },
  });
  doc.end();
};
