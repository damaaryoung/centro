<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Cek_sertifikat_report extends CI_Controller
{
    var $API = "";

    function __construct()
    {
        parent::__construct();
        $this->load->model('AsetDokumenModel/AsetDokumenCetakModel');
    }

    public function index($id)
    {
      $url     = $this->config->item('api_url') . "/api/master/sertifikat/".$id."" ;
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Authorization: Bearer '.$this->session->userdata('SESSION_TOKEN')
      ));
      $output = curl_exec($ch);
      curl_close($ch);
      $data=json_decode($output, true);
      // var_dump($data);
      $result['detail']=$data['data'];
      
      require_once("vendor/autoload.php");
    

      $status =  $data['data'][0]['status'];
      if($status == 'WAITING' || $status == 'MASUK'){
        $mpdf = new \Mpdf\Mpdf();
        $html = $this->load->view('master/cek_sertifikat/print', $result, true);
      
      } else if($status == 'PINJAM'){
        $getAlamatHeader = $this->AsetDokumenCetakModel->getAlamatHeader();
        foreach ($getAlamatHeader as $row) :
            $result['alamatHeader']         = $row["hasil"];
        endforeach;	 
        $mpdf = new \Mpdf\Mpdf();
        $html = $this->load->view('master/cek_sertifikat/print_pinjam', $result, true);
      }
      $mpdf->WriteHTML($html);
      $mpdf->Output();

      
 
    }
}
