const TIMER_SEC = 4.5;
const CLOSED_TIME_HOURS = 1;
let PermissionsPages = ['/src/index.html'];
let pageLocation = window.location.pathname;

document.addEventListener('DOMContentLoaded', function () {
    let timeNow = Date.now(),
        closedTime = localStorage.getItem('closetime');
    let videoWrap = document.querySelector('.fixed-video-wrap'),
        videoPlay = document.querySelector('#fixed-video'),
        videoBtn  = document.querySelector('.fixed-video-button'),
        videoCloseBtn = document.querySelector('.fixed-video-close'),
        videoHideBtn = document.querySelector('.fixed-video-roll-up');

    if (closedTime == null) {  
        if (PermissionsPages.indexOf(pageLocation) == -1) {
            videoWrap.style.display = 'none';
        } else {
            videoWrap.style.display = 'block';
        }
    
        videoWrap.addEventListener('click', (e) => {
            if (e.target == videoPlay || e.target == videoHideBtn) {
                videoWrap.classList.toggle('is-opened');
    
                if (videoWrap.classList.contains('is-opened')) {
                    videoPlay.muted = false;
                    videoPlay.currentTime = 0;
                
    
                    let timer = setTimeout(() => {
                        videoBtn.style.opacity = 1;
                        videoBtn.style.zIndex = 1;
                    }, TIMER_SEC * 1000);
    
                } else  {
                    videoPlay.muted = true;
                    videoPlay.currentTime = 0;
                    videoBtn.style.opacity = 0;
                    videoBtn.style.zIndex = -1;
                    clearTimeout(timer);
                }
    
            }
            
        });
    
        videoCloseBtn.addEventListener('click', () => {
            localStorage.setItem('closetime', Date.now());
            videoWrap.style.display = 'none';
        });
        
    } else if (timeNow - closedTime < CLOSED_TIME_HOURS * 60 * 60 * 1000) {
        videoWrap.style.display = 'none';
    }
});
