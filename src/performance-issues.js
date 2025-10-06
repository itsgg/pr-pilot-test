// Data processing with performance issues
const _ = require('lodash');

// PERFORMANCE ISSUE: N+1 query problem
async function loadUserPosts(userIds) {
  const results = [];
  
  // This creates N+1 queries instead of bulk loading
  for (let i = 0; i < userIds.length; i++) {
    const user = await database.findUser(userIds[i]);
    const posts = await database.findPostsByUser(userIds[i]);
    results.push({ user, posts });
  }
  
  return results;
}

// PERFORMANCE ISSUE: Inefficient array operations
function processLargeDataset(data) {
  let result = [];
  
  // Multiple loops instead of single pass
  for (let item of data) {
    if (item.status === 'active') {
      result.push(item);
    }
  }
  
  // Another loop for transformation
  for (let i = 0; i < result.length; i++) {
    result[i] = {
      ...result[i],
      processedAt: new Date(),
      score: calculateScore(result[i])
    };
  }
  
  // Yet another loop for sorting
  result.sort((a, b) => b.score - a.score);
  
  return result;
}

// PERFORMANCE ISSUE: Synchronous file operations in loop
function processFiles(filenames) {
  const results = [];
  
  for (const filename of filenames) {
    // Blocking I/O in a loop
    const content = require('fs').readFileSync(filename, 'utf8');
    const processed = processContent(content);
    results.push(processed);
  }
  
  return results;
}

// PERFORMANCE ISSUE: Memory leak with event listeners
class DataProcessor {
  constructor() {
    this.data = [];
    this.listeners = [];
    
    // Event listeners are never removed
    setInterval(() => {
      this.processData();
    }, 1000);
  }
  
  addListener(callback) {
    this.listeners.push(callback);
  }
  
  processData() {
    // Creates new objects without cleanup
    this.data.push(new Date().getTime());
    
    this.listeners.forEach(listener => {
      listener(this.data);
    });
  }
}

// PERFORMANCE ISSUE: Inefficient string concatenation
function buildLargeString(items) {
  let result = "";
  
  for (const item of items) {
    result += `<div class="item">`;
    result += `  <h3>${item.title}</h3>`;
    result += `  <p>${item.description}</p>`;
    result += `  <span class="date">${item.date}</span>`;
    result += `</div>`;
  }
  
  return result;
}

function calculateScore(item) {
  // Simulate expensive calculation
  let score = 0;
  for (let i = 0; i < 10000; i++) {
    score += Math.random() * item.value;
  }
  return score;
}

function processContent(content) {
  // Simulate processing
  return content.toUpperCase().split('\n').join(' ');
}

module.exports = {
  loadUserPosts,
  processLargeDataset,
  processFiles,
  DataProcessor,
  buildLargeString
};