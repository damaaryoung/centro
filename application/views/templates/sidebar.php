  <!-- CSS COLOR ICON SIDEBAR -->
  <style>
  .icon_color_sidebar {
    color : #FFDE00;
  }

  .nav-sidebar>.nav-item {
    margin-bottom: 0;
    font-size: 12px !important;
  }
  </style>
  <!-- END CSS COLOR ICON SIDEBAR -->
 
 <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4" style="background-color: #9A0303;" >
    <!-- Brand Logo -->
    <a href="<?php echo base_url(); ?>dashboard" class="brand-link">
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
            <a href="<?php echo base_url(); ?>dashboard" class="nav-link">
             <i class="nav-icon fas fa-tachometer-alt icon_color_sidebar"></i>
              <p>
                Dashboard
                <span class="right badge badge-danger">Dashboard</span>
              </p>
            </a>
          </li>  

        <!-- START MENU ASURANSI -->
          <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-book-reader icon_color_sidebar"></i>
                <p>
                  Accounting
                  <i class="fas fa-angle-left right"></i> 
                </p>
              </a>
            <ul class="nav nav-treeview">
              <li class="nav-item has-treeview">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-asterisk icon_color_sidebar"></i> 
                  <p>
                     Rencana Realisasi
                    <i class="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                    <?php if($this->session->userdata('divisi_id') == 'IT'){ ?>
                      <li class="nav-item">
                        <a href="<?php echo base_url(); ?>rencana_realisasi" class="nav-link">
                          <i class="far fa-circle nav-icon"></i> 
                          <p>Rencana Realisasi</p>
                        </a>
                      </li>
                    <?php }?>
                    <?php if($this->session->userdata('divisi_id') == 'IT'){ ?>
                      <li class="nav-item">
                        <a href="<?php echo base_url(); ?>rencana_realisasi_master" class="nav-link">
                          <i class="far fa-circle nav-icon"></i>
                          <p>Rencana Realisasi Master</p>
                        </a>
                      </li>
                    <?php }?>
                </ul>
            </ul>
          </li>
          <!-- END MENU ASURANSI -->

          <!-- START MENU ASET DOKUMEN -->
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-th icon_color_sidebar"></i>
                <p>
                  Asset Dokumen
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
              <?php  if($this->session->userdata('entry_aset_dokumen') == 'ok' || $this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('user_access_group') == 'ok'){ ?>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>AsetDokumenViewAsetController/index" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>View Aset Dokumen</p>
                  </a>
                </li>
              <?php } if($this->session->userdata('entry_aset_dokumen') == 'ok' || $this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('entry_aset_dokumen_group') == 'ok'){ ?>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>entry_asset_document" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Entry Aset Dokumen</p>
                  </a>
                </li>
             <?php } if($this->session->userdata('verifikasi_aset_dokumen') == 'ok' || $this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('verifikasi_aset_dokumen_group') == 'ok'){ ?>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>verifikasi_aset_dokumen" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Verifikasi Aset Dokumen</p>
                  </a>
                </li>
              <?php } if($this->session->userdata('pemindahan_lokasi') == 'ok' || $this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('pemindahan_lokasi_group') == 'ok'){ ?>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>pemindahan_jaminan" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Pemindahan Lokasi</p>
                  </a>
                </li>
              <?php } if($this->session->userdata('verifikasi_pemindahan_lokasi') == 'ok' || $this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('verifikasi_pemindahan_lokasi_group') == 'ok'){ ?>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>verifikasi_pemindahan_jaminan" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Verifikasi Pemindahan Lokasi</p>
                  </a>
                </li>
              <?php } ?>
              <?php if($this->session->userdata('request_jaminan_ke_centro') == 'ok' || $this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('request_jaminan_ke_centro_group') == 'ok' ){ ?>
                  <li class="nav-item">
                    <a href="<?php echo base_url(); ?>request_jaminan_centro" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p> Request Jaminan Ke Centro</p>
                    </a>
                  </li>
                <?php }?>
                <?php if($this->session->userdata('verifikasi_request_jaminan_ke_centro') == 'ok' || $this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('verifikasi_request_jaminan_ke_centro_group') == 'ok'){ ?>
                  <li class="nav-item">
                    <a href="<?php echo base_url(); ?>request_jaminan_verifikasi" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p> Verifikasi Request Jaminan</p>
                    </a>
                  </li>
                <?php }?>
              </ul>
            </li>
          <!-- END MENU ASET DOKUMEN -->

          <!-- MENU CREDIT CHECKING -->
            <li class="nav-item has-treeview">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-file-invoice icon_color_sidebar"></i>
                  <p>
                    Credit Checking & Operasional
                    <i class="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                <?php  if($this->session->userdata('proses_credit_checking') == 'ok' || $this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('proses_credit_checking_group') == 'ok'){ ?>
                  <li class="nav-item">
                    <a href="<?php echo base_url(); ?>SefinController/index" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p> Proses Credit Checking</p>
                    </a>
                  </li>
                <?php  } if($this->session->userdata('hasil_credit_checking') == 'ok' || $this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('hasil_credit_checking_group') == 'ok'){ ?>
                  <li class="nav-item">
                    <a href="<?php echo base_url(); ?>SefinController/ds_spv" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p> Hasil Credit Checking</p>
                    </a>
                  </li>
                <?php } if($this->session->userdata('pengajuan_LPDK') == 'ok' || $this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('pengajuan_LPDK_group') == 'ok'){ ?>
                  <li class="nav-item">
                    <a href="<?php echo base_url(); ?>SefinController/pengajuan_lpdk" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p> Pengajuan LPDK</p>
                    </a>
                  </li>
                <?php } if($this->session->userdata('LPDK') == 'ok' || $this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('LPDK_group') == 'ok'){ ?>
                  <li class="nav-item">
                    <a href="<?php echo base_url(); ?>SefinController/lpdk" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p> LPDK</p>
                    </a>
                  </li>
                <?php } if($this->session->userdata('cek_sertifikat') == 'ok' || $this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('cek_sertifikat_group') == 'ok'){ ?>
                  <li class="nav-item">
                    <a href="<?php echo base_url(); ?>SefinController/cek_sertifikat" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p> Cek Sertifikat</p>
                    </a>
                  </li>
                <?php }?>
                </ul>
            </li> 
         
          <!-- END MENU CREDIT CHECKING -->

          <!-- START MENU ASURANSI -->
          <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-shield-alt icon_color_sidebar"></i>
                <p>
                  Asuransi
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
            <ul class="nav nav-treeview">
              <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-home icon_color_sidebar"></i>
                <p>
                  Asuransi Jaminan
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
                <ul class="nav nav-treeview">
                  <?php if($this->session->userdata('rekap_titipan_asuransi_jaminan') == 'ok' || $this->session->userdata('rekap_titipan_asuransi_jaminan_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                  <li class="nav-item">
                    <a href="<?php echo base_url(); ?>rekap_titipan_asuransi_jaminan" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Rekap Titipan Asuransi Jaminan</p>
                    </a>
                  </li>
                  <?php }?>
                  <?php if($this->session->userdata('pengcoveran_asuransi_jaminan') == 'ok' || $this->session->userdata('pengcoveran_asuransi_jaminan_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                    <li class="nav-item">
                      <a href="<?php echo base_url(); ?>cover_asuransi_jaminan" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Pengcoveran Asuransi Jaminan</p>
                      </a>
                    </li>
                  <?php }?>
                  <?php if($this->session->userdata('polis_asuransi_jaminan') == 'ok' || $this->session->userdata('polis_asuransi_jaminan_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                    <li class="nav-item">
                      <a href="<?php echo base_url(); ?>polis_asuransi_jaminan" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Polis Asuransi Jaminan</p>
                      </a>
                    </li>
                  <?php }?>
                  <?php if($this->session->userdata('pengajuan_refund_asuransi_jaminan') == 'ok' || $this->session->userdata('pengajuan_refund_asuransi_jaminan_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                    <li class="nav-item">
                      <a href="<?php echo base_url(); ?>pengajuan_refund_asuransi_jaminan" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Pengajuan Refund Asuransi Jaminan</p>
                      </a>
                    </li>
                  <?php }?>
                  <?php if($this->session->userdata('proses_refund_jaminan') == 'ok' || $this->session->userdata('proses_refund_jaminan_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                    <li class="nav-item">
                      <a href="<?php echo base_url(); ?>proses_refund_jaminan" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Proses Refund Asuransi Jaminan</p>
                      </a>
                    </li>
                  <?php }?>
                  <?php if($this->session->userdata('pengajuan_klaim_asuransi_jaminan') == 'ok' || $this->session->userdata('pengajuan_klaim_asuransi_jaminan_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                    <li class="nav-item">
                      <a href="<?php echo base_url(); ?>pengajuan_klaim_asuransi_jaminan" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Pengajuan Klaim Asuransi Jaminan</p>
                      </a>
                    </li>
                  <?php }?>
                  <?php if($this->session->userdata('prosess_klaim_asuransi_jaminan') == 'ok' || $this->session->userdata('prosess_klaim_asuransi_jaminan_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                    <li class="nav-item">
                      <a href="<?php echo base_url(); ?>proses_klaim_jaminan" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Proses Klaim Asuransi Jaminan</p>
                      </a>
                    </li>
                  <?php }?>
                </ul>
              </li>

              <li class="nav-item has-treeview">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-heartbeat icon_color_sidebar"></i>
                  <p>
                    Asuransi Jiwa
                    <i class="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                    <?php if($this->session->userdata('rekap_titipan_asuransi_jiwa') == 'ok' || $this->session->userdata('rekap_titipan_asuransi_jiwa_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                      <li class="nav-item">
                        <a href="<?php echo base_url(); ?>rekap_titipan_asuransi_jiwa" class="nav-link">
                          <i class="far fa-circle nav-icon"></i>
                          <p>Rekap Titipan Asuransi Jiwa</p>
                        </a>
                      </li>
                    <?php }?>
                    <?php if($this->session->userdata('pengcoveran_asuransi_jiwa') == 'ok' || $this->session->userdata('pengcoveran_asuransi_jiwa_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                      <li class="nav-item">
                        <a href="<?php echo base_url(); ?>cover_asuransi_jiwa" class="nav-link">
                          <i class="far fa-circle nav-icon"></i>
                          <p>Pengcoveran Asuransi Jiwa</p>
                        </a>
                      </li>
                    <?php }?>
                    <?php if($this->session->userdata('polis_asuransi_jiwa') == 'ok' || $this->session->userdata('polis_asuransi_jiwa_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                      <li class="nav-item">
                        <a href="<?php echo base_url(); ?>polis_asuransi_jiwa" class="nav-link">
                          <i class="far fa-circle nav-icon"></i>
                          <p>Polis Asuransi Jiwa</p>
                        </a>
                      </li>
                    <?php }?>
                    <?php if($this->session->userdata('pengajuan_refund_asuransi_jiwa') == 'ok' || $this->session->userdata('pengajuan_refund_asuransi_jiwa_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                    <li class="nav-item">
                      <a href="<?php echo base_url(); ?>pengajuan_refund_asuransi_jiwa" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Pengajuan Refund Asuransi Jiwa</p>
                      </a>
                    </li>
                  <?php }?>
                  <?php if($this->session->userdata('proses_refund_jiwa') == 'ok' || $this->session->userdata('proses_refund_jiwa_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                    <li class="nav-item">
                      <a href="<?php echo base_url(); ?>proses_refund_jiwa" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Proses Refund Asuransi Jiwa</p>
                      </a>
                    </li>
                  <?php }?>
                    <?php if($this->session->userdata('pengajuan_klaim_asuransi_jiwa') == 'ok' || $this->session->userdata('pengajuan_klaim_asuransi_jiwa_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                      <li class="nav-item">
                        <a href="<?php echo base_url(); ?>pengajuan_klaim_asuransi_jiwa" class="nav-link">
                          <i class="far fa-circle nav-icon"></i>
                          <p>Pengajuan Klaim Asuransi Jiwa</p>
                        </a>
                      </li>
                    <?php }?>
                    <?php if($this->session->userdata('prosess_klaim_asuransi_jiwa') == 'ok' || $this->session->userdata('prosess_klaim_asuransi_jiwa_group') == 'ok' || $this->session->userdata('divisi_id') == 'IT'){ ?>
                      <li class="nav-item">
                        <a href="<?php echo base_url(); ?>proses_klaim_jiwa" class="nav-link">
                          <i class="far fa-circle nav-icon"></i>
                          <p>Proses Klaim Asuransi Jiwa</p>
                        </a>
                      </li>
                    <?php }?>
                </ul>
              </li>
              <?php if($this->session->userdata('divisi_id') == 'IT'){ ?>
                <li class="nav-item has-treeview">
                  <a href="#" class="nav-link">
                    <i class="fas fa-money-bill-alt nav-icon icon_color_sidebar"></i>
                    <p>Cash In Save</p>
                    <i class="fas fa-angle-left right"></i>
                  </a>
                      <ul class="nav nav-treeview">
                        <?php if($this->session->userdata('divisi_id') == 'IT'){ ?>
                          <li class="nav-item">
                            <a href="<?php echo base_url(); ?>pengajuan_cis" class="nav-link">
                              <i class="far fa-circle nav-icon"></i>
                              <p>Pengajuan Asuransi CIS</p>
                            </a>
                          </li>
                        <?php }?>
                        <?php if($this->session->userdata('divisi_id') == 'IT'){ ?>
                          <li class="nav-item">
                            <a href="<?php echo base_url(); ?>pengcoveran_cis" class="nav-link">
                              <i class="far fa-circle nav-icon"></i>
                              <p>Pengcoveran Asuransi CIS</p>
                            </a>
                          </li>
                        <?php }?>
                    </ul>
                </li>
              <?php }?>
              <?php if($this->session->userdata('divisi_id') == 'IT'){ ?>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>pengcoveran_cit" class="nav-link">
                    <i class="fas fa-money-bill-wave nav-icon icon_color_sidebar"></i>
                    <p>Cash In Transit</p>
                  </a>
                </li>
              <?php }?>
              <?php if($this->session->userdata('divisi_id') == 'IT'){ ?>
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>laporan_asuransi" class="nav-link">
                    <i class="fas fa-file-medical-alt nav-icon icon_color_sidebar"></i>
                    <p>Laporan Asuransi</p>
                  </a>
                </li>
              <?php }?>
            </ul>
          </li>
          <!-- END MENU ASURANSI -->


          <!-- MENU BSS -->
          <?php  if($this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('divisi_id') == 'GA' || $this->session->userdata('divisi_id') == 'OPERASIONAL' || $this->session->userdata('BSS') == 'ok' || $this->session->userdata('BSS_group') == 'ok'){ ?>
            <li class="nav-item">
              <a href="<?php echo base_url(); ?>bss" class="nav-link">
              <i class="nav-icon fas fa-file-invoice-dollar icon_color_sidebar"></i>
                <p>
                  BSS
                </p>
              </a>
            </li>   
          <?php } else{} ?>
          <!--- END MENU BSS -->
    
          <!-- MENU EFILING -->
          <?php  if($this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('divisi_id') == 'OPERASIONAL'){ ?>
            <li class="nav-item">
              <a href="<?php echo base_url(); ?>e_filing" class="nav-link">
              <i class="nav-icon fas fa-paste icon_color_sidebar"></i>
                <p>
                  E-FILLING
                </p>
              </a>
            </li>   
          <?php } else{} ?>
          <!--- END MENU EFILING -->

          <!-- START MENU USER ACCESS -->
          <?php  if($this->session->userdata('divisi_id') == 'IT' || $this->session->userdata('user_access') == 'ok' || $this->session->userdata('user_access_group') == 'ok'){ ?>
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
              <i class="nav-icon fas fa-users-cog icon_color_sidebar"></i>
                <p>
                  User Access
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>user_access" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>List User Access</p>
                  </a>
                </li>
              </ul>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="<?php echo base_url(); ?>user_access_group" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Group Menu</p>
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