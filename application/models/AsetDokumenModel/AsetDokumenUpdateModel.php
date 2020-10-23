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
		$str = "SELECT kode_jenis_agunan, CONCAT(kode_jenis_agunan,' - ',deskripsi_jenis_agunan) AS jenis_agunan, persen_default
				FROM kre_kode_jenis_agunan;
               ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}	
	public function KreKodeIkatanHukumAgunan(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT kode_ikatan_hukum, CONCAT(kode_ikatan_hukum,' - ',deskripsi_ikatan_hukum) AS ikatan_agunan, persen_default
				FROM kre_kode_ikatan_hukum_agunan;
			";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function nextID(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT dpm_online.get_auto_next_id('dpm_online','jaminan_dokument') AS 'id';";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}	
	public function selectKodeKantor(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT AKK.kode_kantor, AKK.kode_cabang, AKK.nama_kantor, AKK.`flg_aktif` 
				FROM dpm_online.`app_kode_kantor` AKK;
               ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function getNmJenisAgunan(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT Desc1, CONCAT(Desc1,' - ',Desc2) AS nm_jenis_agunan
				FROM sid_ref_jenis_agunan
				ORDER BY Desc1;
				";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}	
	public function getRefJenisPengikatan(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT Desc1, CONCAT(Desc1,' - ',Desc2) AS nm_pengikatan
				FROM sid_ref_jenis_pengikatan
				ORDER BY Desc1;
				";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function getRefJenisPeringkat(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT Desc1, CONCAT(Desc1,'- ',Desc2) AS nm_peringkat
				FROM sid_ref_peringkat_sb
				ORDER BY Desc1;
				";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function getRefDati2(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT Desc1, CONCAT(Desc1,' - ',Desc2) AS nm_dati2
				FROM sid_ref_dati2
				ORDER BY Desc1;
				";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}

	public function getJaminanHeader($nomorAgunan , $nomorRefAgunan){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT  JH.id,
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
						DATE_FORMAT(SYSDATE(), '%Y-%m-%d') AS 'sysdate'
					FROM dpm_online.jaminan_header JH,
						dpm_online.`app_kode_kantor` KK
					WHERE nomor = '$nomorAgunan'
					AND no_reff = '$nomorRefAgunan'
					AND jh.`kode_kantor` = kk.`kode_kantor`;
				";
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
					dpm_online.jaminan_dokument JD 
					LEFT JOIN dpm_online.`app_kode_kantor` KK 
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
	public function getCoverNotes($agunanID, $nomorRefAgunan){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT * FROM dpm_online.`jaminan_cover_notes`
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
											$verifikasi){

		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("UPDATE dpm_online.jaminan_header 
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
						
	}
	public function updateJaminanDokumentSert($jenisJaminan,
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
												$mainAreaKerja,
												$sertTglRegister,
												$sertKantorLokasi,
												$mainNomorRekening,
												$sertAgunanID,
												$sertID,
												$sertLainnya,
												$verifikasi){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("UPDATE dpm_online.jaminan_dokument 
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
								persen_dijaminkan_detail   =  $sertPersenDijamin,
								nilai_taksasi_detail       =  $sertNilaiTaksasiAgunan,
								nilai_njop_detail          =  $sertNJOP,
								nilai_pasar_detail         =  $sertHargaPasar,
								nilai_apht_detail          =  $sertAPHT,
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
											$verifikasi){

										$this->db2 = $this->load->database('DB_DPM_ONLINE', true);

										$this->db2->query("UPDATE dpm_online.jaminan_header 
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
	public function updateJaminanDokumentBPKB($jenisJaminan, //mulai index 3
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
												$verifikasi,
												$mainAreaKerja,
												$bpkbTglRegister,
												$bpkbKantorLokasi,
												$mainNomorRekening,
												$bpkbID,
												$bpkbNoReff){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query(" UPDATE dpm_online.jaminan_dokument
						    SET	`jenis` 					= '$jenisJaminan', #MULAI
								`jenis_agunan_detail`       = '$bpkbKodeJenisAgunan',
								`nomor_bpkb`                = '$bpkbNoBPKB',
								`nama_bpkb`                 = '$bpkbNamaPemilik',
								`alamat_bpkb`               = '$bpkbAlamatPemlik',
								`kota_bpkb`                 = '$bpkbKotaPemilik',
								#HAPUS
								#`kelurahan_bpkb`,
								#`kecamatan_bpkb`,
								#`kode_pos_bpkb`,
								#`propinsi_bpkb`,
								#`kd_merk_old`,
								#END HAPUS
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
								#`inc_bpkb`,
								`verifikasi`                 = '$verifikasi',
								`kode_kantor`                = '$mainAreaKerja',
								`tgl_register`               = '$bpkbTglRegister',
								`kode_kantor_lokasi_jaminan` = '$bpkbKantorLokasi',
								`no_rekening_agunan`         = '$mainNomorRekening'
							WHERE id = '$bpkbID'
							AND no_reff = '$bpkbNoReff';
						");
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

										$this->db2->query("UPDATE dpm_online.jaminan_header 
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
		
												
		$this->db2->query(" UPDATE dpm_online.jaminan_dokument 
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
		
												
		$this->db2->query(" UPDATE dpm_online.jaminan_header 
						    SET tgl_rencana_kembali = '$tanggalRencanaKembaliDueDate' 
							WHERE id= '$mainIdDueDate';
						");
	}

	public function updateCoverNotes($CoverNotesID,$namafileUpload){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
												
		$this->db2->query(" UPDATE dpm_online.jaminan_header 
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

	public function insertCoverNotes($CoverNotesNoReff,$CoverNotesAgunanID,$namafileUpload){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
												
		$this->db2->query("INSERT INTO jaminan_cover_notes
							(no_reff, agunan_id, tanggal_upload, upload_cover_notes)
							VALUES(
								'$CoverNotesNoReff',
								'$CoverNotesAgunanID',
								NOW(),
								'$namafileUpload');
						 ");
	}


}
