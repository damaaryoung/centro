<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AsetDokumenViewAsetController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('AsetDokumenModel/AsetDokumenEntryModel');
       
	}

	/// START DISPLAY CONTROL///
	public function index(){
		$this->session->unset_userdata('menuAset');
		$session = $this->session->userdata('nama');
		$kode_kantor = $this->session->userdata('kd_cabang');
		$divisi_id   = $this->session->userdata('divisi_id');
		$data['kode_kantor'] = $this->session->userdata('kd_cabang');
		$data['divisi_id']  = $this->session->userdata('divisi_id');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		//modal update
		$data['updateModalMain'] = $this->load->view('ViewAsetDokumen/UpdateData/UpdateModal.php', NULL, TRUE);
		$data['updateModalSertifikat'] = $this->load->view('ViewAsetDokumen/UpdateData/UpdateDataSertifikat.php', NULL, TRUE);
		$data['updateModalBPKB'] = $this->load->view('ViewAsetDokumen/UpdateData/UpdateDataBPKB.php', NULL, TRUE);
		$data['updateModalEmas'] = $this->load->view('ViewAsetDokumen/UpdateData/UpdateDataEmas.php', NULL, TRUE);
		//modal peminjaman
		$data['PeminjamanMainModal'] = $this->load->view('ViewAsetDokumen/PeminjamanDokumen/PeminjamanMainModal.php', NULL, TRUE);
		$data['PeminjamanSertifikatModal'] = $this->load->view('ViewAsetDokumen/PeminjamanDokumen/PeminjamanSertifikatModal.php', NULL, TRUE);
		$data['PeminjamanBPKBModal'] = $this->load->view('ViewAsetDokumen/PeminjamanDokumen/PeminjamanBPKBModal.php', NULL, TRUE);
		$data['PeminjamanEmasModal'] = $this->load->view('ViewAsetDokumen/PeminjamanDokumen/PeminjamanEmasModal.php', NULL, TRUE);
		//modal pengembalian
		$data['MainModalKembali'] = $this->load->view('ViewAsetDokumen/PengembalianDokumen/MainModalKembali.php', NULL, TRUE);
		$data['KembaliSertifikatModal'] = $this->load->view('ViewAsetDokumen/PengembalianDokumen/KembaliSertifikatModal.php', NULL, TRUE);
		$data['KembaliBPKBModal'] = $this->load->view('ViewAsetDokumen/PengembalianDokumen/KembaliBPKBModal.php', NULL, TRUE);
		$data['KembaliEmasModal'] = $this->load->view('ViewAsetDokumen/PengembalianDokumen/KembaliEmasModal.php', NULL, TRUE);
		// modal due date
		$data['DueDateMainModal'] = $this->load->view('ViewAsetDokumen/DueDate/DueDateMainModal.php', NULL, TRUE);
		// modal penyerahan
		$data['PenyerahanMainModal'] = $this->load->view('ViewAsetDokumen/PenyerahanDokumen/PenyerahanMainModal.php', NULL, TRUE);
		$data['PenyerahanSertifikatModal'] = $this->load->view('ViewAsetDokumen/PenyerahanDokumen/PenyerahanSertifikatModal.php', NULL, TRUE);
		$data['PenyerahanBPKBModal'] = $this->load->view('ViewAsetDokumen/PenyerahanDokumen/PenyerahanBPKBModal.php', NULL, TRUE);
		$data['PenyerahanEmasModal'] = $this->load->view('ViewAsetDokumen/PenyerahanDokumen/PenyerahanEmasModal.php', NULL, TRUE);

		$data1['menuAset']    = '2';
		$this->session->set_userdata($data1);

		if($session != ''){
			
			//$data['selectKodeKantor'] = $this->AsetDokumenEntryModel->selectKodeKantor();
			
			$this->load->view('ViewAsetDokumen/EntryAsetDokumen.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
    }
}