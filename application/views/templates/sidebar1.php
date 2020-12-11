<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">

<!-- sidebar: style can be found in sidebar.less -->
<section class="sidebar">

  <!-- Sidebar user panel (optional) -->
  <div class="user-panel">
    <div class="pull-left image">
      <img src="<?php echo base_url('assets/dist/img/user2-160x160.jpg')?>" class="img-circle" alt="User Image">
    </div>
    <div class="pull-left info">
      <p><?php echo $this->session->userdata('nama'); ?></p>
      <!-- Status -->
      <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
    </div>
  </div>

  <!-- search form (Optional) -->
 <!--  <form action="#" method="get" class="sidebar-form">
    <div class="input-group">
      <input type="text" name="q" class="form-control" placeholder="Search...">
      <span class="input-group-btn">
          <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
          </button>
        </span>
    </div>
  </form> -->
  <!-- /.search form -->

  <!-- Sidebar Menu -->
  <ul class="sidebar-menu" data-widget="tree">
   <!--  <li class="header">HEADER</li> -->
    <!-- Optionally, you can add icons to the links -->
    <li id="dashboard" class=" ">
        <a href="<?php echo base_url(); ?>index.php/DashboardController/index"><i class="fa fa-link"></i> 
          <span>Dashboard</span></a>
    </li>

    <?php  if($this->session->userdata('dokumen') == '2'){ ?>
      <li id="dokumen" class="treeview "> 
        <a href="#"><i class="fa fa-table"></i> <span>Asset Dokumen</span>
          <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul  class="treeview-menu">
          <li><a href="<?php echo base_url(); ?>index.php/AsetDokumenEntryController/index">Entry Aset Dokumen</a></li>
          <li id='agunan'><a href="<?php echo base_url(); ?>index.php//index">View Aset Dokumen</a></li>
          <li id='agunan'><a href="<?php echo base_url(); ?>index.php/AsetDokumenVerifikasiController/index">Verifikasi</a></li>
        </ul>
      </li>
    <?php } else{} ?>
      
    <?php  if($this->session->userdata('customer') == '3'){ ?>        
          <li class="treeview"> 
            <a href="#"><i class="fa fa-table"></i> <span>Data Customer</span>
              <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
            </a>
            <ul class="treeview-menu">
              <li><a href="<?php echo base_url(); ?>">Tambah Data Latih</a></li>
              <li><a href="<?php echo base_url(); ?>">List Data Latih</a></li>
            </ul>
          </li>
    <?php } else{} ?>

    <!--<li><a href="<?php //echo base_url(); ?>index.php/Kriteria/MainKriteriaCtrl/index"><i class="fa fa-list"></i> <span>Kriteria</span></a></li>-->

    <!--<li><a href="<?php //echo base_url(); ?>index.php/SuratPengguna/ListSuratCtrl/index"><i class="fa fa-envelope"></i> <span>List Surat</span></a></li> -->
         
     <!-- BRANCH SIDE -->   

     <?php  if($this->session->userdata('customer') == '1'){ ?>        
  

    <li class="treeview"> 
      <a href="#"><i class="fa fa-paper-plane-o"></i> <span>Cabang Kirim Dokumen</span>
        <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
      </a>
      <ul class="treeview-menu">
        <li><a href="<?php //echo base_url(); ?>">Kirim Ke Custodian</a></li>
        <li><a href="<?php //echo base_url(); ?>">Verifikasi</a></li>
      </ul>
    </li>

    <li class="treeview"> 
      <a href="#"><i class="fa fa-file-archive-o"></i> <span>Cabang Terima Dokumen</span>
        <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
      </a>
      <ul class="treeview-menu">
        <li><a href="<?php //echo base_url(); ?>">Terima Dari Custodian</a></li>
        <li><a href="<?php //echo base_url(); ?>">Verifikasi</a></li>
      </ul>
    </li>

    <li class="treeview"> 
      <a href="#"><i class="fa fa-plus-circle"></i> <span>Request Jaminan</span>
        <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
      </a>
      <ul class="treeview-menu">
        <li><a href="<?php //echo base_url(); ?>">Request Jaminan Ke Custodian</a></li>
        <li><a href="<?php //echo base_url(); ?>">Verifikasi</a></li>
      </ul>
    </li>

    <li class="treeview"> 
      <a href="#"><i class="fa fa-file-text-o"></i> <span>Update Kirim Dokumen</span>
        <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
      </a>
      <ul class="treeview-menu">
        <li><a href="<?php //echo base_url(); ?>">Update Kirim Ke Custodian</a></li>
        <li><a href="<?php //echo base_url(); ?>">Verifikasi</a></li>
      </ul>
    </li>



    <!-- CUSTODIAN SIDE -->

    <li class="treeview"> 
      <a href="#"><i class="fa fa-file-archive-o"></i> <span>Penerimaan Jaminan</span>
        <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
      </a>
      <ul class="treeview-menu">
        <li><a href="<?php //echo base_url(); ?>">Penerimaan Jaminan Dari Cabang</a></li>
        <li><a href="<?php //echo base_url(); ?>">Verifikasi</a></li>
      </ul>
    </li>

    <li class="treeview"> 
      <a href="#"><i class="fa fa-paper-plane-o"></i> <span>Pengiriman Jaminan</span>
        <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
      </a>
      <ul class="treeview-menu">
        <li><a href="<?php //echo base_url(); ?>">Pengiriman Jaminan Ke Cabang</a></li>
        <li><a href="<?php //echo base_url(); ?>">Verifikasi</a></li>
      </ul>
    </li>

    <li><a href="<?php// echo base_url(); ?>index.php/SuratPengguna/ListSuratCtrl/index"><i class="fa fa-file-o"></i> <span>Laporan Aset Dokumen</span></a></li> 

    <li><a href="<?php// echo base_url(); ?>index.php/SuratPengguna/ListSuratCtrl/index"><i class="fa fa-file-o"></i> <span>Rekonsiliasi Asset Dokumen</span></a></li>    
    
    <?php } else{} ?> 
    
    <li class="treeview"> 
      <a href="#"><i class="fa fa-wrench"></i> <span>User Access</span>
        <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
      </a>
      <ul class="treeview-menu">
          <li><a href="<?php echo base_url(); ?>index.php/UserAccessController/index">List User Access</a></li>
      </ul>
    </li>
    

  </ul>
  <!-- /.sidebar-menu -->
</section>
<!-- /.sidebar -->
</aside>


