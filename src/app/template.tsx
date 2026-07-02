import SplashScreen from '@/components/layout/SplashScreen';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SplashScreen />
      {children}
    </>
  );
}
