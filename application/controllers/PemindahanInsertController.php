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
			$data['selectKodeKantor'] = $this->PemindahanInsertModel->selectKodeKantor();
			$data['getCentro'] = $this->PemindahanInsertModel->getCentro();
			$sysdate = $this->PemindahanInsertModel->sysdate();
			foreach ($sysdate as $row) :
				$data['sysdate'] = $row['sysdate'];		
			endforeach;	
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
		$kode_kantor = $this->session->userdata('kd_cabang');
		$userIdLogin = $this->session->userdata('userIdLogin');
		$hasilNomor = '';
		
		$mainTanggal             = $this->input->post('mainTanggal');
		$kode_kantor_tujuan      = $this->input->post('kode_kantor_tujuan');
		$kode_lokasi_penyimpanan = $this->input->post('kode_lokasi_penyimpanan');
		$mainKeterangan          = $this->input->post('mainKeterangan');
		$parsedDataDetailArr     = $this->input->post('parsedDataDetailArr');
		$lengthParsed            = $this->input->post('lengthParsed');
		$verifikasi				 = '0';
		
		$data['kode_kantor']             = $this->session->userdata('kd_cabang');
		$data['mainTanggal']             = $this->input->post('mainTanggal');;
		$data['kode_kantor_tujuan']      = $this->input->post('kode_kantor_tujuan');
		$data['kode_lokasi_penyimpanan'] = $this->input->post('kode_lokasi_penyimpanan');
		$data['mainKeterangan']          = $this->input->post('mainKeterangan');
		$data['parsedDataDetailArr']     = $this->input->post('parsedDataDetailArr');
		$data['lengthParsed']            = $this->input->post('lengthParsed');

		$generateNomor = $this->PemindahanInsertModel->generateNomor($kode_kantor);
		foreach ($generateNomor as $row) :
			$hasilNomor = $row['hasil'];		
		endforeach;	
		if($hasilNomor != null){
			$nomor = $hasilNomor;
		}else{
			$nomor = $kode_kantor . '.000001';
		}

		$test = $this->PemindahanInsertModel->insertDataPemindahan($mainTanggal,
															$nomor,
															$kode_kantor,
															$kode_kantor_tujuan,
															$mainKeterangan,
															$userIdLogin,
															$kode_lokasi_penyimpanan,
															$verifikasi,
															$lengthParsed,
															$parsedDataDetailArr);
		echo json_encode($data);
	}



}
