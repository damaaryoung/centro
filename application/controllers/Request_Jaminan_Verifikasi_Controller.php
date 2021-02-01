<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Request_Jaminan_Verifikasi_Controller extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('CustodianModel/Request_Jaminan_Verifikasi_Model');
       
	}

	public function index()
	{
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
			$data['selectKodeKantor'] = $this->Request_Jaminan_Verifikasi_Model->selectKodeKantor();
			$this->load->view('ViewCustodian/request_jaminan_verifikasi.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function getListRequest(){
		$proses 	= $this->input->post('proses');

		if($proses == 'getAwal'){
			$kode_kantor = $this->session->userdata('kd_cabang');
			$list_request_jaminan = $this->Request_Jaminan_Verifikasi_Model->list_request_jaminan($kode_kantor);
	
			foreach ($list_request_jaminan as $row) :
				$data[]    = 	['<tr> <td>'
											. $row['nomor'] . '</td> <td>'
											. $row['tgl']. '</td> <td>'
											. $row['nama_kantor_asal']. '</td> <td>'
											. $row['nama_kantor_tujuan'].'</td> <td>'
											. $row['verifikasi'].'</td> <td>'
											. '<div>
														<form method="post" action="'. base_url("Request_Jaminan_Verifikasi_Controller/prosesVerifikasiMain").'">
															<button type="submit" class="btn btn-success btn-sm"> <i class="fas fa-check"></i></button>       
															<input type="hidden" name="userId" value="'.$row['user_id'].'">   
															<input type="hidden" name="tblNomor" value="'.$row['nomor'].'">               
														</form>
												</div> </td></tr>'];
												
										
			endforeach;	
		

		} else if($proses == 'searchData'){
			$search      = $this->input->post('search');
			$kode_kantor = $this->input->post('kode_kantor');
			$listJaminanSearch = $this->Request_Jaminan_Verifikasi_Model->listJaminanSearch($search,$kode_kantor);
	
			foreach ($listJaminanSearch as $row) :
				$data[]    = 	['<tr> <td>'
											. $row['nomor'] . '</td> <td>'
											. $row['tgl']. '</td> <td>'
											. $row['nama_kantor_asal']. '</td> <td>'
											. $row['nama_kantor_tujuan'].'</td> <td>'
											. $row['verifikasi'].'</td> <td>'
											. '<div>
														<form method="post" action="'. base_url("Request_Jaminan_Verifikasi_Controller/prosesVerifikasiMain").'">
															<button type="submit" class="btn btn-success btn-sm"> <i class="fas fa-check"></i></button>       
															<input type="hidden" name="userId" value="'.$row['user_id'].'">   
															<input type="hidden" name="tblNomor" value="'.$row['nomor'].'">           
														</form>
												</div> </td></tr>'];
												
										
			endforeach;
		}
		
		
		echo json_encode($data);
	}


	/// begin page vefrifikasi
	public function prosesVerifikasiMain(){
		$session = $this->session->userdata('nama');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){ 
			$tblNomor          = $this->input->post('tblNomor');
			$data['getNomor']  = $this->input->post('tblNomor');
			$data['selectKodeKantor'] = $this->Request_Jaminan_Verifikasi_Model->selectKodeKantor();
			$getJaminanPemindahanHeader = $this->Request_Jaminan_Verifikasi_Model->getJaminanPemindahanHeader($tblNomor);
			foreach ($getJaminanPemindahanHeader as $row) :
				$data['nomor'] =  $row['nomor'];
				$data['tgl'] =  $row['tgl'];
				$data['kode_kantor_lokasi_jaminan'] =  $row['kode_kantor_lokasi_jaminan'];
				$data['kode_kantor_tujuan'] =  $row['kode_kantor_tujuan'];
				$data['ket'] =  $row['ket'];
				$data['keperluan'] =  $row['keperluan'];
				$data['verifikasi'] =  $row['verifikasi'];
				$data['kode_custodian'] =  $row['kode_custodian']; 
				$data['pic_request_pemindahan'] =  $row['pic_request_pemindahan'];  
			endforeach;	
			$this->load->view('ViewCustodian/request_jaminan_verifikasi_proses.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function getDataDetail(){
        
		$dataNomor                    = $this->input->post('dataNomor');
		$getPemindahanJaminanDetail   = $this->Request_Jaminan_Verifikasi_Model->getPemindahanJaminanDetail($dataNomor);
		
		foreach ($getPemindahanJaminanDetail as $row) :
			$data[]    = ['<tr> <td>'. $row['no_reff'] . '</td> <td>'
										. $row['agunan_id'] . '</td> <td>'
										. $row['jenis'] .'</td> <td>'
										. $row['deskripsi_ringkas'] .'</td></tr>',$row['no_reff'], $row['agunan_id']];

		endforeach;	
		echo json_encode($data);
	}
	public function prosesVerifikasi(){
		$kode_kantor = $this->session->userdata('kd_cabang');
		$userIdLogin = $this->session->userdata('userIdLogin');

		$main_nomor                 = $this->input->post('main_nomor');
		$main_tanggal               = $this->input->post('main_tanggal');
		$kode_custodian             = $this->input->post('kode_custodian');
		$kode_kantor_tujuan         = $this->session->userdata('kd_cabang');
		$kode_kantor_lokasi_jaminan = $this->input->post('kode_kantor_lokasi_jaminan');
		$main_keperluan             = $this->input->post('main_keperluan');
		$main_keterangan            = $this->input->post('main_keterangan');
		$mainVerifikasi		        = $this->input->post('mainVerifikasi');
		$parsedDataDetailArr        = $this->input->post('parsedDataDetailArr');
		$lengthParsed               = $this->input->post('lengthParsed');
		$main_pic                   = $this->input->post('main_pic');
		
		$data['kode_kantor']                = $this->session->userdata('kd_cabang');
		$data['main_nomor']                 = $this->input->post('main_nomor');
		$data['main_tanggal']               = $this->input->post('main_tanggal');
		$data['kode_custodian']             = $this->input->post('kode_custodian');
		$data['kode_kantor_tujuan']         = $this->session->userdata('kd_cabang');
		$data['kode_kantor_lokasi_jaminan'] = $this->input->post('kode_kantor_lokasi_jaminan');
		$data['main_keperluan']             = $this->input->post('main_keperluan');
		$data['main_keterangan']            = $this->input->post('main_keterangan');
		$data['mainVerifikasi']             = $this->input->post('mainVerifikasi');
		$data['parsedDataDetailArr']        = $this->input->post('parsedDataDetailArr');
		$data['lengthParsed']               = $this->input->post('lengthParsed');
		$data['main_pic']                   = $this->input->post('main_pic');

		

		$this->Request_Jaminan_Verifikasi_Model->verifikasieDataPemindahan($main_nomor,                 
																				$main_tanggal,               
																				$kode_custodian,             
																				$kode_kantor_tujuan,         
																				$kode_kantor_lokasi_jaminan, 
																				$main_keperluan,             
																				$main_keterangan,            
																				$mainVerifikasi,		        
																				$parsedDataDetailArr,      
																				$lengthParsed);  
		
		$email_to = $this->Request_Jaminan_Verifikasi_Model->getEmailKaops($kode_kantor_tujuan);
		$email = $this->load->view('ViewCustodian/Cetak/email_verifikasi.php', $data, TRUE);

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

	//cetak verifikasi dokument

	public function cetakProses(){
        $session            = $this->session->userdata('nama');
		$kode_kantor        = $this->session->userdata('kd_cabang');
		$nomorCetak         = $this->input->post('nomorCetak');

		$data['nomorCetak'] = $this->input->post('nomorCetak');
		
		$getJaminanPemindahanHeaderCetak = $this->Request_Jaminan_Verifikasi_Model->getJaminanPemindahanHeaderCetak($nomorCetak);
		foreach ($getJaminanPemindahanHeaderCetak as $row) :
			$data['nomor'] =  $row['nomor'];
			$data['tgl'] =  $row['tgl'];
            $data['kode_kantor_lokasi_jaminan'] =  $row['kode_kantor_lokasi_jaminan'];
            $data['nama_kantor_lokasi_jaminan'] =  $row['nama_kantor_lokasi_jaminan'];
            $data['kode_kantor_tujuan'] =  $row['kode_kantor_tujuan'];
            $data['nama_kantor_tujuan'] =  $row['nama_kantor_tujuan'];
			$data['ket'] =  $row['ket'];
			$data['keperluan'] =  $row['keperluan'];
			$data['kode_custodian'] =  $row['kode_custodian'];
			$data['verifikasi'] =  $row['verifikasi'];
			$data['lokasi_penyimpanan'] =  $row['lokasi_penyimpanan'];
        endforeach;	
        $getAlamatHeader = $this->Request_Jaminan_Verifikasi_Model->getAlamatHeader();
		foreach ($getAlamatHeader as $row) :
            $data['alamatHeader']         = $row["hasil"];
        endforeach;	

        
        $data['getPemindahanJaminanCetak']   = $this->Request_Jaminan_Verifikasi_Model->getPemindahanJaminanCetak($nomorCetak);
        $cetak = $this->load->view('ViewCustodian/Cetak/print_verifikasi.php', $data, TRUE);

        		
        // Require composer autoload
        require_once("vendor/autoload.php");
        // Create an instance of the class:
        $mpdf = new \Mpdf\Mpdf();
        // Write some HTML code:
        $mpdf->WriteHTML($cetak);
        // Output a PDF file directly to the browser
        ob_clean();
        $mpdf->Output();
		
	}


}
