// PH House Reno Melbourne — Interactive Main JS
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navDrawer = document.querySelector('.mobile-nav-drawer');

  if (menuToggle && navDrawer) {
    menuToggle.addEventListener('click', () => {
      const isActive = navDrawer.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive);
      menuToggle.innerHTML = isActive 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    navDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navDrawer.classList.remove('active');
        menuToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      });
    });
  }

  // Interactive Renovation Scope Estimator
  const projectTypeSelect = document.getElementById('calcProjectType');
  const projectSizeSelect = document.getElementById('calcProjectSize');
  const localitySelect = document.getElementById('calcLocality');
  const materialVal = document.getElementById('calcMaterial');
  const timeframeVal = document.getElementById('calcTimeframe');
  const approvalVal = document.getElementById('calcApproval');
  const waButton = document.getElementById('calcWaBtn');

  function updateEstimate() {
    if (!projectTypeSelect || !projectSizeSelect || !localitySelect) return;

    const type = projectTypeSelect.value;
    const size = projectSizeSelect.value;
    const locality = localitySelect.value;

    let material = 'Premium Motorized Aluminium Louvre';
    let timeframe = '2 - 3 Weeks';
    let approval = 'Exempt / Fast-track Permit';

    if (type === 'pergola') {
      material = 'Motorized Powdercoated Aluminium';
      timeframe = size === 'small' ? '1 - 2 Weeks' : (size === 'medium' ? '2 - 3 Weeks' : '3 - 4 Weeks');
      approval = 'Standard Council Exemption Check';
    } else if (type === 'decking') {
      material = 'Australian Hardwood (Merbau / Spotted Gum)';
      timeframe = size === 'small' ? '1 - 2 Weeks' : '2 - 3 Weeks';
      approval = 'Building Permit Included';
    } else if (type === 'kitchen') {
      material = 'Engineered Stone & 2-Pack Custom Joinery';
      timeframe = '3 - 5 Weeks';
      approval = 'Internal Renovation (No Permit Needed)';
    } else if (type === 'bathroom') {
      material = 'Frameless Glass, Italian Porcelain & Black Tapware';
      timeframe = '2 - 3 Weeks';
      approval = 'Waterproofing Certificate Included';
    }

    if (materialVal) materialVal.textContent = material;
    if (timeframeVal) timeframeVal.textContent = timeframe;
    if (approvalVal) approvalVal.textContent = approval;

    if (waButton) {
      const msg = `Hi PH House Reno team! I used your Melbourne renovation calculator:%0A- Project: ${projectTypeSelect.options[projectTypeSelect.selectedIndex].text}%0A- Scope Size: ${projectSizeSelect.options[projectSizeSelect.selectedIndex].text}%0A- Suburb: ${localitySelect.options[localitySelect.selectedIndex].text}%0A- Estimated Spec: ${material} (${timeframe})%0ACould I book a free on-site measure and quote?`;
      waButton.href = `https://wa.me/61402568998?text=${msg}`;
    }
  }

  [projectTypeSelect, projectSizeSelect, localitySelect].forEach(select => {
    if (select) select.addEventListener('change', updateEstimate);
  });
  updateEstimate();

  // Sticky Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Smooth Scroll Reveals
  const revealElements = document.querySelectorAll('.card, .hero-stat-card, .review-card, .calc-card-container');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
});
