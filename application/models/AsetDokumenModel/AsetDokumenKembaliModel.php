<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class AsetDokumenKembaliModel extends CI_Model{

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
					FROM jaminan_header JH,
						`app_kode_kantor` KK
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
					jaminan_dokument JD 
					LEFT JOIN `app_kode_kantor` KK 
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
	public function getJaminanHistory($nomorRefAgunan){
		$str = "SELECT * from jaminan_history WHERE no_reff='$nomorRefAgunan' and status='MASUK'  limit 1;";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function kembaliDokumen($mainIdHistory,
									$mainNomorHistory, 
									$mainNoReffHistory,
									$mainAreaKerjaHistory, 
									$mainTanggalHistory, 
									$mainTransaksiHistory, 
									$mainNamaHistory,
									$mainKeteranganHistory,
									$mainAlamatHistory, 
									$mainKotaHistory, 
									$mainJenisPengurusanHistory, 
									$mainNomorRekeningHistory, 
									$mainTanggalRealisasiHistory,
									$jenisJaminanHistory, 
									$rodaKendaraanHistory,
									$mainTanggalRencanaHistory,
									$mainStatusHistory ,
									$mainTransaksiKembali,
									$mainIdKembali,
									$mainKeteranganKembali,
									$mainTanggalRencanaKembali){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		//step : update jaminan header dengan data awal, lali insert kembali ke history dg staatus 
		$this->db2->trans_start();
		$this->db2->query("UPDATE 
								jaminan_header 
							SET
								tgl = '$mainTanggalHistory',
								nomor = '$mainNomorHistory',
								nama = '$mainNamaHistory',
								alamat = '$mainAlamatHistory',
								kota = '$mainKotaHistory',
								STATUS = '$mainStatusHistory',
								ket = '$mainKeteranganHistory',
								tgl_rencana_kembali = '$mainTanggalRencanaHistory',
								jenis_pengurusan = '$mainJenisPengurusanHistory' 
							WHERE no_reff = '$mainNoReffHistory';");
		$this->db2->query("INSERT INTO jaminan_history 
								SELECT NULL AS `id`,
								nomor,
								no_reff,
								tgl,
								nama,
								alamat,
								kelurahan,
								kecamatan,
								kota,
								propinsi,
								kode_pos,
								jenis_jaminan,
								roda_kendaraan,
								'$mainTransaksiKembali' as status,
								kontrak_status,
								'$mainKeteranganKembali' AS ket,
								no_rekening,
								tgl_realisasi,
								kode_kantor,
								'$mainTanggalRencanaKembali' as tgl_rencana_kembali,
								jenis_pengurusan 
							FROM
								jaminan_header 
							WHERE id = '$mainIdKembali';");
		
		$this->db2->trans_complete();
	}
}