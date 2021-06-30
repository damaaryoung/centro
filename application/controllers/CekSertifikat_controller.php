<?php
defined('BASEPATH') or exit('No direct script access allowed');
class CekSertifikat_controller extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('Model_cek_sertifikat');
    }
    function tampil_data1(){
      if (isset($_POST['filter'])) {
        $filter=$_POST['filter'];
      }else {
        $filter="";
      }
      if (isset($_POST['page'])) {
        $page=$_POST['page'];
      }else {
        $page="1";
      }
      if (isset($_POST['main_kode_kantor'])) {
        $main_kode_kantor=$_POST['main_kode_kantor'];
      }else {
        $main_kode_kantor="";
      }
      $data=$this->Model_cek_sertifikat->tampil_data1($filter,$page,$main_kode_kantor);
      $data['pagination']=$data['data']['last_page'];
      $data['page']=$data['data']['current_page'];
      $data['data']=$data['data']['data'];
      $this->load->view('master/cek_sertifikat/table_data',$data);
    }

    function tampil_data2(){
      if (isset($_POST['filter'])) {
        $filter=$_POST['filter'];
      }else {
        $filter="";
      }
      if (isset($_POST['page'])) {
        $page=$_POST['page'];
      }else {
        $page="1";
      }
      $data=$this->Model_cek_sertifikat->tampil_data2($filter,$page);
      $data['pagination']=$data['data']['last_page'];
      $data['page']=$data['data']['current_page'];
      $data['data']=$data['data']['data'];
      $this->load->view('master/cek_sertifikat/table_data',$data);
    }

    function view()
    {
        $view=$this->Model_cek_sertifikat->view();
        $data['view'] = $view['data'];
        $data['id']=$this->input->post('id', TRUE);
        $this->load->view('master/cek_sertifikat/view',$data);
    }
    function updated(){
      echo $this->Model_cek_sertifikat->updated();
    }

    public function exportExcelModal(){
      $this->load->view('master/cek_sertifikat/view_export_excel');
    }
    public function exportExcel(){
      $date1 = $this->input->post('dari_tgl');
      $date2 = $this->input->post('sampai_tgl');
      
      
      $dateTimestamp1 = strtotime($date1); 
      $dateTimestamp2 = strtotime($date2); 

      if ($dateTimestamp1 <= $dateTimestamp2) {
        $dari_tgl   = $date1;
        $sampai_tgl = $date2;

      }else{
        $dari_tgl   = $date2;
        $sampai_tgl = $date1;
      }

      $data['report'] = $this->Model_cek_sertifikat->getReportSertifikat($dari_tgl,$sampai_tgl);
      $sysdate = $this->Model_cek_sertifikat->sysdate();
      foreach ($sysdate as $row) :
        $data['sysdate']    = $row['sysdate']; 
      endforeach;	


      $this->load->view('master/cek_sertifikat/print_excel', $data);
    }
}
