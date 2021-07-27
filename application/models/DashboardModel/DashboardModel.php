<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class DashboardModel extends CI_Model{
	
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
	public function selectKodeKantor1(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT AKK.kode_kantor, AKK.kode_cabang, AKK.nama_kantor, AKK.`flg_aktif` 
					FROM `app_kode_kantor` AKK;";
		$query = $this->db2->query($str);
		return $query->result_array();
	}
	public function buku_besar($src_kode_kantor,$tanggal,$jenis){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
					dpm_online.`get_acc_sisa_asuransi_total`('$src_kode_kantor', '$jenis', '$tanggal') 
					AS sisa_buku_besar;";
		if(! $this->db2->simple_query($str)){
			
			$sisa_buku_besar = "0.00";
            return $sisa_buku_besar;
		}else{
			$query  = $this->db2->query($str);
			$result = $query->result_array();
			return $result[0]["sisa_buku_besar"];
		}
		// if($result[0]["sisa_buku_besar"] != null){
        //     return $result[0]["sisa_buku_besar"];
        // }
        // if($result[0]["sisa_buku_besar"] == null){
        //     $sisa_buku_besar = 0;
        //     return $sisa_buku_besar;
        // }
        // return $result[0]["sisa_buku_besar"];
	}
	public function web_centro($src_kode_kantor,$tanggal,$jenis){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT
					dpm_online.`get_nominatif_sisa_asuransi_total` ('$src_kode_kantor', '$jenis', '$tanggal') 
					AS sisa_centro;";
        if($query  = $this->db2->query($str)){
			$result = $query->result_array();
			return $result[0]["sisa_centro"];
		}else{
			$sisa_centro = 0;
            return $sisa_centro;
		}
		// if($result[0]["sisa_centro"] != null){
        //     return $result[0]["sisa_centro"];
        // }
        // if($result[0]["sisa_centro"] == null){
        //     $sisa_centro = 0;
        //     return $sisa_centro;
        // }
        // return $result[0]["sisa_centro"];
	}



}
