import { Movie } from "../typings";
import Image from "next/legacy/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { DocumentData } from "firebase/firestore";

interface Props {
  movie: Movie | DocumentData;
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="object-cover rounded-sm md:rounded"
        layout="fill"
        alt={""}
      />
    </div>
  );
}

export default Thumbnail;
