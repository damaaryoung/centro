<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class AsetDokumenPenyerahanModel extends CI_Model{

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
	public function validasiLokasiJaminan($agunanID, $nomorRefAgunan){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT COUNT(*) AS jml 
				FROM
					dpm_online.jaminan_dokument 
				WHERE no_reff = '$nomorRefAgunan' 
					AND kode_kantor_lokasi_jaminan <> kode_kantor;";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function validasSaldoRekening($data_rekening){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT KreGetSaldoAkhir('$data_rekening',CURDATE());";
		$query = $this->db2->query($str);
		return $query->result_array();
	}

	public function sysdate(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT DATE_FORMAT(SYSDATE(), '%Y-%m-%d') AS 'sysdate';";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function PenyerahanDokumen($mainIdPenyerahan,
										$mainTanggalPenyerahan,
										$mainNamaPenyerahan,
										$mainAlamatPenyerahan,
										$mainKotaPenyerahan,
										$jenisJaminanPenyerahan,
										$rodaKendaraanPenyerahan,
										$mainTransaksiPenyerahan, 
										$mainKeteranganPenyerahan, 
										$mainJenisPengurusanPenyerahan,
										$mainAreaKerjaPenyerahan,
										$mainNomorRekeningPenyerahan,
										$mainTanggalRealisasiPenyerahan,
										$verifikasi,
										$mainTanggalRencanaKembaliPenyerahan,
										$jaminanDokumentID){

									$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
									//step : insert jaminan history, +1 nomor di dpm counter untuk OUT, update jaminan header, insert jaminan Penyerahan mirror dari jaminan dokument
									$this->db2->trans_start();
									$this->db2->query("UPDATE dpm_online.counter 
														SET nomor = nomor + 1  
														WHERE setting= CONCAT('ASSET_OUT','$mainAreaKerjaPenyerahan')
														AND nomor <= nomor + 1;
													");

									$this->db2->query("UPDATE 
															dpm_online.jaminan_header 
														SET tgl = '$mainTanggalPenyerahan',
															nomor = (SELECT CONCAT('$mainAreaKerjaPenyerahan','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_OUT','$mainAreaKerjaPenyerahan')))),
															status = '$mainTransaksiPenyerahan',
														    ket = '$mainKeteranganPenyerahan' 
														WHERE id = '$mainIdPenyerahan';");

									$this->db2->trans_complete();
	}

}





