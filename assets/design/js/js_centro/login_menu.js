var nama = '';
var nik = '';
var jabatan = '';
var status = '';
var email = '';
var iat = '';
var exp = '';
var usename = '';
var userIdLogin = '';
var kd_cabang = '';
var divisi_id = '';
var token = '';
var base_url = $('#base_url').val();

  $('input').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      loginfunction();
    }
  }); 

  $('#btn-log-in').click(function(){   
      loginfunction();
  });

  $(document).ready(function() {
     $('#loading').hide();
  });

  function loginfunction(){
    var user = $('#user').val();
    var password =  $('#password').val();
         
    $('#loading').show();
    $.ajax({
      url: 'http://103.31.232.146/API_CENTRO/login',
      cache: false,
      type: 'POST',
      data: {
        "user" : user,
        "password" : password
      },
      dataType: 'json',
      success : function(response){
        console.log(response);
        status      = response['status'];
        token       = response['token'];
        nama        = response['payload']['nama'];
        nik         = response['payload']['nik'];
        jabatan     = response['payload']['jabatan'];
        email       = response['payload']['email'];
        iat         = response['payload']['iat'];
        exp         = response['payload']['exp'];
        usename     = response['payload']['usename'];
        userIdLogin = response['payload']['id'];
        divisi_id   = response['payload']['divisi_id'];
        kd_cabang   = response['user']['kd_cabang'];
        localStorage.setItem('token', token);
        console.log(token);
        loginfunction2(nama,
                       nik,
                       jabatan,
                       email,
                       iat,
                       exp,
                       usename,
                       userIdLogin,
                       divisi_id,
                       kd_cabang,
                       token);
      },
      error: function (response) {
        
        console.log(response);
        status = response['status'];
        loginfunction2(nama,
                       nik,
                       jabatan,
                       email,
                       iat,
                       exp,
                       usename,
                       userIdLogin,
                       divisi_id,
                       kd_cabang,
                       token);       
      }
    });

  }

function loginfunction2(nama,
                       nik,
                       jabatan,
                       email,
                       iat,
                       exp,
                       usename,
                       userIdLogin,
                       divisi_id,
                       kd_cabang,
                       token){
      console.log(nama);
         $.ajax({
              url : base_url +"index.php/LoginController/login_process",
              type : "POST",
              dataType : "json",
              data : {"nama"   : nama, 
                      "nik"    : nik,
                      "jabatan" : jabatan,
                      "email" : email,
                      "iat" : iat,
                      "exp" : exp,
                      "usename" : usename,
                      "userIdLogin" : userIdLogin,
                      "divisi_id"  : divisi_id,
                      "kd_cabang"   : kd_cabang,
                      "token"   : token
                    },

              success : function(response) {
                 console.log('harusnya bisa');
                 window.location = base_url + 'index.php/DashboardController/index';  
              },
              error : function(response) {
                  console.log('failed ' + response);
                 
                  window.location = base_url + 'index.php/LoginController/index'; 
              }
          });
}