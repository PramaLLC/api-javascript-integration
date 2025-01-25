const fs = require('fs');
const path = require('path');

const {
  predictImage
} = require('./foregroundRemoval');

async function main() {
  try {

    const apiKey = 'BEN api token';
    const apiUrl = '"https://api.backgrounderase.net/v2'; 


      
      const inputPath = path.join(__dirname, 'image.jpg');
      const originalBuffer = fs.readFileSync(inputPath);
      const result = await predictImage(originalBuffer, apiKey, apiUrl);
      
      if (!result) {
        console.error('Failed to get a valid result from predictImage.');
        console.log(result)
        return;
      }
      
      const { mask, foreground } = result;
      fs.writeFileSync(path.join(__dirname, 'result.png'), foreground);
      fs.writeFileSync(path.join(__dirname, 'mask.png'), mask);
      
      console.timeEnd('imageProcessing');
    } catch (err) {
      console.error('Error running foreground removal:', err);
    }
  }
  main();