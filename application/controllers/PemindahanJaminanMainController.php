<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PemindahanJaminanMainController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('PemindahanLokasiJaminanModel/PemindahanJaminanMainModel');
       
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

		if($session != ''){
            $data['listJaminan'] = $this->PemindahanJaminanMainModel->listJaminan($kode_kantor);
            $data['selectKodeKantor'] = $this->PemindahanJaminanMainModel->selectKodeKantor();
			$this->load->view('ViewPemindahanLokasiJaminan/PemindahanLokasiMain.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function getListJaminanSearch(){
        $session = $this->session->userdata('nama');
		$search = $this->input->post('search');
		$kode_kantor = $this->input->post('kode_kantor');
		
		$listJaminanSearch = $this->PemindahanJaminanMainModel->listJaminanSearch($search,$kode_kantor);
		foreach ($listJaminanSearch as $row) :
			// $jenis_jaminan     		   = $row['jenis_jaminan'];
			// $status                     = $row['status'];
			// $result_kode_kantor         = $row['kode_kantor'];  
			// $result_kode_kantor_lokasi  = $row['kode_kantor_lokasi_jaminan']
			
			
			$data[]    = 	['<tr> <td>'. $row['nomor']. '</td> <td>'
										. $row['tgl']. '</td> <td>'
										. $row['nama_kantor_asal'].'</td> <td>'
										. $row['nama_kantor_tujuan'].'</td> <td>'										
										. $row['nama_lokasi_penyimpanan'].'</td> <td>'
										. $row['verifikasi'].'</td> <td>'
										. '<button type="button" class="btn btn-primary btn-sm btnUpdate" style ="padding-left: 5px;"
													data-nomor="'.$row['nomor'].'"
													data-id="'.$row['id'].'"
													data-toggle="tooltip" 
                                                    data-placement="bottom" 
                                                    title="Edit"
                                                    name="btnUpdate"> 
													<i style="padding-left: 5px;" class="fas fa-edit"></i>
											</button>  </td> </tr>'];
											
									
		endforeach;	

		echo json_encode($data);
		
	}


}
