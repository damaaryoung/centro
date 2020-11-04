<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Memo_pfka extends CI_Controller
{

	var $API = "";

	function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$id = $this->input->post('id');
		$curl     =  $this->config->item('api_url') . 'api/master/mcaa/' . $id . '/detail';
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $curl);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			// "Content-Type: multipart/form-data",
			"Authorization: Bearer " . $this->session->userdata('SESSION_TOKEN'),
		));

		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$output = curl_exec($ch);
		curl_close($ch);
		$r =  (array) json_decode($output);
		$code = isset($r['code']) ? $r['code'] : '';

		if ($code == "200") {
			$this->load->model('model_auth');
			$url_team_caa = "api/master/mcaa/" . $id . "/approval";
			$result_team_caa = $this->model_auth->get_data($url_team_caa);
			for ($i = 0; $i < count($result_team_caa['data']); $i++) {
				$arr_rtc_status[] = $result_team_caa['data'][$i]['status_approval'];
				$arr_rtc_plafon[] = $result_team_caa['data'][$i]['plafon'];
				$arr_rtc_tenor[] = $result_team_caa['data'][$i]['tenor'];
			}

			$user_accept = array_search("accept", $arr_rtc_status);
			$plafon_approval = $arr_rtc_plafon[$user_accept];
			$tenor_approval = $arr_rtc_tenor[$user_accept];

			$data['nomor_so'] = $r['data']->transaksi->so->nomor;
			$data['nomor_caa'] = $r['data']->transaksi->caa->nomor;
			$data['nama_lengkap'] = $r['data']->data_debitur->nama_lengkap;
			$data['alamat_domisili'] = $r['data']->data_debitur->alamat_domisili->alamat_singkat;
			$data['jenis_pinjaman'] = $r['data']->pengajuan->jenis_pinjaman;
			$data['produk'] = $r['data']->rekomendasi_ca->produk;
			$data['tenor'] = $tenor_approval;
			$data['plafon'] = $plafon_approval;
			$data['suku_bunga'] = $r['data']->rekomendasi_ca->suku_bunga;
			$data['pembayaran_bunga'] = $r['data']->rekomendasi_ca->pembayaran_bunga;
			$data['rekomendasi_angsuran'] = $r['data']->rekomendasi_ca->pembayaran_bunga;
			$data['agunan_tanah'] = $r['data']->data_agunan->agunan_tanah;

			// $aa = $r['data']->data_agunan->agunan_tanah;
			// print_r($aa);
			// die;

			$data['agunan_kendaraan'] = $r['data']->data_agunan->agunan_kendaraan;
			$data['biaya_provisi'] = $r['data']->data_biaya->reguler->biaya_provisi;
			$data['biaya_administrasi'] = $r['data']->data_biaya->reguler->biaya_administrasi;
			$data['biaya_credit_checking'] = $r['data']->data_biaya->reguler->biaya_credit_checking;
			$data['biaya_asuransi_jiwa'] = $r['data']->data_biaya->reguler->biaya_premi->asuransi_jiwa;
			$data['biaya_asuransi_kebakaran'] = $r['data']->data_biaya->reguler->biaya_premi->asuransi_kebakaran;
			$data['biaya_asuransi_kendaraan'] = $r['data']->data_biaya->reguler->biaya_premi->asuransi_kendaraan;
			$data['biaya_tabungan'] = $r['data']->data_biaya->reguler->biaya_tabungan;
			$data['biaya_notaris'] = $r['data']->data_biaya->reguler->biaya_notaris;
			$data['pelunasan_nasabah_ro'] = $r['data']->data_biaya->reguler->pelunasan_nasabah_ro;
			$data['total'] = $r['data']->data_biaya->total->biaya_reguler;
			$data['tanggal_approval'] = $r['data']->tgl_approval;
			$footerHTML = '<img src="' . base_url("assets/dist/img/footerOL.png") . '"
			style="
				margin-left:-4em;
				margin-right:-4em;
				margin-bottom:-3em;
			">';

			$mpdf = new \Mpdf\Mpdf();
			$html = $this->load->view('report/memo_pfka', $data, true);
			$mpdf->WriteHTML($html);
			$mpdf->SetHTMLFooter($footerHTML);
			$mpdf->Output();
		}
	}
}
