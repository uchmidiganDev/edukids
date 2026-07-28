import Lottie from 'lottie-react';
import starLoader from '../assets/lottie/star-loader.json';

// Qo'lda yaratilgan sodda Lottie animatsiyasi - yulduzcha aylanib/pulsatsiya qiladi
export default function LottieStar({ size = 120 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} aria-hidden="true">
      <Lottie animationData={starLoader} loop autoplay />
    </div>
  );
}
