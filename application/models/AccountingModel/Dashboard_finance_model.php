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

    function get_data_chart_npat_monthly($src_kode_kantor,$src_tgl_laporan){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT SUM(realisasi) AS realisasi,SUM(rencana) as rencana ,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rencana_realisasi ac WHERE ac.`jenis`='NPAT MONTHLY'  AND ac.kode_kantor like '$src_kode_kantor%'
      AND tgl_laporan BETWEEN DATE_ADD('$src_tgl_laporan-01',
      INTERVAL - 2 MONTH) AND DATE_ADD('$src_tgl_laporan-01',INTERVAL + 1 MONTH)
      GROUP BY DATE_FORMAT(tgl_laporan,'%M') desc");
     $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_chart_npat_ytd($src_kode_kantor,$src_tgl_laporan){ 
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT SUM(realisasi) AS realisasi,SUM(rencana) as rencana ,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rencana_realisasi ac WHERE ac.`jenis`='NPAT YTD' AND ac.kode_kantor like '$src_kode_kantor%'
      AND tgl_laporan BETWEEN DATE_ADD('$src_tgl_laporan-01',
      INTERVAL - 2 MONTH) AND DATE_ADD('$src_tgl_laporan-01',INTERVAL + 1 MONTH)
      GROUP BY DATE_FORMAT(tgl_laporan,'%M') desc");
     $query  = $this->db2->query($str);
     
     
     if($query->num_rows() > 0){
       foreach($query->result() as $data){
         $hasil[] = $data;
        }
        return $hasil;
        echo $this->db2->last_query;
      }
   
    }
    function get_data_chart_aset($src_kode_kantor,$src_tgl_laporan){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT SUM(realisasi) AS realisasi,SUM(rencana) as rencana ,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rencana_realisasi ac WHERE ac.`jenis`='ASET' AND ac.kode_kantor like '$src_kode_kantor%'
      AND tgl_laporan BETWEEN DATE_ADD('$src_tgl_laporan-01',
      INTERVAL - 2 MONTH) AND DATE_ADD('$src_tgl_laporan-01',INTERVAL + 1 MONTH)
      GROUP BY ac.`tgl_laporan`");
     $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_chart_aset_kredit($src_kode_kantor,$src_tgl_laporan){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT SUM(realisasi) AS realisasi,SUM(rencana) as rencana ,DATE_FORMAT(tgl_laporan,'%M') AS tgl_laporan 
      FROM acc_das_rencana_realisasi ac WHERE ac.`jenis`='ASET KREDIT' AND ac.kode_kantor like '$src_kode_kantor%'
      AND tgl_laporan BETWEEN DATE_ADD('$src_tgl_laporan-01',
      INTERVAL - 2 MONTH) AND DATE_ADD('$src_tgl_laporan-01',INTERVAL + 1 MONTH)
      GROUP BY ac.`tgl_laporan`");
     $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }

    function get_data_chart_modal($src_kode_kantor,$src_tgl_laporan){
        
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("	SELECT SUM(realisasi) AS realisasi,SUM(rencana) AS rencana,DATE_FORMAT(tgl_laporan, '%M') AS tgl_laporan,kode_kantor,
      tgl_laporan AS `asd`FROM acc_das_rencana_realisasi ac WHERE ac.`jenis` = 'modal'AND kode_kantor like '$src_kode_kantor%' 
      AND tgl_laporan BETWEEN DATE_ADD('$src_tgl_laporan-01',
      INTERVAL - 2 MONTH) AND DATE_ADD('$src_tgl_laporan-01',INTERVAL + 1 MONTH)
      GROUP BY DATE_FORMAT(tgl_laporan, '%M') desc");
     // echo $str;
     $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->result() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_speedometer($src_kode_kantor,$src_tgl_laporan){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT AVG(realisasi/rencana *100 ) AS total 
      FROM acc_das_rencana_realisasi WHERE jenis='ASET'AND kode_kantor like '$src_kode_kantor%'
      and date_format(tgl_laporan,'%Y-%m')like '$src_tgl_laporan%'");
     $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->row() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_speedometer_kredit($src_kode_kantor,$src_tgl_laporan){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT AVG(realisasi/rencana *100 ) AS total 
       FROM acc_das_rencana_realisasi WHERE jenis='ASET KREDIT'AND kode_kantor like '$src_kode_kantor%'
       and date_format(tgl_laporan,'%Y-%m')like '$src_tgl_laporan%'");
     $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->row() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_speedometer_npat_monthly($src_kode_kantor,$src_tgl_laporan){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT AVG(realisasi/rencana *100 ) AS total 
      FROM acc_das_rencana_realisasi WHERE jenis='NPAT MONTHLY'AND kode_kantor like '$src_kode_kantor%'
      and date_format(tgl_laporan,'%Y-%m')like '$src_tgl_laporan%'");
     $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->row() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }
    function get_data_speedometer_modal($src_kode_kantor,$src_tgl_laporan){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $str = ("SELECT AVG(realisasi/rencana *100 ) AS total 
        FROM acc_das_rencana_realisasi WHERE jenis='MODAL'AND kode_kantor like '$src_kode_kantor%'
        and date_format(tgl_laporan,'%Y-%m')like '$src_tgl_laporan%'");
     $query  = $this->db2->query($str);
    
    if($query->num_rows() > 0){
              foreach($query->row() as $data){
                  $hasil[] = $data;
              }
              return $hasil;
          }
      }

      public function sysdate(){
        $this->db2 = $this->load->database('DB_CENTRO', true);
        $str = "SELECT DATE_FORMAT(SYSDATE(), '%Y-%m') AS 'sysdate';";
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