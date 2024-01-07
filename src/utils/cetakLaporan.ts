import fs from 'fs';
import moment from 'moment';
import PDFDocumentTable from 'pdfkit-table';

export const cetakLaporan = async (data: any, path: any, namaUnit?: any) => {
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
      dt.nama_barang,
      dt.kd_barang,
      dt.nomor_polisi,
      dt.nama_jenis_barang,
      dt.kategori ?? '-',
      moment(dt.tahun_pembelian).format('DD-MM-YYYY'),
      `${new Date().getFullYear() - Number(dt.tahun_pembelian)} Tahun`,
      dt.merek,
      dt.kd_unit,
      dt.alamat,
      dt.nama_unit,
      dt.nama_pemegang,
      dt.keadaan_barang,
      dt.no_mesin,
      dt.no_rangka,
    ]);
  });
  const table = {
    title: namaUnit
      ? `LAPORAN ASET KENDARAAN ${namaUnit}`
      : 'LAPORAN INVENTARIS BARANG DINAS KESEHATAN KABUPATEN SUMBA TIMUR',
    subtitle: '',
    headers: [
      'No',
      'Nama Barang',
      'Kode Barang',
      'Nomor Polisi / ED',
      'Jenis Barang',
      'Kategori',
      'Tahun Pembelian',
      'Usia Aset',
      'Merek',
      'Kode Unit',
      'Alamat',
      'Unit',
      'Nama Pemegang',
      'Keadaan Barang',
      'No Mesin',
      'No Rangka',
    ],
    rows: rows,
  };
  await doc.table(table, {
    columnsSize: [
      50, 200, 80, 80, 100, 100, 80, 80, 100, 100, 150, 150, 200, 100, 80, 80,
    ],
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
