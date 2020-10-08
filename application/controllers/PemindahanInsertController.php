<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PemindahanInsertController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('PemindahanLokasiJaminanModel/PemindahanInsertModel');
       // $this->load->database('DB_NEWWEBTOOL', TRUE);
       
	}

	public function index(){
        $session = $this->session->userdata('nama');
        $kode_kantor = $this->session->userdata('kd_cabang');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		$data['ModalJaminanDokumen'] = $this->load->view('ViewPemindahanLokasiJaminan/Insert/ModalJaminanDokumen.php', NULL, TRUE);

		if($session != ''){
            // $data['listJaminan'] = $this->PemindahanJaminanMainModel->listJaminan($kode_kantor);
            $data['selectKodeKantor'] = $this->PemindahanInsertModel->selectKodeKantor();
			$this->load->view('ViewPemindahanLokasiJaminan/Insert/PemindahanLokasiInsert.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}

	public function getMasterJaminan(){
        $session = $this->session->userdata('nama');
		$kode_kantor = $this->session->userdata('kd_cabang');
		

		$getJaminanDokumen = $this->PemindahanInsertModel->getJaminanDokumen($kode_kantor);
		foreach ($getJaminanDokumen as $row) :
			// $jenis_jaminan     		   = $row['jenis_jaminan'];
			// $status                     = $row['status'];
			// $result_kode_kantor         = $row['kode_kantor'];  
			// $result_kode_kantor_lokasi  = $row['kode_kantor_lokasi_jaminan']
			
			
			$data[]    = 	['<tr> <td>'. $row['no_reff'] . '</td> <td>'
										. $row['agunan_id']. '</td> <td>'
										. $row['deskripsi_ringkas'].'</td> <td>'
										. $row['no_rekening_agunan'].'</td> <td>'										
										. $row['verifikasi'].'</td> <td>'
										. '<button type="button" class="btn btn-success btn-sm btnVerifikasi" style ="padding-left: 5px;"
													data-nomor="'.$row['no_reff'].'"
													data-agunanid="'.$row['agunan_id'].'"
													name="btnVerifikasi"> 
													<i style="padding-left: 5px;" class="fa fa-check"></i>
											</button>  </td> </tr>'];
											
									
		endforeach;	

		echo json_encode($data);
		
	}

	public function getMasterJaminanSearch(){
        $session = $this->session->userdata('nama');
		$kode_kantor = $this->session->userdata('kd_cabang');
		$search = $this->input->post('search');
		

		$getSearchJaminanDokumen = $this->PemindahanInsertModel->getSearchJaminanDokumen($kode_kantor,$search);
		
		foreach ($getSearchJaminanDokumen as $row) :
			// $jenis_jaminan     		   = $row['jenis_jaminan'];
			// $status                     = $row['status'];
			// $result_kode_kantor         = $row['kode_kantor'];  
			// $result_kode_kantor_lokasi  = $row['kode_kantor_lokasi_jaminan']
			
			
			$data[]    = 	['<tr> <td>'. $row['no_reff'] . '</td> <td>'
										. $row['agunan_id']. '</td> <td>'
										. $row['deskripsi_ringkas'].'</td> <td>'
										. $row['no_rekening_agunan'].'</td> <td>'										
										. $row['verifikasi'].'</td> <td>'
										. '<button type="button" class="btn btn-success btn-sm btnVerifikasi" style ="padding-left: 5px;"
													data-nomor="'.$row['no_reff'].'"
													data-agunanid="'.$row['agunan_id'].'"
													name="btnVerifikasi"> 
													<i style="padding-left: 5px;" class="fa fa-check"></i>
											</button>  </td> </tr>'];
											
									
		endforeach;	

		echo json_encode($data);
		
	}



}

