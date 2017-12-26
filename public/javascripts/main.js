(function($) {
    $(document).ready(function() {
        $("#askBooksByTheme").click(function() {
            $.ajax({
                url: "/blocks/booksRequestForm.html",
                dataType: "html",
                success: function(data) {
                    $("#content").html(data);
                    $("#booksRequestForm input[type='button']").click(function(){
                        var formData = {};
                        $("#booksRequestForm").serializeArray().map(function (x) {
                            formData[x.name] = x.value;
                        });

                        $.ajax({
                            url: "/getResource",
                            dataType: "json",
                            type: "post",
                            data: JSON.stringify(formData),
                            contentType: "application/json",
                            success: function (data) {
                                console.log(data);
                            },
                            error: function(xhr) {
                                console.log(xhr.responseText);
                            }
                        })
                    });
                },
                error: function () {
                    alert("Something is broken");
                }
            })
        });
        $("#home").click(function() {
            $.ajax({
                url: "blocks/home.html",
                dataType: "html",
                success: function(data) {
                    $("#navContent").html(data);
                },
                error: function() {
                    alert("Something is broken");
                }
            })
        });
        $("#news").click(function() {
            $.ajax({
                url: "blocks/news.html",
                dataType: "html",
                success: function(data) {
                    $("#navContent").html(data);
                },
                error: function() {
                    alert("Something is broken");
                }
            })
        });
        $("#catalog").click(function() {
            $.ajax({
                url: "blocks/catalog.html",
                dataType: "html",
                success: function(data) {
                    $("#navContent").html(data);
                },
                error: function() {
                    alert("Something is broken");
                }
            })
        });
        $("#contacts").click(function() {
            $.ajax({
                url: "blocks/contacts.html",
                dataType: "html",
                success: function(data) {
                    $("#navContent").html(data);
                },
                error: function() {
                    alert("Something is broken");
                }
            })
        });
        $("#about").click(function() {
            $.ajax({
                url: "blocks/about.html",
                dataType: "html",
                success: function(data) {
                    $("#navContent").html(data);
                },
                error: function() {
                    alert("Something is broken");
                }
            })
        });
    })
})(jQuery);