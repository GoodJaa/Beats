const validateFields = (form, validateArray) => {

    validateArray.forEach((field) => {
        field.removeClass('input-error');
        if (field.val().trim() === "") {
            field.addClass('input-error');
        }
    });

    const errorFields = form.find('.input-error');

    return errorFields.length === 0;
};

$('.form').submit( e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name = 'name']");
    const phone = form.find("[name = 'phone']");
    const comment = form.find("[name = 'comment']");
    const to = form.find("[name = 'to']");

    const isValid = validateFields(form, [name, phone, comment, to]);

    const modal = $('#modal');
    const content = modal.find('.modal__content');

    modal.removeClass('modal--error');

    if (isValid) {
        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val()
            },

            success: data => {
                content.text(data.message);
                $('#modal').addClass('modal--active');
            },

            error: data => {
                const errorMes = data.responseJSON.message;
                content.text(errorMes);
                $('#modal').addClass('modal--active modal--error');
            }
        });
        console.log(e);
    }

    // const data = {
    //     name: form.elements.name.value,
    //     phone: form.elements.phone.value,
    //     comment: form.elements.comment.value,
    //     to: form.elements.to.value
    // };
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    // xhr.send(JSON.stringify(data));
});

$('.modal-close-btn').click( close => {
    close.preventDefault();

    if ($('#modal').hasClass('modal--active')) {
        $('#modal').removeClass('modal--active');
    }
});