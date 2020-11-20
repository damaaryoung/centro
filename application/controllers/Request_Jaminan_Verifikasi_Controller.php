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
														</form>
												</div> </td></tr>'];
												
										
			endforeach;
		}
		
		
		echo json_encode($data);
	}

	public function prosesVerifikasiMain()
	{
		$session = $this->session->userdata('nama');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){ 
			$data['selectKodeKantor'] = $this->Request_Jaminan_Verifikasi_Model->selectKodeKantor();
			$this->load->view('ViewCustodian/request_jaminan_verifikasi_proses.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}

}
