$('#btn-log-out').click(function(){
    localStorage.clear();
});

var base_url = $('#base-url').val();
var menu = '';

console.log(!localStorage.getItem('menu_bar_am'));
if (!localStorage.getItem('menu_bar_am')) {
    $.ajax({
        url: base_url + "Controller_home/privillage_id",
        cache: false,
        async: false,
        success: function(response){
            console.log(response);
            if (response === "timeout") {

            }
            else{
                localStorage.setItem('menu_bar_am', response);
                menu = $.parseJSON(localStorage.getItem('menu_bar_am'));
            }
        },
        error: function(response){
            console.log(response);
        }
    });
}
else{
  menu = $.parseJSON(localStorage.getItem('menu_bar_am'));
  console.log(menu);
}

$.each(menu, function(){ 
    //console.log(this['menu_parent_code']);
    if (this['menu_parent_code'] == null) {
        $('#menu-parent').html(this['menu_desc']);
        $('.sidebar-nav').addClass(this['menu_code']);
        $('#menu-parent').attr('menu_alias', this['menu_alias']);
    }
    else{
        $('.'+this['menu_parent_code']).append(
            '<li><a id="'+this['menu_alias']+'" class="menu-alias" href="'+base_url+this['menu_path']+'" menu_alias="'+this['menu_alias']+'">'
                +this['menu_desc']+'</a>'+
                '<span class="child '+this['menu_code']+'"></span>'+
            '</li>'
        );
    }
});

$('li').each(function(){
  $this = $(this);
  $this.find("span").has("li").addClass("parent-child");
  $this.find(".parent-child").has("li").replaceWith('<ul>' + $this.find(".parent-child").has("li").html() +'</ul>');
});

$('.child').not(':has(.child)').parent().removeClass("parent-child");