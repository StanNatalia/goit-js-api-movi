const BASE_URL = "https://api.themoviedb.org/3";
const END_POINT = "/trending/movie/week";
const API_KEY = "345007f9ab440e5b86cef51be6397df1";

const container = document.querySelector(".js-movie-list");
const loadMore = document.querySelector(".js-load-more");

loadMore.addEventListener("click", onLoadMore)

let page = 1;

async function serviceMovie(page = 1) {
    const { data } = await axios(`${BASE_URL}${END_POINT}`, {
      params: {
        api_key: API_KEY,
        page: page
      }
      });
      return(data);
}
serviceMovie(page)
  .then(data => {
    console.log(data)
    container.insertAdjacentHTML("beforeend", createMarkup(data.results))
    loadMore.classList.replace("load-more-hidden", "load-more")
  })
  .catch(error => alert(error.message))


  function createMarkup(arr) {
     return arr.map(({ poster_path, release_date, original_title, vote_average }) => `
     
     <li class="movie-card">
       <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
       <div class="movie-info">
          <h2>${original_title}</h2>
          <p>Release Date: ${release_date}</p>
          <p>Vote Average${vote_average}</p>
       </div>
     </li>
     `).join("");
  }

  async function onLoadMore() {
    page += 1;

    try {

      const data = await serviceMovie(page);
      container.insertAdjacentHTML("beforeend", createMarkup(data.results))

    } catch(error) {
      alert(error.message)
    }
  }