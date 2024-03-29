<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AsetDokumenEntryController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('AsetDokumenModel/AsetDokumenEntryModel');
       
	}

	/// START DISPLAY CONTROL///
	public function index(){
		$this->session->unset_userdata('menuAset');
		$session = $this->session->userdata('nama');
		$kode_kantor = $this->session->userdata('kd_cabang');
		$divisi_id   = $this->session->userdata('divisi_id');
		$data['kode_kantor'] = $this->session->userdata('kd_cabang');
		$data['divisi_id']  = $this->session->userdata('divisi_id');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		//modal update
		$data['updateModalMain'] = $this->load->view('ViewAsetDokumen/UpdateData/UpdateModal.php', NULL, TRUE);
		$data['updateModalSertifikat'] = $this->load->view('ViewAsetDokumen/UpdateData/UpdateDataSertifikat.php', NULL, TRUE);
		$data['updateModalBPKB'] = $this->load->view('ViewAsetDokumen/UpdateData/UpdateDataBPKB.php', NULL, TRUE);
		$data['updateModalEmas'] = $this->load->view('ViewAsetDokumen/UpdateData/UpdateDataEmas.php', NULL, TRUE);
		//modal peminjaman
		$data['PeminjamanMainModal'] = $this->load->view('ViewAsetDokumen/PeminjamanDokumen/PeminjamanMainModal.php', NULL, TRUE);
		$data['PeminjamanSertifikatModal'] = $this->load->view('ViewAsetDokumen/PeminjamanDokumen/PeminjamanSertifikatModal.php', NULL, TRUE);
		$data['PeminjamanBPKBModal'] = $this->load->view('ViewAsetDokumen/PeminjamanDokumen/PeminjamanBPKBModal.php', NULL, TRUE);
		$data['PeminjamanEmasModal'] = $this->load->view('ViewAsetDokumen/PeminjamanDokumen/PeminjamanEmasModal.php', NULL, TRUE);
		//modal pengembalian
		$data['MainModalKembali'] = $this->load->view('ViewAsetDokumen/PengembalianDokumen/MainModalKembali.php', NULL, TRUE);
		$data['KembaliSertifikatModal'] = $this->load->view('ViewAsetDokumen/PengembalianDokumen/KembaliSertifikatModal.php', NULL, TRUE);
		$data['KembaliBPKBModal'] = $this->load->view('ViewAsetDokumen/PengembalianDokumen/KembaliBPKBModal.php', NULL, TRUE);
		$data['KembaliEmasModal'] = $this->load->view('ViewAsetDokumen/PengembalianDokumen/KembaliEmasModal.php', NULL, TRUE);
		// modal due date
		$data['DueDateMainModal'] = $this->load->view('ViewAsetDokumen/DueDate/DueDateMainModal.php', NULL, TRUE);
		// modal penyerahan
		$data['PenyerahanMainModal'] = $this->load->view('ViewAsetDokumen/PenyerahanDokumen/PenyerahanMainModal.php', NULL, TRUE);
		$data['PenyerahanSertifikatModal'] = $this->load->view('ViewAsetDokumen/PenyerahanDokumen/PenyerahanSertifikatModal.php', NULL, TRUE);
		$data['PenyerahanBPKBModal'] = $this->load->view('ViewAsetDokumen/PenyerahanDokumen/PenyerahanBPKBModal.php', NULL, TRUE);
		$data['PenyerahanEmasModal'] = $this->load->view('ViewAsetDokumen/PenyerahanDokumen/PenyerahanEmasModal.php', NULL, TRUE);

		$data1['menuAset']    = '1';
		$this->session->set_userdata($data1);

		if($session != ''){
			
			
			$this->load->view('ViewAsetDokumen/EntryAsetDokumen.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function getListAsetDokumen(){
		$kode_kantor = $this->session->userdata('kd_cabang');
		$ListAsset = $this->AsetDokumenEntryModel->listAsetDokumen($kode_kantor);
		
	
		if( $this->session->userdata('menuAset') == '1'){
			foreach ($ListAsset as $row) :
				$data[]    = 	['<tr> <td>'. $row['nomor'] . '</td> <td>'
											. $row['agunan_id']. '</td> <td>'
											. $row['tgl']. '</td> <td>'
											. $row['nama'].'</td> <td>'
											. $row['alamat'] . '</td> <td>'
											. $row['jenis_jaminan']. '</td> <td>'
											. $row['status'].'</td> <td>'
											. $row['deskripsi_ringkas_jaminan'].'</td> <td>'
											. $row['lokasi_penyimpanan'].'</td> <td style="width:250px;">'
											. ' <button type="button" class="btn btn-primary btn-sm btnUpdate" style ="padding-left: 5px;"
														data-nomor="'. $row['nomor'] .'"
														data-noref="'. $row['no_reff'] .'" 
														data-status="'. $row['status'] .'"
														data-agunan="'. $row['agunan_id'] .'"
														data-toggle="tooltip" 
														data-placement="bottom" 
														title="Edit"
														name="btnUpdate"> 
														<i style="padding-left: 5px;" class="fas fa-edit"></i>
												</button>
												<button type="button" class="btn btn-danger btn-sm btnDelete" style ="padding-left: 5px;"
														data-nomor="'. $row['nomor'] .'"
														data-noref="'. $row['no_reff'] .'" 
														data-status="'. $row['status'] .'"
														data-agunan="'. $row['agunan_id'] .'"
														data-norekening="'. $row['no_rekening'] .'"
														data-verifikasi="'. $row['verifikasi'] .'"
														data-toggle="tooltip" 
														data-placement="bottom" 
														title="Delete"
														name="btnDelete"> 
														<i style ="padding-left: 5px;" class="fa fa-trash"></i>
												</button>
												<button type="button" class="btn btn-warning btn-sm btnPinjam" style ="padding-left: 5px;"
														data-nomor="'. $row['nomor'] .'"
														data-noref="'. $row['no_reff'] .'" 
														data-status="'. $row['status'] .'"
														data-agunan="'. $row['agunan_id'] .'"
														data-toggle="tooltip" 
														data-placement="bottom" 
														title="Peminjaman"
														name="btnPinjam"> 
														<i style ="padding-left: 5px;" class="far fa-hand-point-up"></i>
												</button>
												<button type="button" class="btn btn-success btn-sm btnKembaliDokumen" style ="padding-left: 5px;"
														data-nomor="'. $row['nomor'] .'"
														data-noref="'. $row['no_reff'] .'" 
														data-status="'. $row['status'] .'"
														data-agunan="'. $row['agunan_id'] .'"
														data-toggle="tooltip" 
														data-placement="bottom" 
														title="Pengembalian"
														name="btnKembali"> 
														<i style ="padding-left: 5px;" class="far fa-hand-point-down"></i>
												</button>
												<button type="button" class="btn btn-primary btn-sm btnDueDate" style ="padding-left: 5px;"
														data-nomor="'. $row['nomor'] .'"
														data-noref="'. $row['no_reff'] .'" 
														data-status="'. $row['status'] .'"
														data-agunan="'. $row['agunan_id'] .'"
														data-toggle="tooltip" 
														data-placement="bottom" 
														title="Due Date"
														name="btnKembali"> 
														<i style ="padding-left: 5px;" class="fas fa-stopwatch"></i>
												</button>

												<button type="button" class="btn btn-success btn-sm btnPenyerahan" style ="padding-left: 5px;"
													data-nomor="'. $row['nomor'] .'"
													data-noref="'. $row['no_reff'] .'" 
													data-status="'. $row['status'] .'"
													data-agunan="'. $row['agunan_id'] .'"
													data-rekening="'. $row['no_rekening'] .'"
													data-toggle="tooltip" 
													data-placement="bottom" 
													title="Penyerahan"
													name="btnKembali"> 
													<i style ="padding-left: 5px;"  class="fas fa-file-import"></i>
												</button>

												<form method="post" target="_blank" style ="display:inline;" action="'.base_url("AsetDokumenCetakController/cetakTransaksiAsetDokumen").'"> 
													<button type="submit" class="btn btn-info btn-sm btnCetaks" 
															data-nomor="'. $row['nomor'] .'"
															data-noref="'. $row['no_reff'] .'" 
															data-status="'. $row['status'] .'"
															data-agunan="'. $row['agunan_id'] .'"
															data-toggle="tooltip" 
															data-placement="bottom" 
															title="Cetak"
															name="btnKembali"> 
															<i class="fa fa-print"></i>
													</button>

													<input type="hidden" name="nomor" value="'. $row['nomor'] .'">
													<input type="hidden" name="no_reff" value="'. $row['no_reff'] .'">
													<input type="hidden" name="status" value="'.  $row['status'] .'">
													<input type="hidden" name="agunan_id" value="'. $row['agunan_id'] .'">
												</form>
																						
												</td> </tr>'];
												
										
			endforeach;	
		}else{
			foreach ($ListAsset as $row) :
				$data[]    = 	['<tr> <td>'. $row['nomor'] . '</td> <td>'
											. $row['agunan_id']. '</td> <td>'
											. $row['tgl']. '</td> <td>'
											. $row['nama'].'</td> <td>'
											. $row['alamat'] . '</td> <td>'
											. $row['jenis_jaminan']. '</td> <td>'
											. $row['status'].'</td> <td>'
											. $row['deskripsi_ringkas_jaminan'].'</td> <td>'
											. $row['lokasi_penyimpanan'].'</td> <td style="width:250px;">'
											. ' <button type="button" class="btn btn-primary btn-sm btnUpdate" style ="padding-left: 5px;"
														data-nomor="'. $row['nomor'] .'"
														data-noref="'. $row['no_reff'] .'" 
														data-status="'. $row['status'] .'"
														data-agunan="'. $row['agunan_id'] .'"
														data-toggle="tooltip" 
														data-placement="bottom" 
														title="Edit"
														name="btnUpdate"> 
														<i style="padding-left: 5px;" class="fas fa-edit"></i>
												</button>																						
												</td> </tr>'];
												
										
			endforeach;
		}
		echo json_encode($data);
	}
	public function get_kode_kantor(){

		$kode_kantor = $this->AsetDokumenEntryModel->selectKodeKantor();

		$data['kode_kantor'] = $kode_kantor;
		echo json_encode($data);
	}

	public function displayTambahAsetDokumen(){
		$session = $this->session->userdata('nama');
		$data['kode_kantor'] = $this->session->userdata('kd_cabang');
		$data['divisi_id']  = $this->session->userdata('divisi_id');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		$data['modalRekening'] = $this->load->view('ViewAsetDokumen/modalNomorRekening.php', NULL, TRUE);
		
		
				/// START FORM TAMBAH SERTIFIKAT ///
				// DATA FORM ATAS   
				$data['sertTglRegister'] = $this->session->tempdata('sertTglRegister'); 
				$data['sertTglPenilaian'] = $this->session->tempdata('sertTglPenilaian'); 
				$data['sertKantorLokasi'] = $this->session->tempdata('sertKantorLokasi'); 
				$data['sertKodeJenisAgunan'] = $this->session->tempdata('sertKodeJenisAgunan');
				$data['sertKodeIkatanAgunan'] = $this->session->tempdata('sertKodeIkatanAgunan'); 
				$data['sertNilaiTaksasiAgunan'] = $this->session->tempdata('sertNilaiTaksasiAgunan');  
				$data['sertNJOP'] = $this->session->tempdata('sertNJOP');    
				$data['sertHargaPasar'] = $this->session->tempdata('sertHargaPasar');
				$data['sertAPHT'] = $this->session->tempdata('sertAPHT'); 
				$data['sertPersenDijamin'] =$this->session->tempdata('sertPersenDijamin');
				// DATA SERTIFIKAT
				$data['sertAgunanID'] = $this->session->tempdata('sertAgunanID');
				$data['sertID'] = $this->session->tempdata('sertID');
				$data['sertNoSert'] = $this->session->tempdata('sertNoSert');
				$data['sertKOHIR'] = $this->session->tempdata('sertKOHIR');
				$data['sertJenisSertifikat'] = $this->session->tempdata('sertJenisSertifikat');
				$data['sertNoPERSIL'] = $this->session->tempdata('sertNoPERSIL');
				$data['sertTanggalSertifikat'] = $this->session->tempdata('sertTanggalSertifikat');
				$data['sertJTSHGB'] = $this->session->tempdata('sertJTSHGB');
				$data['sertNoSuratUkur'] = $this->session->tempdata('sertNoSuratUkur');
				$data['sertPLBangunan'] = $this->session->tempdata('sertPLBangunan');
				$data['sertLuasTanah'] = $this->session->tempdata('sertLuasTanah');
				$data['sertNamaPPAT'] = $this->session->tempdata('sertNamaPPAT');
				$data['sertNamaPemilik'] = $this->session->tempdata('sertNamaPemilik');
				$data['sertAlamatSertifikat'] = $this->session->tempdata('sertAlamatSertifikat');
				$data['sertKelurahan'] = $this->session->tempdata('sertKelurahan');
				$data['sertKecamatan'] = $this->session->tempdata('sertKecamatan');
				$data['sertKota'] = $this->session->tempdata('sertKota');
				$data['sertPorpinsi'] = $this->session->tempdata('sertPorpinsi');
				$data['sertBatasTanah'] = $this->session->tempdata('sertBatasTanah');
				// DATA LAMPIRAN
				$data['sertDokAJB'] = $this->session->tempdata('sertDokAJB');
				$data['sertNomorAJB'] = $this->session->tempdata('sertNomorAJB');
				$data['sertTanggalAJB'] = $this->session->tempdata('sertTanggalAJB');
				$data['sertDokIMB'] = $this->session->tempdata('sertDokIMB');
				$data['sertNomorIMB'] = $this->session->tempdata('sertNomorIMB');
				$data['sertDokSPPT'] = $this->session->tempdata('sertDokSPPT');
				$data['sertNomorSPPT'] = $this->session->tempdata('sertNomorSPPT');
				$data['sertTahunSPPT'] = $this->session->tempdata('sertTahunSPPT');
				$data['sertDokSKHMT'] = $this->session->tempdata('sertDokSKHMT');
				$data['sertDokDenah'] = $this->session->tempdata('sertDokDenah');
				$data['sertDokRoya'] = $this->session->tempdata('sertDokRoya');
				$data['sertDokSHT'] = $this->session->tempdata('sertDokSHT');
				$data['sertNoSHT'] = $this->session->tempdata('sertNoSHT');
				$data['sertPropinsiSHT'] = $this->session->tempdata('sertPropinsiSHT');
				$data['sertKotaSHT'] = $this->session->tempdata('sertKotaSHT');
				$data['sertDokSTTS'] = $this->session->tempdata('sertDokSTTS');
				$data['sertTahunSTTS'] = $this->session->tempdata('sertTahunSTTS');
				$data['sertDokSSB'] = $this->session->tempdata('sertDokSSB');
				$data['sertAtasNamaSSBBPHTB'] = $this->session->tempdata('sertAtasNamaSSBBPHTB');
				$data['sertLainnya'] = $this->session->tempdata('sertLainnya');

				///check
				$data['ajb']		    =	$this->session->tempdata('ajb');
				$data['imb']		    =	$this->session->tempdata('imb');
				$data['sppt']			=	$this->session->tempdata('sppt');
				$data['skmht']			=	$this->session->tempdata('skmht');
				$data['denah']			=	$this->session->tempdata('denah');
				$data['roya']			=	$this->session->tempdata('roya');
				$data['sht']			=   $this->session->tempdata('sht');
				$data['stts']			=	$this->session->tempdata('stts');
				$data['ssb_bpht']		=	$this->session->tempdata('ssb_bpht');
				///end check box///


				///// START FORM BPKB /////
				//form atas session// 
				$data['bpkbTglRegister'] 				= $this->session->tempdata('bpkbTglRegister');
				$data['bpkbTglPenilaian'] 				= $this->session->tempdata('bpkbTglPenilaian');
				$data['bpkbKantorLokasi'] 				= $this->session->tempdata('bpkbKantorLokasi');
				$data['bpkbKodeJenisAgunan'] 			= $this->session->tempdata('bpkbKodeJenisAgunan');
				$data['bpkbKodeIkatanAgunan']  			= $this->session->tempdata('bpkbKodeIkatanAgunan');
				$data['bpkbNilaiTaksasiAgunan'] 		= $this->session->tempdata('bpkbNilaiTaksasiAgunan');
				$data['bpkbNJOP']						= $this->session->tempdata('bpkbNJOP');
				$data['bpkbHargaPasar'] 				= $this->session->tempdata('bpkbHargaPasar');
				$data['bpkbAPHT'] 						= $this->session->tempdata('bpkbAPHT');
				$data['bpkbPersenDijamin'] 				= $this->session->tempdata('bpkbPersenDijamin');
			
				//form data bpkb session// 
				$data['bpkbAgunanID'] 					= $this->session->tempdata('bpkbAgunanID');
				$data['bpkbNoBPKB'] 					= $this->session->tempdata('bpkbNoBPKB');
				$data['bpkbNamaPemilik'] 				= $this->session->tempdata('bpkbNamaPemilik');
				$data['bpkbAlamatPemlik'] 				= $this->session->tempdata('bpkbAlamatPemlik');
				$data['bpkbKotaPemilik']				= $this->session->tempdata('bpkbKotaPemilik');
				$data['bpkbMerk'] 						= $this->session->tempdata('bpkbMerk');
				$data['bpkbType'] 						= $this->session->tempdata('bpkbType');
				$data['bpkbJenis'] 						= $this->session->tempdata('bpkbJenis');
				$data['bpkbSilinder'] 					= $this->session->tempdata('bpkbSilinder');
				$data['bpkbNoRangka'] 					= $this->session->tempdata('bpkbNoRangka');
				$data['bpkbNoMesin'] 					= $this->session->tempdata('bpkbNoMesin');
				$data['bpkbTahun'] 						= $this->session->tempdata('bpkbTahun');
				$data['bpkbTglExpPajak'] 				= $this->session->tempdata('bpkbTglExpPajak');
				$data['bpkbNoPolisi'] 					= $this->session->tempdata('bpkbNoPolisi');
				$data['bpkbTglExpSTNK'] 				= $this->session->tempdata('bpkbTglExpSTNK');
				$data['bpkbNoSTNK'] 					= $this->session->tempdata('bpkbNoSTNK');
				

				// form data lampiran
				$data['bpkbDokKwitansiBlanko'] 			= $this->session->tempdata('bpkbDokKwitansiBlanko');
				$data['bpkbDokFakturPemilik'] 			= $this->session->tempdata('bpkbDokFakturPemilik');
				$data['bpkbDokKwJualBeli'] 				= $this->session->tempdata('bpkbDokKwJualBeli');
				$data['bpkbDokSKTrayek'] 				= $this->session->tempdata('bpkbDokSKTrayek');
				$data['blanko'] 						= $this->session->tempdata('blanko');
				$data['faktur_pemilik'] 				= $this->session->tempdata('faktur_pemilik');
				$data['kwitansi_jb']					= $this->session->tempdata('kwitansi_jb');
				$data['sk_trayek'] 						= $this->session->tempdata('sk_trayek');
				$data['bpkbNoFakturPemilik'] 			= $this->session->tempdata('bpkbNoFakturPemilik');
				$data['noSKTrayek'] 					= $this->session->tempdata('noSKTrayek');
				$data['bpkbBerlakuSD'] 					= $this->session->tempdata('bpkbBerlakuSD');
				$data['bpkbLainnya'] 					= $this->session->tempdata('bpkbLainnya');
			
				/// form emas ///
				$data['emasAgunanID']				= $this->session->tempdata('emasAgunanID');
				$data['emasNoSeri'] 				= $this->session->tempdata('emasNoSeri');
				$data['emasJenisEmas'] 				= $this->session->tempdata('emasJenisEmas');
				$data['emasKarat'] 					= $this->session->tempdata('emasKarat');
				$data['emasBerat'] 					= $this->session->tempdata('emasBerat');
				$data['emasHargaPasar'] 			= $this->session->tempdata('emasHargaPasar');
				$data['emasHargaTaksasi ']			= $this->session->tempdata('emasHargaTaksasi');
				
			

		if($session != ''){
			$data['ListKodeKantor'] = $this->AsetDokumenEntryModel->selectKodeKantor();
			$data['sysdate'] = $this->AsetDokumenEntryModel->sysdate();
			
			$this->load->view('ViewAsetDokumen/TambahAsetDokumen.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}

	}
	public function displayTambahDataSertifikat(){
		$session = $this->session->userdata('nama');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE); 
		$data['kode_kantor'] = $this->session->userdata('kd_cabang');
		$data['divisi_id']  = $this->session->userdata('divisi_id');

		

		if($session != ''){
			$data['sysdate'] = $this->AsetDokumenEntryModel->sysdate();
			$data['ListKodeKantor'] = $this->AsetDokumenEntryModel->selectKodeKantor();
			$data['KreKodeJenisAgunan'] = $this->AsetDokumenEntryModel->KreKodeJenisAgunan();
			$data['KreKodeIkatanHukumAgunan'] = $this->AsetDokumenEntryModel->KreKodeIkatanHukumAgunan();
			$data['SlikKodeJenisAgunan'] = $this->AsetDokumenEntryModel->getSlikKodeJenisAgunan();
			$data['SlikLembagaPemeringkat'] = $this->AsetDokumenEntryModel->getSlikLembagaPemeringkat();
			$data['SlikJenisPengikatan'] = $this->AsetDokumenEntryModel->getSlikJenisPengikatan();
			$data['SlikDati2'] = $this->AsetDokumenEntryModel->getSlikDati2();
			//next id
			//akses menu
			$nextID = $this->AsetDokumenEntryModel->nextID();
			foreach ($nextID as $row) :
                $data['nextID']    = $row['id'];
			endforeach;

			$this->load->view('ViewAsetDokumen/TambahData/DataSertifikat.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}

	}
	public function displayTambahDataBPKB(){
		$session = $this->session->userdata('nama');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		$data['kode_kantor'] = $this->session->userdata('kd_cabang');
		$data['divisi_id']  = $this->session->userdata('divisi_id');

		if($session != ''){
			$data['sysdate'] = $this->AsetDokumenEntryModel->sysdate();
			$data['ListKodeKantor'] = $this->AsetDokumenEntryModel->selectKodeKantor();
			$data['KreKodeJenisAgunan'] = $this->AsetDokumenEntryModel->KreKodeJenisAgunan();
			$data['KreKodeIkatanHukumAgunan'] = $this->AsetDokumenEntryModel->KreKodeIkatanHukumAgunan();
			$data['MerkKend'] = $this->AsetDokumenEntryModel->getMerkKend();
			$data['JenisKend'] = $this->AsetDokumenEntryModel->getJenisKend();
			$data['TypeKend'] = $this->AsetDokumenEntryModel->getTypeKend();

			$data['SlikKodeJenisAgunan'] = $this->AsetDokumenEntryModel->getSlikKodeJenisAgunan();
			$data['SlikLembagaPemeringkat'] = $this->AsetDokumenEntryModel->getSlikLembagaPemeringkat();
			$data['SlikJenisPengikatan'] = $this->AsetDokumenEntryModel->getSlikJenisPengikatan();
			$data['SlikDati2'] = $this->AsetDokumenEntryModel->getSlikDati2();
			$this->load->view('ViewAsetDokumen/TambahData/DataBPKB.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
	public function displayTambahDataEmas(){
		$session = $this->session->userdata('nama');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){
			$this->load->view('ViewAsetDokumen/TambahData/DataEmas.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
	/// END DISPLAY CONTROL///

	/// START HANDLE USER INPUT FORM CONTROL///

	//handle input header
	public function handleInputHeader(){

		$mainAreaKerja = $this->input->post('mainAreaKerja'); 
		$mainTanggal = $this->input->post('mainTanggal'); 
		$mainTransaksi = $this->input->post('mainTransaksi'); 
		$mainNama = $this->input->post('mainNama');
		$mainKeterangan = $this->input->post('mainKeterangan');
		$mainAlamat = $this->input->post('mainAlamat');		
		$mainKota = $this->input->post('mainKota');  
		$mainJenisPengurusan = $this->input->post('mainJenisPengurusan');    
		$mainNomorRekening = $this->input->post('mainNomorRekening'); 
		$mainNamaNasabah = $this->input->post('mainNamaNasabah'); 
		$mainTanggalRealisasi = $this->input->post('mainTanggalRealisasi');

		$this->session->set_tempdata('mainAreaKerja', $mainAreaKerja, 900);
		$this->session->set_tempdata('mainTanggal', $mainTanggal, 900);
		$this->session->set_tempdata('mainTransaksi', $mainTransaksi, 900);
		$this->session->set_tempdata('mainNama', $mainNama, 900);
		$this->session->set_tempdata('mainKeterangan', $mainKeterangan, 900);
		$this->session->set_tempdata('mainAlamat', $mainAlamat, 900);
		$this->session->set_tempdata('mainKota', $mainKota, 900);
		$this->session->set_tempdata('mainJenisPengurusan', $mainJenisPengurusan, 900);
		$this->session->set_tempdata('mainNomorRekening', $mainNomorRekening, 900);
		$this->session->set_tempdata('mainNamaNasabah', $mainNamaNasabah, 900);
		$this->session->set_tempdata('mainTanggalRealisasi', $mainTanggalRealisasi, 900);
		$data1['sukses'] = 'sukses';
		echo json_encode($data1);

	}
	
	// HANDLE SERTIFIKAT //
	public function handleUserInputSertifikat(){
		$session = $this->session->userdata('nama');

		if($session != ''){
			//form atas//   
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

			$this->session->set_tempdata('sertTglRegister', $sertTglRegister, 900);
			$this->session->set_tempdata('sertTglPenilaian', $sertTglPenilaian, 900);
			$this->session->set_tempdata('sertKantorLokasi', $sertKantorLokasi, 900);
			$this->session->set_tempdata('sertKodeJenisAgunan', $sertKodeJenisAgunan, 900);
			$this->session->set_tempdata('sertKodeIkatanAgunan', $sertKodeIkatanAgunan, 900);
			$this->session->set_tempdata('sertNilaiTaksasiAgunan', $sertNilaiTaksasiAgunan, 900);
			$this->session->set_tempdata('sertNJOP', $sertNJOP, 900);
			$this->session->set_tempdata('sertHargaPasar', $sertHargaPasar, 900);
			$this->session->set_tempdata('sertAPHT', $sertAPHT, 900);
			$this->session->set_tempdata('sertPersenDijamin', $sertPersenDijamin, 900);

			//form data sertifikat//        
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


			$this->session->set_tempdata('sertAgunanID', $sertAgunanID, 900);
			$this->session->set_tempdata('sertID', $sertID, 900);
			$this->session->set_tempdata('sertNoSert', $sertNoSert, 900);
			$this->session->set_tempdata('sertKOHIR', $sertKOHIR, 900);
			$this->session->set_tempdata('sertJenisSertifikat', $sertJenisSertifikat, 900);
			$this->session->set_tempdata('sertNoPERSIL', $sertNoPERSIL, 900);
			$this->session->set_tempdata('sertTanggalSertifikat', $sertTanggalSertifikat, 900);
			$this->session->set_tempdata('sertJTSHGB', $sertJTSHGB, 900);
			$this->session->set_tempdata('sertNoSuratUkur', $sertNoSuratUkur, 900);
			$this->session->set_tempdata('sertPLBangunan', $sertPLBangunan, 900);
			$this->session->set_tempdata('sertLuasTanah', $sertLuasTanah, 900);
			$this->session->set_tempdata('sertNamaPPAT', $sertNamaPPAT, 900);
			$this->session->set_tempdata('sertNamaPemilik', $sertNamaPemilik, 900);
			$this->session->set_tempdata('sertAlamatSertifikat', $sertAlamatSertifikat, 900);
			$this->session->set_tempdata('sertKelurahan', $sertKelurahan, 900);
			$this->session->set_tempdata('sertKecamatan', $sertKecamatan, 900);
			$this->session->set_tempdata('sertKota', $sertKota, 900);
			$this->session->set_tempdata('sertPorpinsi', $sertPorpinsi, 900);
			$this->session->set_tempdata('sertBatasTanah', $sertBatasTanah, 900);

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


			$this->session->set_tempdata('sertDokAJB', $sertDokAJB, 900);
			$this->session->set_tempdata('sertNomorAJB', $sertNomorAJB, 900);
			$this->session->set_tempdata('sertTanggalAJB', $sertTanggalAJB, 900);
			$this->session->set_tempdata('sertDokIMB', $sertDokIMB, 900);
			$this->session->set_tempdata('sertNomorIMB', $sertNomorIMB, 900);
			$this->session->set_tempdata('sertDokSPPT', $sertDokSPPT, 900);
			$this->session->set_tempdata('sertNomorSPPT', $sertNomorSPPT, 900);
			$this->session->set_tempdata('sertTahunSPPT', $sertTahunSPPT, 900);
			$this->session->set_tempdata('sertDokSKHMT', $sertDokSKHMT, 900);
			$this->session->set_tempdata('sertDokDenah', $sertDokDenah, 900);
			$this->session->set_tempdata('sertDokRoya', $sertDokRoya, 900);
			$this->session->set_tempdata('sertDokSHT', $sertDokSHT, 900);
			$this->session->set_tempdata('sertNoSHT', $sertNoSHT, 900);
			$this->session->set_tempdata('sertPropinsiSHT', $sertPropinsiSHT, 900);
			$this->session->set_tempdata('sertKotaSHT', $sertKotaSHT, 900);
			$this->session->set_tempdata('sertDokSTTS', $sertDokSTTS, 900);
			$this->session->set_tempdata('sertTahunSTTS', $sertTahunSTTS, 900);
			$this->session->set_tempdata('sertDokSSB', $sertDokSSB, 900);
			$this->session->set_tempdata('sertAtasNamaSSBBPHTB', $sertAtasNamaSSBBPHTB, 900);
			$this->session->set_tempdata('sertLainnya', $sertLainnya, 900);

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
			}else if($check_ajb == ''){
				$ajb = 'N';
			}
			if($check_imb == 'Y'){
				$imb = $check_imb;
			}else if($check_imb == ''){
				$imb = 'N';
			}
			if($check_sppt == 'Y'){
				$sppt = $check_sppt;
			}else if($check_sppt == ''){
				$sppt = 'N';
			}
			if($check_skmht == 'Y'){
				$skmht = $check_skmht;
			}else if($check_skmht == ''){
				$skmht = 'N';
			}
			if($check_denah == 'Y'){
				$denah = $check_denah;
			}else if($check_denah == ''){
				$denah = 'N';
			}
			if($check_roya  == 'Y'){
				$roya = $check_roya;
			}else if($check_roya  == ''){
				$roya = 'N';
			}
			if($check_sht  == 'Y'){
				$sht = $check_sht;
			}else if($check_sht  == ''){
				$sht = 'N';
			}
			if($check_stts  == 'Y'){
				$stts = $check_stts;
			}else if($check_stts  == ''){
				$stts = 'N';
			}
			if($check_ssb_bpht  == 'Y'){
				$ssb_bpht = $check_ssb_bpht;
			}else if($check_ssb_bpht  == ''){
				$ssb_bpht = 'N';
			}
			
			$this->session->set_tempdata('ajb', $ajb, 900);
			$this->session->set_tempdata('imb', $imb, 900);
			$this->session->set_tempdata('sppt', $sppt, 900);
			$this->session->set_tempdata('skmht', $skmht, 900);
			$this->session->set_tempdata('denah', $denah, 900);
			$this->session->set_tempdata('roya', $roya, 900);
			$this->session->set_tempdata('sht', $sht, 900);
			$this->session->set_tempdata('stts', $stts, 900);
			$this->session->set_tempdata('ssb_bpht', $ssb_bpht, 900);
			
			/// end checkbox


			// form data SID //
			$sertSlikStatusAgunan      		= $this->input->post('sertSlikStatusAgunan');
			$sertSlikJenisAgunan        	= $this->input->post('sertSlikJenisAgunan');
			$sertSlikPeringkatAgunan    	= $this->input->post('sertSlikPeringkatAgunan');
			$sertSlikLembagaPemeringkat 	= $this->input->post('sertSlikLembagaPemeringkat');
			$sertSlikJenisPengikatan    	= $this->input->post('sertSlikJenisPengikatan');
			$sertSlikTanggalPengikatan  	= $this->input->post('sertSlikTanggalPengikatan');
			$sertSlikNamaPemilikAgunan  	= $this->input->post('sertSlikNamaPemilikAgunan');
			$sertSlikBuktiKepemilikanAgunan = $this->input->post('sertSlikBuktiKepemilikanAgunan');
			$sertSlikAlamat 				= $this->input->post('sertSlikAlamat');
			$sertSlikKodeDati2 				= $this->input->post('sertSlikKodeDati2');
			$sertSlikNilaiNJOP 				= $this->input->post('sertSlikNilaiNJOP');
			$sertSlikNilaiLJK 				= $this->input->post('sertSlikNilaiLJK');
			$sertSlikTanggalLJK 			= $this->input->post('sertSlikTanggalLJK');
			$sertSlikNilaiIndependen 		= $this->input->post('sertSlikNilaiIndependen');
			$sertSlikTglIndependen 			= $this->input->post('sertSlikTglIndependen');
			$sertSlikNamaIndependen 		= $this->input->post('sertSlikNamaIndependen');
			$sertSlikKeterangan 			= $this->input->post('sertSlikKeterangan');
			$sertSlikParipasu 				= $this->input->post('sertSlikParipasu');
			$sertSlikParipasuPersen 		= $this->input->post('sertSlikParipasuPersen');
			$sertSLikStatusJoinAccount 		= $this->input->post('sertSLikStatusJoinAccount');
			$sertSlikAsuransi 				= $this->input->post('sertSlikAsuransi');

		
			$this->session->set_tempdata('sertSlikStatusAgunan', $sertSlikStatusAgunan, 900);
			$this->session->set_tempdata('sertSlikJenisAgunan', $sertSlikJenisAgunan, 900);
			$this->session->set_tempdata('sertSlikPeringkatAgunan', $sertSlikPeringkatAgunan, 900);
			$this->session->set_tempdata('sertSlikLembagaPemeringkat', $sertSlikLembagaPemeringkat, 900);
			$this->session->set_tempdata('sertSlikJenisPengikatan', $sertSlikJenisPengikatan, 900);
			$this->session->set_tempdata('sertSlikTanggalPengikatan', $sertSlikTanggalPengikatan, 900);
			$this->session->set_tempdata('sertSlikNamaPemilikAgunan', $sertSlikNamaPemilikAgunan, 900);
			$this->session->set_tempdata('sertSlikBuktiKepemilikanAgunan', $sertSlikBuktiKepemilikanAgunan, 900);
			$this->session->set_tempdata('sertSlikAlamat', $sertSlikAlamat, 900);
			$this->session->set_tempdata('sertSlikKodeDati2', $sertSlikKodeDati2, 900);
			$this->session->set_tempdata('sertSlikNilaiNJOP', $sertSlikNilaiNJOP, 900);
			$this->session->set_tempdata('sertSlikNilaiLJK', $sertSlikNilaiLJK, 900);
			$this->session->set_tempdata('sertSlikTanggalLJK', $sertSlikTanggalLJK, 900);
			$this->session->set_tempdata('sertSlikNilaiIndependen', $sertSlikNilaiIndependen, 900);
			$this->session->set_tempdata('sertSlikTglIndependen', $sertSlikTglIndependen, 900);
			$this->session->set_tempdata('sertSlikNamaIndependen', $sertSlikNamaIndependen, 900);
			$this->session->set_tempdata('sertSlikKeterangan', $sertSlikKeterangan, 900);
			$this->session->set_tempdata('sertSlikParipasu', $sertSlikParipasu, 900);
			$this->session->set_tempdata('sertSlikParipasuPersen', $sertSlikParipasuPersen, 900);
			$this->session->set_tempdata('sertSLikStatusJoinAccount', $sertSLikStatusJoinAccount, 900);
			$this->session->set_tempdata('sertSlikAsuransi', $sertSlikAsuransi, 900);

			redirect('AsetDokumenEntryController/displayTambahAsetDokumen'); 
		}
		else{
			redirect('LoginController/index'); 
		}
	}
	//HANDLE BPKB //
	public function handleUserInputBPKB(){
		$session = $this->session->userdata('nama');
		
		if($session != ''){
			//form atas//   
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
			//form atas session// 
			$this->session->set_tempdata('bpkbTglRegister', $bpkbTglRegister, 900);
			$this->session->set_tempdata('bpkbTglPenilaian', $bpkbTglPenilaian, 900);
			$this->session->set_tempdata('bpkbKantorLokasi', $bpkbKantorLokasi, 900);
			$this->session->set_tempdata('bpkbKodeJenisAgunan', $bpkbKodeJenisAgunan, 900);
			$this->session->set_tempdata('bpkbKodeIkatanAgunan', $bpkbKodeIkatanAgunan, 900);
			$this->session->set_tempdata('bpkbNilaiTaksasiAgunan', $bpkbNilaiTaksasiAgunan, 900);
			$this->session->set_tempdata('bpkbNJOP', $bpkbNJOP, 900);
			$this->session->set_tempdata('bpkbHargaPasar', $bpkbHargaPasar, 900);
			$this->session->set_tempdata('bpkbAPHT', $bpkbAPHT, 900);
			$this->session->set_tempdata('bpkbPersenDijamin', $bpkbPersenDijamin, 900);

			
			// form data bpkb //
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
			//form data bpkb session// 
			$this->session->set_tempdata('bpkbAgunanID', $bpkbAgunanID, 900);
			$this->session->set_tempdata('bpkbNoBPKB', $bpkbNoBPKB, 900);
			$this->session->set_tempdata('bpkbNamaPemilik', $bpkbNamaPemilik, 900);
			$this->session->set_tempdata('bpkbAlamatPemlik', $bpkbAlamatPemlik, 900);
			$this->session->set_tempdata('bpkbKotaPemilik', $bpkbKotaPemilik, 900);
			$this->session->set_tempdata('bpkbMerk', $bpkbMerk, 900);
			$this->session->set_tempdata('bpkbType', $bpkbType, 900);
			$this->session->set_tempdata('bpkbJenis', $bpkbJenis, 900);
			$this->session->set_tempdata('bpkbSilinder', $bpkbSilinder, 900);
			$this->session->set_tempdata('bpkbNoRangka', $bpkbNoRangka, 900);
			$this->session->set_tempdata('bpkbNoMesin', $bpkbNoMesin, 900);
			$this->session->set_tempdata('bpkbTahun', $bpkbTahun, 900);
			$this->session->set_tempdata('bpkbWarna', $bpkbWarna, 900);
			$this->session->set_tempdata('bpkbTglExpPajak', $bpkbTglExpPajak, 900);
			$this->session->set_tempdata('bpkbNoPolisi', $bpkbNoPolisi, 900);
			$this->session->set_tempdata('bpkbTglExpSTNK', $bpkbTglExpSTNK, 900);
			$this->session->set_tempdata('bpkbNoSTNK', $bpkbNoSTNK, 900);	
			

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
			}else if($check_kw_blanko == ''){
				$blanko = 'N';
			}
			if($check_faktur_pemilik == 'Y'){
				$faktur_pemilik = $check_faktur_pemilik;
			}else if($check_faktur_pemilik == ''){
				$faktur_pemilik = 'N';
			}
			if($check_kw_jual_beli == 'Y'){
				$kwitansi_jb = $check_kw_jual_beli;
			}else if($check_kw_jual_beli == ''){
				$kwitansi_jb = 'N';
			}
			if($check_sk_trayek == 'Y'){
				$sk_trayek = $check_sk_trayek;
			}else if($check_sk_trayek == ''){
				$sk_trayek = 'N';
			}
			// form
			$bpkbNoFakturPemilik		= $this->input->post('bpkbNoFakturPemilik');
			$noSKTrayek					= $this->input->post('noSKTrayek');
			$bpkbBerlakuSD				= $this->input->post('bpkbBerlakuSD');
			$bpkbLainnya				= $this->input->post('bpkbLainnya');

			$this->session->set_tempdata('bpkbDokKwitansiBlanko', $bpkbDokKwitansiBlanko, 900);
			$this->session->set_tempdata('bpkbDokFakturPemilik', $bpkbDokFakturPemilik, 900);
			$this->session->set_tempdata('bpkbDokKwJualBeli', $bpkbDokKwJualBeli, 900);
			$this->session->set_tempdata('bpkbDokSKTrayek', $bpkbDokSKTrayek, 900);
			$this->session->set_tempdata('blanko', $blanko, 900);
			$this->session->set_tempdata('faktur_pemilik', $faktur_pemilik, 900);
			$this->session->set_tempdata('kwitansi_jb', $kwitansi_jb, 900);
			$this->session->set_tempdata('sk_trayek', $sk_trayek, 900);
			$this->session->set_tempdata('bpkbNoFakturPemilik', $bpkbNoFakturPemilik, 900);
			$this->session->set_tempdata('noSKTrayek', $noSKTrayek, 900);
			$this->session->set_tempdata('bpkbBerlakuSD', $bpkbBerlakuSD, 900);
			$this->session->set_tempdata('bpkbLainnya', $bpkbLainnya, 900);
			

			/// Form Data SID ///
			$bpkbSIDJenisAgunan				= $this->input->post('bpkbSIDJenisAgunan');
			$bpkbSIDPengikatSurat			= $this->input->post('bpkbSIDPengikatSurat');
			$bpkbSIDJenisPengikatan			= $this->input->post('bpkbSIDJenisPengikatan');
			$bpkbSIDNamaPemilikAgunan		= $this->input->post('bpkbSIDNamaPemilikAgunan');
			$bpkbSIDStatusBuktiKepemilikan	= $this->input->post('bpkbSIDStatusBuktiKepemilikan');
			$bpkbSIDAlamat					= $this->input->post('bpkbSIDAlamat');
			$bpkbSIDLokasi					= $this->input->post('bpkbSIDLokasi');
			$bpkbSIDNJOP					= $this->input->post('bpkbSIDNJOP');
			$nilaiSIDAgunanBank				= $this->input->post('nilaiSIDAgunanBank');
			$bpkbSIDNilaiIndependen			= $this->input->post('bpkbSIDNilaiIndependen');
			$bpkbSIDNamaIndependen			= $this->input->post('bpkbSIDNamaIndependen');
			$bpkbSIDParipasu				= $this->input->post('bpkbSIDParipasu');
			$bpkbSIDAsuransi				= $this->input->post('bpkbSIDAsuransi');

			$this->session->set_tempdata('bpkbSIDJenisAgunan', $bpkbSIDJenisAgunan, 900);
			$this->session->set_tempdata('bpkbSIDPengikatSurat', $bpkbSIDPengikatSurat, 900);
			$this->session->set_tempdata('bpkbSIDJenisPengikatan', $bpkbSIDJenisPengikatan, 900);
			$this->session->set_tempdata('bpkbSIDNamaPemilikAgunan', $bpkbSIDNamaPemilikAgunan, 900);
			$this->session->set_tempdata('bpkbSIDStatusBuktiKepemilikan', $bpkbSIDStatusBuktiKepemilikan, 900);
			$this->session->set_tempdata('bpkbSIDAlamat', $bpkbSIDAlamat, 900);
			$this->session->set_tempdata('bpkbSIDLokasi', $bpkbSIDLokasi, 900);
			$this->session->set_tempdata('bpkbSIDNJOP', $bpkbSIDNJOP, 900);
			$this->session->set_tempdata('nilaiSIDAgunanBank', $nilaiSIDAgunanBank, 900);
			$this->session->set_tempdata('bpkbSIDNilaiIndependen', $bpkbSIDNilaiIndependen, 900);
			$this->session->set_tempdata('bpkbSIDNamaIndependen', $bpkbSIDNamaIndependen, 900);
			$this->session->set_tempdata('bpkbSIDParipasu', $bpkbSIDParipasu, 900);
			$this->session->set_tempdata('bpkbSIDAsuransi', $bpkbSIDAsuransi, 900);

			// form data SID //
			$sertSlikStatusAgunan      		= $this->input->post('sertSlikStatusAgunan');
			$sertSlikJenisAgunan        	= $this->input->post('sertSlikJenisAgunan');
			$sertSlikPeringkatAgunan    	= $this->input->post('sertSlikPeringkatAgunan');
			$sertSlikLembagaPemeringkat 	= $this->input->post('sertSlikLembagaPemeringkat');
			$sertSlikJenisPengikatan    	= $this->input->post('sertSlikJenisPengikatan');
			$sertSlikTanggalPengikatan  	= $this->input->post('sertSlikTanggalPengikatan');
			$sertSlikNamaPemilikAgunan  	= $this->input->post('sertSlikNamaPemilikAgunan');
			$sertSlikBuktiKepemilikanAgunan = $this->input->post('sertSlikBuktiKepemilikanAgunan');
			$sertSlikAlamat 				= $this->input->post('sertSlikAlamat');
			$sertSlikKodeDati2 				= $this->input->post('sertSlikKodeDati2');
			$sertSlikNilaiNJOP 				= $this->input->post('sertSlikNilaiNJOP');
			$sertSlikNilaiLJK 				= $this->input->post('sertSlikNilaiLJK');
			$sertSlikTanggalLJK 			= $this->input->post('sertSlikTanggalLJK');
			$sertSlikNilaiIndependen 		= $this->input->post('sertSlikNilaiIndependen');
			$sertSlikTglIndependen 			= $this->input->post('sertSlikTglIndependen');
			$sertSlikNamaIndependen 		= $this->input->post('sertSlikNamaIndependen');
			$sertSlikKeterangan 			= $this->input->post('sertSlikKeterangan');
			$sertSlikParipasu 				= $this->input->post('sertSlikParipasu');
			$sertSlikParipasuPersen 		= $this->input->post('sertSlikParipasuPersen');
			$sertSLikStatusJoinAccount 		= $this->input->post('sertSLikStatusJoinAccount');
			$sertSlikAsuransi 				= $this->input->post('sertSlikAsuransi');

		
			$this->session->set_tempdata('sertSlikStatusAgunan', $sertSlikStatusAgunan, 900);
			$this->session->set_tempdata('sertSlikJenisAgunan', $sertSlikJenisAgunan, 900);
			$this->session->set_tempdata('sertSlikPeringkatAgunan', $sertSlikPeringkatAgunan, 900);
			$this->session->set_tempdata('sertSlikLembagaPemeringkat', $sertSlikLembagaPemeringkat, 900);
			$this->session->set_tempdata('sertSlikJenisPengikatan', $sertSlikJenisPengikatan, 900);
			$this->session->set_tempdata('sertSlikTanggalPengikatan', $sertSlikTanggalPengikatan, 900);
			$this->session->set_tempdata('sertSlikNamaPemilikAgunan', $sertSlikNamaPemilikAgunan, 900);
			$this->session->set_tempdata('sertSlikBuktiKepemilikanAgunan', $sertSlikBuktiKepemilikanAgunan, 900);
			$this->session->set_tempdata('sertSlikAlamat', $sertSlikAlamat, 900);
			$this->session->set_tempdata('sertSlikKodeDati2', $sertSlikKodeDati2, 900);
			$this->session->set_tempdata('sertSlikNilaiNJOP', $sertSlikNilaiNJOP, 900);
			$this->session->set_tempdata('sertSlikNilaiLJK', $sertSlikNilaiLJK, 900);
			$this->session->set_tempdata('sertSlikTanggalLJK', $sertSlikTanggalLJK, 900);
			$this->session->set_tempdata('sertSlikNilaiIndependen', $sertSlikNilaiIndependen, 900);
			$this->session->set_tempdata('sertSlikTglIndependen', $sertSlikTglIndependen, 900);
			$this->session->set_tempdata('sertSlikNamaIndependen', $sertSlikNamaIndependen, 900);
			$this->session->set_tempdata('sertSlikKeterangan', $sertSlikKeterangan, 900);
			$this->session->set_tempdata('sertSlikParipasu', $sertSlikParipasu, 900);
			$this->session->set_tempdata('sertSlikParipasuPersen', $sertSlikParipasuPersen, 900);
			$this->session->set_tempdata('sertSLikStatusJoinAccount', $sertSLikStatusJoinAccount, 900);
			$this->session->set_tempdata('sertSlikAsuransi', $sertSlikAsuransi, 900);

			redirect('AsetDokumenEntryController/displayTambahAsetDokumen'); 
		}
		else{
			redirect('LoginController/index'); 
		}
	}
	//HANDLE EMAS //
	public function handleUserInputEmas(){
		$session = $this->session->userdata('nama');
		if($session != ''){

			//data emas
			$emasAgunanID 				= $this->input->post('emasAgunanID');
			$emasNoSeri 				= $this->input->post('emasNoSeri');
			$emasJenisEmas 				= $this->input->post('emasJenisEmas');
			$emasKarat 					= $this->input->post('emasKarat');
			$emasBerat 					= $this->input->post('emasBerat');
			$emasHargaPasar 			= $this->input->post('emasHargaPasar');
			$emasHargaTaksasi 			= $this->input->post('emasHargaTaksasi');

			//data SID emas   
			
			$emasSIDNamaPemilikAgunan 			= $this->input->post('emasSIDNamaPemilikAgunan');
			$emasSIDStatus 						= $this->input->post('emasSIDStatus');
			$emasSIDAlamat 						= $this->input->post('emasSIDAlamat');
			$emasSIDNJOP 						= $this->input->post('emasSIDNJOP');
			$emasSIDBank 						= $this->input->post('emasSIDBank'); 
			$emasSIDNilaiIndependen 			= $this->input->post('emasSIDNilaiIndependen');  
			$emasSIDNamaIndependen 				= $this->input->post('emasSIDNamaIndependen'); 
			$emasSIDTglPenilaian 				= $this->input->post('emasSIDTglPenilaian'); 
			$emasSIDParipasu 					= $this->input->post('emasSIDParipasu'); 
			$emasSIDAsuransi 				    = $this->input->post('emasSIDAsuransi'); 

			$this->session->set_tempdata('emasAgunanID', $emasAgunanID, 900);
			$this->session->set_tempdata('emasNoSeri', $emasNoSeri, 900);
			$this->session->set_tempdata('emasJenisEmas', $emasJenisEmas, 900);
			$this->session->set_tempdata('emasKarat', $emasKarat, 900);
			$this->session->set_tempdata('emasBerat', $emasBerat, 900);
			$this->session->set_tempdata('emasHargaPasar', $emasHargaPasar, 900);
			$this->session->set_tempdata('emasHargaTaksasi', $emasHargaTaksasi, 900);

			$this->session->set_tempdata('emasSIDNamaPemilikAgunan', $emasSIDNamaPemilikAgunan, 900);
			$this->session->set_tempdata('emasSIDStatus', $emasSIDStatus, 900);
			$this->session->set_tempdata('emasSIDAlamat', $emasSIDAlamat, 900);
			$this->session->set_tempdata('emasSIDNJOP', $emasSIDNJOP, 900);
			$this->session->set_tempdata('emasSIDBank', $emasSIDBank, 900);
			$this->session->set_tempdata('emasSIDNilaiIndependen', $emasSIDNilaiIndependen, 900);
			$this->session->set_tempdata('emasSIDNamaIndependen', $emasSIDNamaIndependen, 900);
			$this->session->set_tempdata('emasSIDTglPenilaian', $emasSIDTglPenilaian, 900);
			$this->session->set_tempdata('emasSIDParipasu', $emasSIDParipasu, 900);
			$this->session->set_tempdata('emasSIDAsuransi', $emasSIDAsuransi, 900);

			redirect('AsetDokumenEntryController/displayTambahAsetDokumen'); 

		}
		else{
			redirect('LoginController/index'); 
		}
	}

	///// SIMPAN DATA DOKUMEN /////
	public function insertDataToDB(){
		$session = $this->session->userdata('nama');
		
		/// MAIN FORM /// 
		$mainAreaKerja        = $this->input->post('mainAreaKerja');
		$mainTanggal          = $this->input->post('mainTanggal');
		$mainTransaksi        = $this->input->post('mainTransaksi');
		$mainNama             = $this->input->post('mainNama');
		$mainKeterangan       = $this->input->post('mainKeterangan');
		$mainAlamat           = $this->input->post('mainAlamat');
		$mainKota             = $this->input->post('mainKota');
		$mainJenisPengurusan  = $this->input->post('mainJenisPengurusan');
		$mainNomorRekening    = $this->input->post('mainNomorRekening');
		$mainTanggalRealisasi = $this->input->post('mainTanggalRealisasi');

		
		$cif = $this->AsetDokumenEntryModel->getCIF($mainNomorRekening);
		foreach ($cif as $row) :
			$cif    = $row['nasabah_id'];
		endforeach;

		if($cif == null){
			$cif = ' ';
		}
	
		if($session != ''){

			/// apakah insert sertifikat ?
			if($this->session->tempdata('sertTglRegister') != ''){
					
					$jenisJaminan = 'SERTIFIKAT';
					$rodaKendaraan = '0';
					$verifikasi = '0';

					/// START FORM TAMBAH SERTIFIKAT ///
					// DATA FORM ATAS   
					$sertTglRegister 			= $this->session->tempdata('sertTglRegister'); 
					$sertTglPenilaian 			= $this->session->tempdata('sertTglPenilaian'); 
					$sertKantorLokasi 			= $this->session->tempdata('sertKantorLokasi'); 
					$sertKodeJenisAgunan 	    = $this->session->tempdata('sertKodeJenisAgunan');
					$sertKodeIkatanAgunan 	    = $this->session->tempdata('sertKodeIkatanAgunan');    
					$sertNilaiTaksasiAgunan 	= $this->session->tempdata('sertNilaiTaksasiAgunan');  
					$sertNJOP 			        = $this->session->tempdata('sertNJOP');    
					$sertHargaPasar 			= $this->session->tempdata('sertHargaPasar');
					$sertAPHT 			        = $this->session->tempdata('sertAPHT'); 
					$sertPersenDijamin 			= $this->session->tempdata('sertPersenDijamin');
					// DATA SERTIFIKAT
					$sertAgunanID 			= $this->session->tempdata('sertAgunanID');
					$sertID 			    = $this->session->tempdata('sertID');
					$sertNoSert 			= $this->session->tempdata('sertNoSert');
					$sertKOHIR 			    = $this->session->tempdata('sertKOHIR');
					$sertJenisSertifikat    = $this->session->tempdata('sertJenisSertifikat');
					$sertNoPERSIL 			= $this->session->tempdata('sertNoPERSIL');
					$sertTanggalSertifikat 	= $this->session->tempdata('sertTanggalSertifikat');
					$sertJTSHGB 			= $this->session->tempdata('sertJTSHGB');
					$sertNoSuratUkur 		= $this->session->tempdata('sertNoSuratUkur');
					$sertPLBangunan 		= $this->session->tempdata('sertPLBangunan');
					$sertLuasTanah 			= $this->session->tempdata('sertLuasTanah');
					$sertNamaPPAT 			= $this->session->tempdata('sertNamaPPAT');
					$sertNamaPemilik 	    = $this->session->tempdata('sertNamaPemilik');
					$sertAlamatSertifikat 	= $this->session->tempdata('sertAlamatSertifikat');
					$sertKelurahan 			= $this->session->tempdata('sertKelurahan');
					$sertKecamatan 			= $this->session->tempdata('sertKecamatan');
					$sertKota 			    = $this->session->tempdata('sertKota');
					$sertPorpinsi 			= $this->session->tempdata('sertPorpinsi');
					$sertBatasTanah 		= $this->session->tempdata('sertBatasTanah');
					// DATA LAMPIRAN
					$sertDokAJB 			= $this->session->tempdata('sertDokAJB');
					$sertNomorAJB 			= $this->session->tempdata('sertNomorAJB');
					$sertTanggalAJB 		= $this->session->tempdata('sertTanggalAJB');
					$sertDokIMB 			= $this->session->tempdata('sertDokIMB');
					$sertNomorIMB 			= $this->session->tempdata('sertNomorIMB');
					$sertDokSPPT 			= $this->session->tempdata('sertDokSPPT');
					$sertNomorSPPT 			= $this->session->tempdata('sertNomorSPPT');
					$sertTahunSPPT 			= $this->session->tempdata('sertTahunSPPT');
					$sertDokSKHMT 			= $this->session->tempdata('sertDokSKHMT');
					$sertDokDenah 			= $this->session->tempdata('sertDokDenah');
					$sertDokRoya 			= $this->session->tempdata('sertDokRoya');
					$sertDokSHT 			= $this->session->tempdata('sertDokSHT');
					$sertNoSHT 			    = $this->session->tempdata('sertNoSHT');
					$sertPropinsiSHT 		= $this->session->tempdata('sertPropinsiSHT');
					$sertKotaSHT 			= $this->session->tempdata('sertKotaSHT');
					$sertDokSTTS 			= $this->session->tempdata('sertDokSTTS');
					$sertTahunSTTS 			= $this->session->tempdata('sertTahunSTTS');
					$sertDokSSB 			= $this->session->tempdata('sertDokSSB');
					$sertAtasNamaSSBBPHTB 	= $this->session->tempdata('sertAtasNamaSSBBPHTB');
					$sertLainnya 			= $this->session->tempdata('sertLainnya');
					///check BOX
					$ajb			=	$this->session->tempdata('ajb');
					$imb			=	$this->session->tempdata('imb');
					$sppt			=	$this->session->tempdata('sppt');
					$skmht		    =	$this->session->tempdata('skmht');
					$denah		    =	$this->session->tempdata('denah');
					$roya			=	$this->session->tempdata('roya');
					$sht			=	$this->session->tempdata('sht');
					$stts			=	$this->session->tempdata('stts');
					$ssb_bpht		=	$this->session->tempdata('ssb_bpht');
					///end check box///
					// DATA SID
					
					$sertSlikStatusAgunan      		= $this->session->tempdata('sertSlikStatusAgunan');
					$sertSlikJenisAgunan        	= $this->session->tempdata('sertSlikJenisAgunan');
					$sertSlikPeringkatAgunan    	= $this->session->tempdata('sertSlikPeringkatAgunan');
					$sertSlikLembagaPemeringkat 	= $this->session->tempdata('sertSlikLembagaPemeringkat');
					$sertSlikJenisPengikatan    	= $this->session->tempdata('sertSlikJenisPengikatan');
					$sertSlikTanggalPengikatan  	= $this->session->tempdata('sertSlikTanggalPengikatan');
					$sertSlikNamaPemilikAgunan  	= $this->session->tempdata('sertSlikNamaPemilikAgunan');
					$sertSlikBuktiKepemilikanAgunan = $this->session->tempdata('sertSlikBuktiKepemilikanAgunan');
					$sertSlikAlamat 				= $this->session->tempdata('sertSlikAlamat');
					$sertSlikKodeDati2 				= $this->session->tempdata('sertSlikKodeDati2');
					$sertSlikNilaiNJOP 				= $this->session->tempdata('sertSlikNilaiNJOP');
					$sertSlikNilaiLJK 				= $this->session->tempdata('sertSlikNilaiLJK');
					$sertSlikTanggalLJK 			= $this->session->tempdata('sertSlikTanggalLJK');
					$sertSlikNilaiIndependen 		= $this->session->tempdata('sertSlikNilaiIndependen');
					$sertSlikTglIndependen 			= $this->session->tempdata('sertSlikTglIndependen');
					$sertSlikNamaIndependen 		= $this->session->tempdata('sertSlikNamaIndependen');
					$sertSlikKeterangan 			= $this->session->tempdata('sertSlikKeterangan');
					$sertSlikParipasu 				= $this->session->tempdata('sertSlikParipasu');
					$sertSlikParipasuPersen 		= $this->session->tempdata('sertSlikParipasuPersen');
					$sertSLikStatusJoinAccount 		= $this->session->tempdata('sertSLikStatusJoinAccount');
					$sertSlikAsuransi 				= $this->session->tempdata('sertSlikAsuransi');
					/// END FORM TAMBAH SERTIFIKAT ///

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
					
					//generate agunan ID
					$generateAgunanID = $this->AsetDokumenEntryModel->generateAgunanID($mainAreaKerja);
					foreach ($generateAgunanID as $row) :
						$agunan_id    = $row['hasil'];
					endforeach;

					//update counter noref
					$this->AsetDokumenEntryModel->updateNoRef($mainAreaKerja);

					$this->AsetDokumenEntryModel->insertJaminanHeaderSert($mainTanggal,
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
																				$sertSlikKeterangan);
			
					
					$this->buttonBack();
			
			}
			else if($this->session->tempdata('bpkbTglRegister') != ''){

				$jenisJaminan = 'BPKB';
				$rodaKendaraan = '4';
				$verifikasi = '0';
				
				///// START FORM BPKB /////
				//form atas session// 
				$bpkbTglRegister 				= $this->session->tempdata('bpkbTglRegister');
				$bpkbTglPenilaian 				= $this->session->tempdata('bpkbTglPenilaian');
				$bpkbKantorLokasi  				= $this->session->tempdata('bpkbKantorLokasi');
				$bpkbKodeJenisAgunan 			= $this->session->tempdata('bpkbKodeJenisAgunan');
				$bpkbKodeIkatanAgunan 			= $this->session->tempdata('bpkbKodeIkatanAgunan');
				$bpkbNilaiTaksasiAgunan 		= $this->session->tempdata('bpkbNilaiTaksasiAgunan');
				$bpkbNJOP 						= $this->session->tempdata('bpkbNJOP');
				$bpkbHargaPasar 				= $this->session->tempdata('bpkbHargaPasar');
				$bpkbAPHT 						= $this->session->tempdata('bpkbAPHT');
				$bpkbPersenDijamin 				= $this->session->tempdata('bpkbPersenDijamin');
			
				//form data bpkb session// 
				$bpkbAgunanID					= $this->session->tempdata('bpkbAgunanID');
				$bpkbNoBPKB						= $this->session->tempdata('bpkbNoBPKB');
				$bpkbNamaPemilik				= $this->session->tempdata('bpkbNamaPemilik');
				$bpkbAlamatPemlik				= $this->session->tempdata('bpkbAlamatPemlik');
				$bpkbKotaPemilik				= $this->session->tempdata('bpkbKotaPemilik');
				$bpkbMerk						= $this->session->tempdata('bpkbMerk');
				$bpkbType						= $this->session->tempdata('bpkbType');
				$bpkbJenis						= $this->session->tempdata('bpkbJenis');
				$bpkbSilinder					= $this->session->tempdata('bpkbSilinder');
				$bpkbNoRangka 					= $this->session->tempdata('bpkbNoRangka');
				$bpkbNoMesin 					= $this->session->tempdata('bpkbNoMesin');
				$bpkbTahun 						= $this->session->tempdata('bpkbTahun');
				$bpkbWarna 						= $this->session->tempdata('bpkbWarna');
				$bpkbTglExpPajak 				= $this->session->tempdata('bpkbTglExpPajak');
				$bpkbNoPolisi 					= $this->session->tempdata('bpkbNoPolisi');
				$bpkbTglExpSTNK 				= $this->session->tempdata('bpkbTglExpSTNK');
				$bpkbNoSTNK 					= $this->session->tempdata('bpkbNoSTNK');

				// form data lampiran
				$bpkbDokKwitansiBlanko 			= $this->session->tempdata('bpkbDokKwitansiBlanko');
				$bpkbDokFakturPemilik 			= $this->session->tempdata('bpkbDokFakturPemilik');
				$bpkbDokKwJualBeli 				= $this->session->tempdata('bpkbDokKwJualBeli');
				$bpkbDokSKTrayek 				= $this->session->tempdata('bpkbDokSKTrayek');
				$blanko 						= $this->session->tempdata('blanko');
				$faktur_pemilik 				= $this->session->tempdata('faktur_pemilik');
				$kwitansi_jb					= $this->session->tempdata('kwitansi_jb');
				$sk_trayek 						= $this->session->tempdata('sk_trayek');
				$bpkbNoFakturPemilik 			= $this->session->tempdata('bpkbNoFakturPemilik');
				$noSKTrayek 					= $this->session->tempdata('noSKTrayek');
				$bpkbBerlakuSD 					= $this->session->tempdata('bpkbBerlakuSD');
				$bpkbLainnya 					= $this->session->tempdata('bpkbLainnya');

				// session SID //
				$bpkbSIDJenisAgunan 			= $this->session->tempdata('bpkbSIDJenisAgunan');
				$bpkbSIDPengikatSurat 			= $this->session->tempdata('bpkbSIDPengikatSurat');
				$bpkbSIDJenisPengikatan			= $this->session->tempdata('bpkbSIDJenisPengikatan');
				$bpkbSIDNamaPemilikAgunan 		= $this->session->tempdata('bpkbSIDNamaPemilikAgunan');
				$bpkbSIDStatusBuktiKepemilikan 	= $this->session->tempdata('bpkbSIDStatusBuktiKepemilikan');
				$bpkbSIDAlamat 					= $this->session->tempdata('bpkbSIDAlamat');
				$bpkbSIDLokasi 					= $this->session->tempdata('bpkbSIDLokasi');
				$bpkbSIDNJOP 					= $this->session->tempdata('bpkbSIDNJOP');
				$nilaiSIDAgunanBank 			= $this->session->tempdata('nilaiSIDAgunanBank');
				$bpkbSIDNilaiIndependen 		= $this->session->tempdata('bpkbSIDNilaiIndependen');
				$bpkbSIDNamaIndependen 			= $this->session->tempdata('bpkbSIDNamaIndependen');
				$bpkbSIDParipasu 				= $this->session->tempdata('bpkbSIDParipasu');
				$bpkbSIDAsuransi 				= $this->session->tempdata('bpkbSIDAsuransi');

				// DATA SLIK
					
				$sertSlikStatusAgunan      		= $this->session->tempdata('sertSlikStatusAgunan');
				$sertSlikJenisAgunan        	= $this->session->tempdata('sertSlikJenisAgunan');
				$sertSlikPeringkatAgunan    	= $this->session->tempdata('sertSlikPeringkatAgunan');
				$sertSlikLembagaPemeringkat 	= $this->session->tempdata('sertSlikLembagaPemeringkat');
				$sertSlikJenisPengikatan    	= $this->session->tempdata('sertSlikJenisPengikatan');
				$sertSlikTanggalPengikatan  	= $this->session->tempdata('sertSlikTanggalPengikatan');
				$sertSlikNamaPemilikAgunan  	= $this->session->tempdata('sertSlikNamaPemilikAgunan');
				$sertSlikBuktiKepemilikanAgunan = $this->session->tempdata('sertSlikBuktiKepemilikanAgunan');
				$sertSlikAlamat 				= $this->session->tempdata('sertSlikAlamat');
				$sertSlikKodeDati2 				= $this->session->tempdata('sertSlikKodeDati2');
				$sertSlikNilaiNJOP 				= $this->session->tempdata('sertSlikNilaiNJOP');
				$sertSlikNilaiLJK 				= $this->session->tempdata('sertSlikNilaiLJK');
				$sertSlikTanggalLJK 			= $this->session->tempdata('sertSlikTanggalLJK');
				$sertSlikNilaiIndependen 		= $this->session->tempdata('sertSlikNilaiIndependen');
				$sertSlikTglIndependen 			= $this->session->tempdata('sertSlikTglIndependen');
				$sertSlikNamaIndependen 		= $this->session->tempdata('sertSlikNamaIndependen');
				$sertSlikKeterangan 			= $this->session->tempdata('sertSlikKeterangan');
				$sertSlikParipasu 				= $this->session->tempdata('sertSlikParipasu');
				$sertSlikParipasuPersen 		= $this->session->tempdata('sertSlikParipasuPersen');
				$sertSLikStatusJoinAccount 		= $this->session->tempdata('sertSLikStatusJoinAccount');
				$sertSlikAsuransi 				= $this->session->tempdata('sertSlikAsuransi');
				/// END FORM TAMBAH SERTIFIKAT ///
				

				//generate agunan ID
				$generateAgunanID = $this->AsetDokumenEntryModel->generateAgunanID($mainAreaKerja);
				foreach ($generateAgunanID as $row) :
					$agunan_id    = $row['hasil'];
				endforeach;

				//update counter noref
				$this->AsetDokumenEntryModel->updateNoRef($mainAreaKerja);
				$this->AsetDokumenEntryModel->insertJaminanHeaderBPKB($mainAreaKerja,
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
																		$verifikasi);

				


				// UNSET SESISON DATA
				$this->buttonBack();
			}
			else if($this->session->tempdata('emasNoSeri') != ''){

				$jenisJaminan = 'EMAS';
				$rodaKendaraan = '0';
				$verifikasi = '0';

				$emasAgunanID					= $this->session->tempdata('emasAgunanID');
				$emasNoSeri						= $this->session->tempdata('emasNoSeri');
				$emasJenisEmas					= $this->session->tempdata('emasJenisEmas');
				$emasKarat						= $this->session->tempdata('emasKarat');
				$emasBerat						= $this->session->tempdata('emasBerat');
				$emasHargaPasar					= $this->session->tempdata('emasHargaPasar');
				$emasHargaTaksasi				= $this->session->tempdata('emasHargaTaksasi');
				
				$emasSIDNamaPemilikAgunan		= $this->session->tempdata('emasSIDNamaPemilikAgunan');
				$emasSIDStatus					= $this->session->tempdata('emasSIDStatus');
				$emasSIDAlamat					= $this->session->tempdata('emasSIDAlamat');
				$emasSIDNJOP					= $this->session->tempdata('emasSIDNJOP');
				$emasSIDBank					= $this->session->tempdata('emasSIDBank');
				$emasSIDNilaiIndependen			= $this->session->tempdata('emasSIDNilaiIndependen');
				$emasSIDNamaIndependen			= $this->session->tempdata('emasSIDNamaIndependen');
				$emasSIDTglPenilaian			= $this->session->tempdata('emasSIDTglPenilaian');
				$emasSIDParipasu				= $this->session->tempdata('emasSIDParipasu');
				$emasSIDAsuransi				= $this->session->tempdata('emasSIDAsuransi');

				//generate agunan ID
				$generateAgunanID = $this->AsetDokumenEntryModel->generateAgunanID($mainAreaKerja);
				foreach ($generateAgunanID as $row) :
					$agunan_id    = $row['hasil'];
				endforeach;

				//update counter noref
				$this->AsetDokumenEntryModel->updateNoRef($mainAreaKerja);
				$this->AsetDokumenEntryModel->insertJaminanHeaderEmas($mainAreaKerja,
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
																		$verifikasi);
																		
				$this->AsetDokumenEntryModel->insertJaminanDokumentEmas($jenisJaminan,
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
																			$mainNomorRekening);

				$this->session->unset_tempdata('emasAgunanID');
				$this->session->unset_tempdata('emasNoSeri');
				$this->session->unset_tempdata('emasJenisEmas');
				$this->session->unset_tempdata('emasKarat');
				$this->session->unset_tempdata('emasBerat');
				$this->session->unset_tempdata('emasHargaPasar');
				$this->session->unset_tempdata('emasHargaTaksasi');

				$this->session->unset_tempdata('emasSIDNamaPemilikAgunan');
				$this->session->unset_tempdata('emasSIDStatus');
				$this->session->unset_tempdata('emasSIDAlamat');
				$this->session->unset_tempdata('emasSIDNJOP');
				$this->session->unset_tempdata('emasSIDBank');
				$this->session->unset_tempdata('emasSIDNilaiIndependen');
				$this->session->unset_tempdata('emasSIDNamaIndependen');
				$this->session->unset_tempdata('emasSIDTglPenilaian');
				$this->session->unset_tempdata('emasSIDParipasu');
				$this->session->unset_tempdata('emasSIDAsuransi');

				redirect('AsetDokumenEntryController/index');
			}
			redirect('AsetDokumenEntryController/index'); 
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	/// delete data dokumen ///
	public function deleteDataDokumen(){
		$session = $this->session->userdata('nama');
		$nomorAgunan = $this->input->post('nomorAgunan');
		$nomorRefAgunan = $this->input->post('nomorRefAgunan');
		$dataStatus = $this->input->post('dataStatus');
		$agunanID = $this->input->post('agunanID');

		$data = array(
			'nomorAgunan' => $this->input->post('nomorAgunan'),
			'nomorRefAgunan'=> $this->input->post('nomorRefAgunan'),
			'dataStatus' => $this->input->post('dataStatus'),
			'agunanID' => $this->input->post('agunanID')
		);

		
		$this->AsetDokumenEntryModel->deleteDataDokumen($nomorAgunan,
														$nomorRefAgunan,
														$dataStatus,
														$agunanID);
		echo json_encode($data);
		
	}
	public function getNomorRekening(){
		//$data['getNomorRek']   = $this->AsetDokumenEntryModel->getNomorRek();
		$getNomorRek           = $this->AsetDokumenEntryModel->getNomorRek();
		if(count($getNomorRek) == 0){
			$data1 [] = '';
		}else{
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
		}
		echo json_encode($data1);
	}

	public function getDataSearchA(){
		$search 	= $this->input->post('search');
		$status     = $this->input->post('status');
		$kode_kantor = $this->input->post('kode_kantor');
		$jenis = $this->input->post('jenis');

		$searchlist = $this->AsetDokumenEntryModel->querySearchA($search,$kode_kantor);
		if( $this->session->userdata('menuAset') == '1'){
			if(count($searchlist) == 0){
				$data [] = '';
			}else{
				foreach ($searchlist as $row) :
					$data[]    = 	['<tr> <td>'. $row['nomor'] . '</td> <td>'
												. $row['agunan_id']. '</td> <td>'
												. $row['tgl']. '</td> <td>'
												. $row['nama'].'</td> <td>'
												. $row['alamat'] . '</td> <td>'
												. $row['jenis_jaminan']. '</td> <td>'
												. $row['status'].'</td> <td>'
												. $row['deskripsi_ringkas_jaminan'].'</td> <td>'
												. $row['lokasi_penyimpanan'].'</td> <td style="width:250px;">'
												. ' <button type="button" class="btn btn-primary btn-sm btnUpdate" style ="padding-left: 5px;"
															data-nomor="'. $row['nomor'] .'"
															data-noref="'. $row['no_reff'] .'" 
															data-status="'. $row['status'] .'"
															data-agunan="'. $row['agunan_id'] .'"
															data-toggle="tooltip" 
															data-placement="bottom" 
															title="Edit"
															name="btnUpdate"> 
															<i style="padding-left: 5px;" class="fas fa-edit"></i>
													</button>
													<button type="button" class="btn btn-danger btn-sm btnDelete" style ="padding-left: 5px;"
															data-nomor="'. $row['nomor'] .'"
															data-noref="'. $row['no_reff'] .'" 
															data-status="'. $row['status'] .'"
															data-agunan="'. $row['agunan_id'] .'"
															data-norekening="'. $row['no_rekening'] .'"
															data-verifikasi="'. $row['verifikasi'] .'"
															data-toggle="tooltip" 
															data-placement="bottom" 
															title="Delete"
															name="btnDelete"> 
															<i style ="padding-left: 5px;" class="fa fa-trash"></i>
													</button>
													<button type="button" class="btn btn-warning btn-sm btnPinjam" style ="padding-left: 5px;"
															data-nomor="'. $row['nomor'] .'"
															data-noref="'. $row['no_reff'] .'" 
															data-status="'. $row['status'] .'"
															data-agunan="'. $row['agunan_id'] .'"
															data-toggle="tooltip" 
															data-placement="bottom" 
															title="Peminjaman"
															name="btnPinjam"> 
															<i style ="padding-left: 5px;" class="far fa-hand-point-up"></i>
													</button>
													<button type="button" class="btn btn-success btn-sm btnKembaliDokumen" style ="padding-left: 5px;"
															data-nomor="'. $row['nomor'] .'"
															data-noref="'. $row['no_reff'] .'" 
															data-status="'. $row['status'] .'"
															data-agunan="'. $row['agunan_id'] .'"
															data-toggle="tooltip" 
															data-placement="bottom" 
															title="Pengembalian"
															name="btnKembali"> 
															<i style ="padding-left: 5px;" class="far fa-hand-point-down"></i>
													</button>
													<button type="button" class="btn btn-primary btn-sm btnDueDate" style ="padding-left: 5px;"
															data-nomor="'. $row['nomor'] .'"
															data-noref="'. $row['no_reff'] .'" 
															data-status="'. $row['status'] .'"
															data-agunan="'. $row['agunan_id'] .'"
															data-toggle="tooltip" 
															data-placement="bottom" 
															title="Due Date"
															name="btnKembali"> 
															<i style ="padding-left: 5px;" class="fas fa-stopwatch"></i>
													</button>
	
													<button type="button" class="btn btn-success btn-sm btnPenyerahan" style ="padding-left: 5px;"
														data-nomor="'. $row['nomor'] .'"
														data-noref="'. $row['no_reff'] .'" 
														data-status="'. $row['status'] .'"
														data-agunan="'. $row['agunan_id'] .'"
														data-rekening="'. $row['no_rekening'] .'"
														data-toggle="tooltip" 
														data-placement="bottom" 
														title="Penyerahan"
														name="btnKembali"> 
														<i style ="padding-left: 5px;"  class="fas fa-file-import"></i>
													</button>
	
													<form method="post" target="_blank" style ="display:inline;" action="'.base_url("AsetDokumenCetakController/cetakTransaksiAsetDokumen").'"> 
														<button type="submit" class="btn btn-info btn-sm btnCetaks" 
																data-nomor="'. $row['nomor'] .'"
																data-noref="'. $row['no_reff'] .'" 
																data-status="'. $row['status'] .'"
																data-agunan="'. $row['agunan_id'] .'"
																data-toggle="tooltip" 
																data-placement="bottom" 
																title="Cetak"
																name="btnKembali"> 
																<i class="fa fa-print"></i>
														</button>
	
														<input type="hidden" name="nomor" value="'. $row['nomor'] .'">
														<input type="hidden" name="no_reff" value="'. $row['no_reff'] .'">
														<input type="hidden" name="status" value="'.  $row['status'] .'">
														<input type="hidden" name="agunan_id" value="'. $row['agunan_id'] .'">
													</form>
																							
													</td> </tr>'];
													
											
				endforeach;	
			}
			
		}else{
			if(count($searchlist) == 0){
				$data [] = '';
			}else{
				foreach ($searchlist as $row) :
					$data[]    = 	['<tr> <td>'. $row['nomor'] . '</td> <td>'
												. $row['agunan_id']. '</td> <td>'
												. $row['tgl']. '</td> <td>'
												. $row['nama'].'</td> <td>'
												. $row['alamat'] . '</td> <td>'
												. $row['jenis_jaminan']. '</td> <td>'
												. $row['status'].'</td> <td>'
												. $row['deskripsi_ringkas_jaminan'].'</td> <td>'
												. $row['lokasi_penyimpanan'].'</td> <td style="width:250px;">'
												. ' <button type="button" class="btn btn-primary btn-sm btnUpdate" style ="padding-left: 5px;"
															data-nomor="'. $row['nomor'] .'"
															data-noref="'. $row['no_reff'] .'" 
															data-status="'. $row['status'] .'"
															data-agunan="'. $row['agunan_id'] .'"
															data-toggle="tooltip" 
															data-placement="bottom" 
															title="Edit"
															name="btnUpdate"> 
															<i style="padding-left: 5px;" class="fas fa-edit"></i>
													</button>																						
													</td> </tr>'];
													
											
				endforeach;
			}
			
			
		}
			
		//$data['mantap'] = 'mantap';
		echo json_encode($data);
	}
	public function getDataSearchB(){
		$search 	= $this->input->post('search');
		$status     = $this->input->post('status');
		$kode_kantor = $this->input->post('kode_kantor');
		$jenis = $this->input->post('jenis');

		$searchlist = $this->AsetDokumenEntryModel->querySearchB($status,$kode_kantor,$jenis);
		if( $this->session->userdata('menuAset') == '1'){
			if(count($searchlist) == 0){
				$data [] = '';
			}else{
				foreach ($searchlist as $row) :
					$data[]    = 	['<tr> <td>'. $row['nomor'] . '</td> <td>'
												. $row['agunan_id']. '</td> <td>'
												. $row['tgl']. '</td> <td>'
												. $row['nama'].'</td> <td>'
												. $row['alamat'] . '</td> <td>'
												. $row['jenis_jaminan']. '</td> <td>'
												. $row['status'].'</td> <td>'
												. $row['deskripsi_ringkas_jaminan'].'</td> <td>'
												. $row['lokasi_penyimpanan'].'</td> <td style="width:250px;">'
												. ' <button type="button" class="btn btn-primary btn-sm btnUpdate" style ="padding-left: 5px;"
															data-nomor="'. $row['nomor'] .'"
															data-noref="'. $row['no_reff'] .'" 
															data-status="'. $row['status'] .'"
															data-agunan="'. $row['agunan_id'] .'"
															data-toggle="tooltip" 
															data-placement="bottom" 
															title="Edit"
															name="btnUpdate"> 
															<i style="padding-left: 5px;" class="fas fa-edit"></i>
													</button>
													<button type="button" class="btn btn-danger btn-sm btnDelete" style ="padding-left: 5px;"
															data-nomor="'. $row['nomor'] .'"
															data-noref="'. $row['no_reff'] .'" 
															data-status="'. $row['status'] .'"
															data-agunan="'. $row['agunan_id'] .'"
															data-norekening="'. $row['no_rekening'] .'"
															data-verifikasi="'. $row['verifikasi'] .'"
															data-toggle="tooltip" 
															data-placement="bottom" 
															title="Delete"
															name="btnDelete"> 
															<i style ="padding-left: 5px;" class="fa fa-trash"></i>
													</button>
													<button type="button" class="btn btn-warning btn-sm btnPinjam" style ="padding-left: 5px;"
															data-nomor="'. $row['nomor'] .'"
															data-noref="'. $row['no_reff'] .'" 
															data-status="'. $row['status'] .'"
															data-agunan="'. $row['agunan_id'] .'"
															data-toggle="tooltip" 
															data-placement="bottom" 
															title="Peminjaman"
															name="btnPinjam"> 
															<i style ="padding-left: 5px;" class="far fa-hand-point-up"></i>
													</button>
													<button type="button" class="btn btn-success btn-sm btnKembaliDokumen" style ="padding-left: 5px;"
															data-nomor="'. $row['nomor'] .'"
															data-noref="'. $row['no_reff'] .'" 
															data-status="'. $row['status'] .'"
															data-agunan="'. $row['agunan_id'] .'"
															data-toggle="tooltip" 
															data-placement="bottom" 
															title="Pengembalian"
															name="btnKembali"> 
															<i style ="padding-left: 5px;" class="far fa-hand-point-down"></i>
													</button>
													<button type="button" class="btn btn-primary btn-sm btnDueDate" style ="padding-left: 5px;"
															data-nomor="'. $row['nomor'] .'"
															data-noref="'. $row['no_reff'] .'" 
															data-status="'. $row['status'] .'"
															data-agunan="'. $row['agunan_id'] .'"
															data-toggle="tooltip" 
															data-placement="bottom" 
															title="Due Date"
															name="btnKembali"> 
															<i style ="padding-left: 5px;" class="fas fa-stopwatch"></i>
													</button>
	
													<button type="button" class="btn btn-success btn-sm btnPenyerahan" style ="padding-left: 5px;"
														data-nomor="'. $row['nomor'] .'"
														data-noref="'. $row['no_reff'] .'" 
														data-status="'. $row['status'] .'"
														data-agunan="'. $row['agunan_id'] .'"
														data-rekening="'. $row['no_rekening'] .'"
														data-toggle="tooltip" 
														data-placement="bottom" 
														title="Penyerahan"
														name="btnKembali"> 
														<i style ="padding-left: 5px;"  class="fas fa-file-import"></i>
													</button>
	
													<form method="post" target="_blank" style ="display:inline;" action="'.base_url("AsetDokumenCetakController/cetakTransaksiAsetDokumen").'"> 
														<button type="submit" class="btn btn-info btn-sm btnCetaks" 
																data-nomor="'. $row['nomor'] .'"
																data-noref="'. $row['no_reff'] .'" 
																data-status="'. $row['status'] .'"
																data-agunan="'. $row['agunan_id'] .'"
																data-toggle="tooltip" 
																data-placement="bottom" 
																title="Cetak"
																name="btnKembali"> 
																<i class="fa fa-print"></i>
														</button>
	
														<input type="hidden" name="nomor" value="'. $row['nomor'] .'">
														<input type="hidden" name="no_reff" value="'. $row['no_reff'] .'">
														<input type="hidden" name="status" value="'.  $row['status'] .'">
														<input type="hidden" name="agunan_id" value="'. $row['agunan_id'] .'">
													</form>
																							
													</td> </tr>'];
													
											
				endforeach;	
			}
			
		}else{
			if(count($searchlist) == 0){
				$data [] = '';
			}else{
				foreach ($searchlist as $row) :
					$data[]    = 	['<tr> <td>'. $row['nomor'] . '</td> <td>'
												. $row['agunan_id']. '</td> <td>'
												. $row['tgl']. '</td> <td>'
												. $row['nama'].'</td> <td>'
												. $row['alamat'] . '</td> <td>'
												. $row['jenis_jaminan']. '</td> <td>'
												. $row['status'].'</td> <td>'
												. $row['deskripsi_ringkas_jaminan'].'</td> <td>'
												. $row['lokasi_penyimpanan'].'</td> <td style="width:250px;">'
												. ' <button type="button" class="btn btn-primary btn-sm btnUpdate" style ="padding-left: 5px;"
															data-nomor="'. $row['nomor'] .'"
															data-noref="'. $row['no_reff'] .'" 
															data-status="'. $row['status'] .'"
															data-agunan="'. $row['agunan_id'] .'"
															data-toggle="tooltip" 
															data-placement="bottom" 
															title="Edit"
															name="btnUpdate"> 
															<i style="padding-left: 5px;" class="fas fa-edit"></i>
													</button>																						
													</td> </tr>'];
													
											
				endforeach;
			}
			
		}
		echo json_encode($data);
	}
	public function getDataSearchRekening(){
			$search 	= $this->input->post('search');
			$getNomorRek           = $this->AsetDokumenEntryModel->searchNoRek($search);
			if(count($getNomorRek) == 0){
				$data1 [] = '';
			}else{
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
			}
			echo json_encode($data1);
	}

	public function buttonBack(){
		$this->session->unset_tempdata('mainAreaKerja');
		$this->session->unset_tempdata('mainTanggal');
		$this->session->unset_tempdata('mainTransaksi');
		$this->session->unset_tempdata('mainNama');
		$this->session->unset_tempdata('mainKeterangan');
		$this->session->unset_tempdata('mainAlamat');
		$this->session->unset_tempdata('mainKota');
		$this->session->unset_tempdata('mainJenisPengurusan');
		$this->session->unset_tempdata('mainNomorRekening');
		$this->session->unset_tempdata('mainNamaNasabah');
		$this->session->unset_tempdata('mainTanggalRealisasi');
		if($this->session->tempdata('bpkbTglRegister') != ''){
			$this->deleteTempBPKB();
		}
		else if($this->session->tempdata('sertTglRegister') != ''){
			$this->deleteTempSert();
		}
	}

	public function deleteTempEmas(){
			//UNSET EMAS
			$this->session->unset_tempdata('emasAgunanID');
			$this->session->unset_tempdata('emasNoSeri');
			$this->session->unset_tempdata('emasJenisEmas');
			$this->session->unset_tempdata('emasKarat');
			$this->session->unset_tempdata('emasBerat');
			$this->session->unset_tempdata('emasHargaPasar');
			$this->session->unset_tempdata('emasHargaTaksasi');
	
			$this->session->unset_tempdata('emasSIDNamaPemilikAgunan');
			$this->session->unset_tempdata('emasSIDStatus');
			$this->session->unset_tempdata('emasSIDAlamat');
			$this->session->unset_tempdata('emasSIDNJOP');
			$this->session->unset_tempdata('emasSIDBank');
			$this->session->unset_tempdata('emasSIDNilaiIndependen');
			$this->session->unset_tempdata('emasSIDNamaIndependen');
			$this->session->unset_tempdata('emasSIDTglPenilaian');
			$this->session->unset_tempdata('emasSIDParipasu');
			$this->session->unset_tempdata('emasSIDAsuransi');
			$data1['sukses'] = 'sukses';
			echo json_encode($data1);
	}
	public function deleteTempSert(){
		//// UNSET SESSION /////
		$this->session->unset_tempdata('sertAgunanID');
		$this->session->unset_tempdata('sertTglRegister'); 
		$this->session->unset_tempdata('sertTglPenilaian'); 
		$this->session->unset_tempdata('sertKantorLokasi'); 
		$this->session->unset_tempdata('sertKodeJenisAgunan');
		$this->session->unset_tempdata('sertKodeIkatanAgunan');    
		$this->session->unset_tempdata('sertNilaiTaksasiAgunan');  
		$this->session->unset_tempdata('sertNJOP');    
		$this->session->unset_tempdata('sertHargaPasar');
		$this->session->unset_tempdata('sertAPHT'); 
		$this->session->unset_tempdata('sertPersenDijamin');
		// DATA SERTIFIKAT
		$this->session->unset_tempdata('sertAgunanID');
		$this->session->unset_tempdata('sertID');
		$this->session->unset_tempdata('sertNoSert');
		$this->session->unset_tempdata('sertKOHIR');
		$this->session->unset_tempdata('sertJenisSertifikat');
		$this->session->unset_tempdata('sertNoPERSIL');
		$this->session->unset_tempdata('sertTanggalSertifikat');
		$this->session->unset_tempdata('sertJTSHGB');
		$this->session->unset_tempdata('sertNoSuratUkur');
		$this->session->unset_tempdata('sertPLBangunan');
		$this->session->unset_tempdata('sertLuasTanah');
		$this->session->unset_tempdata('sertNamaPPAT');
		$this->session->unset_tempdata('sertNamaPemilik');
		$this->session->unset_tempdata('sertAlamatSertifikat');
		$this->session->unset_tempdata('sertKelurahan');
		$this->session->unset_tempdata('sertKecamatan');
		$this->session->unset_tempdata('sertKota');
		$this->session->unset_tempdata('sertPorpinsi');
		$this->session->unset_tempdata('sertBatasTanah');
		// DATA LAMPIRAN
		$this->session->unset_tempdata('sertDokAJB');
		$this->session->unset_tempdata('sertNomorAJB');
		$this->session->unset_tempdata('sertTanggalAJB');
		$this->session->unset_tempdata('sertDokIMB');
		$this->session->unset_tempdata('sertNomorIMB');
		$this->session->unset_tempdata('sertDokSPPT');
		$this->session->unset_tempdata('sertNomorSPPT');
		$this->session->unset_tempdata('sertTahunSPPT');
		$this->session->unset_tempdata('sertDokSKHMT');
		$this->session->unset_tempdata('sertDokDenah');
		$this->session->unset_tempdata('sertDokRoya');
		$this->session->unset_tempdata('sertDokSHT');
		$this->session->unset_tempdata('sertNoSHT');
		$this->session->unset_tempdata('sertPropinsiSHT');
		$this->session->unset_tempdata('sertKotaSHT');
		$this->session->unset_tempdata('sertDokSTTS');
		$this->session->unset_tempdata('sertTahunSTTS');
		$this->session->unset_tempdata('sertDokSSB');
		$this->session->unset_tempdata('sertAtasNamaSSBBPHTB');
		$this->session->unset_tempdata('sertLainnya');
		///check BOX
		$this->session->unset_tempdata('ajb');
		$this->session->unset_tempdata('imb');
		$this->session->unset_tempdata('sppt');
		$this->session->unset_tempdata('skmht');
		$this->session->unset_tempdata('denah');
		$this->session->unset_tempdata('roya');
		$this->session->unset_tempdata('sht');
		$this->session->unset_tempdata('stts');
		$this->session->unset_tempdata('ssb_bpht');
		///end check box///
		// DATA SLIK
		$this->session->unset_tempdata('sertSlikStatusAgunan');
		$this->session->unset_tempdata('sertSlikJenisAgunan');
		$this->session->unset_tempdata('sertSlikPeringkatAgunan');
		$this->session->unset_tempdata('sertSlikLembagaPemeringkat');
		$this->session->unset_tempdata('sertSlikJenisPengikatan');
		$this->session->unset_tempdata('sertSlikTanggalPengikatan');
		$this->session->unset_tempdata('sertSlikNamaPemilikAgunan');
		$this->session->unset_tempdata('sertSlikBuktiKepemilikanAgunan');
		$this->session->unset_tempdata('sertSlikAlamat');
		$this->session->unset_tempdata('sertSlikKodeDati2');
		$this->session->unset_tempdata('sertSlikNilaiNJOP');
		$this->session->unset_tempdata('sertSlikNilaiLJK');
		$this->session->unset_tempdata('sertSlikTanggalLJK');
		$this->session->unset_tempdata('sertSlikNilaiIndependen');
		$this->session->unset_tempdata('sertSlikTglIndependen');
		$this->session->unset_tempdata('sertSlikNamaIndependen');
		$this->session->unset_tempdata('sertSlikKeterangan');
		$this->session->unset_tempdata('sertSlikParipasu');
		$this->session->unset_tempdata('sertSlikParipasuPersen');
		$this->session->unset_tempdata('sertSLikStatusJoinAccount');
		$this->session->unset_tempdata('sertSlikAsuransi');
		/// END FORM TAMBAH SERTIFIKAT ///
		$data1['sukses'] = 'sukses';
		echo json_encode($data1);
	}
	public function deleteTempBPKB(){
		

		// UNSET SESISON DATA

		$this->session->unset_tempdata('bpkbTglRegister');
		$this->session->unset_tempdata('bpkbTglPenilaian');
		$this->session->unset_tempdata('bpkbKantorLokasi');
		$this->session->unset_tempdata('bpkbKodeJenisAgunan');
		$this->session->unset_tempdata('bpkbKodeIkatanAgunan');
		$this->session->unset_tempdata('bpkbNilaiTaksasiAgunan');
		$this->session->unset_tempdata('bpkbNJOP');
		$this->session->unset_tempdata('bpkbHargaPasar');
		$this->session->unset_tempdata('bpkbAPHT');
		$this->session->unset_tempdata('bpkbPersenDijamin');

		$this->session->unset_tempdata('bpkbAgunanID');
		$this->session->unset_tempdata('bpkbNoBPKB');
		$this->session->unset_tempdata('bpkbNamaPemilik');
		$this->session->unset_tempdata('bpkbAlamatPemlik');
		$this->session->unset_tempdata('bpkbKotaPemilik');
		$this->session->unset_tempdata('bpkbMerk');
		$this->session->unset_tempdata('bpkbType');
		$this->session->unset_tempdata('bpkbJenis');
		$this->session->unset_tempdata('bpkbSilinder');
		$this->session->unset_tempdata('bpkbNoRangka');
		$this->session->unset_tempdata('bpkbNoMesin');
		$this->session->unset_tempdata('bpkbTahun');
		$this->session->unset_tempdata('bpkbWarna');
		$this->session->unset_tempdata('bpkbTglExpPajak');
		$this->session->unset_tempdata('bpkbNoPolisi');
		$this->session->unset_tempdata('bpkbTglExpSTNK');
		$this->session->unset_tempdata('bpkbNoSTNK');

		$this->session->unset_tempdata('bpkbDokKwitansiBlanko');
		$this->session->unset_tempdata('bpkbDokFakturPemilik');
		$this->session->unset_tempdata('bpkbDokKwJualBeli');
		$this->session->unset_tempdata('bpkbDokSKTrayek');
		$this->session->unset_tempdata('blanko');
		$this->session->unset_tempdata('faktur_pemilik');
		$this->session->unset_tempdata('kwitansi_jb');
		$this->session->unset_tempdata('sk_trayek');
		$this->session->unset_tempdata('bpkbNoFakturPemilik');
		$this->session->unset_tempdata('noSKTrayek');
		$this->session->unset_tempdata('bpkbBerlakuSD');
		$this->session->unset_tempdata('bpkbLainnya');

		$this->session->unset_tempdata('bpkbSIDJenisAgunan');
		$this->session->unset_tempdata('bpkbSIDPengikatSurat');
		$this->session->unset_tempdata('bpkbSIDJenisPengikatan');
		$this->session->unset_tempdata('bpkbSIDNamaPemilikAgunan');
		$this->session->unset_tempdata('bpkbSIDStatusBuktiKepemilikan');
		$this->session->unset_tempdata('bpkbSIDAlamat');
		$this->session->unset_tempdata('bpkbSIDLokasi');
		$this->session->unset_tempdata('bpkbSIDNJOP');
		$this->session->unset_tempdata('nilaiSIDAgunanBank');
		$this->session->unset_tempdata('bpkbSIDNilaiIndependen');
		$this->session->unset_tempdata('bpkbSIDNamaIndependen');
		$this->session->unset_tempdata('bpkbSIDParipasu');
		$this->session->unset_tempdata('bpkbSIDAsuransi');

		// DATA SLIK
		$this->session->unset_tempdata('sertSlikStatusAgunan');
		$this->session->unset_tempdata('sertSlikJenisAgunan');
		$this->session->unset_tempdata('sertSlikPeringkatAgunan');
		$this->session->unset_tempdata('sertSlikLembagaPemeringkat');
		$this->session->unset_tempdata('sertSlikJenisPengikatan');
		$this->session->unset_tempdata('sertSlikTanggalPengikatan');
		$this->session->unset_tempdata('sertSlikNamaPemilikAgunan');
		$this->session->unset_tempdata('sertSlikBuktiKepemilikanAgunan');
		$this->session->unset_tempdata('sertSlikAlamat');
		$this->session->unset_tempdata('sertSlikKodeDati2');
		$this->session->unset_tempdata('sertSlikNilaiNJOP');
		$this->session->unset_tempdata('sertSlikNilaiLJK');
		$this->session->unset_tempdata('sertSlikTanggalLJK');
		$this->session->unset_tempdata('sertSlikNilaiIndependen');
		$this->session->unset_tempdata('sertSlikTglIndependen');
		$this->session->unset_tempdata('sertSlikNamaIndependen');
		$this->session->unset_tempdata('sertSlikKeterangan');
		$this->session->unset_tempdata('sertSlikParipasu');
		$this->session->unset_tempdata('sertSlikParipasuPersen');
		$this->session->unset_tempdata('sertSLikStatusJoinAccount');
		$this->session->unset_tempdata('sertSlikAsuransi');

	

		$data1['sukses'] = 'sukses';
		echo json_encode($data1); 
	}
	public function getTypeKend(){
		$merk = $this->input->post('merk'); 
		$data['typeKend'] = $this->AsetDokumenEntryModel->getTypeKend2($merk);
		$data['test'] = 'test';
		echo json_encode($data);
	}
	
}
	

	

	

