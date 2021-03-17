<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class AsetDokumenUpdateModel extends CI_Model{

	public function __construct(){
		parent::__construct();
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
	public function sysdate(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT DATE_FORMAT(SYSDATE(), '%Y-%m-%d') AS 'sysdate';";
        $query = $this->db2->query($str);
        
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

	public function getJaminanHeader($nomorAgunan , $nomorRefAgunan){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT 
					JH.id,
					JH.nomor,
					JH.no_reff,
					JH.tgl,
					JH.nama,
					JH.alamat,
					JH.kelurahan,
					JH.kecamatan,
					JH.kota,
					JH.propinsi,
					JH.kode_pos,
					JH.jenis_jaminan,
					JH.roda_kendaraan,
					JH.status,
					JH.kontrak_status,
					JH.ket,
					JH.no_rekening,
					JH.tgl_realisasi,
					JH.kode_kantor,
					JH.tgl_rencana_kembali,
					JH.jenis_pengurusan,
					JH.verifikasi,
					kk.`kode_cabang`,
					kk.`nama_kantor`,
					DATE_FORMAT(SYSDATE(), '%Y-%m-%d') AS 'sysdate',
					VBK.`nama_nasabah`
				FROM
					jaminan_header JH
				LEFT JOIN `app_kode_kantor` KK
					ON jh.`kode_kantor` = kk.`kode_kantor`
				LEFT JOIN `vmicro_browse_kredit` VBK
					ON JH.`no_rekening` = VBK.`no_rekening`
					WHERE nomor = '$nomorAgunan'
					AND no_reff = '$nomorRefAgunan'";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}

	public function getJaminanDokument($agunanID, $nomorRefAgunan){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT JD.*,
					kk.`kode_cabang` AS app_kode_kantor,
					kk.`nama_kantor` AS app_nama_kantor,
					KKJA.kode_jenis_agunan AS KKJA_kode_jenis_agunan,
					CONCAT(KKJA.kode_jenis_agunan,' - ',KKJA.deskripsi_jenis_agunan) AS KKJA_jenis_agunan,
					KKIHA.kode_ikatan_hukum,
					CONCAT(KKIHA.kode_ikatan_hukum,' - ',KKIHA.deskripsi_ikatan_hukum) AS ikatan_agunan,
					KKIHA.`PERSEN_DEFAULT` AS ikatan_persen_default,
					JJK.`nm_jenis` AS nama_jenis,
					JMK.`nm_merk` AS nama_merk,
					jtk.`nm_type` AS nama_type
				FROM
					jaminan_dokument JD 
					LEFT JOIN `app_kode_kantor` KK 
					ON JD.kode_kantor_lokasi_jaminan = KK.kode_kantor 
					LEFT JOIN kre_kode_jenis_agunan KKJA 
					ON JD.`jenis_agunan_detail` = KKJA.`KODE_JENIS_AGUNAN` 
					LEFT JOIN kre_kode_ikatan_hukum_agunan KKIHA 
					ON jd.`ikatan_agunan_detail` = KKIHA.`KODE_IKATAN_HUKUM` 
					LEFT JOIN jaminan_jenis_kendaraan JJK
					ON JD.`kd_jenis` = JJK.`kd_jenis`
					LEFT JOIN jaminan_merk_kendaraan JMK
					ON JD.`kd_merk` = JMK.`kd_merk`
					LEFT JOIN jaminan_type_kendaraan JTK
					ON JD.`kd_type` = JTK.`kd_type`
				WHERE agunan_id = '$agunanID' 
					AND no_reff = '$nomorRefAgunan';";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}

	public function getJaminanSLIK($agunanID){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT 
					SA.`flag_detail`,
					SA.`kode_register_agunan`,
					SA.`no_rekening`,
					SA.`cif`,
					SA.`kode_jenis_segment_fasilitas`,
					SA.`kode_status_agunan`,
					SA.`kode_jenis_agunan`,
					SA.`peringkat_agunan`,
					SA.`kode_lembaga_pemeringkat`,
					SA.`kode_jenis_pengikatan`,
					SA.`tanggal_pengikatan`,
					SA.`nama_pemilik_agunan`,
					SA.`bukti_kepemilikan`,
					SA.`alamat_agunan`,
					SA.`kode_kab_kota`,
					SA.`nilai_agunan`,
					SA.`nilai_agunan_menurut_ljk`,
					SA.`tanggal_penilaian_ljk`,
					SA.`nilai_agunan_penilai_independen`,
					SA.`nama_penilai_independen`,
					SA.`tanggal_penilaian_independen`,
					SA.`status_paripasu`,
					SA.`prosentase_paripasu`,
					SA.`status_kredit_join`,
					SA.`diasuransikan`,
					SA.`keterangan`,
					SA.`kode_kantor_cabang`,
					SA.`operasi_data`,
					CONCAT(SRJ.`kode`,' - ',SRJ.`nama`) AS SlikJenisAgunan,
					CONCAT(RLP.`kode`,' - ',RLP.`nama`) AS SlikLembagaPemeringkat,
					CONCAT(SRJP.`kode`,' - ',SRJP.`nama`) AS SlikJenisPengikatan,
					CONCAT(SRD.`kode`,' - ',SRD.`nama`) AS SlikKodeDati2
				FROM
					slik_agunan SA
				LEFT JOIN slik_ref_jenis_agunan SRJ
					ON SRJ.KODE = SA.kode_jenis_agunan
				LEFT JOIN slik_ref_lembaga_pemeringkat RLP
					ON RLP.`kode` = SA.`kode_lembaga_pemeringkat`
				LEFT JOIN slik_ref_jenis_pengikatan SRJP
					ON SRJP.`kode` = SA.`kode_jenis_pengikatan`
				LEFT JOIN slik_ref_dati SRD
					ON SRD.`kode` = SA.`kode_kab_kota`
				WHERE kode_register_agunan = '$agunanID';";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}

	public function getCoverNotes($agunanID, $nomorRefAgunan){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		$str = "SELECT * FROM `jaminan_upload_cover_notes_pinjam`
				WHERE agunan_id = '$agunanID'
				AND no_reff = '$nomorRefAgunan'
				ORDER BY id DESC;";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	
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
				WHERE flg_aktif=1 #and kd_merk='0000000126'
				ORDER BY kd_type";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}

	//update sertifikat
	public function getCIF($mainNomorRekening){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
			$str = " SELECT nasabah_id 
						FROM `vmicro_browse_kredit` WHERE no_rekening = '$mainNomorRekening'
						ORDER BY tgl_realisasi DESC 
						LIMIT 1";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function updateJaminanHeaderSert($mainId,
											$mainTanggal,
											$mainNama,
											$mainAlamat,
											$mainKota,
											$jenisJaminan,
											$rodaKendaraan,
											$mainTransaksi, 
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
											$sertKodeJenisAgunan,
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
											$sertDokAJB,
											$sertDokIMB,
											$sertDokSPPT,
											$sertDokSKHMT,
											$sertDokDenah,
											$sertDokRoya,
											$sertDokSHT,
											$sertDokSTTS,
											$sertDokSSB,
											$sertTglRegister,
											$sertKantorLokasi,
											$sertAgunanID,
											$sertID,
											$sertLainnya,
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
		$this->db2->query("UPDATE jaminan_header 
							SET tgl              = '$mainTanggal',
								nama             = '$mainNama',
								alamat           = '$mainAlamat',
								kota             = '$mainKota',
								jenis_jaminan    = '$jenisJaminan',
								roda_kendaraan   = '$rodaKendaraan',
								STATUS           = '$mainTransaksi',
								ket              = '$mainKeterangan',
								kode_kantor      = '$mainAreaKerja',
								no_rekening      = '$mainNomorRekening',
								tgl_realisasi    = '$mainTanggalRealisasi',
								jenis_pengurusan = '$mainJenisPengurusan',
								verifikasi       = '$verifikasi'
							WHERE id = '$mainId';");
		
		$this->db2->query("UPDATE jaminan_dokument 
							SET jenis					   = '$jenisJaminan',
								no_shm                     = '$no_shm',
								no_shgb 				   = '$no_shgb',
								tgl_sertifikat             = '$sertTanggalSertifikat',
								tgl_jt_shgb                = '$sertJTSHGB',
								no_surat_ukur              = '$sertNoSuratUkur',
								luas_tanah                 = '$sertLuasTanah',
								nama_pemilik_sertifikat    = '$sertNamaPemilik',
								alamat_sertifikat          = '$sertAlamatSertifikat',
								kelurahan_sertifikat       = '$sertKelurahan',
								kecamatan_sertifikat       = '$sertKecamatan',
								kota_sertifikat            = '$sertKota',
								propinsi_sertifikat        = '$sertPorpinsi',
								ajb                        = '$ajb',
								no_ajb                     = '$no_ajb',
								imb						   = '$imb',
								no_imb					   = '$sertNomorIMB',		
								sppt                       = '$sppt',
								no_sppt                    = '$sertNomorSPPT',
								sppt_tahun                 = '$sertTahunSPPT',
								skmht					   = '$skmht',
								gambar_denah               = '$denah',
								surat_roya                 = '$roya',
								sht                        = '$sht',
								no_sht                     = '$sertNoSHT',
								sht_propinsi               = '$sertPropinsiSHT',
								sht_kota                   = '$sertKotaSHT',
								stts                       = '$stts',
								stts_tahun                 = '$sertTahunSTTS',
								ssb                        = '$ssb_bpht',
								ssb_atas_nama              = '$sertAtasNamaSSBBPHTB',
								jenis_agunan_detail        = '$sertKodeJenisAgunan',
								tgl_ajb                    = '$sertTanggalAJB',
								no_kohir                   = '$sertKOHIR',
								no_persil                  = '$sertNoPERSIL',
								pl_bangunan                = '$sertPLBangunan',
								batas_tanah                = '$sertBatasTanah',
								nama_ppat                  = '$sertNamaPPAT',
								ikatan_agunan_detail       = '$sertKodeIkatanAgunan',
								persen_dijaminkan_detail   = '$sertPersenDijamin',
								nilai_taksasi_detail       = '$sertNilaiTaksasiAgunan',
								nilai_njop_detail          = '$sertNJOP',
								nilai_pasar_detail         = '$sertHargaPasar',
								nilai_apht_detail          = '$sertAPHT',
								`asli_ajb`                 = '$sertDokAJB',
								`asli_imb`                 = '$sertDokIMB',
								`asli_sppt`                = '$sertDokSPPT',
								`asli_skmht`               = '$sertDokSKHMT',
								`asli_gambar_denah`        = '$sertDokDenah',
								`asli_surat_roya`          = '$sertDokRoya',
								`asli_sht`                 = '$sertDokSHT',
								`asli_stts`                = '$sertDokSTTS',
								`asli_ssb`                 = '$sertDokSSB',
								kode_kantor                = '$mainAreaKerja',
								tgl_register               = '$sertTglRegister',
								kode_kantor_lokasi_jaminan = '$sertKantorLokasi',
								no_rekening_agunan         = '$mainNomorRekening',
								lain_lain                  = '$sertLainnya',
								verifikasi                 = '$verifikasi'		
								WHERE id = '$sertID'
								AND agunan_id = '$sertAgunanID';");

		$this->db2->query("UPDATE  `slik_agunan` 
							SET	`flag_detail`				      = 'D',
								`no_rekening`      				  = '$mainNomorRekening',
								`cif`			   				  = '$cif',
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
																		LIMIT 1),
								`operasi_data`					  = 'U'
							WHERE kode_register_agunan = '$sertAgunanID' ;");										
		$this->db2->trans_complete();
						
	}

	public function updateJaminanSlik($sertAgunanID, 
										$mainNomorRekening,
										$cif,
										$sertKantorLokasi,
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
										$sertSlikKeterangan	
										){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("UPDATE  `slik_agunan` 
								SET	`flag_detail`				      = 'D',
									`no_rekening`      				  = '$mainNomorRekening',
									`cif`			   				  = '$cif',
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
																			LIMIT 1),
									`operasi_data`					  = 'U'
							WHERE kode_register_agunan = '$sertAgunanID' ;");
	}


	//update bpkb
	public function updateJaminanHeaderBPKB($mainId,
												$mainTanggal,
												$mainNama,
												$mainAlamat,
												$mainKota,
												$jenisJaminan,
												$rodaKendaraan,
												$mainTransaksi, 
												$mainKeterangan, 
												$mainJenisPengurusan,
												$mainAreaKerja,
												$mainNomorRekening,
												$mainTanggalRealisasi,
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
												$bpkbAgunanID,
												$bpkbTglRegister,
												$bpkbKantorLokasi,
												$bpkbID,
												$bpkbNoReff,
												$cif,
												$bpkbSlikStatusAgunan,
												$bpkbSlikJenisAgunan,
												$bpkbSlikPeringkatAgunan,
												$bpkbSlikLembagaPemeringkat,
												$bpkbSlikJenisPengikatan,
												$bpkbSlikTanggalPengikatan,
												$bpkbSlikNamaPemilikAgunan,
												$bpkbSlikBuktiKepemilikanAgunan,
												$bpkbSlikAlamat,
												$bpkbSlikKodeDati2,
												$bpkbSlikNilaiNJOP,
												$bpkbSlikNilaiLJK,
												$bpkbSlikTanggalLJK,
												$bpkbSlikNilaiIndependen,
												$bpkbSlikNamaIndependen,
												$bpkbSlikTglIndependen,
												$bpkbSlikParipasu,
												$bpkbSlikParipasuPersen,
												$bpkbSLikStatusJoinAccount,
												$bpkbSlikAsuransi,
												$bpkbSlikKeterangan,
												$verifikasi){

			$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
			$this->db2->trans_start();
			$this->db2->query("UPDATE jaminan_header 
										SET tgl          = '$mainTanggal',
										nama             = '$mainNama',
										alamat           = '$mainAlamat',
										kota             = '$mainKota',
										jenis_jaminan    = '$jenisJaminan',
										roda_kendaraan   = '$rodaKendaraan',
										STATUS           = '$mainTransaksi',
										ket              = '$mainKeterangan',
										kode_kantor      = '$mainAreaKerja',
										no_rekening      = '$mainNomorRekening',
										tgl_realisasi    = '$mainTanggalRealisasi',
										jenis_pengurusan = '$mainJenisPengurusan',
										verifikasi       = '$verifikasi'
										WHERE id = '$mainId';");
			
			$this->db2->query(" UPDATE jaminan_dokument
						    SET	`jenis` 					 = '$jenisJaminan', 
								`jenis_agunan_detail`        = '$bpkbKodeJenisAgunan',
								`nomor_bpkb`                 = '$bpkbNoBPKB',
								`nama_bpkb`                  = '$bpkbNamaPemilik',
								`alamat_bpkb`                = '$bpkbAlamatPemlik',
								`kota_bpkb`                  = '$bpkbKotaPemilik',
								`kd_merk`                    = '$bpkbMerk',
								`kd_type`                    = '$bpkbType',
								`kd_jenis`                   = '$bpkbJenis',
								`no_rangka`                  = '$bpkbNoRangka',
								`no_mesin`                   = '$bpkbNoMesin',
								`warna`                      = '$bpkbWarna',
								`tahun`                      = '$bpkbTahun',
								`no_polisi`                  = '$bpkbNoPolisi',
								`no_stnk`                    = '$bpkbNoSTNK',
								`silinder`                   = '$bpkbSilinder',
								`asli_blanko`                = '$bpkbDokKwitansiBlanko',
								`asli_faktur_pemilik`        = '$bpkbDokFakturPemilik',
								`asli_kwitansi_jb`           = '$bpkbDokKwJualBeli',
								`asli_sk_trayek`             = '$bpkbDokSKTrayek',
								`blanko`					 = '$blanko',
								`faktur_pemilik`             = '$faktur_pemilik',
								`kwitansi_jb`                = '$kwitansi_jb',
								`sk_trayek`					 = '$sk_trayek',
								`no_faktur`                  = '$bpkbNoFakturPemilik',
								`no_sk_trayek`               = '$noSKTrayek',
								`tgl_expired_sk_trayek`      = '$bpkbBerlakuSD',
								`tgl_expired_pajak`          = '$bpkbTglExpPajak',
								`tgl_expired_stnk`           = '$bpkbTglExpSTNK',
								`ikatan_agunan_detail`       = '$bpkbKodeIkatanAgunan',
								`persen_dijaminkan_detail`   = '$bpkbPersenDijamin',
								`nilai_taksasi_detail`       = '$bpkbNilaiTaksasiAgunan',
								`nilai_njop_detail`          = '$bpkbNJOP',
								`nilai_pasar_detail`         = '$bpkbHargaPasar',
								`nilai_apht_detail`          = '$bpkbAPHT',
								`lain_lain`                  = '$bpkbLainnya',
								`verifikasi`                 = '$verifikasi',
								`kode_kantor`                = '$mainAreaKerja',
								`tgl_register`               = '$bpkbTglRegister',
								`kode_kantor_lokasi_jaminan` = '$bpkbKantorLokasi',
								`no_rekening_agunan`         = '$mainNomorRekening'
							WHERE id = '$bpkbID'
							AND no_reff = '$bpkbNoReff';
						");

			$this->db2->query("UPDATE  `slik_agunan` 
								SET	`flag_detail`				      = 'D',
									`no_rekening`      				  = '$mainNomorRekening',
									`cif`			   				  = '$cif',
									`kode_jenis_segment_fasilitas` 	  = 'F01',
									`kode_status_agunan`   			  = '$bpkbSlikStatusAgunan,',
									`kode_jenis_agunan` 			  = '$bpkbSlikJenisAgunan,',
									`peringkat_agunan` 				  = '$bpkbSlikPeringkatAgunan,',
									`kode_lembaga_pemeringkat` 		  = '$bpkbSlikLembagaPemeringkat,',
									`kode_jenis_pengikatan` 		  = '$bpkbSlikJenisPengikatan',
									`tanggal_pengikatan` 			  = '$bpkbSlikTanggalPengikatan',
									`nama_pemilik_agunan` 			  = '$bpkbSlikNamaPemilikAgunan',
									`bukti_kepemilikan` 			  = '$bpkbSlikBuktiKepemilikanAgunan',
									`alamat_agunan` 			      = '$bpkbSlikAlamat',
									`kode_kab_kota` 			      = '$bpkbSlikKodeDati2',
									`nilai_agunan` 					  = '$bpkbSlikNilaiNJOP',
									`nilai_agunan_menurut_ljk` 		  = '$bpkbSlikNilaiLJK',
									`tanggal_penilaian_ljk` 		  = '$bpkbSlikTanggalLJK',
									`nilai_agunan_penilai_independen` = '$bpkbSlikNilaiIndependen',
									`nama_penilai_independen`         = '$bpkbSlikNamaIndependen',
									`tanggal_penilaian_independen`    = '$bpkbSlikTglIndependen',
									`status_paripasu` 				  = '$bpkbSlikParipasu',
									`prosentase_paripasu` 			  = '$bpkbSlikParipasuPersen',
									`status_kredit_join` 			  = '$bpkbSLikStatusJoinAccount',
									`diasuransikan` 				  = '$bpkbSlikAsuransi',
									`keterangan` 					  = '$bpkbSlikKeterangan',
									`kode_kantor_cabang` 			  = (SELECT sandi_cabang AS kode
																			FROM app_kode_kantor akk
																			WHERE akk.`kode_kantor` = '$bpkbKantorLokasi'
																			LIMIT 1),
									`operasi_data`					  = 'U'
								WHERE kode_register_agunan = '$bpkbAgunanID' ;");
			$this->db2->trans_complete();

	}


	//update emas
	public function updateJaminanHeaderEMAS($mainId,
											$mainTanggal,
											$mainNama,
											$mainAlamat,
											$mainKota,
											$jenisJaminan,
											$rodaKendaraan,
											$mainTransaksi, 
											$mainKeterangan, 
											$mainJenisPengurusan,
											$mainAreaKerja,
											$mainNomorRekening,
											$mainTanggalRealisasi,
											$verifikasi){

										$this->db2 = $this->load->database('DB_DPM_ONLINE', true);

										$this->db2->query("UPDATE jaminan_header 
										SET tgl          = '$mainTanggal',
										nama             = '$mainNama',
										alamat           = '$mainAlamat',
										kota             = '$mainKota',
										jenis_jaminan    = '$jenisJaminan',
										roda_kendaraan   = '$rodaKendaraan',
										STATUS           = '$mainTransaksi',
										ket              = '$mainKeterangan',
										kode_kantor      = '$mainAreaKerja',
										no_rekening      = '$mainNomorRekening',
										tgl_realisasi    = '$mainTanggalRealisasi',
										jenis_pengurusan = '$mainJenisPengurusan',
										verifikasi       = '$verifikasi'
										WHERE id = '$mainId';");

	}
	public function updateJaminanDokumentEmas($jenisJaminan,
												$verifikasi,
												$emasKarat,
												$emasBerat,
												$emasHargaPasar,
												$emasHargaTaksasi,
												$emasNoSeri,
												$emasJenisEmas,
												$mainAreaKerja,
												$mainNomorRekening,
												$emasID,
												$emasNoReff
											){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
												
		$this->db2->query(" UPDATE jaminan_dokument 
						    SET `jenis`				   = '$jenisJaminan', #MULAI
								`verifikasi`           = '$verifikasi',
								`karat`                = '$emasKarat',
								`berat`                = '$emasBerat',
								`harga_pasar`          = '$emasHargaPasar',
								`harga_taksasi`        = '$emasHargaTaksasi',
								`no_seri`              = '$emasNoSeri',
								`jenis_emas`           = '$emasJenisEmas',
								`kode_kantor`          = '$mainAreaKerja',
								`no_rekening_agunan`   = '$mainNomorRekening'

							WHERE id = '$emasID'
							AND no_reff = '$emasNoReff';
						");

	}

	// update due date
	public function updateDueDate($tanggalRencanaKembaliDueDate,$mainIdDueDate){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
												
		$this->db2->query(" UPDATE jaminan_header 
						    SET tgl_rencana_kembali = '$tanggalRencanaKembaliDueDate' 
							WHERE id= '$mainIdDueDate';
						");
	}

	public function updateCoverNotes($CoverNotesID,$namafileUpload){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
												
		$this->db2->query(" UPDATE jaminan_header 
						    SET upload_cover_notes = '$namafileUpload' 
							WHERE id= '$CoverNotesID';
						");
	}
	public function sysdate1(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT DATE_FORMAT(SYSDATE(), '%Y_%m_%d') AS 'sysdate';";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}

	public function insertCoverNotes($CoverNotesNoReff,$CoverNotesAgunanID,$root_document,$root_address,$pathFile){
		$this->db2 = $this->load->database('DB_CENTRO', true);
		
												
		$this->db2->query("INSERT INTO jaminan_upload_cover_notes_pinjam
							(no_reff, agunan_id, tanggal_upload, root_document, root_address, path_file)
							VALUES(
								'$CoverNotesNoReff',
								'$CoverNotesAgunanID',
								 NOW(),
								'$root_document',
								'$root_address',
								'$pathFile');
						 ");
	}


}


