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
	public function sysdate1(){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT DATE_FORMAT(SYSDATE(), '%d-%m-%Y') AS 'sysdate';";
        $query  = $this->db2->query($str);
        $result = $query->result_array();
        return $result[0]["sysdate"];
	}
	public function periode($date_periode){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT DATE_FORMAT('$date_periode', '%M %Y') AS 'sysdate';";
        $query  = $this->db2->query($str);
        $result = $query->result_array();
        return $result[0]["sysdate"];
		
	}
	public function get_data_asuransi(){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT KKA.`KODE_ASURANSI` AS `kode_asuransi`,
							KKA.`DESKRIPSI_ASURANSI` AS `deskripsi_asuransi`
					FROM kre_kode_asuransi KKA
					WHERE KKA.`flg_aktif` = '1';";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
	public function get_data_cover($date,$jenis){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
						AC.`id` as `id`,
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
						AC.`status_cover`,
						AC.`titipan_asuransi2`,
						AC.`refund_asuransi`,
						AC.`klaim_asuransi`,
						AC.`pengembalian_asuransi`
					FROM
						asuransi_cover AC 
					LEFT JOIN NASABAH N 
						ON N.`NASABAH_ID` = AC.`nasabah_id` 
					LEFT JOIN KREDIT K 
						ON K.`NO_REKENING` = AC.`no_rekening` 
					LEFT JOIN JAMINAN_HEADER JH 
						#ON JH.`no_rekening` = AC.`no_rekening` 
						ON JH.`no_reff` = AC.`no_reff_jaminan`
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
						AC.`id` as `id`,
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
						AC.`status_cover`,
						AC.`titipan_asuransi2`,
						AC.`refund_asuransi`,
						AC.`klaim_asuransi`,
						AC.`pengembalian_asuransi`
					FROM
						asuransi_cover AC 
					LEFT JOIN NASABAH N 
						ON N.`NASABAH_ID` = AC.`nasabah_id` 
					LEFT JOIN KREDIT K 
						ON K.`NO_REKENING` = AC.`no_rekening` 
					LEFT JOIN JAMINAN_HEADER JH 
						#ON JH.`no_rekening` = AC.`no_rekening` 
						ON JH.`no_reff` = AC.`no_reff_jaminan`
					LEFT JOIN kre_kode_asuransi KKA 
						ON KKA.`KODE_ASURANSI` = AC.`kode_asuransi` 
					WHERE AC.`jenis_asuransi` = '$jenis'
					AND (N.`NAMA_NASABAH` LIKE '$search%'
						 OR AC.`no_rekening` LIKE '$search%')
					limit 30;";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
	public function get_search_status($jenis,$status,$src_tgl_realisasi){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$date       = $this->sysdate();
		$str    = "SELECT 
						AC.`id` as `id`,
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
						AC.`status_cover`,
						AC.`titipan_asuransi2`,
						AC.`refund_asuransi`,
						AC.`klaim_asuransi`,
						AC.`pengembalian_asuransi`
					FROM
						asuransi_cover AC 
					LEFT JOIN NASABAH N 
						ON N.`NASABAH_ID` = AC.`nasabah_id` 
					LEFT JOIN KREDIT K 
						ON K.`NO_REKENING` = AC.`no_rekening` 
					LEFT JOIN JAMINAN_HEADER JH 
						#ON JH.`no_rekening` = AC.`no_rekening` 
						ON JH.`no_reff` = AC.`no_reff_jaminan`
					LEFT JOIN kre_kode_asuransi KKA 
						ON KKA.`KODE_ASURANSI` = AC.`kode_asuransi` 
					WHERE AC.`jenis_asuransi` = '$jenis'
					AND AC.`status_cover` = '$status'
					AND DATE_FORMAT(K.`TGL_REALISASI`, '%Y-%m') = '$src_tgl_realisasi';";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
	public function get_search_asuransi($jenis,$src_nama_asuansi,$src_tgl_realisasi){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$date       = $this->sysdate();
		$str    = "SELECT 
						AC.`id` as `id`,
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
						AC.`status_cover`,
						AC.`titipan_asuransi2`,
						AC.`refund_asuransi`,
						AC.`klaim_asuransi`,
						AC.`pengembalian_asuransi`
					FROM
						asuransi_cover AC 
					LEFT JOIN NASABAH N 
						ON N.`NASABAH_ID` = AC.`nasabah_id` 
					LEFT JOIN KREDIT K 
						ON K.`NO_REKENING` = AC.`no_rekening` 
					LEFT JOIN JAMINAN_HEADER JH 
						#ON JH.`no_rekening` = AC.`no_rekening` 
						ON JH.`no_reff` = AC.`no_reff_jaminan`
					LEFT JOIN kre_kode_asuransi KKA 
						ON KKA.`KODE_ASURANSI` = AC.`kode_asuransi` 
					WHERE AC.`jenis_asuransi` = '$jenis'
					AND KKA.`KODE_ASURANSI` = '$src_nama_asuansi'
					AND DATE_FORMAT(K.`TGL_REALISASI`, '%Y-%m') = '$src_tgl_realisasi';";
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
						AC.`premi_request`,
						AC.`titipan_asuransi`,
						AC.`root_document`,
                        AC.`root_address`,
                        AC.`path_file`,
                        AC.`file_name`
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
	public function cover_jaminan($rekening,$data_okupasi_jaminan,$premi_jaminan,$premi_jaminan_request,$rate_jaminan,$userID){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		
		$this->db2->trans_start();
		$this->db2->query("UPDATE ASURANSI_COVER AC
								SET AC.`id_okupasi`     = '$data_okupasi_jaminan',
									AC.`premi_asuransi` = '$premi_jaminan',
									AC.`premi_request`  = '$premi_jaminan_request',
									AC.`rate`           = '$rate_jaminan',
									AC.`last_update`    = NOW(),
									AC.`last_update_by` = '$userID',
									AC.`status_cover`   = 'PROSES',
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
								$modal_premi_jiwa_request){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		
		$this->db2->trans_start();
		$this->db2->query("UPDATE ASURANSI_COVER AC
							SET AC.`premi_asuransi` = '$modal_premi_jiwa',
								AC.`premi_request`  = '$modal_premi_jiwa_request',
								AC.`rate`           = '$modal_rate_jiwa',
								AC.`last_update`    = NOW(),
								AC.`last_update_by` = '$userID',
								AC.`extra_premi`	= '$modal_extra_premi_jiwa',
								AC.`status_cover`   = 'PROSES',
								AC.`tgl_cover`		= NOW()
							WHERE AC.`no_rekening`  = '$rekening'
							AND AC.`jenis_asuransi` = 'JIWA';");
		$this->db2->trans_complete();
		return 'sukses';
	}
	public function proses_done($rekening,$userID,$jenis){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		
		$this->db2->trans_start();
		$this->db2->query("UPDATE ASURANSI_COVER AC
								SET	AC.`status_cover`   = 'SUDAH',
									AC.`last_update_by` = '$userID',
									AC.`tgl_cover`		= NOW()
							WHERE AC.`no_rekening`  = '$rekening'
							AND AC.`jenis_asuransi` = '$jenis';");
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
		                  CONCAT('BPR KMI ', AKK.`nama_kantor`) AS `branch_name`,
						  jh.`alamat` AS `alamat_jaminan`
				    FROM
				    asuransi_cover AC 
				    LEFT JOIN NASABAH N 
				      ON N.`NASABAH_ID` = AC.`nasabah_id` 
				    LEFT JOIN KREDIT K 
				      ON K.`NO_REKENING` = AC.`no_rekening` 
				    LEFT JOIN JAMINAN_HEADER JH 
				      ON jh.`no_reff` = ac.`no_reff_jaminan`
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
				      ON u.`user_id` = AC.created_by 
				    LEFT JOIN app_kode_kantor AKK 
				      ON AKK.kode_kantor = u.kd_cabang 
				    WHERE AC.`jenis_asuransi` = '$jenis' 
				    AND DATE_FORMAT(K.`TGL_REALISASI`, '%Y-%m') = '$periode'
					AND AC.`status_cover` = 'SUDAH';";

        $query  = $this->db2->query($str);
        return $query->result_array();
	}
	public function export_selected($id_data,$jenis){
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
		                  CONCAT('BPR KMI ', AKK.`nama_kantor`) AS `branch_name`,
						  jh.`alamat` AS `alamat_jaminan`
				    FROM
				    asuransi_cover AC 
				    LEFT JOIN NASABAH N 
				      ON N.`NASABAH_ID` = AC.`nasabah_id` 
				    LEFT JOIN KREDIT K 
				      ON K.`NO_REKENING` = AC.`no_rekening` 
				    LEFT JOIN JAMINAN_HEADER JH 
					  ON jh.`no_reff` = ac.`no_reff_jaminan`
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
				      ON u.`user_id` = AC.created_by 
				    LEFT JOIN app_kode_kantor AKK 
				      ON AKK.kode_kantor = u.kd_cabang 
				    WHERE AC.`jenis_asuransi` = '$jenis' 
				    AND AC.`id` IN ($id_data) #AND AC.`status_cover` = 'SUDAH'
					;";

        $query  = $this->db2->query($str);
        return $query->result_array();
	}
	public function export_cover_jaminan($periode,$jenis,$src_nama_asuansi){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
						K.`TGL_REALISASI`,
					CASE WHEN AC.`jenis_asuransi` = 'JAMINAN'
						THEN K.`tgl_jt_asuransi`
						WHEN AC.`jenis_asuransi` = 'JIWA'
							THEN K.`tgl_jt_asuransi_jiwa`
					END AS `tgl_jt_asuransi`,
					'' AS `lebih_hari`,
					K.`TUJUAN_USAHA`,
					AC.`rate`,
					AC.`no_rekening`,
					N.`NAMA_NASABAH`,
					K.`jkw_asuransi`,
					K.`jkw_asuransi_jiwa`,
					K.`NILAI_ASURANSI`,
					JH.`alamat`
					FROM kredit k
					LEFT JOIN nasabah n
						ON n.`NASABAH_ID` = k.`NASABAH_ID`
					LEFT JOIN asuransi_cover ac
						ON ac.`no_rekening` = k.`NO_REKENING`
					LEFT JOIN jaminan_header jh
						ON jh.`no_reff` = ac.`no_reff_jaminan`
				    WHERE AC.`jenis_asuransi` = '$jenis' 
					AND ac.`kode_asuransi` = '$src_nama_asuansi'
				    AND DATE_FORMAT(K.`TGL_REALISASI`, '%Y-%m') = '$periode'
					AND AC.`status_cover` = 'SUDAH';";

        $query  = $this->db2->query($str);
        return $query->result_array();
	}

	public function export_jiwa_generali($periode,$jenis,$src_nama_asuansi){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
					N.`NASABAH_ID`,
					K.`NO_REKENING`,
					'' AS `product_code`,
					SA.`cif`,
					DATE_FORMAT(K.`tgl_addendum_old`, '%d-%m-%Y') AS `tgl_addendum_old`,
					DATE_FORMAT(K.`TGL_REALISASI`, '%d-%m-%Y') AS `TGL_REALISASI`,
					N.`NAMA_NASABAH`,
					CKJI.`nama_identitas`,
					N.`NO_ID` AS `NO_ID`,
					CASE
						WHEN N.`JENIS_KELAMIN` = 'L' 
						THEN 'Laki-Laki' 
						ELSE 'Perempuan' 
					END AS `jenis_kelamin`,
					N.`TEMPATLAHIR` AS `TEMPATLAHIR`,
					DATE_FORMAT(N.`TGLLAHIR`, '%d-%M-%Y') AS `TGLLAHIR`,
					CASE 
						WHEN JH.jenis_jaminan = 'SERTIFIKAT'
						THEN CONCAT(JD.`alamat_sertifikat`,' ', JD.`kelurahan_sertifikat`, ' ', JD.`kecamatan_sertifikat`, ' ', JD.`kota_sertifikat`) 
						ELSE CONCAT(JD.`alamat_bpkb`,' ', JD.`kelurahan_bpkb`, ' ', JD.`kecamatan_bpkb`, ' ', JD.`kota_bpkb`)
					END AS `domisili`,
					KG.deskripsi_group1 AS `pekerjaan`,
					N.`email` as `email`,
					K.`nilai_asuransi_jiwa`,
					AC.`premi_asuransi`,
					K.`jkw_asuransi`,
					K.`jkw_asuransi_jiwa`,
					'' AS `seller_agent_code`,
					'BPR Kredit Mandiri Indonesia' AS `seller_branch_code`,
					jh.`alamat` AS `alamat_jaminan`
					FROM
					kredit K 
					LEFT JOIN asuransi_cover ac
						ON ac.`no_rekening` = K.`NO_REKENING`
					LEFT JOIN nasabah N
						ON N.`NASABAH_ID` = K.`NASABAH_ID` 
					LEFT JOIN css_kode_jenis_identitas CKJI 
						ON CKJI.`jenis_id` = n.`JENIS_ID` 
					LEFT JOIN css_kode_dati CKD
						ON CKD.KODE_DATI = N.`KOTA_KAB` 
					LEFT JOIN css_kode_group1 AS KG 
						ON KG.kode_group1 = N.kode_group1 
					LEFT JOIN jaminan_header JH
						ON jh.`no_reff` = ac.`no_reff_jaminan` 
					LEFT JOIN jaminan_dokument JD
						ON JD.`no_reff` = JH.`no_reff`
					LEFT JOIN slik_agunan SA 
						ON K.`NO_REKENING` = SA.`no_rekening` 
						AND JD.`agunan_id` = SA.`kode_register_agunan`
				    WHERE AC.`jenis_asuransi` = '$jenis' 
				    AND DATE_FORMAT(K.`TGL_REALISASI`, '%Y-%m') = '$periode'
					AND ac.`kode_asuransi` = '$src_nama_asuansi'
					AND AC.`status_cover` = 'SUDAH';";

        $query  = $this->db2->query($str);
        return $query->result_array();
	}
	public function export_jiwa_sinarmas($periode,$jenis,$src_nama_asuansi){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT DISTINCT
						K.NO_REKENING,
						N.`NAMA_NASABAH`,
						N.`NO_ID` AS `NO_ID`,
						N.`TEMPATLAHIR` AS `TEMPATLAHIR`,
						DATE_FORMAT(N.`TGLLAHIR`, '%d %M %Y') AS `TGLLAHIR`,
						CASE
						WHEN JH.jenis_jaminan = 'SERTIFIKAT' 
						THEN CONCAT(
							JD.`alamat_sertifikat`,
							' ',
							JD.`kelurahan_sertifikat`,
							' ',
							JD.`kecamatan_sertifikat`,
							' ',
							JD.`kota_sertifikat`
						) 
						ELSE CONCAT(
							JD.`alamat_bpkb`,
							' ',
							JD.`kelurahan_bpkb`,
							' ',
							JD.`kecamatan_bpkb`,
							' ',
							JD.`kota_bpkb`
						) 
						END AS `domisili` ,
						CASE WHEN JH.jenis_jaminan = 'SERTIFIKAT' 
						THEN JD.`kota_sertifikat`
							ELSE JD.`kota_bpkb`
						END AS `wilayah`,
						N.`TELPON`,
						K.`berat_asuransi_jiwa`,
						K.`tinggi_asuransi_jiwa`,
						K.`nilai_asuransi_jiwa`,
						K.`NILAI_ASURANSI`,
						k.`jkw_asuransi`,
						k.`jkw_asuransi_jiwa` AS `tahun`,
						k.`jkw_asuransi_jiwa` * 12 AS `bulan`,
						DATE_FORMAT(K.`TGL_REALISASI`, '%d-%m-%Y') AS `TGL_REALISASI`,
						DATE_FORMAT(K.`tgl_jt_asuransi_jiwa`, '%d-%m-%Y') AS `tgl_jt_asuransi_jiwa`,
						TIMESTAMPDIFF(YEAR, N.`TGLLAHIR`, CURDATE()) AS `umur`,
						AC.`rate`,
						AC.`premi_asuransi`,
						CASE 
							WHEN K.`berat_asuransi_jiwa` / ((K.`tinggi_asuransi_jiwa` * 0.01) * (K.`tinggi_asuransi_jiwa` * 0.01)) < 18.5
							THEN 'UNDERWEIGHT'
							WHEN 18.5 > K.`berat_asuransi_jiwa` / ((K.`tinggi_asuransi_jiwa` * 0.01) * (K.`tinggi_asuransi_jiwa` * 0.01)) 
								OR K.`berat_asuransi_jiwa` / ((K.`tinggi_asuransi_jiwa` * 0.01) * (K.`tinggi_asuransi_jiwa` * 0.01))  < 24.9
							THEN 'NORMAL'
							WHEN 25.0 > K.`berat_asuransi_jiwa` / ((K.`tinggi_asuransi_jiwa` * 0.01) * (K.`tinggi_asuransi_jiwa` * 0.01)) 
								OR K.`berat_asuransi_jiwa` / ((K.`tinggi_asuransi_jiwa` * 0.01) * (K.`tinggi_asuransi_jiwa` * 0.01)) < 29.9
							THEN 'OVERWEIGHT'
							ELSE 'OBESE'
						END AS 'bmi',
						K.`berat_asuransi_jiwa` / ((K.`tinggi_asuransi_jiwa` * 0.01) * (K.`tinggi_asuransi_jiwa` * 0.01))  AS `bmi1`
					FROM
						kredit K 
					LEFT JOIN asuransi_cover ac
						ON ac.`no_rekening` = K.`NO_REKENING`
					LEFT JOIN nasabah N
						ON N.`NASABAH_ID` = K.`NASABAH_ID` 
					LEFT JOIN css_kode_jenis_identitas CKJI 
						ON CKJI.`jenis_id` = n.`JENIS_ID` 
					LEFT JOIN css_kode_dati CKD
						ON CKD.KODE_DATI = N.`KOTA_KAB` 
					LEFT JOIN css_kode_group1 AS KG 
						ON KG.kode_group1 = N.kode_group1 
					LEFT JOIN jaminan_header JH
						ON jh.`no_reff` = ac.`no_reff_jaminan` 
					LEFT JOIN jaminan_dokument JD
						ON JD.`no_reff` = JH.`no_reff`
					LEFT JOIN slik_agunan SA 
						ON K.`NO_REKENING` = SA.`no_rekening` 
						AND JD.`agunan_id` = SA.`kode_register_agunan`
				    WHERE AC.`jenis_asuransi` = '$jenis' 
				    AND DATE_FORMAT(K.`TGL_REALISASI`, '%Y-%m') = '$periode'
					AND ac.`kode_asuransi` = '$src_nama_asuansi';
					#AND AC.`status_cover` = 'SUDAH';";

        $query  = $this->db2->query($str);
        return $query->result_array();
	}
	

	public function get_data_cover_team_asuransi($date,$jenis){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str    = "SELECT 
						AC.`id` as `id`,
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
						AC.`status_cover`,
						AC.`titipan_asuransi2`,
						AC.`refund_asuransi`,
						AC.`klaim_asuransi`,
						AC.`pengembalian_asuransi`
					FROM
						asuransi_cover AC 
					LEFT JOIN NASABAH N 
						ON N.`NASABAH_ID` = AC.`nasabah_id` 
					LEFT JOIN KREDIT K 
						ON K.`NO_REKENING` = AC.`no_rekening` 
					LEFT JOIN JAMINAN_HEADER JH 
						#ON JH.`no_rekening` = AC.`no_rekening` 
						ON JH.`no_reff` = AC.`no_reff_jaminan`
					LEFT JOIN kre_kode_asuransi KKA 
						ON KKA.`KODE_ASURANSI` = AC.`kode_asuransi` 
					WHERE AC.`jenis_asuransi` = '$jenis' 
						AND DATE_FORMAT(K.`TGL_REALISASI`, '%Y-%m') = '$date'
						AND AC.`status_cover` IN ('PROSES','SUDAH');";
        $query  = $this->db2->query($str);
        return $query->result_array();
	}
	public function upload_file($rekening,
	                            $userID,
	                            $fileUploadsLength,
	                            $jenis,
	                            $root_document,
	                            $root_address,
	                            $pathFile,
	                            $files_upload){
        $this->db2 = $this->load->database('DB_CENTRO', true);

		
        $this->db2->trans_start();
       
        $this->db2->query("UPDATE asuransi_cover AC
                          SET AC.`root_document`  = '$root_document', 
						      AC.`root_address`   = '$root_address',
						      AC.`path_file`      = '$pathFile',
						      AC.`file_name`      = '$files_upload'
                          WHERE AC.`no_rekening`  = '$rekening'
                          AND AC.`jenis_asuransi` = '$jenis';");
       
        
        $this->db2->trans_complete();
        return 'sukses';
    }
    public function delete_upload_file($up_rek,$jenis,$files_upload){
      $this->db2 = $this->load->database('DB_CENTRO', true);
          $this->db2->trans_start();
          $this->db2->query("UPDATE asuransi_cover AC
                              SET AC.`file_name` = '$files_upload'
                              WHERE AC.`no_rekening` = '$up_rek'
                              AND AC.`jenis_asuransi` = '$jenis';");
          $this->db2->trans_complete();
          return 'sukses';
    } 

}


