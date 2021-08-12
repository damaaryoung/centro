<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Dashboard_ratio_model extends CI_Model{
	
    public function __construct() {
    	parent:: __construct();
    	$this->load->database();
    }
    function get_data_chart_capital($src_kode_kantor,$src_tgl_laporan)
    {
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT avg(rasio) AS rasio,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rasio ac WHERE ac.`jenis`='KPMM'  AND ac.`kode_kantor` like '$src_kode_kantor%'
      AND tgl_laporan like '$src_tgl_laporan%'
      GROUP BY tgl_laporan asc");
      $query  = $this->db2->query($str);
     //  echo $str;
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_chart_asset_kap($src_kode_kantor,$src_tgl_laporan)
    {
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT avg(rasio) AS rasio,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rasio ac WHERE ac.`jenis`='KAP' AND ac.`kode_kantor` like '$src_kode_kantor%'
      AND tgl_laporan like '$src_tgl_laporan%'
      GROUP BY tgl_laporan asc");
      $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_chart_asset_ppap($src_kode_kantor,$src_tgl_laporan)
    {
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT avg(rasio) AS rasio,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rasio ac WHERE ac.`jenis`='PPAP' AND ac.`kode_kantor` like '$src_kode_kantor%'
      AND tgl_laporan like '$src_tgl_laporan%' 
      GROUP BY tgl_laporan asc");
      $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_chart_rasio_earning_roa($src_kode_kantor,$src_tgl_laporan)
    {
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT avg(rasio) AS rasio,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rasio ac WHERE ac.`jenis`='ROA' AND ac.`kode_kantor` like '$src_kode_kantor%'
      AND tgl_laporan like '$src_tgl_laporan%'
     
      GROUP BY tgl_laporan asc");
      $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_chart_earning_bopo($src_kode_kantor,$src_tgl_laporan)
    {
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT avg(rasio) AS rasio,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rasio ac WHERE ac.`jenis`='BOPO' 
      AND ac.`kode_kantor` like '$src_kode_kantor%'
      AND tgl_laporan like '$src_tgl_laporan%'
     
      GROUP BY tgl_laporan asc");
      $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_chart_rasio_liquidity_cash_ratio($src_kode_kantor,$src_tgl_laporan)
    {
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT avg(rasio) AS rasio,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rasio ac WHERE ac.`jenis`='CASH RATIO' 
      AND ac.`kode_kantor` like '$src_kode_kantor%'
      AND tgl_laporan like '$src_tgl_laporan%'
      GROUP BY tgl_laporan asc");
      $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_chart_rasio_liquidity_ldr($src_kode_kantor,$src_tgl_laporan)
    {
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT avg(rasio) AS rasio,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rasio ac WHERE ac.`jenis`='LDR' 
      AND ac.`kode_kantor` like '$src_kode_kantor%'
      AND tgl_laporan like '$src_tgl_laporan%'
      GROUP BY tgl_laporan asc");
      $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    
   
      public function sysdate(){
        $this->db2 = $this->load->database('DB_CENTRO', true);
        $str = "SELECT DATE_FORMAT(SYSDATE(),'%Y') AS 'sysdate';";
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

}