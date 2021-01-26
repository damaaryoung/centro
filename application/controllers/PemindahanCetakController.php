<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PemindahanCetakController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('PemindahanLokasiJaminanModel/PemindahanUpdateModel');
       
	}

    public function cetakProses(){
        $session                     = $this->session->userdata('nama');
		$kode_kantor                 = $this->session->userdata('kd_cabang');
		$idCetak                       = $this->input->post('idCetak');
		$nomorCetak                    = $this->input->post('nomorCetak');

		$data['nomorCetak']            = $this->input->post('nomorCetak');
		$data['idCetak']               = $this->input->post('idCetak');
		
		$getJaminanPemindahanHeaderCetak = $this->PemindahanUpdateModel->getJaminanPemindahanHeaderCetak($nomorCetak);
		foreach ($getJaminanPemindahanHeaderCetak as $row) :
			$data['nomor'] =  $row['nomor'];
            $data['tgl'] =  $row['tgl'];
            $data['kota'] =  $row['kota'];
            $data['kode_kantor_asal'] =  $row['kode_kantor_asal'];
            $data['nama_kantor_asal'] =  $row['nama_kantor_asal'];
            $data['kode_kantor_tujuan'] =  $row['kode_kantor_tujuan'];
            $data['nama_kantor_tujuan'] =  $row['nama_kantor_tujuan'];
			$data['ket'] =  $row['ket'];
			$data['lokasi_penyimpanan'] =  $row['lokasi_penyimpanan'];
        endforeach;	
        $getAlamatHeader = $this->PemindahanUpdateModel->getAlamatHeader();
		foreach ($getAlamatHeader as $row) :
            $data['alamatHeader']         = $row["hasil"];
        endforeach;	

        
        $data['getPemindahanJaminanCetak']   = $this->PemindahanUpdateModel->getPemindahanJaminanCetak($nomorCetak);
			
		// $data['selectKodeKantor'] = $this->PemindahanUpdateModel->selectKodeKantor();
		// $data['getCentro'] = $this->PemindahanUpdateModel->getCentro();
        // $this->load->view('ViewPemindahanLokasiJaminan/Update/PemindahanLokasiUpdate.php', $data);
        
        // var_dump($getJaminanPemindahanHeaderCetak,'<br><br><br>', $getPemindahanJaminanCetak);
        // die;
        
        
        $cetak = $this->load->view('ViewPemindahanLokasiJaminan/Cetak/CetakanTerimaPemindahanJaminan.php', $data, TRUE);

        		
        // Require composer autoload
        require_once("vendor/autoload.php");
        // Create an instance of the class:
        $mpdf = new \Mpdf\Mpdf();
        // Write some HTML code:
        $mpdf->WriteHTML($cetak);
        // Output a PDF file directly to the browser
        ob_clean();
        $mpdf->Output();
		
	}


}
