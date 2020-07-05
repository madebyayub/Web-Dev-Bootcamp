$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});
$("ul").on("click", ".delete", function(event){
    $(this).parent().fadeOut(300, function(){
        $(this).remove();
    });
    event.stopPropagation();
});
$("input[type='text'").keypress(function(event){
    if (event.which === 13){
        // GRAB THE TODO TEXT FROM INPUT
        var todo = $(this).val();
        $(this).val("");
        $("ul").append("<li><span class='delete'><i class='far fa-trash-alt'></i></span> " + todo + "</li>");
    }
});
$(".fa-plus").on("click", function(){
    $("input[type='text']").fadeToggle()
});