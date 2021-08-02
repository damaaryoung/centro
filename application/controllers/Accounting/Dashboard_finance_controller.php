
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard_finance_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AccountingModel/Dashboard_finance_model');
       
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

	//	$data['speedometer_npat_ytd'] = $this->Dashboard_finance_model->get_data_speedometer_modal();
		// $chart          = $this->Dashboard_finance_model->get_data_chart();
		//  var_dump(	$data['speedometer_aset'] );	
		if($session != ''){
			$this->load->view('ViewAccounting/dashboard_finance_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
	public function get_data_chart_npat_ytd(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$chart_npat_ytd 	      =$this->Dashboard_finance_model->get_data_chart_npat_ytd(($src_kode_kantor));
		$data['chart_npat_ytd']   =$chart_npat_ytd; 
		echo json_encode($data);
	}
	public function get_data_chart_npat_monthly(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$chart_npat_monthly 	      =$this->Dashboard_finance_model->get_data_chart_npat_monthly($src_kode_kantor);
		$data['chart_npat_monthly']   =$chart_npat_monthly; 
		echo json_encode($data);
	}
	public function get_data_chart_aset_kredit(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$chart_aset_kredit 	      =$this->Dashboard_finance_model->get_data_chart_aset_kredit($src_kode_kantor);
		$data['chart_aset_kredit']   =$chart_aset_kredit; 
		echo json_encode($data);
	}
	public function get_data_chart_aset(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$chart_aset 	      =$this->Dashboard_finance_model->get_data_chart_aset($src_kode_kantor);
		$data['chart_aset']   =$chart_aset; 
		
		echo json_encode($data);
	}
	public function get_data_chart_modal(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_tgl_laporan = $this->input->post('src_tgl_laporan');
		$chart_modal 	      =$this->Dashboard_finance_model->get_data_chart_modal($src_kode_kantor,$src_tgl_laporan);
		$data['chart_modal']   =$chart_modal; 
		echo json_encode($data);
	}
	public function get_data_speedometer_aset(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_tgl_laporan = $this->input->post('src_tgl_laporan');
		$speedometer_aset =$this->Dashboard_finance_model->get_data_speedometer($src_kode_kantor,$src_tgl_laporan);
		$data['speedometer_aset']         = $speedometer_aset;
		echo json_encode($data);
	}
	public function get_data_speedometer_aset_kredit(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_tgl_laporan = $this->input->post('src_tgl_laporan');
		$speedometer_aset_kredit =$this->Dashboard_finance_model->get_data_speedometer_kredit($src_kode_kantor,$src_tgl_laporan);
		$data['speedometer_aset_kredit']         = $speedometer_aset_kredit;
		echo json_encode($data);
	}
	public function get_data_speedometer_npat_monthly(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_tgl_laporan = $this->input->post('src_tgl_laporan');
		$speedometer_npat_monthly =$this->Dashboard_finance_model->get_data_speedometer_npat_monthly($src_kode_kantor,$src_tgl_laporan);
		$data['speedometer_npat_monthly']         = $speedometer_npat_monthly;
		echo json_encode($data);
	}
	public function get_data_speedometer_modal(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_tgl_laporan = $this->input->post('src_tgl_laporan');
		$speedometer_modal =$this->Dashboard_finance_model->get_data_speedometer_modal($src_kode_kantor,$src_tgl_laporan);
		$data['speedometer_modal']         = $speedometer_modal;
		echo json_encode($data);
	}

	public function get_sysdate(){
		$sysdate = $this->Dashboard_finance_model->sysdate();
		$data['sysdate'] = $sysdate;
		echo json_encode($data);
	}
	public function get_kode_kantor(){

		$kode_kantor = $this->Dashboard_finance_model->selectKodeKantor();

		$data['kode_kantor'] = $kode_kantor;
		echo json_encode($data);
	}

}