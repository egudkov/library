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

        $(".nav-menu").click(function(event) {
            event.preventDefault();
            setActiveTab($(this));
            getContent($(this));
        });

        function setActiveTab(clickedTab) {
            var currentActiveTab = $(".nav").find(".active");
            var clickedTabName = clickedTab.attr("href").substr(1);
            var currentActiveTabName = currentActiveTab.attr("href").substr(1);
            if (clickedTabName !== currentActiveTabName) {
                currentActiveTab.removeClass("active");
                clickedTab.addClass("active");
            }
        }

        function getContent(clickedTab) {
            var clickedTabName = clickedTab.attr("href").substr(1);
            $.ajax({
                url: "blocks/" + clickedTabName + ".html",
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