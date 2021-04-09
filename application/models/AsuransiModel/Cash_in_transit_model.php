<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Cash_in_transit_model extends CI_Model{
	
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
    public function get_data_cit($src_kode_kantor){
        $this->db2 = $this->load->database('DB_CENTRO', true);
        $str    = "SELECT ac.`id`,
                           AC.`no_transaksi`,
                           AC.`tgl_cover`,
                           ac.`nama_bank`,
                           ac.`limit_cit_cabang`,
                           ac.`nominal_setor_cit`,
                           ac.`status`,
                           CASE
                            WHEN AC.`status` = '0' 
                            THEN 'WAITING' 
                            WHEN AC.`status` = '1' 
                            THEN 'EMAIL SEND' 
                          END AS `status_detail`,
                           akk.`nama_kantor`       
                    FROM
                      asuransi_cit AC 
                      LEFT JOIN app_kode_kantor AKK 
                        ON ac.`kode_kantor` = akk.`kode_kantor` 
                    WHERE ac.`kode_kantor` LIKE '$src_kode_kantor%' 
                    ORDER BY ac.status ASC 
                    LIMIT 25;";
        $query  = $this->db2->query($str);
        return $query->result_array();
    }
    public function pengajuan_cit($modal_tgl_cover,
                                  $modal_nama_bank,
                                  $modal_nomor_rekening,
                                  $modal_kantor_cabang,
                                  $modal_alamat_bank,
                                  $modal_pic_penyetor,
                                  $modal_limit_cit,
                                  $modal_nominal,
                                  $userID){
        $this->db2 = $this->load->database('DB_CENTRO', true);
   	     
        $this->db2->trans_start();
        $str    = "SELECT MAX(AC.no_transaksi) + 1 AS `no_transaksi` FROM asuransi_cit AC";
        $query  = $this->db2->query($str);
        $result = $query->result_array();
        if($result[0]["no_transaksi"] != null){
          $no_trans = $result[0]["no_transaksi"];
        }
        if($result[0]["no_transaksi"] == null){
          $no_trans = null;
        }
        $this->db2->query("INSERT INTO asuransi_cit (no_transaksi, 
                                                      kode_kantor,
                                                      tgl_cover, 
                                                      nama_bank,
                                                      no_rekening,
                                                      alamat_bank,
                                                      pic_penyetor,
                                                      limit_cit_cabang, 
                                                      nominal_setor_cit,
                                                      status,
                                                      created_by,
                                                      created_date)
                                SELECT '$no_trans', '$modal_kantor_cabang', '$modal_tgl_cover', '$modal_nama_bank', '$modal_nomor_rekening',
                                    '$modal_alamat_bank', '$modal_pic_penyetor', '$modal_limit_cit', '$modal_nominal', '0',
                                    '$userID', NOW() FROM DUAL;");
        $this->db2->trans_complete();
        $data['no_transaksi'] = $no_trans;
        $data['message'] = 'sukses';
        return $data;
    }
    public function delete_cit($id,$no_transaksi,$status){
      $this->db2 = $this->load->database('DB_CENTRO', true);
   
      $this->db2->trans_start();
      $this->db2->query("DELETE FROM asuransi_cit
                          WHERE id = '$id'
                          AND no_transaksi = '$no_transaksi';");
      $this->db2->trans_complete();
      return 'sukses';
    } 
    public function get_details($id,$no_transaksi){
      $this->db2 = $this->load->database('DB_CENTRO', true);
  		$str    = "SELECT AC.`id`,
                    AC.`no_transaksi`,
                    AC.`kode_kantor` as `kode_kantor`,
                    AC.`tgl_cover`,
                    AC.`nama_bank`,
                    AC.`no_rekening`,
                    AC.`alamat_bank`,
                    AC.`pic_penyetor`,
                    AC.`limit_cit_cabang`,
                    AC.`nominal_setor_cit`,
                    AC.`status`,
                    AC.`root_document`,
                    AC.`root_address`,
                    AC.`path_file`,
                    AC.`file_name`,
                    akk.`nama_kantor` AS `nama_kantor`
                  FROM
                    asuransi_cit AC 
                    LEFT JOIN app_kode_kantor AKK 
                      ON ac.`kode_kantor` = akk.`kode_kantor` 
                  WHERE ac.id = '$id'
                  AND ac.no_transaksi = '$no_transaksi';";
          $query  = $this->db2->query($str);
          return $query->result_array();
    }
    public function update_cit($id_update,
                            $no_transaksi_update,
                            $modal_tgl_cover_update,
                            $modal_nama_bank_update,
                            $modal_nomor_rekening_update,
                            $modal_alamat_bank_update,			
                            $modal_pic_penyetor_update,		
                            $modal_kantor_cabang_update,		
                            $modal_limit_cit_update,			
                            $modal_nominal_update,	
                            $userID){
      $this->db2 = $this->load->database('DB_CENTRO', true);
   		
      $this->db2->trans_start();
      $this->db2->query("UPDATE asuransi_cit ac
                          SET ac.`tgl_cover`         = '$modal_tgl_cover_update',
                              ac.`nama_bank`         = '$modal_nama_bank_update',
                              ac.`no_rekening`       = '$modal_nomor_rekening_update',
                              ac.`alamat_bank`       = '$modal_alamat_bank_update',
                              ac.`pic_penyetor`      = '$modal_pic_penyetor_update',
                              ac.`kode_kantor`       = '$modal_kantor_cabang_update',
                              ac.`limit_cit_cabang`  = '$modal_limit_cit_update',
                              ac.`nominal_setor_cit` = '$modal_nominal_update',
                              ac.`status`            = '0',
                              ac.`updated_by`        = '$userID',
                              ac.`updated_date`      = NOW()
                          WHERE ac.id = '$id_update'
                          AND ac.no_transaksi = '$no_transaksi_update';");
      $this->db2->trans_complete();
      return 'sukses';
    }
    public function update_upload($id_update,
                                            $no_transaksi_update,
                                            $userID,
                                            $root_document,
                                            $root_address,
                                            $pathFile,
                                            $files_upload){
          $this->db2 = $this->load->database('DB_CENTRO', true);
   		
          $this->db2->trans_start();
          $this->db2->query("UPDATE asuransi_cit ac
                              SET ac.`root_document` = '$root_document',
                                  ac.`root_address` = '$root_address',
                                  ac.`path_file` = '$pathFile',
                                  ac.`file_name` = '$files_upload',
                                  ac.`updated_by` = '$userID',
                                  ac.`updated_date` = NOW()
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
          $this->db2->query("UPDATE asuransi_cit ac
                              SET ac.`file_name` = '$files_upload',
                                  ac.`updated_date` = NOW(),
                                  ac.`updated_by` = '$userID'
                              WHERE ac.id = '$id_update'
                              AND ac.no_transaksi = '$no_transaksi_update';");
          $this->db2->trans_complete();
          return 'sukses';
    }
    public function get_data_search($src_kode_kantor,$src_search){
  		$this->db2 = $this->load->database('DB_CENTRO', true);
  		$str    = "SELECT ac.`id`,
                           AC.`no_transaksi`,
                           AC.`tgl_cover`,
                           ac.`nama_bank`,
                           ac.`limit_cit_cabang`,
                           ac.`nominal_setor_cit`,
                           ac.`status`,
                           CASE
                            WHEN AC.`status` = '0' 
                            THEN 'WAITING' 
                            WHEN AC.`status` = '1' 
                            THEN 'EMAIL SEND' 
                          END AS `status_detail`,
                           akk.`nama_kantor`       
                    FROM
                      asuransi_cit AC 
                  LEFT JOIN app_kode_kantor AKK 
                    ON ac.`kode_kantor` = akk.`kode_kantor` 
                 WHERE ac.`no_transaksi` = '$src_search'
                 #AND ac.`kode_kantor` = '$src_kode_kantor'
                 ORDER BY ac.status ASC
                  LIMIT 25;";
          $query  = $this->db2->query($str);
          return $query->result_array();
  	}
    public function send_mail_status($id,$no_transaksi,$userID){
      $this->db2 = $this->load->database('DB_CENTRO', true);
   		
      $this->db2->trans_start();
      $this->db2->query("UPDATE asuransi_cit ac
                          SET ac.`status` = '1',
                              ac.`updated_date` = NOW(),
                              ac.`updated_by` = '$userID'
                          WHERE ac.id = '$id'
                          AND ac.no_transaksi = '$no_transaksi';");
      $this->db2->trans_complete();
      return 'sukses';
    }
}

