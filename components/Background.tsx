// components/Background.tsx
'use client';

// Removed .tsx from the path
import GradientBlinds from '../app/gradientblinds'; 

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <GradientBlinds
        gradientColors={['#FF9FFC', '#5227FF']}
        angle={30}
        noise={0.3}
        blindCount={12}
        blindMinWidth={50}
        spotlightRadius={0.5}
        spotlightSoftness={1}
        spotlightOpacity={1}
        mouseDampening={0.15}
        distortAmount={0}
        shineDirection="left"
        mixBlendMode="lighten"
      />
    </div>
  );
}