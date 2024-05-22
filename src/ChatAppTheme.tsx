import { Suspense, useEffect, useState } from 'react';
import GlobalStyle from './global-styles';
import ChatApp from './ChatApp';
import { MainPageLoader } from './common/components/loader';
import AppThemeProvider from './common/theme';
import { useNavigate } from 'react-router-dom';

export default function ChatAppTheme() {
  const navigate = useNavigate();
  const [org, setOrg] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('Token')) {
      navigate('/login');
    } else if (!localStorage.getItem('org')) {
      setOrg(false);
    } else if (localStorage.getItem('Token') && localStorage.getItem('org')) {
      setOrg(true);
    }
  }, [navigate]);

  return (
    <>
      {org && (
        <AppThemeProvider>
          <GlobalStyle />
          <Suspense fallback={<MainPageLoader />}>
            <ChatApp />
          </Suspense>
        </AppThemeProvider>
      )}
    </>
  );
}
