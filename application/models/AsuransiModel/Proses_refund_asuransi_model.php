<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Proses_refund_asuransi_model extends CI_Model{
	
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
  public function get_list_refund($src_kode_kantor,$jenis){
        $this->db2 = $this->load->database('DB_CENTRO', true);
        $str    = "SELECT AR.`no_rekening`,
                    AR.`jenis_refund`,
                    AR.`no_reff_asuransi`,
                    AR.`jenis_asuransi`,
                    AR.`no_transaksi`,
                    CASE
                      WHEN AR.`status_refund` = '0' 
                      THEN 'WAITING' 
                      WHEN AR.`status_refund` = '1' 
                      THEN 'RETURN'
                      WHEN AR.`status_refund` = '2' 
                      THEN 'PROSES' 
                      WHEN AR.`status_refund` = '3' 
                      THEN 'DONE' 
                      WHEN AR.`status_refund` = '4' 
                      THEN 'REJECT' 
                      END AS `status_refund`,
                    K.`TGL_REALISASI`,
                    N.`NAMA_NASABAH`,
                    JH.`jenis_jaminan` 
                  FROM
                    asuransi_refund AR 
                    LEFT JOIN asuransi_cover AC 
                      ON ac.`no_rekening` = AR.`no_rekening` 
                      AND ac.`jenis_asuransi` = AR.`jenis_asuransi` 
                    LEFT JOIN KREDIT K 
                      ON K.`NO_REKENING` = AR.`no_rekening` 
                    LEFT JOIN NASABAH N 
                      ON N.`NASABAH_ID` = AC.`nasabah_id` 
                    LEFT JOIN JAMINAN_HEADER JH 
                      ON JH.`no_rekening` = AR.`no_rekening` 
                  WHERE AC.`kode_kantor` = '$src_kode_kantor' 
                    AND AR.`jenis_asuransi` = '$jenis' 
                    AND AR.status_refund IN ('0','2','3','4')
                  ORDER BY AR.status_refund ASC 
                  LIMIT 25;";
      $query  = $this->db2->query($str);
      return $query->result_array();
  }
  public function search_polis_rek($src_search,$jenis){
    $this->db2 = $this->load->database('DB_CENTRO', true);
    $str    = "SELECT 
                  AR.`no_rekening`,
                  AR.`jenis_refund`,
                  AR.`no_reff_asuransi`,
                  AR.`jenis_asuransi`,
                  AR.`no_transaksi`,
                  CASE
                    WHEN AR.`status_refund` = '0' 
                    THEN 'WAITING' 
                    WHEN AR.`status_refund` = '1' 
                    THEN 'RETURN'
                    WHEN AR.`status_refund` = '2' 
                    THEN 'PROSES' 
                    WHEN AR.`status_refund` = '3' 
                    THEN 'DONE' 
                    WHEN AR.`status_refund` = '4' 
                    THEN 'REJECT' 
                  END AS `status_refund`,
                  K.`TGL_REALISASI`,
                  N.`NAMA_NASABAH`,
                  JH.`jenis_jaminan` 
                FROM
                  asuransi_refund AR 
                  LEFT JOIN asuransi_cover AC 
                    ON ac.`no_rekening` = AR.`no_rekening` 
                    AND ac.`jenis_asuransi` = AR.`jenis_asuransi` 
                  LEFT JOIN KREDIT K 
                    ON K.`NO_REKENING` = AR.`no_rekening` 
                  LEFT JOIN NASABAH N 
                    ON N.`NASABAH_ID` = AC.`nasabah_id` 
                  LEFT JOIN JAMINAN_HEADER JH 
                    ON JH.`no_rekening` = AR.`no_rekening` 
                WHERE (AR.`no_rekening` LIKE '$src_search%' 
                        OR AC.`no_polis` LIKE  '$src_search%') 
                  AND AR.`jenis_asuransi` = '$jenis' 
                  AND AR.status_refund IN ('0','2','3','4')
                ORDER BY AR.status_refund ASC
                LIMIT 25;";
        $query  = $this->db2->query($str);
        return $query->result_array();
  }

  public function get_data_update($rekening,$jenis,$no_reff_asuransi,$no_transaksi){
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
                  AR.`no_transaksi`,
                  AR.`jenis_asuransi`,
                  AR.`jenis_refund`,
                  AR.`root_document`,
                  AR.`root_address`,
                  AR.`path_file` ,
                  AR.`file_name`,
                  AR.`status_refund`,
                  AR.`send_mail`,
                  KKA.`email` as `email`,
                  AR.`create_date`
                FROM
                  asuransi_refund AR 
                  LEFT JOIN ASURANSI_COVER AC
                    ON AC.`no_rekening` = AR.`no_rekening`
                    AND AC.`jenis_asuransi` = AR.`jenis_asuransi`
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
                  AND AR.`no_transaksi` = '$no_transaksi'
                LIMIT 1;";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
   
  public function proses_return($rek_update,$no_transaksi,$jenis_asuransi,$status,$userID,$ket_return){
    $this->db2 = $this->load->database('DB_CENTRO', true);
    $this->db2->trans_start();
    $this->db2->query("UPDATE asuransi_refund AR
                        SET AR.`status_refund` = '$status',
                            AR.`ket_return`   = '$ket_return',
                            AR.`updated_by`   = '$userID',
                            AR.`updated_date` = NOW()
                        WHERE AR.`no_rekening`  = '$rek_update'
                        AND AR.`no_transaksi`   = '$no_transaksi'
                        AND AR.`jenis_asuransi` = '$jenis_asuransi';");
    $this->db2->trans_complete();
    return 'sukses';
  }  
  public function proses_simpan($rek_update,$no_transaksi,$jenis_asuransi,$status,$userID){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $this->db2->trans_start();
      $this->db2->query("UPDATE asuransi_refund AR
                          SET AR.`status_refund` = '$status',
                              AR.`updated_by`  = '$userID',
                              AR.`updated_date`= NOW()
                          WHERE AR.`no_rekening` = '$rek_update'
                          AND AR.`no_transaksi` = '$no_transaksi'
                          AND AR.`jenis_asuransi` = '$jenis_asuransi';");
      $this->db2->trans_complete();
      return 'sukses';
  }
  public function proses_email($rek_update,$no_transaksi,$userID){
      $this->db2 = $this->load->database('DB_CENTRO', true);
      $this->db2->trans_start();
      $this->db2->query("UPDATE asuransi_refund AR
                          SET AR.`send_mail` = '1',
                              AR.`updated_by`  = '$userID',
                              AR.`updated_date`= NOW()
                          WHERE AR.`no_rekening` = '$rek_update'
                          AND AR.`no_transaksi` = '$no_transaksi';");
      $this->db2->trans_complete();
      return 'sukses';
  }
  public function get_attachment($rek_update,$jenis,$no_transaksi){
    $this->db2 = $this->load->database('DB_CENTRO', true);
    $str    = "SELECT 
                AR.`root_document`,
                AR.`root_address`,
                AR.`path_file`,
                AR.`file_name` 
              FROM
                asuransi_refund AR 
              WHERE AR.`no_rekening` = '$rek_update' 
                AND AR.`jenis_asuransi` = '$jenis'
                AND AR.`no_transaksi` = '$no_transaksi';";
    $query  = $this->db2->query($str);
    return $query->result_array();
  }
  public function get_data_reject($rekening,$jenis,$no_reff_asuransi,$no_transaksi){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
                  AR.`no_rekening`,
                  AR.`no_transaksi`,
                  AR.`jenis_asuransi`,
                  AR.`jenis_refund`,
                  AR.`root_document`,
                  AR.`root_address`,
                  AR.`path_file` ,
                  AR.`file_name`,
                  AR.`status_refund`,
                  AR.`send_mail`,
                  AR.`create_date`,
                  AR.`file_name_reject`,
                  AR.`keterangan`
                FROM
                  asuransi_refund AR 
                WHERE AR.`no_rekening` = '$rekening' 
                  AND AR.`jenis_asuransi` = '$jenis' 
                  AND AR.`no_transaksi` = '$no_transaksi'
                LIMIT 1;";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
  public function upload_file_reject($rekening,
																					$jenis,
																					$no_transaksi,
																					$userID,
																					$files_upload){
    $this->db2 = $this->load->database('DB_CENTRO', true);
        $this->db2->trans_start();
        $this->db2->query("UPDATE asuransi_refund AR
                           SET AR.`file_name_reject` = '$files_upload',
                               AR.`updated_by`  = '$userID',
                               AR.`updated_date`= NOW()
                           WHERE AR.`no_rekening` = '$rekening'
                           AND AR.`no_transaksi` = '$no_transaksi'
                           AND AR.`jenis_asuransi` = '$jenis';");
        $this->db2->trans_complete();
        return 'sukses';
  } 
  public function delete_file_reject($rekening,$jenis,$userID,$no_transaksi,$files_upload){
    $this->db2 = $this->load->database('DB_CENTRO', true);
        $this->db2->trans_start();
        $this->db2->query("UPDATE asuransi_refund AR
                           SET AR.`file_name_reject` = '$files_upload',
                               AR.`updated_by`  = '$userID',
                               AR.`updated_date`= NOW()
                           WHERE AR.`no_rekening` = '$rekening'
                           AND AR.`no_transaksi` = '$no_transaksi'
                           AND AR.`jenis_asuransi` = '$jenis';");
        $this->db2->trans_complete();
        return 'sukses';
  } 

  public function proses_reject($rekening,$jenis,$userID,$no_transaksi,$ket_reject){
    $this->db2 = $this->load->database('DB_CENTRO', true);
        $this->db2->trans_start();
        $this->db2->query("UPDATE asuransi_refund AR
                           SET AR.`keterangan` = '$ket_reject',
                               AR.`status_refund`  = '4',
                               AR.`updated_by`  = '$userID',
                               AR.`updated_date`= NOW()
                           WHERE AR.`no_rekening` = '$rekening'
                           AND AR.`no_transaksi` = '$no_transaksi'
                           AND AR.`jenis_asuransi` = '$jenis';");
        $this->db2->trans_complete();
        return 'sukses';
  } 

}
?>