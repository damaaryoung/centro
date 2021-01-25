<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class AsetDokumenEntryModel extends CI_Model{
	
	public function __construct() {
		parent:: __construct();
		$this->load->database();
	}

	public function getNomorRek(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
			$str = "SELECT * 
					FROM `vmicro_browse_kredit`
					#WHERE 0=0 
					ORDER BY tgl_realisasi DESC
					limit 25;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function searchNoRek($search){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
			$str = "SELECT * 
					FROM `vmicro_browse_kredit` 
					WHERE no_rekening LIKE '$search%' 
					#OR nasabah_id LIKE '$search%'
					OR nama_nasabah LIKE '%$search%'
					ORDER BY tgl_realisasi DESC LIMIT 25;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function sysdate(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT DATE_FORMAT(SYSDATE(), '%Y-%m-%d') AS 'sysdate';";
        $query = $this->db->query($str);
        
        return $query->result_array();
	}
	public function KreKodeJenisAgunan(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT kode_jenis_agunan as kode_jenis_agunan, CONCAT(kode_jenis_agunan,' - ',deskripsi_jenis_agunan) AS jenis_agunan, persen_default as persen_default
				FROM kre_kode_jenis_agunan;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}	
	public function KreKodeIkatanHukumAgunan(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT kode_ikatan_hukum as kode_ikatan_hukum, CONCAT(kode_ikatan_hukum,' - ',deskripsi_ikatan_hukum) AS ikatan_agunan, persen_default as persen_default
				FROM kre_kode_ikatan_hukum_agunan;";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function nextID(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT get_auto_next_id('dpm_online','jaminan_dokument') AS 'id';";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}	
	public function selectKodeKantor(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT AKK.kode_kantor, AKK.kode_cabang, AKK.nama_kantor, AKK.`flg_aktif` 
				FROM `app_kode_kantor` AKK;
               ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function getSlikKodeJenisAgunan(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT `nomor`, `kode`, `nama`
				FROM slik_ref_jenis_agunan
				WHERE flg_aktif='1'
				ORDER BY `nomor`;
				";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}	
	public function getSlikLembagaPemeringkat(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT `nomor`, `kode`, `nama`
				FROM slik_ref_lembaga_pemeringkat
				WHERE flg_aktif='1'
				ORDER BY `nomor`;
				";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function getSlikJenisPengikatan(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT `nomor`, `kode`, `nama`
				FROM slik_ref_jenis_pengikatan
				WHERE flg_aktif='1'
				ORDER BY `nomor`;
				";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function getSlikDati2(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT `nomor`, `kode`, `nama`
				FROM slik_ref_dati
				WHERE flg_aktif='1'
				ORDER BY `nomor`;
				";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function listAsetDokumen($kode_kantor){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT 
					`jaminan_dokument`.`agunan_id`,
					LEFT(
					IF(
						`jenis` = 'SERTIFIKAT',
						CONCAT(
						IF(
							IFNULL(`no_shm`, '') <> '',
							'SHM',
							IF(
							IFNULL(`no_shgb`, '') <> '',
							'SHGB',
							'AJB'
							)
						),
						' NO. ',
						IF(
							IFNULL(`no_shm`, '') <> '',
							`no_shm`,
							IF(
							IFNULL(`no_shgb`, '') <> '',
							`no_shgb`,
							`no_ajb`
							)
						),
						' A/N : ',
						`nama_pemilik_sertifikat`,
						' ALAMAT : ',
						`alamat_sertifikat`
						),
						CONCAT(
						'BPKB NO. ',
						IFNULL(`nomor_bpkb`, ''),
						' A/N : ',
						`nama_bpkb`,
						' ALAMAT : ',
						`alamat_bpkb`,
						' NO RANGKA : ',
						`no_rangka`,
						' NO MESIN : ',
						`no_mesin`,
						' TAHUN ',
						`tahun`,
						' NO. POL : ',
						`no_polisi`
						)
					),
					450
					) AS deskripsi_ringkas_jaminan,
					`flg_cetak`.`nomor` AS nomor_cetak,
					jaminan_header.id,
					LEFT(jaminan_header.nomor, 10) AS nomor,
					LEFT(jaminan_header.no_reff, 10) AS no_reff,
					jaminan_header.tgl,
					IF(
					jaminan_header.`status` = 'PINJAM',
					CONCAT(
						jaminan_header.nama,
						' (Nasabah a.n:',
						`jaminan_history`.nama_nasabah,
						')'
					),
					jaminan_header.nama
					) AS nama,
					LEFT(jaminan_header.alamat, 200) AS alamat,
					jaminan_header.kelurahan,
					jaminan_header.kecamatan,
					jaminan_header.kota,
					jaminan_header.propinsi,
					jaminan_header.kode_pos,
					jaminan_header.jenis_jaminan,
					jaminan_header.roda_kendaraan,
					jaminan_header.status,
					jaminan_header.kontrak_status,
					jaminan_header.ket,
					jaminan_header.no_rekening,
					jaminan_header.tgl_realisasi,
					jaminan_header.kode_kantor,
					jaminan_header.tgl_rencana_kembali,
					jaminan_header.jenis_pengurusan,
					jaminan_header.verifikasi,
					`jaminan_history`.nama_nasabah,
					jaminan_dokument.kode_kantor_lokasi_jaminan,
					jaminan_dokument.`lokasi_penyimpanan` #, app_kode_kantor.nama_kantor 
				FROM
					jaminan_header 
					LEFT JOIN `flg_cetak` 
					ON `flg_cetak`.nomor = jaminan_header.nomor 
					AND `flg_cetak`.setting = IF(
						jaminan_header.status = 'MASUK',
						'ASSET_IN',
						IF(
						jaminan_header.status = 'KELUAR',
						'ASSET_OUT',
						'ASSET_TEMP_OUT'
						)
					) 
					LEFT JOIN 
					(SELECT DISTINCT 
						kode_kantor AS kd_kantor,
						nomor,
						no_reff,
						nama AS nama_nasabah 
					FROM
						`jaminan_history` 
					WHERE `status` = 'MASUK') `jaminan_history` 
					ON `jaminan_history`.kd_kantor = jaminan_header.kode_kantor 
					AND `jaminan_history`.no_reff = jaminan_header.no_reff 
					LEFT JOIN 
					(SELECT 
						no_reff,
						agunan_id,
						jenis,
						no_shm,
						no_shgb,
						no_ajb,
						nama_pemilik_sertifikat,
						alamat_sertifikat,
						nomor_bpkb,
						nama_bpkb,
						alamat_bpkb,
						no_rangka,
						no_mesin,
						tahun,
						no_polisi,
						kode_kantor_lokasi_jaminan,
						lokasi_penyimpanan 
					FROM
						jaminan_dokument) jaminan_dokument 
					ON jaminan_dokument.no_reff = jaminan_header.no_reff #WHERE jaminan_header.status='PINJAM'
					#LEFT JOIN app_kode_kantor ON app_kode_kantor.kode_kantor = jaminan_dokument.kode_kantor_lokasi_jaminan 
				WHERE jaminan_header.kode_kantor = '$kode_kantor' 
					AND jaminan_header.status = 'MASUK' 
					AND jaminan_header.jenis_jaminan = 'SERTIFIKAT' 
				ORDER BY jaminan_header.nomor DESC 
				LIMIT 0, 10;  ";
		$query = $this->db2->query($str);
		return $query->result_array();
	}

	//select nomor ref dan nomor
	public function updateNoRef($mainAreaKerja){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("UPDATE 
							counter 
							SET nomor = nomor + 1  
							WHERE setting= CONCAT('ASSET_IN','$mainAreaKerja')
							AND nomor <= nomor + 1
						  ");
		
	}
	public function generateAgunanID($mainAreaKerja){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT CONCAT('$mainAreaKerja','.',LPAD(SUBSTR(agunan_id, 4, 6) + 1, 6, '0')) AS hasil 
	  			FROM kre_agunan 
				WHERE agunan_id LIKE CONCAT('$mainAreaKerja', '.%') 
				ORDER BY hasil DESC 
				LIMIT 1";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}

	//insert sertifikat//
	public function insertJaminanHeaderSert($mainTanggal,
											$mainNama,
											$mainAlamat,
											$mainKota,
											$jenisJaminan,
											$rodaKendaraan,
											$mainTransaksi, //status
											$mainKeterangan, 
											$mainJenisPengurusan,
											$mainAreaKerja,
											$mainNomorRekening,
											$mainTanggalRealisasi,
												$no_shm,
												$no_shgb,
												$sertTanggalSertifikat,
												$sertJTSHGB,
												$sertNoSuratUkur,
												$sertLuasTanah,
												$sertNamaPemilik,
												$sertAlamatSertifikat,
												$sertKelurahan,
												$sertKecamatan,
												$sertKota,
												$sertPorpinsi,
												$ajb,
												$no_ajb,
												$imb,
												$sertNomorIMB,
												$sppt,
												$sertNomorSPPT,
												$sertTahunSPPT,
												$skmht,
												$denah,
												$roya,
												$sht,
												$sertNoSHT,
												$sertPropinsiSHT,
												$sertKotaSHT,
												$stts,
												$sertTahunSTTS,
												$ssb_bpht,
												$sertAtasNamaSSBBPHTB,
												$agunan_id, //AGUNAN_ID
												$sertKodeJenisAgunan,//jenis_agunan_detail,
												$sertTanggalAJB,
												$sertKOHIR,
												$sertNoPERSIL,
												$sertPLBangunan,
												$sertBatasTanah,
												$sertNamaPPAT,
												$sertKodeIkatanAgunan,
												$sertPersenDijamin,
												$sertNilaiTaksasiAgunan,
												$sertNJOP,
												$sertHargaPasar,
												$sertAPHT,
												$sertDokAJB, //`asli_ajb`,
												$sertDokIMB, //`asli_imb`,
												$sertDokSPPT, //`asli_sppt`,
												$sertDokSKHMT,//`asli_skmht`,
												$sertDokDenah,//`asli_gambar_denah`,
												$sertDokRoya, //`asli_surat_roya`,
												$sertDokSHT,//`asli_sht`,
												$sertDokSTTS,//`asli_stts`,
												$sertDokSSB,//`asli_ssb`,
												$sertTglRegister,//tgl_register,
												$sertKantorLokasi,//kode_kantor_lokasi_jaminan,
												$sertLainnya,
												$verifikasi,
												$cif,
												$sertSlikStatusAgunan,
												$sertSlikJenisAgunan,
												$sertSlikPeringkatAgunan,
												$sertSlikLembagaPemeringkat,
												$sertSlikJenisPengikatan,
												$sertSlikTanggalPengikatan,
												$sertSlikNamaPemilikAgunan,
												$sertSlikBuktiKepemilikanAgunan,
												$sertSlikAlamat,
												$sertSlikKodeDati2,
												$sertSlikNilaiNJOP,
												$sertSlikNilaiLJK,
												$sertSlikTanggalLJK,
												$sertSlikNilaiIndependen,
												$sertSlikNamaIndependen,
												$sertSlikTglIndependen,
												$sertSlikParipasu,
												$sertSlikParipasuPersen,
												$sertSLikStatusJoinAccount,
												$sertSlikAsuransi,
												$sertSlikKeterangan){

		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$this->db2->trans_start();
		$this->db2->query("INSERT INTO jaminan_header (
							id,
							nomor,
							no_reff,
							tgl,
							nama,
							alamat,
							kota,
							jenis_jaminan,
							roda_kendaraan,
							STATUS,
							ket,
							kode_kantor,
							no_rekening,
							tgl_realisasi,
							jenis_pengurusan,
							verifikasi
						) 
						VALUES(
							get_auto_next_id ('dpm_online', 'jaminan_header'),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
							'$mainTanggal',
							'$mainNama',
							'$mainAlamat',
							'$mainKota',
							'$jenisJaminan',
							'$rodaKendaraan',
							'$mainTransaksi',
							'$mainKeterangan',
							'$mainAreaKerja',
							'$mainNomorRekening',
							'$mainTanggalRealisasi',
							'$mainJenisPengurusan',
							'$verifikasi');");
		$this->db2->query("INSERT INTO jaminan_dokument (
								id,
								no_reff,
								jenis,
								no_shm,
								no_shgb,
								tgl_sertifikat,
								tgl_jt_shgb,
								no_surat_ukur,
								luas_tanah,
								nama_pemilik_sertifikat,
								alamat_sertifikat,
								kelurahan_sertifikat,
								kecamatan_sertifikat,
								kota_sertifikat,
								propinsi_sertifikat,
								ajb,
								no_ajb,
								imb,
								no_imb,
								sppt,
								no_sppt,
								sppt_tahun,
								skmht,
								gambar_denah,
								surat_roya,
								sht,
								no_sht,
								sht_propinsi,
								sht_kota,
								stts,
								stts_tahun,
								ssb,
								ssb_atas_nama,
								agunan_id,
								jenis_agunan_detail,
								tgl_ajb,
								no_kohir,
								no_persil,
								pl_bangunan,
								batas_tanah,
								nama_ppat,
								ikatan_agunan_detail,
								persen_dijaminkan_detail,
								nilai_taksasi_detail,
								nilai_njop_detail,
								nilai_pasar_detail,
								nilai_apht_detail,
								`asli_ajb`,
								`asli_imb`,
								`asli_sppt`,
								`asli_skmht`,
								`asli_gambar_denah`,
								`asli_surat_roya`,
								`asli_sht`,
								`asli_stts`,
								`asli_ssb`,
								kode_kantor,
								tgl_register,
								kode_kantor_lokasi_jaminan,
								no_rekening_agunan,
								lain_lain,
								verifikasi
							)
							VALUES(
								get_auto_next_id('dpm_online','jaminan_dokument'),
								concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
								'$jenisJaminan',
								'$no_shm',
								'$no_shgb',
								'$sertTanggalSertifikat',
								'$sertJTSHGB',
								'$sertNoSuratUkur',
								'$sertLuasTanah',
								'$sertNamaPemilik',
								'$sertAlamatSertifikat',
								'$sertKelurahan',
								'$sertKecamatan',
								'$sertKota',
								'$sertPorpinsi',
								'$ajb',
								'$no_ajb',
								'$imb',
								'$sertNomorIMB',
								'$sppt',
								'$sertNomorSPPT',
								'$sertTahunSPPT',
								'$skmht',
								'$denah',
								'$roya',
								'$sht',
								'$sertNoSHT',
								'$sertPropinsiSHT',
								'$sertKotaSHT',
								'$stts',
								'$sertTahunSTTS',
								'$ssb_bpht',
								'$sertAtasNamaSSBBPHTB',
								'$agunan_id',
								'$sertKodeJenisAgunan',
								'$sertTanggalAJB',
								'$sertKOHIR',
								'$sertNoPERSIL',
								'$sertPLBangunan',
								'$sertBatasTanah',
								'$sertNamaPPAT',
								'$sertKodeIkatanAgunan',
								'$sertPersenDijamin',
								'$sertNilaiTaksasiAgunan',
								'$sertNJOP',
								'$sertHargaPasar',
								'$sertAPHT',
								'$sertDokAJB',
								'$sertDokIMB',
								'$sertDokSPPT',
								'$sertDokSKHMT',
								'$sertDokDenah',
								'$sertDokRoya',
								'$sertDokSHT',
								'$sertDokSTTS',
								'$sertDokSSB',
								'$mainAreaKerja',
								'$sertTglRegister',
								'$sertKantorLokasi',
								'$mainNomorRekening',
								'$sertLainnya',
								'$verifikasi');");
		$this->db2->query("INSERT INTO `slik_agunan` (
									`flag_detail`,
									`kode_register_agunan`,
									`no_rekening`,
									`cif`,
									`kode_jenis_segment_fasilitas`,
									`kode_status_agunan`,
									`kode_jenis_agunan`,
									`peringkat_agunan`,
									`kode_lembaga_pemeringkat`,
									`kode_jenis_pengikatan`,
									`tanggal_pengikatan`,
									`nama_pemilik_agunan`,
									`bukti_kepemilikan`,
									`alamat_agunan`,
									`kode_kab_kota`,
									`nilai_agunan`,
									`nilai_agunan_menurut_ljk`,
									`tanggal_penilaian_ljk`,
									`nilai_agunan_penilai_independen`,
									`nama_penilai_independen`,
									`tanggal_penilaian_independen`,
									`status_paripasu`,
									`prosentase_paripasu`,
									`status_kredit_join`,
									`diasuransikan`,
									`keterangan`,
									`kode_kantor_cabang`,
									`operasi_data`
								) 
							VALUES( 'D',
									'$agunan_id',
									'$mainNomorRekening',
									'$cif',
									'F01',
									'$sertSlikStatusAgunan',
									'$sertSlikJenisAgunan',
									'$sertSlikPeringkatAgunan',
									'$sertSlikLembagaPemeringkat',
									'$sertSlikJenisPengikatan',
									'$sertSlikTanggalPengikatan',
									'$sertSlikNamaPemilikAgunan',
									'$sertSlikBuktiKepemilikanAgunan',
									'$sertSlikAlamat',
									'$sertSlikKodeDati2',
									'$sertSlikNilaiNJOP',
									'$sertSlikNilaiLJK',
									'$sertSlikTanggalLJK',
									'$sertSlikNilaiIndependen',
									'$sertSlikNamaIndependen',
									'$sertSlikTglIndependen',
									'$sertSlikParipasu',
									'$sertSlikParipasuPersen',
									'$sertSLikStatusJoinAccount',
									'$sertSlikAsuransi',
									'$sertSlikKeterangan',
									(SELECT sandi_cabang AS kode
										FROM app_kode_kantor akk
										WHERE akk.`kode_kantor` = '$sertKantorLokasi'
										LIMIT 1),
									'C') 
									ON DUPLICATE KEY 
									UPDATE 
									`flag_detail`				      = 'D',
									`kode_jenis_segment_fasilitas` 	  = 'F01',
									`kode_status_agunan`   			  = '$sertSlikStatusAgunan',
									`kode_jenis_agunan` 			  = '$sertSlikJenisAgunan',
									`peringkat_agunan` 				  = '$sertSlikPeringkatAgunan',
									`kode_lembaga_pemeringkat` 		  = '$sertSlikLembagaPemeringkat',
									`kode_jenis_pengikatan` 		  = '$sertSlikJenisPengikatan',
									`tanggal_pengikatan` 			  = '$sertSlikTanggalPengikatan',
									`nama_pemilik_agunan` 			  = '$sertSlikNamaPemilikAgunan',
									`bukti_kepemilikan` 			  = '$sertSlikBuktiKepemilikanAgunan',
									`alamat_agunan` 			      = '$sertSlikAlamat',
									`kode_kab_kota` 			      = '$sertSlikKodeDati2',
									`nilai_agunan` 					  = '$sertSlikNilaiNJOP',
									`nilai_agunan_menurut_ljk` 		  = '$sertSlikNilaiLJK',
									`tanggal_penilaian_ljk` 		  = '$sertSlikTanggalLJK',
									`nilai_agunan_penilai_independen` = '$sertSlikNilaiIndependen',
									`nama_penilai_independen`         = '$sertSlikNamaIndependen',
									`tanggal_penilaian_independen`    = '$sertSlikTglIndependen',
									`status_paripasu` 				  = '$sertSlikParipasu',
									`prosentase_paripasu` 			  = '$sertSlikParipasuPersen',
									`status_kredit_join` 			  = '$sertSLikStatusJoinAccount',
									`diasuransikan` 				  = '$sertSlikAsuransi',
									`keterangan` 					  = '$sertSlikKeterangan',
									`kode_kantor_cabang` 			  = (SELECT sandi_cabang AS kode
																			FROM app_kode_kantor akk
																			WHERE akk.`kode_kantor` = '$sertKantorLokasi'
																			LIMIT 1);");
		$this->db2->trans_complete();
	}
	
	public function getCIF($mainNomorRekening){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
			$str = " SELECT nasabah_id 
						FROM `vmicro_browse_kredit` WHERE no_rekening = '$mainNomorRekening'
						ORDER BY tgl_realisasi DESC 
						LIMIT 1";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	
	//// bpkb ////
	public function getJenisKend(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT kd_jenis, nm_jenis, flg_aktif
				FROM jaminan_jenis_kendaraan
				WHERE flg_aktif = 1
				ORDER BY kd_jenis;
               ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function getMerkKend(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT kd_merk, nm_merk, flg_aktif
				FROM jaminan_merk_kendaraan
				WHERE flg_aktif=1
				ORDER BY kd_merk;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function getTypeKend(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT  kd_type, nm_type, flg_aktif, kd_merk
				FROM jaminan_type_kendaraan
				WHERE flg_aktif=1 
				#and kd_merk='0000000126'
				ORDER BY kd_type";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function getTypeKend2($merk){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT kd_type, nm_type, flg_aktif, kd_merk
					FROM jaminan_type_kendaraan
					WHERE kd_merk='$merk'
					ORDER BY kd_type;";
        $query = $this->db2->query($str);
        
        return $query->result_array();

	}
	public function insertJaminanHeaderBPKB($mainAreaKerja,
												$mainTanggal,
												$mainNama,
												$mainAlamat,
												$mainKota,
												$jenisJaminan,
												$rodaKendaraan,
												$mainTransaksi,
												$mainKeterangan,
												$mainNomorRekening,
												$mainTanggalRealisasi,
												$mainJenisPengurusan,
												$bpkbKodeJenisAgunan,
												$bpkbNoBPKB,
												$bpkbNamaPemilik,
												$bpkbAlamatPemlik,
												$bpkbKotaPemilik,
												$bpkbMerk,
												$bpkbType,
												$bpkbJenis,
												$bpkbNoRangka,
												$bpkbNoMesin,
												$bpkbWarna,
												$bpkbTahun,
												$bpkbNoPolisi,
												$bpkbNoSTNK,
												$bpkbSilinder,
												$bpkbDokKwitansiBlanko,
												$bpkbDokFakturPemilik,
												$bpkbDokKwJualBeli,
												$bpkbDokSKTrayek,
												$blanko,
												$faktur_pemilik,
												$kwitansi_jb,
												$sk_trayek,
												$bpkbNoFakturPemilik,
												$noSKTrayek,
												$bpkbBerlakuSD,
												$bpkbTglExpPajak,
												$bpkbTglExpSTNK,
												$bpkbKodeIkatanAgunan,
												$bpkbPersenDijamin,
												$bpkbNilaiTaksasiAgunan,
												$bpkbNJOP,
												$bpkbHargaPasar,
												$bpkbAPHT,
												$bpkbLainnya,
												$agunan_id,
												$bpkbTglRegister,
												$bpkbKantorLokasi,
												$cif,
												$sertSlikStatusAgunan,
												$sertSlikJenisAgunan,
												$sertSlikPeringkatAgunan,
												$sertSlikLembagaPemeringkat,
												$sertSlikJenisPengikatan,
												$sertSlikTanggalPengikatan,
												$sertSlikNamaPemilikAgunan,
												$sertSlikBuktiKepemilikanAgunan,
												$sertSlikAlamat,
												$sertSlikKodeDati2,
												$sertSlikNilaiNJOP,
												$sertSlikNilaiLJK,
												$sertSlikTanggalLJK,
												$sertSlikNilaiIndependen,
												$sertSlikNamaIndependen,
												$sertSlikTglIndependen,
												$sertSlikParipasu,
												$sertSlikParipasuPersen,
												$sertSLikStatusJoinAccount,
												$sertSlikAsuransi,
												$sertSlikKeterangan,
												$verifikasi){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$this->db2->trans_start();
		$this->db2->query("INSERT INTO jaminan_header (
							id,
							nomor,
							no_reff,
							tgl,
							nama,
							alamat,
							kota,
							jenis_jaminan,
							roda_kendaraan,
							STATUS,
							ket,
							kode_kantor,
							no_rekening,
							tgl_realisasi,
							jenis_pengurusan,
							verifikasi
						)  
						VALUES(
							get_auto_next_id ('dpm_online', 'jaminan_header'),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
							'$mainTanggal',
							'$mainNama',
							'$mainAlamat',
							'$mainKota',
							'$jenisJaminan',
							'$rodaKendaraan',
							'$mainTransaksi',
							'$mainKeterangan',
							'$mainAreaKerja',
							'$mainNomorRekening',
							'$mainTanggalRealisasi',
							'$mainJenisPengurusan',
							'$verifikasi');");
		

		$this->db2->query("INSERT INTO jaminan_dokument (
								`id`,
								`no_reff`,
								`jenis`, 
								`jenis_agunan_detail`,
								`nomor_bpkb`,
								`nama_bpkb`,
								`alamat_bpkb`,
								`kota_bpkb`,
								`kd_merk`,
								`kd_type`,
								`kd_jenis`,
								`no_rangka`,
								`no_mesin`,
								`warna`,
								`tahun`,
								`no_polisi`,
								`no_stnk`,
								`silinder`,
								`asli_blanko`,
								`asli_faktur_pemilik`,
								`asli_kwitansi_jb`,
								`asli_sk_trayek`,
								`blanko`,
								`faktur_pemilik`,
								`kwitansi_jb`,
								`sk_trayek`,
								`no_faktur`,
								`no_sk_trayek`,
								`tgl_expired_sk_trayek`,
								`tgl_expired_pajak`,
								`tgl_expired_stnk`,
								`ikatan_agunan_detail`,
								`persen_dijaminkan_detail`,
								`nilai_taksasi_detail`,
								`nilai_njop_detail`,
								`nilai_pasar_detail`,
								`nilai_apht_detail`,
								`lain_lain`,
								`agunan_id`,
								`verifikasi`,
								`kode_kantor`,
								`tgl_register`,
								`kode_kantor_lokasi_jaminan`,
								`no_rekening_agunan`)
							VALUES(
								get_auto_next_id('dpm_online','jaminan_dokument'),
								concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
								'$jenisJaminan',
								'$bpkbKodeJenisAgunan',
								'$bpkbNoBPKB',
								'$bpkbNamaPemilik',
								'$bpkbAlamatPemlik',
								'$bpkbKotaPemilik',
								'$bpkbMerk',
								'$bpkbType',
								'$bpkbJenis',
								'$bpkbNoRangka',
								'$bpkbNoMesin',
								'$bpkbWarna',
								'$bpkbTahun',
								'$bpkbNoPolisi',
								'$bpkbNoSTNK',
								'$bpkbSilinder',
								'$bpkbDokKwitansiBlanko',
								'$bpkbDokFakturPemilik',
								'$bpkbDokKwJualBeli',
								'$bpkbDokSKTrayek',
								'$blanko',
								'$faktur_pemilik',
								'$kwitansi_jb',
								'$sk_trayek',
								'$bpkbNoFakturPemilik',
								'$noSKTrayek',
								'$bpkbBerlakuSD',
								'$bpkbTglExpPajak',
								'$bpkbTglExpSTNK',
								'$bpkbKodeIkatanAgunan',
								'$bpkbPersenDijamin',
								'$bpkbNilaiTaksasiAgunan',
								'$bpkbNJOP',
								'$bpkbHargaPasar',
								'$bpkbAPHT',
								'$bpkbLainnya',
								'$agunan_id',
								'$verifikasi',
								'$mainAreaKerja',
								'$bpkbTglRegister',
								'$bpkbKantorLokasi',
								'$mainNomorRekening');");
		$this->db2->query("INSERT INTO `slik_agunan` (
									`flag_detail`,
									`kode_register_agunan`,
									`no_rekening`,
									`cif`,
									`kode_jenis_segment_fasilitas`,
									`kode_status_agunan`,
									`kode_jenis_agunan`,
									`peringkat_agunan`,
									`kode_lembaga_pemeringkat`,
									`kode_jenis_pengikatan`,
									`tanggal_pengikatan`,
									`nama_pemilik_agunan`,
									`bukti_kepemilikan`,
									`alamat_agunan`,
									`kode_kab_kota`,
									`nilai_agunan`,
									`nilai_agunan_menurut_ljk`,
									`tanggal_penilaian_ljk`,
									`nilai_agunan_penilai_independen`,
									`nama_penilai_independen`,
									`tanggal_penilaian_independen`,
									`status_paripasu`,
									`prosentase_paripasu`,
									`status_kredit_join`,
									`diasuransikan`,
									`keterangan`,
									`kode_kantor_cabang`,
									`operasi_data`
								) 
								VALUES( 'D',
									'$agunan_id',
									'$mainNomorRekening',
									'$cif',
									'F01',
									'$sertSlikStatusAgunan',
									'$sertSlikJenisAgunan',
									'$sertSlikPeringkatAgunan',
									'$sertSlikLembagaPemeringkat',
									'$sertSlikJenisPengikatan',
									'$sertSlikTanggalPengikatan',
									'$sertSlikNamaPemilikAgunan',
									'$sertSlikBuktiKepemilikanAgunan',
									'$sertSlikAlamat',
									'$sertSlikKodeDati2',
									'$sertSlikNilaiNJOP',
									'$sertSlikNilaiLJK',
									'$sertSlikTanggalLJK',
									'$sertSlikNilaiIndependen',
									'$sertSlikNamaIndependen',
									'$sertSlikTglIndependen',
									'$sertSlikParipasu',
									'$sertSlikParipasuPersen',
									'$sertSLikStatusJoinAccount',
									'$sertSlikAsuransi',
									'$sertSlikKeterangan',
									(SELECT sandi_cabang AS kode
										FROM app_kode_kantor akk
										WHERE akk.`kode_kantor` = '$bpkbKantorLokasi'
										LIMIT 1),
									'C') 
									ON DUPLICATE KEY 
									UPDATE 
									`flag_detail`				      = 'D',
									`kode_jenis_segment_fasilitas` 	  = 'F01',
									`kode_status_agunan`   			  = '$sertSlikStatusAgunan',
									`kode_jenis_agunan` 			  = '$sertSlikJenisAgunan',
									`peringkat_agunan` 				  = '$sertSlikPeringkatAgunan',
									`kode_lembaga_pemeringkat` 		  = '$sertSlikLembagaPemeringkat',
									`kode_jenis_pengikatan` 		  = '$sertSlikJenisPengikatan',
									`tanggal_pengikatan` 			  = '$sertSlikTanggalPengikatan',
									`nama_pemilik_agunan` 			  = '$sertSlikNamaPemilikAgunan',
									`bukti_kepemilikan` 			  = '$sertSlikBuktiKepemilikanAgunan',
									`alamat_agunan` 			      = '$sertSlikAlamat',
									`kode_kab_kota` 			      = '$sertSlikKodeDati2',
									`nilai_agunan` 					  = '$sertSlikNilaiNJOP',
									`nilai_agunan_menurut_ljk` 		  = '$sertSlikNilaiLJK',
									`tanggal_penilaian_ljk` 		  = '$sertSlikTanggalLJK',
									`nilai_agunan_penilai_independen` = '$sertSlikNilaiIndependen',
									`nama_penilai_independen`         = '$sertSlikNamaIndependen',
									`tanggal_penilaian_independen`    = '$sertSlikTglIndependen',
									`status_paripasu` 				  = '$sertSlikParipasu',
									`prosentase_paripasu` 			  = '$sertSlikParipasuPersen',
									`status_kredit_join` 			  = '$sertSLikStatusJoinAccount',
									`diasuransikan` 				  = '$sertSlikAsuransi',
									`keterangan` 					  = '$sertSlikKeterangan',
									`kode_kantor_cabang` 			  = (SELECT sandi_cabang AS kode
																			FROM app_kode_kantor akk
																			WHERE akk.`kode_kantor` = '$bpkbKantorLokasi'
																			LIMIT 1);");

		$this->db2->trans_complete();

	}


	/// EMAS ///
	public function insertJaminanHeaderEmas($mainAreaKerja,
											$mainTanggal,
											$mainNama,
											$mainAlamat,
											$mainKota,
											$jenisJaminan,
											$rodaKendaraan,
											$mainTransaksi,
											$mainKeterangan,
											$mainNomorRekening,
											$mainTanggalRealisasi,
											$mainJenisPengurusan,
											$verifikasi){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("INSERT INTO jaminan_header (
							id,
							nomor,
							no_reff,
							tgl,
							nama,
							alamat,
							kota,
							jenis_jaminan,
							roda_kendaraan,
							STATUS,
							ket,
							kode_kantor,
							no_rekening,
							tgl_realisasi,
							jenis_pengurusan,
							verifikasi
						)  
						VALUES(
							get_auto_next_id ('dpm_online', 'jaminan_header'),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
							'$mainTanggal',
							'$mainNama',
							'$mainAlamat',
							'$mainKota',
							'$jenisJaminan',
							'$rodaKendaraan',
							'$mainTransaksi',
							'$mainKeterangan',
							'$mainAreaKerja',
							'$mainNomorRekening',
							'$mainTanggalRealisasi',
							'$mainJenisPengurusan',
							'$verifikasi');");
		
	}
	public function insertJaminanDokumentEmas($jenisJaminan,
												$emasSIDNJOP,
												$agunan_id,
												$verifikasi,
												$emasKarat,
												$emasBerat,
												$emasHargaPasar,
												$emasHargaTaksasi,
												$emasNoSeri,
												$emasJenisEmas,
												$mainAreaKerja,
												$mainNomorRekening
											){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
												
		$this->db2->query("INSERT INTO jaminan_dokument (
							`id`,
							`no_reff`,
							`jenis`, 
							`nilai_njop_detail`,
							`agunan_id`,
							`verifikasi`,
							`karat`,
							`berat`,
							`harga_pasar`,
							`harga_taksasi`,
							`no_seri`,
							`jenis_emas`,
							`kode_kantor`,
							`no_rekening_agunan`
						)
						VALUES(
							get_auto_next_id('dpm_online','jaminan_dokument'),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
							'$jenisJaminan',
							'$emasSIDNJOP',
							'$agunan_id',
							'$verifikasi',
							'$emasKarat',
							'$emasBerat',
							'$emasHargaPasar',
							'$emasHargaTaksasi',
							'$emasNoSeri',
							'$emasJenisEmas',
							'$mainAreaKerja',
							'$mainNomorRekening'
							);");

	}

	// DELETE //
	public function deleteDataDokumen($nomorAgunan,
										$nomorRefAgunan,
										$dataStatus,
										$agunanID){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$this->db2->trans_start();
		$this->db2->query("UPDATE  `slik_agunan` 
							SET	`operasi_data`= 'D'
							WHERE kode_register_agunan = '$agunanID' ;");
		$this->db2->query("DELETE 
							FROM jaminan_header 
							WHERE no_reff = '$nomorRefAgunan' 
							AND nomor = '$nomorAgunan' 
							AND STATUS = '$dataStatus';");
		$this->db2->query("DELETE 
							FROM jaminan_history 
							WHERE no_reff = '$nomorRefAgunan' 
							AND nomor = '$nomorAgunan' 
							AND STATUS = '$dataStatus';");
		$this->db2->query("DELETE 
							FROM jaminan_dokument 
							WHERE no_reff = '$nomorRefAgunan';");
		$this->db2->trans_complete();
		// if ($this->db2->trans_status() === FALSE)
		// {
		// 		// generate an error... or use the log_message() function to log your error
		// }
	}
	
	/// searhing ///
	public function querySearchA($search,$kode_kantor){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT 
					`jaminan_dokument`.`agunan_id`,
					LEFT(
					IF(
						`jenis` = 'SERTIFIKAT',
						CONCAT(
						IF(
							IFNULL(`no_shm`, '') <> '',
							'SHM',
							IF(
							IFNULL(`no_shgb`, '') <> '',
							'SHGB',
							'AJB'
							)
						),
						' NO. ',
						IF(
							IFNULL(`no_shm`, '') <> '',
							`no_shm`,
							IF(
							IFNULL(`no_shgb`, '') <> '',
							`no_shgb`,
							`no_ajb`
							)
						),
						' A/N : ',
						`nama_pemilik_sertifikat`,
						' ALAMAT : ',
						`alamat_sertifikat`
						),
						CONCAT(
						'BPKB NO. ',
						IFNULL(`nomor_bpkb`, ''),
						' A/N : ',
						`nama_bpkb`,
						' ALAMAT : ',
						`alamat_bpkb`,
						' NO RANGKA : ',
						`no_rangka`,
						' NO MESIN : ',
						`no_mesin`,
						' TAHUN ',
						`tahun`,
						' NO. POL : ',
						`no_polisi`
						)
					),
					450
					) AS deskripsi_ringkas_jaminan,
					`flg_cetak`.`nomor` AS nomor_cetak,
					jaminan_header.id,
					LEFT(jaminan_header.nomor, 10) AS nomor,
					LEFT(jaminan_header.no_reff, 10) AS no_reff,
					jaminan_header.tgl,
					IF(
					jaminan_header.`status` = 'PINJAM',
					CONCAT(
						jaminan_header.nama,
						' (Nasabah a.n:',
						`jaminan_history`.nama_nasabah,
						')'
					),
					jaminan_header.nama
					) AS nama,
					LEFT(jaminan_header.alamat, 200) AS alamat,
					jaminan_header.kelurahan,
					jaminan_header.kecamatan,
					jaminan_header.kota,
					jaminan_header.propinsi,
					jaminan_header.kode_pos,
					jaminan_header.jenis_jaminan,
					jaminan_header.roda_kendaraan,
					jaminan_header.status,
					jaminan_header.kontrak_status,
					jaminan_header.ket,
					jaminan_header.no_rekening,
					jaminan_header.tgl_realisasi,
					jaminan_header.kode_kantor,
					jaminan_header.tgl_rencana_kembali,
					jaminan_header.jenis_pengurusan,
					jaminan_header.verifikasi,
					`jaminan_history`.nama_nasabah,
					jaminan_dokument.kode_kantor_lokasi_jaminan,
					jaminan_dokument.`lokasi_penyimpanan` #, app_kode_kantor.nama_kantor 
				FROM
					jaminan_header 
					LEFT JOIN `flg_cetak` 
					ON `flg_cetak`.nomor = jaminan_header.nomor 
					AND `flg_cetak`.setting = IF(
						jaminan_header.status = 'MASUK',
						'ASSET_IN',
						IF(
						jaminan_header.status = 'KELUAR',
						'ASSET_OUT',
						'ASSET_TEMP_OUT'
						)
					) 
					LEFT JOIN 
					(SELECT DISTINCT 
						kode_kantor AS kd_kantor,
						nomor,
						no_reff,
						nama AS nama_nasabah 
					FROM
						`jaminan_history` 
					WHERE `status` = 'MASUK') `jaminan_history` 
					ON `jaminan_history`.kd_kantor = jaminan_header.kode_kantor 
					AND `jaminan_history`.no_reff = jaminan_header.no_reff 
					LEFT JOIN 
					(SELECT 
						no_reff,
						agunan_id,
						jenis,
						no_shm,
						no_shgb,
						no_ajb,
						nama_pemilik_sertifikat,
						alamat_sertifikat,
						nomor_bpkb,
						nama_bpkb,
						alamat_bpkb,
						no_rangka,
						no_mesin,
						tahun,
						no_polisi,
						kode_kantor_lokasi_jaminan,
						lokasi_penyimpanan 
					FROM
						jaminan_dokument) jaminan_dokument 
					ON jaminan_dokument.no_reff = jaminan_header.no_reff #WHERE jaminan_header.status='PINJAM'
					#LEFT JOIN app_kode_kantor ON app_kode_kantor.kode_kantor = jaminan_dokument.kode_kantor_lokasi_jaminan 
				WHERE jaminan_header.kode_kantor = '$kode_kantor' 
					AND (
					jaminan_header.nomor LIKE '%$search%' 
					OR jaminan_header.nama LIKE '%$search%' 
					OR jaminan_dokument.agunan_id LIKE '$search%'
					) 
				ORDER BY jaminan_header.nomor DESC 
				LIMIT 0, 25 ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function querySearchB($status,$kode_kantor,$jenis){
	    $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT 
					`jaminan_dokument`.`agunan_id`,
					LEFT(
					IF(
						`jenis` = 'SERTIFIKAT',
						CONCAT(
						IF(
							IFNULL(`no_shm`, '') <> '',
							'SHM',
							IF(
							IFNULL(`no_shgb`, '') <> '',
							'SHGB',
							'AJB'
							)
						),
						' NO. ',
						IF(
							IFNULL(`no_shm`, '') <> '',
							`no_shm`,
							IF(
							IFNULL(`no_shgb`, '') <> '',
							`no_shgb`,
							`no_ajb`
							)
						),
						' A/N : ',
						`nama_pemilik_sertifikat`,
						' ALAMAT : ',
						`alamat_sertifikat`
						),
						CONCAT(
						'BPKB NO. ',
						IFNULL(`nomor_bpkb`, ''),
						' A/N : ',
						`nama_bpkb`,
						' ALAMAT : ',
						`alamat_bpkb`,
						' NO RANGKA : ',
						`no_rangka`,
						' NO MESIN : ',
						`no_mesin`,
						' TAHUN ',
						`tahun`,
						' NO. POL : ',
						`no_polisi`
						)
					),
					450
					) AS deskripsi_ringkas_jaminan,
					`flg_cetak`.`nomor` AS nomor_cetak,
					jaminan_header.id,
					LEFT(jaminan_header.nomor, 10) AS nomor,
					LEFT(jaminan_header.no_reff, 10) AS no_reff,
					jaminan_header.tgl,
					IF(
					jaminan_header.`status` = 'PINJAM',
					CONCAT(
						jaminan_header.nama,
						' (Nasabah a.n:',
						`jaminan_history`.nama_nasabah,
						')'
					),
					jaminan_header.nama
					) AS nama,
					LEFT(jaminan_header.alamat, 200) AS alamat,
					jaminan_header.kelurahan,
					jaminan_header.kecamatan,
					jaminan_header.kota,
					jaminan_header.propinsi,
					jaminan_header.kode_pos,
					jaminan_header.jenis_jaminan,
					jaminan_header.roda_kendaraan,
					jaminan_header.status,
					jaminan_header.kontrak_status,
					jaminan_header.ket,
					jaminan_header.no_rekening,
					jaminan_header.tgl_realisasi,
					jaminan_header.kode_kantor,
					jaminan_header.tgl_rencana_kembali,
					jaminan_header.jenis_pengurusan,
					jaminan_header.verifikasi,
					`jaminan_history`.nama_nasabah,
					jaminan_dokument.kode_kantor_lokasi_jaminan,
					jaminan_dokument.`lokasi_penyimpanan` #, app_kode_kantor.nama_kantor 
				FROM
					jaminan_header 
					LEFT JOIN `flg_cetak` 
					ON `flg_cetak`.nomor = jaminan_header.nomor 
					AND `flg_cetak`.setting = IF(
						jaminan_header.status = 'MASUK',
						'ASSET_IN',
						IF(
						jaminan_header.status = 'KELUAR',
						'ASSET_OUT',
						'ASSET_TEMP_OUT'
						)
					) 
					LEFT JOIN 
					(SELECT DISTINCT 
						kode_kantor AS kd_kantor,
						nomor,
						no_reff,
						nama AS nama_nasabah 
					FROM
						`jaminan_history` 
					WHERE `status` = 'MASUK') `jaminan_history` 
					ON `jaminan_history`.kd_kantor = jaminan_header.kode_kantor 
					AND `jaminan_history`.no_reff = jaminan_header.no_reff 
					LEFT JOIN 
					(SELECT 
						no_reff,
						agunan_id,
						jenis,
						no_shm,
						no_shgb,
						no_ajb,
						nama_pemilik_sertifikat,
						alamat_sertifikat,
						nomor_bpkb,
						nama_bpkb,
						alamat_bpkb,
						no_rangka,
						no_mesin,
						tahun,
						no_polisi,
						kode_kantor_lokasi_jaminan,
						lokasi_penyimpanan 
					FROM
						jaminan_dokument) jaminan_dokument 
					ON jaminan_dokument.no_reff = jaminan_header.no_reff #WHERE jaminan_header.status='PINJAM'
					#LEFT JOIN app_kode_kantor ON app_kode_kantor.kode_kantor = jaminan_dokument.kode_kantor_lokasi_jaminan 
				WHERE jaminan_header.kode_kantor = '$kode_kantor' 
					AND jaminan_header.status = '$status' 
					AND jaminan_header.jenis_jaminan = '$jenis' 
				ORDER BY jaminan_header.nomor DESC 
				LIMIT 0, 25 
				";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}


	


}
