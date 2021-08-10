
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard_ratio_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AccountingModel/Dashboard_ratio_model');
       
    }
	public function get_sysdate(){
		$sysdate = $this->Dashboard_ratio_model->sysdate();
		$data['sysdate'] = $sysdate;
		echo json_encode($data);
	}
	public function get_kode_kantor(){

		$kode_kantor = $this->Dashboard_ratio_model->selectKodeKantor();

		$data['kode_kantor'] = $kode_kantor;
		echo json_encode($data);
	}
    public function rasio_dashboard_capital()
	{
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
			$this->load->view('ViewAccounting/dashboard_ratio_capital_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}

	public function get_data_chart_capital(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_tgl_laporan = $this->input->post('src_tgl_laporan');
		$rasio_capital 	      =$this->Dashboard_ratio_model->get_data_chart_capital($src_kode_kantor,$src_tgl_laporan);
		$data['rasio_capital']   =$rasio_capital; 
		echo json_encode($data);
	}

	public function rasio_dashboard_asset()
	{
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
			$this->load->view('ViewAccounting/dashboard_ratio_aset_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
	public function get_data_chart_kap(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_tgl_laporan = $this->input->post('src_tgl_laporan');
		$rasio_asset_kap 	      =$this->Dashboard_ratio_model->get_data_chart_asset_kap($src_kode_kantor,$src_tgl_laporan);
		$data['rasio_asset_kap']   =$rasio_asset_kap; 
		echo json_encode($data);
	}
	public function get_data_chart_ppap(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_tgl_laporan = $this->input->post('src_tgl_laporan');
		$rasio_asset_ppap 	      =$this->Dashboard_ratio_model->get_data_chart_asset_ppap($src_kode_kantor,$src_tgl_laporan);
		$data['rasio_asset_ppap']   =$rasio_asset_ppap; 
		echo json_encode($data);
	}

	public function rasio_dashboard_earning()
	{
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
			$this->load->view('ViewAccounting/dashboard_ratio_earning_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
	public function get_data_chart_roa(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_tgl_laporan = $this->input->post('src_tgl_laporan');
		$rasio_earning_roa 	      =$this->Dashboard_ratio_model->get_data_chart_rasio_earning_roa($src_kode_kantor,$src_tgl_laporan);
		$data['rasio_earning_roa']   =$rasio_earning_roa; 
		echo json_encode($data);
	}
	public function get_data_chart_bopo(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_tgl_laporan = $this->input->post('src_tgl_laporan');
		$rasio_earning_bopo 	      =$this->Dashboard_ratio_model->get_data_chart_earning_bopo($src_kode_kantor,$src_tgl_laporan);
		$data['rasio_earning_bopo']   =$rasio_earning_bopo; 
		echo json_encode($data);
	}
	public function rasio_dashboard_liquidity()
	{
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
			$this->load->view('ViewAccounting/dashboard_ratio_liquidity_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
	public function get_data_chart_cash_ratio(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_tgl_laporan = $this->input->post('src_tgl_laporan');
		$rasio_liquidity_cash_ratio 	      =$this->Dashboard_ratio_model->get_data_chart_rasio_liquidity_cash_ratio($src_kode_kantor,$src_tgl_laporan);
		$data['rasio_liquidity_cash_ratio']   =$rasio_liquidity_cash_ratio; 
		echo json_encode($data);
	}
	public function get_data_chart_ldr(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_tgl_laporan = $this->input->post('src_tgl_laporan');
		$rasio_liquidity_ldr 	      =$this->Dashboard_ratio_model->get_data_chart_rasio_liquidity_ldr($src_kode_kantor,$src_tgl_laporan);
		$data['rasio_liquidity_ldr']   =$rasio_liquidity_ldr; 
		echo json_encode($data);
	}

}