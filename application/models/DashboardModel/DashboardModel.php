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
	public function data_rekon($tanggal,$jenis){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
						ak.kode_kantor,
						ak.nama_kantor,
						dpm_online.`get_acc_sisa_asuransi_total`(ak.kode_kantor,'$jenis','$tanggal') AS sisa_buku_besar,
						dpm_online.`get_nominatif_sisa_asuransi_total` (ak.kode_kantor, '$jenis', '$tanggal') AS sisa_centro,
						dpm_online.`get_acc_sisa_asuransi_total`(ak.kode_kantor,'$jenis','$tanggal') - 
						dpm_online.`get_nominatif_sisa_asuransi_total` (ak.kode_kantor, '$jenis', '$tanggal') AS selisih    
					FROM
						dpm_online.`app_kode_kantor` ak 
					WHERE `flg_aktif` = 1;";
		$query = $this->db2->query($str);
		return $query->result_array();
	}
	public function total_rekon($src_kode_kantor,$tanggal,$jenis){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
					dpm_online.`get_acc_sisa_asuransi_total`('$src_kode_kantor', '$jenis', '$tanggal') AS sisa_buku_besar1,
					dpm_online.`get_nominatif_sisa_asuransi_total` ('$src_kode_kantor', '$jenis', '$tanggal') AS sisa_centro1,
					dpm_online.`get_acc_sisa_asuransi_total`('$src_kode_kantor', '$jenis', '$tanggal') - 
					dpm_online.`get_nominatif_sisa_asuransi_total` ('$src_kode_kantor', '$jenis', '$tanggal') as selisih1;";
		$query = $this->db2->query($str);
		return $query->result_array();
	}


}
