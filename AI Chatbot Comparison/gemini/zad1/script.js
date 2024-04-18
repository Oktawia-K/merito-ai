const randomImage = document.getElementById('randomImage');

function getRandomImage() {
  // Replace "picsum.photos" with your preferred image source (free and allows hotlinking)
  fetch(`https://picsum.photos/800/600?random=${Math.random()}`)
    .then(response => response.blob())
    .then(blob => {
      const imageUrl = URL.createObjectURL(blob);
      randomImage.src = imageUrl;
    });
}

getRandomImage(); // Get a random image on initial load
