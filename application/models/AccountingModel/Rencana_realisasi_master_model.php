<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Rencana_realisasi_master_model extends CI_Model{
	
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
    public function get_master(){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT * FROM acc_das_rencana_realisasi_master;";
        $query = $this->db2->query($str);
        return $query->result_array();
     }
 
    public function insert_master($modal_jenis,
                                    $modal_flag_mutasi,
                                    $modal_kode_perk,
                                    $userID){
        $this->db2 = $this->load->database('DB_CENTRO', true);
   	       
        $this->db2->trans_begin();
        $this->db2->query("INSERT INTO acc_das_rencana_realisasi_master (jenis,
                                                                    kode_perk,
                                                                    flag_mutasi, 
                                                                    create_date,
                                                                    create_by)
                                                                    SELECT'$modal_jenis','$modal_kode_perk','$modal_flag_mutasi',NOW(), '$userID' FROM DUAL;");
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
    public function delete_rencana($jenis){
        $this->db2 = $this->load->database('DB_CENTRO', true);
         
        $this->db2->trans_begin();
        $this->db2->query("DELETE FROM acc_das_rencana_realisasi_master
                            WHERE  jenis = '$jenis';");
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

    public function get_details($jenis){
        $this->db2 = $this->load->database('DB_CENTRO', true);
        $str    = "SELECT a.jenis AS `jenis`,
                            a.flag_mutasi AS `flag_mutasi`,
                            a.kode_perk as `kode_perk`  
                     
                    FROM acc_das_rencana_realisasi_master a
                    WHERE a.jenis = '$jenis'
                    LIMIT 1;";
        $query  = $this->db2->query($str);
        return $query->result_array();
    }

    public function update_rencana($modal_jenis_update,
                                    $modal_flag_mutasi_update,
                                    $modal_kode_perk_update,
                                    $jenis,
                                    $userID){
      $this->db2 = $this->load->database('DB_CENTRO', true);
   	      	
      $this->db2->trans_start();
      $this->db2->query("UPDATE acc_das_rencana_realisasi_master ac
                          SET ac.`jenis` = '$modal_jenis_update',
                              ac.`flag_mutasi` = '$modal_flag_mutasi_update',
                              ac.`kode_perk`='$modal_kode_perk_update',
                              ac.`last_update` = NOW(),
                              ac.`update_by` = '$userID'
                          WHERE ac.jenis = '$jenis';");
      $this->db2->trans_complete();
      return 'sukses';
    }

    public function get_search($search){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str    = "SELECT jenis,flag_mutasi,kode_perk FROM acc_das_rencana_realisasi_master ac
                  where ac.`jenis` like ('$search%')
            limit 30;";
          $query  = $this->db2->query($str);
          return $query->result_array();
    }
}