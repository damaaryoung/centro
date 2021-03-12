<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Proses_klaim_asuransi_model extends CI_Model{
	
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
  
  public function get_list_klaim($src_kode_kantor,$jenis){
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
                      AND AK.STATUS_KLAIM IN ('0','2')
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
                    AND AK.STATUS_KLAIM IN ('0','2')
                  ORDER BY AK.STATUS_KLAIM ASC
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
                  AK.`no_transaksi`,
                  AK.`jenis_asuransi`,
                  AK.`jenis_klaim`,
                  AK.`root_document`,
                  AK.`root_address`,
                  AK.`path_file` ,
                  AK.`status_klaim`,
                  AK.`send_mail`,
                  KKA.`email` as `email`,
                  AK.`create_date`
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
                    ON KKA.`KODE_ASURANSI` = AC.`kode_asuransi` 
                  LEFT JOIN app_kode_kantor AKK 
                    ON AKK.`kode_kantor` = AC.`kode_kantor`
                WHERE AC.`no_rekening` = '$rekening' 
                  AND AC.`jenis_asuransi` = '$jenis' 
                  AND AK.`no_transaksi` = '$no_transaksi'
                LIMIT 1;";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
  /// JAMINAN ///
  
 
  public function proses_return($rek_update,$no_transaksi,$jenis_asuransi,$status,$userID,$ket_return){
        $this->db2 = $this->load->database('DB_CENTRO', true);
        $this->db2->trans_start();
        $this->db2->query("UPDATE asuransi_klaim AK
                            SET AK.`status_klaim` = '$status',
                                AK.`ket_return`   = '$ket_return',
                                AK.`updated_by`  = '$userID',
                                AK.`updated_date`= NOW()
                            WHERE AK.`no_rekening` = '$rek_update'
                            AND AK.`no_transaksi` = '$no_transaksi'
                            AND AK.`jenis_asuransi` = '$jenis_asuransi';");
        $this->db2->trans_complete();
        return 'sukses';
  }
  public function proses_simpan($rek_update,$no_transaksi,$jenis_asuransi,$status,$userID){
        $this->db2 = $this->load->database('DB_CENTRO', true);
        $this->db2->trans_start();
        $this->db2->query("UPDATE asuransi_klaim AK
                            SET AK.`status_klaim` = '$status',
                                AK.`updated_by`  = '$userID',
                                AK.`updated_date`= NOW()
                            WHERE AK.`no_rekening` = '$rek_update'
                            AND AK.`no_transaksi` = '$no_transaksi'
                            AND AK.`jenis_asuransi` = '$jenis_asuransi';");
        $this->db2->trans_complete();
        return 'sukses';
  }
  public function proses_email($rek_update,$no_transaksi,$userID){
        $this->db2 = $this->load->database('DB_CENTRO', true);
        $this->db2->trans_start();
        $this->db2->query("UPDATE asuransi_klaim AK
                            SET AK.`send_mail` = '1',
                                AK.`updated_by`  = '$userID',
                                AK.`updated_date`= NOW()
                            WHERE AK.`no_rekening` = '$rek_update'
                            AND AK.`no_transaksi` = '$no_transaksi';");
        $this->db2->trans_complete();
        return 'sukses';
  }

  /// JIWA ///
 
}
?>
