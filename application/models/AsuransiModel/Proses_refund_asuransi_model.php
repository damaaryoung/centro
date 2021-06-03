<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Proses_refund_asuransi_model extends CI_Model{
	
	public function __construct() {
		parent:: __construct();
		$this->load->database();
	}

	public function sysdate(){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT DATE_FORMAT(SYSDATE(), '%Y-%m') AS 'sysdate';";
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
    public function get_list_refund($src_kode_kantor,$jenis){
        $this->db2 = $this->load->database('DB_CENTRO', true);
        $str    = "SELECT AR.`no_rekening`,
                    AR.`jenis_refund`,
                    AR.`no_reff_asuransi`,
                    AR.`jenis_asuransi`,
                    AR.`no_transaksi`,
                    CASE
                      WHEN AR.`status_refund` = '0' 
                      THEN 'WAITING' 
                      WHEN AR.`status_refund` = '1' 
                      THEN 'RETURN'
                      WHEN AR.`status_refund` = '2' 
                      THEN 'PROSES' 
                      WHEN AR.`status_refund` = '3' 
                      THEN 'DONE' 
                      WHEN AR.`status_refund` = '4' 
                      THEN 'REJECT' 
                      END AS `status_refund`,
                    K.`TGL_REALISASI`,
                    N.`NAMA_NASABAH`,
                    JH.`jenis_jaminan` 
                  FROM
                    asuransi_refund AR 
                    LEFT JOIN asuransi_cover AC 
                      ON ac.`no_rekening` = AR.`no_rekening` 
                      AND ac.`jenis_asuransi` = AR.`jenis_asuransi` 
                    LEFT JOIN KREDIT K 
                      ON K.`NO_REKENING` = AR.`no_rekening` 
                    LEFT JOIN NASABAH N 
                      ON N.`NASABAH_ID` = AC.`nasabah_id` 
                    LEFT JOIN JAMINAN_HEADER JH 
                      ON JH.`no_rekening` = AR.`no_rekening` 
                  WHERE AC.`kode_kantor` = '$src_kode_kantor' 
                    AND AR.`jenis_asuransi` = '$jenis' 
                    AND AR.status_refund IN ('0','2','3','4')
                  ORDER BY AR.status_refund ASC 
                  LIMIT 25;";
      $query  = $this->db2->query($str);
      return $query->result_array();
  }
}
?>