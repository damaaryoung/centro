<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Pengajuan_refund_asuransi_model extends CI_Model{
	
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
    public function get_list_refund_data($src_kode_kantor,$jenis){
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
                        ORDER BY AR.status_refund ASC 
                        LIMIT 25;";
            $query  = $this->db2->query($str);
            return $query->result_array();
    }
    public function search_polis_rek($src_search,$jenis){
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
                        WHERE (AR.`no_rekening` LIKE '$src_search%' 
                                OR AC.`no_polis` LIKE  '$src_search%') 
                          AND AR.`jenis_asuransi` = '$jenis' 
                        ORDER BY AR.status_refund ASC
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
                    ON KKA.`KODE_ASURANSI` = AC.`kode_asuransi`  
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
                    ON KKA.`KODE_ASURANSI` = AC.`kode_asuransi`  
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


    public function pengajuan_refund_jaminan($modal_rek_jaminan,
                                            $modal_reff_asuransi_jaminan,
                                            $userID,
                                            $jenis_asuransi,
                                            $modal_jenis_refund_jaminan){
          $this->db2 = $this->load->database('DB_CENTRO', true);
  	    	
          $this->db2->trans_start();
          $str    = "SELECT MAX(AR.no_transaksi) + 1 AS `no_transaksi` FROM asuransi_refund AR";
          $query  = $this->db2->query($str);
          $result = $query->result_array();
          if($result[0]["no_transaksi"] != null){
            $no_trans = $result[0]["no_transaksi"];
          }
          if($result[0]["no_transaksi"] == null){
            $no_trans = null;
          }
          $this->db2->query("INSERT INTO asuransi_refund (no_transaksi,
                                                              no_reff_asuransi, 
                                                              no_rekening, 
                                                              jenis_asuransi, 
                                                              jenis_refund,
                                                              status_refund, 
                                                              created_by,
                                                              create_date)
                              SELECT  D.no_transaksi,
                                      D.no_reff_asuransi,
                                      D.no_rekening,
                                      D.jenis_asuransi,
                                      D.jenis_refund,
                                      D.status_refund,
                                      D.created_by,
                                      D.create_date 
                              FROM
                               (SELECT 
                                 '$no_trans' AS `no_transaksi`,
                                 '$modal_reff_asuransi_jaminan' AS `no_reff_asuransi`,
                                 '$modal_rek_jaminan' AS `no_rekening`,
                                 '$jenis_asuransi' AS `jenis_asuransi`,
                                 '$modal_jenis_refund_jaminan' AS `jenis_refund`,
                                 '0' AS `status_refund`,
                                 '$userID' AS `created_by`,
                                 NOW() AS `create_date` 
                                FROM DUAL) D;");                   
          $this->db2->trans_complete();

          $data['no_transaksi'] = $no_trans;
          $data['message'] = 'sukses';
          return $data;
    }
    public function delete_pengajuan_klaim_jaminan($rekening,$jenis,$no_transaksi){
          $this->db2 = $this->load->database('DB_CENTRO', true);
		
          $this->db2->trans_start();
          $this->db2->query("DELETE FROM asuransi_refund 
                              WHERE `no_rekening` = '$rekening'
                              AND `no_transaksi`  = '$no_transaksi';");
          $this->db2->trans_complete();
          return 'sukses';
    }

    public function pengajuan_klaim_jiwa($modal_rek_jiwa,
																					$modal_reff_asuransi_jiwa,
																					$userID,
																					$jenis_asuransi,
																					$modal_jenis_refund_jiwa){
        $this->db2 = $this->load->database('DB_CENTRO', true);
		
        $this->db2->trans_start();
        $str    = "SELECT MAX(AR.no_transaksi) + 1 AS `no_transaksi` FROM asuransi_refund AR";
        $query  = $this->db2->query($str);
        $result = $query->result_array();
        if($result[0]["no_transaksi"] != null){
          $no_trans = $result[0]["no_transaksi"];
        }
        if($result[0]["no_transaksi"] == null){
          $no_trans = null;
        }
        $this->db2->query("INSERT INTO asuransi_refund (no_transaksi,
                                                        no_reff_asuransi, 
                                                        no_rekening, 
                                                        jenis_asuransi, 
                                                        jenis_refund,
                                                        status_refund, 
                                                        created_by,
                                                        create_date)
                            SELECT  D.no_transaksi,
                                    D.no_reff_asuransi,
                                    D.no_rekening,
                                    D.jenis_asuransi,
                                    D.jenis_refund,
                                    D.status_refund,
                                    D.created_by,
                                    D.create_date 
                            FROM
                             (SELECT 
                               '$no_trans' AS `no_transaksi`,
                               '$modal_reff_asuransi_jiwa' AS `no_reff_asuransi`,
                               '$modal_rek_jiwa' AS `no_rekening`,
                               '$jenis_asuransi' AS `jenis_asuransi`,
                               '$modal_jenis_refund_jiwa' AS `jenis_refund`,
                               '0' AS `status_refund`,
                               '$userID' AS `created_by`,
                               NOW() AS `create_date` 
                             FROM DUAL) D;");
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
                    AR.`no_transaksi`,
                    AR.`jenis_asuransi`,
                    AR.`jenis_refund`,
                    AR.`root_document`,
                    AR.`root_address`,
                    AR.`path_file`,
                    AR.`file_name`,
                    AR.`ket_return`
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
                      ON KKA.`KODE_ASURANSI` = AC.`kode_asuransi` 
                    LEFT JOIN app_kode_kantor AKK 
                      ON AKK.`kode_kantor` = AC.`kode_kantor`
                  WHERE AC.`no_rekening` = '$rekening' 
                    AND AC.`jenis_asuransi` = '$jenis' 
                    AND AR.`no_transaksi` = '$no_transaksi'
                  LIMIT 1;";
          $query  = $this->db2->query($str);
          return $query->result_array();
    }
    public function update_without_upload($rek_update,$no_transaksi,$jenis_asuransi,$upload_update,$jenis_refund,$userID,$status){
      $this->db2 = $this->load->database('DB_CENTRO', true);
          $this->db2->trans_start();
          $this->db2->query("UPDATE asuransi_refund AR
                              SET AR.`jenis_refund` = '$jenis_refund',
                                  AR.`ket_return`   = '',
                                  AR.`status_refund` = '$status',
                                  AR.`updated_by`  = '$userID',
                                  AR.`updated_date`= NOW()
                              WHERE AR.`no_rekening` = '$rek_update'
                              AND AR.`no_transaksi` = '$no_transaksi'
                              AND AR.`jenis_asuransi` = '$jenis_asuransi';");
          $this->db2->trans_complete();
          return 'sukses';
    }  
    public function upload_file_update($up_rek,
                                              $up_polis,
                                              $no_transaksi,
                                              $jenis,
                                              $userID,
                                              $root_document,
                                              $root_address,
                                              $pathFile,
                                              $files_upload){
      $this->db2 = $this->load->database('DB_CENTRO', true);
          $this->db2->trans_start();
          $this->db2->query("UPDATE asuransi_refund AR
                             SET AR.`root_document` = '$root_document',
                                 AR.`root_address`  = '$root_address',
                                 AR.`path_file`     = '$pathFile',
                                 AR.`file_name` = '$files_upload',
                                 AR.`updated_by`  = '$userID',
                                 AR.`updated_date`= NOW()
                             WHERE AR.`no_rekening` = '$up_rek'
                             AND AR.`no_transaksi` = '$no_transaksi'
                             AND AR.`jenis_asuransi` = '$jenis';");
          $this->db2->trans_complete();
          return 'sukses';
    }  
    public function delete_file_update($up_rek,
                                              $up_polis,
                                              $no_transaksi,
                                              $jenis,
                                              $userID,
                                              $files_upload){
      $this->db2 = $this->load->database('DB_CENTRO', true);
          $this->db2->trans_start();
          $this->db2->query("UPDATE asuransi_refund AR
                             SET AR.`file_name` = '$files_upload',
                                 AR.`updated_by`  = '$userID',
                                 AR.`updated_date`= NOW()
                             WHERE AR.`no_rekening` = '$up_rek'
                             AND AR.`no_transaksi` = '$no_transaksi'
                             AND AR.`jenis_asuransi` = '$jenis';");
          $this->db2->trans_complete();
          return 'sukses';
    }  
 
}
?>
