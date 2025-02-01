const apiKey = '47c2469a9a8b4524960cc5fa42189ccc';
const baseUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

document.addEventListener('DOMContentLoaded', () => {
    fetchNews(baseUrl);
    document.getElementById('searchButton').addEventListener('click', handleSearch);
});

async function fetchNews(url) {
    try {
        console.log("Fetching news from:", url);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (!data.articles || data.articles.length === 0) {
            document.getElementById("news").innerHTML = "<p class='text-center'>No news found.</p>";
            return;
        }

        displayNews(data.articles);
    } catch (error) {
        console.error('There was an error fetching the news!', error);
    }
}

function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        const searchUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;
        fetchNews(searchUrl);
    }
}

function displayNews(articles) {
    const newsDiv = document.getElementById('news');
    newsDiv.innerHTML = '';

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('card', 'mb-3', 'shadow-sm');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = article.title;
        cardBody.appendChild(title);

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = article.description || "No description available.";
        cardBody.appendChild(description);

        if (article.urlToImage) {
            const image = document.createElement('img');
            image.src = article.urlToImage;
            image.alt = article.title;
            image.classList.add('card-img-top');
            articleDiv.appendChild(image);
        }

        const link = document.createElement('a');
        link.href = article.url;
        link.target = "_blank";
        link.classList.add('btn', 'btn-success', 'mt-2');
        link.textContent = 'Read More';
        cardBody.appendChild(link);

        articleDiv.appendChild(cardBody);
        newsDiv.appendChild(articleDiv);
    });
}
