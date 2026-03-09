import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import InstallationPage from './pages/docs/InstallationPage';
import CliOptionsPage from './pages/docs/CliOptionsPage';
import ConfigurationPage from './pages/docs/ConfigurationPage';
import SortingPage from './pages/docs/SortingPage';
import FilteringPage from './pages/docs/FilteringPage';
import FormattingPage from './pages/docs/FormattingPage';
import OverlaysPage from './pages/docs/OverlaysPage';
import GeneratePage from './pages/docs/GeneratePage';
import SplitBundlePage from './pages/docs/SplitBundlePage';
import ConvertPage from './pages/docs/ConvertPage';
import RenamePage from './pages/docs/RenamePage';
import ProgrammaticPage from './pages/docs/ProgrammaticPage';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/docs/installation' element={<InstallationPage />} />
            <Route path='/docs/cli-options' element={<CliOptionsPage />} />
            <Route path='/docs/configuration' element={<ConfigurationPage />} />
            <Route path='/docs/sorting' element={<SortingPage />} />
            <Route path='/docs/filtering' element={<FilteringPage />} />
            <Route path='/docs/formatting' element={<FormattingPage />} />
            <Route path='/docs/overlays' element={<OverlaysPage />} />
            <Route path='/docs/generate' element={<GeneratePage />} />
            <Route path='/docs/split-bundle' element={<SplitBundlePage />} />
            <Route path='/docs/convert' element={<ConvertPage />} />
            <Route path='/docs/rename' element={<RenamePage />} />
            <Route path='/docs/programmatic' element={<ProgrammaticPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
