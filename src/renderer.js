// --- DOM refs ---
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const serverInput = document.getElementById('server-input');
const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginError = document.getElementById('login-error');

const registerScreen = document.getElementById('register-screen');
const registerUsernameInput = document.getElementById('register-username-input');
const registerPasswordInput = document.getElementById('register-password-input');
const registerConfirmInput = document.getElementById('register-confirm-input');
const registerSubmitBtn = document.getElementById('register-submit-btn');
const registerError = document.getElementById('register-error');
const backToLoginLink = document.getElementById('back-to-login-link');

const dmHomeBtn = document.getElementById('dm-home-btn');
const dmPanelEl = document.getElementById('dm-panel');
const dmListEl = document.getElementById('dm-list');
const guildChannelPanel = document.getElementById('guild-channel-panel');
const memberSidebarEl = document.querySelector('.member-sidebar');

const guildList = document.getElementById('guild-list');
const addGuildBtn = document.getElementById('add-guild-btn');
const addGuildModal = document.getElementById('add-guild-modal');
const addGuildCloseBtn = document.getElementById('add-guild-close-btn');
const chooseCreateGuildBtn = document.getElementById('choose-create-guild-btn');
const chooseJoinGuildBtn = document.getElementById('choose-join-guild-btn');
const guildHeader = document.getElementById('guild-header');
const guildHeaderName = document.getElementById('guild-header-name');
const addChannelBtn = document.getElementById('add-channel-btn');
const channelList = document.getElementById('channel-list');
const createChannelForm = document.getElementById('create-channel-form');
const channelNameInput = document.getElementById('channel-name-input');
const channelTypeInput = document.getElementById('channel-type-input');
const channelFormStatus = document.getElementById('channel-form-status');
const createGuildModal = document.getElementById('create-guild-modal');
const createGuildCloseBtn = document.getElementById('create-guild-close-btn');
const createGuildBackBtn = document.getElementById('create-guild-back-btn');
const createGuildForm = document.getElementById('create-guild-form');
const createGuildInput = document.getElementById('create-guild-input');
const createGuildStatus = document.getElementById('create-guild-status');
const createGuildIconTrigger = document.getElementById('create-guild-icon-trigger');
const createGuildIconInput = document.getElementById('create-guild-icon-input');
const createGuildIconPreview = document.getElementById('create-guild-icon-preview');
const joinGuildModal = document.getElementById('join-guild-modal');
const joinGuildCloseBtn = document.getElementById('join-guild-close-btn');
const joinGuildBackBtn = document.getElementById('join-guild-back-btn');
const joinGuildForm = document.getElementById('join-guild-form');
const joinGuildInput = document.getElementById('join-guild-input');
const joinGuildStatus = document.getElementById('join-guild-status');
const logoutBtn = document.getElementById('logout-btn');
const userFooterAvatar = document.getElementById('user-footer-avatar');
const userFooterName = document.getElementById('user-footer-name');
const userFooterStatus = document.getElementById('user-footer-status');
const micBtn = document.getElementById('mic-btn');
const deafenBtn = document.getElementById('deafen-btn');
const voiceStatusBar = document.getElementById('voice-status-bar');
const voiceStatusText = document.querySelector('.voice-status-text');
const voiceStatusChannel = document.getElementById('voice-status-channel');
const voiceDisconnectBtn = document.getElementById('voice-disconnect-btn');
const cameraToggleBtn = document.getElementById('camera-toggle-btn');
const screenShareBtn = document.getElementById('screen-share-btn');
const videoStage = document.getElementById('video-stage');
const videoTiles = document.getElementById('video-tiles');
const screenShareModal = document.getElementById('screen-share-modal');
const screenShareCloseBtn = document.getElementById('screen-share-close-btn');
const screenShareSources = document.getElementById('screen-share-sources');

const channelTitle = document.getElementById('channel-title');
const messagesWrapEl = document.querySelector('.messages-wrap');
const messagesEl = document.getElementById('messages');
const messagesEmpty = document.getElementById('messages-empty');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const userListEl = document.getElementById('user-list');

const profilePopover = document.getElementById('profile-popover');
const profilePopoverBanner = document.getElementById('profile-popover-banner');
const profilePopoverAvatar = document.getElementById('profile-popover-avatar');
const profilePopoverDisplayName = document.getElementById('profile-popover-display-name');
const profilePopoverUsername = document.getElementById('profile-popover-username');
const profilePopoverStatus = document.getElementById('profile-popover-status');
const profilePopoverDivider = document.getElementById('profile-popover-divider');
const profilePopoverBio = document.getElementById('profile-popover-bio');

const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const settingsCloseBtn = document.getElementById('settings-close-btn');
const themeSelect = document.getElementById('theme-select');
const customCssInput = document.getElementById('custom-css-input');
const applyCustomCssBtn = document.getElementById('apply-custom-css-btn');
const customCssStyle = document.getElementById('custom-css-style');

const avatarPreview = document.getElementById('avatar-preview');
const avatarInput = document.getElementById('avatar-input');
const displayNameInput = document.getElementById('display-name-input');
const statusTextInput = document.getElementById('status-text-input');
const bioInput = document.getElementById('bio-input');
const saveProfileBtn = document.getElementById('save-profile-btn');
const profileStatus = document.getElementById('profile-status');

const guildSettingsModal = document.getElementById('guild-settings-modal');
const guildSettingsCloseBtn = document.getElementById('guild-settings-close-btn');
const guildSettingsTitle = document.getElementById('guild-settings-title');
const guildSettingsId = document.getElementById('guild-settings-id');
const guildIconPreview = document.getElementById('guild-icon-preview');
const guildIconInput = document.getElementById('guild-icon-input');
const guildBannerPreview = document.getElementById('guild-banner-preview');
const guildBannerInput = document.getElementById('guild-banner-input');
const guildEmojiList = document.getElementById('guild-emoji-list');
const addEmojiForm = document.getElementById('add-emoji-form');
const emojiNameInput = document.getElementById('emoji-name-input');
const emojiFileInput = document.getElementById('emoji-file-input');
const guildSettingsStatus = document.getElementById('guild-settings-status');

const guildRolesList = document.getElementById('guild-roles-list');
const createRoleBtn = document.getElementById('create-role-btn');
const roleEditor = document.getElementById('role-editor');
const roleNameInput = document.getElementById('role-name-input');
const roleColorInput = document.getElementById('role-color-input');
const rolePermissionsList = document.getElementById('role-permissions-list');
const roleSaveBtn = document.getElementById('role-save-btn');
const roleCancelBtn = document.getElementById('role-cancel-btn');
const guildRolesStatus = document.getElementById('guild-roles-status');
const guildMembersList = document.getElementById('guild-members-list');
const guildMembersStatus = document.getElementById('guild-members-status');

const botsList = document.getElementById('bots-list');
const createBotForm = document.getElementById('create-bot-form');
const botUsernameInput = document.getElementById('bot-username-input');
const botTokenReveal = document.getElementById('bot-token-reveal');
const botsStatus = document.getElementById('bots-status');

// --- State ---
let ws = null;
let serverUrl = localStorage.getItem('wyre:serverUrl') || serverInput.value;
let currentUser = null;
let guilds = [];
let selectedGuildId = null;
let selectedChannelId = null;
const guildEmojiRaw = new Map(); // guildId -> [{id,name,imageUrl}]
const emojiMapByGuild = new Map(); // guildId -> Map(name -> imageUrl)
let voiceChannelId = null;
let voiceChannelPeers = []; // usuarios (sem contar eu) conectados no canal de voz atual

let dmMode = false;
let selectedDmPeerId = null;
let dmContacts = []; // [{id, username, displayName, avatarUrl, isBot, online}]
let dmHistoryLoadToken = 0;

serverInput.value = serverUrl;

// --- Tema e CSS customizado (aplicados imediatamente, antes de qualquer tela aparecer) ---
const THEME_KEY = 'wyre:theme';
const CUSTOM_CSS_KEY = 'wyre:customCss';

function sanitizeCustomCss(css) {
  return css.replace(/@import[^;]*;?/gi, '').slice(0, 50000);
}

const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
document.documentElement.dataset.theme = savedTheme;
themeSelect.value = savedTheme;

const savedCustomCss = localStorage.getItem(CUSTOM_CSS_KEY) || '';
customCssStyle.textContent = savedCustomCss;
customCssInput.value = savedCustomCss;

settingsBtn.addEventListener('click', () => {
  populateProfileForm();
  settingsModal.classList.remove('hidden');
});
settingsCloseBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
settingsModal.addEventListener('click', (event) => {
  if (event.target === settingsModal) {
    settingsModal.classList.add('hidden');
    return;
  }
  const tabBtn = event.target.closest('.modal-tab');
  if (!tabBtn) return;
  settingsModal.querySelectorAll('.modal-tab').forEach((t) => t.classList.remove('active'));
  tabBtn.classList.add('active');
  settingsModal.querySelectorAll('.modal-panel').forEach((p) => p.classList.add('hidden'));
  document.getElementById(`tab-${tabBtn.dataset.tab}`).classList.remove('hidden');
  document.getElementById('settings-panel-title').textContent = tabBtn.dataset.tabLabel;
  if (tabBtn.dataset.tab === 'bots') loadBots();
});

guildHeader.addEventListener('click', () => {
  if (!selectedGuildId) return;
  const guild = findGuild(selectedGuildId);
  guildSettingsTitle.textContent = guild ? guild.name : 'Configuracoes do servidor';
  populateGuildSettingsTab();
  guildSettingsModal.classList.remove('hidden');
});
guildSettingsCloseBtn.addEventListener('click', () => guildSettingsModal.classList.add('hidden'));
guildSettingsModal.addEventListener('click', (event) => {
  if (event.target === guildSettingsModal) {
    guildSettingsModal.classList.add('hidden');
    return;
  }
  const tabBtn = event.target.closest('.modal-tab');
  if (!tabBtn) return;
  guildSettingsModal.querySelectorAll('.modal-tab').forEach((t) => t.classList.remove('active'));
  tabBtn.classList.add('active');
  guildSettingsModal.querySelectorAll('.modal-panel').forEach((p) => p.classList.add('hidden'));
  document.getElementById(`guild-tab-${tabBtn.dataset.guildTab}`).classList.remove('hidden');
});

addGuildBtn.addEventListener('click', () => {
  addGuildModal.classList.remove('hidden');
});
addGuildCloseBtn.addEventListener('click', () => addGuildModal.classList.add('hidden'));
addGuildModal.addEventListener('click', (event) => {
  if (event.target === addGuildModal) addGuildModal.classList.add('hidden');
});

chooseCreateGuildBtn.addEventListener('click', () => {
  addGuildModal.classList.add('hidden');
  createGuildStatus.textContent = '';
  createGuildIconInput.value = '';
  createGuildIconPreview.style.backgroundImage = 'none';
  createGuildIconPreview.classList.remove('has-image');
  const ownerName = currentUser ? currentUser.displayName || currentUser.username : '';
  createGuildInput.value = ownerName ? `Servidor de ${ownerName}` : '';
  createGuildModal.classList.remove('hidden');
  createGuildInput.focus();
  createGuildInput.select();
});

createGuildIconTrigger.addEventListener('click', () => createGuildIconInput.click());
createGuildIconInput.addEventListener('change', () => {
  const file = createGuildIconInput.files[0];
  if (!file) return;
  createGuildIconPreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  createGuildIconPreview.classList.add('has-image');
});
createGuildBackBtn.addEventListener('click', () => {
  createGuildModal.classList.add('hidden');
  addGuildModal.classList.remove('hidden');
});
createGuildCloseBtn.addEventListener('click', () => createGuildModal.classList.add('hidden'));
createGuildModal.addEventListener('click', (event) => {
  if (event.target === createGuildModal) createGuildModal.classList.add('hidden');
});

chooseJoinGuildBtn.addEventListener('click', () => {
  addGuildModal.classList.add('hidden');
  joinGuildStatus.textContent = '';
  joinGuildModal.classList.remove('hidden');
  joinGuildInput.focus();
});
joinGuildBackBtn.addEventListener('click', () => {
  joinGuildModal.classList.add('hidden');
  addGuildModal.classList.remove('hidden');
});
joinGuildCloseBtn.addEventListener('click', () => joinGuildModal.classList.add('hidden'));
joinGuildModal.addEventListener('click', (event) => {
  if (event.target === joinGuildModal) joinGuildModal.classList.add('hidden');
});

addChannelBtn.addEventListener('click', () => {
  createChannelForm.classList.toggle('hidden');
  if (!createChannelForm.classList.contains('hidden')) channelNameInput.focus();
});

themeSelect.addEventListener('change', () => {
  document.documentElement.dataset.theme = themeSelect.value;
  localStorage.setItem(THEME_KEY, themeSelect.value);
});

applyCustomCssBtn.addEventListener('click', () => {
  const cleaned = sanitizeCustomCss(customCssInput.value);
  customCssStyle.textContent = cleaned;
  customCssInput.value = cleaned;
  localStorage.setItem(CUSTOM_CSS_KEY, cleaned);
});

// --- Rodape de usuario (avatar + nome, na base da sidebar de canais) ---
function updateUserFooter() {
  if (!currentUser) return;
  const src = avatarSrc(currentUser);
  userFooterAvatar.style.backgroundImage = src ? `url(${src})` : 'none';
  userFooterName.textContent = displayNameOf(currentUser);
  userFooterName.title = `@${currentUser.username}`;
  userFooterStatus.textContent = currentUser.statusText || `@${currentUser.username}`;
}

let micMuted = false;
let deafened = false;

function updateAudioButtons() {
  const micOff = micMuted || deafened;
  micBtn.classList.toggle('active', micOff);
  micBtn.querySelector('.mute-slash').classList.toggle('hidden', !micOff);
  micBtn.title = micOff ? 'Ativar microfone' : 'Mutar microfone';
  deafenBtn.classList.toggle('active', deafened);
  deafenBtn.querySelector('.mute-slash').classList.toggle('hidden', !deafened);
  deafenBtn.title = deafened ? 'Reativar audio' : 'Ensurdecer';
}

micBtn.addEventListener('click', () => {
  deafened = false;
  micMuted = !micMuted;
  Wyre.voice.setMicMuted(micMuted);
  Wyre.voice.setDeafened(deafened);
  updateAudioButtons();
});

deafenBtn.addEventListener('click', () => {
  deafened = !deafened;
  if (deafened) micMuted = true;
  Wyre.voice.setMicMuted(micMuted);
  Wyre.voice.setDeafened(deafened);
  updateAudioButtons();
});

updateAudioButtons();

// --- Perfil de usuario ---
function populateProfileForm() {
  if (!currentUser) return;
  const src = avatarSrc(currentUser);
  avatarPreview.style.backgroundImage = src ? `url(${src})` : 'none';
  displayNameInput.value = currentUser.displayName || '';
  statusTextInput.value = currentUser.statusText || '';
  bioInput.value = currentUser.bio || '';
  profileStatus.textContent = '';
}

function notifyProfileChanged() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'profile:refresh' }));
  }
}

avatarInput.addEventListener('change', async () => {
  const file = avatarInput.files[0];
  if (!file) return;

  avatarPreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  profileStatus.textContent = 'Enviando avatar...';
  try {
    const token = await window.api.auth.getToken();
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await fetch(`${serverUrl}/api/users/me/avatar`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Erro ${res.status}`);

    currentUser.avatarUrl = data.avatarUrl;
    avatarPreview.style.backgroundImage = `url(${serverUrl}${data.avatarUrl})`;
    updateUserFooter();
    profileStatus.textContent = 'Avatar atualizado.';
    notifyProfileChanged();
  } catch (err) {
    profileStatus.textContent = err.message;
  }
});

saveProfileBtn.addEventListener('click', async () => {
  const token = await window.api.auth.getToken();
  profileStatus.textContent = 'Salvando...';
  try {
    const data = await apiRequest('/api/users/me', {
      method: 'PATCH',
      body: { displayName: displayNameInput.value, statusText: statusTextInput.value, bio: bioInput.value },
      token,
    });
    currentUser = { ...currentUser, ...data.user };
    updateUserFooter();
    profileStatus.textContent = 'Perfil salvo.';
    notifyProfileChanged();
  } catch (err) {
    profileStatus.textContent = err.message;
  }
});

// --- Identidade de servidor (icone, banner, emoji) ---
async function loadGuildEmoji(guildId) {
  const token = await window.api.auth.getToken();
  try {
    const data = await apiRequest(`/api/guilds/${guildId}/emoji`, { token });
    guildEmojiRaw.set(guildId, data.emoji);
    emojiMapByGuild.set(guildId, new Map(data.emoji.map((e) => [e.name, e.imageUrl])));
    if (guildId === selectedGuildId) renderGuildEmojiList();
  } catch {
    // emoji e cosmetico, falha silenciosa nao deve travar a UI
  }
}

function renderGuildEmojiList() {
  const list = guildEmojiRaw.get(selectedGuildId) || [];
  guildEmojiList.innerHTML = '';
  for (const emoji of list) {
    const li = document.createElement('li');
    li.className = 'bot-row';

    const left = document.createElement('span');
    left.className = 'row-left';
    const img = document.createElement('img');
    img.className = 'emoji';
    img.src = `${serverUrl}${emoji.imageUrl}`;
    const label = document.createElement('span');
    label.textContent = `:${emoji.name}:`;
    left.appendChild(img);
    left.appendChild(label);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Remover';
    delBtn.addEventListener('click', () => deleteGuildEmoji(emoji.id));

    li.appendChild(left);
    li.appendChild(delBtn);
    guildEmojiList.appendChild(li);
  }
}

async function deleteGuildEmoji(emojiId) {
  const token = await window.api.auth.getToken();
  try {
    const res = await fetch(`${serverUrl}/api/guilds/${selectedGuildId}/emoji/${emojiId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok && res.status !== 204) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Erro ${res.status}`);
    }
    await loadGuildEmoji(selectedGuildId);
  } catch (err) {
    guildSettingsStatus.textContent = err.message;
  }
}

// --- Cargos e permissoes ---
const PERMISSION_FLAGS = [
  { bit: 1 << 0, label: 'Ver canais' },
  { bit: 1 << 1, label: 'Enviar mensagens' },
  { bit: 1 << 2, label: 'Gerenciar canais' },
  { bit: 1 << 3, label: 'Gerenciar cargos' },
  { bit: 1 << 4, label: 'Expulsar membros' },
  { bit: 1 << 5, label: 'Banir membros' },
  { bit: 1 << 6, label: 'Gerenciar servidor' },
  { bit: 1 << 7, label: 'Conectar (voz)' },
  { bit: 1 << 8, label: 'Falar (voz)' },
];
const PERM = {
  MANAGE_CHANNELS: 1 << 2,
  MANAGE_ROLES: 1 << 3,
  KICK_MEMBERS: 1 << 4,
  BAN_MEMBERS: 1 << 5,
};

let guildRoles = [];
let guildMembers = [];
let editingRoleId = null;

async function loadGuildRoles(guildId) {
  const token = await window.api.auth.getToken();
  try {
    const data = await apiRequest(`/api/guilds/${guildId}/roles`, { token });
    guildRoles = data.roles;
    if (selectedGuildId === guildId) {
      renderGuildRolesList();
      renderGuildMembersList();
    }
  } catch {
    // cargos sao carregados sob demanda; o gate real e sempre no servidor
  }
}

async function loadGuildMembers(guildId) {
  const token = await window.api.auth.getToken();
  try {
    const data = await apiRequest(`/api/guilds/${guildId}/members`, { token });
    guildMembers = data.members;
    if (selectedGuildId === guildId) renderGuildMembersList();
  } catch {
    //
  }
}

function myGuildPermissions() {
  const guild = findGuild(selectedGuildId);
  return guild ? guild.permissions || 0 : 0;
}

function renderGuildRolesList() {
  guildRolesList.innerHTML = '';
  for (const role of guildRoles) {
    const li = document.createElement('li');
    li.className = 'role-row';

    const swatch = document.createElement('span');
    swatch.className = 'role-color-swatch';
    swatch.style.backgroundColor = role.color;
    li.appendChild(swatch);

    const name = document.createElement('span');
    name.className = 'role-name';
    name.textContent = role.name;
    li.appendChild(name);

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => openRoleEditor(role));
    li.appendChild(editBtn);

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.textContent = 'Excluir';
    delBtn.className = 'danger-btn-sm';
    delBtn.addEventListener('click', () => deleteRole(role.id));
    li.appendChild(delBtn);

    guildRolesList.appendChild(li);
  }
}

function renderPermissionCheckboxes(selectedBitfield) {
  rolePermissionsList.innerHTML = '';
  for (const flag of PERMISSION_FLAGS) {
    const label = document.createElement('label');
    label.className = 'permission-check';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = String(flag.bit);
    checkbox.checked = (selectedBitfield & flag.bit) === flag.bit;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(flag.label));
    rolePermissionsList.appendChild(label);
  }
}

function readPermissionCheckboxes() {
  let bitfield = 0;
  rolePermissionsList.querySelectorAll('input[type="checkbox"]:checked').forEach((cb) => {
    bitfield |= Number(cb.value);
  });
  return bitfield;
}

function openRoleEditor(role) {
  editingRoleId = role ? role.id : null;
  roleNameInput.value = role ? role.name : '';
  roleColorInput.value = role ? role.color : '#99aab5';
  renderPermissionCheckboxes(role ? role.permissions : 0);
  guildRolesStatus.textContent = '';
  roleEditor.classList.remove('hidden');
  roleNameInput.focus();
}

createRoleBtn.addEventListener('click', () => openRoleEditor(null));
roleCancelBtn.addEventListener('click', () => roleEditor.classList.add('hidden'));

roleSaveBtn.addEventListener('click', async () => {
  const name = roleNameInput.value.trim();
  if (!name) {
    guildRolesStatus.textContent = 'Nome obrigatorio.';
    return;
  }
  const color = roleColorInput.value;
  const permissions = readPermissionCheckboxes();
  const token = await window.api.auth.getToken();
  try {
    if (editingRoleId) {
      await apiRequest(`/api/guilds/${selectedGuildId}/roles/${editingRoleId}`, {
        method: 'PATCH',
        body: { name, color, permissions },
        token,
      });
    } else {
      await apiRequest(`/api/guilds/${selectedGuildId}/roles`, {
        method: 'POST',
        body: { name, color, permissions },
        token,
      });
    }
    roleEditor.classList.add('hidden');
    guildRolesStatus.textContent = '';
    await loadGuildRoles(selectedGuildId);
  } catch (err) {
    guildRolesStatus.textContent = err.message;
  }
});

async function deleteRole(roleId) {
  if (!confirm('Excluir esse cargo?')) return;
  const token = await window.api.auth.getToken();
  try {
    await apiRequest(`/api/guilds/${selectedGuildId}/roles/${roleId}`, { method: 'DELETE', token });
    await loadGuildRoles(selectedGuildId);
  } catch (err) {
    guildRolesStatus.textContent = err.message;
  }
}

function renderGuildMembersList() {
  const myPerms = myGuildPermissions();
  const canKick = (myPerms & PERM.KICK_MEMBERS) === PERM.KICK_MEMBERS;
  const canBan = (myPerms & PERM.BAN_MEMBERS) === PERM.BAN_MEMBERS;
  const canManageRoles = (myPerms & PERM.MANAGE_ROLES) === PERM.MANAGE_ROLES;

  guildMembersList.innerHTML = '';
  for (const member of guildMembers) {
    const li = document.createElement('li');
    li.className = 'member-row';

    const src = avatarSrc(member);
    if (src) {
      const img = document.createElement('img');
      img.className = 'avatar';
      img.src = src;
      li.appendChild(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'avatar';
      li.appendChild(placeholder);
    }

    const info = document.createElement('div');
    info.className = 'member-row-info';

    const nameEl = document.createElement('span');
    nameEl.className = 'member-row-name';
    nameEl.textContent = displayNameOf(member) + (member.isOwner ? ' (dono)' : '');
    info.appendChild(nameEl);

    const pillsWrap = document.createElement('div');
    pillsWrap.className = 'member-role-pills';
    for (const roleId of member.roleIds) {
      const role = guildRoles.find((r) => r.id === roleId);
      if (!role) continue;
      const pill = document.createElement('span');
      pill.className = 'role-pill';
      pill.style.color = role.color;
      pill.append(role.name);
      if (canManageRoles) {
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => unassignRoleFromMember(member.id, role.id));
        pill.appendChild(removeBtn);
      }
      pillsWrap.appendChild(pill);
    }
    info.appendChild(pillsWrap);

    if (canManageRoles) {
      const unassigned = guildRoles.filter((r) => !member.roleIds.includes(r.id));
      if (unassigned.length > 0) {
        const select = document.createElement('select');
        select.className = 'member-role-select';
        const placeholderOpt = document.createElement('option');
        placeholderOpt.textContent = '+ cargo';
        placeholderOpt.value = '';
        select.appendChild(placeholderOpt);
        for (const role of unassigned) {
          const opt = document.createElement('option');
          opt.value = String(role.id);
          opt.textContent = role.name;
          select.appendChild(opt);
        }
        select.addEventListener('change', () => {
          if (select.value) assignRoleToMember(member.id, Number(select.value));
        });
        info.appendChild(select);
      }
    }

    li.appendChild(info);

    if (!member.isOwner && member.id !== currentUser.id && (canKick || canBan)) {
      const actions = document.createElement('div');
      actions.className = 'member-row-actions';
      if (canKick) {
        const kickBtn = document.createElement('button');
        kickBtn.type = 'button';
        kickBtn.textContent = 'Expulsar';
        kickBtn.addEventListener('click', () => kickMember(member.id));
        actions.appendChild(kickBtn);
      }
      if (canBan) {
        const banBtn = document.createElement('button');
        banBtn.type = 'button';
        banBtn.textContent = 'Banir';
        banBtn.className = 'danger-btn-sm';
        banBtn.addEventListener('click', () => banMember(member.id));
        actions.appendChild(banBtn);
      }
      li.appendChild(actions);
    }

    guildMembersList.appendChild(li);
  }
}

async function assignRoleToMember(userId, roleId) {
  const token = await window.api.auth.getToken();
  try {
    await apiRequest(`/api/guilds/${selectedGuildId}/members/${userId}/roles/${roleId}`, { method: 'POST', token });
    await loadGuildMembers(selectedGuildId);
  } catch (err) {
    guildMembersStatus.textContent = err.message;
  }
}

async function unassignRoleFromMember(userId, roleId) {
  const token = await window.api.auth.getToken();
  try {
    await apiRequest(`/api/guilds/${selectedGuildId}/members/${userId}/roles/${roleId}`, { method: 'DELETE', token });
    await loadGuildMembers(selectedGuildId);
  } catch (err) {
    guildMembersStatus.textContent = err.message;
  }
}

async function kickMember(userId) {
  if (!confirm('Expulsar esse membro do servidor?')) return;
  const token = await window.api.auth.getToken();
  try {
    await apiRequest(`/api/guilds/${selectedGuildId}/members/${userId}/kick`, { method: 'POST', token });
    await loadGuildMembers(selectedGuildId);
  } catch (err) {
    guildMembersStatus.textContent = err.message;
  }
}

async function banMember(userId) {
  if (!confirm('Banir esse membro do servidor?')) return;
  const token = await window.api.auth.getToken();
  try {
    await apiRequest(`/api/guilds/${selectedGuildId}/members/${userId}/ban`, { method: 'POST', body: {}, token });
    await loadGuildMembers(selectedGuildId);
  } catch (err) {
    guildMembersStatus.textContent = err.message;
  }
}

function populateGuildSettingsTab() {
  guildSettingsStatus.textContent = '';
  guildRolesStatus.textContent = '';
  guildMembersStatus.textContent = '';
  roleEditor.classList.add('hidden');
  const guild = findGuild(selectedGuildId);
  if (!guild) return;
  guildSettingsId.textContent = `ID do servidor: ${guild.id} (compartilhe pra outros entrarem)`;
  guildIconPreview.style.backgroundImage = guild.iconUrl ? `url(${serverUrl}${guild.iconUrl})` : 'none';
  guildBannerPreview.style.backgroundImage = guild.bannerUrl ? `url(${serverUrl}${guild.bannerUrl})` : 'none';
  loadGuildEmoji(guild.id);
  loadGuildRoles(guild.id);
  loadGuildMembers(guild.id);
}

async function uploadGuildImage(file, field, endpoint, urlField) {
  const token = await window.api.auth.getToken();
  const formData = new FormData();
  formData.append(field, file);
  const res = await fetch(`${serverUrl}/api/guilds/${selectedGuildId}/${endpoint}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Erro ${res.status}`);
  return data[urlField];
}

guildIconInput.addEventListener('change', async () => {
  const file = guildIconInput.files[0];
  if (!file || !selectedGuildId) return;
  guildIconPreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  guildSettingsStatus.textContent = 'Enviando icone...';
  try {
    const iconUrl = await uploadGuildImage(file, 'icon', 'icon', 'iconUrl');
    findGuild(selectedGuildId).iconUrl = iconUrl;
    guildIconPreview.style.backgroundImage = `url(${serverUrl}${iconUrl})`;
    renderGuildRail();
    guildSettingsStatus.textContent = 'Icone atualizado.';
  } catch (err) {
    guildSettingsStatus.textContent = err.message;
  }
});

guildBannerInput.addEventListener('change', async () => {
  const file = guildBannerInput.files[0];
  if (!file || !selectedGuildId) return;
  guildBannerPreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  guildSettingsStatus.textContent = 'Enviando banner...';
  try {
    const bannerUrl = await uploadGuildImage(file, 'banner', 'banner', 'bannerUrl');
    findGuild(selectedGuildId).bannerUrl = bannerUrl;
    guildBannerPreview.style.backgroundImage = `url(${serverUrl}${bannerUrl})`;
    guildSettingsStatus.textContent = 'Banner atualizado.';
  } catch (err) {
    guildSettingsStatus.textContent = err.message;
  }
});

addEmojiForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = emojiNameInput.value.trim();
  const file = emojiFileInput.files[0];
  if (!name || !file || !selectedGuildId) return;

  guildSettingsStatus.textContent = 'Adicionando emoji...';
  try {
    const token = await window.api.auth.getToken();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', file);
    const res = await fetch(`${serverUrl}/api/guilds/${selectedGuildId}/emoji`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Erro ${res.status}`);

    emojiNameInput.value = '';
    emojiFileInput.value = '';
    guildSettingsStatus.textContent = 'Emoji adicionado.';
    await loadGuildEmoji(selectedGuildId);
  } catch (err) {
    guildSettingsStatus.textContent = err.message;
  }
});

function renderEmojis(html, guildId) {
  const map = emojiMapByGuild.get(guildId);
  if (!map) return html;
  return html.replace(/:([a-zA-Z0-9_]{2,32}):/g, (match, name) => {
    const url = map.get(name);
    if (!url) return match;
    return `<img class="emoji" src="${serverUrl}${url}" alt="${escapeHtml(name)}" title="${escapeHtml(name)}">`;
  });
}

// --- Bots ---
async function loadBots() {
  botsStatus.textContent = '';
  const token = await window.api.auth.getToken();
  try {
    const data = await apiRequest('/api/bots', { token });
    renderBotsList(data.bots);
  } catch (err) {
    botsStatus.textContent = err.message;
  }
}

function renderBotsList(bots) {
  botsList.innerHTML = '';
  for (const bot of bots) {
    const li = document.createElement('li');
    li.className = 'bot-row';

    const label = document.createElement('span');
    label.textContent = `${bot.displayName || bot.username} (@${bot.username})`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Remover';
    delBtn.addEventListener('click', () => deleteBot(bot.id));

    li.appendChild(label);
    li.appendChild(delBtn);
    botsList.appendChild(li);
  }
}

async function deleteBot(botId) {
  const token = await window.api.auth.getToken();
  try {
    await apiRequest(`/api/bots/${botId}`, { method: 'DELETE', token });
    await loadBots();
  } catch (err) {
    botsStatus.textContent = err.message;
  }
}

createBotForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = botUsernameInput.value.trim();
  if (!username) return;

  botsStatus.textContent = '';
  botTokenReveal.classList.add('hidden');
  try {
    const token = await window.api.auth.getToken();
    const data = await apiRequest('/api/bots', { method: 'POST', body: { username }, token });
    botUsernameInput.value = '';
    botTokenReveal.textContent = `Token do bot (guarde agora, nao sera mostrado de novo): ${data.token}`;
    botTokenReveal.classList.remove('hidden');
    await loadBots();
  } catch (err) {
    botsStatus.textContent = err.message;
  }
});

// --- Helpers ---
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function wsUrlFromServer(url) {
  return url.replace(/^http/, 'ws');
}

function displayNameOf(user) {
  return (user && (user.displayName || user.username)) || 'desconhecido';
}

function avatarSrc(user) {
  return user && user.avatarUrl ? `${serverUrl}${user.avatarUrl}` : null;
}

async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${serverUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Erro ${res.status}`);
  }
  return data;
}

function findGuild(guildId) {
  return guilds.find((g) => g.id === guildId) || null;
}

function findChannel(guildId, channelId) {
  const guild = findGuild(guildId);
  if (!guild) return null;
  return guild.channels.find((c) => c.id === channelId) || null;
}

// --- Screens ---
function showLogin(message) {
  appScreen.classList.add('hidden');
  registerScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  loginError.textContent = message || '';
}

function showRegister() {
  appScreen.classList.add('hidden');
  loginScreen.classList.add('hidden');
  registerScreen.classList.remove('hidden');
  registerError.textContent = '';
}

function showApp() {
  loginScreen.classList.add('hidden');
  registerScreen.classList.add('hidden');
  appScreen.classList.remove('hidden');
}

// --- Rendering ---
function renderGuildRail() {
  guildList.innerHTML = '';
  for (const guild of guilds) {
    const isActive = !dmMode && guild.id === selectedGuildId;
    const li = document.createElement('li');

    const pill = document.createElement('span');
    pill.className = 'rail-pill' + (isActive ? ' active' : '');
    li.appendChild(pill);

    const btn = document.createElement('div');
    btn.className = 'guild-icon' + (isActive ? ' active' : '');
    btn.title = `${guild.name} (ID: ${guild.id})`;
    if (guild.iconUrl) {
      const img = document.createElement('img');
      img.src = `${serverUrl}${guild.iconUrl}`;
      btn.appendChild(img);
    } else {
      btn.textContent = guild.name.slice(0, 2).toUpperCase();
    }
    btn.addEventListener('click', () => selectGuild(guild.id));
    li.appendChild(btn);
    guildList.appendChild(li);
  }
}

function renderChannelList() {
  const guild = findGuild(selectedGuildId);
  channelList.innerHTML = '';
  createChannelForm.classList.add('hidden');

  if (!guild) {
    guildHeaderName.textContent = 'Selecione um servidor';
    guildHeader.title = '';
    addChannelBtn.classList.add('hidden');
    return;
  }

  guildHeaderName.textContent = guild.name;
  guildHeader.title = `ID do servidor: ${guild.id}`;
  addChannelBtn.classList.remove('hidden');

  for (const channel of guild.channels) {
    const isVoice = channel.type === 'voice';
    const li = document.createElement('li');
    li.className = 'channel-item' + (channel.id === selectedChannelId ? ' active' : '') + (isVoice && channel.id === voiceChannelId ? ' connected' : '');
    li.textContent = `${isVoice ? '🔊' : '#'} ${channel.name}`;
    li.addEventListener('click', () => selectChannel(guild.id, channel.id));
    channelList.appendChild(li);

    if (isVoice && channel.id === voiceChannelId) {
      const membersUl = document.createElement('ul');
      membersUl.className = 'voice-channel-members';
      for (const user of [currentUser, ...voiceChannelPeers]) {
        if (!user) continue;
        const memberLi = document.createElement('li');
        memberLi.className = 'voice-channel-member';
        const src = avatarSrc(user);
        if (src) {
          const img = document.createElement('img');
          img.className = 'avatar';
          img.src = src;
          memberLi.appendChild(img);
        } else {
          const div = document.createElement('div');
          div.className = 'avatar';
          memberLi.appendChild(div);
        }
        const label = document.createElement('span');
        label.textContent = displayNameOf(user);
        memberLi.appendChild(label);
        membersUl.appendChild(memberLi);
      }
      channelList.appendChild(membersUl);
    }
  }
}

let lastMessageAuthorId = null;

function addMessage({ type, user, text, ts }) {
  messagesEmpty.classList.add('hidden');

  if (type === 'system') {
    lastMessageAuthorId = null;
    const el = document.createElement('div');
    el.className = 'msg-system';
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return;
  }

  const time = ts ? new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '';
  const renderedText = renderEmojis(escapeHtml(text), selectedGuildId);
  const isContinuation = user && user.id === lastMessageAuthorId;
  lastMessageAuthorId = user ? user.id : null;

  const row = document.createElement('div');
  row.className = 'msg-row' + (isContinuation ? ' continuation' : '');

  if (isContinuation) {
    row.innerHTML = `<span class="msg-gutter-time">${time}</span><div class="msg-body"><span class="msg-text">${renderedText}</span></div>`;
  } else {
    const src = avatarSrc(user);
    const avatarHtml = src ? `<img class="avatar msg-avatar" src="${src}">` : `<div class="avatar msg-avatar"></div>`;
    const botBadge = user && user.isBot ? '<span class="bot-badge">BOT</span>' : '';
    row.innerHTML = `${avatarHtml}<div class="msg-body"><div class="msg-header">${botBadge}<span class="author">${escapeHtml(displayNameOf(user))}</span><span class="time">${time}</span></div><span class="msg-text">${renderedText}</span></div>`;
    if (user) {
      const openForThisUser = (event) => {
        event.stopPropagation();
        openProfilePopover(user, event.currentTarget);
      };
      row.querySelector('.msg-avatar').addEventListener('click', openForThisUser);
      row.querySelector('.author').addEventListener('click', openForThisUser);
    }
  }

  messagesEl.appendChild(row);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function renderUserList(peers) {
  userListEl.innerHTML = '';
  for (const peer of peers) {
    const li = document.createElement('li');
    const src = avatarSrc(peer);
    if (src) {
      const img = document.createElement('img');
      img.className = 'avatar';
      img.src = src;
      li.appendChild(img);
    }
    const label = document.createElement('span');
    label.textContent = displayNameOf(peer) + (peer.isBot ? ' (bot)' : '');
    li.appendChild(label);
    li.addEventListener('click', (event) => {
      event.stopPropagation();
      openProfilePopover(peer, event.currentTarget);
    });
    userListEl.appendChild(li);
  }
}

function openProfilePopover(user, anchorEl) {
  if (!user) return;

  profilePopoverDisplayName.textContent = displayNameOf(user);
  profilePopoverUsername.textContent = `@${user.username}` + (user.isBot ? ' · BOT' : '');

  const src = avatarSrc(user);
  profilePopoverAvatar.style.backgroundImage = src ? `url(${src})` : 'none';

  if (user.bannerUrl) {
    profilePopoverBanner.style.backgroundImage = `url(${serverUrl}${user.bannerUrl})`;
    profilePopoverBanner.classList.remove('placeholder');
  } else {
    profilePopoverBanner.style.backgroundImage = 'none';
    profilePopoverBanner.classList.add('placeholder');
  }

  profilePopoverStatus.textContent = user.statusText || '';
  profilePopoverStatus.classList.toggle('hidden', !user.statusText);

  profilePopoverBio.textContent = user.bio || '';
  profilePopoverBio.classList.toggle('hidden', !user.bio);
  profilePopoverDivider.classList.toggle('hidden', !user.bio);

  profilePopover.classList.remove('hidden');

  const rect = anchorEl.getBoundingClientRect();
  const popW = profilePopover.offsetWidth;
  const popH = profilePopover.offsetHeight;
  let left = rect.right + 8;
  let top = rect.top;
  if (left + popW > window.innerWidth - 8) left = rect.left - popW - 8;
  if (left < 8) left = 8;
  if (top + popH > window.innerHeight - 8) top = window.innerHeight - popH - 8;
  if (top < 8) top = 8;
  profilePopover.style.left = `${left}px`;
  profilePopover.style.top = `${top}px`;
}

document.addEventListener('click', (event) => {
  if (profilePopover.classList.contains('hidden')) return;
  if (profilePopover.contains(event.target)) return;
  profilePopover.classList.add('hidden');
});

// --- Mensagens diretas ---
function setSidebarMode(mode) {
  dmMode = mode === 'dm';
  dmHomeBtn.classList.toggle('active', dmMode);
  guildChannelPanel.classList.toggle('hidden', dmMode);
  dmPanelEl.classList.toggle('hidden', !dmMode);
  memberSidebarEl.classList.toggle('hidden', dmMode);
}

function renderDmList() {
  dmListEl.innerHTML = '';
  const sorted = [...dmContacts].sort((a, b) => {
    if (a.online !== b.online) return a.online ? -1 : 1;
    return displayNameOf(a).localeCompare(displayNameOf(b));
  });

  for (const contact of sorted) {
    const li = document.createElement('li');
    li.className = 'dm-item' + (contact.id === selectedDmPeerId ? ' active' : '');

    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'avatar-wrap';
    const src = avatarSrc(contact);
    if (src) {
      const img = document.createElement('img');
      img.className = 'avatar';
      img.src = src;
      avatarWrap.appendChild(img);
    } else {
      avatarWrap.appendChild(document.createElement('div')).className = 'avatar';
    }
    const dot = document.createElement('span');
    dot.className = 'status-dot' + (contact.online ? '' : ' offline');
    avatarWrap.appendChild(dot);
    li.appendChild(avatarWrap);

    const name = document.createElement('span');
    name.className = 'dm-item-name';
    name.textContent = displayNameOf(contact) + (contact.isBot ? ' (bot)' : '');
    li.appendChild(name);

    li.addEventListener('click', () => openDm(contact.id));
    dmListEl.appendChild(li);
  }

  if (sorted.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'dm-item-empty';
    empty.textContent = 'Entre num servidor pra poder mandar DM pra alguem.';
    dmListEl.appendChild(empty);
  }
}

function clearDmHome() {
  selectedDmPeerId = null;
  renderDmList();
  channelTitle.textContent = 'Mensagens diretas';
  messagesEl.innerHTML = '';
  lastMessageAuthorId = null;
  messagesEmpty.querySelector('p').textContent = 'Selecione uma conversa pra comecar.';
  messagesEmpty.classList.remove('hidden');
  messageInput.disabled = true;
  messageForm.querySelector('button').disabled = true;
}

function openDm(peerId) {
  setSidebarMode('dm');
  selectedDmPeerId = peerId;
  renderDmList();

  const contact = dmContacts.find((c) => c.id === peerId);
  channelTitle.textContent = contact ? `@ ${displayNameOf(contact)}` : '';
  messagesEl.innerHTML = '';
  lastMessageAuthorId = null;
  messagesEmpty.querySelector('p').textContent = 'Nenhuma mensagem ainda por aqui.';
  messagesEmpty.classList.remove('hidden');
  messageInput.disabled = false;
  messageForm.querySelector('button').disabled = false;

  const loadToken = ++dmHistoryLoadToken;
  window.api.db.getDmMessages(peerId, 200).then((history) => {
    if (loadToken !== dmHistoryLoadToken || selectedDmPeerId !== peerId) return;
    for (const m of history) {
      addMessage({
        user: { id: m.authorId, username: m.authorName, displayName: m.authorName },
        text: m.content,
        ts: m.sentAt,
      });
    }
    if (history.length > 0) messagesEmpty.classList.add('hidden');
  });

  // So conecta se o contato estiver online agora - se estiver offline a
  // conexao e retomada quando o dm:presence de "online" chegar (ver switch do WS).
  if (contact && contact.online) Wyre.dmChat.connectToPeer(peerId);
}

dmHomeBtn.addEventListener('click', () => {
  setSidebarMode('dm');
  renderGuildRail();
  clearDmHome();
});

// --- Channel selection ---
let channelPeers = [];

function selectGuild(guildId) {
  setSidebarMode('guild');
  selectedGuildId = guildId;
  selectedChannelId = null;
  renderGuildRail();
  renderChannelList();
  clearChannelView();
  loadGuildEmoji(guildId);
}

function findChannelAnywhere(channelId) {
  for (const guild of guilds) {
    const channel = guild.channels.find((c) => c.id === channelId);
    if (channel) return { guild, channel };
  }
  return null;
}

function clearChannelView() {
  videoStage.classList.add('hidden');
  messagesWrapEl.classList.remove('hidden');
  messageForm.classList.remove('hidden');
  channelTitle.textContent = 'Nenhum canal selecionado';
  messagesEl.innerHTML = '';
  lastMessageAuthorId = null;
  messagesEmpty.querySelector('p').textContent = 'Selecione um canal pra comecar a conversa.';
  messagesEmpty.classList.remove('hidden');
  channelPeers = [];
  renderUserList([]);
  messageInput.disabled = true;
  messageForm.querySelector('button').disabled = true;
}

function leaveTextChannelView() {
  if (selectedChannelId && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'channel:leave', channelId: selectedChannelId }));
  }
  Wyre.p2pChat.leaveChannel();
}

function showTextChannelView(channel, channelId) {
  videoStage.classList.add('hidden');
  messagesWrapEl.classList.remove('hidden');
  messageForm.classList.remove('hidden');

  channelTitle.textContent = channel ? `# ${channel.name}` : '';
  messagesEl.innerHTML = '';
  lastMessageAuthorId = null;
  messagesEmpty.querySelector('p').textContent = 'Nenhuma mensagem ainda por aqui.';
  messagesEmpty.classList.remove('hidden');
  channelPeers = [];
  renderUserList([]);

  const isText = !!channel;
  messageInput.disabled = !isText;
  messageForm.querySelector('button').disabled = !isText;

  if (isText) {
    window.api.db.getMessages(channelId, 200).then((history) => {
      if (selectedChannelId !== channelId) return;
      for (const m of history) {
        addMessage({
          user: { id: m.authorId, username: m.authorName, displayName: m.authorName },
          text: m.content,
          ts: m.sentAt,
        });
      }
      if (history.length > 0) messagesEmpty.classList.add('hidden');
    });
  }

  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'channel:join', channelId }));
  }
}

// Palco de chamada substitui a area de mensagens (nao fica so espremido em
// cima) enquanto o canal de voz selecionado esta sendo visualizado - like
// Discord, clicar num canal de voz entra na chamada E abre a tela dela.
function showCallView(channel) {
  messagesWrapEl.classList.add('hidden');
  messageForm.classList.add('hidden');
  videoStage.classList.remove('hidden');
  channelTitle.textContent = channel ? `🔊 ${channel.name}` : '';
}

function selectChannel(guildId, channelId) {
  setSidebarMode('guild');
  const channel = findChannel(guildId, channelId);

  if (channel && channel.type === 'voice') {
    leaveTextChannelView();
    selectedGuildId = guildId;
    selectedChannelId = channelId;
    renderGuildRail();
    renderChannelList();
    showCallView(channel);
    joinVoiceChannel(channelId);
    return;
  }

  leaveTextChannelView();
  selectedGuildId = guildId;
  selectedChannelId = channelId;
  renderGuildRail();
  renderChannelList();
  showTextChannelView(channel, channelId);
}

// --- Canal de voz ---
async function joinVoiceChannel(channelId) {
  if (voiceChannelId === channelId) return;

  leaveVoiceChannel();

  const granted = await Wyre.voice.ensureMic();
  if (!granted) {
    voiceStatusChannel.textContent = 'Sem acesso ao microfone';
    voiceStatusBar.classList.remove('hidden');
    return;
  }

  voiceChannelId = channelId;
  voiceChannelPeers = [];
  renderChannelList();
  updateVoiceStatusBar();
  updateParticipantPrimaryTile('local', currentUser, true);

  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'voice:join', channelId }));
  }
}

function leaveVoiceChannel() {
  if (!voiceChannelId) return;
  const wasViewingCall = selectedChannelId === voiceChannelId;
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'voice:leave', channelId: voiceChannelId }));
  }
  Wyre.voice.leaveChannel();
  voiceChannelId = null;
  voiceChannelPeers = [];
  renderChannelList();
  updateVoiceStatusBar();
  videoTiles.innerHTML = '';
  updateMediaButtons();
  if (wasViewingCall) {
    selectedChannelId = null;
    clearChannelView();
  }
}

function updateVoiceStatusBar() {
  if (!voiceChannelId) {
    voiceStatusBar.classList.add('hidden');
    return;
  }
  const found = findChannelAnywhere(voiceChannelId);
  voiceStatusChannel.textContent = found ? found.channel.name : '';
  voiceStatusBar.classList.remove('hidden');
}

voiceStatusText.addEventListener('click', () => {
  if (!voiceChannelId) return;
  const found = findChannelAnywhere(voiceChannelId);
  if (found) selectChannel(found.guild.id, voiceChannelId);
});

voiceDisconnectBtn.addEventListener('click', () => leaveVoiceChannel());

// --- Video (camera + compartilhamento de tela, sobre as mesmas conexoes de voz) ---
function upsertVideoTile(key, { stream, name, isLocal, isScreen }) {
  let tile = videoTiles.querySelector(`[data-key="${key}"]`);
  if (!tile) {
    tile = document.createElement('div');
    tile.className = 'video-tile' + (isScreen ? ' screen-tile' : '');
    tile.dataset.key = key;
    const video = document.createElement('video');
    video.autoplay = true;
    video.playsInline = true;
    if (isLocal) video.muted = true;
    tile.appendChild(video);
    const labelEl = document.createElement('span');
    labelEl.className = 'video-tile-label';
    tile.appendChild(labelEl);
    videoTiles.appendChild(tile);
  }
  tile.querySelector('video').srcObject = stream;
  tile.querySelector('.video-tile-label').textContent = name;
}

function removeVideoTile(key) {
  const tile = videoTiles.querySelector(`[data-key="${key}"]`);
  if (tile) tile.remove();
}

// Cada participante da chamada tem um tile "principal": a propria camera
// quando ligada, senao um avatar - nunca os dois ao mesmo tempo (compartilhar
// tela sempre soma um tile extra, independente disso).
function upsertAvatarTile(key, user, isLocal) {
  let tile = videoTiles.querySelector(`[data-key="${key}"]`);
  if (!tile) {
    tile = document.createElement('div');
    tile.className = 'video-tile avatar-tile';
    tile.dataset.key = key;
    videoTiles.appendChild(tile);
  }
  tile.innerHTML = '';

  const avatarWrap = document.createElement('div');
  avatarWrap.className = 'call-tile-avatar';
  const src = avatarSrc(user);
  if (src) {
    const img = document.createElement('img');
    img.src = src;
    avatarWrap.appendChild(img);
  } else {
    avatarWrap.textContent = displayNameOf(user).slice(0, 2).toUpperCase();
  }
  tile.appendChild(avatarWrap);

  const labelEl = document.createElement('span');
  labelEl.className = 'video-tile-label';
  labelEl.textContent = displayNameOf(user) + (isLocal ? ' (voce)' : '');
  tile.appendChild(labelEl);
}

function updateParticipantPrimaryTile(key, user, isLocal) {
  if (!user) return;
  const hasCameraTile = !!videoTiles.querySelector(`[data-key="${key}:camera"]`);
  if (hasCameraTile) removeVideoTile(`${key}:avatar`);
  else upsertAvatarTile(`${key}:avatar`, user, isLocal);
}

function updateMediaButtons() {
  const camOn = Wyre.voice.isCameraOn();
  cameraToggleBtn.classList.toggle('media-active', camOn);
  cameraToggleBtn.title = camOn ? 'Desativar camera' : 'Ativar camera';
  const shareOn = Wyre.voice.isScreenSharing();
  screenShareBtn.classList.toggle('media-active', shareOn);
  screenShareBtn.title = shareOn ? 'Parar compartilhamento' : 'Compartilhar tela';
}

cameraToggleBtn.addEventListener('click', async () => {
  if (!voiceChannelId) return;
  if (Wyre.voice.isCameraOn()) Wyre.voice.disableCamera();
  else await Wyre.voice.enableCamera();
  updateMediaButtons();
});

screenShareBtn.addEventListener('click', async () => {
  if (!voiceChannelId) return;
  if (Wyre.voice.isScreenSharing()) {
    Wyre.voice.disableScreenShare();
    updateMediaButtons();
    return;
  }
  const sources = await window.api.screen.getSources();
  renderScreenShareSources(sources);
  screenShareModal.classList.remove('hidden');
});

function renderScreenShareSources(sources) {
  screenShareSources.innerHTML = '';
  for (const source of sources) {
    const item = document.createElement('div');
    item.className = 'screen-share-source-item';
    const img = document.createElement('img');
    img.src = source.thumbnail;
    item.appendChild(img);
    const label = document.createElement('span');
    label.textContent = source.name;
    item.appendChild(label);
    item.addEventListener('click', async () => {
      screenShareModal.classList.add('hidden');
      await Wyre.voice.enableScreenShare(source.id);
      updateMediaButtons();
    });
    screenShareSources.appendChild(item);
  }
}

screenShareCloseBtn.addEventListener('click', () => screenShareModal.classList.add('hidden'));
screenShareModal.addEventListener('click', (event) => {
  if (event.target === screenShareModal) screenShareModal.classList.add('hidden');
});

// --- WebSocket ---
let pendingCloseReason = null;

function connectWs(token) {
  ws = new WebSocket(wsUrlFromServer(serverUrl));

  ws.addEventListener('open', () => {
    ws.send(JSON.stringify({ type: 'identify', token }));
  });

  ws.addEventListener('message', (event) => {
    let msg;
    try {
      msg = JSON.parse(event.data);
    } catch {
      return;
    }
    handleWsMessage(msg);
  });

  ws.addEventListener('close', () => {
    if (!appScreen.classList.contains('hidden')) {
      showLogin(pendingCloseReason || 'Conexao perdida com o servidor.');
    }
    pendingCloseReason = null;
    ws = null;
  });

  ws.addEventListener('error', () => {
    // 'close' event fecha a UI; aqui so evitamos erro nao tratado
  });
}

function handleWsMessage(msg) {
  switch (msg.type) {
    case 'identify-ack': {
      currentUser = msg.user;
      guilds = msg.guilds;
      dmContacts = msg.dmContacts || [];
      selectedGuildId = guilds[0] ? guilds[0].id : null;
      updateUserFooter();
      renderDmList();
      if (selectedGuildId) {
        setSidebarMode('guild');
        renderChannelList();
        clearChannelView();
      } else {
        setSidebarMode('dm');
        clearDmHome();
      }
      renderGuildRail();
      showApp();

      Wyre.p2pChat.setMyId(currentUser.id);
      Wyre.p2pChat.init({
        sendSignal: (payload) => {
          if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(payload));
        },
        onMessage: (message) => {
          if (message.channelId !== selectedChannelId) return;
          window.api.db.saveMessage({
            id: message.id,
            channelId: message.channelId,
            authorId: message.user.id,
            authorName: displayNameOf(message.user),
            content: message.text,
            sentAt: message.ts,
          });
          addMessage(message);
        },
      });

      Wyre.dmChat.setMyId(currentUser.id);
      Wyre.dmChat.init({
        sendSignal: (payload) => {
          if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(payload));
        },
        onMessage: (peerId, message) => {
          window.api.db.saveDmMessage({
            id: message.id,
            peerId,
            authorId: message.user.id,
            authorName: displayNameOf(message.user),
            content: message.text,
            sentAt: message.ts,
          });
          if (dmMode && selectedDmPeerId === peerId) addMessage(message);
        },
      });

      Wyre.voice.setMyId(currentUser.id);
      Wyre.voice.init({
        sendSignal: (payload) => {
          if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(payload));
        },
        onRemoteTrack: (peerId, track, label, stream) => {
          const user = [...voiceChannelPeers, currentUser].find((u) => u && u.id === peerId);
          const name = (label === 'screen' ? 'Tela de ' : '') + (user ? displayNameOf(user) : `Usuario ${peerId}`);
          upsertVideoTile(`${peerId}:${label}`, { stream, name, isLocal: false, isScreen: label === 'screen' });
          if (label === 'camera') updateParticipantPrimaryTile(peerId, user, false);
        },
        onRemoteTrackEnded: (peerId, trackId) => {
          const user = [...voiceChannelPeers, currentUser].find((u) => u && u.id === peerId);
          for (const label of ['camera', 'screen']) {
            const key = `${peerId}:${label}`;
            const tile = videoTiles.querySelector(`[data-key="${key}"]`);
            if (!tile) continue;
            const stream = tile.querySelector('video').srcObject;
            if (stream && !stream.getTracks().some((t) => t.id === trackId)) continue;
            removeVideoTile(key);
            if (label === 'camera') updateParticipantPrimaryTile(peerId, user, false);
          }
        },
        onLocalTrackChange: () => {
          const camStream = Wyre.voice.getLocalCameraStream();
          if (camStream) upsertVideoTile('local:camera', { stream: camStream, name: 'Voce', isLocal: true, isScreen: false });
          else removeVideoTile('local:camera');
          updateParticipantPrimaryTile('local', currentUser, true);

          const shareStream = Wyre.voice.getLocalScreenStream();
          if (shareStream) upsertVideoTile('local:screen', { stream: shareStream, name: 'Sua tela', isLocal: true, isScreen: true });
          else removeVideoTile('local:screen');

          updateMediaButtons();
        },
      });
      break;
    }
    case 'error': {
      if (!appScreen.classList.contains('hidden')) {
        addMessage({ type: 'system', text: `Erro: ${msg.text}` });
      } else {
        loginError.textContent = msg.text;
      }
      break;
    }
    case 'channel:peers': {
      if (msg.channelId === selectedChannelId) {
        channelPeers = msg.peers;
        renderUserList([...channelPeers, currentUser]);
        Wyre.p2pChat.joinChannel(msg.channelId, msg.peers);
      }
      break;
    }
    case 'presence:join': {
      if (msg.channelId === selectedChannelId) {
        channelPeers.push(msg.user);
        renderUserList([...channelPeers, currentUser]);
        addMessage({ type: 'system', text: `${displayNameOf(msg.user)} entrou no canal.` });
        Wyre.p2pChat.peerJoined(msg.channelId, msg.user);
      }
      break;
    }
    case 'presence:leave': {
      if (msg.channelId === selectedChannelId) {
        channelPeers = channelPeers.filter((p) => p.id !== msg.user.id);
        renderUserList([...channelPeers, currentUser]);
        addMessage({ type: 'system', text: `${displayNameOf(msg.user)} saiu do canal.` });
        Wyre.p2pChat.peerLeft(msg.user.id);
      }
      break;
    }
    case 'voice:peers': {
      if (msg.channelId === voiceChannelId) {
        voiceChannelPeers = msg.peers;
        renderChannelList();
        Wyre.voice.joinChannel(msg.channelId, msg.peers);
        for (const peer of msg.peers) updateParticipantPrimaryTile(peer.id, peer, false);
      }
      break;
    }
    case 'voice:presence:join': {
      if (msg.channelId === voiceChannelId) {
        voiceChannelPeers.push(msg.user);
        renderChannelList();
        Wyre.voice.peerJoined(msg.channelId, msg.user);
        updateParticipantPrimaryTile(msg.user.id, msg.user, false);
      }
      break;
    }
    case 'voice:presence:leave': {
      if (msg.channelId === voiceChannelId) {
        voiceChannelPeers = voiceChannelPeers.filter((p) => p.id !== msg.user.id);
        renderChannelList();
        Wyre.voice.peerLeft(msg.user.id);
        removeVideoTile(`${msg.user.id}:camera`);
        removeVideoTile(`${msg.user.id}:screen`);
        removeVideoTile(`${msg.user.id}:avatar`);
      }
      break;
    }
    case 'presence:update': {
      if (msg.user.id === currentUser.id) {
        currentUser = msg.user;
        updateUserFooter();
      }
      const idx = channelPeers.findIndex((p) => p.id === msg.user.id);
      if (idx !== -1) channelPeers[idx] = msg.user;
      if (msg.channelId === selectedChannelId) {
        renderUserList([...channelPeers, currentUser]);
      }
      break;
    }
    case 'dm:presence': {
      const contact = dmContacts.find((c) => c.id === msg.userId);
      if (contact) contact.online = msg.online;
      if (dmMode) renderDmList();
      if (msg.online && selectedDmPeerId === msg.userId) Wyre.dmChat.connectToPeer(msg.userId);
      else if (!msg.online) Wyre.dmChat.disconnectPeer(msg.userId);
      break;
    }
    case 'rtc:offer':
    case 'rtc:answer':
    case 'rtc:ice':
    case 'rtc:media-state': {
      if (msg.kind === 'voice') Wyre.voice.handleSignal(msg);
      else if (msg.kind === 'dm') Wyre.dmChat.handleSignal(msg);
      else Wyre.p2pChat.handleSignal(msg);
      break;
    }
    case 'kicked': {
      pendingCloseReason =
        msg.reason === 'banned'
          ? `Voce foi banido do servidor "${msg.guildName}".`
          : `Voce foi removido do servidor "${msg.guildName}".`;
      break;
    }
    default:
      break;
  }
}

// --- Auth flow ---
async function boot() {
  serverUrl = serverInput.value.trim();
  const token = await window.api.auth.getToken();
  if (!token) {
    showLogin();
    return;
  }
  connectWs(token);
}

async function authRequest(path, username, password, errorEl) {
  serverUrl = serverInput.value.trim().replace(/\/$/, '');
  localStorage.setItem('wyre:serverUrl', serverUrl);

  if (!username || !password) {
    errorEl.textContent = 'Preencha usuario e senha.';
    return;
  }

  errorEl.textContent = '';
  try {
    const data = await apiRequest(path, { method: 'POST', body: { username, password } });
    await window.api.auth.setToken(data.token);
    connectWs(data.token);
  } catch (err) {
    errorEl.textContent = err.message;
  }
}

loginBtn.addEventListener('click', () => {
  authRequest('/api/login', usernameInput.value.trim(), passwordInput.value, loginError);
});

registerBtn.addEventListener('click', (event) => {
  event.preventDefault();
  showRegister();
});

backToLoginLink.addEventListener('click', (event) => {
  event.preventDefault();
  showLogin();
});

registerSubmitBtn.addEventListener('click', () => {
  const username = registerUsernameInput.value.trim();
  const password = registerPasswordInput.value;
  const confirm = registerConfirmInput.value;
  if (password !== confirm) {
    registerError.textContent = 'As senhas nao coincidem.';
    return;
  }
  authRequest('/api/register', username, password, registerError);
});

logoutBtn.addEventListener('click', async () => {
  Wyre.p2pChat.leaveChannel();
  Wyre.voice.leaveChannel();
  Wyre.dmChat.closeAll();
  voiceChannelId = null;
  voiceChannelPeers = [];
  updateVoiceStatusBar();
  if (ws) ws.close();
  await window.api.auth.clearToken();
  currentUser = null;
  guilds = [];
  selectedGuildId = null;
  selectedChannelId = null;
  dmContacts = [];
  selectedDmPeerId = null;
  dmMode = false;
  showLogin();
});

// --- Guild/channel actions ---
createGuildForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = createGuildInput.value.trim();
  if (!name) return;

  const token = await window.api.auth.getToken();
  try {
    const data = await apiRequest('/api/guilds', { method: 'POST', body: { name }, token });
    guilds.push(data.guild);
    selectGuild(data.guild.id);

    const iconFile = createGuildIconInput.files[0];
    if (iconFile) {
      const iconUrl = await uploadGuildImage(iconFile, 'icon', 'icon', 'iconUrl');
      findGuild(data.guild.id).iconUrl = iconUrl;
      renderGuildRail();
    }

    createGuildInput.value = '';
    createGuildIconInput.value = '';
    createGuildStatus.textContent = '';
    createGuildModal.classList.add('hidden');
  } catch (err) {
    createGuildStatus.textContent = err.message;
  }
});

createChannelForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = channelNameInput.value.trim();
  const type = channelTypeInput.value;
  if (!name || !selectedGuildId) return;

  const token = await window.api.auth.getToken();
  try {
    const data = await apiRequest(`/api/guilds/${selectedGuildId}/channels`, {
      method: 'POST',
      body: { name, type },
      token,
    });
    const guild = findGuild(selectedGuildId);
    guild.channels.push(data.channel);
    channelNameInput.value = '';
    channelFormStatus.textContent = '';
    renderChannelList();
  } catch (err) {
    channelFormStatus.textContent = err.message;
  }
});

joinGuildForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const guildId = Number(joinGuildInput.value.trim());
  if (!guildId) return;

  const token = await window.api.auth.getToken();
  try {
    const data = await apiRequest(`/api/guilds/${guildId}/join`, { method: 'POST', token });
    if (!findGuild(data.guild.id)) {
      guilds.push(data.guild);
    }
    joinGuildInput.value = '';
    joinGuildStatus.textContent = '';
    joinGuildModal.classList.add('hidden');
    selectGuild(data.guild.id);
  } catch (err) {
    joinGuildStatus.textContent = err.message;
  }
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;

  if (dmMode) {
    if (!selectedDmPeerId) return;
    const { message, delivered } = Wyre.dmChat.sendMessage(selectedDmPeerId, text, currentUser);
    if (!delivered) {
      addMessage({ type: 'system', text: 'Mensagem nao entregue - o outro usuario parece estar offline agora.' });
      return;
    }
    window.api.db.saveDmMessage({
      id: message.id,
      peerId: selectedDmPeerId,
      authorId: currentUser.id,
      authorName: displayNameOf(currentUser),
      content: text,
      sentAt: message.ts,
    });
    addMessage(message);
    messageInput.value = '';
    return;
  }

  if (!selectedChannelId) return;
  const message = Wyre.p2pChat.sendMessage(selectedChannelId, text, currentUser);
  window.api.db.saveMessage({
    id: message.id,
    channelId: message.channelId,
    authorId: currentUser.id,
    authorName: displayNameOf(currentUser),
    content: text,
    sentAt: message.ts,
  });
  addMessage(message);
  messageInput.value = '';
});

boot();
