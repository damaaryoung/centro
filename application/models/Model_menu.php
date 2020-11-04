<?php
class Model_menu extends ci_model{
    

    var $table = 'user';
    var $column_order = array(null, 'nama', 'user', 'divisi_id', 'jabatan');
    var $column_search = array('nama', 'user', 'divisi_id', 'jabatan');
    var $order = array('nama' => 'asc');

    private function _get_datatables_query()
    {
        $this->db = $this->load->database('db2', TRUE);
        $this->db->from($this->table);
        $this->db->where('flg_block', 'N');
 
        $i = 0;
     
        foreach ($this->column_search as $item)
        {
            if($_POST['search']['value'])
            {
                 
                if($i===0)
                {
                    $this->db->group_start(); 
                    $this->db->like($item, $_POST['search']['value']);
                }
                else
                {
                    $this->db->or_like($item, $_POST['search']['value']);
                }
 
                if(count($this->column_search) - 1 == $i) 
                    $this->db->group_end(); 
            }
            $i++;
        }
         
        if(isset($_POST['order'])) 
        {
            $this->db->order_by($this->column_order[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
        } 
        else if(isset($this->order))
        {
            $order = $this->order;
            $this->db->order_by(key($order), $order[key($order)]);
        }
    }
 
    function get_datatables()
    {
        $this->db = $this->load->database('db2', TRUE);
        $this->_get_datatables_query();
        if($_POST['length'] != -1)
        $this->db->limit($_POST['length'], $_POST['start']);
        $query = $this->db->get();
        return $query->result();
    }
 
    function count_filtered()
    {
        $this->db = $this->load->database('db2', TRUE);
        $this->_get_datatables_query();
        $query = $this->db->get();
        return $query->num_rows();
    }
 
    public function count_all()
    {
        $this->db = $this->load->database('db2', TRUE);
        $this->db->from($this->table);
        return $this->db->count_all_results();
    }

    function post($data)
    {
        $this->db->insert('menu_master',$data);
    }
    
    function edit($data,$id)
    {
        $this->db->where('id',$id);
        $this->db->update('menu_master',$data);
    }
    
    function delete($id)
    {
        $this->db->where('id',$id);
        $this->db->delete('menu_master');
    }

    function getUser(){
        $url     = $this->config->item('api_url') . "api/user" ;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Authorization: Bearer '.$this->session->userdata('SESSION_TOKEN')
        ));
        $output = curl_exec($ch);
        curl_close($ch);
        return json_decode($output, true);
    }

    function cabang(){
        return $this->db->get('mk_cabang')->result();
    }
    
}