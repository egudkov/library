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

        // Event delegation
        $(".nav").on("click", "a", function(event) {
            event.preventDefault();
            var page = $(this).attr("href");
            getContent(page);
            setActiveTab(page);
        });

        // Need to fix back and forward buttons
        window.addEventListener('popstate', function(event) {
            getContent(event.state.url);
            setActiveTab(event.state.url);
        });

        getContent(location.pathname);
        setActiveTab(location.pathname);

        function setActiveTab(page) {
            if (page === '/') {
                page = '/home';
            }
            var clickedTab = $('.nav a[href="' + page + '"]');
            var allTabs = $(".nav").find("a");
            allTabs.removeClass("active");
            clickedTab.addClass("active");
        }

        function getContent(page) {
            $.ajax({
                url: page,
                dataType: "html",
                beforeSend: function () {
                    $('#loading').fadeIn(0);
                },
                complete: function() {
                    setTimeout(function() {
                        $('#loading').fadeOut(500);
                    }, 500);
                },
                success: function(data) {
                    $("#navContent").html(data);
                    history.pushState({url: page}, "", page);
                    setTimeout(function() {
                        $('#loading').fadeOut(500);
                    }, 500);
                },
                error: function() {
                    alert("Failed to get content from page " + page);
                }
            });
        }

        var modal = document.getElementById('simpleModal');
        var closeBtn = document.getElementsByClassName('closeBtn')[0];

        // TODO: Check sessionId, run openModal once for user
        setTimeout(function () {
            openModal();
        }, 1000);
        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', outsideClick);

        function openModal() {
            modal.style.display = 'block';
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        function outsideClick(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        }
    })
})(jQuery);