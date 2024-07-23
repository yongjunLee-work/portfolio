


document.addEventListener('DOMContentLoaded', function () {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        let touched = false;
        let touchStartX = 0;
        let touchStartY = 0;

        item.addEventListener('touchstart', function (e) {
            touched = true;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, false);

        item.addEventListener('touchmove', function () {
            touched = false; // 터치 이동 중에는 터치 상태를 해제
        }, false);

        item.addEventListener('touchend', function (e) {
            if (!touched) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = Math.abs(touchEndX - touchStartX);
            const diffY = Math.abs(touchEndY - touchStartY);

            // 이동 거리가 10px 이하일 경우에만 클릭으로 간주
            if (diffX < 10 && diffY < 10) {
                if (item.dataset.touched === 'true') {
                    window.location.href = item.closest('a').href;
                } else {
                    e.preventDefault();
                    e.stopPropagation();
                    portfolioItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.querySelector('.overlay').style.opacity = '0';
                            otherItem.dataset.touched = 'false';
                        }
                    });
                    item.querySelector('.overlay').style.opacity = '1';
                    item.dataset.touched = 'true';
                }
            }
        }, false);

        item.addEventListener('mouseleave', function () {
            touched = false;
        });
    });
});
