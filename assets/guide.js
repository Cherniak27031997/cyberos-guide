// підсвітка: пункт списку ↔ рамка на скріншоті
  const setOn = (key, on) => {
    document.querySelectorAll('[data-key="' + key + '"]').forEach((el) => el.classList.toggle('on', on));
  };
  document.querySelectorAll('.hints li, .spot').forEach((el) => {
    const key = el.dataset.key;
    el.addEventListener('mouseenter', () => setOn(key, true));
    el.addEventListener('mouseleave', () => setOn(key, false));
    el.addEventListener('focus', () => setOn(key, true));
    el.addEventListener('blur', () => setOn(key, false));
    if (el.classList.contains('spot')) {
      el.addEventListener('click', () => {
        const li = document.querySelector('.hints li[data-key="' + key + '"]');
        li?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        li?.animate([{ background: 'var(--accent-soft)' }, { background: 'transparent' }], { duration: 900 });
      });
    }
  });

  // перемикач підсвітки на кожному скріншоті
  document.querySelectorAll('.toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const shot = document.getElementById(btn.dataset.toggle);
      const bare = shot.classList.toggle('bare');
      btn.textContent = bare ? 'Показати підсвітку' : 'Прибрати підсвітку';
    });
  });

  // чекліст кроків — пам’ять у браузері читача (може бути недоступна)
  const KEY = 'cyberos-guide-01';
  let done = {};
  try { done = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { done = {}; }
  const paint = () => {
    document.querySelectorAll('.check input').forEach((input) => {
      const n = input.dataset.step;
      input.checked = !!done[n];
      input.closest('.check').classList.toggle('done', !!done[n]);
      document.querySelector('.rail a[data-rail="' + n + '"]')?.classList.toggle('done', !!done[n]);
    });
  };
  document.querySelectorAll('.check input').forEach((input) => {
    input.addEventListener('change', () => {
      done[input.dataset.step] = input.checked;
      try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) { /* приватний режим — просто не запамʼятаємо */ }
      paint();
    });
  });
  paint();
