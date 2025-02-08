jQuery(document).ready(function(){


  jQuery(".owl-carousel2").owlCarousel({
    loop:true,
    center: false,
    margin:20,
    responsiveClass:true,
    nav:true,
    responsive:{
      0:{
        items:2,
        nav:false,
      },
      600:{
        items:2,
        nav:false
      },
      1000:{
        items:4,
        nav:true,
        loop:true
      }
    }
  }
  );

  jQuery(".owl-carousel3").owlCarousel({
    loop:true,
    center: false,
    margin:20,
    responsiveClass:true,
    nav:true,
    responsive:{
      0:{
        items:1,
        nav:false,
      },
      600:{
        items:2,
        nav:false
      },
      1000:{
        items:3,
        nav:true,
        loop:true
      }
    }
  }
  );

  jQuery(".owl-carousel4").owlCarousel({
    loop:true,
    center: false,
    margin:20,
    responsiveClass:true,
    nav:true,
    responsive:{
      0:{
        items:1,
        nav:false,
      },
      600:{
        items:2,
        nav:false
      },
      1000:{
        items:2,
        nav:true,
        loop:true
      }
    }
  }
  );

  $('.portfolio-card').click(function(){
    const imgSrc = $(this).find('.card-img').attr('src');
    const title = $(this).find('.card-title').text();
    const category = $(this).find('.card-text').text();
    const description = $(this).data('description');
    
    $('#enlargedImage').attr('src', imgSrc);
    $('#modalTitle').text(title);
    $('#modalCategory').text(category);
    $('#modalDescription').html(description);
    
    // Reset zoom state when opening modal
    $('#enlargedImage').removeClass('zoomed');
    
    $('#portfolioModal').modal('show');
  });

});

function myFunction(x) {
  x.classList.toggle("change");
}

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const zoomableImage = document.querySelector('.zoomable-image');
    if (zoomableImage) {
        zoomableImage.addEventListener('click', function(e) {
            this.classList.toggle('zoomed');
            
            if (this.classList.contains('zoomed')) {
                // Calculate zoom position based on click location
                const rect = this.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                this.style.transformOrigin = `${x * 100}% ${y * 100}%`;
            }
        });

        // Reset zoom when modal closes
        $('#portfolioModal').on('hidden.bs.modal', function () {
            zoomableImage.classList.remove('zoomed');
        });
    }
});

// Add zoom functionality
$(document).on('click', '#enlargedImage', function(e) {
    if (!isDragging) {  // Only zoom if we're not dragging
        $(this).toggleClass('zoomed');
        
        if ($(this).hasClass('zoomed')) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            $(this).css('transform-origin', `${x * 100}% ${y * 100}%`);
        } else {
            // Reset position when zooming out
            currentX = 0;
            currentY = 0;
            xOffset = 0;
            yOffset = 0;
            setTransform($(this));
        }
    }
});

// Reset zoom when modal closes
$('#portfolioModal').on('hidden.bs.modal', function() {
    const $image = $('#enlargedImage');
    $image.removeClass('zoomed');
    currentX = 0;
    currentY = 0;
    xOffset = 0;
    yOffset = 0;
    setTransform($image);
});

// Add after your existing modal click handler
let isDragging = false;
let startX, startY, initialX, initialY;
let currentX = 0;
let currentY = 0;
let scale = 1;

$(document).on('mousedown touchstart', '#enlargedImage', function(e) {
    e.preventDefault();
    isDragging = true;
    const evt = e.type === 'mousedown' ? e : e.touches[0];
    startX = evt.clientX - currentX;
    startY = evt.clientY - currentY;
    $(this).css('cursor', 'grabbing');
});

$(document).on('mousemove touchmove', '#enlargedImage', function(e) {
    if (!isDragging || scale === 1) return;
    e.preventDefault();
    const evt = e.type === 'mousemove' ? e : e.touches[0];
    currentX = evt.clientX - startX;
    currentY = evt.clientY - startY;
    
    updateTransform(this);
});

$(document).on('mouseup touchend', function() {
    isDragging = false;
    $('#enlargedImage').css('cursor', scale > 1 ? 'grab' : 'zoom-in');
});

$(document).on('dblclick', '#enlargedImage', function(e) {
    e.preventDefault();
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (scale === 1) {
        scale = 2;
        $(this).css('cursor', 'grab');
        // Center the zoom on click position
        currentX = (rect.width / 2 - x) * scale;
        currentY = (rect.height / 2 - y) * scale;
    } else {
        scale = 1;
        currentX = 0;
        currentY = 0;
        $(this).css('cursor', 'zoom-in');
    }
    
    updateTransform(this);
});

function updateTransform(element) {
    $(element).css('transform', `translate(${currentX}px, ${currentY}px) scale(${scale})`);
}

// Reset when modal closes
$('#portfolioModal').on('hidden.bs.modal', function() {
    scale = 1;
    currentX = 0;
    currentY = 0;
    updateTransform($('#enlargedImage')[0]);
    $('#enlargedImage').css('cursor', 'zoom-in');
});
