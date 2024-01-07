import fs from 'fs';
import moment from 'moment';
import PDFDocumentTable from 'pdfkit-table';

export const cetakLaporanPertahun = async (
  data: any,
  path: any,
  namaUnit?: any
) => {
  let doc: any = new PDFDocumentTable({
    size: 'A2',
    margin: 20,
    layout: 'landscape',
  });
  doc.pipe(fs.createWriteStream(path));
  // the magic
  let rows: any = [];
  data.forEach((dt: any, i: any) => {
    rows.push([
      i + 1,
      dt.namaUnit,
      dt.namaPemegang,
      dt.namaAset,
      dt.tahunPembelian,
      dt.usiaKendaraan,
      dt.tahunBerjalan,
    ]);
  });
  const table = {
    title: namaUnit
      ? `LAPORAN ASET KENDARAAN ${namaUnit} PERTAHUN`
      : 'LAPORAN INVENTARIS BARANG DINAS KESEHATAN KABUPATEN SUMBA TIMUR PERTAHUN',
    subtitle: '',
    headers: [
      'No',
      'Nama Unit',
      'Nama Pemegang',
      'Nama Aset',
      'Tahun Pembelian',
      'Usia Kendaraan',
      `Tahun Berjalan ${new Date().getFullYear()}`,
    ],
    rows: rows,
  };
  await doc.table(table, {
    columnsSize: [50, 150, 150, 150, 150, 150, 150],
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
