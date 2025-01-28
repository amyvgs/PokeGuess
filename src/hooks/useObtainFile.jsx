import { useEffect, useState } from "react";
import useManageGame from "../contexts/useManageGame";

const useObtainFile = () => {
  const { generation } = useManageGame();

  const [pokeInfo, setPokeInfo] = useState({});
  const [isLoadingInfo, setIsLoadingInfo] = useState(true);

  useEffect(() => {
    const obtainJson = async () => {
      try {
        const data = await import(`../static/generation_${generation}.json`);
        const pokeData = data.default;
        setPokeInfo({ ...pokeData });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingInfo(false);
      }
    };

    obtainJson();
  }, []);

  return { isLoadingInfo, pokeInfo };
};

export default useObtainFile;
