function alert_error(message, callback) {
    $('.modal-backdrop').css('display', 'none');
    $('#modal-alert').modal('show');
    $('#modal-alert-title').html('Error');
    $('#modal-alert-message').html(message);
    $('#btn-no').html('OK');
    $('#btn-yes').hide();
    $('#modal-alert-icon').removeClass('fa-info-circle').removeClass('fa-exclamation-triangle').removeClass('fa-question-circle').addClass('fa-times-circle');
    $('.fa-times-circle').css('color', '#a94442');
    $('#btn-no').trigger('focus');
    $('#btn-no').off('click').on('click', function () {
        $('#modal-alert').modal('hide');
        $('.modal-backdrop').css('display', 'none');
        $('html, body').css('padding-right', '0px');
    });
    if (typeof callback === 'function') {
        callback();
    }
}
