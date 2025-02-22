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
          <td>${headline.id}</td>
          <td>${headline.headline}</td>
          <td>${headline.score || 'N/A'}</td>
          <td>${headline.category}</td>
          <td>
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
  
  // Load headlines on page load
  fetchHeadlines();