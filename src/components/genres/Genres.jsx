import React from "react";

import "./style.scss";
import { useAppSelector } from "../../hooks/useAppSelector";

const Genres = ({ data }) => {
    const { genres } = useAppSelector((state) => state.home);

    return (
        <div className="genres">
            {data?.map((g) => {
                if (!genres[g]?.name) return;
                return (
                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;
