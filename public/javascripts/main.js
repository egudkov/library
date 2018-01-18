(function($) {
    $(document).ready(function() {
        var updateUrl = false;
        var page = {
            title: "",
            url: location.pathname
        };
        if (page.url === '/') {
            page.url = '/home';
            page.title = 'Главная';
        }
        history.replaceState(page, "", page.url);

        var loadingScreen = $("#loading");
        var nav = $(".nav");
        var navTabs = nav.find("a");

        loadPage();

        /***** Navigation *****/

        // Event delegation
        nav.on("click", "a", navigate);

        window.addEventListener('popstate', function(event) {
            updateUrl = false;
            page.url = event.state.url;
            loadPage();
        });

        function navigate(event) {
            event.preventDefault();
            updateUrl = true;
            page.url = $(this).attr("href");
            loadPage();
        }

        function loadPage() {
            setActiveTab();
            getContent();

            function setActiveTab() {
                var activeTab = $('.nav a[href="' + page.url + '"]');
                page.title = activeTab.html();
                document.title = page.title;
                navTabs.removeClass("active");
                activeTab.addClass("active");
            }

            function getContent() {
                $.ajax({
                    url: page.url,
                    dataType: "html",
                    beforeSend: function () {
                        showLoading();
                    },
                    complete: function() {
                        hideLoading();
                    },
                    success: function(data) {
                        if (updateUrl && history.state.url !== page.url) {
                            history.pushState(page, "", page.url);
                            updateUrl = false;
                        }

                        $("#content").html(data);

                        hideLoading();
                    },
                    error: function() {
                        alert("Failed to get content from page " + page.url);
                    }
                });
            }
        }

        function showLoading() {
            loadingScreen.fadeIn(0);
        }

        function hideLoading() {
            setTimeout(function() {
                loadingScreen.fadeOut(500);
            }, 500);
        }

        // From getContent()
        //
        // $("#sendForm").click(sendFormData);
        // var email = document.getElementById("emailAddress");
        // email.addEventListener("input", validateEmail);
        //
        // var form  = document.getElementById('subscribeForm');
        // form.addEventListener("submit", function (event) {
        //     event.preventDefault();
        //     if (!email.validity.valid) {
        //         console.log("error");
        //     } else {
        //         $.get(
        //             "/subscribe",
        //             {email: email.value},
        //             function () {
        //                 alert("Subscribed! Check email");
        //             }
        //         );
        //     }
        // });

        // function validateEmail(event) {
        //     if (email.validity.valid) {
        //         console.log("valid");
        //     }
        //     if (email.validity.typeMismatch) {
        //         email.setCustomValidity("Неверный формат email адреса");
        //     } else {
        //         email.setCustomValidity("");
        //     }
        // }

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