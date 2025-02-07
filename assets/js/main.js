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
    
    $('#portfolioModal').modal('show');
  });

});

function myFunction(x) {
  x.classList.toggle("change");
}