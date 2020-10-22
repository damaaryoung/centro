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
		$data['getNmJenisAgunan'] 			= $this->AsetDokumenUpdateModel->getNmJenisAgunan();
		$data['getRefJenisPengikatan'] 		= $this->AsetDokumenUpdateModel->getRefJenisPengikatan();
		$data['getRefJenisPeringkat'] 		= $this->AsetDokumenUpdateModel->getRefJenisPeringkat();
		$data['getRefDati2'] 				= $this->AsetDokumenUpdateModel->getRefDati2();

		$data['getJaminanHeader']			= $this->AsetDokumenUpdateModel->getJaminanHeader($nomorAgunan , $nomorRefAgunan);
		$data['getJaminanDokument']			= $this->AsetDokumenUpdateModel->getJaminanDokument($agunanID, $nomorRefAgunan);

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
		}else if($check_ajb == 'N'){
			$ajb = 'N';
		}
		if($check_imb == 'Y'){
			$imb = $check_imb;
		}else if($check_imb == 'N'){
			$imb = 'N';
		}
		if($check_sppt == 'Y'){
			$sppt = $check_sppt;
		}else if($check_sppt == 'N'){
			$sppt = 'N';
		}
		if($check_skmht == 'Y'){
			$skmht = $check_skmht;
		}else if($check_skmht == 'N'){
			$skmht = 'N';
		}
		if($check_denah == 'Y'){
			$denah = $check_denah;
		}else if($check_denah == 'N'){
			$denah = 'N';
		}
		if($check_roya  == 'Y'){
			$roya = $check_roya;
		}else if($check_roya  == 'N'){
			$roya = 'N';
		}
		if($check_sht  == 'Y'){
			$sht = $check_sht;
		}else if($check_sht  == 'N'){
			$sht = 'N';
		}
		if($check_stts  == 'Y'){
			$stts = $check_stts;
		}else if($check_stts  == 'N'){
			$stts = 'N';
		}
		if($check_ssb_bpht  == 'Y'){
			$ssb_bpht = $check_ssb_bpht;
		}else if($check_ssb_bpht  == 'N'){
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
																$verifikasi);

		$this->AsetDokumenUpdateModel->updateJaminanDokumentSert($jenisJaminan,
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
																	$verifikasi);							

		
		$data['jenisJaminan']  = $jenisJaminan;
		$data['no_shm']  = $no_shm;
		$data['no_shgb']  = $no_shgb;
		$data['sertTanggalSertifikat']  = $sertTanggalSertifikat;
		$data['sertJTSHGB']  = $sertJTSHGB;
		$data['sertNoSuratUkur']  = $sertNoSuratUkur;
		$data['sertLuasTanah']  = $sertLuasTanah;
		$data['sertNamaPemilik']  = $sertNamaPemilik;
		$data['sertAlamatSertifikat']  = $sertAlamatSertifikat;
		$data['sertKelurahan']  = $sertKelurahan;
		$data['sertKecamatan']  = $sertKecamatan;
		$data['sertKota']  = $sertKota;
		$data['sertPorpinsi']  = $sertPorpinsi;
		$data['ajb']  = $ajb;
		$data['no_ajb']  = $no_ajb;
		$data['imb']  = $imb;
		$data['sertNomorIMB']  = $sertNomorIMB;
		$data['sppt']  = $sppt;
		$data['sertNomorSPPT']  = $sertNomorSPPT;
		$data['sertTahunSPPT']  = $sertTahunSPPT;
		$data['skmht']  = $skmht;
		$data['denah']  = $denah;
		$data['roya']  = $roya;
		$data['sht']  = $sht;
		$data['sertNoSHT']  = $sertNoSHT;
		$data['sertPropinsiSHT']  = $sertPropinsiSHT;
		$data['sertKotaSHT']  = $sertKotaSHT;
		$data['stts']  = $stts;
		$data['sertTahunSTTS']  = $sertTahunSTTS;
		$data['ssb_bpht']  = $ssb_bpht;
		$data['sertAtasNamaSSBBPHTB']  = $sertAtasNamaSSBBPHTB;
		$data['sertKodeJenisAgunan']  = $sertKodeJenisAgunan;
		$data['sertTanggalAJB']  = $sertTanggalAJB;
		$data['sertKOHIR']  = $sertKOHIR;
		$data['sertNoPERSIL']  = $sertNoPERSIL;
		$data['sertPLBangunan']  = $sertPLBangunan;
		$data['sertBatasTanah']  = $sertBatasTanah;
		$data['sertNamaPPAT']  = $sertNamaPPAT;
		$data['sertKodeIkatanAgunan']  = $sertKodeIkatanAgunan;
		$data['sertPersenDijamin']  = $sertPersenDijamin;
		$data['sertNilaiTaksasiAgunan']  = $sertNilaiTaksasiAgunan;
		$data['sertNJOP']  = $sertNJOP;
		$data['sertHargaPasar']  = $sertHargaPasar;
		$data['sertAPHT']  = $sertAPHT;
		$data['sertDokAJB']  = $sertDokAJB;
		$data['sertDokIMB']  = $sertDokIMB;
		$data['sertDokSPPT']  = $sertDokSPPT;
		$data['sertDokSKHMT']  = $sertDokSKHMT;
		$data['sertDokDenah']  = $sertDokDenah;
		$data['sertDokRoya']  = $sertDokRoya;
		$data['sertDokSHT']  = $sertDokSHT;
		$data['sertDokSTTS']  = $sertDokSTTS;
		$data['sertDokSSB']  = $sertDokSSB;
		$data['mainAreaKerja']  = $mainAreaKerja;
		$data['sertTglRegister']  = $sertTglRegister;
		$data['sertKantorLokasi']  = $sertKantorLokasi;
		$data['mainNomorRekening']  = $mainNomorRekening;
		$data['sertAgunanID']  = $sertAgunanID;
		$data['sertID']  = $sertID;
		$data['verifikasi']  = $verifikasi;
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
																	$verifikasi);
			$this->AsetDokumenUpdateModel->updateJaminanDokumentBPKB($jenisJaminan, //mulai index 3
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
																	$bpkbNoReff);

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
			$data['bpkbNoReff'] = $bpkbNoReff;
					
			

			$data['bpkbTglRegister']  = $bpkbTglRegister;
			$data['bpkbTglPenilaian']  = $bpkbTglPenilaian;
			$data['bpkbKantorLokasi']  = $bpkbKantorLokasi;
			$data['bpkbKodeJenisAgunan']  = $bpkbKodeJenisAgunan;
			$data['bpkbKodeIkatanAgunan']  = $bpkbKodeIkatanAgunan;
			$data['bpkbNilaiTaksasiAgunan']  = $bpkbNilaiTaksasiAgunan;
			$data['bpkbNJOP']  = $bpkbNJOP;
			$data['bpkbHargaPasar']  = $bpkbHargaPasar;
			$data['bpkbAPHT']  = $bpkbAPHT;
			$data['bpkbPersenDijamin']  = $bpkbPersenDijamin;

			$data['bpkbAgunanID']  =  $bpkbAgunanID; 				
			$data['bpkbNoBPKB']  =  $bpkbNoBPKB ;				
			$data['bpkbNamaPemilik']  =  $bpkbNamaPemilik 	;		
			$data['bpkbAlamatPemlik']  =  $bpkbAlamatPemlik	;		
			$data['bpkbKotaPemilik']  =  $bpkbKotaPemilik	;		
			$data['bpkbMerk']  =  $bpkbMerk	;			
			$data['bpkbType']  =  $bpkbType	;				
			$data['bpkbJenis']  =  $bpkbJenis	;			
			$data['bpkbSilinder']  =  $bpkbSilinder		;	
			$data['bpkbNoRangka']  =  $bpkbNoRangka	;			
			$data['bpkbNoMesin']  =  $bpkbNoMesin;					
			$data['bpkbTahun']  =  $bpkbTahun;					
			$data['bpkbWarna']  =  $bpkbWarna;					
			$data['bpkbTglExpPajak']  =  $bpkbTglExpPajak;		
			$data['bpkbNoPolisi']  =  $bpkbNoPolisi;				
			$data['bpkbTglExpSTNK']  =  $bpkbTglExpSTNK;				
			$data['bpkbNoSTNK']  =  $bpkbNoSTNK			;
			$data['bpkbID']  =  $bpkbID;
			

			$data['bpkbDokKwitansiBlanko']  = $bpkbDokKwitansiBlanko;
			$data['bpkbDokFakturPemilik']  =  $bpkbDokFakturPemilik;
			$data['bpkbDokKwJualBeli']  =  $bpkbDokKwJualBeli;
			$data['bpkbDokSKTrayek']  = $bpkbDokSKTrayek;

			$data['bpkbNoFakturPemilik']  = $bpkbNoFakturPemilik;
			$data['noSKTrayek']  = $noSKTrayek;
			$data['bpkbBerlakuSD']  = $bpkbBerlakuSD;
			$data['bpkbLainnya']  = $bpkbLainnya;
			
			$data['blanko'] = $blanko;
			$data['faktur_pemilik'] = $faktur_pemilik;
			$data['kwitansi_jb'] = $kwitansi_jb;
			$data['sk_trayek'] = $sk_trayek;

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
		$CoverNotesID = $this->input->post('CoverNotesID');
		$namaFile = "CoverNotes_".$CoverNotesID;
		if(isset($_FILES["coverNotes"]["name"])){


			$config['upload_path']   = './PUBLIC/CoverNotes/';
			$config['allowed_types'] = "*";
			$config['overwrite']	 = true;
			$config['file_name']     = $namaFile;
			$this->load->library("upload", $config);

			if(!$this->upload->do_upload('coverNotes') ){
				echo $this->upload->display_errors();
			} else{
				
				$data = $this->upload->data();
				$namafileUpload = $data["file_name"];
				$this->AsetDokumenUpdateModel->updateCoverNotes($CoverNotesID,$namafileUpload);
				echo base_url().'PUBLIC/CoverNotes/'.$data["file_name"];		
			}
		}
	}

	
}