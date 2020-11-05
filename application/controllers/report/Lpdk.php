<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Lpdk extends CI_Controller
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

        $query = "SELECT * from view_report_lpdk WHERE trans_so = $id ";
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


        $data['plafon_kredit'] = $plafon_approval;
        $data['nomor_so'] = $x->nomor_so;
        $data['nama_debitur'] = $x->nama_debitur;
        // $data['plafon_kredit'] = $x->plafon_kredit;
        $data['cabang'] = $x->cabang;
        $data['ktp_deb'] = $x->ktp_deb;
        $data['ktp_deb_ket'] = $x->ktp_deb_ket;
        $data['ktp_pas'] = $x->ktp_pas;
        $data['ktp_pas_ket'] = $x->ktp_pas_ket;
        $data['kk'] = $x->kk;
        $data['kk_ket'] = $x->kk_ket;
        $data['akta_nikah'] = $x->akta_nikah;
        $data['akta_nikah_ket'] = $x->ankta_nikah_ket;
        $data['akta_cerai'] = $x->akta_cerai;
        $data['akta_cerai_ket'] = $x->akta_cerai_ket;
        $data['akta_lahir'] = $x->akta_lahir;
        $data['akta_lahir_ket'] = $x->akta_lahir_ket;
        $data['surat_kematian'] = $x->surat_kematian;
        $data['surat_kematian_ket'] = $x->surat_kematian_ket;
        $data['npwp'] = $x->npwp;
        $data['npwp_ket'] = $x->npwp_ket;
        $data['skd_pmi'] = $x->skd_pmi;
        $data['skd_pmi_ket'] = $x->skd_pmi_ket;
        $data['shm_shgb'] = $x->shm_shgb;
        $data['shm_shgb_ket'] = $x->shm_shgb_ket;
        $data['imb'] = $x->imb;
        $data['imb_ket'] = $x->imb_ket;
        $data['pbb'] = $x->pbb;
        $data['pbb_ket'] = $x->pbb_ket;
        $data['sttpbb'] = $x->sttpbb;
        $data['sttpbb_ket'] = $x->sttpbb_ket;
        $data['fotocopy_ktp_ortu'] = $x->fotocopy_ktp_ortu;
        $data['fotocopy_ktp_ortu_ket'] = $x->fotocopy_ktp_ortu_ket;
        $data['fotocopy_kk_ortu'] = $x->fotocopy_kk_ortu;
        $data['fotocopy_kk_ortu_ket'] = $x->fotocopy_kk_ortu_ket;
        $data['pg_ortu'] = $x->pg_ortu;
        $data['pg_ortu_ket'] = $x->pg_ortu_ket;
        $data['akta_nikah_ortu'] = $x->akta_nikah_ortu;
        $data['akta_nikah_ortu_ket'] = $x->akta_nikah_ortu_ket;
        $data['sk_waris'] = $x->sk_waris;
        $data['sk_waris_ket'] = $x->sk_waris_ket;
        $data['akta_lahir_waris'] = $x->akta_lahir_waris;
        $data['akta_lahir_waris_ket'] = $x->akta_lahir_waris_ket;
        $data['sk_anak'] = $x->sk_anak;
        $data['sk_anak_ket'] = $x->sk_anak_ket;
        $data['ktp_penjamin'] = $x->ktp_penjamin;
        $data['ktp_penjamin_ket'] = $x->ktp_penjamin_ket;
        $data['ktp_pasangan_pen'] = $x->ktp_pasangan_pen;
        $data['ktp_pasangan_pen_ket'] = $x->ktp_pasangan_pen_ket;
        $data['kk_penjamin'] = $x->kk_penjamin;
        $data['kk_penjamin_ket'] = $x->kk_penjamin_ket;
        $data['aktanikah_penj'] = $x->aktanikah_penj;
        $data['aktanikah_penj_ket'] = $x->aktanikah_penj_ket;
        $data['aktacerai_penj'] = $x->aktacerai_penj;
        $data['aktacerai_penj_ket'] = $x->aktacerai_penj_ket;
        $data['akta_lahir_penj'] = $x->akta_lahir_penj;
        $data['akta_lahir_penj_ket'] = $x->akta_lahir_penj_ket;
        $data['skematian_penjamin'] = $x->skematian_penjamin;
        $data['skematian_penjamin_ket'] = $x->skematian_penjamin_ket;
        $data['npwp_penjamin'] = $x->npwp_penjamin;
        $data['npwp_penjamin_ket'] = $x->npwp_penjamin_ket;
        $data['skd_penjamin'] = $x->skd_penjamin;
        $data['skd_penjamin_ket'] = $x->skd_penjamin_ket;
        $data['ktp_penjual'] = $x->ktp_penjual;
        $data['ktp_penjual_ket'] = $x->ktp_penjual_ket;
        $data['ktp_pas_penjual'] = $x->ktp_pas_penjual;
        $data['ktp_pas_penjual_ket'] = $x->ktp_pas_penjual_ket;
        $data['kk_penjual'] = $x->kk_penjual;
        $data['kk_penjual_ket'] = $x->kk_penjual_ket;
        $data['aktanikah_penjual'] = $x->aktanikah_penjual;
        $data['aktanikah_penjual_ket'] = $x->aktanikah_penjual_ket;
        $data['aktacerai_penjual'] = $x->aktacerai_penjual;
        $data['aktacerai_penjual_ket'] = $x->aktacerai_penjual_ket;
        $data['aktalahir_penjual'] = $x->aktalahir_penjual;
        $data['aktalahir_penjual_ket'] = $x->aktalahir_penjual_ket;
        $data['skematian_penjual'] = $x->skematian_penjual;
        $data['skematian_penjual_ket'] = $x->skematian_penjual_ket;
        $data['npwp_penjual'] = $x->npwp_penjual;
        $data['npwp_penjual_ket'] = $x->npwp_penjual_ket;
        $data['skd_penjual'] = $x->skd_penjual;
        $data['skd_penjual_ket'] = $x->skd_penjual_ket;
        $data['created_at']  = date('d/m/Y', strtotime($x->created_at));


        $footerHTML = '<hr><small>Lembar Persetujuan Dokumen Kredit</small>';
        require_once("vendor/autoload.php"); 
        $mpdf = new \Mpdf\Mpdf();
        $html = $this->load->view('report/lpdk', $data, true);
        $mpdf->WriteHTML($html);
        $mpdf->SetHTMLFooter($footerHTML);
        $mpdf->Output();
    }
}
