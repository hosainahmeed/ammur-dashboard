import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../public/success.json';

function Success({ title, description }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie options={defaultOptions} height={40} width={40} />
      <h1 className="text-2xl">{title}</h1>
      <p className="text-xl">{description}</p>
    </div>
  );
}

export default Success;
