// Sidebar groepen -> thema's -> fotos

document.addEventListener('DOMContentLoaded', () => {

  // Photo sets organized by theme keys
  const photoSets = {
    nature_forest: ['https://picsum.photos/400/250?random=101','https://picsum.photos/400/250?random=102','https://picsum.photos/400/250?random=103'],
    nature_water: ['https://picsum.photos/400/250?random=111','https://picsum.photos/400/250?random=112','https://picsum.photos/400/250?random=113'],
    city_modern: ['https://picsum.photos/400/250?random=121','https://picsum.photos/400/250?random=122','https://picsum.photos/400/250?random=123'],
    city_old: ['https://picsum.photos/400/250?random=131','https://picsum.photos/400/250?random=132','https://picsum.photos/400/250?random=133'],
    sport_ball: ['https://picsum.photos/400/250?random=141','https://picsum.photos/400/250?random=142','https://picsum.photos/400/250?random=143'],
    reizen_beach: ['https://picsum.photos/400/250?random=151','https://picsum.photos/400/250?random=152','https://picsum.photos/400/250?random=153'],
    muziek_live: ['https://picsum.photos/400/250?random=161','https://picsum.photos/400/250?random=162','https://picsum.photos/400/250?random=163'],
    design_graphic: ['https://picsum.photos/400/250?random=171','https://picsum.photos/400/250?random=172','https://picsum.photos/400/250?random=173']
  };

  // Groups now contain multiple themes
  const yourGroups = [
    { name: 'Nature', id: 'nature', likes: 5, themes: [ { id: 'nature_forest', name: 'Forest' }, { id: 'nature_water', name: 'Water' } ] },
    { name: 'City', id: 'city', likes: 5, themes: [ { id: 'city_modern', name: 'Modern' }, { id: 'city_old', name: 'Old city' } ] },
    { name: 'Sport', id: 'sport', likes: 5, themes: [ { id: 'sport_ball', name: 'Ball sports' } ] },
    { name: 'Reizen', id: 'reizen', likes: 5, themes: [ { id: 'reizen_beach', name: 'Beach' } ] }
  ];

  const publicGroups = [
    { name: 'Muziek', id: 'muziek', likes: 2, themes: [ { id: 'muziek_live', name: 'Live' }, { id: 'muziek_studio', name: 'Studio' } ] },
    { name: 'Design', id: 'design', likes: 2, themes: [ { id: 'design_graphic', name: 'Graphic' } ] }
  ];

  // Helper to create a sidebar button (shared style)
  function createSidebarBtn({ img, title, subtitle, dataAttrs = {} }){
    const btn = document.createElement('a');
    btn.className = 'sidebar-btn';
    btn.innerHTML = `
      <img src="${img}" alt="">
      <div>
        <p>${title}</p>
        <small>${subtitle || ''}</small>
      </div>
    `;
    Object.keys(dataAttrs).forEach(k => btn.dataset[k] = dataAttrs[k]);
    return btn;
  }

  // Render groups
  function renderGroups(groups, containerId){
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = '';
    groups.forEach(g => {
      const firstTheme = g.themes && g.themes[0];
      const thumb = firstTheme && photoSets[firstTheme.id] ? photoSets[firstTheme.id][0] : 'image.png';
      const btn = createSidebarBtn({ img: thumb, title: g.name, subtitle: `+${g.likes} Likes`, dataAttrs: { groupId: g.id } });
      container.appendChild(btn);
    });
  }

  // Render themes voor de geselecteerde groep
  function renderThemesForGroup(group){
    const themesPanel = document.getElementById('themesPanel');
    if(!themesPanel) return;
    themesPanel.innerHTML = '';

    if(!group || !group.themes || group.themes.length === 0){
      themesPanel.style.display = 'none';
      return;
    }
    themesPanel.style.display = 'block';
    group.themes.forEach(t => {
      const thumb = photoSets[t.id] ? photoSets[t.id][0] : 'image.png';
      const btn = createSidebarBtn({ img: thumb, title: t.name, subtitle: '', dataAttrs: { themeId: t.id } });
      themesPanel.appendChild(btn);
    });
    themesPanel.querySelectorAll('.sidebar-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const themeId = btn.dataset.themeId;
        showPhotosForTheme(themeId);
      });
    });
  }

  // laat foto's zien voor de geselecteerde thema's
  function showPhotosForTheme(themeId){
    const container = document.getElementById('gallery');
    if(!container) return;
    container.innerHTML = '';
    const titleArticle = document.createElement('article');
    titleArticle.className = 'gallery-title';
    const prettyTitle = themeId ? themeId.replace('_',' ').replace(/\b\w/g, l=>l.toUpperCase()) : 'Gallery';
    titleArticle.innerHTML = `<h2>${prettyTitle}</h2>`;
    container.appendChild(titleArticle);
    const photos = photoSets[themeId] || [];
    photos.forEach(url => {

      const card = document.createElement('article');
      card.className = 'gallery-card';
      card.innerHTML = `
        <img src="${url}" alt="${prettyTitle} photo" class="gallery-photo">
        <div class="likes">+2 Likes</div>
      `;
      container.appendChild(card);
    });
  }

  renderGroups(yourGroups, 'yourGroups');
  renderGroups(publicGroups, 'publicGroups');

  function wireGroupClicks(){
    document.querySelectorAll('#yourGroups .sidebar-btn, #publicGroups .sidebar-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const groupId = btn.dataset.groupId;
        const group = yourGroups.concat(publicGroups).find(g => g.id === groupId);
        renderThemesForGroup(group);
      });
    });
  }

  wireGroupClicks();

  // Keep existing tab open/close behaviour (groups/public)
  const yourGroupsEl = document.getElementById('yourGroups');
  const publicGroupsEl = document.getElementById('publicGroups');
  const themesPanel = document.getElementById('themesPanel');
  const showGroupsBtn = document.getElementById('showGroupsBtn');
  const showPublicGroupsBtn = document.getElementById('showPublicGroupsBtn');
  const groupsArrow = document.getElementById('groupsArrow');
  const publicGroupsArrow = document.getElementById('publicGroupsArrow');

  let yourGroupsOpen = false;
  let publicGroupsOpen = false;

  function closeAllTabs() {
    if (yourGroupsEl) yourGroupsEl.style.display = 'none';
    if (groupsArrow) groupsArrow.style.transform = 'rotate(0deg)';
    if (publicGroupsEl) publicGroupsEl.style.display = 'none';
    if (publicGroupsArrow) publicGroupsArrow.style.transform = 'rotate(0deg)';
    if (themesPanel) themesPanel.style.display = 'none';
    yourGroupsOpen = false;
    publicGroupsOpen = false;
  }

  if (showGroupsBtn) {
    showGroupsBtn.addEventListener('click', () => {
      if (!yourGroupsOpen) {
        closeAllTabs();
        yourGroupsEl.style.display = 'block';
        groupsArrow.style.transform = 'rotate(180deg)';
        yourGroupsOpen = true;
      } else {
        closeAllTabs();
      }
    });
  }

  if (showPublicGroupsBtn) {
    showPublicGroupsBtn.addEventListener('click', () => {
      if (!publicGroupsOpen) {
        closeAllTabs();
        publicGroupsEl.style.display = 'block';
        publicGroupsArrow.style.transform = 'rotate(180deg)';
        publicGroupsOpen = true;
      } else {
        closeAllTabs();
      }
    });
  }

});

// Profiel menu & Inloggen/Registreren popup (keep existing behaviour)
const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");
const popup = document.getElementById("popup");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

if (profileBtn) {
  profileBtn.addEventListener("click", () => {
    profileMenu.style.display = profileMenu.style.display === "flex" ? "none" : "flex";
  });
}

function openPopup() {
  if(popup) popup.style.display = "flex";
  if(profileMenu) profileMenu.style.display = "none";
}

function closePopup() {
  if(popup) popup.style.display = "none";
}

function switchTab(type) {
  const isLogin = type === "login";
  if(loginTab) loginTab.classList.toggle("active", isLogin);
  if(signupTab) signupTab.classList.toggle("active", !isLogin);
  if(loginForm) loginForm.classList.toggle("active", isLogin);
  if(signupForm) signupForm.classList.toggle("active", !isLogin);
}
