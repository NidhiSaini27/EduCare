// Navigation and section display
const navLinks = document.querySelectorAll('.sidebar a');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const target = link.dataset.target;
    sections.forEach(section => {
      section.classList.toggle('active', section.id === target);
    });
  });
});

// Assignment data and submission tracker
const assignments = [
  { name: 'Math Homework 1', submitted: true },
  { name: 'English Essay', submitted: false },
  { name: 'Science Project', submitted: true },
  { name: 'History Presentation', submitted: false },
  { name: 'Art Portfolio', submitted: true }
];

const assignmentTableBody = document.getElementById('assignmentTableBody');
const assignmentStatusText = document.getElementById('assignmentStatusText');
const assignmentProgressFill = document.getElementById('assignmentProgressFill');

function updateAssignments() {
  assignmentTableBody.innerHTML = '';
  let submittedCount = 0;
  assignments.forEach(assign => {
    const tr = document.createElement('tr');
    const nameTd = document.createElement('td');
    nameTd.textContent = assign.name;
    const statusTd = document.createElement('td');
    statusTd.textContent = assign.submitted ? 'Submitted ✅' : 'Pending ⏳';
    statusTd.style.color = assign.submitted ? 'green' : 'red';

    tr.appendChild(nameTd);
    tr.appendChild(statusTd);
    assignmentTableBody.appendChild(tr);

    if (assign.submitted) submittedCount++;
  });

  const total = assignments.length;
  const percent = Math.round((submittedCount / total) * 100);
  assignmentStatusText.textContent = You have submitted ${submittedCount} out of ${total} assignments.;
  assignmentProgressFill.style.width = ${percent}%;
  assignmentProgressFill.textContent = ${percent}%;
}
updateAssignments();

// Chart.js: Risk Overview Chart
const riskCtx = document.getElementById('riskChart').getContext('2d');
const riskChart = new Chart(riskCtx, {
  type: 'doughnut',
  data: {
    labels: ['High Risk', 'Medium Risk', 'Low Risk'],
    datasets: [{
      data: [12, 19, 7],
      backgroundColor: ['#e74c3c', '#f39c12', '#2ecc71'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

// Chart.js: Performance & Submissions Chart
const performanceCtx = document.getElementById('performanceChart').getContext('2d');
const performanceChart = new Chart(performanceCtx, {
  type: 'bar',
  data: {
    labels: ['Math', 'English', 'Science', 'History', 'Art'],
    datasets: [
      {
        label: 'Assignment Scores',
        data: [85, 92, 78, 88, 95],
        backgroundColor: '#6a0572'
      },
      {
        label: 'Submission Rate %',
        data: [100, 75, 100, 50, 100],
        backgroundColor: '#cdb4db'
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  }
});

// Mood Check-in Logic
const moodOptions = document.querySelectorAll('.mood-option');
const moodResult = document.getElementById('moodResult');

moodOptions.forEach(option => {
  option.addEventListener('click', () => {
    // Clear previous selections
    moodOptions.forEach(opt => opt.classList.remove('selected'));

    // Mark current mood as selected
    option.classList.add('selected');
    const mood = option.dataset.mood;
    moodResult.textContent = You’re feeling: ${mood};

    // Save to localStorage with date
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    let moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '{}');
    moodHistory[today] = mood;
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));

    console.log('Mood saved:', moodHistory);
  });
});

// Optional: Log stored mood history for debugging
console.log('Mood history:', JSON.parse(localStorage.getItem('moodHistory')));

