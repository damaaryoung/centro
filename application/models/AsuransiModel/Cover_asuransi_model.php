<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Cover_asuransi_model extends CI_Model{
	
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
	public function get_data_cover($date,$jenis){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
						K.`TGL_REALISASI`,
						N.NAMA_NASABAH,
						JH.`jenis_jaminan`,
						KKA.`DESKRIPSI_ASURANSI`,
						ac.`no_rekening`,
						AC.`nasabah_id`,
						AC.`agunan_id`,
						AC.`no_polis`,
						AC.`no_reff_asuransi`,
						AC.`no_reff_jaminan`,
						AC.`titipan_asuransi`,
						AC.`komisi_asuransi`,
						AC.`premi_asuransi`,
						AC.`sisa_titipan_asuransi`,
						AC.`status_cover`
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
					WHERE AC.`jenis_asuransi` = '$jenis' 
						AND DATE_FORMAT(K.`TGL_REALISASI`, '%Y-%m') = '$date';";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
	public function get_search($jenis,$search){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
						K.`TGL_REALISASI`,
						N.NAMA_NASABAH,
						JH.`jenis_jaminan`,
						KKA.`DESKRIPSI_ASURANSI`,
						ac.`no_rekening`,
						AC.`nasabah_id`,
						AC.`agunan_id`,
						AC.`no_polis`,
						AC.`no_reff_asuransi`,
						AC.`no_reff_jaminan`,
						AC.`titipan_asuransi`,
						AC.`komisi_asuransi`,
						AC.`premi_asuransi`,
						AC.`sisa_titipan_asuransi`,
						AC.`status_cover`
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
					WHERE AC.`jenis_asuransi` = '$jenis'
					AND (N.`NAMA_NASABAH` LIKE '$search%'
						 OR AC.`no_rekening` LIKE '$search%')
					limit 30;";
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
						AC.`titipan_asuransi` 
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
	public function get_data_okupasi(){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = " SELECT AO.`id`,
							AO.`kode_asuransi`,
							AO.`kode_okupasi`,
							AO.`deskripsi_okupasi`,
							AO.`tarif_premi`
					FROM asuransi_okupasi AO
					WHERE AO.`kode_okupasi` != '';";
        $query  = $this->db2->query($str);
		return $query->result_array();
	}
	public function cover_jaminan($rekening,$data_okupasi_jaminan,$premi_jaminan,$rate_jaminan,$userID){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		
		$this->db2->trans_start();
		$this->db2->query("UPDATE ASURANSI_COVER AC
								SET AC.`id_okupasi`   = '$data_okupasi_jaminan',
									AC.`premi_asuransi` = '$premi_jaminan',
									AC.`rate`           = '$rate_jaminan',
									AC.`last_update`    = NOW(),
									AC.`last_update_by` = '$userID',
									AC.`status_cover`   = 'SUDAH',
									AC.`tgl_cover`		= NOW()
							WHERE AC.`no_rekening`  = '$rekening'
							AND AC.`jenis_asuransi` = 'JAMINAN';");
		$this->db2->trans_complete();
		return 'sukses';
	}
	public function cover_jiwa($rekening,
								$userID,
								$modal_rate_jiwa,
								$modal_premi_jiwa,
								$modal_extra_premi_jiwa,
								$root_document,
								$root_address,
								$pathFile){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		
		$this->db2->trans_start();
		$this->db2->query("UPDATE ASURANSI_COVER AC
							SET AC.`premi_asuransi` = '$modal_premi_jiwa',
								AC.`rate`           = '$modal_rate_jiwa',
								AC.`last_update`    = NOW(),
								AC.`last_update_by` = '$userID',
								AC.`extra_premi`	= '$modal_extra_premi_jiwa',
								AC.`root_document`  = '$root_document',
								AC.`root_address`   = '$root_address',
								AC.`path_file`      = '$pathFile',
								AC.`status_cover`   = 'SUDAH',
								AC.`tgl_cover`		= NOW()
							WHERE AC.`no_rekening`  = '$rekening'
							AND AC.`jenis_asuransi` = 'JIWA';");
		$this->db2->trans_complete();
		return 'sukses';
	}
	public function export_cover($periode,$jenis){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
		                  AC.`no_rekening` as `no_rekening`,
		                  '' AS `code`,
		                  SA.`cif` as `cif`,
		                  DATE_FORMAT(AC.`created_date`, '%d-%m-%Y') as `created_date`,
		                  DATE_FORMAT(AC.`tgl_cover`, '%d-%m-%Y') as `tgl_cover`,
		                  N.`NAMA_NASABAH` as `NAMA_NASABAH`,
		                  CKJI.`nama_identitas` as `nama_identitas`,
		                  N.`NO_ID` as `NO_ID`,
		                  CASE
		                    WHEN N.`JENIS_KELAMIN` = 'L' 
		                    THEN 'Laki-Laki' 
		                    ELSE 'Perempuan' 
		                  END AS `jenis_kelamin`,
		                  N.`TEMPATLAHIR` as `TEMPATLAHIR`,
						  DATE_FORMAT(N.`TGLLAHIR`, '%d-%m-%Y') AS `TGLLAHIR`,
		                  CKD.`deskripsi_kode_dati` as `deskripsi_kode_dati`,
		                  KG.deskripsi_group1 AS `pekerjaan`,
		                  N.EMAIL AS `email`,
		                  K.`NILAI_ASURANSI` as `NILAI_ASURANSI`,
		                  AC.`premi_asuransi` as `premi_asuransi`,
		                  K.`jkw_asuransi` as `jkw_asuransi`,
		                  U.`nama` as `nama`,
		                  CONCAT('BPR KMI ', AKK.`nama_kantor`) AS `branch_name` 
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
				    LEFT JOIN slik_agunan SA 
				      ON SA.`no_rekening` = AC.`no_rekening`
					  AND SA.`kode_register_agunan` = AC.`agunan_id` 
				    LEFT JOIN css_kode_jenis_identitas CKJI 
				      ON CKJI.`jenis_id` = n.`JENIS_ID` 
				    LEFT JOIN css_kode_dati CKD 
				      ON CKD.KODE_DATI = N.`KOTA_KAB` 
				    LEFT JOIN css_kode_group1 AS KG 
				      ON KG.kode_group1 = N.kode_group1 
				    LEFT JOIN USER U 
				      ON U.NIK = AC.created_by 
				    LEFT JOIN app_kode_kantor AKK 
				      ON AKK.kode_kantor = u.kd_cabang 
				    WHERE AC.`jenis_asuransi` = '$jenis' 
				    AND DATE_FORMAT(K.`TGL_REALISASI`, '%Y-%m') = '$periode';";

        $query  = $this->db2->query($str);
        return $query->result_array();
	}

}


