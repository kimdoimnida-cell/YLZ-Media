/* ============================================
   YLZ MEDIA — Contact Page JavaScript
============================================ */

(function () {
  'use strict';

  /* ── Custom Cursor ── */
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    const hoverTargets = document.querySelectorAll('a, button, label, .service-select-card');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ── Nav scroll ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach((el) => revealObserver.observe(el));

  // 페이지 로드 시 헤더 즉시 노출
  window.addEventListener('load', () => {
    document.querySelectorAll('.cp-header .reveal-up').forEach((el, i) => {
      const delay = parseFloat(el.dataset.delay || i * 0.1) * 1000;
      setTimeout(() => el.classList.add('is-visible'), delay + 100);
    });
  });

  /* ── stagger delay ── */
  document.querySelectorAll('[data-delay]').forEach((el) => {
    el.style.transitionDelay = el.dataset.delay + 's';
  });

  /* ── 예산 버튼 ── */
  const budgetBtns  = document.querySelectorAll('.budget-btn');
  const budgetInput = document.getElementById('budget');
  budgetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      budgetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (budgetInput) budgetInput.value = btn.dataset.value;
    });
  });

  /* ── 유입경로 버튼 ── */
  const sourceBtns  = document.querySelectorAll('.source-btn');
  const sourceInput = document.getElementById('source');
  sourceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sourceBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (sourceInput) sourceInput.value = btn.dataset.value;
    });
  });

  /* ── 미팅 여부 버튼 ── */
  const meetingBtns  = document.querySelectorAll('.meeting-btn');
  const meetingInput = document.getElementById('meeting');
  meetingBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      meetingBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (meetingInput) meetingInput.value = btn.dataset.value;
    });
  });

  /* ── 폼 제출 (Removed - Redirect to Tally) ── */

})();
