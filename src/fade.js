 document.addEventListener('DOMContentLoaded', function() {
            // Add enter animation
            document.getElementById('pageContent').classList.add('page-enter');
            
            // Handle link clicks
            document.querySelectorAll('.page-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const url = this.href;
                    
                    // Show overlay
                    document.getElementById('transitionOverlay').style.transform = 'translateY(0)';
                    
                    // Navigate after delay
                    setTimeout(() => {
                        window.location.href = url;
                    }, 500);
                });
            });
        });
        
        // On page load, hide overlay
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('transitionOverlay').style.transform = 'translateY(100%)';
            }, 500);
        });