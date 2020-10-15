<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PemindahanVerifikasiController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('PemindahanLokasiJaminanModel/PemindahanVerifikasiModel');
       
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
            $data['listJaminan'] = $this->PemindahanVerifikasiModel->listJaminan($kode_kantor);
            $data['selectKodeKantor'] = $this->PemindahanVerifikasiModel->selectKodeKantor();
			$this->load->view('ViewPemindahanLokasiJaminan/Verifikasi/PemindahanVerifikasiMain.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
    }
    public function getListJaminanSearch(){
        $session = $this->session->userdata('nama');
		$search = $this->input->post('search');
		$kode_kantor = $this->input->post('kode_kantor');
		
		$listJaminanSearch = $this->PemindahanVerifikasiModel->listJaminanSearch($search,$kode_kantor);
		foreach ($listJaminanSearch as $row) :
			$data[]    = 	['<tr> <td>'. $row['nomor']. '</td> <td>'
										. $row['tgl']. '</td> <td>'
										. $row['nama_kantor_asal'].'</td> <td>'
										. $row['nama_kantor_tujuan'].'</td> <td>'										
										. $row['nama_lokasi_penyimpanan'].'</td> <td>'
										. $row['verifikasi'].'</td> <td>'
										. '<div class="form-inline">'
											. '<form method="post" action="'. base_url().'index.php/PemindahanVerifikasiController/verifikasiMenu">'
											. '<button type="submit" class="btn btn-success btn-sm btnVerifikasi" style ="padding-left: 5px;"
														data-id="'.$row['id'].'"
														data-nomor="'.$row['nomor'].'"
														data-toggle="tooltip" 
														data-placement="bottom" 
														title="Verifikasi"
														name="btnVerifikasi"> 
														<i style="padding-left: 5px;" class="fas fa-check"></i>
														<input type="hidden" class="form-control" name="tblID" value = "'.$row['id'].'">
														<input type="hidden" class="form-control" name="tblNomor" value = "'. $row['nomor']. '">
												</button>
												</form>
												</div>'
										.'</td> </tr>'];
											
									
		endforeach;	

		echo json_encode($data);
		
    }
    public function verifikasiMenu(){
        $session                     = $this->session->userdata('nama');
		$kode_kantor                 = $this->session->userdata('kd_cabang');
		$tblID                       = $this->input->post('tblID');
		$tblNomor                    = $this->input->post('tblNomor');
		$data['js']                  = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']                 = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']              = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar']             = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']              = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar']             = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		$data['ModalJaminanDokumen'] = $this->load->view('ViewPemindahanLokasiJaminan/Insert/ModalJaminanDokumen.php', NULL, TRUE);

		$data['getNomor']            = $this->input->post('tblNomor');
		$data['getId']               = $this->input->post('tblID');
		if($session != ''){
			$getJaminanPemindahanHeader = $this->PemindahanVerifikasiModel->getJaminanPemindahanHeader($tblNomor);
			foreach ($getJaminanPemindahanHeader as $row) :
				$data['nomor'] =  $row['nomor'];
				$data['tgl'] =  $row['tgl'];
				$data['kode_kantor_asal'] =  $row['kode_kantor_asal'];
				$data['kode_kantor_tujuan'] =  $row['kode_kantor_tujuan'];
				$data['ket'] =  $row['ket'];
				$data['verifikasi'] =  $row['verifikasi'];
				$data['lokasi_penyimpanan'] =  $row['lokasi_penyimpanan'];
			endforeach;	
			
			$data['selectKodeKantor'] = $this->PemindahanVerifikasiModel->selectKodeKantor();
			$data['getCentro'] = $this->PemindahanVerifikasiModel->getCentro();
			$this->load->view('ViewPemindahanLokasiJaminan/Verifikasi/ViewFormVerifikasiPemindahan.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
    }
    public function getDataDetail(){
        
		$dataNomor                    = $this->input->post('dataNomor');
		$getPemindahanJaminanDetail   = $this->PemindahanVerifikasiModel->getPemindahanJaminanDetail($dataNomor);
		
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
	public function prosesVerifikasi(){
		$kode_kantor = $this->session->userdata('kd_cabang');
		$userIdLogin = $this->session->userdata('userIdLogin');

		$mainTanggal             = $this->input->post('mainTanggal');
		$kode_kantor_tujuan      = $this->input->post('kode_kantor_tujuan');
		$kode_lokasi_penyimpanan = $this->input->post('kode_lokasi_penyimpanan');
		$mainKeterangan          = $this->input->post('mainKeterangan');
		$parsedDataDetailArr     = $this->input->post('parsedDataDetailArr');
		$lengthParsed            = $this->input->post('lengthParsed');
		$mainNomor               = $this->input->post('mainNomor');
		$mainVerifikasi		     = $this->input->post('mainVerifikasi');
		
		$data['kode_kantor']             = $this->session->userdata('kd_cabang');
		$data['mainTanggal']             = $this->input->post('mainTanggal');;
		$data['kode_kantor_tujuan']      = $this->input->post('kode_kantor_tujuan');
		$data['kode_lokasi_penyimpanan'] = $this->input->post('kode_lokasi_penyimpanan');
		$data['mainKeterangan']          = $this->input->post('mainKeterangan');
		$data['mainNomor']               = $this->input->post('mainNomor');
		$data['mainVerifikasi']          = $this->input->post('mainVerifikasi');
	

		$this->PemindahanVerifikasiModel->verifikasieDataPemindahan($mainNomor,$mainVerifikasi);
		
		echo json_encode($data);
	}
}