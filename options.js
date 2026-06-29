let categories = [];

async function loadCategories() {
  categories = await getCategories();
  renderCategories();
}

function renderCategories() {
  const container = document.getElementById('categoryList');
  
  if (categories.length === 0) {
    container.innerHTML = '<div class="empty-state">暂无分类，点击下方按钮添加</div>';
    return;
  }
  
  container.innerHTML = categories.map((cat, index) => `
    <div class="category-item" data-index="${index}">
      <div class="category-header">
        <input type="text" class="category-name" value="${escapeHtml(cat.name)}" placeholder="分类名称">
        <button class="btn-icon delete" onclick="deleteCategory(${index})">✕</button>
      </div>
      <textarea class="keywords-input" rows="3" placeholder="输入关键词，用逗号或空格分隔">${escapeHtml(cat.keywords.join('，'))}</textarea>
      <div class="keywords-hint">当笔记内容包含这些关键词时，自动分类到该专辑</div>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

function deleteCategory(index) {
  categories.splice(index, 1);
  renderCategories();
}

function addCategory() {
  categories.push({
    name: '新分类',
    keywords: ['关键词1', '关键词2']
  });
  renderCategories();
}

function resetDefaults() {
  if (confirm('确定要恢复默认分类吗？当前设置将被覆盖。')) {
    categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
    renderCategories();
    showToast('已恢复默认分类');
  }
}

function saveSettings() {
  const items = document.querySelectorAll('.category-item');
  const newCategories = [];
  
  items.forEach(item => {
    const nameInput = item.querySelector('.category-name');
    const keywordsInput = item.querySelector('.keywords-input');
    
    const name = nameInput.value.trim();
    const keywords = keywordsInput.value.split(/[,，\s]+/).map(k => k.trim()).filter(k => k);
    
    if (name && keywords.length > 0) {
      newCategories.push({ name, keywords });
    }
  });
  
  chrome.storage.local.set({ categories: newCategories }, () => {
    showToast('设置已保存');
    categories = newCategories;
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

document.getElementById('addCategory').addEventListener('click', addCategory);
document.getElementById('resetDefaults').addEventListener('click', resetDefaults);
document.getElementById('saveSettings').addEventListener('click', saveSettings);

loadCategories();