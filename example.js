const fs = require('fs');
const path = require('path');
const { predictImage } = require('./main');

async function main() {
  try {
    const apiKey = 'your_ben_api_token'; // Replace with your API token
    const apiUrl = 'https://api.backgrounderase.net/v2';
    
    // Load image file
    const inputPath = path.join(__dirname, 'image.jpg'); // Replace with your image path
    const originalBuffer = fs.readFileSync(inputPath);
    
    // Get prediction
    const result = await predictImage(originalBuffer, apiKey, apiUrl);
    
    if (!result) {
      console.error('Failed to get a valid result from predictImage.');
      return;
    }
    
    // Save results
    const { mask, foreground } = result;
    fs.writeFileSync(path.join(__dirname, 'result.png'), foreground);
    fs.writeFileSync(path.join(__dirname, 'mask.png'), mask);
    
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
