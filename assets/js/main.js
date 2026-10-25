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

  // Links that can be played inside the card instead of opening a new tab.
  var VIDEO_LINK_KEYS = ['video', 'trailer', 'tutorial'];

  function gameLinks(game) {
    var links = [];
    $.each(LINK_TYPES, function(_, type) {
      var url = game.links && game.links[type.key];
      if (url) {
        links.push({ key: type.key, url: resolveUrl(url), large: type.large, small: type.small });
      }
    });
    return links;
  }

  function youtubeEmbed(url) {
    var id = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i.exec(url);
    if (!id) return null;
    var start = /[?&#](?:t|start)=(\d+)/.exec(url);
    return {
      src: 'https://www.youtube-nocookie.com/embed/' + id[1] + '?autoplay=1&rel=0&playsinline=1' + (start ? '&start=' + start[1] : ''),
      poster: 'https://i.ytimg.com/vi/' + id[1] + '/hqdefault.jpg'
    };
  }

  function driveEmbed(url) {
    var id = /drive\.google\.com\/file\/d\/([\w-]+)/i.exec(url);
    return id ? { src: 'https://drive.google.com/file/d/' + id[1] + '/preview' } : null;
  }

  // The big area at the top of a card: a looping clip, a click-to-play
  // video, or – when the game has neither – its image.
  function gameMedia(game) {
    var image = game.image ? assetUrl(game.image) : '';
    var alt = escapeHtml(game.title);

    if (game.clip) {
      var clip = escapeHtml(resolveUrl(game.clip));
      if (/\.gif$/i.test(game.clip)) {
        return { html: '<img class="game-media-el" src="' + clip + '" alt="' + alt + ' gameplay" loading="lazy">' };
      }
      return {
        html: '<video class="game-media-el" autoplay muted loop playsinline preload="metadata"' +
          (image ? ' poster="' + escapeHtml(image) + '"' : '') + '><source src="' + clip + '"></video>'
      };
    }

    for (var i = 0; i < VIDEO_LINK_KEYS.length; i++) {
      var key = VIDEO_LINK_KEYS[i];
      var url = game.links && game.links[key];
      var drive = url && driveEmbed(url);
      if (drive) {
        // Google Drive's player can't autoplay, so a poster would need two
        // clicks. Show Drive's own player straight away instead.
        return {
          linkKey: key,
          mediaClass: 'game-media--drive',
          html: '<iframe class="game-media-el" src="' + escapeHtml(drive.src) + '" title="Video: ' + alt + '" loading="lazy"' +
            ' allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>'
        };
      }
      var embed = url && youtubeEmbed(url);
      if (embed) {
        var poster = embed.poster || image;
        // If the video's preview frame can't load, fall back to the game image.
        var fallback = image && poster !== image
          ? ' onerror="this.onerror=null;this.src=\'' + escapeHtml(image) + '\'"'
          : '';
        return {
          linkKey: key,
          html: '<button type="button" class="game-media-play" data-embed="' + escapeHtml(embed.src) + '" aria-label="Play video: ' + alt + '">' +
            (poster ? '<img class="game-media-el" src="' + escapeHtml(poster) + '" alt="" loading="lazy"' + fallback + '>' : '<span class="game-media-el game-no-image"></span>') +
            '<span class="game-media-icon" aria-hidden="true"></span>' +
          '</button>'
        };
      }
    }

    if (image) {
      return { usesImage: true, html: '<img class="game-media-el" src="' + escapeHtml(image) + '" alt="' + alt + '" loading="lazy">' };
    }
    // Games without an image get a plain cover in the site's colours.
    return { usesImage: true, html: '<span class="game-media-el game-no-image"></span>' };
  }

  function linkButtons(game, size, skipKey) {
    return gameLinks(game).filter(function(link) {
      return link.key !== skipKey;
    }).map(function(link, index) {
      return '<a href="' + escapeHtml(link.url) + '" class="game-btn ' + (index === 0 ? 'game-btn--primary' : 'game-btn--ghost') + '" target="_blank" rel="noopener noreferrer">' + link[size] + '</a>';
    }).join('');
  }

  function detailsButton(id, game) {
    if (!(game.whatIDid && game.whatIDid.length) && !game.description) {
      return '';
    }
    return '<button type="button" class="game-btn game-btn--ghost open-portfolio-modal" data-game-id="' + escapeHtml(id) + '">' +
      escapeHtml(game.detailsLabel || 'What I did') + '</button>';
  }

  function genreChips(category) {
    return String(category || '').split(/\s*[,·]\s*/).filter(Boolean).map(function(genre) {
      return '<span class="game-genre">' + escapeHtml(genre) + '</span>';
    }).join('');
  }

  // size: 'lg' (featured), 'md' (all games) or 'sm' (compact grids)
  function gameCard(id, game, size) {
    var media = gameMedia(game);
    var icon = game.image && !media.usesImage
      ? '<img class="game-icon" src="' + escapeHtml(assetUrl(game.icon || game.image)) + '" alt="" loading="lazy">'
      : '';
    var visits = game.visits
      ? '<div class="game-visits"><strong>' + escapeHtml(game.visits) + '</strong><span>Visits</span></div>'
      : '';

    // Order: title, visits + genres, then the video, then the buttons.
    return '<article class="game-card game-card--' + size + '">' +
      '<div class="game-card-top">' +
        '<div class="game-card-head">' + icon + '<h3 class="game-card-title">' + escapeHtml(game.title) + '</h3></div>' +
        '<div class="game-card-stats">' + visits + '<div class="game-genres">' + genreChips(game.category) + '</div></div>' +
      '</div>' +
      '<div class="game-media' + (media.mediaClass ? ' ' + media.mediaClass : '') + '">' + media.html + '</div>' +
      '<div class="game-card-actions">' + linkButtons(game, size === 'lg' ? 'large' : 'small', media.linkKey) + detailsButton(id, game) + '</div>' +
    '</article>';
  }

  // data-card value -> grid columns and card size
  var CARD_STYLES = {
    'index-featured': { col: 'col-md-6', size: 'lg' },       // index.html – Recent Games, large cards
    'index-grid': { col: 'col-sm-6 col-lg-3', size: 'sm' },  // index.html – Recent Games, small cards
    'portfolio-featured': { col: 'col-12', size: 'lg' },     // portfolio.html – large cards
    'portfolio-grid': { col: 'col-sm-6', size: 'sm' },       // portfolio.html – 2x2 cards
    'all-games': { col: 'col-sm-6 col-lg-4', size: 'md' }    // all-games.html – 3 per row
  };

  var COMING_SOON_CARD =
    '<div class="game-card game-card--soon">' +
      '<span class="game-soon-plus">+</span>' +
      '<span>Coming Soon</span>' +
    '</div>';

  $('[data-game-list]').each(function() {
    var $slot = $(this);
    var ids = GAME_LIST_DATA[$slot.data('gameList')] || [];
    var style = CARD_STYLES[$slot.data('card')];
    var fillTo = Number($slot.data('fillTo')) || 0;
    var html = '';
    var count = 0;

    if (!style) {
      console.warn('Unknown card style: ' + $slot.data('card'));
      return;
    }

    function column(content) {
      return '<div class="' + style.col + ' mb-4 d-flex">' + content + '</div>';
    }

    $.each(ids, function(_, id) {
      if (!GAME_DATA[id]) {
        console.warn('Unknown game id in GAME_LISTS: ' + id);
        return;
      }
      html += column(gameCard(id, GAME_DATA[id], style.size));
      count++;
    });

    for (; count < fillTo; count++) {
      html += column(COMING_SOON_CARD);
    }

    $slot.html(html);
  });

  // Google Drive's player hides its play button in small frames, so it is
  // always laid out at DRIVE_PLAYER_WIDTH and scaled down to fit the card.
  var DRIVE_PLAYER_WIDTH = 480;

  function fitDrivePlayers() {
    $('.game-media--drive').each(function() {
      var width = this.clientWidth;
      var $frame = $(this).children('iframe');
      if (!width || width >= DRIVE_PLAYER_WIDTH) {
        $frame.css({ width: '', height: '', transform: '' });
      } else {
        $frame.css({
          width: DRIVE_PLAYER_WIDTH + 'px',
          height: (DRIVE_PLAYER_WIDTH * 9 / 16) + 'px',
          transform: 'scale(' + (width / DRIVE_PLAYER_WIDTH) + ')'
        });
      }
    });
  }

  fitDrivePlayers();
  $(window).on('resize', fitDrivePlayers);

  // Skills & Tools tabs (portfolio.html)
  var $skillTabs = $('.skill-tab');
  var $skillTabList = $('.skill-tabs');

  function selectSkillTab($tab, focus) {
    var wasStuck = $skillTabList.length && $skillTabList[0].getBoundingClientRect().top <= 1;

    $skillTabs.attr({ 'aria-selected': 'false', tabindex: '-1' });
    $tab.attr({ 'aria-selected': 'true', tabindex: '0' });
    $('.skill-panel').attr('hidden', 'hidden');
    var $panel = $('#' + $tab.attr('aria-controls')).removeAttr('hidden');

    // When the sticky tab bar is pinned mid-list, jump to the top of the new panel.
    if (wasStuck) {
      window.scrollTo(0, $panel.offset().top - $skillTabList.outerHeight() - 12);
    }
    if (focus) {
      $tab.trigger('focus');
    }
  }

  $skillTabs.on('click', function() {
    selectSkillTab($(this));
  });

  // Arrow keys / Home / End move between tabs.
  $skillTabs.on('keydown', function(e) {
    var index = $skillTabs.index(this);
    var count = $skillTabs.length;
    var target = { 37: index - 1, 39: index + 1, 36: 0, 35: count - 1 }[e.which];
    if (target === undefined) return;
    e.preventDefault();
    selectSkillTab($skillTabs.eq((target + count) % count), true);
  });

  // Swap the video poster for the real player on click.
  $(document).on('click', '.game-media-play', function() {
    var $button = $(this);
    $button.replaceWith(
      '<iframe class="game-media-el" src="' + escapeHtml($button.data('embed')) + '" title="' + escapeHtml($button.attr('aria-label')) + '"' +
      ' allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>'
    );
  });

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

  $(document).on('click', '.open-portfolio-modal', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var game = GAME_DATA[$(this).data('gameId')];
    if (game) {
      renderModal(studyFromGame(game));
    }
  });
});

function myFunction(x) {
  x.classList.toggle('change');
}
