const cardsContainer = document.getElementById('cards-container')
const imgsBtn = document.getElementById('images-btn')

imgsBtn.addEventListener('click', () => {
  cardsContainer.innerHTML = ``
  getImages()
})

async function getImages() {
  let randomNum = Math.floor(Math.random() * 5 + 1)
  const url = `https://picsum.photos/v2/list?page=${randomNum}&limit=100`
  const res = await fetch(url)
  const data = await res.json()
  fetchImages(data)
}

async function fetchImages(data) {
  for(let i = 0; i < data.length; i++) {
    await generateCard(data[i])
  }
}

async function generateCard(data) {
  const imgID = await data.id
  const imgAuthor = await data.author
  const card = document.createElement('div')
  card.classList.add('card')
  card.innerHTML = `
    <h3>Photographed by: </h3>
    <h2 class="card-title">${imgAuthor}</h2>
    <a href="${data.url}" target="_blank"><img src="https://picsum.photos/id/${imgID}/200" alt="A nice little picture of a thing." class="card-image" id="card-image"></a>
    <p class="card-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id earum, animi pariatur iusto voluptas atque dicta, consectetur minus eius suscipit impedit voluptatibus, molestiae soluta cupiditate.</p>
  `
  cardsContainer.appendChild(card)
}
