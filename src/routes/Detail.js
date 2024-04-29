import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Detail() {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [movieData, setMovieData] = useState([]);
	const getMovie = async () => {
		const json = await (
			await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
		).json();
		setMovieData(json.data.movie);
		setLoading(false);
		console.log(json.data.movie);
	};

	useEffect(() => {
		getMovie();
	}, []);

	return (
		<div>
			{loading ? (
				<h1>loading...</h1>
			) : (
				<div>
					<img src={movieData.background_image} alt={movieData.title} />
					<img src={movieData.medium_cover_image} alt={movieData.title} />
					<h2>
						{movieData.title} ({movieData.year})
					</h2>
					<h4>Runtime: {movieData.runtime} Minutes</h4>
					<h4>Rating: {movieData.rating}</h4>
					<ul>
						Genre:
						<li>
							{movieData.genres && movieData.genres.map((g) => <li key={g}>{g}</li>)}
						</li>
					</ul>
					<p>Description: {movieData.description_full}</p>
					{/* <h3>
					Torrent Link: <a href={`${movieData.torrents}`}>Click to Download</a>
				</h3> */}
				</div>
			)}
		</div>
	);
}

export default Detail;
