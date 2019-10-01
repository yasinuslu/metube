import React from 'react';

export const Player: React.FC<{ src: string }> = ({ src }) => {
  return <video src={src} controls />;
};
