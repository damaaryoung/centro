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
	public function get_data_rekap($jenis, $date){
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
						AC.`sisa_titipan_asuransi` 
					FROM
						asuransi_cover AC 
					LEFT JOIN NASABAH N 
						ON N.`NASABAH_ID` = AC.`nasabah_id` 
					LEFT JOIN KREDIT K 
						ON K.`NO_REKENING` = AC.`no_rekening` 
					LEFT JOIN JAMINAN_HEADER JH 
						#ON JH.`no_rekening` = AC.`no_rekening`
						ON JH.`no_reff` = AC.`no_reff_jaminan`
					LEFT JOIN kre_kode_asuransi KKA 
						ON KKA.`KODE_ASURANSI` = AC.`kode_asuransi` 
					WHERE AC.`jenis_asuransi` = '$jenis' 
						AND K.`TGL_REALISASI` = '$date';";
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
							AC.`sisa_titipan_asuransi` 
						FROM
							asuransi_cover AC 
						LEFT JOIN NASABAH N 
							ON N.`NASABAH_ID` = AC.`nasabah_id` 
						LEFT JOIN KREDIT K 
							ON K.`NO_REKENING` = AC.`no_rekening` 
						LEFT JOIN JAMINAN_HEADER JH 
						#	ON JH.`no_rekening` = AC.`no_rekening`
							ON JH.`no_reff` = AC.`no_reff_jaminan`
						LEFT JOIN kre_kode_asuransi KKA 
							ON KKA.`KODE_ASURANSI` = AC.`kode_asuransi` 
						WHERE AC.`jenis_asuransi` = '$jenis' 
						AND (N.`NAMA_NASABAH` LIKE '$search%'
							OR AC.`no_rekening` LIKE '$search%');";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
}


