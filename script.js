  let complaints = JSON.parse(localStorage.getItem('hostelComplaints')) || [];
  const form = document.querySelector('.form-grid');
  const cardsGrid = document.querySelector('.cards-grid');
  const catFilter = document.getElementById('catFilter');
  const statusFilter = document.getElementById('statusFilter');

  // Form submission with Validation
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('studentName').value.trim();
    const room = document.getElementById('roomNumber').value.trim();
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value.trim();

    // Validation Rule: No empty submissions
    if (!name || !room || !description) {
      alert("Error: All fields are required to submit a complaint.");
      return;
    }

    const newComplaint = {
      id: Date.now().toString(),
      name,
      room,
      category,
      description,
      status: 'Pending',
      timestamp: new Date().toLocaleString([], { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    };

    complaints.unshift(newComplaint);
    localStorage.setItem('hostelComplaints', JSON.stringify(complaints));
    renderComplaints();
    form.reset();
  });

  // Actions
  window.deleteComplaint = function(id) {
    complaints = complaints.filter(c => c.id !== id);
    localStorage.setItem('hostelComplaints', JSON.stringify(complaints));
    renderComplaints();
  }

  window.updateStatus = function(id, newStatus) {
    const complaint = complaints.find(c => c.id === id);
    if (complaint) {
      complaint.status = newStatus;
      localStorage.setItem('hostelComplaints', JSON.stringify(complaints));
      renderComplaints();
    }
  }

  // Update Dynamic Stats
  function updateStats(filteredCount) {
    document.querySelector('.stat-box:nth-child(1) .stat-value').textContent = complaints.length;
    document.querySelector('.stat-box:nth-child(2) .stat-value').textContent = complaints.filter(c => c.status === 'Pending').length;
    document.querySelector('.stat-box:nth-child(3) .stat-value').textContent = complaints.filter(c => c.status === 'In Progress').length;
    document.querySelector('.stat-box:nth-child(4) .stat-value').textContent = complaints.filter(c => c.status === 'Resolved').length;
    document.querySelector('.section-subtitle').textContent = `Showing ${filteredCount} of ${complaints.length} complaints.`;
  }

  // Render & Filter Logic
  function renderComplaints() {
    const catValue = catFilter.value;
    const statusValue = statusFilter.value;

    const filtered = complaints.filter(c => {
      const matchCat = catValue === 'All' || c.category === catValue;
      const matchStatus = statusValue === 'All' || c.status === statusValue;
      return matchCat && matchStatus;
    });

    updateStats(filtered.length);
    cardsGrid.innerHTML = ''; 

    if(filtered.length === 0) {
      cardsGrid.innerHTML = '<p style="color: #64748b; grid-column: 1 / -1; text-align: center;">No complaints found. Submit one above!</p>';
      return;
    }

    filtered.forEach(c => {
      let badgeClass = 'badge-other';
      if (c.category === 'Mess') badgeClass = 'badge-mess';
      else if (c.category === 'Maintenance') badgeClass = 'badge-maintenance';
      else if (c.category === 'Cleanliness') badgeClass = 'badge-cleanliness';
      else if (c.category === 'Security') badgeClass = 'badge-security';
      else if (c.category === 'Wi-Fi') badgeClass = 'badge-wifi';

      let statusClass = 'status-pending';
      if (c.status === 'In Progress') statusClass = 'status-in-progress';
      else if (c.status === 'Resolved') statusClass = 'status-resolved';

      const card = document.createElement('article');
      card.className = 'complaint-card';
      card.innerHTML = `
        <div class="card-top">
          <div class="card-identity">
            <div class="avatar avatar-1">${c.name.substring(0, 2).toUpperCase()}</div>
            <div class="identity-text">
              <div class="student-name">${c.name}</div>
              <div class="room-info">Room ${c.room}</div>
            </div>
          </div>
          <span class="badge ${badgeClass}">${c.category}</span>
        </div>
        <p class="card-body">${c.description}</p>
        <div class="card-footer">
          <div class="footer-left">
            <span class="status-pill ${statusClass}"><span class="dot"></span>${c.status}</span>
            <span class="timestamp">${c.timestamp}</span>
          </div>
          <div class="footer-actions">
            <select class="status-select" onchange="updateStatus('${c.id}', this.value)">
              <option ${c.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option ${c.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
            </select>
            <button type="button" class="icon-btn" onclick="deleteComplaint('${c.id}')" title="Delete">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
      cardsGrid.appendChild(card);
    });
  }

  // Event listeners for filters
  catFilter.addEventListener('change', renderComplaints);
  statusFilter.addEventListener('change', renderComplaints);

  // Run on page load
  renderComplaints();
