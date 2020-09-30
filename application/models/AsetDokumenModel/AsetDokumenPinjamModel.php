<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class AsetDokumenPinjamModel extends CI_Model{

	public function __construct()
	{
		parent::__construct();
	}
	
	public function getJaminanHeader($nomorAgunan , $nomorRefAgunan){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT  JH.id,
						JH.nomor,
						JH.no_reff,
						JH.tgl, 
						JH.nama, 
						JH.alamat, 
						JH.kelurahan, 
						JH.kecamatan, 
						JH.kota,  
						JH.propinsi,
						JH.kode_pos,
						JH.jenis_jaminan,
						JH.roda_kendaraan,
						JH.status,
						JH.kontrak_status,
						JH.ket,
						JH.no_rekening,
						JH.tgl_realisasi,
						JH.kode_kantor,
						JH.tgl_rencana_kembali,
						JH.jenis_pengurusan,
						JH.verifikasi,
						kk.`kode_cabang`,
						kk.`nama_kantor`
					FROM dpm_online.jaminan_header JH,
						dpm_online.`app_kode_kantor` KK
					WHERE nomor = '$nomorAgunan'
					AND no_reff = '$nomorRefAgunan'
					AND jh.`kode_kantor` = kk.`kode_kantor`;
				";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function getJaminanDokument($agunanID, $nomorRefAgunan){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT JD.*,
					kk.`kode_cabang` AS app_kode_kantor,
					kk.`nama_kantor` AS app_nama_kantor,
					KKJA.kode_jenis_agunan AS KKJA_kode_jenis_agunan,
					CONCAT(KKJA.kode_jenis_agunan,' - ',KKJA.deskripsi_jenis_agunan) AS KKJA_jenis_agunan,
					KKIHA.kode_ikatan_hukum,
					CONCAT(KKIHA.kode_ikatan_hukum,' - ',KKIHA.deskripsi_ikatan_hukum) AS ikatan_agunan,
					KKIHA.`PERSEN_DEFAULT` AS ikatan_persen_default,
					JJK.`nm_jenis` AS nama_jenis,
					JMK.`nm_merk` AS nama_merk,
					jtk.`nm_type` AS nama_type
				FROM
					dpm_online.jaminan_dokument JD 
					LEFT JOIN dpm_online.`app_kode_kantor` KK 
					ON JD.kode_kantor_lokasi_jaminan = KK.kode_kantor 
					LEFT JOIN kre_kode_jenis_agunan KKJA 
					ON JD.`jenis_agunan_detail` = KKJA.`KODE_JENIS_AGUNAN` 
					LEFT JOIN kre_kode_ikatan_hukum_agunan KKIHA 
					ON jd.`ikatan_agunan_detail` = KKIHA.`KODE_IKATAN_HUKUM` 
					LEFT JOIN jaminan_jenis_kendaraan JJK
					ON JD.`kd_jenis` = JJK.`kd_jenis`
					LEFT JOIN jaminan_merk_kendaraan JMK
					ON JD.`kd_merk` = JMK.`kd_merk`
					LEFT JOIN jaminan_type_kendaraan JTK
					ON JD.`kd_type` = JTK.`kd_type`
				WHERE agunan_id = '$agunanID' 
					AND no_reff = '$nomorRefAgunan';";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function getKodeNotaris(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT kode_notaris AS `kode`, nama_notaris AS `nama`, flg_aktif AS `flg_aktif`, alamat_notaris, kota_notaris
				FROM dpm_online.kre_kode_notaris
				WHERE flg_aktif = 1 
				ORDER BY kode;
			";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function getJaminanPengurusan(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT id as kode, jenis_pengurusan as nama, jangka_waktu as keterangan, flg_aktif as flg_aktif, DATE_FORMAT(SYSDATE(), '%Y-%m-%d') AS 'sysdate'
				FROM dpm_online.jaminan_pengurusan
				WHERE flg_aktif = 1;
			";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function sysdate(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT DATE_FORMAT(SYSDATE(), '%Y-%m-%d') AS 'sysdate';";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function pinjamDokumen($mainIdPinjam,
									$mainTanggalPinjam,
									$mainNamaPinjam,
									$mainAlamatPinjam,
									$mainKotaPinjam,
									$jenisJaminanPinjam,
									$rodaKendaraanPinjam,
									$mainTransaksiPinjam, 
									$mainKeteranganPinjam, 
									$mainJenisPengurusanPinjam,
									$mainAreaKerjaPinjam,
									$mainNomorRekeningPinjam,
									$mainTanggalRealisasiPinjam,
									$verifikasi,
									$mainTanggalRencanaKembaliPinjam,
									$jaminanDokumentID){

									$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
									//step : insert jaminan history, +1 nomor di dpm counter untuk OUT, update jaminan header, insert jaminan pinjam mirror dari jaminan dokument
									$this->db2->trans_start();
									$this->db2->query("UPDATE dpm_online.counter 
														SET nomor = nomor + 1  
														WHERE setting= CONCAT('ASSET_TEMP_OUT','$mainAreaKerjaPinjam')
														AND nomor <= nomor + 1;
													");

									$this->db2->query("UPDATE dpm_online.jaminan_header 
													   SET  tgl = '$mainTanggalPinjam',
															nama = '$mainNamaPinjam',
															alamat = '$mainAlamatPinjam',
															kota = '$mainKotaPinjam',
															jenis_jaminan = '$jenisJaminanPinjam',
															nomor = (SELECT CONCAT('$mainAreaKerjaPinjam','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_TEMP_OUT','$mainAreaKerjaPinjam')))),
															STATUS = '$mainTransaksiPinjam',
															ket = '$mainKeteranganPinjam',
															tgl_rencana_kembali = '$mainTanggalRencanaKembaliPinjam',
															jenis_pengurusan = '$mainJenisPengurusanPinjam' 
															WHERE id = '$mainIdPinjam';");
									$this->db2->query("INSERT INTO dpm_online.jaminan_pinjam (
															`id`,
															`no_reff`,
															`jenis`,
															`jenis_agunan_detail`,
															`nomor_bpkb`,
															`nama_bpkb`,
															`alamat_bpkb`,
															`kota_bpkb`,
															`kelurahan_bpkb`,
															`kecamatan_bpkb`,
															`kode_pos_bpkb`,
															`propinsi_bpkb`,
															`kd_merk_old`,
															`kd_merk`,
															`kd_type`,
															`kd_jenis`,
															`no_rangka`,
															`no_mesin`,
															`warna`,
															`tahun`,
															`no_polisi`,
															`no_stnk`,
															`silinder`,
															`asli_blanko`,
															`asli_faktur_pemilik`,
															`asli_kwitansi_jb`,
															`asli_sk_trayek`,
															`blanko`,
															`faktur_pemilik`,
															`kwitansi_jb`,
															`sk_trayek`,
															`no_faktur`,
															`no_sk_trayek`,
															`tgl_expired_sk_trayek`,
															`tgl_expired_pajak`,
															`tgl_expired_stnk`,
															`no_shm`,
															`no_shgb`,
															`tgl_sertifikat`,
															`tgl_jt_shgb`,
															`no_surat_ukur`,
															`luas_tanah`,
															`nama_pemilik_sertifikat`,
															`alamat_sertifikat`,
															`kelurahan_sertifikat`,
															`kecamatan_sertifikat`,
															`kota_sertifikat`,
															`propinsi_sertifikat`,
															`kode_pos_sertifikat`,
															`ajb`,
															`no_ajb`,
															`tgl_ajb`,
															`no_kohir`,
															`no_persil`,
															`pl_bangunan`,
															`batas_tanah`,
															`nama_ppat`,
															`ikatan_agunan_detail`,
															`persen_dijaminkan_detail`,
															`nilai_taksasi_detail`,
															`nilai_njop_detail`,
															`nilai_pasar_detail`,
															`nilai_apht_detail`,
															`asli_ajb`,
															`asli_imb`,
															`asli_sppt`,
															`asli_skmht`,
															`asli_gambar_denah`,
															`asli_surat_roya`,
															`asli_sht`,
															`asli_stts`,
															`asli_ssb`,
															`imb`,
															`no_imb`,
															`sppt`,
															`no_sppt`,
															`sppt_tahun`,
															`skmht`,
															`gambar_denah`,
															`surat_roya`,
															`sht`,
															`no_sht`,
															`sht_propinsi`,
															`sht_kota`,
															`stts`,
															`stts_tahun`,
															`ssb`,
															`ssb_atas_nama`,
															`lain_lain`,
															`inc_bpkb`,
															`keterangan`,
															`no_pinjam`,
															`agunan_id`,
															`verifikasi`,
															`karat`,
															`berat`,
															`harga_pasar`,
															`harga_taksasi`,
															`no_seri`,
															`jenis_emas`,
															`kode_kantor`,
															`tgl_register`,
															`kode_kantor_lokasi_jaminan`,
															`no_rekening_agunan`
														) 
														SELECT 
															NULL AS `id`,
															`no_reff`,
															`jenis`,
															`jenis_agunan_detail`,
															`nomor_bpkb`,
															`nama_bpkb`,
															`alamat_bpkb`,
															`kota_bpkb`,
															`kelurahan_bpkb`,
															`kecamatan_bpkb`,
															`kode_pos_bpkb`,
															`propinsi_bpkb`,
															`kd_merk_old`,
															`kd_merk`,
															`kd_type`,
															`kd_jenis`,
															`no_rangka`,
															`no_mesin`,
															`warna`,
															`tahun`,
															`no_polisi`,
															`no_stnk`,
															`silinder`,
															`asli_blanko`,
															`asli_faktur_pemilik`,
															`asli_kwitansi_jb`,
															`asli_sk_trayek`,
															`blanko`,
															`faktur_pemilik`,
															`kwitansi_jb`,
															`sk_trayek`,
															`no_faktur`,
															`no_sk_trayek`,
															`tgl_expired_sk_trayek`,
															`tgl_expired_pajak`,
															`tgl_expired_stnk`,
															`no_shm`,
															`no_shgb`,
															`tgl_sertifikat`,
															`tgl_jt_shgb`,
															`no_surat_ukur`,
															`luas_tanah`,
															`nama_pemilik_sertifikat`,
															`alamat_sertifikat`,
															`kelurahan_sertifikat`,
															`kecamatan_sertifikat`,
															`kota_sertifikat`,
															`propinsi_sertifikat`,
															`kode_pos_sertifikat`,
															`ajb`,
															`no_ajb`,
															`tgl_ajb`,
															`no_kohir`,
															`no_persil`,
															`pl_bangunan`,
															`batas_tanah`,
															`nama_ppat`,
															`ikatan_agunan_detail`,
															`persen_dijaminkan_detail`,
															`nilai_taksasi_detail`,
															`nilai_njop_detail`,
															`nilai_pasar_detail`,
															`nilai_apht_detail`,
															`asli_ajb`,
															`asli_imb`,
															`asli_sppt`,
															`asli_skmht`,
															`asli_gambar_denah`,
															`asli_surat_roya`,
															`asli_sht`,
															`asli_stts`,
															`asli_ssb`,
															`imb`,
															`no_imb`,
															`sppt`,
															`no_sppt`,
															`sppt_tahun`,
															`skmht`,
															`gambar_denah`,
															`surat_roya`,
															`sht`,
															`no_sht`,
															`sht_propinsi`,
															`sht_kota`,
															`stts`,
															`stts_tahun`,
															`ssb`,
															`ssb_atas_nama`,
															`lain_lain`,
															`inc_bpkb`,
															`keterangan`,
															(SELECT CONCAT('$mainAreaKerjaPinjam','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_TEMP_OUT','$mainAreaKerjaPinjam')))),
															`agunan_id`,
															`verifikasi`,
															`karat`,
															`berat`,
															`harga_pasar`,
															`harga_taksasi`,
															`no_seri`,
															`jenis_emas`,
															`kode_kantor`,
															`tgl_register`,
															`kode_kantor_lokasi_jaminan`,
															`no_rekening_agunan` 
														FROM
															dpm_online.jaminan_dokument
															WHERE id = '$jaminanDokumentID';");
									$this->db2->trans_complete();
	}


	

	

	
	


}





