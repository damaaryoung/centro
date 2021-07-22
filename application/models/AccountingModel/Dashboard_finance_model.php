<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Dashboard_finance_model extends CI_Model{
	
    public function __construct() {
    	parent:: __construct();
    	$this->load->database();
    }

    public function get_search($search){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str    = "SELECT jenis,flag_mutasi,kode_perk FROM acc_das_rencana_realisasi_master ac
                  where ac.`jenis` like ('$search%')
            limit 30;";
          $query  = $this->db2->query($str);
          return $query->result_array();
    }

    function get_data_chart_npat_monthly(){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT SUM(realisasi) AS realisasi,SUM(rencana) as rencana ,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rencana_realisasi ac WHERE ac.`jenis`='NPAT MONTHLY' GROUP BY ac.`tgl_laporan`");
     $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_chart_npat_ytd(){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT SUM(realisasi) AS realisasi,SUM(rencana) as rencana ,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rencana_realisasi ac WHERE ac.`jenis`='NPAT YTD' GROUP BY ac.`tgl_laporan`");
     $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_chart_aset(){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT SUM(realisasi) AS realisasi,SUM(rencana) as rencana ,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rencana_realisasi ac WHERE ac.`jenis`='ASET' GROUP BY ac.`tgl_laporan`");
     $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_chart_aset_kredit(){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT SUM(realisasi) AS realisasi,SUM(rencana) as rencana ,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rencana_realisasi ac WHERE ac.`jenis`='ASET KREDIT' GROUP BY ac.`tgl_laporan`");
     $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_chart_modal(){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT SUM(realisasi) AS realisasi,SUM(rencana) as rencana ,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rencana_realisasi ac WHERE ac.`jenis`='MODAL' GROUP BY ac.`tgl_laporan`");
     $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
}