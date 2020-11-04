<?php
class Model_auth extends ci_model{

    function get_data($url){
        $curl     = $this->config->item('api_url') . $url ;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $curl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Authorization: Bearer '.$this->session->userdata('SESSION_TOKEN')
        ));
        $output = curl_exec($ch);
        curl_close($ch);
        return json_decode($output, true);
    }
    
    function post_data($url, $arr){
        $curl     = $this->config->item('api_url') . $url ;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $curl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Authorization: Bearer '.$this->session->userdata('SESSION_TOKEN')
        ));
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $arr);
        $output = curl_exec($ch);
        curl_close($ch);
        return json_decode($output, true);
    }

    function rupiah($angka){
        $hasil_rupiah = number_format($angka,0,'','.');
        return $hasil_rupiah;
    }
}