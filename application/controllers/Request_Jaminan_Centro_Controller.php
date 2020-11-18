<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Request_Jaminan_Centro_Controller extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('CustodianModel/Request_Jaminan_Centro_Model');
       
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
            $data['getCentro'] = $this->Request_Jaminan_Centro_Model->getCentro();
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
		

		$getJaminanDokumen = $this->Request_Jaminan_Centro_Model->getJaminanDokumen($kode_kantor);
		foreach ($getJaminanDokumen as $row) :	
			
			$data[]    = ['<tr> <td>'. $row['no_reff'] . '</td> <td>'
						. $row['agunan_id']. '</td> <td>'
						. $row['deskripsi_ringkas'].'</td> <td>'
						. $row['no_rekening_agunan'].'</td> <td>'										
						. $row['verifikasi'].'</td> <td>'
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
							. $row['verifikasi'].'</td> <td>'
							. '<button type="button" class="btn btn-success btn-sm btnPilihJaminan" style ="padding-left: 5px;"
										data-nomorreff="'.$row['no_reff'].'"
										data-agunanid="'.$row['agunan_id'].'"
										name="btnPilihJaminan"> 
										<i style="padding-left: 5px;" class="fa fa-check"></i>
								</button>  </td> </tr>'];
											
									
		endforeach;	

		echo json_encode($data);		
	}
}
