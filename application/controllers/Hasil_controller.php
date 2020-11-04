<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Hasil_controller extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('Model_hasil');
    }

    function get_data_so()
    {
        $list = $this->Model_hasil->get_datatables();
        $data = array();
        $no = $_POST['start'];
        foreach ($list as $field) {
            $no++;
            $status_das1 = $field->status_das;
            $status_hm1 = $field->status_hm;
            $status_das = [];
            $status_hm = [];

            $id =  $field->id;
            $catatan_das = $field->catatan_das;
            if ($status_das1 == 1) {
                $status_das = 'complete';
            } else if ($status_das1 == 0) {
                $status_das = 'waiting';
            } else if ($status_das1 == 2) {
                $status_das = 'reject';
            };

            $url = "report/memo_so";
            if ($status_hm1 == 1) {
                $status_hm = 'complete';
            } else if ($status_hm1 == 0) {
                $status_hm = 'waiting';
            } else if ($status_hm1 == 2) {
                $status_hm = 'reject';
            };
            $row = array();
            $row[] = $no;
            $row[] = $field->tanggal;
            $row[] = $field->nomor_so;
            $row[] = $field->nama_so;
            $row[] = $field->asal_data;
            $row[] = $field->nama_marketing;
            $row[] = $field->nama_debitur;
            $row[] = $status_das;
            $row[] = $status_hm;
            $row[] = '<button type="button" class="btn btn-warning btn-sm detail"  data-target="#update" data="' . $id . '"><i style="color: #fff;" class="fas fa-eye"></i></button>
            <button type="button"  class="btn btn-warning btn-sm note" style="background-color: #007bff; border-color: #17a2b8;" data12="' . $catatan_das . '"><i style="color: #fff;" class="fas fa-sticky-note"></i></button>';
            $data[] = $row;
        }

        $output = array(
            "draw" => $_POST['draw'],
            "recordsTotal" => $this->Model_hasil->count_all(),
            "recordsFiltered" => $this->Model_hasil->count_filtered(),
            "data" => $data,
        );
        //output dalam format JSON
        echo json_encode($output);
    }
}
