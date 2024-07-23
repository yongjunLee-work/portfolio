


document.addEventListener('DOMContentLoaded', function () {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        let touched = false;

        item.addEventListener('touchstart', function (e) {
            if (!touched) {
                e.preventDefault();
                e.stopPropagation();
                portfolioItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.overlay').style.opacity = '0';
                        otherItem.dataset.touched = false;
                    }
                });
                item.querySelector('.overlay').style.opacity = '1';
                item.dataset.touched = true;
                touched = true;
            } else {
                window.location.href = item.closest('a').href;
            }
        }, false);

        item.addEventListener('mouseleave', function () {
            touched = false;
        });
    });
});