// Make sure all functions are attached to window object
window.isModalLoaded = false;

window.openSharedModal = function() {
  const modal = document.getElementById('reusableModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
};

window.closeSharedModal = function() {
  const modal = document.getElementById('reusableModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
};

window.loadAndOpenModal = async function() {
  console.log('loadAndOpenModal called');
  
  try {
    // If modal is already loaded, just open it
    if (window.isModalLoaded && document.getElementById('reusableModal')) {
      window.openSharedModal();
      return;
    }
    
    // Load modal.html content
    const response = await fetch('modal.html');
    if (!response.ok) throw new Error('Failed to load modal');
    
    const modalHTML = await response.text();
    console.log('Modal HTML loaded');
    
    // Insert into container
    document.getElementById('modalContainer').innerHTML = modalHTML;
    window.isModalLoaded = true;
    
    // Setup modal event listeners
    window.setupModalEvents();
    
    // Open the modal
    setTimeout(() => {
      window.openSharedModal();
    }, 100);
    
  } catch (error) {
    console.error('Error loading modal:', error);
    alert('Could not load modal. Please try again.');
  }
};

window.setupModalEvents = function() {
  const modal = document.getElementById('reusableModal');
  if (!modal) return;
  
  // Close when clicking outside modal
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      window.closeSharedModal();
    }
  });
  
  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      window.closeSharedModal();
    }
  });
  
  // Find and setup close buttons
  const closeButtons = modal.querySelectorAll('[onclick*="closeSharedModal"]');
  closeButtons.forEach(btn => {
    btn.onclick = window.closeSharedModal;
  });
  
  // Setup confirm button
  const confirmBtn = modal.querySelector('[onclick*="handleConfirm"]');
  if (confirmBtn) {
    confirmBtn.onclick = function() {
      alert('Selection confirmed!');
      window.closeSharedModal();
    };
  }
  
  console.log('Modal events setup complete');
};

window.handleConfirm = function() {
  alert('Selection confirmed!');
  window.closeSharedModal();
};

