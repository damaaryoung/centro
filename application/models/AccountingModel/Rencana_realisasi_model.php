<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Rencana_realisasi_model extends CI_Model{
	
    public function __construct() {
    	parent:: __construct();
    	$this->load->database();
    }

	public function sysdate(){
	  	$this->db2 = $this->load->database('DB_CENTRO', true);
	  	$str = "SELECT DATE_FORMAT(SYSDATE(), '%Y-%m-%d') AS 'sysdate';";
          $query  = $this->db2->query($str);
          $result = $query->result_array();
          return $result[0]["sysdate"];
	}
    public function get_jenis(){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT * FROM acc_das_rencana_realisasi_master;";
        $query = $this->db2->query($str);
        return $query->result_array();
    }
    public function selectKodeKantor(){
  		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
  		$str = "SELECT AKK.kode_kantor, AKK.kode_cabang, AKK.nama_kantor, AKK.`flg_aktif` 
  				    FROM `app_kode_kantor` AKK;";
          $query = $this->db2->query($str);
          return $query->result_array();
  	}
    public function get_data_rencana_realisasi($src_kode_kantor){
        $this->db2 = $this->load->database('DB_CENTRO', true);
        $str    = "SELECT a.tgl_laporan AS `tgl_laporan`,
                            a.kode_kantor AS `kode_kantor`,
                            kk.nama_kantor AS `nama_kantor`,
                            a.jenis AS `jenis`,
                            a.rencana AS `rencana`,
                            a.realisasi AS `realisasi`,
                            a.rasio AS `rasio`
                    FROM acc_das_rencana_realisasi a
                    LEFT JOIN app_kode_kantor kk
                    ON kk.kode_kantor = a.kode_kantor 
                    WHERE a.kode_kantor = '$src_kode_kantor'
                    LIMIT 25;";
        $query  = $this->db2->query($str);
        return $query->result_array();
    }
    public function insert_rencana($modal_jenis,
                                    $modal_kode_kantor,
                                    $modal_tgl_laporan,
                                    $modal_rencana,
                                    $modal_realisasi,
                                    $modal_rasio,
                                    $userID){
        $this->db2 = $this->load->database('DB_CENTRO', true);
   	       
        $this->db2->trans_begin();
        $this->db2->query("INSERT INTO acc_das_rencana_realisasi (tgl_laporan,
                                                                    kode_kantor, 
                                                                    jenis, 
                                                                    rencana, 
                                                                    realisasi,
                                                                    rasio, 
                                                                    create_date,
                                                                    create_by)
                                  SELECT dpm_online.get_eom('$modal_tgl_laporan'),'$modal_kode_kantor', '$modal_jenis', '$modal_rencana', 
                                         '$modal_realisasi', '$modal_rasio',NOW(), '$userID' FROM DUAL;");
        if ($this->db2->trans_status() === FALSE)
		{
		  $this->db2->trans_rollback();
          return 'fail';
		}
		else
		{
		  $this->db2->trans_commit();
          return 'sukses';
		}
    }
    public function delete_rencana($kd_kantor,$jenis,$tgl){
        $this->db2 = $this->load->database('DB_CENTRO', true);
         
        $this->db2->trans_begin();
        $this->db2->query("DELETE FROM acc_das_rencana_realisasi
                            WHERE kode_kantor = '$kd_kantor'
                            AND jenis = '$jenis'
                            AND tgl_laporan = '$tgl';");
        if ($this->db2->trans_status() === FALSE)
        {
          $this->db2->trans_rollback();
          return 'fail';
        }
        else
        {
          $this->db2->trans_commit();
          return 'sukses';
        }
    }
    public function get_details($kd_kantor,$jenis,$tgl){
        $this->db2 = $this->load->database('DB_CENTRO', true);
        $str    = "SELECT a.tgl_laporan AS `tgl_laporan`,
                            a.kode_kantor AS `kode_kantor`,
                            kk.nama_kantor AS `nama_kantor`,
                            a.jenis AS `jenis`,
                            a.rencana AS `rencana`,
                            a.realisasi AS `realisasi`,
                            a.rasio AS `rasio`
                    FROM acc_das_rencana_realisasi a
                    LEFT JOIN app_kode_kantor kk
                    ON kk.kode_kantor = a.kode_kantor 
                    WHERE a.kode_kantor = '$kd_kantor'
                    AND a.tgl_laporan = '$tgl'
                    AND a.jenis = '$jenis'
                    LIMIT 1;";
        $query  = $this->db2->query($str);
        return $query->result_array();
    }
    public function update_rencana($modal_jenis_update,
                                    $modal_kode_kantor_update,
                                    $modal_tgl_laporan_update,
                                    $modal_rencana_update,
                                    $modal_realisasi_update,
                                    $modal_rasio_update,
                                    $userID,
                                    $kd_kantor,	
                                    $jenis,
                                    $tgl){
      $this->db2 = $this->load->database('DB_CENTRO', true);
   	      	
      $this->db2->trans_start();
      $this->db2->query("UPDATE acc_das_rencana_realisasi ac
                          SET ac.`tgl_laporan` = '$modal_tgl_laporan_update',
                              ac.`kode_kantor` = '$modal_kode_kantor_update',
                              ac.`jenis` = '$modal_jenis_update',
                              ac.`rencana` = '$modal_rencana_update',
                              ac.`realisasi` = '$modal_realisasi_update',
                              ac.`rasio` = '$modal_rasio_update',
                              ac.`last_update` = NOW(),
                              ac.`update_by` = '$userID'
                          WHERE ac.kode_kantor = '$kd_kantor'
                                AND ac.tgl_laporan = '$tgl'
                                AND ac.jenis = '$jenis';");
      $this->db2->trans_complete();
      return 'sukses';
    }
}