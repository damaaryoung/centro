<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Pengajuan_lpdk extends CI_Controller
{
    var $API = "";

    function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        // $this->db = $this->load->database('db3', TRUE);
        $id = $this->input->post('id');

        $query = "SELECT * from view_report_pengajuan_lpdk WHERE id_trans_so = $id ";
        $result = $this->db->query($query);

        $x      = $result->row();
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

        $id_ao = $x->id_ao;

        $data['nama_so'] = $x->nama_so;
        $data['nama_marketing'] = $x->nama_marketing;
        $data['cabang'] = $x->cabang;
        $data['asal_data'] = $x->asal_data;
        $data['nama_debitur'] = $x->nama_debitur;
        $data['status_nikah'] = $x->status_nikah;
        $data['nama_pasangan'] = $x->nama_pasangan;
        $data['produk'] = $x->produk;
        $data['alamat_ktp_vs_jaminan'] = $x->alamat_ktp_vs_jaminan;
        $data['plafon'] = $plafon_approval;
        $data['tenor'] = $tenor_approval;
        $data['created_at']  = date('d F Y', strtotime($x->created_at));
        $data['request_by'] = $x->request_by;
        $data['area'] = $x->AREA;
        $data['akta_notaris'] = $x->akta_notaris;

        $x = $this->db->query("SELECT id_penjamin FROM `trans_so` WHERE id ='$id'");
        $result = $x->row();
        $id_jaminan = isset($result->id_penjamin) ? $result->id_penjamin : "0";



        // if ($id_jaminan !== '0') {
        $query = "SELECT a.nama_penjamin as nama_ktp, a.pasangan_penjamin FROM lpdk_penjamin AS a WHERE trans_so = $id";
        $rows = $this->db->query($query);
        $data['row'] = $rows;
        // } else {
        //     $rows = 0;
        //     $data['row'] = $rows;
        // }
        $agunan_tanah = $this->db->query("SELECT a.id,a.id_trans_so,a.no_sertifikat,a.nama_pemilik_sertifikat,b.status_sertifikat,a.tgl_berlaku_shgb,a.jenis_sertifikat
        ,b.nama_pas_sertifikat,b.status_pas_sertifikat,b.hub_cadeb FROM agunan_tanah AS a LEFT JOIN lpdk_sertifikat AS b ON a.id_trans_so=b.trans_so 
        WHERE a.id IN (SELECT id_agunan_tanah FROM  view_report_pengajuan_lpdk WHERE id_ao ='$id_ao' )");
        $data['agunan_tanah'] = $agunan_tanah;

        $footerHTML = '
    <hr><small>Form Pengajuan LPDK</small>';
        
        require_once("vendor/autoload.php");    
        $mpdf = new \Mpdf\Mpdf();
        $html = $this->load->view('report/pengajuan_lpdk', $data, true);
        $mpdf->WriteHTML($html);
        $mpdf->SetHTMLFooter($footerHTML);
        $mpdf->Output();
    }
}
