'use client';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
  width: 328px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const StyledImage = styled.img`
  width: 100%;
  display: block;
  flex-shrink: 0;
  flex-grow: 0;
  transition: translate 300ms ease-in-out;
`;

const PrevButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  position: absolute;
  left: 0;
  width: 50%;
  height: 100%;
`;

const NextButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40px;
`;

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 8px;
  height: 8px;
  border-radius: 100%;
`;

const IMAGES = [
  { src: '/images/ticket_1.png', alt: 'ticket no. 1' },
  { src: '/images/ticket_2.png', alt: 'ticket no. 2' },
  { src: '/images/ticket_3.png', alt: 'ticket no. 3' },
];

// interface Props {
//   images: { src: string; alt: string }[];
//   imageIndex: number;
//   showPrevImage: () => void;
//   showNextImage: () => void;
//   onClickDotButton: (index: number) => void;
// }
export default function ImageSlider() {
  const [imageIndex, setImageIndex] = useState(0);

  const showPrevImage = useCallback(() => {
    setImageIndex((index: number) => {
      if (index === 0) return 0;
      return index - 1;
    });
  }, [setImageIndex]);

  const showNextImage = useCallback(() => {
    setImageIndex((index: number) => {
      if (index === IMAGES.length - 1) return IMAGES.length - 1;
      return index + 1;
    });
  }, [setImageIndex]);

  const onClickDotButton = useCallback(
    (index: number) => {
      setImageIndex(index);
    },
    [setImageIndex],
  );

  return (
    <Container>
      <ImageContainer>
        {IMAGES.map(({ src, alt }, index) => (
          <StyledImage
            key={src}
            src={src}
            alt={alt}
            aria-hidden={imageIndex !== index}
            style={{
              translate: `${-100 * imageIndex}%`,
            }}
          />
        ))}

        <PrevButton onClick={showPrevImage} />

        <NextButton onClick={showNextImage} />
      </ImageContainer>

      <DotsContainer>
        {IMAGES.map((_, index) => (
          <StyledButton
            key={`slider-btn-${uuidv4()}`}
            type='button'
            aria-label={`View Image ${index + 1}`}
            onClick={() => onClickDotButton(index)}
            style={{
              backgroundColor: index === imageIndex ? '#2890ff' : '#cfd4da',
            }}
          />
        ))}
      </DotsContainer>
    </Container>
  );
}
