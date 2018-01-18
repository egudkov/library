(function($) {
    $(document).ready(function() {
        var loadingScreen = $('#loading');
        var nav = $(".nav");
        var updateUrl = true;

        loadPage(location.pathname);

        /***** Navigation *****/

        // Event delegation
        nav.on("click", "a", navigate);

        window.addEventListener('popstate', function(event) {
            updateUrl = false;
            loadPage(event.state.url);
        });

        function navigate(event) {
            event.preventDefault();
            var page = $(this).attr("href");
            loadPage(page);
        }

        function loadPage(page) {
            getContent(page);
            setActiveTab(page);
        }

        function setActiveTab(page) {
            if (page === '/') {
                page = '/home';
            }
            var clickedTab = $('.nav a[href="' + page + '"]');
            var allTabs = nav.find("a");
            allTabs.removeClass("active");
            clickedTab.addClass("active");
        }

        function getContent(page) {
            $.ajax({
                url: page,
                dataType: "html",
                beforeSend: function () {
                    loadingScreen.fadeIn(0);
                },
                complete: function() {
                    setTimeout(function() {
                        loadingScreen.fadeOut(500);
                    }, 500);
                },
                success: function(data) {
                    document.title = page.substr(1);
                    if (updateUrl && history.state.url !== page) {
                        history.pushState({url: page}, "title", page);
                    }
                    updateUrl = true;
                    $("#content").html(data);

                    setTimeout(function() {
                        loadingScreen.fadeOut(500);
                    }, 500);

                    $("#sendForm").click(sendFormData);
                    var email = document.getElementById("emailAddress");
                    email.addEventListener("input", validateEmail);

                    var form  = document.getElementById('subscribeForm');
                    form.addEventListener("submit", function (event) {
                        event.preventDefault();
                        if (!email.validity.valid) {
                            console.log("error");
                        } else {
                            $.get(
                                "/subscribe",
                                {email: email.value},
                                function () {
                                    alert("Subscribed! Check email");
                                }
                            );
                        }
                    });

                    function validateEmail(event) {
                        if (email.validity.valid) {
                            console.log("valid");
                        }
                        if (email.validity.typeMismatch) {
                            email.setCustomValidity("Неверный формат email адреса");
                        } else {
                            email.setCustomValidity("");
                        }
                    }
                },
                error: function() {
                    alert("Failed to get content from page " + page);
                }
            });
        }

        function sendFormData() {
            var formData = {};
            $("#requestForm").serializeArray().map(function (x) {
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
        }

        function subscribe() {

        }

        /***** Modal window *****/

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