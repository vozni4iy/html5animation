animateMenu(dir, action) {
            this.animate({
                duration: 500,
                timing: function (timeFraction) {
                    return timeFraction;
                },
                draw: this.drawmenu(dir, action)
            });
        }

        drawmenu(dir, action) {
            let mainView = document.getElementById('page-wrapper');
            let sideMenu = document.getElementsByClassName('navbar-default')[0];
            if (dir === 'ltr') {
                switch (action) {
                    case "show":
                        return function (progress) {
                            mainView.style.marginLeft = (70 + 150 * progress) + 'px';
                            sideMenu.style.opacity = progress;
                        }
                    case "hide":
                        return function (progress) {
                            mainView.style.marginLeft = (220 - 150 * progress) + 'px';
                        }
                    case "reset":
                        return function (progress) {
                            mainView.style.marginLeft = (70 + 150 * progress) + 'px';
                            mainView.style.marginRight = (220 - 150 * progress) + 'px';
                            sideMenu.style.opacity = progress;
                        }
                    default:
                        return function () {
                            console.log('Unknown animation');
                        }
                }
            } else {
                switch (action) {
                    case "show":
                        return function (progress) {
                            mainView.style.marginRight = (70 + 150 * progress) + 'px';
                            sideMenu.style.opacity = progress;
                        }
                    case "hide":
                        return function (progress) {
                            mainView.style.marginRight = (220 - 150 * progress) + 'px';
                        }
                    case "reset":
                        return function (progress) {
                            mainView.style.marginRight = (70 + 150 * progress) + 'px';
                            mainView.style.marginLeft = (220 - 150 * progress) + 'px';
                            sideMenu.style.opacity = progress;
                        }
                    default:
                        return function () {
                            console.log('Unknown animation');
                        }
                }
            }
        }

        animate(options) {
            var start = performance.now();
            requestAnimationFrame(function animate(time) {
                var timeFraction = (time - start) / options.duration;
                if (timeFraction > 1) timeFraction = 1;
                var progress = options.timing(timeFraction)
                options.draw(progress);
                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            });
        }
