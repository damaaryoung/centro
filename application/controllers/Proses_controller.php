<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Proses_controller extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('Model_proses');
    }

    function get_data_proses()
    {
        $list = $this->Model_proses->get_datatables();
        $data = array();
        $no = $_POST['start'];
        foreach ($list as $field) {
            $no++;
            $status_das1 = $field->status_das;
            $status_das = [];

            $id =  $field->id;

            $url = "report/memo_so";
            if ($status_das1 == 1) {
                $status_das = 'complete';
            } else if ($status_das1 == 0) {
                $status_das = 'waiting';
            } else if ($status_das1 == 2) {
                $status_das = 'reject';
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
            $row[] = '<a type="button" class="btn btn-info btn-sm detail"  data-target="#update" data="' . $id . '"><i style="color: #fff;" class="fas fa-pencil-alt"></i></a>';
            $data[] = $row;
        }

        $output = array(
            "draw" => $_POST['draw'],
            "recordsTotal" => $this->Model_proses->count_all(),
            "recordsFiltered" => $this->Model_proses->count_filtered(),
            "data" => $data,
        );
        //output dalam format JSON
        echo json_encode($output);
    }
}
