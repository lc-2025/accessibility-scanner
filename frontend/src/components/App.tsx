import { useTranslation } from 'react-i18next';
import '../css/App.css'

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (<>
    <h1>{t('hi')}</h1>
    <button onClick={() => changeLanguage("en")}>English</button>
    <button onClick={() => changeLanguage("it")}>Ita</button>
  </>);
}

export default App
