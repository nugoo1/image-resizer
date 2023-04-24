const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const inputFolder = './input'
const outputFolder = './output'
const width = 800 // replace with your desired width
const height = 600 // replace with your desired height
const quality = 100 // replace with your desired quality (0-100)

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder)
}

// Get a list of all image files in the input folder
const inputFiles = fs.readdirSync(inputFolder).filter(file => {
  const extension = path.extname(file).toLowerCase()
  return extension === '.jpg' || extension === '.jpeg' || extension === '.png'
})

// Resize and compress each image and save it to the output folder
inputFiles.forEach(file => {
  const inputFile = path.join(inputFolder, file)
  const outputFile = path.join(outputFolder, file)
  sharp(inputFile)
    .resize(width, height)
    .jpeg({ quality: quality })
    .png({ quality: quality })
    .toFile(outputFile, (err, info) => {
      if (err) {
        console.error(`Error processing ${inputFile}:`, err)
      } else {
        console.log(
          `Processed ${inputFile} (${info.width}x${info.height}, ${info.size} bytes)`
        )
      }
    })
})
