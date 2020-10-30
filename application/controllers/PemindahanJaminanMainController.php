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

	public function getListJaminan(){
		$kode_kantor = $this->session->userdata('kd_cabang');
		$listJaminan = $this->PemindahanJaminanMainModel->listJaminan($kode_kantor);
		foreach ($listJaminan as $row) :
			$data[]    = 	['<tr> <td>'. $row['nomor']. '</td> <td>'
										. $row['tgl']. '</td> <td>'
										. $row['nama_kantor_asal'].'</td> <td>'
										. $row['nama_kantor_tujuan'].'</td> <td>'										
										. $row['nama_lokasi_penyimpanan'].'</td> <td>'
										. $row['verifikasi'].'</td> <td>'
										. '<div class="form-inline">'
											. '<form method="post" action="'. base_url().'index.php/PemindahanUpdateController/index">'
											. '<button type="submit" class="btn btn-primary btn-sm btnUpdate" style ="padding-left: 5px;"
														data-id="'.$row['id'].'"
														data-nomor="'.$row['nomor'].'"
														data-toggle="tooltip" 
														data-placement="bottom" 
														title="Edit"
														name="btnUpdate"> 
														<i style="padding-left: 5px;" class="fas fa-edit"></i>
														<input type="hidden" class="form-control" name="tblID" value = "'.$row['id'].'">
														<input type="hidden" class="form-control" name="tblNomor" value = "'. $row['nomor']. '">
												</button>
												</form>
												<div style ="padding-left: 5px;">
													<button type="button" class="btn btn-danger btn-sm btnDeleteLokasiJaminan" style ="padding-left: 5px;"
																data-id="'.$row['id'].'"
																data-nomor="'.$row['nomor'].'" 
																data-verifikasi="'.$row['verifikasi'].'" 
																data-toggle="tooltip" 
																data-placement="bottom" 
																title="Delete"
																name="btnDeleteLokasiJaminan"> 
																<i style="padding-left: 5px;" class="fa fa-trash"></i> 
													</button>  
												</div>
												<div style ="padding-left: 5px;">
													<form method="post" target="_blank" style ="display:inline;" action="'. base_url().'index.php/PemindahanCetakController/cetakProses"> 
														<button type="submit" class="btn btn-success btn-sm btnCetakLokasiJaminan" style ="padding-left: 5px;"
																	data-id="'.$row['id'].'"
																	data-nomor="'.$row['nomor'].'" 
																	data-verifikasi="'.$row['verifikasi'].'"
																	data-toggle="tooltip" 
																	data-placement="bottom" 
																	title="Print" 
																	name="btnCetakLokasiJaminan"> 
																<i style="padding-left: 5px;" class="fa fa-print"></i> 
																<input type="hidden" name="nomorCetak" value="'.$row['nomor'].'">
																<input type="hidden" name="idCetak" value="'.$row['id'].'">
														</button> 
														</form>
													</div>
												</div>'
											
										.'</td> </tr>'];
											
									
		endforeach;	

		echo json_encode($data);

	}

	public function getListJaminanSearch(){
        $session = $this->session->userdata('nama');
		$search = $this->input->post('search');
		$kode_kantor = $this->input->post('kode_kantor');
		
		$listJaminanSearch = $this->PemindahanJaminanMainModel->listJaminanSearch($search,$kode_kantor);
		foreach ($listJaminanSearch as $row) :
			$data[]    = 	['<tr> <td>'. $row['nomor']. '</td> <td>'
										. $row['tgl']. '</td> <td>'
										. $row['nama_kantor_asal'].'</td> <td>'
										. $row['nama_kantor_tujuan'].'</td> <td>'										
										. $row['nama_lokasi_penyimpanan'].'</td> <td>'
										. $row['verifikasi'].'</td> <td>'
										. '<div class="form-inline">'
											. '<form method="post" action="'. base_url().'index.php/PemindahanUpdateController/index">'
											. '<button type="submit" class="btn btn-primary btn-sm btnUpdate" style ="padding-left: 5px;"
														data-id="'.$row['id'].'"
														data-nomor="'.$row['nomor'].'"
														data-toggle="tooltip" 
														data-placement="bottom" 
														title="Edit"
														name="btnUpdate"> 
														<i style="padding-left: 5px;" class="fas fa-edit"></i>
														<input type="hidden" class="form-control" name="tblID" value = "'.$row['id'].'">
														<input type="hidden" class="form-control" name="tblNomor" value = "'. $row['nomor']. '">
												</button>
												</form>
												<div style ="padding-left: 5px;">
													<button type="button" class="btn btn-danger btn-sm btnDeleteLokasiJaminan" style ="padding-left: 5px;"
																data-id="'.$row['id'].'"
																data-nomor="'.$row['nomor'].'" 
																data-verifikasi="'.$row['verifikasi'].'" 
																data-toggle="tooltip" 
																data-placement="bottom" 
																title="Delete"
																name="btnDeleteLokasiJaminan"> 
																<i style="padding-left: 5px;" class="fa fa-trash"></i> 
													</button>  
												</div>
												<div style ="padding-left: 5px;">
													<form method="post" target="_blank" style ="display:inline;" action="'. base_url().'index.php/PemindahanCetakController/cetakProses"> 
														<button type="submit" class="btn btn-success btn-sm btnCetakLokasiJaminan" style ="padding-left: 5px;"
																	data-id="'.$row['id'].'"
																	data-nomor="'.$row['nomor'].'" 
																	data-verifikasi="'.$row['verifikasi'].'"
																	data-toggle="tooltip" 
																	data-placement="bottom" 
																	title="Print" 
																	name="btnCetakLokasiJaminan"> 
																<i style="padding-left: 5px;" class="fa fa-print"></i> 
																<input type="hidden" name="nomorCetak" value="'.$row['nomor'].'">
																<input type="hidden" name="idCetak" value="'.$row['id'].'">
														</button> 
														</form>
													</div>
												</div>'
											
										.'</td> </tr>'];
											
									
		endforeach;	

		echo json_encode($data);
		
	}
	public function deleteDataPemindahanLokasi(){
        $version      = $this->session->userdata('version');
		$nomor        = $this->input->post('nomor');
		$usename      = $this->session->userdata('usename');
		$kode_kantor  = $this->session->userdata('kd_cabang');
		
		$data['nomor']   = $this->input->post('nomor');
		$data['version'] = $this->session->userdata('version');
		$data['usename'] = $this->session->userdata('usename');
		
		$this->PemindahanJaminanMainModel->deleteDataPemindahan($nomor,$version,$usename,$kode_kantor);
		

		echo json_encode($data);
	}


}
