<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Cash_in_save_model extends CI_Model{
	
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
    public function get_asuransi(){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT kks.`KODE_ASURANSI` AS `kode`,
                        CONCAT(kks.`KODE_ASURANSI`,' - ',kks.`DESKRIPSI_ASURANSI`) AS `nama`
                FROM kre_kode_asuransi kks
                WHERE kks.`flg_aktif` = '1';";
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
    public function get_data_cis($src_kode_kantor){
  		$this->db2 = $this->load->database('DB_CENTRO', true);
  		$str    = "SELECT 
                  ac.`id` AS `id`,
                  ac.`no_transaksi` AS `no_transaksi`,
                  ac.`tgl_cover` AS `tgl_cover`,
                  KKA.`DESKRIPSI_ASURANSI` AS `nama_asuransi`,
                  akk.nama_kantor AS `nama_kantor`,
                  ac.`limit_kas` AS `limit_kas`,
                  ac.`saldo_kas` AS `saldo_kas`,
                  ac.`kode_asuransi` as `kode_asuransi`,
                  CASE
                    WHEN AC.`status` = '0' 
                    THEN 'WAITING' 
                    WHEN AC.`status` = '1' 
                    THEN 'PROSES' 
                    WHEN AC.`status` = '2' 
                    THEN 'DONE' 
                  END AS `status`,
                  AC.`status` as `status_no`
                FROM
                  asuransi_cis AC 
                  LEFT JOIN app_kode_kantor AKK 
                    ON ac.`kode_kantor` = akk.`kode_kantor` 
                  LEFT JOIN kre_kode_asuransi KKA 
                    ON kka.`KODE_ASURANSI` = ac.`kode_asuransi`
                 WHERE ac.`kode_kantor` LIKE '$src_kode_kantor%'
                 ORDER BY ac.status ASC
                  LIMIT 25;";
          $query  = $this->db2->query($str);
          return $query->result_array();
  	}
    public function pengajuan_cis($modal_nama_asuransi,
                                  $modal_tgl_cover,
                                  $modal_kantor_cabang,
                                  $modal_limit_kas,
                                  $modal_saldo_akhir_kas,
                                  $userID){
          $this->db2 = $this->load->database('DB_CENTRO', true);
   		
          $this->db2->trans_start();
          $str    = "SELECT MAX(AC.no_transaksi) + 1 AS `no_transaksi` FROM asuransi_cis AC";
          $query  = $this->db2->query($str);
          $result = $query->result_array();
          if($result[0]["no_transaksi"] != null){
            $no_trans = $result[0]["no_transaksi"];
          }
          if($result[0]["no_transaksi"] == null){
            $no_trans = null;
          }
          $this->db2->query("INSERT INTO asuransi_cis (no_transaksi,
                                                        kode_asuransi, 
                                                        kode_kantor, 
                                                        limit_kas, 
                                                        saldo_kas,
                                                        tgl_cover, 
                                                        status,
                                                        created_at,
                                                        created_by)
                                  SELECT '$no_trans','$modal_nama_asuransi', '$modal_kantor_cabang', '$modal_limit_kas', '$modal_saldo_akhir_kas', 
                                          '$modal_tgl_cover','0', NOW() , '$userID' FROM DUAL;");
          $this->db2->trans_complete();
          $data['no_transaksi'] = $no_trans;
          $data['message'] = 'sukses';
          return $data;
    }
    public function get_details($id,$no_transaksi){
      $this->db2 = $this->load->database('DB_CENTRO', true);
  		$str    = "SELECT 
                    ac.`id` AS `id`,
                    ac.`no_transaksi` AS `no_transaksi`,
                    ac.`kode_asuransi`,
                    ac.`kode_kantor`,
                    ac.`tgl_cover` AS `tgl_cover`,  
                    ac.`limit_kas` AS `limit_kas`,
                    ac.`saldo_kas` AS `saldo_kas`,
                    ac.`root_document`,
                    ac.`root_address`,
                    ac.`path_file`,
                    ac.`file_name`,
                    KKA.`DESKRIPSI_ASURANSI` AS `nama_asuransi`,
                    akk.nama_kantor AS `nama_kantor`,
                    CASE
                      WHEN AC.`status` = '0' 
                      THEN 'WAITING' 
                      WHEN AC.`status` = '1' 
                      THEN 'PROSES' 
                      WHEN AC.`status` = '2' 
                      THEN 'DONE' 
                    END AS `status`,
                    ac.`notes`
                  FROM
                    asuransi_cis AC 
                    LEFT JOIN app_kode_kantor AKK 
                      ON ac.`kode_kantor` = akk.`kode_kantor` 
                    LEFT JOIN kre_kode_asuransi KKA 
                      ON kka.`KODE_ASURANSI` = ac.`kode_asuransi`
                  WHERE ac.id = '$id'
                  AND ac.no_transaksi = '$no_transaksi';";
          $query  = $this->db2->query($str);
          return $query->result_array();
    }
    public function update_cis_without_upload($id_update,
			    														         $no_transaksi_update,
			    														         $modal_nama_asuransi_update,
			    														         $modal_kantor_cabang_update,
			    														         $modal_tgl_cover_update,
			    														         $modal_limit_kas_update,
			    														         $modal_saldo_akhir_kas_update,
			    														         $userID){
          $this->db2 = $this->load->database('DB_CENTRO', true);
   		
          $this->db2->trans_start();
          $this->db2->query("UPDATE asuransi_cis ac
                              SET ac.`kode_asuransi` = '$modal_nama_asuransi_update',
                                  ac.`kode_kantor` = '$modal_kantor_cabang_update',
                                  ac.`tgl_cover` = '$modal_tgl_cover_update',
                                  ac.`limit_kas` = '$modal_limit_kas_update',
                                  ac.`saldo_kas` = '$modal_saldo_akhir_kas_update',
                                  ac.`status` = '0',
                                  ac.`updated_at` = NOW(),
                                  ac.`updated_by` = '$userID'
                              WHERE ac.id = '$id_update'
                              AND ac.no_transaksi = '$no_transaksi_update';");
          $this->db2->trans_complete();
          return 'sukses';
    }
    public function delete_cis($id,$no_transaksi,$status){
          $this->db2 = $this->load->database('DB_CENTRO', true);
   		
          $this->db2->trans_start();
          $this->db2->query("DELETE FROM asuransi_cis
                              WHERE id = '$id'
                              AND no_transaksi = '$no_transaksi';");
          $this->db2->trans_complete();
          return 'sukses';
    }
    public function get_data_search($src_kode_kantor,$src_search){
  		$this->db2 = $this->load->database('DB_CENTRO', true);
  		$str    = "SELECT 
                  ac.`id` AS `id`,
                  ac.`no_transaksi` AS `no_transaksi`,
                  ac.`tgl_cover` AS `tgl_cover`,
                  KKA.`DESKRIPSI_ASURANSI` AS `nama_asuransi`,
                  akk.nama_kantor AS `nama_kantor`,
                  ac.`limit_kas` AS `limit_kas`,
                  ac.`saldo_kas` AS `saldo_kas`,
                  ac.`kode_asuransi` as `kode_asuransi`,
                  CASE
                    WHEN AC.`status` = '0' 
                    THEN 'WAITING' 
                    WHEN AC.`status` = '1' 
                    THEN 'PROSES' 
                    WHEN AC.`status` = '2' 
                    THEN 'DONE' 
                  END AS `status`,
                  AC.`status` as `status_no`
                FROM
                  asuransi_cis AC 
                  LEFT JOIN app_kode_kantor AKK 
                    ON ac.`kode_kantor` = akk.`kode_kantor` 
                  LEFT JOIN kre_kode_asuransi KKA 
                    ON kka.`KODE_ASURANSI` = ac.`kode_asuransi`
                 WHERE ac.`no_transaksi` = '$src_search'
                 #AND ac.`no_transaksi` = '$src_kode_kantor'
                 ORDER BY ac.status ASC
                  LIMIT 25;";
          $query  = $this->db2->query($str);
          return $query->result_array();
  	}

    ///upload multiple files
    public function update_upload($id_update,
                                            $no_transaksi_update,
                                            $userID,
                                            $root_document,
                                            $root_address,
                                            $pathFile,
                                            $files_upload){
          $this->db2 = $this->load->database('DB_CENTRO', true);
   		
          $this->db2->trans_start();
          $this->db2->query("UPDATE asuransi_cis ac
                              SET ac.`root_document` = '$root_document',
                                  ac.`root_address` = '$root_address',
                                  ac.`path_file` = '$pathFile',
                                  ac.`file_name` = '$files_upload',
                                  ac.`updated_at` = NOW(),
                                  ac.`updated_by` = '$userID'
                              WHERE ac.id = '$id_update'
                              AND ac.no_transaksi = '$no_transaksi_update';");
          $this->db2->trans_complete();
          return 'sukses';
    }
    public function delete_upload($id_update,
                                    $no_transaksi_update,
                                    $userID,
                                    $files_upload){
          $this->db2 = $this->load->database('DB_CENTRO', true);
   		
          $this->db2->trans_start();
          $this->db2->query("UPDATE asuransi_cis ac
                              SET ac.`file_name` = '$files_upload',
                                  ac.`updated_at` = NOW(),
                                  ac.`updated_by` = '$userID'
                              WHERE ac.id = '$id_update'
                              AND ac.no_transaksi = '$no_transaksi_update';");
          $this->db2->trans_complete();
          return 'sukses';
    }

    public function send_mail_status($id_data,$userID){
      $this->db2 = $this->load->database('DB_CENTRO', true);
   		
      $this->db2->trans_start();
      $this->db2->query("UPDATE asuransi_cis ac
                          SET ac.`status` = '1',
                              ac.`updated_at` = NOW(),
                              ac.`updated_by` = '$userID'
                          WHERE ac.id IN ($id_data);");
      $this->db2->trans_complete();
      return 'sukses';
    }
    public function add_notes($id,$no_transaksi,$modal_notes,$userID){
      $this->db2 = $this->load->database('DB_CENTRO', true);
   
      $this->db2->trans_start();
      $this->db2->query("UPDATE asuransi_cis ac
                         SET ac.`status` = '2',
                             ac.`updated_at` = NOW(),
                             ac.`updated_by` = '$userID',
                             ac.`notes` = '$modal_notes'
                         WHERE ac.id = '$id'
                         AND ac.no_transaksi = '$no_transaksi';");
      $this->db2->trans_complete();
      return 'sukses';
    }
    public function get_data_send_mail($id_data){
  		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
  		$str = "SELECT 
                AKK.nama_kantor,
                CIS.`limit_kas`,
                CIS.`saldo_kas`
              FROM
                asuransi_cis CIS 
              LEFT JOIN app_kode_kantor AKK 
                ON akk.`kode_kantor` = CIS.`kode_kantor`
              WHERE CIS.`id` IN ($id_data);";
          $query = $this->db2->query($str);
          return $query->result_array();
  	}
    
  

}
?>
