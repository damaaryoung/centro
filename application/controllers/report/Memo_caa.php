<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Memo_caa extends CI_Controller
{

	function __construct()
	{
		parent::__construct();
		$this->load->model('model_auth');
	}

	public function index()
	{
		$id  = $this->input->post('id');
		$url = 'api/master/report/approval/' . $id;
		$r   = $this->model_auth->get_data($url);
		$code = $r['code'];

		$url_ = '/api/master/mcaa/' . $id . '/approval';
		$r_   = $this->model_auth->get_data($url_);
		$code_ = $r_['code'];

		$url__ = '/api/master/mcaa/' . $id;
		$r__   = $this->model_auth->get_data($url__);
		$code__ = $r__['code'];

		if ($code == "200" && $code_ == "200" && $code__ == "200") {
			$data['nama_debitur'] = $r['message']['debitur']['nama'];
			$data['plafon_pengajuan'] = $r__['data']['pengajuan']['plafon'];
			$data['tenor'] = $r__['data']['pengajuan']['tenor'];
			$data['jaminan'] = $r__['data']['data_agunan']['agunan_tanah'];
			$data['list_approver'] = $r['message']['list_approver'];

			$mpdf = new \Mpdf\Mpdf();
			$html = $this->load->view('report/memo_caa', $data, true);
			$mpdf->WriteHTML($html);
			$mpdf->Output();
		}
	}
}
