
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AsetDokumenCetakController extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AsetDokumenModel/AsetDokumenCetakModel');
       
	}

    public function cetakTransaksiAsetDokumen(){
        $session = $this->session->userdata('nama');

        $nomor      = $this->input->post('nomor');
        $no_reff    = $this->input->post('no_reff');
        $status     = $this->input->post('status'); 
        $agunan_id  = $this->input->post('agunan_id');

        $sysdate = $this->AsetDokumenCetakModel->sysdate();
        foreach ($sysdate as $row) :
            $data['sysdate']         = $row["sysdate"];
        endforeach;	

        $getJaminanHeader = $this->AsetDokumenCetakModel->getJaminanHeader($nomor, $no_reff);
		foreach ($getJaminanHeader as $row) :
            $data['no_rekening']         = $row["no_rekening"];
            $data["nomor"]               = $row["nomor"];
            $data["nama"]                = $row["nama"];
            $data["alamat"]              = $row ["alamat"];
            $data["jenis_jaminan"]       = $row["jenis_jaminan"];
            $data["ket"]                 = $row["ket"];
            $data["tgl"]                 = $row["tgl"];
            $data["kota"]                = $row["kota"];
            $data["status"]              = $row["status"];
            $data["jenis_pengurusan"]    = $row["jenis_pengurusan"];
            $data["tgl_rencana_kembali"] = $row["tgl_rencana_kembali"];
            $data["nama_kantor"]         = $row["nama_kantor"];
        endforeach;	
        $getJaminanDokument = $this->AsetDokumenCetakModel->getJaminanDokument($agunan_id, $no_reff);
		foreach ($getJaminanDokument as $row) :
            $data['agunan_id']    = $row["agunan_id"];
            //sertifikat
            $data["no_shm"]             = $row["no_shm"];
            $data["no_surat_ukur"]      = $row["no_surat_ukur"];
            $data["tgl_sertifikat"]     = $row["tgl_sertifikat"];
            $data["alamat_sertifikat"]  = $row["alamat_sertifikat"];
            $data["luas_tanah"]         = $row["luas_tanah"];
            if($row["ajb"]          == "Y"){$data["ajb"] = "YA";}else{$data["ajb"] = "Tidak";}
            if($row["imb"]          == "Y"){$data["imb"] = "YA";}else{$data["imb"] = "Tidak";}
            if($row["skmht"]        == "Y"){$data["skmht"] = "YA";}else{$data["skmht"] = "Tidak";}             
            if($row["sppt"]         == "Y"){$data["sppt"]  = "YA";}else{$data["sppt"]  = "Tidak";}
            if($row["sht"]          == "Y"){$data["sht"]  = "YA";}else{$data["sht"]  = "Tidak";}
            if($row["gambar_denah"] == "Y"){$data["gambar_denah"] = "YA";}else{$data["gambar_denah"] = "Tidak";}
            if($row["stts"]         == "Y"){$data["stts"] = "YA";}else{$data["stts"] = "Tidak";}
            if($row["ssb"]          == "Y"){$data["ssb"] = "YA";}else{$data["ssb"] = "Tidak";}
            if($row["surat_roya"]   == "Y"){$data["surat_roya"] = "YA";}else{$data["surat_roya"] = "Tidak";}
            //bpkb
            $data["nomor_bpkb"]            = $row["nomor_bpkb"];
            $data["alamat_bpkb"]           = $row["alamat_bpkb"];
            $data["nama_bpkb"]             = $row["nama_bpkb"]; 
            $data["nama_merk"]             = $row["nama_merk"];
            $data["nama_type"]             = $row["nama_type"];
            $data["nama_jenis"]            = $row["nama_jenis"];
            $data["no_rangka"]             = $row["no_rangka"];
            $data["no_mesin"]              = $row["no_mesin"];
            $data["warna"]                 = $row["warna"];
            $data["tahun"]                 = $row["tahun"];
            $data["tgl_expired_stnk"]      = $row["tgl_expired_stnk"];
            $data["tahun"]                 = $row["tahun"];
            $data["no_polisi"]             = $row["no_polisi"];
            $data["tgl_expired_pajak"]     = $row["tgl_expired_pajak"];
            if($row["blanko"]              == "Y"){$data["blanko"] = "YA";}else{$data["blanko"] = "Tidak";}
            if($row["faktur_pemilik"]      == "Y"){$data["faktur_pemilik"] = "YA";}else{$data["faktur_pemilik"] = "Tidak";}
            if($row["kwitansi_jb"]         == "Y"){$data["kwitansi_jb"] = "YA";}else{$data["kwitansi_jb"] = "Tidak";}
            //EMAS
            $data["no_seri"]               = $row["no_seri"];
            $data["jenis_emas"]            = $row["jenis_emas"];
            $data["karat"]                 = $row["karat"];
            $data["berat"]                 = $row["berat"];
            $data["usernameEmas"]          = $this->session->userdata('nama');
       
        endforeach;	
      
        if($data["jenis_jaminan"] == 'SERTIFIKAT'){
            if($data["status"] == 'MASUK'){
                $cetak = $this->load->view('ViewAsetDokumen/Cetak/Sertifikat/CetakanTransaksiPenerimaanAsetDokumen.php', $data, TRUE);
            }else if($data["status"] == 'PINJAM'){
                $cetak = $this->load->view('ViewAsetDokumen/Cetak/Sertifikat/CetakanTransaksiPinjamAsetDokumen.php', $data, TRUE);
            }else if($data["status"] == 'KELUAR'){
                $cetak = $this->load->view('ViewAsetDokumen/Cetak/Sertifikat/CetakanTransaksiKeluarAsetDokumen.php', $data, TRUE);
            }else if($data["status"] == 'WAITING'){
                $cetak = $this->load->view('ViewAsetDokumen/Cetak/Sertifikat/CetakanTransaksiPinjamAsetDokumen.php', $data, TRUE);
            }
        }else if($data["jenis_jaminan"] == 'BPKB'){
            if($data["status"] == 'MASUK'){
                $cetak = $this->load->view('ViewAsetDokumen/Cetak/BPKB/CetakanTransaksiPenerimaanAsetDokumen.php', $data, TRUE);
            }else if($data["status"] == 'PINJAM'){
                $cetak = $this->load->view('ViewAsetDokumen/Cetak/BPKB/CetakanTransaksiPinjamAsetDokumen.php', $data, TRUE);
            }else if($data["status"] == 'KELUAR'){
                $cetak = $this->load->view('ViewAsetDokumen/Cetak/BPKB/CetakanTransaksiKeluarAsetDokumen.php', $data, TRUE);
            }else if($data["status"] == 'WAITING'){
                $cetak = $this->load->view('ViewAsetDokumen/Cetak/BPKB/CetakanTransaksiPinjamAsetDokumen.php', $data, TRUE);
            }
        }else if($data["jenis_jaminan"] == 'EMAS'){
            if($data["status"] == 'MASUK'){
                $cetak = $this->load->view('ViewAsetDokumen/Cetak/Emas/CetakanTransaksiPenerimaanAsetDokumen.php', $data, TRUE);
            }else if($data["status"] == 'PINJAM'){
                $cetak = $this->load->view('ViewAsetDokumen/Cetak/Sertifikat/CetakanTransaksiPinjamAsetDokumen.php', $data, TRUE);
            }else if($data["status"] == 'KELUAR'){
                $cetak = $this->load->view('ViewAsetDokumen/Cetak/Sertifikat/CetakanTransaksiKeluarAsetDokumen.php', $data, TRUE);
            }else if($data["status"] == 'WAITING'){
                $cetak = $this->load->view('ViewAsetDokumen/Cetak/Sertifikat/CetakanTransaksiPinjamAsetDokumen.php', $data, TRUE);
            }
        }

        // var_dump($getJaminanHeader,'<br><br><br>', $getJaminanDokument, '<br><br><br>',  $data);
        // die;

		
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
