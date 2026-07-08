/**
 * Compresses an image file from a mobile camera using HTML5 Canvas.
 * @param {File} file - The raw file from <input type="file">
 * @param {number} maxWidth - Maximum allowed width in pixels (default 1024)
 * @returns {Promise<Blob>} - Compressed image blob ready for IndexedDB
 */
export function compressImage(file, maxWidth = 1024) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Export as WebP format at 75% quality for excellent compression
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas compression failed'));
            }
          },
          'image/webp',
          0.75
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
