<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Request_Jaminan_Update_Controller extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('CustodianModel/Request_Jaminan_Update_Model');
       
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
			$tblNomor          = $this->input->post('tblNomor');
			$data['getNomor']  = $this->input->post('tblNomor');
			$data['getCentro'] = $this->Request_Jaminan_Update_Model->getCentro();
			$data['selectKodeKantor'] = $this->Request_Jaminan_Update_Model->selectKodeKantor();
			$getJaminanPemindahanHeader = $this->Request_Jaminan_Update_Model->getJaminanPemindahanHeader($tblNomor);
			foreach ($getJaminanPemindahanHeader as $row) :
				$data['nomor'] =  $row['nomor'];
				$data['tgl'] =  $row['tgl'];
				$data['kode_kantor_lokasi_jaminan'] =  $row['kode_kantor_lokasi_jaminan'];
				$data['kode_kantor_tujuan'] =  $row['kode_kantor_tujuan'];
				$data['ket'] =  $row['ket'];
				$data['keperluan'] =  $row['keperluan'];
				$data['verifikasi'] =  $row['verifikasi'];
				$data['kode_custodian'] =  $row['kode_custodian'];
			endforeach;	
			$this->load->view('ViewCustodian/request_jaminan_update_centro.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}

	public function getDataDetail(){
        
		$dataNomor                    = $this->input->post('dataNomor');
		$getPemindahanJaminanDetail   = $this->Request_Jaminan_Update_Model->getPemindahanJaminanDetail($dataNomor);
		
		foreach ($getPemindahanJaminanDetail as $row) :
			$data[]    = ['<tr> <td>'. $row['no_reff'] . '</td> <td>'
										. $row['agunan_id'] . '</td> <td>'
										. $row['jenis'] .'</td> <td>'
										. $row['deskripsi_ringkas'] .'</td> <td>'
										. '<button type="button" class="btn btn-danger btn-sm btnDeleteJaminanData" style ="padding-left: 5px;"'
										.           'data-nomorreff="'.$row['no_reff'].'"'
										.           'data-agunanid="'.$row['agunan_id'] .'"'
										.           'data-jenis="'. $row['jenis'] .'"'
										.           'data-deskripsi="'.$row['deskripsi_ringkas'].'"'
										.           'name="btnDeleteJaminanData">' 
										.           '<i style="padding-left: 5px;" class="fa fa-trash"></i> </button>  </td> </tr>',$row['no_reff'], $row['agunan_id']];

		endforeach;	
		echo json_encode($data);
	}

	public function updatePemindahanLokasiJaminan(){
		$kode_kantor = $this->session->userdata('kd_cabang');
		$kode_kantor_tujuan = $this->session->userdata('kd_cabang');
		$userIdLogin = $this->session->userdata('userIdLogin');

		$main_nomor                 = $this->input->post('main_nomor');	
		$main_tanggal               = $this->input->post('main_tanggal');
		$kode_custodian             = $this->input->post('kode_custodian');
		$kode_kantor_lokasi_jaminan = $this->input->post('kode_kantor_lokasi_jaminan');
		$main_keperluan             = $this->input->post('main_keperluan');
		$main_keterangan            = $this->input->post('main_keterangan');
		$parsedDataDetailArr        = $this->input->post('parsedDataDetailArr');
		$lengthParsed               = $this->input->post('lengthParsed');
		
		$data['main_nomor']                 = $this->input->post('main_nomor');
		$data['kode_kantor']                = $this->session->userdata('kd_cabang');
		$data['main_tanggal']               = $this->input->post('main_tanggal');
		$data['kode_custodian']             = $this->input->post('kode_custodian');
		$data['kode_kantor_tujuan']         = $this->session->userdata('kd_cabang');
		$data['kode_kantor_lokasi_jaminan'] = $this->input->post('kode_kantor_lokasi_jaminan');
		$data['main_keperluan']             = $this->input->post('main_keperluan');
		$data['main_keterangan']            = $this->input->post('main_keterangan');
		$data['parsedDataDetailArr']        = $this->input->post('parsedDataDetailArr');
		$data['lengthParsed']               = $this->input->post('lengthParsed');
		


		$this->Request_Jaminan_Update_Model->updateDataRequestPemindahan($main_tanggal,
																		$main_nomor,
																		$kode_kantor_lokasi_jaminan,
																		$kode_kantor_tujuan,
																		$main_keterangan,
																		$main_keperluan,
																		$userIdLogin,
																		$kode_custodian);

		for($i = 0; $i < $lengthParsed; $i++){
			$nomorReffDeatail = $parsedDataDetailArr[$i][0];
			$agunanIdDetail   = $parsedDataDetailArr[$i][1];
			
			$this->Request_Jaminan_Update_Model->updateDataRequestPemindahanDetail($main_nomor,$nomorReffDeatail,$agunanIdDetail);
			
		}
		echo json_encode($data);
	}

	

}