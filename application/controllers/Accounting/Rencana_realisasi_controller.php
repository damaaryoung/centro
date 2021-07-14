
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Rencana_realisasi_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AccountingModel/Rencana_realisasi_model');
       
    }
    public function index(){
        $session             = $this->session->userdata('nama');
        $data['kode_kantor'] = $this->session->userdata('kd_cabang');
        $data['divisi_id']   = $this->session->userdata('divisi_id');
		$data['js']          = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']         = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']      = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar']     = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']      = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar']     = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){
			$this->load->view('ViewAccounting/rencana_realisasi_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
    public function get_kode_kantor(){

		$kode_kantor = $this->Rencana_realisasi_model->selectKodeKantor();

		$data['kode_kantor'] = $kode_kantor;
		echo json_encode($data);
	}
	public function get_jenis(){

		$get_asuransi = $this->Rencana_realisasi_model->get_jenis();
		$sysdate = $this->Rencana_realisasi_model->sysdate();

		$data['get_asuransi'] = $get_asuransi;
		$data['sysdate'] = $sysdate;
		echo json_encode($data);
	}
	public function get_data_rencana_realisasi(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		
		$data_rencana = $this->Rencana_realisasi_model->get_data_rencana_realisasi($src_kode_kantor);

		$data['data_rencana'] = $data_rencana;
		echo json_encode($data);
	}
	public function insert_rencana(){
		$modal_jenis       = $this->input->post('modal_jenis');
		$modal_kode_kantor = $this->input->post('modal_kode_kantor');
		$modal_tgl_laporan = $this->input->post('modal_tgl_laporan');
		$modal_rencana     = $this->input->post('modal_rencana');
		$modal_realisasi   = $this->input->post('modal_realisasi');		
		$modal_rasio       = $this->input->post('modal_rasio');		
		$userID            = $this->session->userdata('userIdLogin');


		$data_details = $this->Rencana_realisasi_model->insert_rencana($modal_jenis,
																	$modal_kode_kantor,
																	$modal_tgl_laporan,
																	$modal_rencana,
																	$modal_realisasi,
																	$modal_rasio,
																	$userID);
		$data['data_details'] = $data_details;
		echo json_encode($data);
	}
	public function delete_rencana(){
		$kd_kantor = $this->input->post('kd_kantor');
		$jenis     = $this->input->post('jenis');
		$tgl       = $this->input->post('tgl');
		
		$delete = $this->Rencana_realisasi_model->delete_rencana($kd_kantor,$jenis,$tgl);

		$data['delete'] = $delete;
		echo json_encode($data);
	}
	public function get_details(){
		$kd_kantor = $this->input->post('kd_kantor');
		$jenis     = $this->input->post('jenis');
		$tgl       = $this->input->post('tgl');
		$kode_kantor = $this->session->userdata('kd_cabang');
        $divisi_id      = $this->session->userdata('divisi_id');

		$data['data_detail']     = $this->Rencana_realisasi_model->get_details($kd_kantor,$jenis,$tgl);
		if($kd_kantor == '00' || $divisi_id == 'IT'){ 
			$data['kode_kantor']  = $this->Rencana_realisasi_model->selectKodeKantor();
		}
		$data['get_asuransi'] = $this->Rencana_realisasi_model->get_jenis();
		echo json_encode($data);
	}
	public function update_rencana(){

		$modal_jenis_update       = $this->input->post('modal_jenis_update');
		$modal_kode_kantor_update = $this->input->post('modal_kode_kantor_update');
		$modal_tgl_laporan_update = $this->input->post('modal_tgl_laporan_update');
		$modal_rencana_update     = $this->input->post('modal_rencana_update');
		$modal_realisasi_update   = $this->input->post('modal_realisasi_update');		
		$modal_rasio_update       = $this->input->post('modal_rasio_update');
		$kd_kantor                = $this->input->post('modal_rasio_update');		
		$jenis                    = $this->input->post('modal_rasio_update');
		$tgl                      = $this->input->post('modal_rasio_update');
		$userID                   = $this->session->userdata('userIdLogin');

		$update = $this->Rencana_realisasi_model->update_rencana($modal_jenis_update,
		    														         $modal_kode_kantor_update,
		    														         $modal_tgl_laporan_update,
		    														         $modal_rencana_update,
		    														         $modal_realisasi_update,
		    														         $modal_rasio_update,
		    														         $userID,
																			 $kd_kantor,	
																			 $jenis,
																			 $tgl);
		$data['update'] = $update;
		echo json_encode($data);
		
	}
}