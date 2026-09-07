jQuery(document).ready(function() {
  jQuery('.owl-carousel2').owlCarousel({
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

  jQuery('.owl-carousel3').owlCarousel({
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

  jQuery('.owl-carousel4').owlCarousel({
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

  var pagePrefix = window.location.pathname.toLowerCase().indexOf('/pages/') !== -1 ? '..' : '.';
  var currentCaseStudy = null;

  function assetUrl(path) {
    return pagePrefix + '/' + path;
  }

  function normalizeHtml(html) {
    if (typeof html !== 'string') {
      return '';
    }

    return html.replace(/>\s+</g, '><').trim();
  }

  var portfolioCaseStudies = {
    'pull-a-lucky-fish': {
      eyebrow: 'Commercial Case Study',
      title: 'Pull a Lucky Fish',
      category: 'Simulation, Tycoon',
      summaryHtml: '<p>A stronger showcase format for this project is a compact case study rather than a single screenshot. This template gives you a hero media stage, structured impact details, and dedicated spaces for process evidence like GIFs, GDD pages, pitch decks, and economy docs.</p><p>For Pull a Lucky Fish, the strongest story is your design contribution across live ops, quests, progression, and monetisation support.</p>',
      meta: [
        { label: 'Role', value: 'Game Design Consultant' },
        { label: 'Focus', value: 'Live Ops, Progression, Economy' },
        { label: 'Scale', value: '37M Visits' },
        { label: 'Format', value: 'Professional case study' }
      ],
      links: [
        { label: 'Play Game', href: 'https://www.roblox.com/games/112781315318195/Pull-a-Lucky-Fish' },
        { label: 'Watch Video', href: 'https://www.youtube.com/watch?v=Z3fYOxb-2pM' }
      ],
      media: [
        {
          type: 'image',
          label: 'Key Visual',
          assetType: 'cover',
          src: assetUrl('assets/img/PullALuckyFish.jpg'),
          alt: 'Pull a Lucky Fish key visual',
          caption: 'Use the hero slot for your strongest marketing visual or an animated GIF showing the core loop.'
        },
        {
          type: 'image',
          label: 'Design Snapshot',
          assetType: 'process',
          src: assetUrl('assets/img/GDD.png'),
          alt: 'Game design document sample',
          caption: 'Template placeholder: swap this for a Lucky Fish-specific system diagram, quest flow, or economy screen.'
        },
        {
          type: 'embed',
          label: 'Scrollable Doc',
          assetType: 'document',
          src: assetUrl('assets/pdfs/GDD.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH'),
          caption: 'This slot supports scrollable PDFs, public docs, pitch decks, Figma embeds, and other browser-viewable files.'
        }
      ],
      tabs: {
        overview: '<div class="case-study-grid"><div class="case-study-note"><h4>Project Framing</h4><p>Open with one tight paragraph on the player fantasy, the business goal, and the design challenge. This makes the rest of the evidence easier to read as deliberate problem solving rather than a loose list of tasks.</p></div><div class="case-study-note"><h4>What You Should Show</h4><p>Prioritise one GIF of the core loop, one proof-of-thinking artifact, and one short explanation of the measurable result or expected player impact.</p></div></div><h4>Suggested Pull a Lucky Fish structure</h4><ul><li>Context: what the game is and what part of production you joined.</li><li>Challenge: what needed improvement in retention, questing, pacing, or economy feel.</li><li>Your contribution: what you designed, reviewed, balanced, or pitched.</li><li>Outcome: visits, player clarity, feature adoption, improved progression feel, or faster content cadence.</li></ul>',
        gallery: '<div class="case-study-grid"><div class="case-study-note"><h4>GIF / Video Space</h4><p>Add short looping clips here for the fishing loop, quest UX, reward flow, or island progression. Keep clips under 10 seconds and each one focused on a single feature.</p></div><div class="case-study-note"><h4>Screenshot Sequence</h4><p>Use 3 to 5 frames that walk the viewer through discovery, action, reward, and upgrade. That tells a stronger story than one still image.</p></div></div><p>The media rail above already supports multiple visuals. Replace the placeholder assets with project-specific GIFs, annotated screenshots, or short exported slides.</p>',
        docs: '<div class="case-study-grid"><div class="case-study-doc-card"><h4>Scrollable Documents</h4><p>Use this section for public PDFs, one-pagers, GDD excerpts, quest trees, or monetisation rationale. The preview stage above can display them inside the modal so the viewer never leaves the page.</p><button type="button" class="case-study-inline-action" data-media-index="2">Open the document example</button></div><div class="case-study-doc-card"><h4>Template Note</h4><p>Replace the sample PDF with a project-specific asset. Good candidates are a redacted GDD page, economy balancing notes, a pitch deck export, or a milestone presentation.</p></div></div>',
        process: '<h4>What I did</h4><ul><li>Acted as the Game Design consultant with emphasis on live ops, quests, and progression.</li><li>Helped review the progression system and player experience in the core loop.</li><li>Supported monetisation strategy and in-game economy feature design.</li></ul><h4>How to make this section stronger</h4><ul><li>Break the work into problem, intervention, and outcome instead of one flat list.</li><li>Add one artifact per responsibility so the claim is supported visually.</li><li>Keep each responsibility short enough to scan in under five seconds.</li></ul>'
      }
    }
  };

  function collectLinks($card) {
    var links = [];

    $card.find('.button-group a').each(function() {
      links.push({
        label: $.trim($(this).text()),
        href: $(this).attr('href')
      });
    });

    return links;
  }

  function buildFallbackStudy($card, description) {
    var title = $.trim($card.find('.card-title').first().text());
    var category = $.trim($card.find('.card-category, .card-text').first().text());
    var imageSrc = $card.find('.card-img').first().attr('src');
    var overviewHtml = normalizeHtml(description) || '<p>Add a short overview here to explain the project, your role, and the result.</p>';

    return {
      eyebrow: 'Project Snapshot',
      title: title,
      category: category,
      summaryHtml: '<p>This project is still using the lighter fallback layout. To upgrade it, add a <strong>data-case-study-key</strong> and define a richer entry in <strong>main.js</strong> with media, docs, and process sections.</p>',
      meta: [
        { label: 'Status', value: 'Basic modal' },
        { label: 'Best Next Step', value: 'Add a case-study key' }
      ],
      links: collectLinks($card),
      media: imageSrc ? [{
        type: 'image',
        label: 'Project Visual',
        assetType: 'image',
        src: imageSrc,
        alt: title,
        caption: 'Fallback visual. Replace with a GIF, annotated screenshot, or document embed for a stronger presentation.'
      }] : [],
      tabs: {
        overview: overviewHtml,
        gallery: '<p>Add GIFs, annotated screenshots, or a short slide sequence to show how the feature works instead of relying on one still image.</p>',
        docs: '<p>Add a public PDF or browser-viewable document URL to let visitors scroll through supporting material inside the modal.</p>',
        process: '<p>Break your work into challenge, contribution, and outcome. That is the strongest structure for recruiters, clients, and collaborators.</p>'
      }
    };
  }

  function renderMeta(meta) {
    var html = '';

    $.each(meta || [], function(_, item) {
      html += '<div class="case-study-meta-item"><span>' + item.label + '</span><strong>' + item.value + '</strong></div>';
    });

    $('#modalMeta').html(html);
  }

  function renderLinks(links) {
    var html = '';

    $.each(links || [], function(_, link) {
      if (!link.href) {
        return;
      }

      html += '<a class="case-study-link" href="' + link.href + '" target="_blank" rel="noopener noreferrer">' + link.label + '</a>';
    });

    $('#modalLinks').html(html);
  }

  function setActivePanel(panelName) {
    $('.case-study-tab').removeClass('is-active');
    $('.case-study-panel').removeClass('is-active');
    $('.case-study-tab[data-panel="' + panelName + '"]').addClass('is-active');
    $('.case-study-panel[data-panel="' + panelName + '"]').addClass('is-active');
  }

  function setActiveMedia(index) {
    if (!currentCaseStudy || !currentCaseStudy.media || !currentCaseStudy.media[index]) {
      return;
    }

    var item = currentCaseStudy.media[index];
    var $stage = $('#modalMediaStage');
    var $image = $('#modalStageImage');
    var $embed = $('#modalStageEmbed');

    $('.case-study-media-button').removeClass('is-active');
    $('.case-study-media-button[data-media-index="' + index + '"]').addClass('is-active');
    $('#modalStageCaption').text(item.caption || '');

    if (item.type === 'embed') {
      $stage.removeClass('is-image').addClass('is-embed');
      $image.attr('src', '').attr('alt', '');
      $embed.attr('src', item.src || 'about:blank');
    } else {
      $stage.removeClass('is-embed').addClass('is-image');
      $embed.attr('src', 'about:blank');
      $image.attr('src', item.src || '').attr('alt', item.alt || currentCaseStudy.title || '');
    }
  }

  function renderMedia(media) {
    var html = '';
    var items = media || [];

    if (!items.length) {
      $('#modalMediaStrip').html('');
      $('#modalMediaStage').removeClass('is-embed').addClass('is-image');
      $('#modalStageImage').attr('src', '').attr('alt', '');
      $('#modalStageEmbed').attr('src', 'about:blank');
      $('#modalStageCaption').text('');
      return;
    }

    $.each(items, function(index, item) {
      html += '<button type="button" class="case-study-media-button' + (index === 0 ? ' is-active' : '') + '" data-media-index="' + index + '">';
      html += '<span class="case-study-media-label">' + item.label + '</span>';
      html += '<span class="case-study-media-type">' + item.assetType + '</span>';
      html += '</button>';
    });

    $('#modalMediaStrip').html(html);
    setActiveMedia(0);
  }

  function renderStudy(study) {
    currentCaseStudy = study;

    $('#modalEyebrow').text(study.eyebrow || 'Case Study');
    $('#modalTitle').text(study.title || 'Project');
    $('#modalCategory').text(study.category || '');
    $('#modalSummary').html(study.summaryHtml || '');
    $('#modalOverview').html((study.tabs && study.tabs.overview) || '');
    $('#modalGallery').html((study.tabs && study.tabs.gallery) || '');
    $('#modalDocs').html((study.tabs && study.tabs.docs) || '');
    $('#modalProcess').html((study.tabs && study.tabs.process) || '');

    renderMeta(study.meta || []);
    renderLinks(study.links || []);
    renderMedia(study.media || []);
    setActivePanel('overview');
  }

  function openPortfolioModal($card, description, caseStudyKey) {
    var study = caseStudyKey && portfolioCaseStudies[caseStudyKey]
      ? JSON.parse(JSON.stringify(portfolioCaseStudies[caseStudyKey]))
      : buildFallbackStudy($card, description);

    renderStudy(study);
    $('#portfolioModal').modal('show');
  }

  $('.portfolio-card').on('click', function() {
    openPortfolioModal($(this), $(this).data('description'), $(this).data('caseStudyKey'));
  });

  $(document).on('click', '.open-portfolio-modal', function(e) {
    e.preventDefault();
    e.stopPropagation();

    openPortfolioModal(
      $(this).closest('.card'),
      $(this).data('description'),
      $(this).data('caseStudyKey')
    );
  });

  $(document).on('click', '.case-study-tab', function() {
    setActivePanel($(this).data('panel'));
  });

  $(document).on('click', '.case-study-media-button, .case-study-inline-action[data-media-index]', function() {
    setActiveMedia(Number($(this).data('mediaIndex')));
  });

  $('#portfolioModal').on('hidden.bs.modal', function() {
    $('#modalStageEmbed').attr('src', 'about:blank');
    currentCaseStudy = null;
  });
});

function myFunction(x) {
  x.classList.toggle('change');
}
