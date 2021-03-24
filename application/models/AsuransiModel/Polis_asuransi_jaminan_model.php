<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Polis_asuransi_jaminan_model extends CI_Model{
	
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
	public function get_data_polis_jaminan($date){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
                            CASE WHEN AC.`no_polis` IS NULL THEN ''
                                ELSE AC.`no_polis` 
                                END AS `no_polis`,
                            K.`TGL_REALISASI`,
                            AC.`no_rekening`,
                            N.NAMA_NASABAH,
                            CASE WHEN AC.`status_endorsement` IS NULL THEN ''
                                ELSE AC.`status_endorsement` 
                                END AS `status_endorsement`,
                            KKA.`DESKRIPSI_ASURANSI`,
                            AC.`nasabah_id`,
                            AC.`agunan_id`,
                            AC.`no_reff_asuransi`,
                            AC.`no_reff_jaminan`
                        FROM
                            asuransi_cover AC 
                        LEFT JOIN NASABAH N 
                            ON N.`NASABAH_ID` = AC.`nasabah_id` 
                        LEFT JOIN KREDIT K 
                            ON K.`NO_REKENING` = AC.`no_rekening` 
                        LEFT JOIN JAMINAN_HEADER JH 
                            ON JH.`no_rekening` = AC.`no_rekening` 
                        LEFT JOIN kre_kode_asuransi KKA 
                            ON KKA.`KODE_ASURANSI` = AC.`kode_asuransi` 
                        WHERE AC.`jenis_asuransi` = 'JAMINAN' 
                        AND DATE_FORMAT(K.`TGL_REALISASI`, '%Y-%m') = '$date'
                        AND AC.`status_cover` = 'SUDAH';";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
	public function get_search($search){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
							CASE WHEN AC.`no_polis` IS NULL THEN ''
								ELSE AC.`no_polis` 
								END AS `no_polis`,
							K.`TGL_REALISASI`,
							AC.`no_rekening`,
							N.NAMA_NASABAH,
							CASE WHEN AC.`status_endorsement` IS NULL THEN ''
								ELSE AC.`status_endorsement` 
								END AS `status_endorsement`,
							KKA.`DESKRIPSI_ASURANSI`,
							AC.`nasabah_id`,
							AC.`agunan_id`,
							AC.`no_reff_asuransi`,
							AC.`no_reff_jaminan`
						FROM
							asuransi_cover AC 
						LEFT JOIN NASABAH N 
							ON N.`NASABAH_ID` = AC.`nasabah_id` 
						LEFT JOIN KREDIT K 
							ON K.`NO_REKENING` = AC.`no_rekening` 
						LEFT JOIN JAMINAN_HEADER JH 
							ON JH.`no_rekening` = AC.`no_rekening` 
						LEFT JOIN kre_kode_asuransi KKA 
							ON KKA.`KODE_ASURANSI` = AC.`kode_asuransi` 
						WHERE AC.`jenis_asuransi` = 'JAMINAN' 
						AND (AC.`no_rekening` LIKE '$search%'
							 OR N.NAMA_NASABAH LIKE '$search%')
						AND AC.`status_cover` = 'SUDAH'
						LIMIT 30;";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
    public function get_data_detail($rekening,$jenis_asuransi){
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
						K.`JML_PINJAMAN` AS `plafon`,
						JH.`jenis_jaminan`,
						JH.`nama`,
						JH.`alamat` AS `alamat_jaminan`,
						KKA.`DESKRIPSI_ASURANSI`,
						AC.`id_okupasi`,
						CONCAT(AO.`kode_okupasi` , ' - ', AO.`deskripsi_okupasi`) AS `okupasi_detail`,
						K.`NILAI_ASURANSI`,
						K.`nilai_asuransi_jiwa`,
						AC.`rate`,
						AC.`premi_asuransi`,
						AC.`titipan_asuransi`,
                        AC.`status_endorsement`,
						CASE WHEN AC.`no_polis` IS NULL THEN ''
                                ELSE AC.`no_polis` 
                                END AS `no_polis`
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
					LEFT JOIN ASURANSI_OKUPASI AO
						ON AO.`id` = AC.`id_okupasi`  
					WHERE AC.`no_rekening` = '$rekening' 
					AND AC.`jenis_asuransi` = '$jenis_asuransi';";
        $query  = $this->db2->query($str);
		return $query->result_array();
	}
	public function polis_jaminan_process($modal_no_polis,$modal_status_endorsement,$rekening,$jenis_asuransi,$userID){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		
		$this->db2->trans_start();
		$this->db2->query("UPDATE ASURANSI_COVER AC
							SET AC.`no_polis`           = '$modal_no_polis',
								AC.`status_endorsement` = '$modal_status_endorsement',
								AC.`last_update`    = NOW(),
								AC.`last_update_by` = '$userID'
							WHERE AC.`no_rekening` 		= '$rekening'
							AND AC.`jenis_asuransi`		= 'JAMINAN';");
		$this->db2->trans_complete();
		return 'sukses';
	}
}
?>