<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Memo_so extends CI_Controller {

	function __construct(){
        parent::__construct();
    }

	public function index()
	{
		$id = $this->input->post('id');
		$query = "SELECT * from view_report_so WHERE id_so ='$id'";

		$result = $this->db->query($query);

		$x      = $result->row();
		$id_calon_debitur = $x->id_calon_debitur;
		$data['nomor_so'] = $x->nomor_so;
		$data['tanggal']  = date('d/m/Y',strtotime($x->tgl_buat));
		$data['asal_data'] = $x->asal_data;
		$data['nama_so'] = $x->nama_so;
		$data['nama_marketing'] = $x->nama_marketing;
		$data['plafon_pinjaman'] = $x->plafon_pinjaman;
		$data['tenor']= $x->tenor;
		$data['jenis_pinjaman'] = $x->jenis_pinjaman;
		$data['tujuan_pinjaman'] = $x->tujuan_pinjaman;
		$data['nama_lengkap'] = $x->nama_lengkap;
		$data['jenis_kelamin'] = $x->jenis_kelamin;
		$data['gelar_keagamaan'] = $x->gelar_keagamaan;
		$data['status_nikah'] = $x->status_nikah;
		$data['gelar_pendidikan'] = $x->gelar_pendidikan;
		$data['no_ktp'] = $x->no_ktp;
		$data['no_kk'] = $x->no_kk;
		$data['ibu_kandung'] = $x->ibu_kandung;
		$data['no_ktp_kk'] = $x->no_ktp_kk;
		$data['no_npwp'] = $x->no_npwp;
		$data['tempat_lahir'] = $x->tempat_lahir;
		$data['agama'] = $x->agama;
		$data['tgl_lahir'] = $x->tgl_lahir;
		$data['alamat_ktp'] =$x->alamat_ktp;
		$data['kecamatan_ktp'] = $x->kecamatan_ktp;
		$data['provinsi_ktp'] = $x->provinsi_ktp;
		$data['kelurahan_ktp'] = $x->kelurahan_ktp;
		$data['kabupaten_ktp'] = $x->kabupaten_ktp;
		$data['rt_ktp'] = $x->rt_ktp;
		$data['rw_ktp'] = $x->rw_ktp;
		$data['kode_pos_ktp'] = $x->kode_pos_ktp;
		$data['alamat_domisili'] = $x->alamat_domisili;
		$data['kecamatan_domisili'] = $x->kecamatan_domisili;
		$data['provinsi_domisili'] = $x->kecamatan_domisili;
		$data['kabupaten_domisili'] = $x->kabupaten_domisili;
		$data['kelurahan_domisili'] = $x->kelurahan_domisili;
		$data['rt_domisili'] = $x->rt_domisili;
		$data['rw_domisili'] = $x->rw_domisili;
		$data['jumlah_tanggungan'] = $x->jumlah_tanggungan;
		$data['kode_pos_domisili'] = $x->kode_pos_domisili;
		$data['no_hp'] = $x->no_hp;
		$data['no_telp'] = $x->no_telp;
		$data['pendidikan_terakhir'] = $x->pendidikan_terakhir;
		$data['nama_lengkap_pasangan'] = $x->nama_pasangan;
		$data['jenis_kelamin_pasangan'] = $x->jk_pasangan;
		$data['ibu_kandung_pasangan'] = $x->ibu_kandung_pasangan;
		$data['no_kk_pasangan'] = $x->no_kk_pasangan;
		$data['no_ktp_pasangan'] = $x->no_ktp_pasangan;
		$data['no_npwp_pasangan'] = $x->no_npwp_pasangan;
		$data['no_ktp_kk_pasangan'] = $x->no_ktp_kk_pasangan;
		$data['agama_pasangan'] = "";
		$data['tempat_lahir_pasangan'] = $x->tempat_lahir_pasangan;
		$data['tgl_lahir_pasangan'] =$x->tgl_lahir_pasangan;
		$data['alamat_pasangan'] = $x->alamat_pasangan;
		$data['no_telp_pasangan'] = $x->no_telp_pasangan;

		$x = $this->db->query("SELECT id_penjamin FROM `trans_so` WHERE id ='$id'");
		$result = $x->row();
		$id_jaminan = isset($result->id_penjamin) ? $result->id_penjamin :"0";

		if($id_jaminan !== '0'){
			$query = "SELECT * FROM `view_penjamin_debitur` 
								  WHERE id IN ($id_jaminan) ";
			$rows = $this->db->query($query);
			$data['row'] = $rows;
		}else{
			$rows = 0;
			$data['row'] = $rows;
		}

		

		// $this->load->view('report/memo_ao',$data);

		$mpdf = new \Mpdf\Mpdf();
        $html = $this->load->view('report/memo_so',$data,true);
        $mpdf->WriteHTML($html);
        $mpdf->Output();
	}
}
