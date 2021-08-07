
import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./EmblaCarouselButton";
import { useEmblaCarousel } from "embla-carousel/react";
import { img_300, noPicture, loadingImg } from "../../../../config/imgConfig"
import styles from "../../../../styles/embla.module.css"
import Paper from '@material-ui/core/Paper';

const EmblaCarousel = ({ slides, castData }) => {

    //some carousel settings from embla carousel codesandbox
    const [viewportRef, embla] = useEmblaCarousel({
        dragFree: true,
        containScroll: "trimSnaps"
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);


    useEffect(() => {
        if (!embla) return;
        embla.on("select", onSelect);
        onSelect();
    }, [embla, onSelect]);


    //img array
    const media = castData && castData.map(v => v.profile_path ? img_300 + v.profile_path : noPicture)
    const mediaByIndex = index => media && media[index % media.length];

    //cast array
    const castName = castData && castData.map(v => v.name)
    const castNameByIndex = index => castName && castName[index % castName.length];

    //character array
    const charName = castData && castData.map(v => v.character)
    const charNameByIndex = index => charName && charName[index % charName.length];


    return (
        <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={viewportRef}>
                <div className={styles.embla__container}>
                    {/* mapping array */}
                    {slides.map((index) => (
                        <div className={styles.embla__slide} key={index}>
                            <div className={styles.embla__slide__inner}>
                                <Paper
                                    elevation={3}
                                    style={{ borderRadius: "15px" }}>
                                    <img
                                        width="100%"
                                        className={styles.embla__slide__img}
                                        src={media ? mediaByIndex(index) : loadingImg}
                                        alt={castNameByIndex(index)}
                                    />
                                    <div className={styles.embla__slide__data}>
                                        <span>{castNameByIndex(index)}</span><br />
                                        <span className={styles.embla__slide__charName}>{charNameByIndex(index)}</span>
                                    </div>
                                </Paper>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {/* buttons */}
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
    );
};

export default EmblaCarousel;
