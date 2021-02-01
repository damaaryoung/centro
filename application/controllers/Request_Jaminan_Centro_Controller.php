<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Request_Jaminan_Centro_Controller extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('CustodianModel/Request_Jaminan_Centro_Model');
       
	}

	public function index(){
		$session = $this->session->userdata('nama');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){ 
			$data['kode_kantor'] = $this->session->userdata('kd_cabang');
			$data['divisi_id']   = $this->session->userdata('divisi_id');
			$data['selectKodeKantor'] = $this->Request_Jaminan_Centro_Model->selectKodeKantor();
			$this->load->view('ViewCustodian/request_jaminan_main.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}

	public function getListRequest(){
		$proses 	= $this->input->post('proses');

		if($proses == 'getAwal'){
			$kode_kantor = $this->session->userdata('kd_cabang');
			$list_request_jaminan = $this->Request_Jaminan_Centro_Model->list_request_jaminan($kode_kantor);
			if(count($list_request_jaminan) == 0){
				$data [] = '';
				
			}else{
				foreach ($list_request_jaminan as $row) :
					$data[]    = 	['<tr> <td>'
												. $row['nomor'] . '</td> <td>'
												. $row['tgl']. '</td> <td>'
												. $row['nama_kantor_asal']. '</td> <td>'
												. $row['nama_kantor_tujuan'].'</td> <td>'
												. $row['verifikasi'].'</td> <td>'
												. '<div class="form-inline">
															<form method="post" action="'. base_url("Request_Jaminan_Update_Controller/index").'">
																<button type="submit" 
																	class="btn btn-primary btn-sm" 
																	data-toggle="tooltip" 
																	data-placement="bottom" 
																	title="Edit"> 
																		<i class="far fa-edit"></i>
																</button>       
																<input type="hidden" name="tblNomor" value="'.$row['nomor'].'">            
															</form>
															<div style ="padding-left: 5px;">
																<button type="button" class="btn btn-danger btn-sm btnDeleteRequestJaminan" style ="padding-left: 5px;"
																			data-id="'.$row['id'].'"
																			data-nomor="'.$row['nomor'].'" 
																			data-verifikasi="'.$row['verifikasi'].'" 
																			data-toggle="tooltip" 
																			data-placement="bottom" 
																			title="Delete"
																			name="btnDeleteRequestJaminan"> 
																			<i style="padding-left: 5px;" class="fa fa-trash"></i> 
																</button>  
															</div>
													</div> </td></tr>'];
													
											
				endforeach;	
			}
			
		

		} else if($proses == 'searchData'){
			$search      = $this->input->post('search');
			$kode_kantor = $this->input->post('kode_kantor');
			$listJaminanSearch = $this->Request_Jaminan_Centro_Model->listJaminanSearch($search,$kode_kantor);
	
			foreach ($listJaminanSearch as $row) :
				$data[]    = 	['<tr> <td>'
											. $row['nomor'] . '</td> <td>'
											. $row['tgl']. '</td> <td>'
											. $row['nama_kantor_asal']. '</td> <td>'
											. $row['nama_kantor_tujuan'].'</td> <td>'
											. $row['verifikasi'].'</td> <td>'
											. '<div class="form-inline">
														<form method="post" action="'. base_url("Request_Jaminan_Update_Controller/index").'">
															<button type="submit" 
																class="btn btn-primary btn-sm" 
																data-toggle="tooltip" 
																data-placement="bottom" 
																title="Edit"> 
																	<i class="far fa-edit"></i>
															</button>       
															<input type="hidden" name="tblNomor" value="'.$row['nomor'].'">            
														</form>
														<div style ="padding-left: 5px;">
															<button type="button" class="btn btn-danger btn-sm btnDeleteRequestJaminan" style ="padding-left: 5px;"
																		data-id="'.$row['id'].'"
																		data-nomor="'.$row['nomor'].'" 
																		data-verifikasi="'.$row['verifikasi'].'" 
																		data-toggle="tooltip" 
																		data-placement="bottom" 
																		title="Delete"
																		name="btnDeleteRequestJaminan"> 
																		<i style="padding-left: 5px;" class="fa fa-trash"></i> 
															</button>  
														</div>
												</div> </td></tr>'];
												
										
			endforeach;
		}
		
		
		echo json_encode($data);
	}

	// tambah

	public function transaksiRequestJaminan(){
		$session = $this->session->userdata('nama');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){ 
			$data['getCentro'] = $this->Request_Jaminan_Centro_Model->getCentro();
			$data['selectKodeKantor'] = $this->Request_Jaminan_Centro_Model->selectKodeKantor();
            $sysdate = $this->Request_Jaminan_Centro_Model->sysdate();
			foreach ($sysdate as $row) :
				$data['sysdate'] = $row['sysdate'];		
			endforeach;
			$this->load->view('ViewCustodian/request_jaminan_centro.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}

	public function getMasterJaminan(){
        $session = $this->session->userdata('nama');
		$kode_kantor = $this->session->userdata('kd_cabang');
		$kode_kantor_lokasi_jaminan = $this->input->post('kode_kantor_lokasi_jaminan');
		

		$getJaminanDokumen = $this->Request_Jaminan_Centro_Model->getJaminanDokumen($kode_kantor, $kode_kantor_lokasi_jaminan);
		foreach ($getJaminanDokumen as $row) :	
			
			$data[]    = ['<tr> <td>'. $row['no_reff'] . '</td> <td>'
						. $row['agunan_id']. '</td> <td>'
						. $row['deskripsi_ringkas'].'</td> <td>'
						. $row['no_rekening_agunan'].'</td> <td>'										
						. $row['kode_kantor'].'</td> <td>'
						. $row['kode_kantor_lokasi_jaminan'].'</td> <td>'
						. $row['lokasi_penyimpanan'].'</td> <td>'
						. '<button type="button" class="btn btn-success btn-sm btnPilihJaminan" style ="padding-left: 5px;"
									data-nomorreff="'.$row['no_reff'].'"
									data-agunanid="'.$row['agunan_id'].'"
									data-jenis="'.$row['jenis'].'"
									data-deskripsi="'.$row['deskripsi_ringkas'].'"
									name="btnPilihJaminan"> 
									<i style="padding-left: 5px;" class="fa fa-check"></i>
							</button>  </td> </tr>'];
											
									
		endforeach;	

		echo json_encode($data);
		
	}

	public function getMasterJaminanSearch(){
        $session = $this->session->userdata('nama');
		$kode_kantor = $this->session->userdata('kd_cabang');
		$search = $this->input->post('search');
		

		$getSearchJaminanDokumen = $this->Request_Jaminan_Centro_Model->getSearchJaminanDokumen($kode_kantor,$search);
		
		foreach ($getSearchJaminanDokumen as $row) :
			
			$data[]    = 	['<tr> <td>'. $row['no_reff'] . '</td> <td>'
							. $row['agunan_id']. '</td> <td>'
							. $row['deskripsi_ringkas'].'</td> <td>'
							. $row['no_rekening_agunan'].'</td> <td>'										
							. $row['kode_kantor'].'</td> <td>'
							. $row['kode_kantor_lokasi_jaminan'].'</td> <td>'
							. $row['lokasi_penyimpanan'].'</td> <td>'
							. '<button type="button" class="btn btn-success btn-sm btnPilihJaminan" style ="padding-left: 5px;"
										data-nomorreff="'.$row['no_reff'].'"
										data-agunanid="'.$row['agunan_id'].'"
										data-jenis="'.$row['jenis'].'"
										data-deskripsi="'.$row['deskripsi_ringkas'].'"
										name="btnPilihJaminan"> 
										<i style="padding-left: 5px;" class="fa fa-check"></i>
								</button>  </td> </tr>'];
											
									
		endforeach;	

		echo json_encode($data);		
	}

	public function insertDataPemindahan(){
		$kode_kantor_tujuan = $this->session->userdata('kd_cabang');
		$userIdLogin        = $this->session->userdata('userIdLogin');
		$hasilNomor         = '';

		
		$main_tanggal               = $this->input->post('main_tanggal');
		$kode_custodian             = $this->input->post('kode_custodian');
		$kode_kantor_lokasi_jaminan = $this->input->post('kode_kantor_lokasi_jaminan');
		$main_keperluan             = $this->input->post('main_keperluan');
		$main_keterangan            = $this->input->post('main_keterangan');
		$parsedDataDetailArr        = $this->input->post('parsedDataDetailArr');
		$lengthParsed               = $this->input->post('lengthParsed');
		$main_pic					= $this->input->post('main_pic');
		$verifikasi				    = '0';
		
		$data['kode_kantor']                = $this->session->userdata('kd_cabang');
		$data['main_tanggal']               = $main_tanggal;
		$data['kode_custodian']             = $kode_custodian; 
		$data['kode_kantor_lokasi_jaminan'] = $kode_kantor_lokasi_jaminan;
		$data['main_keperluan']             = $main_keperluan;
		$data['main_keterangan']            = $main_keterangan;
		$data['parsedDataDetailArr']        = $parsedDataDetailArr;
		$data['lengthParsed']               = $lengthParsed;
		$data['main_pic']                   = $main_pic;
		$data['verifikasi']                 = $verifikasi;

		$data['kode_kantor_tujuan'] = $kode_kantor_tujuan;

		$generateNomor = $this->Request_Jaminan_Centro_Model->generateNomor($kode_kantor_tujuan);
		foreach ($generateNomor as $row) :
			$hasilNomor = $row['hasil'];		
		endforeach;	
		if($hasilNomor != null){
			$nomor = $hasilNomor;
		}else{
			$nomor = $kode_kantor_tujuan . '.000001';
		}

		$this->Request_Jaminan_Centro_Model->insertDataPemindahan($main_tanggal,
															$nomor,
															$kode_kantor_lokasi_jaminan,
															$kode_kantor_tujuan,
															$main_keterangan,
															$main_keperluan,
															$userIdLogin,
															$verifikasi,
															$kode_custodian,
															$main_pic);

		for($i = 0; $i < $lengthParsed; $i++){
			$nomorReffDeatail = $parsedDataDetailArr[$i][0];
			$agunanIdDetail   = $parsedDataDetailArr[$i][1];
			
			$this->Request_Jaminan_Centro_Model->insertDataPemindahanDetail($nomor,$nomorReffDeatail,$agunanIdDetail);
			
		}

		$email_to = $this->Request_Jaminan_Centro_Model->getEmailCentro($kode_custodian);
		$email = $this->load->view('ViewCustodian/Cetak/email_request.php', $data, TRUE);

		$email = array(
			'subyek' => 'Permintaan Aset Jaminan',
			'tujuan' => $email_to,
			'cc' => 'staf_tisupport@kreditmandiri.co.id',
			'pesan' => $email
			// 'attach1' => $req->file('attach1')
		);
		require_once("vendor/autoload.php");
		$client = new \GuzzleHttp\Client();
		$request = $client->request('POST', 'http://103.31.232.149:3838/email',  [
			'Content-type' => 'application/x-www-form-urlencoded',
			'form_params'          => $email
		]);
		$response = $request->getBody()->getContents();
		$sendEmail = json_decode($response, true);

		echo json_encode($data);
	
		
	}

	// delete
	public function deleteDataPemindahanLokasi(){
        $version      = $this->session->userdata('version');
		$nomor        = $this->input->post('nomor');
		$usename      = $this->session->userdata('usename');
		$kode_kantor  = $this->session->userdata('kd_cabang');
		
		$data['nomor']   = $this->input->post('nomor');
		$data['version'] = $this->session->userdata('version');
		$data['usename'] = $this->session->userdata('usename');
		
		$this->Request_Jaminan_Centro_Model->deleteDataPemindahan($nomor,$version,$usename,$kode_kantor);
		

		echo json_encode($data);
	}



}
