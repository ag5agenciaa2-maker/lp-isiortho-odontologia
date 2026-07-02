/* ===========================================================
   ISIORTHO ODONTOLOGIA PREMIUM — script.js
   Vanilla ES6 · sem frameworks
   =========================================================== */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WHATS = 'https://wa.me/5521990162232';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Estrelas do hero ---------- */
    var heroStars = document.getElementById('hero-stars');
    if (heroStars) heroStars.textContent = '★★★★★';

    /* ---------- Avatares de prova social ---------- */
    var avatars = document.getElementById('avatars');
    if (avatars) {
      var inits = ['F', 'M', 'A', 'G'];
      var colors = ['#0C246C', '#968246', '#3a4258', '#C9B68C'];
      inits.forEach(function (c, i) {
        var s = document.createElement('span');
        s.textContent = c;
        s.style.background = colors[i];
        s.style.zIndex = 10 - i;
        s.style.transitionDelay = (i * 80) + 'ms';
        avatars.appendChild(s);
      });
    }

    /* ---------- Marquee ---------- */
    var marquee = document.getElementById('marquee');
    if (marquee) {
      var terms = ['Implantes Dentários', 'Cirurgia Guiada Sem Cortes', 'Dentadura Fixa', 'Planejamento Digital', '20 Anos de Experiência', 'Itaguaí-RJ'];
      var buildGroup = function () {
        var g = document.createElement('span');
        g.className = 'marquee__group';
        terms.forEach(function (t) {
          var item = document.createElement('span');
          item.className = 'marquee__item';
          item.innerHTML = '<span>' + t + '</span><b>✦</b>';
          g.appendChild(item);
        });
        return g;
      };
      marquee.appendChild(buildGroup());
      marquee.appendChild(buildGroup()); /* duplicado p/ loop contínuo */
    }

    /* ---------- Animação de carregamento do hero ---------- */
    requestAnimationFrame(function () {
      document.body.classList.add('is-loaded');
      var title = document.querySelector('.hero__title');
      if (title) title.classList.add('is-in');
    });

    /* ---------- Reveal no scroll (IntersectionObserver) ---------- */
    var reveals = document.querySelectorAll('.reveal');
    if (REDUCED) {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    } else if ('IntersectionObserver' in window) {
      var revObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            revObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (el) { revObs.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    }

    /* ---------- Contadores animados ---------- */
    var counters = document.querySelectorAll('.count');
    var animateCount = function (el) {
      var target = parseFloat(el.dataset.count);
      var isFloat = target % 1 !== 0;
      if (REDUCED) {
        el.textContent = isFloat ? target.toFixed(1).replace('.', ',') : String(target);
        return;
      }
      var dur = 1500, start = performance.now();
      var step = function (now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target * eased;
        el.textContent = isFloat ? val.toFixed(1).replace('.', ',') : String(Math.round(val));
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = isFloat ? target.toFixed(1).replace('.', ',') : String(target);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var cntObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animateCount(e.target); cntObs.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cntObs.observe(el); });
    } else {
      counters.forEach(animateCount);
    }

    /* ---------- Navbar solidifica ao rolar ---------- */
    var nav = document.getElementById('nav');
    var scrollPending = false;
    var onScroll = function () {
      if (scrollPending) return;
      scrollPending = true;
      requestAnimationFrame(function () {
        scrollPending = false;
        if (window.scrollY > 40) nav.classList.add('is-solid');
        else nav.classList.remove('is-solid');
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Scroll-spy: link ativo conforme a seção ---------- */
    var spyLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
    if (spyLinks.length && 'IntersectionObserver' in window) {
      var spyMap = {};
      var spySections = [];
      spyLinks.forEach(function (a) {
        var id = a.getAttribute('href').slice(1);
        var sec = document.getElementById(id);
        if (sec) { spyMap[id] = a; spySections.push(sec); }
      });
      var setActive = function (id) {
        spyLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
        });
      };
      var spyObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      spySections.forEach(function (s) { spyObs.observe(s); });
    }

    /* ---------- Menu mobile (drawer) ---------- */
    var burger = document.getElementById('navBurger');
    var drawer = document.getElementById('drawer');
    var overlay = document.getElementById('drawerOverlay');
    var drawerClose = document.getElementById('drawerClose');
    if (burger && drawer && overlay) {
      var openDrawer = function () {
        drawer.classList.add('is-open');
        overlay.classList.add('is-open');
        document.body.classList.add('no-scroll');
        burger.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
      };
      var closeDrawer = function () {
        drawer.classList.remove('is-open');
        overlay.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
        burger.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      };
      burger.addEventListener('click', openDrawer);
      if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
      overlay.addEventListener('click', closeDrawer);
      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeDrawer);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
      });
    }

    /* ---------- Grid de depoimentos (Mural de Prestígio) ---------- */
    var REVIEWS = [
      { name: 'Fátima Cardoso', initial: 'F', time: 'há 1 ano', stars: 5, text: 'Fiz tratamento na Isiortho e, sem dúvida, fiz a melhor escolha. São profissionais qualificadíssimos, excelentes e maravilhosos. Só tenho a agradecer a toda a equipe do Dr. Victor. Desde a recepção (meninas qualificadas, educadas e simpáticas) até os profissionais que contribuíram para que eu pudesse realizar meu sonho de colocar um sorriso lindo no meu rosto. Obrigada, Isiortho. Um beijo no coração. ❤️' },
      { name: 'Miriam Calassara', initial: 'M', time: 'há 1 ano', stars: 5, text: 'Maravilhosa! Excelentes profissionais, atenciosos e, o mais importante, empenhados em nos devolver segurança e autoestima. Já recomendei e recomendo a várias pessoas.' },
      { name: 'Janilza Maria Bispo', initial: 'J', time: 'há 1 ano', stars: 5, text: 'Minha experiência está sendo muito boa. A cirurgia foi muito tranquila. Eu estava muito receosa, mas a equipe me passou muita segurança. Continuo no processo. Equipe excelente. 👏👏👏👏' },
      { name: 'Almir Junior', initial: 'A', time: 'há 1 ano', stars: 5, text: 'Morria de medo de dentista, mas o Dr. Victor Frias tirou esse medo com um tratamento super bom.' },
      { name: 'Maria Lucia de Souza', initial: 'M', time: 'há 1 ano', stars: 5, text: 'Experiência maravilhosa. Dr. Vitor e sua irmã sempre muito atenciosos, serviço de qualidade e toda a equipe excelente.' },
      { name: 'Gloria Maria J. De Melo', initial: 'G', time: 'há 1 ano', stars: 5, text: 'O melhor atendimento que eu já tive em Itaguaí. Atencioso, educado, eficiente no que faz e, o melhor, entregou o trabalho como esperado, superando minhas expectativas. Trabalho de excelência.' },
      { name: 'Julio Marinho', initial: 'J', time: 'há 1 ano', stars: 5, text: 'Ótima experiência. Excelentíssimos dentistas, tanto o Dr. Igor quanto o Dr. Vitor. Todos muito profissionais. Recomendo muito.' },
      { name: 'Vanessa Ferreira', initial: 'V', time: 'há 1 ano', stars: 5, text: 'Atendimento e paciência dos profissionais são excelentes. Obrigada por estarem me proporcionando um sorriso novo.' },
      { name: 'Talita Rodrigues', initial: 'T', time: 'há 1 ano', stars: 5, text: 'A melhor clínica odontológica de Itaguaí, sem dúvidas. ❤️ Super recomendo. O atendimento é excelente e a clínica é bem aconchegante. Trato lá desde os meus 12 anos de idade e hoje já estou com 24 anos. ❤️🫶🏾' },
      { name: 'Lucimar Pinheiro', initial: 'L', time: 'há 1 ano', stars: 5, text: 'Fui muito bem assistida e o meu tratamento ficou perfeito. Serviço de primeira.' },
      { name: 'Maria das Graças', initial: 'M', time: 'há 1 ano', stars: 5, text: 'Foi muito bom, ótimo trabalho e as pessoas que trabalham lá são muito atenciosas.' },
      { name: 'Lourival Nunes', initial: 'L', time: 'há 1 ano', stars: 5, text: 'Excelente clínica, toda a equipe está de parabéns. Só gratidão.' },
      { name: 'Letícia Dias', initial: 'L', time: 'há 4 anos', stars: 5, text: 'Bons profissionais que atuam de forma séria e segura. Preços acessíveis, com facilidade no pagamento. Ótima recepção e conforto!!' },
      { name: 'Otávio Gusmão', initial: 'O', time: 'há 4 anos', stars: 5, text: 'Profissionais competentes, ótimo atendimento e a recepção de todos que trabalham lá é sem igual. Eu aprovo.' },
      { name: 'Daniel Ferreira', initial: 'D', time: 'há 4 anos', stars: 5, text: 'Fui muito bem atendido nessa clínica. Atingiu minhas expectativas! Eu recomendo!' },
      { name: 'Leo Marins', initial: 'L', time: 'há 3 anos', stars: 5, text: 'Atendimento top! As instalações da clínica são modernas, limpas e agradáveis.' },
      { name: 'Sissa Vaz', initial: 'S', time: 'há 4 anos', stars: 5, text: 'Clínica muito limpa, atendentes muito simpáticas e ambiente bem aconchegante. Profissionais qualificados. Recomendo!' }
    ];
    var row1 = document.getElementById('reviews-row-1');
    var row2 = document.getElementById('reviews-row-2');
    if (row1 && row2) {
      // Divide depoimentos: 9 na linha 1, 8 na linha 2
      var mid = 9;
      var list1 = REVIEWS.slice(0, mid);
      var list2 = REVIEWS.slice(mid);

      var buildTrack = function (items) {
        var track = document.createElement('div');
        track.className = 'reviews__marquee-track';
        
        var buildCards = function () {
          items.forEach(function (r) {
            var card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML =
              '<div class="review-card__header">' +
                '<div class="review-card__stars">' + '★'.repeat(r.stars) + '</div>' +
                '<svg class="review-card__google-icon" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.2c0-.7-.06-1.4-.18-2H12v3.8h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-7.8z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.3 1-3.8 1-2.9 0-5.4-2-6.3-4.6H2v2.8A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.7 14a6.6 6.6 0 0 1 0-4.2V7H2a11 11 0 0 0 0 9.9z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.2 1.6l3.1-3.1A11 11 0 0 0 2 7l3.7 2.8C6.6 7.3 9.1 5.4 12 5.4z"/></svg>' +
              '</div>' +
              '<blockquote class="review-card__text">“' + r.text + '”</blockquote>' +
              '<div class="review-card__footer">' +
                '<span class="review-card__av">' + r.initial + '</span>' +
                '<div>' +
                  '<div class="review-card__name">' + r.name + '</div>' +
                  '<div class="review-card__time">' + r.time + '</div>' +
                '</div>' +
              '</div>';
            track.appendChild(card);
          });
        };

        buildCards();
        buildCards(); // Duplica para criar loop infinito perfeito
        return track;
      };

      row1.appendChild(buildTrack(list1));
      row2.appendChild(buildTrack(list2));
    }
    /* ---------- FAQ: acordeão exclusivo ---------- */
    var faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(function (details) {
      details.addEventListener('toggle', function () {
        if (details.open) {
          faqItems.forEach(function (other) {
            if (other !== details) {
              other.removeAttribute('open');
            }
          });
        }
      });
    });
    /* ---------- Vídeos da galeria ---------- */
    document.querySelectorAll('.playbtn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var fig = btn.closest('figure');
        var vid = fig ? fig.querySelector('video') : null;
        if (vid && vid.paused) {
          vid.play();
          btn.classList.add('is-hidden');
        }
      });
    });

    /* ---------- Som do vídeo da hero ---------- */
    var heroVideo = document.getElementById('heroVideo');
    var heroSound = document.getElementById('heroSound');
    if (heroVideo && heroSound) {
      heroSound.addEventListener('click', function () {
        heroVideo.muted = !heroVideo.muted;
        heroSound.classList.toggle('is-on', !heroVideo.muted);
        heroSound.setAttribute('aria-label', heroVideo.muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo');
        if (!heroVideo.muted) {
          var pr = heroVideo.play();
          if (pr && pr.catch) pr.catch(function () {});
        }
      });
    }

    /* ---------- Vídeo da hero só roda enquanto a hero está visível ---------- */
    if (heroVideo) {
      var heroSection = document.getElementById('inicio');
      if (heroSection && 'IntersectionObserver' in window) {
        var heroVidObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var pr = heroVideo.play();
              if (pr && pr.catch) pr.catch(function () {});
            } else {
              heroVideo.pause();
              try { heroVideo.currentTime = 0; } catch (e) {}
              // ao sair, volta ao mudo para não tocar áudio fora da hero
              heroVideo.muted = true;
              if (heroSound) {
                heroSound.classList.remove('is-on');
                heroSound.setAttribute('aria-label', 'Ativar som do vídeo');
              }
            }
          });
        }, { threshold: 0.35 });
        heroVidObs.observe(heroSection);
      }
    }

    /* ---------- Controle play/pause do vídeo de tecnologia ---------- */
    var techCtrl = document.getElementById('techVideoCtrl');
    if (techCtrl) {
      var techFig = techCtrl.closest('.tech-video');
      var techVid = techFig ? techFig.querySelector('video') : null;
      if (techVid) {
        var soundBtn = document.getElementById('techVideoSound');
        var expandBtn = document.getElementById('techVideoExpand');
        var syncTechCtrl = function () {
          var paused = techVid.paused;
          techCtrl.classList.toggle('is-paused', paused);
          techCtrl.setAttribute('aria-label', paused ? 'Reproduzir vídeo' : 'Pausar vídeo');
          if (techFig) techFig.classList.toggle('is-playing', !paused);
        };
        techCtrl.addEventListener('click', function () {
          if (techVid.paused) {
            techVid.muted = false;
            techVid.play();
            if (soundBtn) {
              soundBtn.classList.add('is-on');
              soundBtn.setAttribute('aria-label', 'Desativar som');
            }
          } else {
            techVid.pause();
          }
        });
        techVid.addEventListener('play', syncTechCtrl);
        techVid.addEventListener('pause', syncTechCtrl);

        if (soundBtn) {
          soundBtn.addEventListener('click', function () {
            techVid.muted = !techVid.muted;
            soundBtn.classList.toggle('is-on', !techVid.muted);
            soundBtn.setAttribute('aria-label', techVid.muted ? 'Ativar som' : 'Desativar som');
          });
        }
        if (expandBtn) {
          var techModal = document.getElementById('techModal');
          var techModalVideo = document.getElementById('techModalVideo');
          var techModalClose = document.getElementById('techModalClose');
          var techModalOverlay = document.getElementById('techModalOverlay');

          var openTechModal = function () {
            if (!techModal) return;
            techVid.pause();
            techModal.classList.add('is-open');
            techModal.removeAttribute('aria-hidden');
            document.body.classList.add('no-scroll');
            if (techModalVideo) {
              try { techModalVideo.currentTime = techVid.currentTime || 0; } catch (e) {}
              techModalVideo.muted = false;
              techModalVideo.play();
            }
          };
          var closeTechModal = function () {
            if (!techModal) return;
            techModal.classList.remove('is-open');
            techModal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('no-scroll');
            if (techModalVideo) techModalVideo.pause();
          };

          expandBtn.addEventListener('click', openTechModal);
          if (techModalClose) techModalClose.addEventListener('click', closeTechModal);
          if (techModalOverlay) techModalOverlay.addEventListener('click', closeTechModal);
          document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && techModal && techModal.classList.contains('is-open')) closeTechModal();
          });
        }
        syncTechCtrl();
      }
    }

    /* ---------- Formulário → WhatsApp ---------- */
    var form = document.getElementById('form');
    if (form) {
      var setErr = function (field, msg) {
        var err = field.querySelector('.field__err');
        var input = field.querySelector('input, textarea, select');
        if (msg) {
          err.textContent = msg; err.classList.add('is-shown'); input.classList.add('is-invalid');
        } else {
          err.classList.remove('is-shown'); input.classList.remove('is-invalid');
        }
      };
      var fields = form.querySelectorAll('.field');
      var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      /* Máscara de telefone (WhatsApp com DDD) */
      var maskPhone = function (v) {
        v = v.replace(/\D/g, '').slice(0, 11);
        if (v.length > 10) return v.replace(/(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
        if (v.length > 6) return v.replace(/(\d{2})(\d{4,5})(\d{0,4}).*/, '($1) $2-$3');
        if (v.length > 2) return v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        if (v.length > 0) return v.replace(/(\d{0,2})/, '($1');
        return v;
      };
      form.telefone.addEventListener('input', function () {
        this.value = maskPhone(this.value);
      });

      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var nome = form.nome.value.trim();
        var email = form.email.value.trim();
        var tel = form.telefone.value.trim();
        var assunto = form.assunto.value;
        var msg = form.mensagem.value.trim();
        var ok = true;
        var digits = tel.replace(/\D/g, '');

        if (nome.length < 2) { setErr(fields[0], 'Informe seu nome.'); ok = false; } else setErr(fields[0], '');
        if (!EMAIL_RE.test(email)) { setErr(fields[1], 'Informe um e-mail válido.'); ok = false; } else setErr(fields[1], '');
        if (digits.length < 10) { setErr(fields[2], 'Informe um WhatsApp válido com DDD.'); ok = false; } else setErr(fields[2], '');
        if (!assunto) { setErr(fields[3], 'Selecione uma opção.'); ok = false; } else setErr(fields[3], '');
        setErr(fields[4], '');

        if (!ok) return;

        var lines = [
          'Olá, me chamo ' + nome + ', vim através do site e gostaria de uma informação.',
          '',
          '- E-mail: ' + email,
          '- Telefone: ' + tel,
          '- Serviço de interesse: ' + assunto
        ];
        if (msg) lines.push('- Mensagem: ' + msg);

        window.open(WHATS + '?text=' + encodeURIComponent(lines.join('\n')), '_blank');
      });

      ['nome', 'email', 'telefone', 'assunto', 'mensagem'].forEach(function (name, i) {
        var evt = name === 'assunto' ? 'change' : 'input';
        form[name].addEventListener(evt, function () { setErr(fields[i], ''); });
      });
    }

    /* ---------- WhatsApp Premium Experience ---------- */
    var bubble = document.getElementById('wa-message-bubble');
    var typing = document.getElementById('wa-typing');
    var realMessage = document.getElementById('wa-real-message');
    var badge = document.getElementById('wa-notification');
    var closeBtn = document.getElementById('wa-close-btn');
    var mainBtn = document.getElementById('wa-main-btn');

    if (bubble && typing && realMessage && badge && closeBtn && mainBtn) {
      // 1. Mostrar o balão após 6 segundos
      setTimeout(function () {
        bubble.classList.add('show');
        
        // 2. Simular digitação por 2.5 segundos antes de mostrar a mensagem
        setTimeout(function () {
          typing.style.display = 'none';
          realMessage.style.display = 'block';
        }, 2500);

      }, 6000);

      // Fechar balão
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        bubble.classList.remove('show');
        // Mostrar notificação após fechar para manter engajamento
        setTimeout(function () {
          badge.classList.add('show');
        }, 2000);
      });

      // Ao clicar no botão, remove tudo
      mainBtn.addEventListener('click', function () {
        bubble.classList.remove('show');
        badge.classList.remove('show');
      });
    }

    /* ============================================================
       VÍDEOS INSTITUCIONAIS — Carrossel Coverflow
       ativo ao centro + 2 de fundo · play inline · Som · Expandir
       ============================================================ */
    (function () {
      var stage = document.getElementById('vi-track');
      if (!stage) return;

      var dotsEl   = document.getElementById('vi-dots');
      var prevBtn  = document.getElementById('vi-prev');
      var nextBtn  = document.getElementById('vi-next');
      var modal    = document.getElementById('vi-modal');
      var mVideo   = document.getElementById('vi-modal-video');
      var mTitle   = document.getElementById('vi-modal-title');
      var mTag     = document.getElementById('vi-modal-tag');
      var mClose   = document.getElementById('vi-modal-close');
      var mOverlay = document.getElementById('vi-modal-overlay');

      var cards = Array.prototype.slice.call(stage.querySelectorAll('.vi-card'));
      var n = cards.length;
      if (!n) return;
      var active = 0;

      /* ---- Dots ---- */
      if (dotsEl) {
        cards.forEach(function (_, i) {
          var b = document.createElement('button');
          b.setAttribute('role', 'tab');
          b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
          b.setAttribute('aria-label', 'Ir para vídeo ' + (i + 1));
          b.addEventListener('click', function () { go(i); });
          dotsEl.appendChild(b);
        });
      }

      /* ---- Zera o card (pausa, muta, tira reprodução ativa) ---- */
      function resetCard(card) {
        var v = card.querySelector('video');
        if (v) { v.pause(); v.muted = true; try { v.currentTime = 0; } catch (e) {} }
        card.classList.remove('is-playing', 'is-muted');
        var txt = card.querySelector('.vi-card__ctrl-txt');
        if (txt) txt.textContent = 'Som ativo';
      }

      /* ---- Renderiza posições (ativo / laterais / ocultos) ---- */
      function render() {
        cards.forEach(function (card, i) {
          var rel = ((i - active) % n + n) % n; /* 0..n-1 */
          card.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');
          if (rel === 0)        card.classList.add('is-active');
          else if (rel === 1)   card.classList.add('is-next');
          else if (rel === n-1) card.classList.add('is-prev');
          else                  card.classList.add('is-hidden');
        });
        if (dotsEl) {
          Array.prototype.forEach.call(dotsEl.children, function (d, i) {
            d.classList.toggle('is-active', i === active);
            d.setAttribute('aria-selected', i === active ? 'true' : 'false');
          });
        }
        /* pausa todos os não-ativos; toca preview mudo no ativo */
        cards.forEach(function (card, i) { if (i !== active) resetCard(card); });
        var cur = cards[active];
        if (!cur.classList.contains('is-playing')) {
          var v = cur.querySelector('video');
          if (v) { v.muted = true; v.play().catch(function () {}); }
        }
      }

      function go(i) { active = ((i % n) + n) % n; render(); }
      function prev() { go(active - 1); }
      function next() { go(active + 1); }

      if (prevBtn) prevBtn.addEventListener('click', prev);
      if (nextBtn) nextBtn.addEventListener('click', next);

      /* ---- Comportamento por card ---- */
      cards.forEach(function (card, index) {
        var video    = card.querySelector('video');
        var playBtn  = card.querySelector('.vi-card__play');
        var soundBtn = card.querySelector('.vi-card__sound');
        var soundTxt = card.querySelector('.vi-card__ctrl-txt');
        var expandBtn= card.querySelector('.vi-card__expand');
        if (!video) return;

        /* clicar num card de fundo → traz ao centro */
        card.addEventListener('click', function () {
          if (!card.classList.contains('is-active')) go(index);
        });

        /* Play → roda no card COM som + mostra a barra */
        function startPlay() {
          card.classList.add('is-playing');
          card.classList.remove('is-muted');
          video.muted = false;
          if (soundTxt) soundTxt.textContent = 'Som ativo';
          video.play().catch(function () {
            /* se o navegador bloquear o áudio, cai para mudo */
            video.muted = true;
            card.classList.add('is-muted');
            if (soundTxt) soundTxt.textContent = 'Sem som';
            video.play().catch(function () {});
          });
        }
        if (playBtn) playBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          startPlay();
        });

        /* clicar no vídeo em reprodução → pausar / continuar */
        video.addEventListener('click', function (e) {
          if (!card.classList.contains('is-active')) return;
          if (!card.classList.contains('is-playing')) return;
          e.stopPropagation();
          if (video.paused) video.play().catch(function () {});
          else video.pause();
        });

        /* Som on/off */
        if (soundBtn) soundBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          video.muted = !video.muted;
          card.classList.toggle('is-muted', video.muted);
          if (soundTxt) soundTxt.textContent = video.muted ? 'Sem som' : 'Som ativo';
        });

        /* Expandir → modal */
        if (expandBtn) expandBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          openModal(card, video);
        });
      });

      /* ---- Modal (Expandir) ---- */
      function openModal(card, video) {
        if (!modal || !mVideo) return;
        video.pause();
        mVideo.src = video.currentSrc || video.src;
        if (mTitle) mTitle.textContent = card.getAttribute('data-title') || '';
        if (mTag)   mTag.textContent   = card.getAttribute('data-tag') || '';
        modal.classList.add('is-open');
        document.body.classList.add('no-scroll');
        mVideo.currentTime = 0;
        mVideo.muted = false;
        mVideo.play().catch(function () {});
      }
      function closeModal() {
        if (!modal) return;
        modal.classList.remove('is-open');
        if (mVideo) { mVideo.pause(); mVideo.src = ''; }
        document.body.classList.remove('no-scroll');
      }
      if (mClose)   mClose.addEventListener('click', closeModal);
      if (mOverlay) mOverlay.addEventListener('click', closeModal);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
      });

      /* ---- Só reproduz enquanto a seção estiver visível ---- */
      var section = document.getElementById('videos-institucionais');
      if (section && 'IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          var en = entries[0];
          if (!en) return;
          if (en.isIntersecting) {
            /* voltou à seção: retoma o preview mudo do card ativo */
            var cur = cards[active];
            if (cur && !cur.classList.contains('is-playing')) {
              var v = cur.querySelector('video');
              if (v) { v.muted = true; v.play().catch(function () {}); }
            }
          } else {
            /* saiu da seção: para tudo e reinicia do zero */
            cards.forEach(function (card) { resetCard(card); });
          }
        }, { threshold: 0.25 });
        io.observe(section);
      }

      render();
    })();

    /* ============================================================
       PAIN — Baralho de casos Antes/Depois (clique troca a carta)
       ============================================================ */
    (function () {
      var stack = document.getElementById('painStack');
      if (!stack) return;
      var dotsEl = document.getElementById('painDots');
      var cards = Array.prototype.slice.call(stack.querySelectorAll('.pain__card'));
      var n = cards.length;
      if (!n) return;
      var topIdx = 0;

      if (dotsEl) {
        cards.forEach(function (_, i) {
          var b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('role', 'tab');
          b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
          b.setAttribute('aria-label', 'Ver caso ' + (i + 1));
          b.addEventListener('click', function (e) { e.stopPropagation(); topIdx = i; render(); });
          dotsEl.appendChild(b);
        });
      }

      function render() {
        cards.forEach(function (card, i) {
          var rel = ((i - topIdx) % n + n) % n; /* 0 = frente, 1 = atrás */
          card.classList.remove('is-front', 'is-back', 'is-hidden');
          if (rel === 0) card.classList.add('is-front');
          else if (rel === 1) card.classList.add('is-back');
          else card.classList.add('is-hidden');
        });
        if (dotsEl) {
          Array.prototype.forEach.call(dotsEl.children, function (d, i) {
            d.classList.toggle('is-active', i === topIdx);
            d.setAttribute('aria-selected', i === topIdx ? 'true' : 'false');
          });
        }
      }
      function next() { topIdx = (topIdx + 1) % n; render(); }
      function prev() { topIdx = (topIdx - 1 + n) % n; render(); }

      stack.addEventListener('click', next);
      stack.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); }
        else if (e.key === 'ArrowRight') { next(); }
        else if (e.key === 'ArrowLeft') { prev(); }
      });

      render();
    })();

  });
})();

