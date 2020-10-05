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
				LIMIT 0, 25  ";
		$query = $this->db2->query($str);
		return $query->result_array();
	}

	//select nomor ref dan nomor
	public function updateNoRef($mainAreaKerja){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("UPDATE 
							dpm_online.counter 
							SET nomor = nomor + 1  
							WHERE setting= CONCAT('ASSET_IN','$mainAreaKerja')
							AND nomor <= nomor + 1
						  ");
		
	}
	public function generateAgunanID($mainAreaKerja){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT CONCAT('$mainAreaKerja','.',LPAD(SUBSTR(agunan_id, 4, 6) + 1, 6, '0')) AS hasil 
	  			FROM dpm_online.kre_agunan 
				WHERE agunan_id LIKE CONCAT('$mainAreaKerja', '.%') 
				ORDER BY hasil DESC 
				LIMIT 1";
				//  var_dump($str);
				//  die;
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}

	//insert sertifikat//
	public function insertJaminanHeaderSert(
										$mainTanggal,
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
										$verifikasi){

		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("INSERT INTO dpm_online.jaminan_header (
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
							dpm_online.get_auto_next_id ('dpm_online', 'jaminan_header'),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
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
	public function insertJaminanDokumentSert(
											$jenisJaminan,
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
											$mainAreaKerja,//kode_kantor,
											$sertTglRegister,//tgl_register,
											$sertKantorLokasi,//kode_kantor_lokasi_jaminan,
											$mainNomorRekening,//no_rekening_agunan,
											$sertLainnya,
											$verifikasi){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$this->db2->query("INSERT INTO dpm_online.jaminan_dokument (
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
							dpm_online.get_auto_next_id('dpm_online','jaminan_dokument'),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
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
							$sertPersenDijamin,
							$sertNilaiTaksasiAgunan,
							$sertNJOP,
							$sertHargaPasar,
							$sertAPHT,
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
	}
	public function insertJaminanSIDSert($agunan_id,
									  $sertSIDJenisAgunan,
									  $sertSIDPeringkatSurat,
									  $sertJenisPengikatan
									  ){

		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("INSERT INTO dpm_online.jaminan_sid (
								`id`,
								`no_reff`,
								`agunan_id`,
								`jenis_agunan`,
								`kode_peringkat`,
								`jenis_pengikatan`,
								`nama_pemilik`,
								`bukti_kepemilikan`,
								`alamat_pemilik`,
								`kode_lokasi`,
								`nilai_njop`,
								`nilai_agunan_bank`,
								`nilai_agunan_independen`,
								`nama_penilai`,
								`tgl_penilaian`,
								`persen_paripasu`,
								`asuransi`,
								`kode_kantor`) 
						VALUES(
							dpm_online.get_auto_next_id ('dpm_online', 'jaminan_header'),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
							'$sertTglRegister',
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
											$verifikasi
											){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("INSERT INTO dpm_online.jaminan_header (
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
							dpm_online.get_auto_next_id ('dpm_online', 'jaminan_header'),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
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
	public function insertJaminanDokumentBPKB(	$jenisJaminan, //mulai index 3
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
												$verifikasi,
												$mainAreaKerja,
												$bpkbTglRegister,
												$bpkbKantorLokasi,
												$mainNomorRekening){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("INSERT INTO dpm_online.jaminan_dokument (
							`id`,
							`no_reff`,
							`jenis`, #MULAI
							`jenis_agunan_detail`,
							`nomor_bpkb`,
							`nama_bpkb`,
							`alamat_bpkb`,
							`kota_bpkb`,
							#HAPUS
							#`kelurahan_bpkb`,
							#`kecamatan_bpkb`,
							#`kode_pos_bpkb`,
							#`propinsi_bpkb`,
							#`kd_merk_old`,
							#END HAPUS
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
							#hapus
							#`no_shm`,
							#`no_shgb`,
							#`tgl_sertifikat`,
							#`tgl_jt_shgb`,
							#`no_surat_ukur`,
							#`luas_tanah`,
							#`nama_pemilik_sertifikat`,
							#`alamat_sertifikat`,
							#`kelurahan_sertifikat`,
							#`kecamatan_sertifikat`,
							#`kota_sertifikat`,
							#`propinsi_sertifikat`,
							#`kode_pos_sertifikat`,
							#`ajb`,
							#`no_ajb`,
							#`tgl_ajb`,
							#`no_kohir`,
							#`no_persil`,
							#`pl_bangunan`,
							#`batas_tanah`,
							#`nama_ppat`,
							#end hapus
							`ikatan_agunan_detail`,
							`persen_dijaminkan_detail`,
							`nilai_taksasi_detail`,
							`nilai_njop_detail`,
							`nilai_pasar_detail`,
							`nilai_apht_detail`,
							#hapus
							#`asli_ajb`,
							#`asli_imb`,
							#`asli_sppt`,
							#`asli_skmht`,
							#`asli_gambar_denah`,
							#`asli_surat_roya`,
							#`asli_sht`,
							#`asli_stts`,
							#`asli_ssb`,
							#`imb`,
							#`no_imb`,
							#`sppt`,
							#`no_sppt`,
							#`sppt_tahun`,
							#`skmht`,
							#`gambar_denah`,
							#`surat_roya`,
							#`sht`,
							#`no_sht`,
							#`sht_propinsi`,
							#`sht_kota`,
							#`stts`,
							#`stts_tahun`,
							#`ssb`,
							#`ssb_atas_nama`,
							`lain_lain`,
							#`inc_bpkb`,
							#end hapus
							#`keterangan`,
							#`no_pinjam`,
							`agunan_id`,
							`verifikasi`,
							#hapus
							#`karat`,
							#`berat`,
							#`harga_pasar`,
							#`harga_taksasi`,
							#`no_seri`,
							#`jenis_emas`,
							#end hapus3
							`kode_kantor`,
							`tgl_register`,
							`kode_kantor_lokasi_jaminan`,
							`no_rekening_agunan`
						)
						VALUES(
							dpm_online.get_auto_next_id('dpm_online','jaminan_dokument'),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
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
							'$mainNomorRekening'
							);");
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
		
		$this->db2->query("INSERT INTO dpm_online.jaminan_header (
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
							dpm_online.get_auto_next_id ('dpm_online', 'jaminan_header'),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
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
		
												
		$this->db2->query("INSERT INTO dpm_online.jaminan_dokument (
							`id`,
							`no_reff`,
							`jenis`, #MULAI
							#hapus
							#`jenis_agunan_detail`,
							#`nomor_bpkb`,
							#`nama_bpkb`,
							#`alamat_bpkb`,
							#`kota_bpkb`,
							#`kelurahan_bpkb`,
							#`kecamatan_bpkb`,
							#`kode_pos_bpkb`,
							#`propinsi_bpkb`,
							#`kd_merk_old`,
							#`kd_merk`,
							#`kd_type`,
							#`kd_jenis`,
							#`no_rangka`,
							#`no_mesin`,
							#`warna`,
							#`tahun`,
							#`no_polisi`,
							#`no_stnk`,
							#`silinder`,
							#`asli_blanko`,
							#`asli_faktur_pemilik`,
							#`asli_kwitansi_jb`,
							#`asli_sk_trayek`,
							#`blanko`,
							#`faktur_pemilik`,
							#`kwitansi_jb`,
							#`sk_trayek`,
							#`no_faktur`,
							#`no_sk_trayek`,
							#`tgl_expired_sk_trayek`,
							#`tgl_expired_pajak`,
							#`tgl_expired_stnk`,
							#hapus
							#`no_shm`,
							#`no_shgb`,
							#`tgl_sertifikat`,
							#`tgl_jt_shgb`,
							#`no_surat_ukur`,
							#`luas_tanah`,
							#`nama_pemilik_sertifikat`,
							#`alamat_sertifikat`,
							#`kelurahan_sertifikat`,
							#`kecamatan_sertifikat`,
							#`kota_sertifikat`,
							#`propinsi_sertifikat`,
							#`kode_pos_sertifikat`,
							#`ajb`,
							#`no_ajb`,
							#`tgl_ajb`,
							#`no_kohir`,
							#`no_persil`,
							#`pl_bangunan`,
							#`batas_tanah`,
							#`nama_ppat`,
							#end hapus
							#		`ikatan_agunan_detail`,
							#		`persen_dijaminkan_detail`,
							#		`nilai_taksasi_detail`,
							#nggak tau ini NJOP bener apa nggak
							`nilai_njop_detail`, 
							#		`nilai_pasar_detail`,
							#		`nilai_apht_detail`,
							#hapus
							#`asli_ajb`,
							#`asli_imb`,
							#`asli_sppt`,
							#`asli_skmht`,
							#`asli_gambar_denah`,
							#`asli_surat_roya`,
							#`asli_sht`,
							#`asli_stts`,
							#`asli_ssb`,
							#`imb`,
							#`no_imb`,
							#`sppt`,
							#`no_sppt`,
							#`sppt_tahun`,
							#`skmht`,
							#`gambar_denah`,
							#`surat_roya`,
							#`sht`,
							#`no_sht`,
							#`sht_propinsi`,
							#`sht_kota`,
							#`stts`,
							#`stts_tahun`,
							#`ssb`,
							#`ssb_atas_nama`,
							#`lain_lain`,
							#`inc_bpkb`,
							#end hapus
							#`keterangan`,
							#`no_pinjam`,
							`agunan_id`,
							`verifikasi`,
							`karat`,
							`berat`,
							`harga_pasar`,
							`harga_taksasi`,
							`no_seri`,
							`jenis_emas`,
							#end hapus3
							`kode_kantor`,
							#`tgl_register`,
							#`kode_kantor_lokasi_jaminan`,
							`no_rekening_agunan`
						)
						VALUES(
							dpm_online.get_auto_next_id('dpm_online','jaminan_dokument'),
							concat('$mainAreaKerja','.',(SELECT SUBSTR(nomor, 3, 6) FROM dpm_online.counter WHERE setting=CONCAT('ASSET_IN','$mainAreaKerja'))),
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
		$this->db2->query("DELETE 
							FROM dpm_online.jaminan_header 
							WHERE no_reff = '$nomorRefAgunan' 
							AND nomor = '$nomorAgunan' 
							AND STATUS = '$dataStatus';");
		$this->db2->query("DELETE 
							FROM dpm_online.jaminan_history 
							WHERE no_reff = '$nomorRefAgunan' 
							AND nomor = '$nomorAgunan' 
							AND STATUS = '$dataStatus';");
		$this->db2->query("DELETE 
							FROM dpm_online.jaminan_dokument 
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
