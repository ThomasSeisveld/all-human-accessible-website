// Sidebar categorie-foto wissel

document.addEventListener('DOMContentLoaded', () => {

  // fotosets // Liken is nog niet functioneel
  const photoSets = {
    nature: ['https://picsum.photos/400/250?random=11', 'https://picsum.photos/400/250?random=12', 'https://picsum.photos/400/250?random=13', 'https://picsum.photos/400/250?random=11', 'https://picsum.photos/400/250?random=12', 'https://picsum.photos/400/250?random=13'],
    city: ['https://picsum.photos/400/250?random=21', 'https://picsum.photos/400/250?random=22', 'https://picsum.photos/400/250?random=23', 'https://picsum.photos/400/250?random=21', 'https://picsum.photos/400/250?random=22', 'https://picsum.photos/400/250?random=23'],
    sport: ['https://picsum.photos/400/250?random=31', 'https://picsum.photos/400/250?random=32', 'https://picsum.photos/400/250?random=33', 'https://picsum.photos/400/250?random=31', 'https://picsum.photos/400/250?random=32', 'https://picsum.photos/400/250?random=33'],
    reizen: ['https://picsum.photos/400/250?random=41', 'https://picsum.photos/400/250?random=42', 'https://picsum.photos/400/250?random=43', 'https://picsum.photos/400/250?random=41', 'https://picsum.photos/400/250?random=42', 'https://picsum.photos/400/250?random=43'],
    muziek: ['https://picsum.photos/400/250?random=51', 'https://picsum.photos/400/250?random=52', 'https://picsum.photos/400/250?random=53', 'https://picsum.photos/400/250?random=51', 'https://picsum.photos/400/250?random=52', 'https://picsum.photos/400/250?random=53'],
    design: ['https://picsum.photos/400/250?random=61', 'https://picsum.photos/400/250?random=62', 'https://picsum.photos/400/250?random=63', 'https://picsum.photos/400/250?random=61', 'https://picsum.photos/400/250?random=62', 'https://picsum.photos/400/250?random=63']
  };

  // Groepen
  const yourGroups = [
    { name: 'Nature', category: 'nature', likes: 5 },
    { name: 'City', category: 'city', likes: 5 },
    { name: 'Sport', category: 'sport', likes: 5 },
    { name: 'Reizen', category: 'reizen', likes: 5 }
  ];
  const publicGroups = [
    { name: 'Muziek', category: 'muziek', likes: 2 },
    { name: 'Design', category: 'design', likes: 2 }
  ];

  // Sidebar Buttons genereren
  function generateSidebarButtons(groups, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    groups.forEach(group => {
      const btn = document.createElement('a');
      btn.className = 'sidebar-btn';
      btn.dataset.category = group.category;
      btn.innerHTML = `
        <img src="${photoSets[group.category][0]}" alt="">
        <div>
          <p>${group.name}</p>
          <small>+${group.likes} Likes</small>
        </div>
      `;
      container.appendChild(btn);
    });
  }

  generateSidebarButtons(yourGroups, 'yourGroups');
  generateSidebarButtons(publicGroups, 'publicGroups');

  //  Tabs Open/Sluit
 
  const yourGroupsEl = document.getElementById('yourGroups');
  const publicGroupsEl = document.getElementById('publicGroups');
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
  // foto's tonen
  function showPhotos(category) {
    const container = document.getElementById('gallery');
    if (!container || !photoSets[category]) return;

    container.innerHTML = '';

    // Titel
    const titleArticle = document.createElement('article');
    titleArticle.className = 'gallery-title';
    titleArticle.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
    container.appendChild(titleArticle);

    // Foto’s
    photoSets[category].forEach(url => {
      const card = document.createElement('article');
      card.className = 'gallery-card';
      card.innerHTML = `
        <img src="${url}" alt="${category} photo" class="gallery-photo">
        <div class="likes">+2 Likes</div>
      `;
      container.appendChild(card);
    });
  }


  function updateSidebarBtnEvents() {
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        showPhotos(btn.dataset.category);
      });
    });
  }

  updateSidebarBtnEvents();
});
// Profiel menu & Inloggen/Registreren popup
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
  popup.style.display = "flex";
  profileMenu.style.display = "none";
}

function closePopup() {
  popup.style.display = "none";
}

function switchTab(type) {
  const isLogin = type === "login";
  loginTab.classList.toggle("active", isLogin);
  signupTab.classList.toggle("active", !isLogin);
  loginForm.classList.toggle("active", isLogin);
  signupForm.classList.toggle("active", !isLogin);
}
