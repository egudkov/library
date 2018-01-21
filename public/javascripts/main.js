(function($) {
    $(document).ready(function() {
        // We shouldn't push state on initial page load
        var shouldPushState = false;
        var page = {
            title: "",
            url: location.pathname
        };
        
        if (page.url === '/') {
            page.url = '/home';
            page.title = 'Главная';
        }
        // Attaching state to the page
        history.replaceState(page, "", page.url);

        var loadingScreen = $("#loading");
        var nav = $(".nav");
        var navTabs = nav.find("a");

        loadPage();

        /***** Navigation *****/

        // Event delegation from "nav" div to "a" elements
        // Works only with "on" method
        nav.on("click", "a", function (event) {
            event.preventDefault();
            // We should push state on navigation click
            shouldPushState = true;
            page.url = $(this).attr("href");
            loadPage();
        });
        
        // Handling of going back/forward through history
        window.addEventListener('popstate', function(event) {
            // We shouldn't push state while going back/forward
            shouldPushState = false;
            page.url = event.state.url;
            loadPage();
        });
        
        function loadPage() {
            setActiveTab();
            getContent();
        }

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
                cache: false,
                beforeSend: function () {
                    showLoading();
                },
                complete: function() {
                    hideLoading();
                },
                success: function(data) {
                    if (shouldPushState && history.state.url !== page.url) {
                        history.pushState(page, "", page.url);
                        shouldPushState = false;
                    }

                    $("#content").html(data);
                    hideLoading();

                    if (page.url === "/requestForm") {
                        $("#askQuestionForm").submit(sendFormData);
                    } else if (page.url === "/news") {
                        $('#subscribeForm').submit(subscribe);
                    }
                },
                error: function() {
                    alert("Failed to get content from page " + page.url);
                }
            });
        }

        function showLoading() {
            loadingScreen.fadeIn(0);
        }

        function hideLoading() {
            setTimeout(function() {
                loadingScreen.fadeOut(300);
            }, 300);
        }

        /***** Forms *****/

        function sendFormData() {
            event.preventDefault();

            var form = $("#askQuestionForm");
            var formData = {};
            form.serializeArray().map(function (field) {
                formData[field.name] = field.value;
            });

            $.ajax({
                url: "/sendForm",
                dataType: "json",
                type: "post",
                data: JSON.stringify(formData),
                contentType: "application/json",
                success: function (responseData) {
                    form.hide();
                    var responseBlock = $("<div>");
                    var thankYouBlock = $("<div>");
                    thankYouBlock.text("Ваш вопрос успешно отправлен! Мы ответим в ближайшее время.");
                    var requestDetailsBlock = $("<div>");
                    requestDetailsBlock.html("Вопрос номер: " + responseData.id + "<br>" + "Дата: " + responseData.date);
                    responseBlock.append(thankYouBlock);
                    responseBlock.append(requestDetailsBlock);
                    $("#content").append(responseBlock);
                },
                error: function(xhr) {
                    console.log(xhr.responseText);
                }
            });
        }

        function subscribe() {
            event.preventDefault();

            var form = $('#subscribeForm');
            var formData = {};
            form.serializeArray().map(function (field) {
                formData[field.name] = field.value;
            });

            $.ajax({
                url: "/subscribe",
                dataType: "json",
                type: "post",
                data: JSON.stringify(formData),
                contentType: "application/json",
                success: function (responseData) {
                    var responseBlock = $("<div>");
                    var thankYouBlock = $("<div>");
                    thankYouBlock.text("На ваш почтовый ящик отправлено письмо. " +
                        "Перейдите по ссылке в письме, чтобы подтвердить подписку.");
                    responseBlock.append(thankYouBlock);
                    form.html(responseBlock);
                },
                error: function(xhr) {
                    console.log(xhr.responseText);
                }
            });
        }

        /***** Modal window *****/

        var modal = $('#simpleModal');
        var closeBtn = $('.closeBtn');

        // TODO: Check sessionId, run openModal once for user
        if (document.cookie.match("adShown=yes") === null) {
            setTimeout(function () {
                openModal();
            }, 1000);
        }

        closeBtn.click(closeModal);
        $(window).click(outsideClick);

        function openModal() {
            modal.show();
            var date = new Date;
            date.setMonth(date.getMonth() + 1);
            document.cookie = "adShown=yes; path=/; expires=" + date.toUTCString();
        }

        function closeModal() {
            modal.hide();
        }

        function outsideClick(event) {
            if (event.target.id === 'simpleModal') {
                closeModal();
            }
        }
    })
})(jQuery);