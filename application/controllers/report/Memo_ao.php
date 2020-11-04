<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Memo_ao extends CI_Controller
{

	function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$id = $this->input->post('id');
		$query = "SELECT view_report_ao.*, trans_so.nomor_so, recom_ao.tujuan_pinjaman as recom_tujuan_pinjaman, recom_ao.jenis_pinjaman as recom_jenis_pinjaman from `view_report_ao` LEFT JOIN trans_so on view_report_ao.id_trans_so=trans_so.id LEFT JOIN recom_ao on recom_ao.id=view_report_ao.id_recom_ao WHERE id_trans_so = '$id'  ";

		$result = $this->db->query($query);



		$count = $result->num_rows();

		if ($count > 0) {
			$x      = $result->row();
			$id_calon_debitur = $x->id_calon_debitur;
			$id_trans_so = $x->id_trans_so;
			$id_ao = $x->id_ao;
			$data['nomor_ao'] = $x->nomor_ao;
			$data['nomor_so'] = $x->nomor_so;
			$data['nama_ao'] = $x->nama_ao;
			$data['plafon_kredit'] = $x->plafon_pinjaman;
			$data['jangka_waktu'] = $x->tenor;
			$data['nomor_so'] = $x->nomor_so;
			$data['tanggal']  = date('d/m/Y', strtotime($x->tgl_buat));
			$data['asal_data'] = $x->asal_data;
			$data['nama_so'] = $x->nama_so;
			$data['nama_marketing'] = $x->nama_marketing;
			$data['plafon_pinjaman'] = $x->plafon_pinjaman;
			$data['tenor'] = $x->tenor;
			$data['jenis_pinjaman'] = $x->jenis_pinjaman;
			$data['tujuan_pinjaman'] = $x->tujuan_pinjaman;
			$data['nama_lengkap'] = $x->nama_lengkap;
			$data['jenis_kelamin'] = $x->jenis_kelamin;
			$data['gelar_keagamaan'] = $x->gelar_keagamaan;
			$data['status_nikah'] = $x->status_nikah;
			$data['gelar_pendidikan'] = $x->gelar_pendidikan;
			$data['no_ktp'] = $x->no_ktp;
			$data['no_kk'] = $x->no_kk;
			$data['ibu_kandung'] = $x->ibu_kandung;
			$data['no_ktp_kk'] = $x->no_ktp_kk;
			$data['no_npwp'] = $x->no_npwp;
			$data['tempat_lahir'] = $x->tempat_lahir;
			$data['agama'] = $x->agama;
			$data['tgl_lahir'] = $x->tgl_lahir;
			$data['alamat_ktp'] = $x->alamat_ktp;
			$data['kecamatan_ktp'] = $x->kecamatan_ktp;
			$data['provinsi_ktp'] = $x->provinsi_ktp;
			$data['kelurahan_ktp'] = $x->kelurahan_ktp;
			$data['kabupaten_ktp'] = $x->kabupaten_ktp;
			$data['rt_ktp'] = $x->rt_ktp;
			$data['rw_ktp'] = $x->rw_ktp;
			$data['kode_pos_ktp'] = $x->kode_pos_ktp;
			$data['alamat_domisili'] = $x->alamat_domisili;
			$data['kecamatan_domisili'] = $x->kecamatan_domisili;
			$data['provinsi_domisili'] = $x->kecamatan_domisili;
			$data['kabupaten_domisili'] = $x->kabupaten_domisili;
			$data['kelurahan_domisili'] = $x->kelurahan_domisili;
			$data['rt_domisili'] = $x->rt_domisili;
			$data['rw_domisili'] = $x->rw_domisili;
			$data['jumlah_tanggungan'] = $x->jumlah_tanggungan;
			$data['kode_pos_domisili'] = $x->kode_pos_domisili;
			$data['no_hp'] = $x->no_hp;
			$data['no_telp'] = $x->no_telp;
			$data['tinggi_badan'] = $x->tinggi_badan;
			$data['berat_badan'] = $x->berat_badan;
			$data['nama_anak'] = $x->nama_anak;
			$data['tgl_lahir_anak'] = $x->tgl_lahir_anak;
			$data['pekerjaan'] = $x->pekerjaan;
			$data['nama_tempat_kerja'] = $x->nama_tempat_kerja;
			$data['posisi_pekerjaan'] = $x->posisi_pekerjaan;
			$data['jenis_pekerjaan'] = $x->jenis_pekerjaan;
			$data['alamat_tempat_kerja'] = $x->alamat_tempat_kerja;
			$data['provinsi_tempat_kerja'] = $x->provinsi_tempat_kerja;
			$data['kabupaten_tempat_kerja'] = $x->kabupaten_tempat_kerja;
			$data['kecamatan_tempat_kerja'] = $x->kecamatan_tempat_kerja;
			$data['kelurahan_tempat_kerja'] = $x->kelurahan_tempat_kerja;
			$data['rt_tempat_kerja'] = $x->rt_tempat_kerja;
			$data['rw_tempat_kerja'] = $x->rw_tempat_kerja;
			$data['tgl_mulai_kerja'] = $x->tgl_mulai_kerja;
			$data['no_telp_tempat_kerja'] = $x->no_telp_tempat_kerja;
			$data['pekerjaan_pasangan'] = $x->pekerjaan_pasangan;
			$data['nama_tempat_kerja_pasangan'] = $x->nama_tempat_kerja_pasangan;
			$data['posisi_pekerjaan_pasangan'] = $x->posisi_pekerjaan_pasangan;
			$data['jenis_pekerjaan_pasangan'] = $x->jenis_pekerjaan_pasangan;
			$data['alamat_tempat_kerja_pasangan'] = $x->alamat_tempat_kerja_pasangan;
			$data['provinsi_tempat_kerja_pasangan'] = $x->provinsi_tempat_kerja_pasangan;
			$data['kabupaten_tempat_kerja_pasangan'] = $x->kabupaten_tempat_kerja_pasangan;
			$data['kecamatan_tempat_kerja_pasangan'] = $x->kecamatan_tempat_kerja_pasangan;
			$data['kelurahan_tempat_kerja_pasangan'] = $x->kelurahan_tempat_kerja_pasangan;
			$data['rt_tempat_kerja_pasangan'] = $x->rt_tempat_kerja_pasangan;
			$data['rw_tempat_kerja_pasangan'] = $x->rw_tempat_kerja_pasangan;
			$data['tgl_mulai_kerja_pasangan'] = $x->tgl_mulai_kerja_pasangan;
			$data['no_telp_tempat_kerja_pasangan'] = $x->no_telp_tempat_kerja_pasangan;

			$data['pendidikan_terakhir'] = $x->pendidikan_terakhir;
			$data['nama_lengkap_pasangan'] = $x->nama_pasangan;
			$data['jenis_kelamin_pasangan'] = $x->jk_pasangan;
			$data['ibu_kandung_pasangan'] = $x->ibu_kandung_pasangan;
			$data['no_kk_pasangan'] = $x->no_kk_pasangan;
			$data['no_ktp_pasangan'] = $x->no_ktp_pasangan;
			$data['no_npwp_pasangan'] = $x->no_npwp_pasangan;
			$data['no_ktp_kk_pasangan'] = $x->no_ktp_kk_pasangan;
			$data['agama_pasangan'] = "";
			$data['tempat_lahir_pasangan'] = $x->tempat_lahir_pasangan;
			$data['tgl_lahir_pasangan'] = $x->tgl_lahir_pasangan;
			$data['alamat_pasangan'] = $x->alamat_pasangan;
			$data['no_telp_pasangan'] = $x->no_telp_pasangan;

			$data['ver_ktp_debt'] = $x->ver_ktp_debt;
			$data['ver_kk_debt'] = $x->ver_kk_debt;
			$data['ver_imb_debt'] = $x->ver_imb_debt;
			$data['ver_akta_cerai_debt'] = $x->ver_akta_cerai_debt;
			$data['ver_akta_kematian_debt'] = $x->ver_akta_kematian_debt;
			$data['ver_rek_tabungan_debt'] = $x->ver_rek_tabungan_debt;
			$data['ver_sertifikat_debt'] = $x->ver_sertifikat_debt;
			$data['ver_sttp_pbb_debt'] = $x->ver_sttp_pbb_debt;
			$data['ver_ktp_pasangan'] = $x->ver_ktp_pasangan;
			$data['ver_akta_nikah_pasangan'] = $x->ver_akta_nikah_pasangan;
			$data['ver_data_penjamin'] = $x->ver_data_penjamin;
			$data['ver_sku_debt'] = $x->ver_sku_debt;
			$data['ver_pembukuan_usaha_debt'] = $x->ver_pembukuan_usaha_debt;
			$data['keterangan_verifikasi'] = $x->keterangan_verifikasi;

			$data['val_data_debt'] = $x->val_data_debt;
			$data['val_lingkungan_debt'] = $x->val_lingkungan_debt;
			$data['val_domisili_debt'] = $x->val_domisili_debt;
			$data['val_pekerjaan_debt'] = $x->val_pekerjaan_debt;
			$data['val_data_pasangan'] = $x->val_data_pasangan;
			$data['val_data_penjamin'] = $x->val_data_penjamin;
			$data['val_agunan'] = $x->val_agunan;
			$data['keterangan_validasi'] = $x->keterangan_validasi;
			$data['pemasukan_cadebt'] = $x->pemasukan_cadebt;
			$data['pemasukan_pasangan'] = $x->pemasukan_pasangan;
			$data['pemasukan_penjamin'] = $x->pemasukan_penjamin;
			$data['biaya_rumah_tangga'] = $x->biaya_rumah_tangga;
			$data['biaya_transport'] = $x->biaya_transport;
			$data['biaya_pendidikan'] = $x->biaya_pendidikan;
			$data['biaya_telp_listr_air'] = $x->biaya_telp_list_air;
			$data['angsuran'] = $x->angsuran;
			$data['biaya_lain'] = $x->biaya_lain;
			$data['total_pemasukan'] = $x->total_pemasukan;
			$data['total_pengeluaran'] = $x->total_pengeluaran;
			$data['penghasilan_bersih'] = $x->penghasilan_bersih;
			$data['suku_bunga'] = $x->suku_bunga;
			$data['produk'] = $x->produk;
			$data['pembayaran_bunga'] = $x->pembayaran_bunga;
			$data['akad_kredit'] = $x->akad_kredit;
			$data['ikatan_agunan'] = $x->ikatan_agunan;
			$data['analisa_ao'] = $x->analisa_ao;
			$data['biaya_provisi'] = $x->biaya_provisi;
			$data['biaya_credit_checking'] = $x->biaya_credit_checking;
			$data['biaya_administrasi'] = $x->biaya_administrasi;
			$data['biaya_tabungan'] = $x->biaya_tabungan;
			$data['jangka_waktu'] = $x->jangka_waktu;
			$data['plafon_kredit_ao'] = $x->plafon_kredit;
			$data['recom_tujuan_pinjaman'] = $x->recom_tujuan_pinjaman;
			$data['recom_jenis_pinjaman'] = $x->recom_jenis_pinjaman;

			$data['nama_penghuni'] = $x->nama_penghuni;
			$data['nilai_taksasi_bangunan'] = $x->nilai_taksasi_bangunan;
			$data['status_penghuni'] = $x->status_penghuni;
			$data['nilai_taksasi_agunan'] = $x->nilai_taksasi_agunan;
			$data['bentuk_bangunan'] = $x->bentuk_bangunan;
			$data['tgl_taksasi'] = $x->tgl_taksasi;
			$data['kondisi_bangunan'] = $x->kondisi_bangunan;
			$data['nilai_likuidasi'] = $x->nilai_likuidasi;
			$data['fasilitas'] = $x->fasilitas;
			$data['perusahaan_penilai_independen'] = $x->perusahaan_penilai_independen;
			$data['listrik'] = $x->listrik;
			$data['nilai_agunan_independen'] = $x->nilai_agunan_independen;

			$x = $this->db->query("SELECT id_penjamin FROM `trans_so` WHERE id ='$id'");
			$result = $x->row();
			$id_jaminan = isset($result->id_penjamin) ? $result->id_penjamin : "0";

			if ($id_jaminan !== '0') {
				$query = "SELECT * FROM `view_penjamin_debitur` 
									  WHERE id IN ($id_jaminan) ";
				$rows = $this->db->query($query);
				$data['row'] = $rows;
			} else {
				$rows = 0;
				$data['row'] = $rows;
			}

			$agunan_tanah = $this->db->query("SELECT * FROM view_agunan_tanah 
			 							WHERE id in (SELECT id_agunan_tanah 
			 										 FROM  view_report_ao
			 										 WHERE id_ao ='$id_ao' )");
			$data['agunan_tanah'] = $agunan_tanah;

			$mpdf = new \Mpdf\Mpdf();
			$html = $this->load->view('report/memo_ao', $data, true);
			$mpdf->WriteHTML($html);
			$mpdf->Output();
		}
	}
}
