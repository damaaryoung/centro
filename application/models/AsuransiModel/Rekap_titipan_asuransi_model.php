<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Rekap_titipan_asuransi_model extends CI_Model{
	
	public function __construct() {
		parent:: __construct();
		$this->load->database();
	}

	public function sysdate(){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT DATE_FORMAT(SYSDATE(), '%Y-%m-%d') AS 'sysdate';";
        $query  = $this->db2->query($str);
        $result = $query->result_array();
        return $result[0]["sysdate"];
	}
	public function selectKodeKantor(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT AKK.kode_kantor, AKK.kode_cabang, AKK.nama_kantor, AKK.`flg_aktif` 
					FROM `app_kode_kantor` AKK;";
		$query = $this->db2->query($str);
		return $query->result_array();
	}
	public function get_data_rekap($jenis, $date, $src_kode_kantor){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
						K.`TGL_REALISASI`,
						N.NAMA_NASABAH,
						JH.`jenis_jaminan`,
						KKA.`DESKRIPSI_ASURANSI`,
						ac.`no_rekening`,
						AC.`nasabah_id`,
						AC.`agunan_id`,
						AC.`no_polis`,
						AC.`no_reff_asuransi`,
						AC.`no_reff_jaminan`,
						AC.`titipan_asuransi`,
						AC.`komisi_asuransi`,
						AC.`premi_asuransi`,
						AC.`sisa_titipan_asuransi`,
						AC.`titipan_asuransi2`,
						AC.`refund_asuransi`,
						AC.`klaim_asuransi`,
						AC.`pengembalian_asuransi`
					FROM
						asuransi_cover AC 
					LEFT JOIN NASABAH N 
						ON N.`NASABAH_ID` = AC.`nasabah_id` 
					LEFT JOIN KREDIT K 
						ON K.`NO_REKENING` = AC.`no_rekening` 
					LEFT JOIN JAMINAN_HEADER JH 
						ON JH.`no_reff` = AC.`no_reff_jaminan`
					LEFT JOIN kre_kode_asuransi KKA 
						ON KKA.`KODE_ASURANSI` = (SELECT CASE 
															WHEN AC.`jenis_asuransi` = 'JAMINAN'
																THEN K.`KODE_ASURANSI`
															WHEN AC.`jenis_asuransi` = 'JIWA'
																THEN K.`kode_asuransi_jiwa`
														END AS `kode_asuransi`
													FROM kredit k1
													WHERE K1.`NO_REKENING` = AC.`no_rekening`) 
					WHERE AC.`jenis_asuransi` = '$jenis' 
						AND K.`TGL_REALISASI` = '$date'
						AND AC.`kode_kantor` LIKE '%$src_kode_kantor';";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
	public function get_search($jenis, $search){
		$this->db2 = $this->load->database('DB_CENTRO', true);
			$str    = "SELECT 
							K.`TGL_REALISASI`,
							N.NAMA_NASABAH,
							JH.`jenis_jaminan`,
							KKA.`DESKRIPSI_ASURANSI`,
							ac.`no_rekening`,
							AC.`nasabah_id`,
							AC.`agunan_id`,
							AC.`no_polis`,
							AC.`no_reff_asuransi`,
							AC.`no_reff_jaminan`,
							AC.`titipan_asuransi`,
							AC.`komisi_asuransi`,
							AC.`premi_asuransi`,
							AC.`sisa_titipan_asuransi`,
						    AC.`titipan_asuransi2`,
						    AC.`refund_asuransi`,
						    AC.`klaim_asuransi`,
							AC.`pengembalian_asuransi`
						FROM
							asuransi_cover AC 
						LEFT JOIN NASABAH N 
							ON N.`NASABAH_ID` = AC.`nasabah_id` 
						LEFT JOIN KREDIT K 
							ON K.`NO_REKENING` = AC.`no_rekening` 
						LEFT JOIN JAMINAN_HEADER JH 
							ON JH.`no_reff` = AC.`no_reff_jaminan`
						LEFT JOIN kre_kode_asuransi KKA 
							ON KKA.`KODE_ASURANSI` = (SELECT CASE 
															WHEN AC.`jenis_asuransi` = 'JAMINAN'
																THEN K.`KODE_ASURANSI`
															WHEN AC.`jenis_asuransi` = 'JIWA'
																THEN K.`kode_asuransi_jiwa`
														END AS `kode_asuransi`
													FROM kredit k1
													WHERE K1.`NO_REKENING` = AC.`no_rekening`)  
						WHERE AC.`jenis_asuransi` = '$jenis' 
						AND (N.`NAMA_NASABAH` LIKE '$search%'
							OR AC.`no_rekening` LIKE '$search%');";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
	public function buku_besar($src_kode_kantor,$tanggal,$jenis){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
					dpm_online.`get_acc_sisa_asuransi_total`('$src_kode_kantor', '$jenis', '$tanggal') 
					AS sisa_buku_besar;";
        $query  = $this->db2->query($str);
        $result = $query->result_array();
        return $result[0]["sisa_buku_besar"];
	}
	public function web_centro($src_kode_kantor,$tanggal,$jenis){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT
					dpm_online.`get_nominatif_sisa_asuransi_total` ('$src_kode_kantor', '$jenis', '$tanggal') 
					AS sisa_centro;";
        $query  = $this->db2->query($str);
        $result = $query->result_array();
        return $result[0]["sisa_centro"];
	}

}


