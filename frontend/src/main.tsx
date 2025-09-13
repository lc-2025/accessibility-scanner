import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './components/Pages/Home.tsx';
import Loading from './components/Layout/Loading.tsx';
import Scan from './components/Pages/Scan/Scan.tsx';
import ScanDetails from './components/Pages/Scan/ScanDetails.tsx';
import ScanList from './components/Pages/Scan/ScanList.tsx';
import ScanLayout from './components/Pages/Scan/ScanLayout.tsx';
import Footer from './components/Layout/Footer.tsx';
import { ROUTE } from './utils/constants.ts';
import './css/index.css';
import './i18n.ts';

const { HOME, SCAN } = ROUTE;
const { DETAILS, LIST } = SCAN;

// Main
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
          path={HOME.PATH}
          index
        />
        <Route
          element={
            <Suspense fallback={<Loading />}>
              <ScanLayout />
            </Suspense>
          }
          path={SCAN.PATH}
        >
          <Route element={<Scan />} index />
          <Route element={<ScanList />} path={LIST.PATH} />
          <Route element={<ScanDetails />} path={DETAILS.PATH} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Footer />
  </StrictMode>,
);
