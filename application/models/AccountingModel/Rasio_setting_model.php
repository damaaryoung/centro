<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Rasio_setting_model extends CI_Model{
	
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
    public function selectKodeKantor(){
  		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
  		$str = "SELECT AKK.kode_kantor, AKK.kode_cabang, AKK.nama_kantor, AKK.`flg_aktif` 
  				    FROM `app_kode_kantor` AKK;";
          $query = $this->db2->query($str);
          return $query->result_array();
  	}
    public function get_data_rasio_setting($src_kode_kantor, $src_tgl_laporan){ 
        $this->db2 = $this->load->database('DB_CENTRO', true);
        $str    = "SELECT a.tgl_laporan AS `tgl_laporan`,
                            a.kode_kantor AS `kode_kantor`,
                            CASE WHEN kk.nama_kantor IS NOT NULL 
                                THEN kk.nama_kantor
                                ELSE 'ALL' 
                            END AS `nama_kantor`,
                            a.jenis AS `jenis`,
                            a.jumlah1 AS `rencana`,
                            a.jumlah2 AS `realisasi`,
                            a.rasio AS `rasio`
                    FROM acc_das_rasio a
                    LEFT JOIN app_kode_kantor kk
                    ON kk.kode_kantor = a.kode_kantor 
                    WHERE a.tgl_laporan =  dpm_online.get_eom('$src_tgl_laporan')
                    AND a.kode_kantor LIKE '$src_kode_kantor%';";
        $query  = $this->db2->query($str);
        return $query->result_array();
    }



    //// rasio setting model


    public function get_master(){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT * FROM acc_das_rasio_master;";
        $query = $this->db2->query($str);
        return $query->result_array();
    }
    public function search_data_rasio_master($src_search){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT * FROM acc_das_rasio_master 
                WHERE jenis LIKE '$src_search%';";
        $query = $this->db2->query($str);
        return $query->result_array();
    }
    public function insert_master($modal_jenis,
                                    $modal_flag_mutasi,
                                    $modal_kode_perk1,
                                    $modal_kode_perk2,
                                    $userID){
        $this->db2 = $this->load->database('DB_CENTRO', true);
   	       
        $this->db2->trans_begin();
        $this->db2->query("INSERT INTO acc_das_rasio_master (jenis,
                                                             kode_perk1,
                                                             kode_perk2,
                                                             flag_mutasi, 
                                                             create_date,
                                                             create_by)
                            SELECT'$modal_jenis','$modal_kode_perk1','$modal_kode_perk2','$modal_flag_mutasi',NOW(), '$userID' FROM DUAL;");
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
        $this->db2->query("DELETE FROM acc_das_rasio_master
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
                            a.kode_perk1 as `kode_perk1`,
                            a.kode_perk2 as `kode_perk2`
                     
                    FROM acc_das_rasio_master a
                    WHERE a.jenis = '$jenis'
                    LIMIT 1;";
        $query  = $this->db2->query($str);
        return $query->result_array();
    }

    public function update_rencana($modal_jenis_update,
                                    $modal_kode_perk1_update,
                                    $modal_kode_perk2_update,
                                    $modal_flag_mutasi_update,
                                    $jenis,
                                    $userID){
      $this->db2 = $this->load->database('DB_CENTRO', true);
   	      	
      $this->db2->trans_start();
      $this->db2->query("UPDATE acc_das_rasio_master ac
                          SET ac.`jenis` = '$modal_jenis_update',
                              ac.`kode_perk1`='$modal_kode_perk1_update',
                              ac.`kode_perk2`='$modal_kode_perk2_update',
                              ac.`flag_mutasi` = '$modal_flag_mutasi_update',
                              ac.`last_update` = NOW(),
                              ac.`update_by` = '$userID'
                          WHERE ac.jenis = '$jenis';");
      $this->db2->trans_complete();
      return 'sukses';
    }
 

}


// I won't open these eyes
// Like there's chaos in my mind
// Like dreaming of death, or
// That feeling that you get
// When the disk is corrupt
// When we're running low on luck
// Yeah, and everyone's

// Drugged up, tripping at midnight
// While howling at the moonlight
// Dancing with knives like
// The fire, it will burn on
// High at my day job
// I tried to set some bombs off
// While smoking some napalm
// It makes me want to

// Everyone has crossed the line
// Now and then you will be fine

// I live on the edge, I must be losing my mind
// Get out of my head, it's now the scene of a crime
// This world is on fire, and I am ice
// Can't balance things lately, I think we're gonna die
// Must be losing my mind

// Stop now
// What is this bullshit?
// I said we're not alone
// And the government knows it
// There's idiots abound
// And they're all fucking racist
// I'll put us back at ease
// 'Cause we need more complacence
// We're all gonna die

// Everyone, has crossed the line
// Now and then you will be fine

// I live on the edge, I must be losing my mind
// Get out of my head, it's now the scene of a crime
// This world is on fire, and I am ice
// Can't balance things lately, I think we're gonna die
// I live on the edge, I must be losing my mind
// I'm staying in bed to watch the cities ignite
// The devil ain't retired, he's just thinking out loud
// Everyone is crazy, and it's freaking me out
// I must be losing my mind

// (I must be losing, I must be losing...)

// I live on the edge, I must be losing my mind
// Get out of my head, it's now the scene of a crime
// This world is on fire, and I am ice
// Can't balance things lately, I think we're gonna die
// I live on the edge of fucking losing my mind
// The voice in my head is now a fatal house fire
// The devil made us beg, and then he took away the high
// They say that we're crazy, now it's sounding about right
// I must be losing my mind
