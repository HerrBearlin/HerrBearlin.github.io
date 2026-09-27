jQuery(document).ready(function() {
  var $ = jQuery;
  var pagePrefix = window.location.pathname.toLowerCase().indexOf('/pages/') !== -1 ? '..' : '.';

  function assetUrl(path) {
    return pagePrefix + '/' + path;
  }

  function resolveUrl(url) {
    return /^https?:\/\//i.test(url) ? url : assetUrl(encodeURI(url));
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ------------------------------------------------------------
  // Game cards – built from GAMES / GAME_LISTS in games.js.
  // A page marks where cards go with:
  //   <div data-game-list="<list name>" data-card="<card style>"></div>
  // and optionally data-fill-to="3" to pad with "Coming Soon" cards.
  // ------------------------------------------------------------
  var GAME_DATA = window.GAMES || {};
  var GAME_LIST_DATA = window.GAME_LISTS || {};

  var LINK_TYPES = [
    { key: 'play', large: 'Play Game', small: 'Play' },
    { key: 'video', large: 'Watch Video', small: 'Video' },
    { key: 'trailer', large: 'Watch Trailer', small: 'Trailer' },
    { key: 'tutorial', large: 'Tutorial Video', small: 'Tutorial' },
    { key: 'info', large: 'Game Info', small: 'Info' },
    { key: 'presentation', large: 'Open Presentation', small: 'Slides' }
  ];

  var OVERLAY_GRADIENT = 'background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0.8) 100%);';

  function gameLinks(game) {
    var links = [];
    $.each(LINK_TYPES, function(_, type) {
      var url = game.links && game.links[type.key];
      if (url) {
        links.push({ url: resolveUrl(url), large: type.large, small: type.small });
      }
    });
    return links;
  }

  function linkButtons(game, size, btnClass) {
    return gameLinks(game).map(function(link) {
      return '<a href="' + escapeHtml(link.url) + '" class="btn btn-primary ' + btnClass + '" target="_blank">' + link[size] + '</a>';
    }).join('');
  }

  function detailsButton(id, game, btnClass) {
    if (!(game.whatIDid && game.whatIDid.length) && !game.description) {
      return '';
    }
    return '<button type="button" class="btn btn-primary ' + btnClass + ' open-portfolio-modal" data-game-id="' + escapeHtml(id) + '">' +
      escapeHtml(game.detailsLabel || 'What I did') + '</button>';
  }

  // Games without an image get a plain cover in the site's colours.
  function cardImage(game, style, className) {
    if (!game.image) {
      return '<div class="' + (className || 'card-img') + ' game-no-image" style="' + style + '"></div>';
    }
    return '<img class="' + (className || 'card-img') + '" src="' + escapeHtml(assetUrl(game.image)) + '" alt="' + escapeHtml(game.title) + '" style="' + style + '">';
  }

  var CARD_TEMPLATES = {
    // index.html – Recent Games, large cards
    'index-featured': function(id, game) {
      return '<div class="col-lg-6 mb-4">' +
        '<div class="card featured-game-card">' +
          cardImage(game, 'height: 400px; object-fit: cover;') +
          '<div class="card-img-overlay d-flex flex-column justify-content-between">' +
            '<div class="overlay-top">' + (game.visits ? '<div class="visit-badge">' + escapeHtml(game.visits) + ' Visits</div>' : '') + '</div>' +
            '<div class="overlay-bottom">' +
              '<h3 class="card-title">' + escapeHtml(game.title) + '</h3>' +
              '<p class="card-category">' + escapeHtml(game.category) + '</p>' +
              '<div class="button-group">' + linkButtons(game, 'large', 'btn-sm') + detailsButton(id, game, 'btn-sm') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    },

    // index.html – Recent Games, small cards
    'index-grid': function(id, game) {
      return '<div class="col-lg-3 mb-4">' +
        '<div class="card game-grid-card">' +
          cardImage(game, 'height: 216px; object-fit: cover;') +
          '<div class="card-img-overlay d-flex flex-column justify-content-between">' +
            '<div class="overlay-top">' + (game.visits ? '<div class="visit-badge">' + escapeHtml(game.visits) + ' Visits</div>' : '') + '</div>' +
            '<div class="overlay-bottom">' +
              '<h4 class="card-title">' + escapeHtml(game.title) + '</h4>' +
              '<p class="card-category">' + escapeHtml(game.category) + '</p>' +
              '<div class="button-group">' + linkButtons(game, 'small', 'btn-xs') + detailsButton(id, game, 'btn-xs') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    },

    // portfolio.html – large cards
    'portfolio-featured': function(id, game) {
      return '<div class="mb-4">' +
        '<div class="card featured-game-card" style="position: relative; z-index: 1; border-radius: 12px; overflow: hidden;">' +
          cardImage(game, 'height: 300px; object-fit: cover; border-radius: 12px;') +
          '<div class="card-img-overlay d-flex flex-column justify-content-end" style="padding: 0;">' +
            '<div style="' + OVERLAY_GRADIENT + ' padding: 15px; width: 100%;">' +
              '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">' +
                '<div>' +
                  '<h3 class="card-title" style="margin-bottom: 5px;">' + escapeHtml(game.title) + '</h3>' +
                  '<p class="card-category">' + escapeHtml(game.category) + '</p>' +
                '</div>' +
                (game.visits ? '<div class="visit-badge">' + escapeHtml(game.visits) + ' Visits</div>' : '') +
              '</div>' +
              '<div class="button-group">' + linkButtons(game, 'large', 'btn-sm') + detailsButton(id, game, 'btn-sm') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    },

    // portfolio.html – small 2x2 cards
    'portfolio-grid': function(id, game) {
      return '<div class="col-6 mb-3">' +
        '<div class="card game-grid-card" style="position: relative; z-index: 1; border-radius: 8px; overflow: hidden;">' +
          cardImage(game, 'height: 216px; object-fit: cover; border-radius: 8px;') +
          '<div class="card-img-overlay d-flex flex-column justify-content-end" style="padding: 0;">' +
            '<div style="' + OVERLAY_GRADIENT + ' padding: 10px; width: 100%;">' +
              '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">' +
                '<div>' +
                  '<h4 class="card-title" style="margin-bottom: 3px;">' + escapeHtml(game.title) + '</h4>' +
                  '<p class="card-category" style="font-size: 0.75rem;">' + escapeHtml(game.category) + '</p>' +
                '</div>' +
                (game.visits ? '<div class="visit-badge" style="font-size: 0.75rem;">' + escapeHtml(game.visits) + '</div>' : '') +
              '</div>' +
              '<div class="button-group">' + linkButtons(game, 'small', 'btn-xs') + detailsButton(id, game, 'btn-xs') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    },

    // all-games.html – same overlay style as the portfolio cards, 3 per row
    'all-games': function(id, game) {
      return '<div class="col-sm-6 col-lg-4 mb-4">' +
        '<div class="card game-grid-card all-games-card">' +
          cardImage(game, 'height: 250px; object-fit: cover; border-radius: 10px;') +
          '<div class="card-img-overlay d-flex flex-column justify-content-end" style="padding: 0;">' +
            '<div style="' + OVERLAY_GRADIENT + ' padding: 14px; width: 100%;">' +
              '<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 10px;">' +
                '<div>' +
                  '<h4 class="card-title" style="margin-bottom: 3px;">' + escapeHtml(game.title) + '</h4>' +
                  '<p class="card-category" style="font-size: 0.8rem;">' + escapeHtml(game.category) + '</p>' +
                '</div>' +
                (game.visits ? '<div class="visit-badge" style="font-size: 0.8rem;">' + escapeHtml(game.visits) + '</div>' : '') +
              '</div>' +
              '<div class="button-group">' + linkButtons(game, 'small', 'btn-xs') + detailsButton(id, game, 'btn-xs') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }
  };

  var COMING_SOON_CARD =
    '<div class="col-6 mb-3">' +
      '<div class="card game-grid-card" style="background-color: #2d1410; display: flex; align-items: center; justify-content: center; border: 2px dashed #f7a204;">' +
        '<div style="text-align: center; color: #f7a204;">' +
          '<p class="mb-0" style="font-size: 2rem;">+</p>' +
          '<p class="mb-0">Coming Soon</p>' +
        '</div>' +
      '</div>' +
    '</div>';

  $('[data-game-list]').each(function() {
    var $slot = $(this);
    var ids = GAME_LIST_DATA[$slot.data('gameList')] || [];
    var template = CARD_TEMPLATES[$slot.data('card')];
    var fillTo = Number($slot.data('fillTo')) || 0;
    var html = '';
    var count = 0;

    if (!template) {
      console.warn('Unknown card style: ' + $slot.data('card'));
      return;
    }

    $.each(ids, function(_, id) {
      if (!GAME_DATA[id]) {
        console.warn('Unknown game id in GAME_LISTS: ' + id);
        return;
      }
      html += template(id, GAME_DATA[id]);
      count++;
    });

    for (; count < fillTo; count++) {
      html += COMING_SOON_CARD;
    }

    $slot.html(html);
  });

  // ------------------------------------------------------------
  // Carousels (only on pages that load owl.carousel)
  // ------------------------------------------------------------
  if ($.fn.owlCarousel) {
    $('.owl-carousel2').owlCarousel({
      loop: true,
      center: false,
      margin: 20,
      responsiveClass: true,
      nav: true,
      responsive: {
        0: {
          items: 2,
          nav: false
        },
        600: {
          items: 2,
          nav: false
        },
        1000: {
          items: 4,
          nav: true,
          loop: true
        }
      }
    });

    $('.owl-carousel3').owlCarousel({
      loop: true,
      center: false,
      margin: 20,
      responsiveClass: true,
      nav: true,
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        600: {
          items: 2,
          nav: false
        },
        1000: {
          items: 3,
          nav: true,
          loop: true
        }
      }
    });

    $('.owl-carousel4').owlCarousel({
      loop: true,
      center: false,
      margin: 20,
      responsiveClass: true,
      nav: true,
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        600: {
          items: 2,
          nav: false
        },
        1000: {
          items: 2,
          nav: true,
          loop: true
        }
      }
    });
  }

  // ------------------------------------------------------------
  // "What I did" pop-up
  // ------------------------------------------------------------
  function paragraphsHtml(paragraphs) {
    return paragraphs.map(function(text) {
      return '<p>' + escapeHtml(text).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  function renderModal(study) {
    $('#modalTitle').text(study.title || 'Project');
    $('#modalCategory').text(study.category || '');

    var html = '';
    var detailHtml = '';

    if (study.paragraphs && study.paragraphs.length) {
      html += '<div class="case-study-intro">' + paragraphsHtml(study.paragraphs) + '</div>';
    }

    $.each(study.meta || [], function(_, item) {
      html += '<div class="case-study-meta-item"><span>' + escapeHtml(item.label) + '</span><strong>' + escapeHtml(item.value) + '</strong></div>';
    });

    if (study.bullets && study.bullets.length) {
      detailHtml += '<div class="case-study-responsibilities"><ul>' +
        study.bullets.map(function(text) { return '<li>' + escapeHtml(text) + '</li>'; }).join('') +
        '</ul></div>';
    }

    var primaryHtml = (study.links || []).map(function(link) {
      return '<a class="case-study-link case-study-primary-btn" href="' + escapeHtml(link.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(link.label) + '</a>';
    }).join('');

    var docsHtml = (study.documents || []).map(function(doc) {
      return '<a class="case-study-secondary-btn" href="' + escapeHtml(resolveUrl(doc.url)) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(doc.label) + '</a>';
    }).join('');

    if (primaryHtml || docsHtml) {
      detailHtml += '<div class="case-study-actions">';
      if (primaryHtml) detailHtml += '<div class="case-study-primary-links">' + primaryHtml + '</div>';
      if (docsHtml) detailHtml += '<div class="case-study-media-actions">' + docsHtml + '</div>';
      detailHtml += '</div>';
    }

    if (detailHtml) {
      html += '<div class="case-study-detail-row">' + detailHtml + '</div>';
    }

    $('#modalMeta').html(html);
    $('#portfolioModal').modal('show');
  }

  function studyFromGame(game) {
    return {
      title: game.title,
      category: game.category,
      paragraphs: [].concat(game.description || []),
      meta: game.meta || (game.visits ? [{ label: 'Scale', value: game.visits + ' Visits' }] : []),
      bullets: game.whatIDid || [],
      links: gameLinks(game).map(function(link) { return { url: link.url, label: link.large }; }),
      documents: game.documents || []
    };
  }

  // Skill cards (Game Design carousel etc.) keep their text in data-description.
  function studyFromCard($card) {
    var text = String($card.data('description') || '');
    var paragraphs = text.split(/\n\s*\n/).map(function(block) {
      return $.trim(block.split('\n').map($.trim).filter(Boolean).join('\n'));
    }).filter(Boolean);

    return {
      title: $.trim($card.find('.card-title').first().text()),
      category: $.trim($card.find('.card-category, .card-text').first().text()),
      paragraphs: paragraphs
    };
  }

  $(document).on('click', '.open-portfolio-modal', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var game = GAME_DATA[$(this).data('gameId')];
    if (game) {
      renderModal(studyFromGame(game));
    }
  });

  $('.portfolio-card').on('click', function() {
    renderModal(studyFromCard($(this)));
  });
});

function myFunction(x) {
  x.classList.toggle('change');
}
