<!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-red navbar-light" style="background-color: #da1326;">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
        <!--   <i class="far fa-bell"></i>
          <span class="badge badge-warning navbar-badge">15</span> -->
          <i class="fas fa-user"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-header"><?php echo $this->session->userdata('usename'); ?></span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-user mr-2"></i> <?php echo $this->session->userdata('nama'); ?>
            <span class="float-right text-muted text-sm"></span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-users mr-2"></i> <?php echo $this->session->userdata('nik') . ' (' . $this->session->userdata('jabatan') . ')'; ?>
            <span class="float-right text-muted text-sm"></span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-envelope mr-2"></i> <?php echo $this->session->userdata('email'); ?>
            <span class="float-right text-muted text-sm"></span>
          </a>
          <div class="dropdown-divider"></div>
          <a onclick="logoutProcess()" class="dropdown-item dropdown-footer">Log Out</a>
        </div>
      </li>
     <!--  <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button"><i
            class="fas fa-th-large"></i></a>
      </li> -->
    </ul>
  </nav>
  <!-- /.navbar -->


  <script>
    function logoutProcess(){
        $.ajax({
              url :  "<?= base_url(); ?>LoginController/logout_process",
              type : "get",
              headers: {
                          'Authorization': 'Bearer ' + localStorage.getItem('token')
                      },
              success : function(response) {
                console.log("sukses");
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location = '<?= base_url(); ?>LoginController/index';
              },
              error : function(response) {
                  console.log('logout gagal :' + response);
              }
      });
    } 
  </script>