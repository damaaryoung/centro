<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class EFilingModel extends CI_Model{

 
	public function __construct() {
		parent:: __construct();
		$this->load->database();
    }

    // public function get_efiling(){
    //     $kode_cabang = $this->kode_cabang;
	// 	$this->db = $this->load->database('DB_CENTRO', true);
	// 	$str ="SELECT * FROM `view_efiling_header` WHERE 
	// 			IF($kode_cabang IN ('32', '00'), 1, kode_kantor= $kode_cabang)
    //             AND (no_rekening LIKE '%' OR nama_debitur LIKE '%%') 
	// 			AND baki_debet > 0 
	// 			AND no_rekening = '00-04-00030-18' OR no_rekening = '40-55-00001-45'
	// 			ORDER BY tgl_realisasi_eng DESC LIMIT 10 OFFSET 0 ";
	// 	$query = $this->db->query($str);
    //     return $query->result_array();
	// }
	
	// public function query_detail_efiling(){
	// 	$no_rekening = $this->no_rekening;
	// 	$this->db2 = $this->load->database('DB_CENTRO', true);
	// 	$this->db2->query("SET @pv_isAktif = '0'");
	// 	$str = "SELECT  e.is_jenis,mao_ap.id_bi_checking,
	// 	CONCAT_WS('/',bi.folder_master,YEAR(bi.tgl_buat), LPAD(MONTH(bi.tgl_buat),2,'0')) AS path_file_bi, 
	// 	IF(is_jenis=2,
	// 		CONCAT_WS('/',e.folder_master, IF(e.no_rekening_lama IS NULL, YEAR(v.tgl_realisasi_eng), YEAR(e.tgl_realisasi_eng_lama)),IF(e.no_rekening_lama IS NULL, LPAD(MONTH(v.tgl_realisasi_eng),2,'0'), LPAD(MONTH(e.tgl_realisasi_eng_lama),2,'0')),IF(e.no_rekening_lama IS NULL, v.kode_kantor, e.kode_kantor_lama),IF(e.no_rekening_lama IS NULL, v.no_rekening, e.no_rekening_lama)),
	// 	e.`folder_master`) AS path_file,
	// 		ktp AS nasabah_ktp,
	// 		npwp AS nasabah_npwp,
	// 		kk AS nasabah_kk,
	// 		surat_nikah AS nasabah_surat_nikah,
	// 		surat_cerai AS nasabah_surat_cerai,
	// 		surat_lahir AS nasabah_surat_lahir,
	// 		surat_kematian AS nasabah_surat_kematian,
	// 		skd AS nasabah_skd,
	// 		slip_gaji AS nasabah_slip_gaji,
	// 		take_over AS nasabah_take_over,
	// 		sk_kerja AS nasabah_sk_kerja,
	// 		sk_usaha AS nasabah_sk_usaha,
	// 		rek_koran AS nasabah_rek_koran,
	// 		tdp AS nasabah_tdp,
	// 		bon_usaha AS nasabah_bon_usaha,
	// 		IF(e_nas.notes IS NOT NULL,'2', IFNULL(e_nas.verifikasi,'1')) AS verifikasi_nasabah,
	// 		e_nas.notes AS notes_nasabah,
	// 	aplikasi AS permohonan_kredit_aplikasi,
	// 	denah_lokasi AS permohonan_kredit_denah_lokasi,
	// 	checklist_kelengkapan AS permohonan_kredit_checklist_kelengkapan,
	// 	IF(e_perm.notes IS NOT NULL,'2', IFNULL(e_perm.verifikasi,'1')) AS verifikasi_permohonan_kredit,
	// 	e_perm.notes AS notes_permohonan_kredit,
	// 		sertifikat AS jaminan_sertifikat,
	// 		skmht AS jaminan_skmht,
	// 		apht AS jaminan_apht,
	// 		cabut_roya AS jaminan_cabut_roya,
	// 		sht AS jaminan_sht,
	// 		pbb AS jaminan_pbb,
	// 		imb AS jaminan_imb,
	// 		ajb AS jaminan_ajb,
	// 		bpkb AS jaminan_bpkb,
	// 		ahli_waris AS jaminan_ahli_waris,
	// 		pengakuan_hutang AS jaminan_pengakuan_hutang,
	// 		akta_pengakuan_hak_bersama AS jaminan_akta_pengakuan_hak_bersama,
	// 		adendum AS jaminan_adendum,
	// 		fidusia AS jaminan_fidusia,
	// 		IF(e_jam.notes IS NOT NULL, '2', IFNULL(e_jam.verifikasi,'1')) AS verifikasi_jaminan,
	// 		e_jam.notes AS notes_jaminan,
	// 	pengajuan_bi AS bi_checking_pengajuan_bi,
	// 	persetujuan AS bi_checking_persetujuan,
	// 	hasil AS bi_checking_hasil,
	// 	-- IF( IFNULL(id_bi_checking,'0') ='0', NULL, REPLACE( 
	// 	-- 	CONCAT_WS('',lampiran_idi,
	// 	-- 		lampiran_idi_ca,
	// 	-- 		lampiran_no_din,
	// 	-- 		lampiran_no_din_ca,
	// 	-- 		lampiran_ideb
	// 	-- 	),
	// 	-- 	'][',
	// 	-- 	','
	// 	-- )
	// 	-- )AS bi_checking_hasil,
	// 	IF(e_bi.notes IS NOT NULL, '2', IFNULL(e_bi.verifikasi,'1')) AS verifikasi_bi_checking,
	// 	e_bi.notes AS notes_bi_checking,
	// 		memo_ao AS credit_analist_memo_ao,
	// 		memo_ca AS credit_analist_memo_ca,
	// 		offering_letter AS credit_analist_offering_letter,
	// 		penilaian_jaminan AS credit_analist_penilaian_jaminan,
	// 		cheklist_survey AS credit_analist_cheklist_survey,
	// 		persetujuan_kredit AS credit_analist_persetujuan_kredit,
	// 		IF(e_ca.notes IS NOT NULL, '2', IFNULL(e_ca.verifikasi,'1')) AS verifikasi_credit_analist,
	// 		e_ca.notes AS notes_credit_analist,
	// 	pengajuan_lpdk AS legal_pengajuan_lpdk,
	// 	lpdk AS legal_lpdk,
	// 	cheklist_pengikatan AS legal_cheklist_pengikatan,
	// 	order_pengikatan AS legal_order_pengikatan,
	// 	IF(e_leg.notes  IS NOT NULL, '2', IFNULL(e_leg.verifikasi,'1')) AS verifikasi_legal,
	// 	e_leg.notes AS notes_legal,
	// 		spk_ndk AS spk_ndk_spk_ndk,
	// 		asuransi AS spk_ndk_asuransi,
	// 		sp_no_imb AS spk_ndk_sp_no_imb,
	// 		jadwal_angsuran AS spk_ndk_jadwal_angsuran,
	// 		personal_guarantee AS spk_ndk_personal_guarantee,
	// 		hold_dana AS spk_ndk_hold_dana,
	// 		surat_transfer AS spk_ndk_surat_transfer,
	// 		keabsahan_data AS spk_ndk_keabsahan_data,
	// 		surat_transfer AS spk_ndk_surat_transfer,
	// 		keabsahan_data AS spk_ndk_keabsahan_data,
	// 		sp_beda_jt_tempo AS spk_ndk_sp_beda_jt_tempo,
	// 		sp_authentic AS spk_ndk_sp_authentic,
	// 		sp_penyerahan_jaminan AS spk_ndk_sp_penyerahan_jaminan,
	// 		surat_aksep AS spk_ndk_surat_aksep,
	// 		tt_uang AS spk_ndk_tt_uang,
	// 		sp_pendebetan_rekening AS spk_ndk_sp_pendebetan_rekening,
	// 		sp_plang AS spk_ndk_sp_plang,
	// 		hal_penting AS spk_ndk_hal_penting,
	// 		restruktur_bunga_denda AS spk_ndk_restruktur_bunga_denda,
	// 		IF(e_spk.notes IS NOT NULL, '2', IFNULL(e_spk.verifikasi,'1')) AS verifikasi_spk_ndk,
	// 		e_spk.notes AS notes_spk_ndk,
	// 	ft_jaminan AS foto_ft_jaminan,
	// 	ft_pengikatan AS foto_ft_pengikatan,
	// 	ft_domisili AS foto_ft_domisili,
	// 	ft_usaha AS foto_ft_usaha,
	// 	IF(e_foto.notes IS NOT NULL, '2', IFNULL(e_foto.verifikasi,'1')) AS verifikasi_foto,
	// 	e_foto.notes AS notes_foto,
	// 	ra_tanda_terima AS foto_ra_tanda_terima,
	// 	ra_surat_kuasa AS foto_ra_surat_kuasa,
	// 	ra_identitas_pengambilan AS foto_ra_identitas_pengambilan,
	// 	ra_lainnya AS foto_ra_lainnya,
	// 	ra_serah_terima AS foto_ra_serah_terima,
	// 	IF(e_ra.notes IS NOT NULL, '2', IFNULL(e_ra.verifikasi,'1')) AS verifikasi_release_aset,
	// 	e_ra.notes AS notes_release_aset
	// 	FROM view_efiling_header v
	// 		LEFT JOIN lpdk_cek lc ON lc.no_rekening = v.no_rekening
	// 	LEFT JOIN memo_ao_aplikasi mao_ap ON mao_ap.id_calon_debitur = lc.id_calon_debitur
	// 	LEFT JOIN bi_checking bi ON bi.id = mao_ap.id_bi_checking
		
	// 	LEFT JOIN efiling e ON e.no_rekening = v.no_rekening
	// 	LEFT JOIN efiling_nasabah e_nas ON e_nas.no_rekening = v.no_rekening
	// 	LEFT JOIN efiling_permohonan_kredit e_perm ON e_perm.no_rekening = v.no_rekening
	// 	LEFT JOIN efiling_jaminan e_jam ON e_jam.no_rekening = v.no_rekening
	// 	LEFT JOIN efiling_bi_checking e_bi ON e_bi.no_rekening = v.no_rekening
	// 	LEFT JOIN efiling_credit_analist e_ca ON e_ca.no_rekening = v.no_rekening
	// 	LEFT JOIN efiling_legal e_leg ON e_leg.no_rekening = v.no_rekening
	// 	LEFT JOIN efiling_spk_ndk e_spk ON e_spk.no_rekening = v.no_rekening
	// 	LEFT JOIN efiling_foto e_foto ON e_foto.no_rekening = v.no_rekening
	// 	LEFT JOIN efiling_release_aset e_ra ON e_ra.no_rekening = v.no_rekening
	// 	WHERE v.no_rekening='$no_rekening'";
	// 	$query= $this->db2->query($str);
	// 	return $query->row_array();			
	// }

	public function query_cek_no_rekening(){
		$post_no_rekening = $this->post_no_rekening;
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str ="SELECT no_rekening_lama FROM efiling WHERE no_rekening='$post_no_rekening'";
		$query = $this->db2->query($str);
        return $query->row_array();
	}

	// public function query_list_dmy(){
	// 	$no_rekening = $this->no_rekening;
	// 	$this->db2 = $this->load->database('DB_WEBTOOL', true);
	// 	$str ="SELECT kode_kantor,tgl_realisasi FROM view_efiling_header WHERE no_rekening='$no_rekening'";
	// 	$query = $this->db2->query($str);
    //     return $query->row_array();
	// }

	// public function query_filter_efiling(){
	// 	$kode_kantor = $this->kode_kantor;
    //     $baki_debet = $this->baki_debet;
    //     $status_verifikasi = $this->status_verifikasi;
	// 	$no_rekening = $this->no_rekening;
		
	// 		$this->db= $this->load->database('DB_CENTRO', true);

	// 		$str1 = "SELECT * FROM `view_efiling_header_test`
	// 		WHERE
	// 		IF('$kode_kantor'='all', 1, 
	// 			baki_debet > 0 AND kode_kantor='$kode_kantor'
	// 		)AND
	// 		IF('$baki_debet' = 'all',1,
	// 			baki_debet='0' AND status_dokument='KELUAR'
	// 		)AND
	// 		IF('$status_verifikasi' = 'all', 1,
	// 			status_verifikasi = '$status_verifikasi'
	// 		)AND
	// 		IF('$no_rekening' <> '', (no_rekening LIKE '$no_rekening%'), 1)
	// 		ORDER BY tgl_realisasi_eng DESC LIMIT 10 OFFSET 0";
	// 		//   var_dump($str1);die();
			
	// 		$query = $this->db->query($str1);
	// 		return $query->result_array(); 
	// }

	public function user_access_efiling(){
		$user_id = $this->userID;
		$divisi_id = $this->divisi_id;
		$jabatan = $this->jabatan;
		$this->db= $this->load->database('DB_CENTRO', true);
		$str = "SELECT * FROM efiling_user_access
				WHERE (user_id = $user_id OR jabatan = '$jabatan')
				AND divisi_id = '$divisi_id'
				AND flag_aktif = 1";
		// var_dump($str); die();
		$query = $this->db->query($str);
		return $query->row_array();
	}

	// public function query_get_verifikasi(){
	// 	$no_rekening = $this->no_rekening;
	// 	$this->db= $this->load->database('DB_CENTRO', true);
	// 	$str = "SELECT * ,
	// 	(
	// 		CASE 
	// 			WHEN verif_bi = 1  THEN 1
	// 			WHEN 1 = verif_bi && verif_ca = 1 || verif_ca = NULL THEN 1
	// 			WHEN 1 = verif_ca && verif_foto = 1 || verif_foto = NULL THEN 1
	// 			WHEN 1 = verif_foto && verif_jaminan = 1 || verif_jaminan = NULL THEN 1
	// 			WHEN 1 = verif_jaminan && verif_legal = 1 || verif_legal = NULL THEN 1
	// 			WHEN 1 = verif_legal && verif_nasabah = 1 || verif_nasabah = NULL THEN 1
	// 			WHEN 1 = verif_nasabah && verif_permohonan_kredit = 1 || verif_permohonan_kredit = NULL THEN 1
	// 			WHEN 1 = verif_permohonan_kredit && verif_ra = 1 || verif_ra =NULL THEN 1
	// 			WHEN 1 = verif_ra && verif_spk = 1 || verif_spk = NULL THEN 1
	// 			#when 1 = verif_spk  then 1
	// 			ELSE 2
	// 		END) AS verifikasi_efiling
	// 	FROM view_verifikasi_efilling
	// 	WHERE no_rekening = '$no_rekening'";
	// 	$query = $this->db->query($str);
	// 	return $query->row_array();
	// }

	public function update_status_verifikasi(){ // update data status verifikasi di table efiling
		$user_id = $this->userID;
		$no_rekening = $this->no_rekening;
		$status = $this->status;

		$this->db= $this->load->database('DB_CENTRO', true);
		$str = "SELECT menu FROM `efiling_user_access`
				WHERE user_id = $user_id AND flag_aktif = 1";
		$query = $this->db->query($str)->num_rows();
		if($query == 1){
			$str2 = "UPDATE `efiling` SET status_verif = '$status'
					WHERE no_rekening = '$no_rekening'";
			$this->db->query($str2);
			$result = array(
				"message" => "Berhasil merubah status efiling",
				"success" => true
			);
		}
		else{
			$result = array(
				"message" => 'Anda tidak memiliki akses untuk perubahan status',
				"success" => false
			);
		}
		return $result;
	}
	public function cek_rekening(){
		$no_rekening_search = $this->no_rekening_search;
		$this->db= $this->load->database('DB_CENTRO', true);
		$str = "SELECT * FROM centro.view_efiling_header WHERE no_rekening='$no_rekening_search';";
		$query = $this->db->query($str);
		return $query->row_array();
	}
	public function duplikat_data(){
		$norek_baru  = $this->no_rekening_awal;
		$norek_lama  = $this->no_rekening_lama;
		$user_id     = $this->user_id;

        $where_baru = "WHERE no_rekening='$norek_baru'";
		$where_lama = "WHERE no_rekening='$norek_lama'";
		$multiQueryDelete = array();

		$this->db= $this->load->database('DB_CENTRO', true);

		$query  = $this->db->query("SELECT no_rekening, is_jenis FROM centro.efiling $where_baru");
		$cek_efiling_data =  $query->num_rows();
		if($cek_efiling_data > 0) {
			$multiQueryDelete[] = "DELETE FROM `centro`.`efiling` $where_baru";
		}

		$query  = $this->db->query("SELECT no_rekening FROM centro.efiling_bi_checking $where_baru");
		$cek_efiling_data =  $query->num_rows();
		if($cek_efiling_data > 0) {
			$multiQueryDelete[] = "DELETE FROM `centro`.`efiling_bi_checking` $where_baru";
		}
		
		$cek_efiling_data = $this->db->query("SELECT no_rekening FROM centro.efiling_credit_analist $where_baru")->num_rows();
		if($cek_efiling_data > 0) {
			$multiQueryDelete[] = "DELETE FROM `centro`.`efiling_credit_analist` $where_baru";
		}
		
		$cek_efiling_data = $this->db->query("SELECT no_rekening FROM centro.efiling_foto $where_baru")->num_rows();
		if($cek_efiling_data > 0) {
			$multiQueryDelete[] = "DELETE FROM `centro`.`efiling_foto` $where_baru";
		}
		
		$cek_efiling_data = $this->db->query("SELECT no_rekening FROM centro.efiling_jaminan $where_baru")->num_rows();
		if($cek_efiling_data > 0) {
			$multiQueryDelete[] = "DELETE FROM `centro`.`efiling_jaminan` $where_baru";
		}
		
		$cek_efiling_data = $this->db->query("SELECT no_rekening FROM centro.efiling_legal $where_baru")->num_rows();
		if($cek_efiling_data > 0) {
			$multiQueryDelete[] = "DELETE FROM `centro`.`efiling_legal` $where_baru";
		}
		
		$cek_efiling_data = $this->db->query("SELECT no_rekening FROM centro.efiling_nasabah $where_baru")->num_rows();
		if($cek_efiling_data > 0) {
			$multiQueryDelete[] = "DELETE FROM `centro`.`efiling_nasabah` $where_baru";
		}
		
		$cek_efiling_data = $this->db->query("SELECT no_rekening FROM centro.efiling_permohonan_kredit $where_baru")->num_rows();
		if($cek_efiling_data > 0) {
			$multiQueryDelete[] = "DELETE FROM `centro`.`efiling_permohonan_kredit` $where_baru";
		}
		
		$cek_efiling_data = $this->db->query("SELECT no_rekening FROM centro.efiling_release_aset $where_baru")->num_rows();
		if($cek_efiling_data > 0) {
			$multiQueryDelete[] = "DELETE FROM `centro`.`efiling_release_aset` $where_baru";
		}
		
		$cek_efiling_data = $this->db->query("SELECT no_rekening FROM centro.efiling_spk_ndk $where_baru")->num_rows();
		if($cek_efiling_data > 0) {
			$multiQueryDelete[] = "DELETE FROM `centro`.`efiling_spk_ndk` $where_baru";
		}

		/// ASAL DATA DUPLIKAT ////
		/// cek dulu data lama datangnya dari mana, sefin or webtool
		$query  = $this->db->query("SELECT no_rekening, is_jenis FROM centro.efiling $where_lama");
		$cek_efiling_data =  $query->num_rows();
		if($cek_efiling_data > 0) {
			$efilings_jenis = $query->result_array();	
			$is_jenis = $efilings_jenis[0]['is_jenis'];
		}

		///Cek dulu apakah ada data di upload lewat webtool kalau ada ambil datanya dari webtool///
		$query  = $this->db->query("SELECT no_rekening FROM webtool.efiling $where_lama");
		$cek_efiling_data_lama =  $query->num_rows();
		if($cek_efiling_data_lama > 0) {
			//// is_jenis 2 dari webtool ////
			$str = "SELECT `kode_kantor`, `tgl_realisasi_eng` FROM webtool.`view_efiling_header` WHERE no_rekening='$norek_lama';";
			$query  = $this->db->query($str);
			$row_view_efiling_header = $query->result_array();
			$row_view_efiling_header1 = $query->result();
			
			$tgl_realisasi_eng = $row_view_efiling_header[0]['tgl_realisasi_eng'];
			$kode_kantor       = $row_view_efiling_header[0]['kode_kantor'];
			     
			$efiling_header = "SELECT '$norek_baru', '3', `root_server`, `folder_master`, '$user_id', NULL, NOW(), NULL, NOW(), '$norek_lama', '$tgl_realisasi_eng', '$kode_kantor' FROM webtool.`efiling` $where_lama";
					
			$efiling_bi_checking = "SELECT '$norek_baru', `pengajuan_bi`, `persetujuan`, `hasil`, `verifikasi`, `notes` FROM `webtool`.`efiling_bi_checking` $where_lama";
						
			$efiling_credit_analist = "SELECT '$norek_baru', `memo_ao`, `memo_ca`, `offering_letter`, `penilaian_jaminan`, `cheklist_survey`, `persetujuan_kredit`, `verifikasi`, `notes` FROM `webtool`.`efiling_credit_analist` $where_lama";
					
			$efiling_foto = "SELECT '$norek_baru', `ft_jaminan`, `ft_pengikatan`, `ft_domisili`, `ft_usaha`, `verifikasi`, `notes` FROM `webtool`.`efiling_foto` $where_lama";
				
			$efiling_jaminan = "SELECT '$norek_baru', `sertifikat`, `skmht`, `apht`, `cabut_roya`, `sht`, `pbb`, `imb`, `ajb`, `bpkb`, `ahli_waris`, `pengakuan_hutang`, `akta_pengakuan_hak_bersama`, `adendum`, `fidusia`, `verifikasi`, `notes` FROM `webtool`.`efiling_jaminan` $where_lama";
				 
			$efiling_legal = "SELECT '$norek_baru', `pengajuan_lpdk`, `lpdk`, `cheklist_pengikatan`, `order_pengikatan`, `verifikasi`, `notes` FROM `webtool`.`efiling_legal` $where_lama";
			
			$efiling_nasabah = "SELECT '$norek_baru', `ktp`, `npwp`, `kk`, `domisili`, `surat_nikah`, `surat_cerai`, `surat_lahir`, `surat_kematian`, `skd`, `slip_gaji`, `take_over`, `sk_kerja`, `sk_usaha`, `rek_koran`, `tdp`, `bon_usaha`, `verifikasi`, `notes` FROM `webtool`.`efiling_nasabah` $where_lama";
					
			$efiling_permohonan_kredit = "SELECT '$norek_baru', `aplikasi`, `denah_lokasi`, `checklist_kelengkapan`, `verifikasi`, `notes` FROM `webtool`.`efiling_permohonan_kredit` $where_lama";
					
			$efiling_release_aset = "SELECT '$norek_baru', `ra_tanda_terima`, `ra_surat_kuasa`, `ra_identitas_pengambilan`, `ra_lainnya`, `ra_serah_terima`, `verifikasi`, `notes` FROM `webtool`.`efiling_release_aset` $where_lama";
			
			$efiling_spk_ndk = "SELECT '$norek_baru', `spk_ndk`, `asuransi`, `sp_no_imb`, `jadwal_angsuran`, `personal_guarantee`, `hold_dana`, `surat_transfer`, `keabsahan_data`, `sp_beda_jt_tempo`, `sp_authentic`, `sp_penyerahan_jaminan`, `surat_aksep`, `tt_uang`, `sp_pendebetan_rekening`, `sp_plang`, `hal_penting`, `restruktur_bunga_denda`, `verifikasi`, `notes` FROM `webtool`.`efiling_spk_ndk` $where_lama";
				
			// DUPLIKAT EFILING
			$multiQuery = array();
			$errorQuery = array();
			$multiQuery[] = "INSERT INTO `centro`.`efiling`(`no_rekening`, `status_verif`, `root_server`, `folder_master`, `user_id`, `user_verif`, `tgl_buat`, `tgl_verif`, `tgl_update`, `no_rekening_lama`, `tgl_realisasi_eng_lama`, `kode_kantor_lama`) $efiling_header";
				
			$multiQuery[] = "INSERT INTO `centro`.`efiling_bi_checking`(`no_rekening`, `pengajuan_bi`, `persetujuan`, `hasil`, `verifikasi`, `notes`) $efiling_bi_checking";
				
			$multiQuery[] = "INSERT INTO `centro`.`efiling_credit_analist` (`no_rekening`, `memo_ao`, `memo_ca`, `offering_letter`, `penilaian_jaminan`, `cheklist_survey`, `persetujuan_kredit`, `verifikasi`, `notes`) $efiling_credit_analist";
					
			$multiQuery[] = "INSERT INTO `centro`.`efiling_foto` (`no_rekening`, `ft_jaminan`, `ft_pengikatan`, `ft_domisili`, `ft_usaha`, `verifikasi`, `notes`) $efiling_foto";
				
			$multiQuery[] = "INSERT INTO `centro`.`efiling_jaminan` (`no_rekening`, `sertifikat`, `skmht`, `apht`, `cabut_roya`, `sht`, `pbb`, `imb`, `ajb`, `bpkb`, `ahli_waris`, `pengakuan_hutang`, `akta_pengakuan_hak_bersama`, `adendum`, `fidusia`, `verifikasi`, `notes`) $efiling_jaminan";
					
			$multiQuery[] = "INSERT INTO `centro`.`efiling_legal` (`no_rekening`, `pengajuan_lpdk`, `lpdk`, `cheklist_pengikatan`, `order_pengikatan`, `verifikasi`, `notes`) $efiling_legal";
				
			$multiQuery[] = "INSERT INTO `centro`.`efiling_nasabah` (`no_rekening`, `ktp`, `npwp`, `kk`, `domisili`, `surat_nikah`, `surat_cerai`, `surat_lahir`, `surat_kematian`, `skd`, `slip_gaji`, `take_over`, `sk_kerja`, `sk_usaha`, `rek_koran`, `tdp`, `bon_usaha`, `verifikasi`, `notes`) $efiling_nasabah";
				
			$multiQuery[] = "INSERT INTO `centro`.`efiling_permohonan_kredit` (`no_rekening`, `aplikasi`, `denah_lokasi`, `checklist_kelengkapan`, `verifikasi`, `notes`) $efiling_permohonan_kredit";
				
			$multiQuery[] = "INSERT INTO `centro`.`efiling_release_aset` (`no_rekening`, `ra_tanda_terima`, `ra_surat_kuasa`, `ra_identitas_pengambilan`, `ra_lainnya`, `ra_serah_terima`, `verifikasi`, `notes`) $efiling_release_aset";
				
			$multiQuery[] = "INSERT INTO `centro`.`efiling_spk_ndk` (`no_rekening`, `spk_ndk`, `asuransi`, `sp_no_imb`, `jadwal_angsuran`, `personal_guarantee`, `hold_dana`, `surat_transfer`, `keabsahan_data`, `sp_beda_jt_tempo`, `sp_authentic`, `sp_penyerahan_jaminan`, `surat_aksep`, `tt_uang`, `sp_pendebetan_rekening`, `sp_plang`, `hal_penting`, `restruktur_bunga_denda`, `verifikasi`, `notes`) $efiling_spk_ndk";
	
		}
		else if($is_jenis == 1){ /// is_jenis 1 data dari migrasi sefin,get nya dari table centro

				//// is_jenis 1 dari SEFIN ////
				$str = "SELECT `kode_kantor`, `tgl_realisasi_eng` FROM webtool.`view_efiling_header` WHERE no_rekening='$norek_lama';";
				$query  = $this->db->query($str);
				$row_view_efiling_header = $query->result_array();
				$row_view_efiling_header1 = $query->result();
				
				$tgl_realisasi_eng = $row_view_efiling_header[0]['tgl_realisasi_eng'];
				$kode_kantor       = $row_view_efiling_header[0]['kode_kantor'];
				$efiling_header = "SELECT '$norek_baru', '3', `root_server`, `folder_master`, '$user_id', NULL, NOW(), NULL, NOW(), `status_dokument`, '$norek_lama', '$tgl_realisasi_eng', '$kode_kantor', `is_jenis` FROM centro.`efiling` $where_lama";
				 
				$efiling_bi_checking = "SELECT '$norek_baru', `pengajuan_bi`, `persetujuan`, `hasil`, `verifikasi`, `notes` FROM `centro`.`efiling_bi_checking` $where_lama";
                   	
				$efiling_credit_analist = "SELECT '$norek_baru', `memo_ao`, `memo_ca`, `offering_letter`, `penilaian_jaminan`, `cheklist_survey`, `persetujuan_kredit`, `verifikasi`, `notes` FROM `centro`.`efiling_credit_analist` $where_lama";
						
				$efiling_foto = "SELECT '$norek_baru', `ft_jaminan`, `ft_pengikatan`, `ft_domisili`, `ft_usaha`, `verifikasi`, `notes` FROM `centro`.`efiling_foto` $where_lama";
					
				$efiling_jaminan = "SELECT '$norek_baru', `sertifikat`, `skmht`, `apht`, `cabut_roya`, `sht`, `pbb`, `imb`, `ajb`, `bpkb`, `ahli_waris`, `pengakuan_hutang`, `akta_pengakuan_hak_bersama`, `adendum`, `fidusia`, `verifikasi`, `notes` FROM `centro`.`efiling_jaminan` $where_lama";
					 
				$efiling_legal = "SELECT '$norek_baru', `pengajuan_lpdk`, `lpdk`, `cheklist_pengikatan`, `order_pengikatan`, `verifikasi`, `notes` FROM `centro`.`efiling_legal` $where_lama";
				
				$efiling_nasabah = "SELECT '$norek_baru', `ktp`, `ktp2`, `npwp`, `kk`, `domisili`, `surat_nikah`, `surat_cerai`, `surat_lahir`, `surat_kematian`, `skd`, `slip_gaji`, `take_over`, `sk_kerja`, `sk_usaha`, `rek_koran`, `tdp`, `bon_usaha`, `verifikasi`, `notes` FROM `centro`.`efiling_nasabah` $where_lama";
						
				$efiling_permohonan_kredit = "SELECT '$norek_baru', `aplikasi`, `denah_lokasi`, `checklist_kelengkapan`, `verifikasi`, `notes` FROM `centro`.`efiling_permohonan_kredit` $where_lama";
						
				$efiling_release_aset = "SELECT '$norek_baru', `ra_tanda_terima`, `ra_surat_kuasa`, `ra_identitas_pengambilan`, `ra_lainnya`, `ra_serah_terima`, `verifikasi`, `notes` FROM `centro`.`efiling_release_aset` $where_lama";
				
				$efiling_spk_ndk = "SELECT '$norek_baru', `spk_ndk`, `asuransi`, `sp_no_imb`, `jadwal_angsuran`, `personal_guarantee`, `hold_dana`, `surat_transfer`, `keabsahan_data`, `sp_beda_jt_tempo`, `sp_authentic`, `sp_penyerahan_jaminan`, `surat_aksep`, `tt_uang`, `sp_pendebetan_rekening`, `sp_plang`, `hal_penting`, `restruktur_bunga_denda`, `spajk_spa_fpk`, `verifikasi`, `notes` FROM `centro`.`efiling_spk_ndk` $where_lama";
					
				// DUPLIKAT EFILING
				$multiQuery = array();
				$errorQuery = array();
				$multiQuery[] = "INSERT INTO `centro`.`efiling`(`no_rekening`, `status_verif`, `root_server`, `folder_master`, `user_id`, `user_verif`, `tgl_buat`, `tgl_verif`, `tgl_update`, `status_dokument`, `no_rekening_lama`, `tgl_realisasi_eng_lama`, `kode_kantor_lama`, `is_jenis`) $efiling_header";
					
				$multiQuery[] = "INSERT INTO `centro`.`efiling_bi_checking`(`no_rekening`, `pengajuan_bi`, `persetujuan`, `hasil`, `verifikasi`, `notes`) $efiling_bi_checking";
					
				$multiQuery[] = "INSERT INTO `centro`.`efiling_credit_analist` (`no_rekening`, `memo_ao`, `memo_ca`, `offering_letter`, `penilaian_jaminan`, `cheklist_survey`, `persetujuan_kredit`, `verifikasi`, `notes`) $efiling_credit_analist";
						
				$multiQuery[] = "INSERT INTO `centro`.`efiling_foto` (`no_rekening`, `ft_jaminan`, `ft_pengikatan`, `ft_domisili`, `ft_usaha`, `verifikasi`, `notes`) $efiling_foto";
					
				$multiQuery[] = "INSERT INTO `centro`.`efiling_jaminan` (`no_rekening`, `sertifikat`, `skmht`, `apht`, `cabut_roya`, `sht`, `pbb`, `imb`, `ajb`, `bpkb`, `ahli_waris`, `pengakuan_hutang`, `akta_pengakuan_hak_bersama`, `adendum`, `fidusia`, `verifikasi`, `notes`) $efiling_jaminan";
						
				$multiQuery[] = "INSERT INTO `centro`.`efiling_legal` (`no_rekening`, `pengajuan_lpdk`, `lpdk`, `cheklist_pengikatan`, `order_pengikatan`, `verifikasi`, `notes`) $efiling_legal";
					
				$multiQuery[] = "INSERT INTO `centro`.`efiling_nasabah` (`no_rekening`, `ktp`, `ktp2`, `npwp`, `kk`, `domisili`, `surat_nikah`, `surat_cerai`, `surat_lahir`, `surat_kematian`, `skd`, `slip_gaji`, `take_over`, `sk_kerja`, `sk_usaha`, `rek_koran`, `tdp`, `bon_usaha`, `verifikasi`, `notes`) $efiling_nasabah";
					
				$multiQuery[] = "INSERT INTO `centro`.`efiling_permohonan_kredit` (`no_rekening`, `aplikasi`, `denah_lokasi`, `checklist_kelengkapan`, `verifikasi`, `notes`) $efiling_permohonan_kredit";
					
				$multiQuery[] = "INSERT INTO `centro`.`efiling_release_aset` (`no_rekening`, `ra_tanda_terima`, `ra_surat_kuasa`, `ra_identitas_pengambilan`, `ra_lainnya`, `ra_serah_terima`, `verifikasi`, `notes`) $efiling_release_aset";
					
				$multiQuery[] = "INSERT INTO `centro`.`efiling_spk_ndk` (`no_rekening`, `spk_ndk`, `asuransi`, `sp_no_imb`, `jadwal_angsuran`, `personal_guarantee`, `hold_dana`, `surat_transfer`, `keabsahan_data`, `sp_beda_jt_tempo`, `sp_authentic`, `sp_penyerahan_jaminan`, `surat_aksep`, `tt_uang`, `sp_pendebetan_rekening`, `sp_plang`, `hal_penting`, `restruktur_bunga_denda`, `spajk_spa_fpk`, `verifikasi`, `notes`) $efiling_spk_ndk";
		
		}
		
		// var_dump($multiQuery);
		$this->db->trans_begin();
				foreach ($multiQueryDelete as $delete){
					$this->db->query($delete);
				}
	    		foreach ($multiQuery as $insert){
					$this->db->query($insert);
				}
        if ($this->db->trans_status() === FALSE)
        {
          $this->db->trans_rollback();
              return 'Error Duplikat Efilling';
        }
        else
        {
          $this->db->trans_commit();
              return 'Sukses';
        }


	}
}