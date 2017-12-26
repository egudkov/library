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

        $(".nav a").click(function() {
            var pageName = this.hash.substr(1);
            var activeLink = $(".nav .active")[0];
            if (activeLink.hash.substr(1) !== pageName) {
                activeLink.removeAttribute("class");
                this.setAttribute("class", "active");
            }
            getContent(pageName);
        });

        function getContent(pageName) {
            $.ajax({
                url: "blocks/" + pageName + ".html",
                dataType: "html",
                success: function(data) {
                    $("#navContent").html(data);
                },
                error: function() {
                    alert("Something is broken");
                }
            });
        }
    })
})(jQuery);