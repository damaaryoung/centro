<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Pengajuan_klaim_asuransi_model extends CI_Model{
	
	public function __construct() {
		parent:: __construct();
		$this->load->database();
	}

	public function sysdate(){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT DATE_FORMAT(SYSDATE(), '%Y-%m') AS 'sysdate';";
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
  public function get_list_klaim_jaminan($src_kode_kantor,$jenis){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT AK.`no_rekening`,
                  AK.`jenis_klaim`,
                  AK.`no_reff_asuransi`,
                  AK.`jenis_asuransi`,
                  AK.`no_transaksi`,
                  CASE
                    WHEN AK.`status_klaim` = '0' 
                    THEN 'WAITING' 
                    WHEN AK.`status_klaim` = '1' 
                    THEN 'RETURN'
                    WHEN AK.`status_klaim` = '2' 
                    THEN 'PROSES' 
                    WHEN AK.`status_klaim` = '3' 
                    THEN 'DONE' 
                    WHEN AK.`status_klaim` = '4' 
                    THEN 'REJECT' 
                  END AS `status_klaim`,
                  K.`TGL_REALISASI`,
                  N.`NAMA_NASABAH`,
                  JH.`jenis_jaminan` 
                FROM
                  asuransi_klaim AK 
                  LEFT JOIN asuransi_cover AC 
                    ON ac.`no_rekening` = AK.`no_rekening` 
                    AND ac.`jenis_asuransi` = ak.`jenis_asuransi` 
                  LEFT JOIN KREDIT K 
                    ON K.`NO_REKENING` = AK.`no_rekening` 
                  LEFT JOIN NASABAH N 
                    ON N.`NASABAH_ID` = AC.`nasabah_id` 
                  LEFT JOIN JAMINAN_HEADER JH 
                    ON JH.`no_rekening` = AK.`no_rekening` 
                WHERE AC.`kode_kantor` = '$src_kode_kantor' 
                  AND AK.`jenis_asuransi` = '$jenis' 
                ORDER BY AK.STATUS_KLAIM ASC 
                LIMIT 25;";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
  public function search_polis_rek($src_search,$jenis){
    $this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
                  AK.`no_rekening`,
                  AK.`jenis_klaim`,
                  AK.`no_reff_asuransi`,
                  AK.`jenis_asuransi`,
                  AK.`no_transaksi`,
                  CASE
                    WHEN AK.`status_klaim` = '0' 
                    THEN 'WAITING' 
                    WHEN AK.`status_klaim` = '1' 
                    THEN 'RETURN'
                    WHEN AK.`status_klaim` = '2' 
                    THEN 'PROSES' 
                    WHEN AK.`status_klaim` = '3' 
                    THEN 'DONE' 
                    WHEN AK.`status_klaim` = '4' 
                    THEN 'REJECT' 
                  END AS `status_klaim`,
                  K.`TGL_REALISASI`,
                  N.`NAMA_NASABAH`,
                  JH.`jenis_jaminan` 
                FROM
                  asuransi_klaim AK 
                  LEFT JOIN asuransi_cover AC 
                    ON ac.`no_rekening` = AK.`no_rekening` 
                    AND ac.`jenis_asuransi` = ak.`jenis_asuransi` 
                  LEFT JOIN KREDIT K 
                    ON K.`NO_REKENING` = AK.`no_rekening` 
                  LEFT JOIN NASABAH N 
                    ON N.`NASABAH_ID` = AC.`nasabah_id` 
                  LEFT JOIN JAMINAN_HEADER JH 
                    ON JH.`no_rekening` = AK.`no_rekening` 
                WHERE (AK.`no_rekening` LIKE '$src_search%' 
                        OR AC.`no_polis` LIKE  '$src_search%') 
                  AND AK.`jenis_asuransi` = '$jenis' 
                ORDER BY AK.STATUS_KLAIM ASC
                LIMIT 25;";
        $query  = $this->db2->query($str);
        return $query->result_array();
  }
  public function get_data_jaminan($modal_rek_polis_jaminan,$jenis_asuransi){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
                    AC.`no_rekening`,
                    N.`NAMA_NASABAH`,
                    N.`TEMPATLAHIR`,
                    N.`TGLLAHIR`,
                    N.`TELPON`,
                    N.`ALAMAT` AS `alamat_nasabah`,
                    K.`TGL_REALISASI`,
                    K.`TGL_JATUH_TEMPO`,
                    K.`plafond`,
                    K.`jkw_asuransi`,
                    K.`jkw_asuransi_jiwa`,
                    K.`tinggi_asuransi_jiwa`,
                    K.`berat_asuransi_jiwa`,
                    JH.`jenis_jaminan`,
                    JH.`nama`,
                    JH.`alamat` AS `alamat_jaminan`,
                    KKA.`DESKRIPSI_ASURANSI`,
                    AC.`id_okupasi`,
                    K.`NILAI_ASURANSI`,
                    K.`nilai_asuransi_jiwa`,
                    AC.`rate`,
                    AC.`premi_asuransi`,
                    AC.`titipan_asuransi`,
                    AC.`no_reff_asuransi`,
                    AC.`no_polis`,
                    AKK.`nama_kantor`,
                    AKU.`root_document`,
                    AKU.`root_address`,
                    AKU.`path_file`,
                    AKU.`file_name`
                FROM
                    ASURANSI_COVER AC 
                LEFT JOIN NASABAH N 
                    ON N.`NASABAH_ID` = AC.`nasabah_id` 
                LEFT JOIN KREDIT K 
                    ON K.`NO_REKENING` = AC.`no_rekening` 
                LEFT JOIN JAMINAN_HEADER JH 
                    ON JH.`no_rekening` = AC.`no_rekening` 
                LEFT JOIN kre_kode_asuransi KKA 
                    ON KKA.`KODE_ASURANSI` = (SELECT CASE 
                                                  WHEN AC.`jenis_asuransi` = 'JAMINAN'
                                                    THEN K.`KODE_ASURANSI`
                                                  WHEN AC.`jenis_asuransi` = 'JIWA'
                                                    THEN K.`kode_asuransi_jiwa`
                                                END AS `kode_asuransi`
                                              FROM kredit k1
                                              WHERE K1.`NO_REKENING` = AC.`no_rekening`) 
                LEFT JOIN app_kode_kantor AKK
					          ON AKK.`kode_kantor` = AC.`kode_kantor`
                LEFT JOIN asuransi_klaim_upload AKU
		                ON AKU.`no_rekening` = AC.`no_rekening`
		                AND AKU.`jenis_asuransi` = AC.`jenis_asuransi`    
                WHERE (AC.`no_rekening` = '$modal_rek_polis_jaminan' 
                       OR AC.`no_polis` = '$modal_rek_polis_jaminan')
                AND AC.`jenis_asuransi` = '$jenis_asuransi'
                AND AC.`status_cover` = 'SUDAH'
                AND AC.`no_polis` IS NOT NULL
                LIMIT 1;";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
  public function pengajuan_klaim_jaminan($modal_rek_jaminan,
                                          $modal_reff_asuransi_jaminan,
                                          $userID,
                                          $jenis_asuransi,
                                          $modal_jenis_klaim_jaminan){
        $this->db2 = $this->load->database('DB_CENTRO', true);
		
        $this->db2->trans_start();
        $str    = "SELECT MAX(ak.no_transaksi) + 1 AS `no_transaksi` FROM asuransi_klaim AK";
        $query  = $this->db2->query($str);
        $result = $query->result_array();
        if($result[0]["no_transaksi"] != null){
          $no_trans = $result[0]["no_transaksi"];
        }
        if($result[0]["no_transaksi"] == null){
          $no_trans = null;
        }
        $this->db2->query("INSERT INTO asuransi_klaim (no_transaksi,
                                                            no_reff_asuransi, 
                                                            no_rekening, 
                                                            jenis_asuransi, 
                                                            jenis_klaim,
                                                            status_klaim, 
                                                            root_document, 
                                                            root_address,
                                                            path_file,
                                                            file_name,
                                                            created_by,
                                                            create_date)
                            SELECT  D.no_transaksi,
                                    D.no_reff_asuransi,
                                    D.no_rekening,
                                    D.jenis_asuransi,
                                    D.jenis_klaim,
                                    D.status_klaim,
                                    AKU.`root_document`,
                                    AKU.`root_address`,
                                    AKU.`path_file`,
                                    AKU.`file_name`,
                                    D.created_by,
                                    D.create_date 
                            FROM
                             (SELECT 
                               '$no_trans' AS `no_transaksi`,
                               '$modal_reff_asuransi_jaminan' AS `no_reff_asuransi`,
                               '$modal_rek_jaminan' AS `no_rekening`,
                               '$jenis_asuransi' AS `jenis_asuransi`,
                               '$modal_jenis_klaim_jaminan' AS `jenis_klaim`,
                               '0' AS `status_klaim`,
                               '$userID' AS `created_by`,
                               NOW() AS `create_date` 
                             FROM DUAL) D 
                             LEFT JOIN asuransi_klaim_upload AKU 
                               ON AKU.no_rekening = '$modal_rek_jaminan' 
                               AND AKU.jenis_asuransi = '$jenis_asuransi';");
        $this->db2->query("DELETE FROM asuransi_klaim_upload 
                            WHERE no_rekening = '$modal_rek_jaminan' 
                            AND jenis_asuransi = '$jenis_asuransi';");                     
        $this->db2->trans_complete();
        return 'sukses';
  }
  public function delete_pengajuan_klaim_jaminan($rekening,$jenis,$no_transaksi){
        $this->db2 = $this->load->database('DB_CENTRO', true);
		
        $this->db2->trans_start();
        $this->db2->query("DELETE FROM asuransi_klaim 
                            WHERE `no_rekening` = '$rekening'
                            AND `no_transaksi`  = '$no_transaksi';");
        $this->db2->trans_complete();
        return 'sukses';
  }
  public function get_data_update_jaminan($rekening,$jenis,$no_reff_asuransi,$no_transaksi){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
                  AC.`no_rekening`,
                  N.`NAMA_NASABAH`,
                  N.`TEMPATLAHIR`,
                  N.`TGLLAHIR`,
                  N.`TELPON`,
                  N.`ALAMAT` AS `alamat_nasabah`,
                  K.`TGL_REALISASI`,
                  K.`TGL_JATUH_TEMPO`,
                  K.`plafond`,
                  K.`jkw_asuransi`,
                  K.`jkw_asuransi_jiwa`,
                  K.`tinggi_asuransi_jiwa`,
                  K.`berat_asuransi_jiwa`,
                  JH.`jenis_jaminan`,
                  JH.`nama`,
                  JH.`alamat` AS `alamat_jaminan`,
                  KKA.`DESKRIPSI_ASURANSI`,
                  AC.`id_okupasi`,
                  K.`NILAI_ASURANSI`,
                  K.`nilai_asuransi_jiwa`,
                  AC.`rate`,
                  AC.`premi_asuransi`,
                  AC.`titipan_asuransi`,
                  AC.`no_reff_asuransi`,
                  AC.`no_polis`,
                  AKK.`nama_kantor`,
                  AK.`no_transaksi`,
                  AK.`jenis_asuransi`,
                  AK.`jenis_klaim`,
                  AK.`root_document`,
                  AK.`root_address`,
                  AK.`path_file`,
                  AK.`file_name`,
                  AK.`ket_return`
                FROM
                  ASURANSI_KLAIM AK 
                  LEFT JOIN ASURANSI_COVER AC
                    ON AC.`no_rekening` = AK.`no_rekening`
                    AND AC.`jenis_asuransi` = AK.`jenis_asuransi`
                  LEFT JOIN NASABAH N 
                    ON N.`NASABAH_ID` = AC.`nasabah_id` 
                  LEFT JOIN KREDIT K 
                    ON K.`NO_REKENING` = AC.`no_rekening` 
                  LEFT JOIN JAMINAN_HEADER JH 
                    ON JH.`no_rekening` = AC.`no_rekening` 
                  LEFT JOIN kre_kode_asuransi KKA 
                    ON KKA.`KODE_ASURANSI` = (SELECT CASE 
                                                  WHEN AC.`jenis_asuransi` = 'JAMINAN'
                                                    THEN K.`KODE_ASURANSI`
                                                  WHEN AC.`jenis_asuransi` = 'JIWA'
                                                    THEN K.`kode_asuransi_jiwa`
                                                END AS `kode_asuransi`
                                              FROM kredit k1
                                              WHERE K1.`NO_REKENING` = AC.`no_rekening`) 
                  LEFT JOIN app_kode_kantor AKK 
                    ON AKK.`kode_kantor` = AC.`kode_kantor`
                WHERE AC.`no_rekening` = '$rekening' 
                  AND AC.`jenis_asuransi` = '$jenis' 
                  AND AK.`no_transaksi` = '$no_transaksi'
                LIMIT 1;";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
  public function update_without_upload($rek_update,$no_transaksi,$jenis_asuransi,$upload_update,$jenis_klaim,$userID,$status){
    $this->db2 = $this->load->database('DB_CENTRO', true);
        $this->db2->trans_start();
        $this->db2->query("UPDATE asuransi_klaim AK
                            SET AK.`jenis_klaim` = '$jenis_klaim',
                                AK.`ket_return`   = '',
                                AK.`status_klaim` = '$status',
                                AK.`updated_by`  = '$userID',
                                AK.`updated_date`= NOW()
                            WHERE AK.`no_rekening` = '$rek_update'
                            AND AK.`no_transaksi` = '$no_transaksi'
                            AND AK.`jenis_asuransi` = '$jenis_asuransi';");
        $this->db2->trans_complete();
        return 'sukses';
  }  

  /// jiwa ///
  public function get_data_jiwa($modal_rek_polis_jiwa,$jenis_asuransi){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
                    AC.`no_rekening`,
                    N.`NAMA_NASABAH`,
                    N.`TEMPATLAHIR`,
                    N.`TGLLAHIR`,
                    N.`TELPON`,
                    N.`ALAMAT` AS `alamat_nasabah`,
                    K.`TGL_REALISASI`,
                    K.`TGL_JATUH_TEMPO`,
                    K.`plafond`,
                    K.`jkw_asuransi`,
                    K.`jkw_asuransi_jiwa`,
                    K.`tinggi_asuransi_jiwa`,
                    K.`berat_asuransi_jiwa`,
                    JH.`jenis_jaminan`,
                    JH.`nama`,
                    JH.`alamat` AS `alamat_jaminan`,
                    KKA.`DESKRIPSI_ASURANSI`,
                    AC.`id_okupasi`,
                    K.`NILAI_ASURANSI`,
                    K.`nilai_asuransi_jiwa`,
                    AC.`rate`,
                    AC.`premi_asuransi`,
                    AC.`titipan_asuransi`,
                    AC.`no_reff_asuransi`,
                    AC.`no_polis`,
                    AKK.`nama_kantor`,
                    AKU.`root_document`,
                    AKU.`root_address`,
                    AKU.`path_file`,
                    AKU.`file_name`
                FROM
                    ASURANSI_COVER AC 
                LEFT JOIN NASABAH N 
                    ON N.`NASABAH_ID` = AC.`nasabah_id` 
                LEFT JOIN KREDIT K 
                    ON K.`NO_REKENING` = AC.`no_rekening` 
                LEFT JOIN JAMINAN_HEADER JH 
                    ON JH.`no_rekening` = AC.`no_rekening` 
                LEFT JOIN kre_kode_asuransi KKA 
                    ON KKA.`KODE_ASURANSI` = (SELECT CASE 
                                                  WHEN AC.`jenis_asuransi` = 'JAMINAN'
                                                    THEN K.`KODE_ASURANSI`
                                                  WHEN AC.`jenis_asuransi` = 'JIWA'
                                                    THEN K.`kode_asuransi_jiwa`
                                                END AS `kode_asuransi`
                                              FROM kredit k1
                                              WHERE K1.`NO_REKENING` = AC.`no_rekening`)  
                LEFT JOIN app_kode_kantor AKK
					          ON AKK.`kode_kantor` = AC.`kode_kantor`
                LEFT JOIN asuransi_klaim_upload AKU
		                ON AKU.`no_rekening` = AC.`no_rekening`
		                AND AKU.`jenis_asuransi` = AC.`jenis_asuransi` 
                WHERE (AC.`no_rekening` = '$modal_rek_polis_jiwa' 
                       OR AC.`no_polis` = '$modal_rek_polis_jiwa')
                AND AC.`jenis_asuransi` = '$jenis_asuransi'
                AND AC.`status_cover` = 'SUDAH'
                AND AC.`no_polis` IS NOT NULL
                LIMIT 1;";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
  public function pengajuan_klaim_jiwa($modal_rek_jiwa,
																					$modal_reff_asuransi_jiwa,
																					$userID,
																					$jenis_asuransi,
																					$modal_jenis_klaim_jiwa){
        $this->db2 = $this->load->database('DB_CENTRO', true);
		
        $this->db2->trans_start();
        $str    = "SELECT MAX(ak.no_transaksi) + 1 AS `no_transaksi` FROM asuransi_klaim AK";
        $query  = $this->db2->query($str);
        $result = $query->result_array();
        if($result[0]["no_transaksi"] != null){
          $no_trans = $result[0]["no_transaksi"];
        }
        if($result[0]["no_transaksi"] == null){
          $no_trans = null;
        }
        $this->db2->query("INSERT INTO asuransi_klaim (no_transaksi,
                                                            no_reff_asuransi, 
                                                            no_rekening, 
                                                            jenis_asuransi, 
                                                            jenis_klaim,
                                                            status_klaim, 
                                                            root_document, 
                                                            root_address,
                                                            path_file,
                                                            file_name,
                                                            created_by,
                                                            create_date)
                            SELECT  D.no_transaksi,
                                    D.no_reff_asuransi,
                                    D.no_rekening,
                                    D.jenis_asuransi,
                                    D.jenis_klaim,
                                    D.status_klaim,
                                    AKU.`root_document`,
                                    AKU.`root_address`,
                                    AKU.`path_file`,
                                    AKU.`file_name`,
                                    D.created_by,
                                    D.create_date 
                            FROM
                             (SELECT 
                               '$no_trans' AS `no_transaksi`,
                               '$modal_reff_asuransi_jiwa' AS `no_reff_asuransi`,
                               '$modal_rek_jiwa' AS `no_rekening`,
                               '$jenis_asuransi' AS `jenis_asuransi`,
                               '$modal_jenis_klaim_jiwa' AS `jenis_klaim`,
                               '0' AS `status_klaim`,
                               '$userID' AS `created_by`,
                               NOW() AS `create_date` 
                             FROM DUAL) D 
                             LEFT JOIN asuransi_klaim_upload AKU 
                               ON AKU.no_rekening = '$modal_rek_jiwa' 
                               AND AKU.jenis_asuransi = '$jenis_asuransi';");
        $this->db2->query("DELETE FROM asuransi_klaim_upload 
                            WHERE no_rekening = '$modal_rek_jiwa' 
                            AND jenis_asuransi = '$jenis_asuransi';"); 
        $this->db2->trans_complete();
        return 'sukses';
  }

  public function upload_file($up_rek,
                              $up_polis,
                              $userID,
                              $fileUploadsLength,
                              $jenis,
                              $root_document,
                              $root_address,
                              $pathFile,
                              $files_upload){
        $this->db2 = $this->load->database('DB_CENTRO', true);

        $str    = "SELECT 1 FROM asuransi_klaim_upload AKU
                    WHERE AKU.`no_rekening` = '$up_rek'
                    AND AKU.`jenis_asuransi` = '$jenis';";
        $query  = $this->db2->query($str);
        $result = $query->result_array();
        
            
        if(isset($result[0]["1"])){
          $data =  $result[0]["1"];
        }else{
          $data = null;
        }
		
        $this->db2->trans_start();
        if($data != null){
          $this->db2->query("UPDATE asuransi_klaim_upload AKU
                            SET AKU.`root_document`  = '$root_document', 
                                AKU.`root_address`   = '$root_address',
                                AKU.`path_file`      = '$pathFile',
                                AKU.`file_name`      = '$files_upload'
                            WHERE AKU.`no_rekening`  = '$up_rek'
                            AND AKU.`jenis_asuransi` = '$jenis';");
        }else{
          $fileUploads = array();
            $this->db2->query("INSERT INTO asuransi_klaim_upload(no_rekening, 
                                                            jenis_asuransi, 
                                                            root_document, 
                                                            root_address,
                                                            path_file,
                                                            file_name)
                                SELECT '$up_rek','$jenis', '$root_document', '$root_address', '$pathFile', '$files_upload' FROM DUAL;");
        }
        
        $this->db2->trans_complete();
        return 'sukses';
  }
  public function delete_upload_file($up_rek,$jenis,$files_upload){
    $this->db2 = $this->load->database('DB_CENTRO', true);
        $this->db2->trans_start();
        $this->db2->query("UPDATE asuransi_klaim_upload AKU
                            SET AKU.`file_name` = '$files_upload'
                            WHERE AKU.`no_rekening` = '$up_rek'
                            AND AKU.`jenis_asuransi` = '$jenis';");
        $this->db2->trans_complete();
        return 'sukses';
  }  
  public function upload_file_update($up_rek,
																						$up_polis,
																						$no_transaksi,
																						$jenis,
																						$userID,
																						$files_upload){
    $this->db2 = $this->load->database('DB_CENTRO', true);
        $this->db2->trans_start();
        $this->db2->query("UPDATE asuransi_klaim AK
                           SET AK.`file_name` = '$files_upload',
                               AK.`updated_by`  = '$userID',
                               AK.`updated_date`= NOW()
                           WHERE AK.`no_rekening` = '$up_rek'
                           AND AK.`no_transaksi` = '$no_transaksi'
                           AND AK.`jenis_asuransi` = '$jenis';");
        $this->db2->trans_complete();
        return 'sukses';
  } 

}
?>
