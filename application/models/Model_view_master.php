<?php
class Model_view_master extends ci_model
{
    function sumber_penghasilan()
    {
        // $query = "SELECT * from view_sumber_penghasilan";
        // return $this->db->query($query);
        $x = array('id_parameter =' => '06', 'nama_parameter =' => 'JUMLAH PENDAPATAN', 'flg_aktif' => '1');
        return $this->db->select('nama_detail' , 'id_detail_params')->where($x)->get('view_creditscoring');
    }
    function pemasukan_perbulan()
    {
        $query = "SELECT * from view_pemasukan_perbulan";
        return $this->db->query($query);
    }

    function frek_trans_pemasukan()
    {
        $query = "SELECT * from view_frek_pemasukan_per_bulan";
        return $this->db->query($query);
    }

    function sumber_data_untuk_setoran()
    {
        $query = "SELECT * from view_sumber_dana_untuk_setoran";
        return $this->db->query($query);
    }
    function pengeluaran_per_bulan()
    {
        $query = "SELECT * from view_pengeluaran_per_bulan";
        return $this->db->query($query);
    }

    function frek_pengeluaran()
    {
        $query = "SELECT * from view_frek_pengeluaran_per_bulan";
        return $this->db->query($query);
    }
    function pic()
    {
        $query = "SELECT a.nama, b.nama AS AREA, c.nama AS cabang, d.nama_jenis AS jenis_pic FROM m_pic AS a LEFT JOIN mk_area AS b ON a.id_area=b.id 
        LEFT JOIN mk_cabang AS c ON a.id_cabang=c.id LEFT JOIN mj_pic AS d ON a.id_mj_pic=d.id";
        return $this->db->query($query);
    }

    function delete_anak()
    {
        $id = $this->input->post('id');
        $this->db->where('anak_id', $id);
        $result = $this->db->delete('nasabah_anak');
        return $result;
    }

    function update_penyimpangan()
    {
        $id = $this->input->post('id');
        $penyimpangan_struktur = $this->input->post('penyimpangan_struktur');

        $this->db->set('penyimpangan_struktur', $penyimpangan_struktur);
        $this->db->where('id', $id);
        $result = $this->db->update('rekomendasi_pinjaman');
        return $result;
    }

    function update_rekomendasi_pinjaman()
    {
        $id = $this->input->post('id');
        $recom_nilai_pinjaman = $this->input->post('recom_nilai_pinjaman');
        $recom_tenor = $this->input->post('recom_tenor');
        $recom_angsuran = $this->input->post('recom_angsuran');
        $recom_produk_kredit = $this->input->post('recom_produk_kredit');
        $bunga_pinjaman = $this->input->post('bunga_pinjaman');
        $note_recom = $this->input->post('note_recom');

        $this->db->set('recom_nilai_pinjaman', $recom_nilai_pinjaman);
        $this->db->set('recom_tenor', $recom_tenor);
        $this->db->set('recom_angsuran', $recom_angsuran);
        $this->db->set('recom_produk_kredit', $recom_produk_kredit);
        $this->db->set('bunga_pinjaman', $bunga_pinjaman);
        $this->db->set('note_recom', $note_recom);
        $this->db->where('id', $id);
        $result = $this->db->update('rekomendasi_pinjaman');
        return $result;
    }

    // function jenis_kredit()
    // {
    //     $query = "SELECT * from view_creditscoring WHERE nama_parameter='KREDIT CHECKING' AND id_parameter='01'";
    //     $data=$this->db->query($query)->result();
    //     return $data;
    // }

    function tampil_lokasi_jaminan()
    {
        $query = "SELECT * from view_creditscoring WHERE nama_parameter='LOKASI JAMINAN' AND id_parameter='016'";
        $data=$this->db->query($query)->result();
        return $data;
    }
    
    function data_collateral()
    {
        $query = "SELECT * from view_creditscoring WHERE nama_parameter='COLLATERAL' AND id_parameter='011'";
        $data=$this->db->query($query)->result();
        return $data;
    }

    function jenis_sertifikat()
    {
        $query = "SELECT * from view_creditscoring WHERE nama_parameter='JENIS SERTIFIKAT' AND id_parameter='017'";
        $data=$this->db->query($query)->result();
        return $data;
    }

    function pemilik_jaminan()
    {
        $query = "SELECT * from view_creditscoring WHERE nama_parameter='PEMILIK JAMINAN' AND id_parameter='013'";
        $data=$this->db->query($query)->result();
        return $data;
    }

    function tampil_data_pendidikan()
    {
        $query = "SELECT * from view_creditscoring WHERE nama_parameter='PENDIDIKAN' AND id_parameter='02'";
        $data=$this->db->query($query)->result();
        return $data;
    }
}
