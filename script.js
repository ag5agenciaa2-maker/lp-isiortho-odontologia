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
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add('is-solid');
      else nav.classList.remove('is-solid');
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

    /* ---------- Carrossel de depoimentos ---------- */
    var REVIEWS = [
      { name: 'Fátima Cardoso', initial: 'F', time: 'há 1 ano', stars: 5, text: 'Fiz tratamento na Isiortho e, sem dúvida, fiz a melhor escolha. Profissionais qualificadíssimos e maravilhosos. Realizei meu sonho de colocar um sorriso lindo no meu rosto. Obrigada, Isiortho.' },
      { name: 'Miriam Calassara', initial: 'M', time: 'há 1 ano', stars: 5, text: 'Maravilhosa! Excelentes profissionais, atenciosos e, o mais importante, empenhados em nos devolver segurança e autoestima. Já recomendei e recomendo a várias pessoas.' },
      { name: 'Almir Junior', initial: 'A', time: 'há 1 ano', stars: 5, text: 'Morria de medo de dentista, mas o Dr. Victor Frias tirou esse medo com um tratamento super bom.' },
      { name: 'Gloria Maria', initial: 'G', time: 'há 1 ano', stars: 5, text: 'O melhor atendimento que eu já tive em Itaguaí. Atencioso, eficiente e entregou o trabalho superando minhas expectativas. Trabalho de excelência.' },
      { name: 'Julio Marinho', initial: 'J', time: 'há 1 ano', stars: 5, text: 'Ótima experiência. Excelentíssimos dentistas, tanto o Dr. Igor quanto o Dr. Vitor. Todos muito profissionais. Recomendo muito.' }
    ];
    var carousel = document.getElementById('carousel');
    var dotsWrap = document.getElementById('dots');
    if (carousel && dotsWrap) {
      REVIEWS.forEach(function (r, i) {
        var fig = document.createElement('figure');
        fig.className = 'slide' + (i === 0 ? ' is-active' : '');
        fig.innerHTML =
          '<div class="slide__stars">' + '★'.repeat(r.stars) + '</div>' +
          '<blockquote>“' + r.text + '”</blockquote>' +
          '<figcaption><span class="slide__av">' + r.initial + '</span>' +
          '<div><div class="slide__name">' + r.name + '</div><div class="slide__time">' + r.time + '</div></div></figcaption>';
        carousel.appendChild(fig);

        var dot = document.createElement('button');
        dot.setAttribute('aria-label', 'Depoimento ' + (i + 1));
        if (i === 0) dot.className = 'is-active';
        dot.addEventListener('click', function () { go(i); restart(); });
        dotsWrap.appendChild(dot);
      });

      var slides = carousel.querySelectorAll('.slide');
      var dots = dotsWrap.querySelectorAll('button');
      var cur = 0, timer = null;

      var go = function (n) {
        cur = (n + slides.length) % slides.length;
        slides.forEach(function (s, i) { s.classList.toggle('is-active', i === cur); });
        dots.forEach(function (d, i) { d.classList.toggle('is-active', i === cur); });
      };
      var restart = function () {
        if (timer) clearInterval(timer);
        if (!REDUCED) timer = setInterval(function () { go(cur + 1); }, 6000);
      };

      document.getElementById('prev').addEventListener('click', function () { go(cur - 1); restart(); });
      document.getElementById('next').addEventListener('click', function () { go(cur + 1); restart(); });
      restart();
    }

    /* ---------- FAQ: ícone +/− ---------- */
    document.querySelectorAll('.faq__item').forEach(function (d) {
      d.addEventListener('toggle', function () {
        var ico = d.querySelector('.faq__ico');
        if (ico) ico.textContent = d.open ? '–' : '+';
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

  });
})();
