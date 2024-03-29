<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AsetDokumenUpdateController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('AsetDokumenModel/AsetDokumenUpdateModel');
       
	}

	/// START DISPLAY CONTROL///
	public function displayDetails(){
		$nomorAgunan 	= $this->input->post('nomorAgunan');
		$nomorRefAgunan = $this->input->post('nomorRefAgunan');
		$agunanID		= $this->input->post('agunanID');

		$data['ListKodeKantor'] 			= $this->AsetDokumenUpdateModel->selectKodeKantor();
		$data['sysdate'] 					= $this->AsetDokumenUpdateModel->sysdate();

		$data['KreKodeJenisAgunan'] 		= $this->AsetDokumenUpdateModel->KreKodeJenisAgunan();
		$data['KreKodeIkatanHukumAgunan'] 	= $this->AsetDokumenUpdateModel->KreKodeIkatanHukumAgunan();
		//slik
		$data['getSlikKodeJenisAgunan'] 	= $this->AsetDokumenUpdateModel->getSlikKodeJenisAgunan();		
		$data['getSlikLembagaPemeringkat'] 	= $this->AsetDokumenUpdateModel->getSlikLembagaPemeringkat();
		$data['getSlikJenisPengikatan'] 	= $this->AsetDokumenUpdateModel->getSlikJenisPengikatan();
		$data['getSlikDati2'] 				= $this->AsetDokumenUpdateModel->getSlikDati2();

		$data['getJaminanHeader']			= $this->AsetDokumenUpdateModel->getJaminanHeader($nomorAgunan , $nomorRefAgunan);
		$data['getJaminanDokument']			= $this->AsetDokumenUpdateModel->getJaminanDokument($agunanID, $nomorRefAgunan);
		$data['getJaminanSLIK']			= $this->AsetDokumenUpdateModel->getJaminanSLIK($agunanID);

		$data['MerkKend'] = $this->AsetDokumenUpdateModel->getMerkKend();
		$data['JenisKend'] = $this->AsetDokumenUpdateModel->getJenisKend();
		$data['TypeKend'] = $this->AsetDokumenUpdateModel->getTypeKend();

		echo json_encode($data);
		
	}
	public function updateDataSertifikat(){
		

		$jenisJaminan = 'SERTIFIKAT';
		$rodaKendaraan = '0';
		$verifikasi = '0';

		$mainAreaKerja        = $this->input->post('mainAreaKerja');
		$mainTanggal          = $this->input->post('mainTanggal');
		$mainTransaksi        = $this->input->post('mainTransaksi');
		$mainNama             = $this->input->post('mainNama');
		$mainKeterangan       = $this->input->post('mainKeterangan');
		$mainAlamat           = $this->input->post('mainAlamat');
		$mainKota             = $this->input->post('mainKota');
		$mainJenisPengurusan  = $this->input->post('mainJenisPengurusan');
		$mainNomorRekening 	  = $this->input->post('mainNomorRekening');
		$mainTanggalRealisasi = $this->input->post('mainTanggalRealisasi');
		$mainId				  = $this->input->post('mainId');

		$cif = $this->AsetDokumenUpdateModel->getCIF($mainNomorRekening);
		foreach ($cif as $row) :
			$cif    = $row['nasabah_id'];
		endforeach;

		if($cif == null){
			$cif = ' ';
		}

		// form atas sertifikat	
		$sertTglRegister = $this->input->post('sertTglRegister'); 
		$sertTglPenilaian = $this->input->post('sertTglPenilaian'); 
		$sertKantorLokasi = $this->input->post('sertKantorLokasi'); 
		$sertKodeJenisAgunan = $this->input->post('sertKodeJenisAgunan');
		$sertKodeIkatanAgunan = $this->input->post('sertKodeIkatanAgunan');
		$sertNilaiTaksasiAgunan = $this->input->post('sertNilaiTaksasiAgunan');  
		$sertNJOP = $this->input->post('sertNJOP');    
		$sertHargaPasar = $this->input->post('sertHargaPasar'); 
		$sertAPHT = $this->input->post('sertAPHT'); 
		$sertPersenDijamin = $this->input->post('sertPersenDijamin');	

		// //form data sertifikat//        
		$sertAgunanID = $this->input->post('sertAgunanID');
		$sertID = $this->input->post('sertID');
		$sertNoSert = $this->input->post('sertNoSert');
		$sertKOHIR = $this->input->post('sertKOHIR');
		$sertJenisSertifikat = $this->input->post('sertJenisSertifikat');
		$sertNoPERSIL = $this->input->post('sertNoPERSIL');  
		$sertTanggalSertifikat = $this->input->post('sertTanggalSertifikat');
		$sertJTSHGB = $this->input->post('sertJTSHGB');
		$sertNoSuratUkur = $this->input->post('sertNoSuratUkur');
		$sertPLBangunan = $this->input->post('sertPLBangunan');
		$sertLuasTanah = $this->input->post('sertLuasTanah');
		$sertNamaPPAT = $this->input->post('sertNamaPPAT'); 
		$sertNamaPemilik = $this->input->post('sertNamaPemilik');
		$sertAlamatSertifikat = $this->input->post('sertAlamatSertifikat');
		$sertKelurahan = $this->input->post('sertKelurahan'); 
		$sertKecamatan = $this->input->post('sertKecamatan'); 
		$sertKota = $this->input->post('sertKota'); 
		$sertPorpinsi = $this->input->post('sertPorpinsi'); 
		$sertBatasTanah = $this->input->post('sertBatasTanah'); 

		// Form data Lampiran //
		$sertDokAJB = $this->input->post('sertDokAJB');
		$sertNomorAJB = $this->input->post('sertNomorAJB');
		$sertTanggalAJB = $this->input->post('sertTanggalAJB');
		$sertDokIMB = $this->input->post('sertDokIMB');
		$sertNomorIMB = $this->input->post('sertNomorIMB');
		$sertDokSPPT = $this->input->post('sertDokSPPT');
		$sertNomorSPPT = $this->input->post('sertNomorSPPT');
		$sertTahunSPPT = $this->input->post('sertTahunSPPT');
		$sertDokSKHMT = $this->input->post('sertDokSKHMT');
		$sertDokDenah = $this->input->post('sertDokDenah');
		$sertDokRoya = $this->input->post('sertDokRoya');
		$sertDokSHT = $this->input->post('sertDokSHT');
		$sertNoSHT = $this->input->post('sertNoSHT');
		$sertPropinsiSHT = $this->input->post('sertPropinsiSHT');
		$sertKotaSHT = $this->input->post('sertKotaSHT');
		$sertDokSTTS = $this->input->post('sertDokSTTS');
		$sertTahunSTTS = $this->input->post('sertTahunSTTS');
		$sertDokSSB = $this->input->post('sertDokSSB');
		$sertAtasNamaSSBBPHTB = $this->input->post('sertAtasNamaSSBBPHTB');
		$sertLainnya = $this->input->post('sertLainnya');

		//check box
		$check_ajb           = $this->input->post('check_ajb'); 
		$check_imb           = $this->input->post('check_imb');  
		$check_sppt          = $this->input->post('check_sppt');      
		$check_skmht         = $this->input->post('check_skmht');        
		$check_denah         = $this->input->post('check_denah');     
		$check_roya          = $this->input->post('check_roya');        
		$check_sht           = $this->input->post('check_sht');      
		$check_stts          = $this->input->post('check_stts');         
		$check_ssb_bpht		 = $this->input->post('check_ssb_bpht');


		if($check_ajb == 'Y'){
			$ajb = $check_ajb;
		}else{
			$ajb = 'N';
		}
		if($check_imb == 'Y'){
			$imb = $check_imb;
		}else{
			$imb = 'N';
		}
		if($check_sppt == 'Y'){
			$sppt = $check_sppt;
		}else{
			$sppt = 'N';
		}
		if($check_skmht == 'Y'){
			$skmht = $check_skmht;
		}else{
			$skmht = 'N';
		}
		if($check_denah == 'Y'){
			$denah = $check_denah;
		}else{
			$denah = 'N';
		}
		if($check_roya  == 'Y'){
			$roya = $check_roya;
		}else{
			$roya = 'N';
		}
		if($check_sht  == 'Y'){
			$sht = $check_sht;
		}else{
			$sht = 'N';
		}
		if($check_stts  == 'Y'){
			$stts = $check_stts;
		}else{
			$stts = 'N';
		}
		if($check_ssb_bpht  == 'Y'){
			$ssb_bpht = $check_ssb_bpht;
		}else{
			$ssb_bpht = 'N';
		}

		/// penentuan nomor setifikat berdasarkan jenis sertifikat
		if($sertJenisSertifikat == 'SHM'){
			$no_shm = $sertNoSert;
			$no_shgb = '';
			$no_ajb = '';
		} else if($sertJenisSertifikat == 'SHGB'){
			$no_shm = '';
			$no_shgb = $sertNoSert;
			$no_ajb = '';
		} else if($sertJenisSertifikat == 'AJB'){
			$no_shm = '';
			$no_shgb = '';
			$no_ajb = $sertNoSert;
		} else {
			$no_shm = '';
			$no_shgb = '';
			$no_ajb = '';
		}	

		$sertSlikPeringkatAgunan        = $this->input->post('sertSlikPeringkatAgunan');
		$sertSlikParipasuPersen         = $this->input->post('sertSlikParipasuPersen');
		$sertSlikTanggalPengikatan      = $this->input->post('sertSlikTanggalPengikatan');
		$sertSlikNamaPemilikAgunan      = $this->input->post('sertSlikNamaPemilikAgunan');
		$sertSlikBuktiKepemilikanAgunan = $this->input->post('sertSlikBuktiKepemilikanAgunan');
		$sertSlikAlamat                 = $this->input->post('sertSlikAlamat');
		$sertSlikNilaiNJOP              = $this->input->post('sertSlikNilaiNJOP');
		$sertSlikNilaiLJK               = $this->input->post('sertSlikNilaiLJK'); 
		$sertSlikTanggalLJK             = $this->input->post('sertSlikTanggalLJK'); 
		$sertSlikNilaiIndependen        = $this->input->post('sertSlikNilaiIndependen');
		$sertSlikNamaIndependen         = $this->input->post('sertSlikNamaIndependen'); 
		$sertSlikTglIndependen          = $this->input->post('sertSlikTglIndependen'); 
		$sertSlikKeterangan             = $this->input->post('sertSlikKeterangan'); 
		$sertSlikJenisAgunan            = $this->input->post('sertSlikJenisAgunan'); 
		$sertSlikLembagaPemeringkat     = $this->input->post('sertSlikLembagaPemeringkat'); 
		$sertSlikJenisPengikatan        = $this->input->post('sertSlikJenisPengikatan'); 
		$sertSlikKodeDati2              = $this->input->post('sertSlikKodeDati2'); 
		$sertSlikStatusAgunan           = $this->input->post('sertSlikStatusAgunan'); 
		$sertSlikParipasu               = $this->input->post('sertSlikParipasu'); 
		$sertSLikStatusJoinAccount      = $this->input->post('sertSLikStatusJoinAccount'); 
		$sertSlikAsuransi               = $this->input->post('sertSlikAsuransi'); 

		if($sertTglPenilaian != null || $sertTglPenilaian != ''){
			$tgl_penilaian = $sertTglPenilaian;
		}else if($sertSlikTglIndependen != null || $sertSlikTglIndependen != ''){
			$tgl_penilaian = $sertSlikTglIndependen;
		}else{
			$tgl_penilaian = '';
		}
		$this->AsetDokumenUpdateModel->updateJaminanHeaderSert($mainId,
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
																$tgl_penilaian,
																$sertSlikParipasu,
																$sertSlikParipasuPersen,
																$sertSLikStatusJoinAccount,
																$sertSlikAsuransi,
																$sertSlikKeterangan,
																$verifikasi);						

		$data['message']  = 'sukses';
		             

		echo json_encode($data);
	}

	public function updateBPKB(){
		$jenisJaminan = 'BPKB';
		$rodaKendaraan = '4';
		$verifikasi = '0';

		$mainAreaKerja        = $this->input->post('mainAreaKerja');
		$mainTanggal          = $this->input->post('mainTanggal');
		$mainTransaksi        = $this->input->post('mainTransaksi');
		$mainNama             = $this->input->post('mainNama');
		$mainKeterangan       = $this->input->post('mainKeterangan');
		$mainAlamat           = $this->input->post('mainAlamat');
		$mainKota             = $this->input->post('mainKota');
		$mainJenisPengurusan  = $this->input->post('mainJenisPengurusan');
		$mainNomorRekening 	  = $this->input->post('mainNomorRekening');
		$mainTanggalRealisasi = $this->input->post('mainTanggalRealisasi');
		$mainId				  = $this->input->post('mainId');
		
		$cif = $this->AsetDokumenUpdateModel->getCIF($mainNomorRekening);
		foreach ($cif as $row) :
			$cif    = $row['nasabah_id'];
		endforeach;

		if($cif == null){
			$cif = ' ';
		}

		$bpkbTglRegister 			= $this->input->post('bpkbTglRegister'); 
		$bpkbTglPenilaian 			= $this->input->post('bpkbTglPenilaian');
		$bpkbKantorLokasi 			= $this->input->post('bpkbKantorLokasi'); 
		$bpkbKodeJenisAgunan 		= $this->input->post('bpkbKodeJenisAgunan'); 
		$bpkbKodeIkatanAgunan 		= $this->input->post('bpkbKodeIkatanAgunan');
		$bpkbNilaiTaksasiAgunan 	= $this->input->post('bpkbNilaiTaksasiAgunan');
		$bpkbNJOP 					= $this->input->post('bpkbNJOP');  
		$bpkbHargaPasar 			= $this->input->post('bpkbHargaPasar');    
		$bpkbAPHT 					= $this->input->post('bpkbAPHT'); 
		$bpkbPersenDijamin 			= $this->input->post('bpkbPersenDijamin'); 	

		$bpkbAgunanID 				=	$this->input->post('bpkbAgunanID');
		$bpkbNoBPKB 				= 	$this->input->post('bpkbNoBPKB');
		$bpkbNamaPemilik 			= 	$this->input->post('bpkbNamaPemilik');
		$bpkbAlamatPemlik			=	$this->input->post('bpkbAlamatPemlik');
		$bpkbKotaPemilik			=	$this->input->post('bpkbKotaPemilik');
		$bpkbMerk					=	$this->input->post('bpkbMerk');
		$bpkbType					=	$this->input->post('bpkbType');
		$bpkbJenis					=	$this->input->post('bpkbJenis');
		$bpkbSilinder				=	$this->input->post('bpkbSilinder');
		$bpkbNoRangka				=	$this->input->post('bpkbNoRangka');
		$bpkbNoMesin				=	$this->input->post('bpkbNoMesin');	
		$bpkbTahun					=	$this->input->post('bpkbTahun');
		$bpkbWarna					= 	$this->input->post('bpkbWarna');
		$bpkbTglExpPajak			=	$this->input->post('bpkbTglExpPajak');
		$bpkbNoPolisi				=	$this->input->post('bpkbNoPolisi');
		$bpkbTglExpSTNK				=	$this->input->post('bpkbTglExpSTNK');
		$bpkbNoSTNK					=	$this->input->post('bpkbNoSTNK');
		$bpkbID						=	$this->input->post('bpkbID');
		$bpkbNoReff					=	$this->input->post('bpkbNoReff');						
		
		// form data lampiran
			//dokumen asli / copy
			$bpkbDokKwitansiBlanko		= $this->input->post('bpkbDokKwitansiBlanko');
			$bpkbDokFakturPemilik		= $this->input->post('bpkbDokFakturPemilik');
			$bpkbDokKwJualBeli			= $this->input->post('bpkbDokKwJualBeli');
			$bpkbDokSKTrayek			= $this->input->post('bpkbDokSKTrayek');
			//checkbox
			$check_kw_blanko			= $this->input->post('check_kw_blanko');
			$check_faktur_pemilik		= $this->input->post('check_faktur_pemilik');
			$check_kw_jual_beli			= $this->input->post('check_kw_jual_beli');
			$check_sk_trayek			= $this->input->post('check_sk_trayek');

			if($check_kw_blanko == 'Y'){
				$blanko = $check_kw_blanko;
			}else if($check_kw_blanko == 'N'){
				$blanko = 'N';
			}
			if($check_faktur_pemilik == 'Y'){
				$faktur_pemilik = $check_faktur_pemilik;
			}else if($check_faktur_pemilik == 'N'){
				$faktur_pemilik = 'N';
			}
			if($check_kw_jual_beli == 'Y'){
				$kwitansi_jb = $check_kw_jual_beli;
			}else if($check_kw_jual_beli == 'N'){
				$kwitansi_jb = 'N';
			}
			if($check_sk_trayek == 'Y'){
				$sk_trayek = $check_sk_trayek;
			}else if($check_sk_trayek == 'N'){
				$sk_trayek = 'N';
			}
			// form
			$bpkbNoFakturPemilik		= $this->input->post('bpkbNoFakturPemilik');
			$noSKTrayek					= $this->input->post('noSKTrayek');
			$bpkbBerlakuSD				= $this->input->post('bpkbBerlakuSD');
			$bpkbLainnya				= $this->input->post('bpkbLainnya');

			//bpkb slik
			$bpkbSlikPeringkatAgunan        = $this->input->post('bpkbSlikPeringkatAgunan');
			$bpkbSlikParipasuPersen         = $this->input->post('bpkbSlikParipasuPersen');
			$bpkbSlikTanggalPengikatan      = $this->input->post('bpkbSlikTanggalPengikatan');
			$bpkbSlikNamaPemilikAgunan      = $this->input->post('bpkbSlikNamaPemilikAgunan');
			$bpkbSlikBuktiKepemilikanAgunan = $this->input->post('bpkbSlikBuktiKepemilikanAgunan');
			$bpkbSlikAlamat                 = $this->input->post('bpkbSlikAlamat');
			$bpkbSlikNilaiNJOP              = $this->input->post('bpkbSlikNilaiNJOP');
			$bpkbSlikNilaiLJK               = $this->input->post('bpkbSlikNilaiLJK'); 
			$bpkbSlikTanggalLJK             = $this->input->post('bpkbSlikTanggalLJK'); 
			$bpkbSlikNilaiIndependen        = $this->input->post('bpkbSlikNilaiIndependen');
			$bpkbSlikNamaIndependen         = $this->input->post('bpkbSlikNamaIndependen'); 
			$bpkbSlikTglIndependen          = $this->input->post('bpkbSlikTglIndependen'); 
			$bpkbSlikKeterangan             = $this->input->post('bpkbSlikKeterangan'); 
			$bpkbSlikJenisAgunan            = $this->input->post('bpkbSlikJenisAgunan'); 
			$bpkbSlikLembagaPemeringkat     = $this->input->post('bpkbSlikLembagaPemeringkat'); 
			$bpkbSlikJenisPengikatan        = $this->input->post('bpkbSlikJenisPengikatan'); 
			$bpkbSlikKodeDati2              = $this->input->post('bpkbSlikKodeDati2'); 
			$bpkbSlikStatusAgunan           = $this->input->post('bpkbSlikStatusAgunan'); 
			$bpkbSlikParipasu               = $this->input->post('bpkbSlikParipasu'); 
			$bpkbSLikStatusJoinAccount      = $this->input->post('bpkbSLikStatusJoinAccount'); 
			$bpkbSlikAsuransi               = $this->input->post('bpkbSlikAsuransi'); 

			if($bpkbTglPenilaian != null || $bpkbTglPenilaian != ''){
				$tgl_penilaian = $bpkbTglPenilaian;
			}else if($bpkbSlikTglIndependen != null || $bpkbSlikTglIndependen != ''){
				$tgl_penilaian = $bpkbSlikTglIndependen;
			}else{
				$tgl_penilaian = '';
			}


			$this->AsetDokumenUpdateModel->updateJaminanHeaderBPKB($mainId,
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
																	$tgl_penilaian,
																	$bpkbSlikParipasu,
																	$bpkbSlikParipasuPersen,
																	$bpkbSLikStatusJoinAccount,
																	$bpkbSlikAsuransi,
																	$bpkbSlikKeterangan,
																	$verifikasi);

			$data['message'] =	'sukses'; 

			echo json_encode($data);

	}
	public function updateEmas(){
		$jenisJaminan = 'EMAS';
		$rodaKendaraan = '0';
		$verifikasi = '0';

		$mainAreaKerja        = $this->input->post('mainAreaKerja');
		$mainTanggal          = $this->input->post('mainTanggal');
		$mainTransaksi        = $this->input->post('mainTransaksi');
		$mainNama             = $this->input->post('mainNama');
		$mainKeterangan       = $this->input->post('mainKeterangan');
		$mainAlamat           = $this->input->post('mainAlamat');
		$mainKota             = $this->input->post('mainKota');
		$mainJenisPengurusan  = $this->input->post('mainJenisPengurusan');
		$mainNomorRekening 	  = $this->input->post('mainNomorRekening');
		$mainTanggalRealisasi = $this->input->post('mainTanggalRealisasi');
		$mainId				  = $this->input->post('mainId');

		//data emas
		$emasAgunanID 				= $this->input->post('emasAgunanID');
		$emasNoSeri 				= $this->input->post('emasNoSeri');
		$emasJenisEmas 				= $this->input->post('emasJenisEmas');
		$emasKarat 					= $this->input->post('emasKarat');
		$emasBerat 					= $this->input->post('emasBerat');
		$emasHargaPasar 			= $this->input->post('emasHargaPasar');
		$emasHargaTaksasi 			= $this->input->post('emasHargaTaksasi');	

		$emasID						=	$this->input->post('emasID');
		$emasNoReff					=	$this->input->post('emasNoReff');	
		$this->AsetDokumenUpdateModel->updateJaminanHeaderEMAS($mainId,
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
																$verifikasi);

		$this->AsetDokumenUpdateModel->updateJaminanDokumentEmas($jenisJaminan,
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
																	$emasNoReff);


		$data['mainAreaKerja'] =	$mainAreaKerja;
		$data['mainTanggal'] =	$mainTanggal;
		$data['mainTransaksi'] =	$mainTransaksi;
		$data['mainNama'] =	$mainNama;
		$data['mainKeterangan'] =	$mainKeterangan;
		$data['mainAlamat'] =	$mainAlamat;
		$data['mainKota'] =	$mainKota;
		$data['mainJenisPengurusan'] =	$mainJenisPengurusan;
		$data['mainNomorRekening'] = $mainNomorRekening;
		$data['mainTanggalRealisasi'] =	$mainTanggalRealisasi;
		$data['mainId'] = $mainId;

		$data['emasAgunanID'] = $emasAgunanID;
		$data['emasNoSeri'] = $emasNoSeri;
		$data['emasJenisEmas'] = $emasJenisEmas;
		$data['emasKarat'] = $emasKarat;
		$data['emasBerat'] = $emasBerat;
		$data['emasHargaPasar'] = $emasHargaPasar;
		$data['emasHargaTaksasi'] = $emasHargaTaksasi;	

		$data['emasID'] = $emasID;
		$data['emasNoReff'] = $emasNoReff;

		echo json_encode($data);
	}

	// due date function gabung controller ini

	public function getDueDate(){
		$nomorAgunan 	= $this->input->post('nomorAgunan');
		$nomorRefAgunan = $this->input->post('nomorRefAgunan');
		$agunanID		= $this->input->post('agunanID');

		$data['getJaminanHeader']			= $this->AsetDokumenUpdateModel->getJaminanHeader($nomorAgunan , $nomorRefAgunan);
		$data['getJaminanDokument']			= $this->AsetDokumenUpdateModel->getJaminanDokument($agunanID, $nomorRefAgunan);
		$data['getCoverNotes']			    = $this->AsetDokumenUpdateModel->getCoverNotes($agunanID, $nomorRefAgunan);
		echo json_encode($data);

	}
	public function updateDueDate(){
		$tanggalRencanaKembaliDueDate = $this->input->post('tanggalRencanaKembaliDueDate');
		$mainIdDueDate                = $this->input->post('mainIdDueDate');
		$mainNomorDueDate		      = $this->input->post('mainNomorDueDate');
		$mainNoReffDueDate		      = $this->input->post('mainNoReffDueDate');

		// $data['tanggalRencanaKembaliDueDate'] = $this->input->post('tanggalRencanaKembaliDueDate');
		// $data['mainIdDueDate']                = $this->input->post('mainIdDueDate');
		// $data['mainNomorDueDate']		      = $this->input->post('mainNomorDueDate');
		// $data['mainNoReffDueDate']		      = $this->input->post('mainNoReffDueDate');

		$data['updateDueDate']			= $this->AsetDokumenUpdateModel->updateDueDate($tanggalRencanaKembaliDueDate,$mainIdDueDate);

		echo json_encode($data);
	}

	///
	public function getNomorRekening(){
		//$data['getNomorRek']   = $this->AsetDokumenUpdateModel->getNomorRek();
		$getNomorRek           = $this->AsetDokumenUpdateModel->getNomorRek();
		foreach ($getNomorRek as $row) :
			$no_rek            = $row['no_rekening'];
			$no_alternatif     = $row['no_alternatif'];
			$nama_nasabah      = $row['nama_nasabah'];
			$alamat            = $row['alamat'];
			$jml_pinjaman      = $row['jml_pinjaman'];
			$tgl_realisasi     = $row['tgl_realisasi'];
			$tgl_jatuh_tempo   = $row['tgl_jatuh_tempo'];  
			$pokok_saldo_akhir = $row['pokok_saldo_akhir']; 
			$verifikasi        = $row['verifikasi'];  
			$kode_kantor       = $row['kode_kantor']; 
			
			$data1[]    = 	['<tr> <td>'. $row['no_rekening'] . '</td> <td>'
										. $row['no_alternatif']. '</td> <td>'
										. $row['nama_nasabah'].'</td> <td>'
										. $row['alamat'] . '</td> <td>'
										. $row['jml_pinjaman']. '</td> <td>'
										. $row['tgl_realisasi'].'</td> <td>'
										. $row['tgl_jatuh_tempo'].'</td> <td>'
										. $row['pokok_saldo_akhir'] . '</td> <td>'
										. $row['verifikasi']. '</td> <td>'
										. $row['kode_kantor'].'</td> <td>'
										. '<button type="button" class="btn btn-success btn-sm btnPilihRekening"
											data-norek="'.$no_rek.'" 
											data-nama="'.$nama_nasabah.'" 
										    style ="padding-left: 5px;"> Pilih </button> </td> </tr>'];
		endforeach;	
		
		echo json_encode($data1);
	}

	
	public function uploadCoverNotes(){
		$CoverNotesID		 = $this->input->post('CoverNotesID');
		$CoverNotesAgunanID  = $this->input->post('CoverNotesAgunanID');
		$CoverNotesNoReff    = $this->input->post('CoverNotesNoReff');
		$coverNotes    = $this->input->post('coverNotes');


		$sysdate      = $this->AsetDokumenUpdateModel->sysdate1();
		foreach ($sysdate as $row) :
			$tanggal    = $row['sysdate'];
		endforeach;
		
			
		if(isset($_FILES["coverNotes"]["name"])){
			$root_document   = $_SERVER["DOCUMENT_ROOT"].'/';
			$root_address    = 'http://'.$_SERVER["SERVER_ADDR"].'/';

			if (!file_exists("$root_document/public_centro")){
				mkdir("$root_document/public_centro");
			} 
				
			if (!file_exists("$root_document/public_centro/CoverNotes")) {
				mkdir("$root_document/public_centro/CoverNotes");
			}
			if (!file_exists("$root_document/public_centro/CoverNotes/$CoverNotesAgunanID")) {
				mkdir("$root_document/public_centro/CoverNotes/$CoverNotesAgunanID");
			}

			$config['upload_path']   = "$root_document/public_centro/CoverNotes/$CoverNotesAgunanID";
			$config['allowed_types'] = "*";
			$config['overwrite']	 = false;
			$config['file_name']     = $CoverNotesID."_".$tanggal;
			$this->load->library("upload", $config);

			if(!$this->upload->do_upload('coverNotes') ){
				echo $this->upload->display_errors();
			} else{
				$data = $this->upload->data();
				$namafileUpload = $data["file_name"];
				$pathFile = "public_centro/CoverNotes/$CoverNotesAgunanID/$namafileUpload";
				$this->AsetDokumenUpdateModel->insertCoverNotes($CoverNotesNoReff,$CoverNotesAgunanID,$root_document,$root_address,$pathFile);
				echo $root_address.$pathFile;		
			}
		}
	}

	
}

