<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Kredit Mandiri Indonesia</title>
      <!-- Bootstrap CSS-->
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/design/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/design/css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/design/css/styles.css">
        <!-- <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/design/css/styles_ide.css"> -->
        <link rel="icon" type="image/jpeg" href="<?php echo base_url(); ?>assets/design/images/kmi_logo.jpg" />

    <style>
        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
       .fscreen {visibility: hidden;}
        }
    </style>

  </head>
  <body style="background-color :#810000">
  <div id="loading">
              <img id="loading-image" style="width : 50px; height: 50px;" 
              src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
  </div>
    <div class="container">
      <div class="row">
        <div class="form-horizontal card card-container">
          <div class="col-md-4 col-md-offset-4" style="margin-top: 50px;">
            <div class="panel">
              <div class="panel-body">
                <div class="top-right col-sm-12 col-xs-12 text-center ">
                    <a class="logo " href="">
                      <img style="width:130px;height:130px;" src="<?php echo base_url() ?>assets/design/images/kmi_logo.jpg" alt="KMI Logo">
                    </a>
                    <br>
                </div>
               <!-- <form method="post" action="<?php //echo site_url('LoginController/login_process'); ?>"> -->
               <form style='padding-top : 10px;'>
                  <div class="page-title text-center">            
                    <h1>Silahkan Login</h1>
                    <hr>
                  </div>
                  <div class="form-group page-title">
                    <div class="col-sm-12">
                      <input type="text" class="form-control" placeholder="User" id="user" name="user">
                    </div><!-- /input-group -->
                  </div>
                  <div class="form-group page-title">
                    <div class="col-sm-12">
                      <input type="password" class="form-control form-control-login" placeholder="Password" id="password" name="password">
                    </div>
                  </div>
                  <?php echo validation_errors(); ?>
                  <div class="form-group page-title">
                    <div class="checkbox col-sm-6">
                      <label>
                        <input type="checkbox"> Ingatkan Saya
                      </label>
                    </div>
                    <div></div>
                    <div class="col-sm-6 text-right">
                      <button type ='button'class="btn btn-primary" style="background-color:rgba(200, 0, 0, 0.8);" id="btn-log-in">Login<span class="fa fa-arrow-circle-right" style="padding-left:8px;"></span></button>
                    </div>
                  </div>
                  <div class="col-sm-12 page-title">
                    <h5 style="font-color: red;" id='err_msg' name='err_msg' value="test">
                    <hr>
                     <?php  
                        echo '<label class="text-danger">'.$this->session->flashdata("error").'</label> <br>';  
                     ?>  
                    <h4>Lupa password anda?</h4>
                  </div>
                  <div class="col-sm-12 page-title" style="padding-top:0px;">
                   <!--  <h5>Klik <a href="<?php // echo $this->config->item('url_reset_pass'); ?>">disini</a> untuk mereset password Anda.</h5> -->
                   <h5>Silahkan Hubungi Team IT</h5>
                  </div>
                </form>
              </div>
            </div><!--colmd6-->
          </div>
          
        </div>
      </div> <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">
    </div>  
    
    <script type="text/javascript" src="<?php echo base_url(); ?>assets/design/plugins/datetimepicker/bootstrap.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/login_menu.js"></script>
  </body>
</html>