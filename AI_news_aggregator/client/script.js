document.getElementById('calculateBtn').addEventListener('click', async () => {
  const headline = document.getElementById('headlineInput').value;
  if (!headline) {
    alert('Please enter a headline!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ headline }),
    });
    const data = await response.json();

    // Display the result
    document.getElementById('score').textContent = data.score;
    document.getElementById('category').textContent = data.category;

    

    // Refresh the headlines list
    fetchHeadlines();
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to calculate score. Please try again.');
  }
});

// Fetch and display headlines
const fetchHeadlines = async () => {
  try {
    const response = await fetch('http://localhost:3000/headlines');
    const headlines = await response.json();

    const tbody = document.querySelector('#headlinesTable tbody');
    tbody.innerHTML = headlines.map(headline => `
      <tr>
        <td>${headline.headline}</td>
        <td>${headline.score || 'N/A'}</td>
        <td>${headline.category}</td>
        <td class="actions">
          <button onclick="editHeadline(${headline.id})">Edit</button>
          <button onclick="deleteHeadline(${headline.id})">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error:', error);
  }
};

// Delete a headline
const deleteHeadline = async (id) => {
  try {
    await fetch(`http://localhost:3000/headlines/${id}`, {
      method: 'DELETE',
    });
    fetchHeadlines(); // Refresh the list
  } catch (error) {
    console.error('Error:', error);
  }
};

// Edit a headline
let currentEditId = null;

const editHeadline = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/headlines/${id}`);
    const headline = await response.json();

    // Populate modal fields
    document.getElementById('editHeadline').value = headline.headline;
    document.getElementById('editScore').value = headline.score || '';
    document.getElementById('editCategory').value = headline.category || '';
    currentEditId = id;

    // Show modal
    document.getElementById('editModal').style.display = 'block';
  } catch (error) {
    console.error('Error:', error);
  }
};

// Save edited headline
document.getElementById('saveEditBtn').addEventListener('click', async () => {
  const headline = document.getElementById('editHeadline').value;
  const score = document.getElementById('editScore').value;
  const category = document.getElementById('editCategory').value;

  try {
    await fetch(`http://localhost:3000/headlines/${currentEditId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ headline, score, category }),
    });

    // Hide modal and refresh list
    document.getElementById('editModal').style.display = 'none';
    fetchHeadlines();
  } catch (error) {
    console.error('Error:', error);
  }
});

// Close modal
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('editModal').style.display = 'none';
});

// Load headlines on page load
fetchHeadlines();