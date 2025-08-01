"use client"
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function RouteLoader() {
  const router = useRouter();

  useEffect(() => {
    // Configure NProgress (optional)
    NProgress.configure({ showSpinner: false });

    // Route change event handlers
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    // Subscribe to route change events
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // Cleanup event listeners
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return null;
}