<?php
defined('BASEPATH') or exit('No direct script access allowed');
class CekSertifikat_controller extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('Model_cek_sertifikat');
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
}
