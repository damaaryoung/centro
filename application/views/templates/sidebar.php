 <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4" style="background-color: #9A0303;" >
    <!-- Brand Logo -->
    <a href="<?php echo base_url(); ?>index.php/DashboardController/index" class="brand-link">
      <img src="<?php echo base_url(); ?>assets/design/images/kmi_logo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light"><b>CENTRO</b>&nbsp;SYSTEM</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="<?php echo base_url('assets/dist/img/user2-160x160.jpg')?>"class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block"><?php echo $this->session->userdata('nama'); ?></a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->

          <li class="nav-item">
            <a href="<?php echo base_url(); ?>index.php/DashboardController/index" class="nav-link">
             <i style="color : #FFDE00" class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <span class="right badge badge-danger">Dashboard</span>
              </p>
            </a>
          </li>     
          <!-- START MENU ASET DOKUMEN -->
          <?php  if($this->session->userdata('dokumen') == '2'){ ?>
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i style="color : #FFDE00" class="nav-icon fas fa-th"></i>
                <p>
                  Asset Dokumen
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>index.php/AsetDokumenEntryController/index" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Entry Aset Dokumen</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>index.php/AsetDokumenVerifikasiController/index" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Verifikasi Aset Dokumen</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>index.php/PemindahanJaminanMainController/index" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Pemindahan Lokasi</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>index.php/PemindahanVerifikasiController/index" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p style="font-size: 14px;">Verifikasi Pemindahan Lokasi</p>
                  </a>
                </li>
              </ul>
            </li>
          <?php } else if($this->session->userdata('divisi_id') == 'IT'){ ?>
                <li class="nav-item has-treeview">
                  <a href="#" class="nav-link">
                    <i style="color : #FFDE00" class="nav-icon fas fa-th"></i>
                    <p>
                      Asset Dokumen
                      <i class="fas fa-angle-left right"></i>
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="<?php echo base_url(); ?>index.php/AsetDokumenEntryController/index" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Entry Aset Dokumen</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="<?php echo base_url(); ?>index.php/AsetDokumenVerifikasiController/index" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Verifikasi Aset Dokumen</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="<?php echo base_url(); ?>index.php/PemindahanJaminanMainController/index" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Pemindahan Lokasi</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="<?php echo base_url(); ?>index.php/PemindahanVerifikasiController/index" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p style="font-size: 14px;">Verifikasi Pemindahan Lokasi</p>
                      </a>
                    </li>
                  </ul>
                </li>
          <?php } else{} ?>
          <!-- END MENU ASET DOKUMEN -->

          <!-- START MENU ASURANSI -->
             <!-- <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i style="color : #FFDE00" class="nav-icon fas fa-th"></i>
                <p>
                  Asuransi (Coming Soon)
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p> Asuransi (Coming Soon)</p>
                  </a>
                </li>
              </ul>
            </li>  -->


          <!-- END MENU ASURANSI -->

          <!-- MENU CREDIT CHECKING -->
          <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i ><img src="../../assets/dist/img/akun.png" alt="sefin logo" style=" width: 15% ; height: 15%;"></i>
                <p>
                  SEFIN
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>index.php/SefinController/index" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p> Proses Credit Checking</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>index.php/SefinController/ds_spv" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p> Hasil Credit Checking</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>index.php/SefinController/pengajuan_lpdk" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p> Pengajuan LPDK</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>index.php/SefinController/lpdk" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p> LPDK</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>index.php/SefinController/cek_sertifikat" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p> Cek Sertifikat</p>
                  </a>
                </li>
              </ul>
          </li> 
          <!-- End MENU CREDIT CHECKING -->

          <!-- START MENU USER ACCESS -->
          <?php  if($this->session->userdata('divisi_id') == 'IT'){ ?>
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i style="color : #FFDE00" class="nav-icon fas fa-th"></i>
                <p>
                  User Access
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>index.php/UserAccessController/index" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>List User Access</p>
                  </a>
                </li>
              </ul>
            </li>
          <?php } else if($this->session->userdata('admin') == '1'){ ?>
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i style="color : #FFDE00" class="nav-icon fas fa-th"></i>
                <p>
                  User Access
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>index.php/UserAccessController/index" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>List User Access</p>
                  </a>
                </li>
              </ul>
            </li>
          <?php } else{} ?>
          <!-- END MENU USER ACCESS -->

        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>